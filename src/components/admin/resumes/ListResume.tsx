'use client';

import {
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
} from '@mui/material';
import MPagination from '@/components/common/pagination/MPagination';
import EditButton from '@/components/common/button/EditButton';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { routerReplace } from '@/helpers/router.helper';
import { TEXT } from '@/constant/text.contants';
import { useFormik } from 'formik';
import TextField from '@/components/common/textField/TextField';
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
import TableCellNote from '@/components/common/table/TableCellNote';
import { IResListResume } from '@/interface/resumes';
import { useState } from 'react';
import Autocomplete from '@/components/common/autocomplete/Autocomplete';
import TruncatedText from '@/components/common/truncatedText/TruncatedText';
import { deleteResumeByIdAction, restoreResumeByIdAction } from '@/app/admin/resumes/actions';

interface IProps {
    dataResume: IModelPaginate<IResListResume[]>;
    initialStatus: IOptionAutocomplete[];
    initialCompaies: IOptionAutocomplete[];
    initialJob: IOptionAutocomplete[];
}

function ListResumes({ dataResume, initialStatus, initialCompaies, initialJob }: IProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [statusList] = useState<IOptionAutocomplete[]>(initialStatus);
    const [companiesList] = useState<IOptionAutocomplete[]>(initialCompaies);
    const [jobList] = useState<IOptionAutocomplete[]>(initialJob);

    const searchForm = useFormik({
        initialValues: {
            status: initValueFormik('status', statusList, searchParams),
            company: initValueFormik('company', companiesList, searchParams),
            job: initValueFormik('job', jobList, searchParams),

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
                    status: values.status.label || '',
                    company: values.company.id || '',
                    job: values.job.id || '',
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
        const dataDelete = await deleteResumeByIdAction(id);
        return dataDelete.success;
    };

    const handleRestore = async (id: string) => {
        const dataRestore = await restoreResumeByIdAction(id);
        return dataRestore.success;
    };

    return (
        <Stack spacing={4}>
            {/* SEARCH */}
            <Card variant="outlined">
                <CardContent>
                    <Stack direction={'row'} flexWrap="wrap" gap={2}>
                        {/* Status */}
                        <Autocomplete
                            sx={{ width: '300px' }}
                            size="small"
                            options={statusList}
                            value={searchForm.values.status}
                            renderInput={(params) => <TextField {...params} label="Status" />}
                            onChange={(_, value) => {
                                searchForm.setFieldValue('status', value || { label: '', id: '' });
                            }}
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

                        {/* Job */}
                        <Autocomplete
                            sx={{ width: '300px' }}
                            size="small"
                            options={jobList}
                            value={searchForm.values.job}
                            renderInput={(params) => <TextField {...params} label="Job" />}
                            onChange={(_, value) => {
                                searchForm.setFieldValue('job', value || { label: '', id: '' });
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
                                        total={dataResume.data?.meta?.totalItems || 0}
                                        onChange={handleCheckBox}
                                        checked={searchForm.values.isDeleted}
                                        loading={true}
                                        colSpan={7}
                                    />
                                </TableRow>

                                <TableRow>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Url</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell>Company</TableCell>
                                    <TableCell>Job</TableCell>

                                    <TableCell>Deleted</TableCell>
                                    <TableCell>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {dataResume.data?.result?.map((resume) => (
                                    <TableRow key={resume._id}>
                                        <TableCell>
                                            <TruncatedText maxWidth="100px">
                                                {resume.user.email}
                                            </TruncatedText>
                                        </TableCell>
                                        <TableCell>
                                            <TruncatedText maxWidth="100px">
                                                <a href={resume.url} target="_blank">
                                                    {resume.url}
                                                </a>
                                            </TruncatedText>
                                        </TableCell>
                                        <TableCell>{resume.status}</TableCell>
                                        <TableCell>
                                            <TruncatedText maxWidth="100px">
                                                {resume.company.name}
                                            </TruncatedText>
                                        </TableCell>
                                        <TableCell>
                                            <TruncatedText maxWidth="100px">
                                                {resume.job.name}
                                            </TruncatedText>
                                        </TableCell>

                                        <TableCell>
                                            {resume.isDeleted ? (
                                                <ThumbDownIcon fontSize="small" color="error" />
                                            ) : (
                                                <ThumbUpIcon fontSize="small" color="primary" />
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {resume.isDeleted ? (
                                                <>
                                                    <EditButton
                                                        href={ROUTES.ADMIN.RESUME.DETAIL(
                                                            resume._id,
                                                        )}
                                                    />
                                                    <RestoreButton
                                                        onClick={() => handleRestore(resume._id)}
                                                    />
                                                </>
                                            ) : (
                                                <>
                                                    <EditButton
                                                        href={ROUTES.ADMIN.RESUME.DETAIL(
                                                            resume._id,
                                                        )}
                                                    />
                                                    <DeleteButton
                                                        onClick={() => handleDelete(resume._id)}
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
                        totalPages={dataResume.data?.meta?.totalPages}
                        currentPage={dataResume.data?.meta?.currentPage}
                        onChange={onPageChange}
                    />
                </CardActions>
            </Card>
        </Stack>
    );
}
export default ListResumes;
