'use client';

import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Divider,
    MenuItem,
    Stack,
} from '@mui/material';
import { useFormik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';
import { LoadingButton } from '@mui/lab';
import { TEXT } from '@/constant/text.contants';
import AlertError from '@/components/common/alert/AlertError';
import { useRouter } from 'next/navigation';
import TextField from '@/components/common/textField/TextField';
import InputPassword from '@/components/common/InputPassword/InputPassword';

const CreateUser = () => {
    const router = useRouter();

    const [errMessage, setErrMessage] = useState('');
    const [ownerTenants, setOwnerTenants] = useState([]);
    const [onRequest, setOnRequest] = useState(false);

    const userCreateForm = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            address: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required(TEXT.MESSAGE.REQUIRED_FIELD('Name')),
            email: Yup.string()
                .email(TEXT.MESSAGE.EMAIL_FIELD)
                .required(TEXT.MESSAGE.REQUIRED_FIELD('Email')),
            password: Yup.string().required(TEXT.MESSAGE.REQUIRED_FIELD('Password')),
            address: Yup.string().required(TEXT.MESSAGE.REQUIRED_FIELD('Address')),
        }),
        onSubmit: async (values) => {
            console.log(values);
        },
    });

    const onOrganizationChange = async () => {};

    const onLayerChange = async () => {};

    const getTenants = async () => {};

    return (
        <Stack gap={3}>
            {errMessage && <AlertError message={errMessage} />}
            <Box component={'form'} onSubmit={userCreateForm.handleSubmit}>
                <Card variant="outlined" sx={{ maxWidth: 'sm' }}>
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

                            {/* Email */}
                            <TextField
                                fullWidth
                                label="Email"
                                name="email"
                                value={userCreateForm.values.email}
                                onChange={userCreateForm.handleChange}
                                error={
                                    userCreateForm.touched.email &&
                                    userCreateForm.errors.email !== undefined
                                }
                                helperText={
                                    userCreateForm.touched.email && userCreateForm.errors.email
                                }
                            />

                            <InputPassword
                                name="password"
                                label="Mật khẩu"
                                value={userCreateForm.values.password}
                                variant="outlined"
                                fullWidth
                                onChange={userCreateForm.handleChange}
                                password
                                error={
                                    userCreateForm.errors.password
                                        ? true
                                        : false && userCreateForm.touched.password
                                }
                                helperText={userCreateForm.errors.password}
                            />

                            {/* Address */}
                            <TextField
                                fullWidth
                                label="Address"
                                name="address"
                                value={userCreateForm.values.address}
                                onChange={userCreateForm.handleChange}
                                error={
                                    userCreateForm.touched.address &&
                                    userCreateForm.errors.address !== undefined
                                }
                                helperText={
                                    userCreateForm.touched.address && userCreateForm.errors.address
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
                            loading={onRequest}
                        >
                            {TEXT.BUTTON_TEXT.ADD}
                        </LoadingButton>
                        <Button onClick={() => router.back()} disabled={onRequest}>
                            {TEXT.BUTTON_TEXT.CANCEL}
                        </Button>
                    </CardActions>
                </Card>
            </Box>
        </Stack>
    );
};

export default CreateUser;
