'use client';

import AlertError from '@/components/common/alert/AlertError';
import Autocomplete from '@/components/common/autocomplete/Autocomplete';
import TextField from '@/components/common/textField/TextField';
import { TEXT } from '@/constant/text.contants';
import { IOptionAutocomplete, convertStringToBoolean } from '@/helpers/formik.helper';
import { IRole } from '@/interface/role';
import { toastSuccess } from '@/provider/ToastProvider';
import { LoadingButton } from '@mui/lab';
import {  Box, Button, Card, CardActions, CardContent, Divider, Grid, Stack } from '@mui/material';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import * as Yup from 'yup';

interface IProps {
    dataRole: IRole;
    initialActives: IOptionAutocomplete[];
}

function EditRole({ dataRole, initialActives }: IProps) {
    const router = useRouter();

    const [errMessage, setErrMessage] = useState<string | undefined>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [activeList] = useState<IOptionAutocomplete[]>(initialActives);

    const editForm = useFormik({
        initialValues: {
            name: dataRole.name || '',
            description: dataRole.description || '',
            isActive: activeList.find((isActive) => isActive.id === `${dataRole.isActive}`) || {
                label: '',
                id: '',
            },
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().required(TEXT.MESSAGE.REQUIRED_FIELD('Name')),
            description: Yup.string().required(TEXT.MESSAGE.REQUIRED_FIELD('Description')),
            isActive: Yup.object().shape({
                label: Yup.string().required(TEXT.MESSAGE.REQUIRED_FIELD('Status')),
            }),
        }),
        onSubmit: async (valuesRaw) => {
            const values = {
                ...valuesRaw,
                isActive: convertStringToBoolean(valuesRaw.isActive.id),
            };

            setErrMessage(undefined);
            setIsLoading(true);

            // const result = await updatePermissionByIdAction(permission._id, values);
            setIsLoading(false);

            // if (!result.success) return setErrMessage(result.message);

            toastSuccess(TEXT.MESSAGE.CREATE_SUCCESS);
            router.back();
        },
    });

    return (
        <Stack gap={3} >
            {errMessage && <AlertError message={errMessage} />}
            <Box component={'form'} onSubmit={editForm.handleSubmit}>
                <Card variant="outlined">
                    <CardContent>
                        <Stack gap={3}>
                            {/* Name and Status */}
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

                            {/* Description */}
                            <TextField
                                fullWidth
                                label="Description"
                                name="description"
                                value={editForm.values.description}
                                onChange={editForm.handleChange}
                                error={
                                    editForm.touched.description &&
                                    editForm.errors.description !== undefined
                                }
                                helperText={
                                    editForm.touched.description && editForm.errors.description
                                }
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
}
export default EditRole;
