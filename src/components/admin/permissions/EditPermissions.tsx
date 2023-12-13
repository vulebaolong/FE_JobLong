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
import { IPermission } from '@/interface/permission';
import { updatePermissionByIdAction } from '@/app/admin/permissions/action';

interface IProps {
    initialMethods: IOptionAutocomplete[];
    permission: IPermission;
}

const EditPermissions = ({ initialMethods, permission }: IProps) => {
    const router = useRouter();

    const [errMessage, setErrMessage] = useState<string | undefined>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [methodList] = useState<IOptionAutocomplete[]>(initialMethods);

    const editForm = useFormik({
        initialValues: {
            name: permission.name || '',
            apiPath: permission.apiPath || '',
            method: methodList.find((method) => method.label === permission.method) || {
                label: '',
                id: '',
            },
            module: permission.module || '',
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
            const values = {
                ...valuesRaw,
                method: valuesRaw.method.label,
            };

            setErrMessage(undefined);
            setIsLoading(true);

            const result = await updatePermissionByIdAction(permission._id, values);
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
                            {/* Name */}
                            <TextField
                                fullWidth
                                label="Name"
                                name="name"
                                value={editForm.values.name}
                                onChange={editForm.handleChange}
                                error={editForm.touched.name && editForm.errors.name !== undefined}
                                helperText={editForm.touched.name && editForm.errors.name}
                            />

                            {/* Path */}
                            <TextField
                                fullWidth
                                label="Path"
                                name="apiPath"
                                value={editForm.values.apiPath}
                                onChange={editForm.handleChange}
                                error={
                                    editForm.touched.apiPath &&
                                    editForm.errors.apiPath !== undefined
                                }
                                helperText={editForm.touched.apiPath && editForm.errors.apiPath}
                            />

                            {/* Method */}
                            <Autocomplete
                                fullWidth
                                options={methodList}
                                value={editForm.values.method}
                                renderInput={(params) => {
                                    return (
                                        <TextField
                                            {...params}
                                            label="Method"
                                            error={
                                                editForm.touched.method &&
                                                Boolean(editForm.errors.method)
                                            }
                                            helperText={
                                                editForm.touched.method && editForm.errors.method
                                                    ? editForm.errors.method.label
                                                    : ''
                                            }
                                        />
                                    );
                                }}
                                onChange={(_, value) => {
                                    editForm.setFieldValue(
                                        'method',
                                        value || { label: '', id: '' },
                                    );
                                }}
                            />

                            {/* Module */}
                            <TextField
                                fullWidth
                                label="Module"
                                name="apiPath"
                                value={editForm.values.module}
                                onChange={editForm.handleChange}
                                error={
                                    editForm.touched.module && editForm.errors.module !== undefined
                                }
                                helperText={editForm.touched.module && editForm.errors.module}
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

export default EditPermissions;
