'use client';

import AlertError from '@/components/common/alert/AlertError';
import Autocomplete from '@/components/common/autocomplete/Autocomplete';
import TextField from '@/components/common/textField/TextField';
import { TEXT } from '@/constant/text.contants';
import { IOptionAutocomplete, convertStringToBoolean } from '@/helpers/formik.helper';
import { toastSuccess, toastWarning } from '@/provider/ToastProvider';
import { LoadingButton } from '@mui/lab';
import { Box, Button, Card, CardActions, CardContent, Divider, Grid, Stack } from '@mui/material';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import * as Yup from 'yup';
import { IJob } from '@/interface/job';
import dayjs from 'dayjs';
import DatePicker from '@/components/common/datepicker/DatePicker';
import RichTextEditor from '@/components/common/richTextEditor/RichTextEditor';
import { RichTextEditorRef } from 'mui-tiptap';
import { createJobAction } from '@/app/admin/jobs/action';

interface IProps {
    initialCompaies: IOptionAutocomplete[];
    initialActives: IOptionAutocomplete[];
    dataJob: IJob;
}

function EditJob({ initialCompaies, initialActives, dataJob }: IProps) {
    const rteRef = useRef<RichTextEditorRef>(null);

    const router = useRouter();
    const [errMessage, setErrMessage] = useState<string | undefined>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [activeList] = useState<IOptionAutocomplete[]>(initialActives);
    const [companiesList] = useState<IOptionAutocomplete[]>(initialCompaies);

    const [isClient, setIsClient] = useState(false);
    useEffect(() => {
        setIsClient(true);
    }, []);

    const editForm = useFormik({
        initialValues: {
            name: dataJob.name || '',
            // description: dataJob.description || '',
            isActive: activeList.find((isActive) => isActive.id === `${dataJob.isActive}`) || {
                label: '',
                id: '',
            },
            skills: dataJob.skills.join(', ') || '',
            company: companiesList.find((company) => company.label === dataJob.company?.name) || {
                label: '',
                id: '',
            },
            location: dataJob.location || '',
            salary: dataJob.salary || '',
            quantity: dataJob.quantity || '',
            level: dataJob.level || '',
            startDate: dayjs(dataJob.startDate) || '',
            endDate: dayjs(dataJob.endDate) || '',
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().required(TEXT.MESSAGE.REQUIRED_FIELD('Name')),
            skills: Yup.string().required(TEXT.MESSAGE.REQUIRED_FIELD('Skills')),
            company: Yup.object().shape({
                label: Yup.string().required(TEXT.MESSAGE.REQUIRED_FIELD('Company')),
            }),
            location: Yup.string().required(TEXT.MESSAGE.REQUIRED_FIELD('Location')),
            salary: Yup.string().required(TEXT.MESSAGE.REQUIRED_FIELD('Salary')),
            quantity: Yup.string().required(TEXT.MESSAGE.REQUIRED_FIELD('Quantity')),
            level: Yup.string().required(TEXT.MESSAGE.REQUIRED_FIELD('Level')),
            startDate: Yup.string().required(TEXT.MESSAGE.REQUIRED_FIELD('StartDate')),
            endDate: Yup.string().required(TEXT.MESSAGE.REQUIRED_FIELD('EndDate')),
        }),
        onSubmit: async (valuesRaw) => {
            const values = {
                ...valuesRaw,
                isActive: convertStringToBoolean(valuesRaw.isActive.id),
                salary: +valuesRaw.salary,
                quantity: +valuesRaw.quantity,
                skills: valuesRaw.skills.split(', '),
                company: valuesRaw.company.id,
                startDate: dayjs(valuesRaw.startDate).format(),
                endDate: dayjs(valuesRaw.endDate).format(),
                description: rteRef.current?.editor?.getHTML(),
            };

            setErrMessage(undefined);
            setIsLoading(true);

            const result = await createJobAction(values);
            setIsLoading(false);

            if (!result.success) return setErrMessage(result.message);

            toastSuccess(TEXT.MESSAGE.CREATE_SUCCESS);
            router.back();
        },
    });

    return (
        <Stack gap={3}>
            {errMessage && <AlertError message={errMessage} />}
            <Box component={'form'} onSubmit={editForm.handleSubmit}>
                <Card variant="outlined">
                    <CardContent>
                        <Stack gap={3}>
                            {/* Name / Salary*/}
                            <Grid container spacing={2}>
                                {/* Name */}
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth
                                        label="Name"
                                        name="name"
                                        value={editForm.values.name}
                                        onChange={editForm.handleChange}
                                        error={
                                            editForm.touched.name &&
                                            editForm.errors.name !== undefined
                                        }
                                        helperText={editForm.touched.name && editForm.errors.name}
                                    />
                                </Grid>

                                {/* Salary */}
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth
                                        type="number"
                                        name="salary"
                                        label="Salary"
                                        value={editForm.values.salary}
                                        onChange={editForm.handleChange}
                                        error={
                                            editForm.touched.salary &&
                                            editForm.errors.salary !== undefined
                                        }
                                        helperText={
                                            editForm.touched.salary && editForm.errors.salary
                                        }
                                    />
                                </Grid>
                            </Grid>

                            {/* Skills / Location*/}
                            <Grid container spacing={2}>
                                {/* Skills */}
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth
                                        label="Skills"
                                        name="skills"
                                        value={editForm.values.skills}
                                        onChange={editForm.handleChange}
                                        error={
                                            editForm.touched.skills &&
                                            editForm.errors.skills !== undefined
                                        }
                                        helperText={
                                            editForm.touched.skills && editForm.errors.skills
                                        }
                                    />
                                </Grid>

                                {/* Location */}
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth
                                        label="Location"
                                        name="location"
                                        value={editForm.values.location}
                                        onChange={editForm.handleChange}
                                        error={
                                            editForm.touched.location &&
                                            editForm.errors.location !== undefined
                                        }
                                        helperText={
                                            editForm.touched.location && editForm.errors.location
                                        }
                                    />
                                </Grid>
                            </Grid>

                            {/* Company / Status */}
                            <Grid container spacing={2}>
                                {/* Company */}
                                <Grid item xs={6}>
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
                                                        editForm.touched.company &&
                                                        editForm.errors.company
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
                                </Grid>

                                {/* Status */}
                                <Grid item xs={6}>
                                    <Autocomplete
                                        fullWidth
                                        options={activeList}
                                        value={editForm.values.isActive}
                                        renderInput={(params) => {
                                            return (
                                                <TextField
                                                    {...params}
                                                    label="Status"
                                                    error={
                                                        editForm.touched.isActive &&
                                                        Boolean(editForm.errors.isActive)
                                                    }
                                                    helperText={
                                                        editForm.touched.isActive &&
                                                        editForm.errors.isActive
                                                            ? editForm.errors.isActive.label
                                                            : ''
                                                    }
                                                />
                                            );
                                        }}
                                        onChange={(_, value) => {
                                            editForm.setFieldValue(
                                                'isActive',
                                                value || { label: '', id: '' },
                                            );
                                        }}
                                    />
                                </Grid>
                            </Grid>

                            {/* Level / Quantity */}
                            <Grid container spacing={2}>
                                {/* Level */}
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth
                                        label="Level"
                                        name="level"
                                        value={editForm.values.level}
                                        onChange={editForm.handleChange}
                                        error={
                                            editForm.touched.level &&
                                            editForm.errors.level !== undefined
                                        }
                                        helperText={editForm.touched.level && editForm.errors.level}
                                    />
                                </Grid>

                                {/* Quantity */}
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth
                                        type="number"
                                        name="quantity"
                                        label="Quantity"
                                        value={editForm.values.quantity}
                                        onChange={editForm.handleChange}
                                        error={
                                            editForm.touched.quantity &&
                                            editForm.errors.quantity !== undefined
                                        }
                                        helperText={
                                            editForm.touched.quantity && editForm.errors.quantity
                                        }
                                    />
                                </Grid>
                            </Grid>

                            {/* startDate / endDate */}
                            <Grid container spacing={2}>
                                {/* startDate */}
                                <Grid item xs={6}>
                                    <DatePicker
                                        label="startDate"
                                        value={editForm.values.startDate}
                                        onChange={(value) =>
                                            editForm.setFieldValue('startDate', value)
                                        }
                                        error={
                                            editForm.touched.startDate &&
                                            editForm.errors.startDate !== undefined
                                        }
                                        helperText={
                                            editForm.touched.startDate && editForm.errors.startDate
                                        }
                                    />
                                </Grid>

                                {/* endDate */}
                                <Grid item xs={6}>
                                    <DatePicker
                                        label="endDate"
                                        value={editForm.values.endDate}
                                        onChange={(a) => {
                                            editForm.setFieldValue('endDate', a);
                                        }}
                                        error={
                                            editForm.touched.endDate &&
                                            editForm.errors.endDate !== undefined
                                        }
                                        helperText={
                                            editForm.touched.endDate && editForm.errors.endDate
                                        }
                                    />
                                </Grid>
                            </Grid>

                            {/* Description */}
                            {isClient && (
                                <RichTextEditor ref={rteRef} defaultValue={dataJob.description} />
                            )}
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
}
export default EditJob;
