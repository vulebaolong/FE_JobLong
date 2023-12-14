'use client';

import { Box, Button, Card, CardActions, CardContent, Divider, Grid, Stack } from '@mui/material';
import { useFormik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';
import { LoadingButton } from '@mui/lab';
import { TEXT } from '@/constant/text.contants';
import AlertError from '@/components/common/alert/AlertError';
import { useRouter } from 'next/navigation';
import TextField from '@/components/common/textField/TextField';
import { IOptionAutocomplete, convertStringToBoolean } from '@/helpers/formik.helper';
import Autocomplete from '@/components/common/autocomplete/Autocomplete';
import { permissionModule } from '@/helpers/function.helper';
import ModulePermission from './ModulePermission/ModulePermission';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { createRoleAction } from '@/app/admin/roles/action';
import { toastSuccess } from '@/provider/ToastProvider';

interface IProps {
    initialActives: IOptionAutocomplete[];
    permissionModule: permissionModule[];
}

const CreateRole = ({ initialActives, permissionModule }: IProps) => {
    const router = useRouter();
    const { listPermissionSelectedCreate } = useSelector((state: RootState) => state.roleSlice);
    const [errMessage, setErrMessage] = useState<string | undefined>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [activeList] = useState<IOptionAutocomplete[]>(initialActives);

    const createForm = useFormik({
        initialValues: {
            name: '',
            description: '',
            isActive: { label: '', id: '' },
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().required(TEXT.MESSAGE.REQUIRED_FIELD('Name')),
            description: Yup.string().required(TEXT.MESSAGE.REQUIRED_FIELD('Description')),
            isActive: Yup.object().shape({
                label: Yup.string().required(TEXT.MESSAGE.REQUIRED_FIELD('Status')),
            }),
        }),
        onSubmit: async (valuesRaw) => {
            setErrMessage(undefined);
            setIsLoading(true);

            const values = {
                ...valuesRaw,
                isActive: convertStringToBoolean(valuesRaw.isActive.id),
                permissions: listPermissionSelectedCreate,
            };

            const dataCreateRole = await createRoleAction(values);
            setIsLoading(false);

            if (!dataCreateRole.success) return setErrMessage(dataCreateRole.message);

            toastSuccess(TEXT.MESSAGE.CREATE_SUCCESS);
            router.back();
        },
    });

    return (
        <Stack gap={3}>
            {errMessage && <AlertError message={errMessage} />}
            <Box component={'form'} onSubmit={createForm.handleSubmit}>
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

                            {/* Description */}
                            <TextField
                                fullWidth
                                label="Description"
                                name="description"
                                value={createForm.values.description}
                                onChange={createForm.handleChange}
                                error={
                                    createForm.touched.description &&
                                    createForm.errors.description !== undefined
                                }
                                helperText={
                                    createForm.touched.description && createForm.errors.description
                                }
                            />

                            {/* Accordion */}
                            <ModulePermission
                                type="createRole"
                                permissionModule={permissionModule}
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

export default CreateRole;
