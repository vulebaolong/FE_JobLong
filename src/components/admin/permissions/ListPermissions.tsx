'use client';

import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Checkbox,
    Chip,
    Divider,
    FormControlLabel,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip,
    Typography,
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
import AutorenewIcon from '@mui/icons-material/Autorenew';
import {
    CreatedInfoAction,
    DeletedInfoAction,
    UpdatedInfoAction,
} from '@/components/common/infoAction/InfoAction';
import Autocomplete from '@/components/common/autocomplete/Autocomplete';
import { IPermission } from '@/interface/permission';
import { ROUTES } from '@/constant/routes.contants';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import EditButton from '@/components/common/button/EditButton';
import RestoreButton from '@/components/common/button/RestoreButton';
import DeleteButton from '@/components/common/button/DeleteButton';
import {
    deletePermissionByIdAction,
    restorePermissionByIdAction,
} from '@/app/admin/permissions/action';

interface IProps {
    dataPermission: IModelPaginate<IPermission[]>;
    initialMethods: IOptionAutocomplete[];
}

function ListPermissions({ dataPermission, initialMethods }: IProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [methodList] = useState<IOptionAutocomplete[]>(initialMethods);

    const searchForm = useFormik({
        initialValues: {
            name: searchParams.get('name') || '',
            apiPath: searchParams.get('apiPath') || '',
            method: initValueFormik('method', methodList, searchParams),
            module: searchParams.get('module') || '',
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
                    method: values.method.label || '',
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
        searchForm.setFieldValue('apiPath', '');
        searchForm.setFieldValue('method', { label: '', id: '' });
        searchForm.setFieldValue('module', '');
        searchForm.submitForm();
    };

    const handleCheckBox = (_: any, value: boolean) => {
        searchForm.setFieldValue('isDeleted', value);
        searchForm.submitForm();
    };

    const handleDelete = async (id: string) => {
        const dataDelete = await deletePermissionByIdAction(id);
        return dataDelete.success;
    };

    const handleRestore = async (id: string) => {
        const dataRestore = await restorePermissionByIdAction(id);
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

                        {/* Path */}
                        <TextField
                            sx={{ width: '300px' }}
                            label="Path"
                            name="apiPath"
                            value={searchForm.values.apiPath}
                            onChange={searchForm.handleChange}
                        />

                        {/* Method */}
                        <Autocomplete
                            sx={{ width: '300px' }}
                            size="small"
                            options={methodList}
                            value={searchForm.values.method}
                            renderInput={(params) => <TextField {...params} label="Method" />}
                            onChange={(_, value) => {
                                searchForm.setFieldValue('method', value || { label: '', id: '' });
                            }}
                        />

                        {/* Module */}
                        <TextField
                            sx={{ width: '300px' }}
                            label="Module"
                            name="module"
                            value={searchForm.values.module}
                            onChange={searchForm.handleChange}
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
                                        data={dataPermission}
                                        onChange={handleCheckBox}
                                        checked={searchForm.values.isDeleted}
                                        loading={true}
                                    />
                                </TableRow>

                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Path</TableCell>
                                    <TableCell>Method</TableCell>
                                    <TableCell>Module</TableCell>
                                    <TableCell>Deleted</TableCell>
                                    <TableCell>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {dataPermission.data?.result?.map((permission) => (
                                    <TableRow key={permission._id}>
                                        <TableCell>
                                            <Tooltip
                                                title={<TitleTooltipAvatar data={permission} />}
                                                placement="top"
                                            >
                                                <div>{permission.name}</div>
                                            </Tooltip>
                                        </TableCell>
                                        <TableCell>{permission.apiPath}</TableCell>
                                        <TableCell>
                                            <Chip
                                                variant="outlined"
                                                color={
                                                    permission.method === 'GET'
                                                        ? 'success'
                                                        : permission.method === 'POST'
                                                          ? 'warning'
                                                          : permission.method === 'PATCH'
                                                            ? 'info'
                                                            : permission.method === 'DELETE'
                                                              ? 'error'
                                                              : 'default'
                                                }
                                                size="small"
                                                label={permission.method}
                                            />
                                        </TableCell>
                                        <TableCell>{permission.module}</TableCell>
                                        <TableCell>
                                            {permission.isDeleted ? (
                                                <ThumbDownIcon fontSize="small" color="error" />
                                            ) : (
                                                <ThumbUpIcon fontSize="small" color="primary" />
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {permission.isDeleted ? (
                                                <>
                                                    <EditButton
                                                        href={ROUTES.ADMIN.PERMISSION.DETAIL(
                                                            permission._id,
                                                        )}
                                                    />
                                                    <RestoreButton
                                                        onClick={() =>
                                                            handleRestore(permission._id)
                                                        }
                                                    />
                                                </>
                                            ) : (
                                                <>
                                                    <EditButton
                                                        href={ROUTES.ADMIN.PERMISSION.DETAIL(
                                                            permission._id,
                                                        )}
                                                    />
                                                    <DeleteButton
                                                        onClick={() => handleDelete(permission._id)}
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
                        totalPages={dataPermission.data?.meta?.totalPages}
                        currentPage={dataPermission.data?.meta?.currentPage}
                        onChange={onPageChange}
                    />
                </CardActions>
            </Card>
        </Stack>
    );
}
export default ListPermissions;

interface IPropsTableCellNote {
    data: IModelPaginate<IPermission[]>;
    onChange: (_: any, value: boolean) => void;
    checked: boolean;
    loading?: boolean;
}

function TableCellNote({ data, onChange, checked, loading }: IPropsTableCellNote) {
    return (
        <TableCell colSpan={9} sx={{ borderBottom: 'none', paddingBottom: '0 !important' }}>
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                width={'100%'}
            >
                <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={3}>
                    <Box sx={{ fontSize: '1rem' }}>Total: {data.data?.meta?.totalItems}</Box>
                    <Box>
                        <FormControlLabel
                            control={
                                <Checkbox onChange={onChange} size="small" checked={checked} />
                            }
                            label={
                                <Typography variant="subtitle2">
                                    Includes deleted permissions
                                </Typography>
                            }
                        />
                    </Box>
                </Stack>
                <Box>{loading && <AutorenewIcon className="animate-spin" />}</Box>
            </Stack>
        </TableCell>
    );
}

interface IPropsTooltipAvatar {
    data: IPermission;
}

function TitleTooltipAvatar({ data }: IPropsTooltipAvatar) {
    return (
        <Stack direction={'column'} spacing={2} padding={1}>
            {/* Created by */}
            <CreatedInfoAction createdBy={data?.createdBy?.email} createdAt={data?.createdAt} />

            {/* Updated by */}
            <UpdatedInfoAction updatedBy={data?.createdBy?.email} updatedAt={data?.createdAt} />

            {/* Deleted by */}
            <DeletedInfoAction deletedBy={data?.createdBy?.email} deletedAt={data?.createdAt} />
        </Stack>
    );
}
