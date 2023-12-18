'use client';

import {
    Avatar,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
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
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { routerReplace } from '@/helpers/router.helper';
import { TEXT } from '@/constant/text.contants';
import { useFormik } from 'formik';
import TextField from '@/components/common/textField/TextField';
import { convertStringToBoolean } from '@/helpers/formik.helper';
import { ROUTES } from '@/constant/routes.contants';
import DeleteButton from '@/components/common/button/DeleteButton';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import RestoreButton from '@/components/common/button/RestoreButton';
import TableCellNote from '@/components/common/table/TableCellNote';
import TooltipRowTable from '@/components/common/table/TooltipRowTable';
import { ICompany } from '@/interface/company';
import { deleteCompanyByIdAction, deleteHardCompanyByIdAction, restoreCompanyByIdAction } from '@/app/admin/companies/action';
import DeleteHardButton from '@/components/common/button/DeleteHardButton';

interface IProps {
    dataCompanies: IModelPaginate<ICompany[]>;
}

function ListCompanies({ dataCompanies }: IProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const searchForm = useFormik({
        initialValues: {
            name: searchParams.get('name') || '',
            address: searchParams.get('address') || '',

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
        searchForm.submitForm();
    };

    const handleCheckBox = (_: any, value: boolean) => {
        searchForm.setFieldValue('isDeleted', value);
        searchForm.submitForm();
    };

    const handleDelete = async (id: string) => {
        const dataDelete = await deleteCompanyByIdAction(id);
        return dataDelete.success;
    };

    const handleDeleteHard = async (id: string) => {
        const dataDelete = await deleteHardCompanyByIdAction(id);
        return dataDelete.success;
    };

    const handleRestore = async (id: string) => {
        const dataRestore = await restoreCompanyByIdAction(id);
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
                            name="address"
                            label="Address"
                            value={searchForm.values.address}
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
                                        total={dataCompanies.data?.meta?.totalItems || 0}
                                        onChange={handleCheckBox}
                                        checked={searchForm.values.isDeleted}
                                        loading={true}
                                        colSpan={4}
                                    />
                                </TableRow>

                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Address</TableCell>
                                    <TableCell>Deleted</TableCell>
                                    <TableCell>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {dataCompanies.data?.result?.map((company) => (
                                    <TableRow key={company._id}>
                                        <TableCell>
                                            <Stack
                                                direction="row"
                                                justifyContent="flex-start"
                                                alignItems="center"
                                                spacing={1}
                                            >
                                                <Tooltip
                                                    title={<TooltipRowTable data={company} />}
                                                    placement="right-end"
                                                >
                                                    <Avatar
                                                        sx={{
                                                            width: 30,
                                                            height: 30,
                                                        }}
                                                        src={company.logo}
                                                    />
                                                </Tooltip>
                                                <Box>{company.name}</Box>
                                            </Stack>
                                        </TableCell>
                                        <TableCell>{company.address}</TableCell>

                                        <TableCell>
                                            {company.isDeleted ? (
                                                <ThumbDownIcon fontSize="small" color="error" />
                                            ) : (
                                                <ThumbUpIcon fontSize="small" color="primary" />
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {company.isDeleted ? (
                                                <>
                                                    <EditButton
                                                        href={ROUTES.ADMIN.COMPANY.DETAIL(
                                                            company._id,
                                                        )}
                                                    />
                                                    <RestoreButton
                                                        onClick={() => handleRestore(company._id)}
                                                    />
                                                </>
                                            ) : (
                                                <>
                                                    <EditButton
                                                        href={ROUTES.ADMIN.COMPANY.DETAIL(
                                                            company._id,
                                                        )}
                                                    />
                                                    <DeleteButton
                                                        onClick={() => handleDelete(company._id)}
                                                    />
                                                </>
                                            )}
                                            <DeleteHardButton
                                                onClick={() => handleDeleteHard(company._id)}
                                            />
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
                        totalPages={dataCompanies.data?.meta?.totalPages}
                        currentPage={dataCompanies.data?.meta?.currentPage}
                        onChange={onPageChange}
                    />
                </CardActions>
            </Card>
        </Stack>
    );
}
export default ListCompanies;
