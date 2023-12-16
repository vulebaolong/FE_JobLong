'use client';

import { Box, Button, Card, CardActions, CardContent, Divider, Grid, Stack } from '@mui/material';
import { useFormik } from 'formik';
import { useEffect, useRef, useState } from 'react';
import * as Yup from 'yup';
import { LoadingButton } from '@mui/lab';
import { TEXT } from '@/constant/text.contants';
import AlertError from '@/components/common/alert/AlertError';
import { useRouter } from 'next/navigation';
import TextField from '@/components/common/textField/TextField';
import { IOptionAutocomplete, convertStringToBoolean } from '@/helpers/formik.helper';
import Autocomplete from '@/components/common/autocomplete/Autocomplete';
import { toastSuccess, toastWarning } from '@/provider/ToastProvider';
import DatePicker from '@/components/common/datepicker/DatePicker';
import dayjs from 'dayjs';
import { createJobAction } from '@/app/admin/jobs/action';
import { borderRadius } from '@/provider/ThemeRegistry';
import RichTextEditor from '@/components/common/richTextEditor/RichTextEditor';
import { RichTextEditorRef } from 'mui-tiptap';

interface IProps {
    initialCompaies: IOptionAutocomplete[];
    initialActives: IOptionAutocomplete[];
}

const CreateJob = ({ initialCompaies, initialActives }: IProps) => {
    const rteRef = useRef<RichTextEditorRef>(null);
    const router = useRouter();

    const [errMessage, setErrMessage] = useState<string | undefined>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [isClient, setIsClient] = useState(false);
    useEffect(() => {
        setIsClient(true);
    }, []);

    const [activeList] = useState<IOptionAutocomplete[]>(initialActives);
    const [companiesList] = useState<IOptionAutocomplete[]>(initialCompaies);

    const createForm = useFormik({
        initialValues: {
            name: '',
            skills: '',
            company: { label: '', id: '' },
            location: '',
            salary: '',
            quantity: '',
            level: '',
            startDate: '',
            endDate: '',
            isActive: { label: '', id: '' },
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

    // const handleChange = (state: any) => {
    //     const html = stateToHTML(state.getCurrentContent())
    //     setValueEditor(html);
    // };

    return (
        <Stack gap={3}>
            {errMessage && <AlertError message={errMessage} />}
            <Box component={'form'} onSubmit={createForm.handleSubmit}>
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
                                        value={createForm.values.name}
                                        onChange={createForm.handleChange}
                                        error={
                                            createForm.touched.name &&
                                            createForm.errors.name !== undefined
                                        }
                                        helperText={
                                            createForm.touched.name && createForm.errors.name
                                        }
                                    />
                                </Grid>

                                {/* Salary */}
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth
                                        type="number"
                                        name="salary"
                                        label="Salary"
                                        value={createForm.values.salary}
                                        onChange={createForm.handleChange}
                                        error={
                                            createForm.touched.salary &&
                                            createForm.errors.salary !== undefined
                                        }
                                        helperText={
                                            createForm.touched.salary && createForm.errors.salary
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
                                        value={createForm.values.skills}
                                        onChange={createForm.handleChange}
                                        error={
                                            createForm.touched.skills &&
                                            createForm.errors.skills !== undefined
                                        }
                                        helperText={
                                            createForm.touched.skills && createForm.errors.skills
                                        }
                                    />
                                </Grid>

                                {/* Location */}
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth
                                        label="Location"
                                        name="location"
                                        value={createForm.values.location}
                                        onChange={createForm.handleChange}
                                        error={
                                            createForm.touched.location &&
                                            createForm.errors.location !== undefined
                                        }
                                        helperText={
                                            createForm.touched.location &&
                                            createForm.errors.location
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
                                </Grid>

                                {/* Status */}
                                <Grid item xs={6}>
                                    <Autocomplete
                                        fullWidth
                                        options={activeList}
                                        value={createForm.values.isActive}
                                        renderInput={(params) => {
                                            return (
                                                <TextField
                                                    {...params}
                                                    label="Status"
                                                    error={
                                                        createForm.touched.isActive &&
                                                        Boolean(createForm.errors.isActive)
                                                    }
                                                    helperText={
                                                        createForm.touched.isActive &&
                                                        createForm.errors.isActive
                                                            ? createForm.errors.isActive.label
                                                            : ''
                                                    }
                                                />
                                            );
                                        }}
                                        onChange={(_, value) => {
                                            createForm.setFieldValue(
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
                                        value={createForm.values.level}
                                        onChange={createForm.handleChange}
                                        error={
                                            createForm.touched.level &&
                                            createForm.errors.level !== undefined
                                        }
                                        helperText={
                                            createForm.touched.level && createForm.errors.level
                                        }
                                    />
                                </Grid>

                                {/* Quantity */}
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth
                                        type="number"
                                        name="quantity"
                                        label="Quantity"
                                        value={createForm.values.quantity}
                                        onChange={createForm.handleChange}
                                        error={
                                            createForm.touched.quantity &&
                                            createForm.errors.quantity !== undefined
                                        }
                                        helperText={
                                            createForm.touched.quantity &&
                                            createForm.errors.quantity
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
                                        value={createForm.values.startDate}
                                        onChange={(value) =>
                                            createForm.setFieldValue('startDate', value)
                                        }
                                        error={
                                            createForm.touched.startDate &&
                                            createForm.errors.startDate !== undefined
                                        }
                                        helperText={
                                            createForm.touched.startDate &&
                                            createForm.errors.startDate
                                        }
                                    />
                                </Grid>

                                {/* endDate */}
                                <Grid item xs={6}>
                                    <DatePicker
                                        label="endDate"
                                        value={createForm.values.endDate}
                                        onChange={(a) => {
                                            createForm.setFieldValue('endDate', a);
                                        }}
                                        error={
                                            createForm.touched.endDate &&
                                            createForm.errors.endDate !== undefined
                                        }
                                        helperText={
                                            createForm.touched.endDate && createForm.errors.endDate
                                        }
                                    />
                                </Grid>
                            </Grid>

                            {/* Description */}
                            {isClient && <RichTextEditor ref={rteRef} />}
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

export default CreateJob;
