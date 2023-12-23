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
import { createPermissionAction } from '@/app/admin/permissions/action';
import { toastSuccess } from '@/provider/ToastProvider';
import { createResumeAction } from '@/app/admin/resumes/actions';

interface IProps {
    initialCompaies: IOptionAutocomplete[];
    initialJob: IOptionAutocomplete[];
}

const CreateResume = ({ initialCompaies, initialJob }: IProps) => {
    const router = useRouter();

    const [errMessage, setErrMessage] = useState<string | undefined>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [companiesList] = useState<IOptionAutocomplete[]>(initialCompaies);
    const [jobList] = useState<IOptionAutocomplete[]>(initialJob);

    const createForm = useFormik({
        initialValues: {
            url: '',
            company: { label: '', id: '' },
            job: { label: '', id: '' },
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
            };

            setErrMessage(undefined);
            setIsLoading(true);

            const result = await createResumeAction(values);
            setIsLoading(false);

            if (!result.success) return setErrMessage(result.message);

            toastSuccess(TEXT.MESSAGE.CREATE_SUCCESS);
            router.back();
        },
    });

    return (
        <Stack gap={3} sx={{ maxWidth: 'sm' }}>
            {errMessage && <AlertError message={errMessage} />}
            <Box component={'form'} onSubmit={createForm.handleSubmit}>
                <Card variant="outlined">
                    <CardContent>
                        <Stack gap={3}>
                            {/* Url */}
                            <TextField
                                fullWidth
                                label="Url"
                                name="url"
                                value={createForm.values.url}
                                onChange={createForm.handleChange}
                                error={
                                    createForm.touched.url && createForm.errors.url !== undefined
                                }
                                helperText={createForm.touched.url && createForm.errors.url}
                            />

                            {/* Company */}
                            <Autocomplete
                                fullWidth
                                options={companiesList}
                                value={createForm.values.company}
                                renderInput={(params) => {
                                    return (
                                        <TextField
                                            {...params}
                                            label="Company"
                                            error={
                                                createForm.touched.company &&
                                                Boolean(createForm.errors.company)
                                            }
                                            helperText={
                                                createForm.touched.company &&
                                                createForm.errors.company
                                                    ? createForm.errors.company.label
                                                    : ''
                                            }
                                        />
                                    );
                                }}
                                onChange={(_, value) => {
                                    createForm.setFieldValue(
                                        'company',
                                        value || { label: '', id: '' },
                                    );
                                }}
                            />

                            {/* Job */}
                            <Autocomplete
                                fullWidth
                                options={jobList}
                                value={createForm.values.job}
                                renderInput={(params) => {
                                    return (
                                        <TextField
                                            {...params}
                                            label="Job"
                                            error={
                                                createForm.touched.job &&
                                                Boolean(createForm.errors.job)
                                            }
                                            helperText={
                                                createForm.touched.job &&
                                                createForm.errors.job
                                                    ? createForm.errors.job.label
                                                    : ''
                                            }
                                        />
                                    );
                                }}
                                onChange={(_, value) => {
                                    createForm.setFieldValue(
                                        'job',
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
                            {TEXT.BUTTON_TEXT.ADD}
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

export default CreateResume;
