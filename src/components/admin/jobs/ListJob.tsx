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
import EditButton from '@/components/common/button/EditButton';
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
import Autocomplete from '@/components/common/autocomplete/Autocomplete';
import TableCellNote from '@/components/common/table/TableCellNote';
import { IJob } from '@/interface/job';
import TooltipRowTable from '@/components/common/table/TooltipRowTable';
import { deleteJobByIdAction, restoreJobByIdAction } from '@/app/admin/jobs/action';
import { formatNumber } from '@/helpers/numericFormat.helper';

interface IProps {
    dataJob: IModelPaginate<IJob[]>;
    initialActives: IOptionAutocomplete[];
    initialCompaies: IOptionAutocomplete[];
}

function ListJob({ dataJob, initialActives, initialCompaies }: IProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [activeList] = useState<IOptionAutocomplete[]>(initialActives);
    const [companiesList] = useState<IOptionAutocomplete[]>(initialCompaies);

    const searchForm = useFormik({
        initialValues: {
            name: searchParams.get('name') || '',
            salary: searchParams.get('salary') || '',
            skills: searchParams.get('skills') || '',
            company: initValueFormik('company', companiesList, searchParams),
            location: searchParams.get('location') || '',
            level: searchParams.get('level') || '',
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
                    company: values.company.id || '',
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
        searchForm.setFieldValue('salary', '');
        searchForm.setFieldValue('skills', '');
        searchForm.setFieldValue('company', { label: '', id: '' });
        searchForm.setFieldValue('location', '');
        searchForm.setFieldValue('level', '');
        searchForm.setFieldValue('isActive', { label: '', id: '' });
        searchForm.setFieldValue('currentPage', 1);
        searchForm.submitForm();
    };

    const handleCheckBox = (_: any, value: boolean) => {
        searchForm.setFieldValue('isDeleted', value);
        searchForm.submitForm();
    };

    const handleDelete = async (id: string) => {
        const dataDelete = await deleteJobByIdAction(id);
        return dataDelete.success;
    };

    const handleRestore = async (id: string) => {
        const dataRestore = await restoreJobByIdAction(id);
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

                        {/* Salary */}
                        <TextField
                            sx={{ width: '300px' }}
                            type="number"
                            name="salary"
                            label="Salary"
                            value={searchForm.values.salary}
                            onChange={searchForm.handleChange}
                        />

                        {/* Skills */}
                        <TextField
                            sx={{ width: '300px' }}
                            label="Skills"
                            name="skills"
                            value={searchForm.values.skills}
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

                        {/* Location */}
                        <TextField
                            sx={{ width: '300px' }}
                            label="Location"
                            name="location"
                            value={searchForm.values.location}
                            onChange={searchForm.handleChange}
                        />

                        {/* Level */}
                        <TextField
                            sx={{ width: '300px' }}
                            label="Level"
                            name="level"
                            value={searchForm.values.level}
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
                                        total={dataJob.data?.meta?.totalItems || 0}
                                        onChange={handleCheckBox}
                                        checked={searchForm.values.isDeleted}
                                        loading={true}
                                        colSpan={9}
                                    />
                                </TableRow>

                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Salary</TableCell>
                                    <TableCell>Skills</TableCell>
                                    <TableCell>Company</TableCell>
                                    <TableCell>Location</TableCell>
                                    <TableCell>Level</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell>Deleted</TableCell>
                                    <TableCell>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {dataJob.data?.result?.map((job) => (
                                    <TableRow key={job._id}>
                                        <TableCell>
                                            <Tooltip
                                                title={<TooltipRowTable data={job} />}
                                                placement="top"
                                            >
                                                <div>{job.name}</div>
                                            </Tooltip>
                                        </TableCell>
                                        <TableCell>{formatNumber(job.salary)}</TableCell>
                                        <TableCell>{job.skills.join(', ')}</TableCell>
                                        <TableCell>{job.company?.name}</TableCell>
                                        <TableCell>{job.location}</TableCell>
                                        <TableCell>{job.level}</TableCell>
                                        <TableCell>
                                            <Chip
                                                variant="outlined"
                                                color={job.isActive ? 'success' : 'error'}
                                                size="small"
                                                label={job.isActive ? 'active' : 'not'}
                                            />
                                        </TableCell>

                                        <TableCell>
                                            {job.isDeleted ? (
                                                <ThumbDownIcon fontSize="small" color="error" />
                                            ) : (
                                                <ThumbUpIcon fontSize="small" color="primary" />
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {job.isDeleted ? (
                                                <>
                                                    <EditButton
                                                        href={ROUTES.ADMIN.JOB.DETAIL(job._id)}
                                                    />
                                                    <RestoreButton
                                                        onClick={() => handleRestore(job._id)}
                                                    />
                                                </>
                                            ) : (
                                                <>
                                                    <EditButton
                                                        href={ROUTES.ADMIN.JOB.DETAIL(job._id)}
                                                    />
                                                    <DeleteButton
                                                        onClick={() => handleDelete(job._id)}
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
                        totalPages={dataJob.data?.meta?.totalPages}
                        currentPage={dataJob.data?.meta?.currentPage}
                        onChange={onPageChange}
                    />
                </CardActions>
            </Card>
        </Stack>
    );
}
export default ListJob;
