'use client';

import {
    Button,
    Card,
    CardActions,
    CardContent,
    Chip,
    Divider,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip,
} from '@mui/material';
import MPagination from '@/components/common/pagination/MPagination';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { routerReplace } from '@/helpers/router.helper';
import { TEXT } from '@/constant/text.contants';
import { useFormik } from 'formik';
import TextField from '@/components/common/textField/TextField';
import { useState } from 'react';
import {
    IOptionAutocomplete,
    convertStringToBoolean,
    initValueFormik,
} from '@/helpers/formik.helper';
import Autocomplete from '@/components/common/autocomplete/Autocomplete';
import { ROUTES } from '@/constant/routes.contants';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import EditButton from '@/components/common/button/EditButton';
import RestoreButton from '@/components/common/button/RestoreButton';
import DeleteButton from '@/components/common/button/DeleteButton';
import { IRole } from '@/interface/role';
import TableCellNote from '@/components/common/table/TableCellNote';
import TooltipRowTable from '@/components/common/table/TooltipRowTable';
import { deleteRoleByIdAction, restoreRoleByIdAction } from '@/app/admin/roles/action';

interface IProps {
    dataRole: IModelPaginate<IRole[]>;
    initialActives: IOptionAutocomplete[];
}

function ListRole({ dataRole, initialActives }: IProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [activeList] = useState<IOptionAutocomplete[]>(initialActives);

    const searchForm = useFormik({
        initialValues: {
            name: searchParams.get('name') || '',
            description: searchParams.get('description') || '',
            isActive: initValueFormik('isActive', activeList, searchParams),

            currentPage: searchParams.get('currentPage') || 1,
            isDeleted: searchParams.get('isDeleted')
                ? convertStringToBoolean(searchParams.get('isDeleted'))
                : true,
        },
        onSubmit: (values) => {
            routerReplace({
                router,
                pathname,
                searchParams,
                newSearchParams: {
                    ...values,
                    isActive: values.isActive.id || '',
                    isDeleted: values.isDeleted,
                },
            });
        },
    });

    const onPageChange = (_: any, currentPage: number) => {
        searchForm.setFieldValue('currentPage', currentPage);
        searchForm.submitForm();
    };

    const onSearch = () => {
        searchForm.setFieldValue('currentPage', 1);
        searchForm.submitForm();
    };

    const onResetSearch = () => {
        searchForm.setFieldValue('name', '');
        searchForm.setFieldValue('description', '');
        searchForm.setFieldValue('isActive', { label: '', id: '' });
        searchForm.submitForm();
    };

    const handleCheckBox = (_: any, value: boolean) => {
        searchForm.setFieldValue('isDeleted', value);
        searchForm.submitForm();
    };

    const handleDelete = async (id: string) => {
        const dataDelete = await deleteRoleByIdAction(id);
        return dataDelete.success;
    };

    const handleRestore = async (id: string) => {
        const dataRestore = await restoreRoleByIdAction(id);
        return dataRestore.success;
    };

    return (
        <Stack spacing={4}>
            {/* SEARCH */}
            <Card variant="outlined">
                <CardContent>
                    <Stack direction={'row'} flexWrap="wrap" gap={2}>
                        {/* Name */}
                        <TextField
                            sx={{ width: '300px' }}
                            label="Name"
                            name="name"
                            value={searchForm.values.name}
                            onChange={searchForm.handleChange}
                        />

                        {/* Description */}
                        <TextField
                            sx={{ width: '300px' }}
                            label="Description"
                            name="description"
                            value={searchForm.values.description}
                            onChange={searchForm.handleChange}
                        />

                        {/* Active */}
                        <Autocomplete
                            sx={{ width: '300px' }}
                            size="small"
                            options={activeList}
                            value={searchForm.values.isActive}
                            renderInput={(params) => <TextField {...params} label="Status" />}
                            onChange={(_, value) => {
                                searchForm.setFieldValue(
                                    'isActive',
                                    value || { label: '', id: '' },
                                );
                            }}
                        />
                    </Stack>
                </CardContent>
                <Divider />
                <CardActions>
                    <Button variant="contained" onClick={onSearch}>
                        {TEXT.BUTTON_TEXT.SEARCH}
                    </Button>
                    <Button onClick={onResetSearch}>{TEXT.BUTTON_TEXT.RESET}</Button>
                </CardActions>
            </Card>

            {/* TABLE */}
            <Card variant="outlined">
                <CardContent sx={{ padding: 0 }}>
                    <TableContainer>
                        <Table sx={{ minWidth: 650 }} size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCellNote
                                        total={dataRole.data?.meta?.totalItems || 0}
                                        onChange={handleCheckBox}
                                        checked={searchForm.values.isDeleted}
                                        loading={true}
                                        colSpan={5}
                                    />
                                </TableRow>

                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>description</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell>Deleted</TableCell>
                                    <TableCell>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {dataRole.data?.result?.map((role) => (
                                    <TableRow key={role._id}>
                                        <TableCell>
                                            <Tooltip
                                                title={<TooltipRowTable data={role} />}
                                                placement="top"
                                            >
                                                <div>{role.name}</div>
                                            </Tooltip>
                                        </TableCell>
                                        <TableCell>{role.description}</TableCell>
                                        <TableCell>
                                            <Chip
                                                variant="outlined"
                                                color={role.isActive ? 'success' : 'error'}
                                                size="small"
                                                label={role.isActive ? 'active' : 'not'}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            {role.isDeleted ? (
                                                <ThumbDownIcon fontSize="small" color="error" />
                                            ) : (
                                                <ThumbUpIcon fontSize="small" color="primary" />
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {role.isDeleted ? (
                                                <>
                                                    <EditButton
                                                        href={ROUTES.ADMIN.ROLE.DETAIL(role._id)}
                                                    />
                                                    <RestoreButton
                                                        onClick={() => handleRestore(role._id)}
                                                    />
                                                </>
                                            ) : (
                                                <>
                                                    <EditButton
                                                        href={ROUTES.ADMIN.ROLE.DETAIL(role._id)}
                                                    />
                                                    <DeleteButton
                                                        onClick={() => handleDelete(role._id)}
                                                    />
                                                </>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>
                <Divider />
                <CardActions>
                    <MPagination
                        totalPages={dataRole.data?.meta?.totalPages}
                        currentPage={dataRole.data?.meta?.currentPage}
                        onChange={onPageChange}
                    />
                </CardActions>
            </Card>
        </Stack>
    );
}
export default ListRole;
