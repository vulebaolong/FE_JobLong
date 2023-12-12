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

interface IProps {
    initialMethods: IOptionAutocomplete[];
}

const CreatePermission = ({ initialMethods }: IProps) => {
    const router = useRouter();

    const [errMessage, setErrMessage] = useState<string | undefined>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [methodList] = useState<IOptionAutocomplete[]>(initialMethods);

    const userCreateForm = useFormik({
        initialValues: {
            name: '',
            apiPath: '',
            method: { label: '', id: '' },
            module: '',
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().required(TEXT.MESSAGE.REQUIRED_FIELD('Name')),
            apiPath: Yup.string().required(TEXT.MESSAGE.REQUIRED_FIELD('Path')),
            method: Yup.object().shape({
                label: Yup.string().required(TEXT.MESSAGE.REQUIRED_FIELD('Method')),
            }),
            module: Yup.string().required(TEXT.MESSAGE.REQUIRED_FIELD('Module')),
        }),
        onSubmit: async (valuesRaw) => {
            setErrMessage(undefined);
            setIsLoading(true);

             const values = {
                ...valuesRaw,
                method: valuesRaw.method.label
             }

            const result = await createPermissionAction(values)

            setIsLoading(false);

            if (result.statusCode !== 201) return setErrMessage(result.message);

            toastSuccess(TEXT.MESSAGE.CREATE_SUCCESS);

            router.back();
        },
    });

    return (
        <Stack gap={3} sx={{ maxWidth: 'sm' }}>
            {errMessage && <AlertError message={errMessage} />}
            <Box component={'form'} onSubmit={userCreateForm.handleSubmit}>
                <Card variant="outlined">
                    <CardContent>
                        <Stack gap={3}>
                            {/* Name */}
                            <TextField
                                fullWidth
                                label="Name"
                                name="name"
                                value={userCreateForm.values.name}
                                onChange={userCreateForm.handleChange}
                                error={
                                    userCreateForm.touched.name &&
                                    userCreateForm.errors.name !== undefined
                                }
                                helperText={
                                    userCreateForm.touched.name && userCreateForm.errors.name
                                }
                            />

                            {/* Path */}
                            <TextField
                                fullWidth
                                label="Path"
                                name="apiPath"
                                value={userCreateForm.values.apiPath}
                                onChange={userCreateForm.handleChange}
                                error={
                                    userCreateForm.touched.apiPath &&
                                    userCreateForm.errors.apiPath !== undefined
                                }
                                helperText={
                                    userCreateForm.touched.apiPath && userCreateForm.errors.apiPath
                                }
                                placeholder="/api/v1/module/:id"
                            />

                            {/* Method */}
                            <Autocomplete
                                fullWidth
                                options={methodList}
                                value={userCreateForm.values.method}
                                renderInput={(params) => {
                                    return (
                                        <TextField
                                            {...params}
                                            label="Method"
                                            error={
                                                userCreateForm.touched.method &&
                                                Boolean(userCreateForm.errors.method)
                                            }
                                            helperText={
                                                userCreateForm.touched.method &&
                                                userCreateForm.errors.method
                                                    ? userCreateForm.errors.method.label
                                                    : ''
                                            }
                                        />
                                    );
                                }}
                                onChange={(_, value) => {
                                    userCreateForm.setFieldValue(
                                        'method',
                                        value || { label: '', id: '' },
                                    );
                                }}
                            />

                            {/* Module */}
                            <TextField
                                fullWidth
                                label="Module"
                                name="module"
                                value={userCreateForm.values.module}
                                onChange={userCreateForm.handleChange}
                                error={
                                    userCreateForm.touched.module &&
                                    userCreateForm.errors.module !== undefined
                                }
                                helperText={
                                    userCreateForm.touched.module && userCreateForm.errors.module
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

export default CreatePermission;
