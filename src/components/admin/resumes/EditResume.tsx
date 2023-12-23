'use client';

import { Box, Button, Card, CardActions, CardContent, Divider, Stack } from '@mui/material';
import { useFormik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';
import { LoadingButton } from '@mui/lab';
import { TEXT } from '@/constant/text.contants';
import AlertError from '@/components/common/alert/AlertError';
import { useRouter } from 'next/navigation';
import TextField from '@/components/common/textField/TextField';
import { IOptionAutocomplete } from '@/helpers/formik.helper';
import Autocomplete from '@/components/common/autocomplete/Autocomplete';
import { toastSuccess } from '@/provider/ToastProvider';
import { IResume } from '@/interface/resumes';
import { updateResumeByIdAction } from '@/app/admin/resumes/actions';

interface IProps {
    initialCompaies: IOptionAutocomplete[];
    initialJob: IOptionAutocomplete[];
    initialStatus: IOptionAutocomplete[];
    resume: IResume;
}

const EditResume = ({ initialCompaies, initialJob, initialStatus, resume }: IProps) => {
    const router = useRouter();

    const [errMessage, setErrMessage] = useState<string | undefined>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [companiesList] = useState<IOptionAutocomplete[]>(initialCompaies);
    const [jobList] = useState<IOptionAutocomplete[]>(initialJob);
    const [statusList] = useState<IOptionAutocomplete[]>(initialStatus);

    const editForm = useFormik({
        initialValues: {
            url: resume.url || '',
            company: companiesList.find((company) => company.id === resume.company) || {
                label: '',
                id: '',
            },
            job: jobList.find((job) => job.id === resume.job) || {
                label: '',
                id: '',
            },
            status: statusList.find((status) => status.label === resume.status) || {
                label: '',
                id: '',
            },
        },
        validationSchema: Yup.object().shape({
            url: Yup.string().required(TEXT.MESSAGE.REQUIRED_FIELD('Name')),
            company: Yup.object().shape({
                label: Yup.string().required(TEXT.MESSAGE.REQUIRED_FIELD('Company')),
            }),
            job: Yup.object().shape({
                label: Yup.string().required(TEXT.MESSAGE.REQUIRED_FIELD('Job')),
            }),
        }),
        onSubmit: async (valuesRaw) => {
            const values = {
                ...valuesRaw,
                company: valuesRaw.company.id,
                job: valuesRaw.job.id,
                status: valuesRaw.status.label,
            };

            setErrMessage(undefined);
            setIsLoading(true);

            const result = await updateResumeByIdAction(resume._id, values);
            setIsLoading(false);

            if (!result.success) return setErrMessage(result.message);

            toastSuccess(TEXT.MESSAGE.CREATE_SUCCESS);
            router.back();
        },
    });

    return (
        <Stack gap={3} sx={{ maxWidth: 'sm' }}>
            {errMessage && <AlertError message={errMessage} />}
            <Box component={'form'} onSubmit={editForm.handleSubmit}>
                <Card variant="outlined">
                    <CardContent>
                        <Stack gap={3}>
                            {/* Url */}
                            <TextField
                                fullWidth
                                label="Url"
                                name="url"
                                value={editForm.values.url}
                                onChange={editForm.handleChange}
                                error={editForm.touched.url && editForm.errors.url !== undefined}
                                helperText={editForm.touched.url && editForm.errors.url}
                            />

                            {/* Company */}
                            <Autocomplete
                                fullWidth
                                options={companiesList}
                                value={editForm.values.company}
                                renderInput={(params) => {
                                    return (
                                        <TextField
                                            {...params}
                                            label="Company"
                                            error={
                                                editForm.touched.company &&
                                                Boolean(editForm.errors.company)
                                            }
                                            helperText={
                                                editForm.touched.company && editForm.errors.company
                                                    ? editForm.errors.company.label
                                                    : ''
                                            }
                                        />
                                    );
                                }}
                                onChange={(_, value) => {
                                    editForm.setFieldValue(
                                        'company',
                                        value || { label: '', id: '' },
                                    );
                                }}
                            />

                            {/* Job */}
                            <Autocomplete
                                fullWidth
                                options={jobList}
                                value={editForm.values.job}
                                renderInput={(params) => {
                                    return (
                                        <TextField
                                            {...params}
                                            label="Job"
                                            error={
                                                editForm.touched.job &&
                                                Boolean(editForm.errors.job)
                                            }
                                            helperText={
                                                editForm.touched.job && editForm.errors.job
                                                    ? editForm.errors.job.label
                                                    : ''
                                            }
                                        />
                                    );
                                }}
                                onChange={(_, value) => {
                                    editForm.setFieldValue(
                                        'job',
                                        value || { label: '', id: '' },
                                    );
                                }}
                            />

                            {/* Status */}
                            <Autocomplete
                                fullWidth
                                options={statusList}
                                value={editForm.values.status}
                                renderInput={(params) => {
                                    return (
                                        <TextField
                                            {...params}
                                            label="Status"
                                            error={
                                                editForm.touched.status &&
                                                Boolean(editForm.errors.status)
                                            }
                                            helperText={
                                                editForm.touched.status && editForm.errors.status
                                                    ? editForm.errors.status.label
                                                    : ''
                                            }
                                        />
                                    );
                                }}
                                onChange={(_, value) => {
                                    editForm.setFieldValue(
                                        'status',
                                        value || { label: '', id: '' },
                                    );
                                }}
                            />
                        </Stack>
                    </CardContent>
                    <Divider />
                    <CardActions>
                        <LoadingButton
                            type="submit"
                            variant="contained"
                            color="primary"
                            loading={isLoading}
                        >
                            {TEXT.BUTTON_TEXT.EDIT}
                        </LoadingButton>
                        <Button onClick={() => router.back()} disabled={isLoading}>
                            {TEXT.BUTTON_TEXT.CANCEL}
                        </Button>
                    </CardActions>
                </Card>
            </Box>
        </Stack>
    );
};

export default EditResume;
