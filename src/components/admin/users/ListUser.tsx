'use client';

import {
    Avatar,
    Box,
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
import EditButton from '@/components/common/button/EditButton';
import { IUser } from '@/interface/user';
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
import { ROUTES } from '@/constant/routes.contants';
import DeleteButton from '@/components/common/button/DeleteButton';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import RestoreButton from '@/components/common/button/RestoreButton';
import { deleteUserByIdAction, restoreUserByIdAction } from '@/app/admin/users/action';
import { ROLE_ADMIN, ROLE_HR, ROLE_USER } from '@/constant/role.constant';
import Autocomplete from '@/components/common/autocomplete/Autocomplete';
import TableCellNote from '@/components/common/table/TableCellNote';
import TooltipRowTable from '@/components/common/table/TooltipRowTable';

interface IProps {
    dataUser: IModelPaginate<IUser[]>;
    initialCompaies: IOptionAutocomplete[];
    initialRole: IOptionAutocomplete[];
    initialGender: IOptionAutocomplete[];
}

function ListUser({ dataUser, initialCompaies, initialRole, initialGender }: IProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [companiesList] = useState<IOptionAutocomplete[]>(initialCompaies);
    const [genderList] = useState<IOptionAutocomplete[]>(initialGender);
    const [roleList] = useState<IOptionAutocomplete[]>(initialRole);

    const searchForm = useFormik({
        initialValues: {
            name: searchParams.get('name') || '',
            address: searchParams.get('address') || '',
            age: searchParams.get('age') || '',
            company: initValueFormik('company', companiesList, searchParams),
            email: searchParams.get('email') || '',
            gender: initValueFormik('gender', genderList, searchParams),
            role: initValueFormik('role', roleList, searchParams),
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
                    company: values.company.id || '',
                    gender: values.gender.label || '',
                    role: values.role.id || '',
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
        searchForm.setFieldValue('address', '');
        searchForm.setFieldValue('age', '');
        searchForm.setFieldValue('company', { label: '', id: '' });
        searchForm.setFieldValue('email', '');
        searchForm.setFieldValue('gender', { label: '', id: '' });
        searchForm.setFieldValue('role', { label: '', id: '' });
        searchForm.setFieldValue('currentPage', 1);
        searchForm.submitForm();
    };

    const handleCheckBox = (_: any, value: boolean) => {
        searchForm.setFieldValue('isDeleted', value);
        searchForm.submitForm();
    };

    const handleDelete = async (id: string) => {
        const dataDelete = await deleteUserByIdAction(id);
        return dataDelete.success;
    };

    const handleRestore = async (id: string) => {
        const dataRestore = await restoreUserByIdAction(id);
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

                        {/* Address */}
                        <TextField
                            sx={{ width: '300px' }}
                            label="Address"
                            name="address"
                            value={searchForm.values.address}
                            onChange={searchForm.handleChange}
                        />

                        {/* Age */}
                        <TextField
                            sx={{ width: '300px' }}
                            type="number"
                            max={199}
                            name="age"
                            label="Age"
                            value={searchForm.values.age}
                            onChange={searchForm.handleChange}
                        />

                        {/* Company */}
                        <Autocomplete
                            sx={{ width: '300px' }}
                            size="small"
                            options={companiesList}
                            value={searchForm.values.company}
                            renderInput={(params) => <TextField {...params} label="Company" />}
                            onChange={(_, value) => {
                                searchForm.setFieldValue('company', value || { label: '', id: '' });
                            }}
                        />

                        {/* Email */}
                        <TextField
                            sx={{ width: '300px' }}
                            label="Email"
                            name="email"
                            value={searchForm.values.email}
                            onChange={searchForm.handleChange}
                        />

                        {/* Gender */}
                        <Autocomplete
                            sx={{ width: '300px' }}
                            size="small"
                            options={genderList}
                            value={searchForm.values.gender}
                            renderInput={(params) => <TextField {...params} label="Gender" />}
                            onChange={(_, value) => {
                                searchForm.setFieldValue('gender', value || { label: '', id: '' });
                            }}
                        />

                        {/* Role */}
                        <Autocomplete
                            sx={{ width: '300px' }}
                            size="small"
                            options={roleList}
                            value={searchForm.values.role}
                            renderInput={(params) => <TextField {...params} label="Role" />}
                            onChange={(_, value) => {
                                searchForm.setFieldValue('role', value || { label: '', id: '' });
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
                                        total={dataUser.data?.meta?.totalItems || 0}
                                        onChange={handleCheckBox}
                                        checked={searchForm.values.isDeleted}
                                        loading={true}
                                        colSpan={9}
                                    />
                                </TableRow>

                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Address</TableCell>
                                    <TableCell>Age</TableCell>
                                    <TableCell>Company</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Gender</TableCell>
                                    <TableCell>Role</TableCell>
                                    <TableCell>Deleted</TableCell>
                                    <TableCell>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {dataUser.data?.result?.map((user) => (
                                    <TableRow key={user._id}>
                                        <TableCell>
                                            <Stack
                                                direction="row"
                                                justifyContent="flex-start"
                                                alignItems="center"
                                                spacing={1}
                                            >
                                                <Tooltip
                                                    title={<TooltipRowTable data={user} />}
                                                    placement="right-end"
                                                >
                                                    <Avatar
                                                        sx={{
                                                            width: 30,
                                                            height: 30,
                                                        }}
                                                        src={user.avatar}
                                                    />
                                                </Tooltip>
                                                <Box>{user.name}</Box>
                                            </Stack>
                                        </TableCell>
                                        <TableCell>{user.address}</TableCell>
                                        <TableCell>{user.age}</TableCell>
                                        <TableCell>{user.company?.name}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>{user.gender}</TableCell>
                                        <TableCell>
                                            <Chip
                                                variant="outlined"
                                                color={
                                                    user.role.name === ROLE_ADMIN
                                                        ? 'error'
                                                        : user.role.name === ROLE_USER
                                                          ? 'info'
                                                          : user.role.name === ROLE_HR
                                                            ? 'warning'
                                                            : 'default'
                                                }
                                                size="small"
                                                label={user.role.name}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            {user.isDeleted ? (
                                                <ThumbDownIcon fontSize="small" color="error" />
                                            ) : (
                                                <ThumbUpIcon fontSize="small" color="primary" />
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {user.isDeleted ? (
                                                <>
                                                    <EditButton
                                                        href={ROUTES.ADMIN.USERS.DETAIL(user._id)}
                                                    />
                                                    <RestoreButton
                                                        onClick={() => handleRestore(user._id)}
                                                    />
                                                </>
                                            ) : (
                                                <>
                                                    <EditButton
                                                        href={ROUTES.ADMIN.USERS.DETAIL(user._id)}
                                                    />
                                                    <DeleteButton
                                                        onClick={() => handleDelete(user._id)}
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
                        totalPages={dataUser.data?.meta?.totalPages}
                        currentPage={dataUser.data?.meta?.currentPage}
                        onChange={onPageChange}
                    />
                </CardActions>
            </Card>
        </Stack>
    );
}
export default ListUser;
