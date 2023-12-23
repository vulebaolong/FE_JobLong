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
import { IOptionAutocomplete } from '@/helpers/formik.helper';
import Autocomplete from '@/components/common/autocomplete/Autocomplete';
import { updateUserByIdAction } from '@/app/admin/users/action';
import { IUser } from '@/interface/user';
import { toastSuccess } from '@/provider/ToastProvider';

interface IProps {
    initialGender: IOptionAutocomplete[];
    initialCompaies: IOptionAutocomplete[];
    initialRole: IOptionAutocomplete[];
    user: IUser;
}

const EditUser = ({ initialGender, initialCompaies, initialRole, user }: IProps) => {
    const router = useRouter();

    const [errMessage, setErrMessage] = useState<string | undefined>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [genderList] = useState<IOptionAutocomplete[]>(initialGender);
    const [companiesList] = useState<IOptionAutocomplete[]>(initialCompaies);
    const [roleList] = useState<IOptionAutocomplete[]>(initialRole);

    const userEditForm = useFormik({
        initialValues: {
            name: user.name || '',
            email: user.email || '',
            address: user.address || '',
            age: `${user.age}` || '',
            gender: genderList.find((gender) => gender.label === user.gender) || {
                label: '',
                id: '',
            },
            company: companiesList.find((company) => company.label === user.company?.name) || {
                label: '',
                id: '',
            },
            role: roleList.find((role) => role.label === user.role.name) || {
                label: '',
                id: '',
            },
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().required(TEXT.MESSAGE.REQUIRED_FIELD('Name')),
            email: Yup.string()
                .email(TEXT.MESSAGE.EMAIL_FIELD)
                .required(TEXT.MESSAGE.REQUIRED_FIELD('Email')),
            address: Yup.string().required(TEXT.MESSAGE.REQUIRED_FIELD('Address')),
            age: Yup.string().required(TEXT.MESSAGE.REQUIRED_FIELD('Age')),
            gender: Yup.object().shape({
                label: Yup.string().required(TEXT.MESSAGE.REQUIRED_FIELD('Gender')),
            }),
            role: Yup.object().shape({
                label: Yup.string().required(TEXT.MESSAGE.REQUIRED_FIELD('Role')),
            }),
        }),
        onSubmit: async (valuesRaw) => {
            const values: any = { ...valuesRaw };
            if (values.company.label === '') {
                values.company = null;
            } else {
                values.company = values.company.id;
            }
            values.role = values.role.id;
            values.gender = values.gender.label;
            values.age = +values.age;

            setErrMessage(undefined);
            setIsLoading(true);

            const dataUpdateUser = await updateUserByIdAction(user._id, values);
            setIsLoading(false);

            if (!dataUpdateUser.success) return setErrMessage(dataUpdateUser.message);

            toastSuccess(TEXT.MESSAGE.CREATE_SUCCESS);
            router.back();
        },
    });

    return (
        <Stack gap={3} sx={{ maxWidth: 'sm' }}>
            {errMessage && <AlertError message={errMessage} />}
            <Box component={'form'} onSubmit={userEditForm.handleSubmit}>
                <Card variant="outlined">
                    <CardContent>
                        <Stack gap={3}>
                            {/* Name */}
                            <TextField
                                fullWidth
                                label="Name"
                                name="name"
                                value={userEditForm.values.name}
                                onChange={userEditForm.handleChange}
                                error={
                                    userEditForm.touched.name &&
                                    userEditForm.errors.name !== undefined
                                }
                                helperText={userEditForm.touched.name && userEditForm.errors.name}
                            />

                            {/* Email */}
                            <TextField
                                name="email"
                                label="Email"
                                fullWidth
                                value={userEditForm.values.email}
                                onChange={userEditForm.handleChange}
                                error={
                                    userEditForm.touched.email &&
                                    userEditForm.errors.email !== undefined
                                }
                                helperText={userEditForm.touched.email && userEditForm.errors.email}
                            />

                            {/* Age / Gender */}
                            <Grid container spacing={2}>
                                {/* Age */}
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth
                                        type="number"
                                        max={199}
                                        name="age"
                                        label="Age"
                                        value={userEditForm.values.age}
                                        onChange={userEditForm.handleChange}
                                        error={
                                            userEditForm.touched.age &&
                                            userEditForm.errors.age !== undefined
                                        }
                                        helperText={
                                            userEditForm.touched.age && userEditForm.errors.age
                                        }
                                    />
                                </Grid>

                                {/* Gender */}
                                <Grid item xs={6}>
                                    <Autocomplete
                                        fullWidth
                                        options={genderList}
                                        value={userEditForm.values.gender}
                                        renderInput={(params) => {
                                            return (
                                                <TextField
                                                    {...params}
                                                    label="Gender"
                                                    error={
                                                        userEditForm.touched.gender &&
                                                        Boolean(userEditForm.errors.gender)
                                                    }
                                                    helperText={
                                                        userEditForm.touched.gender &&
                                                        userEditForm.errors.gender
                                                            ? userEditForm.errors.gender.label
                                                            : ''
                                                    }
                                                />
                                            );
                                        }}
                                        onChange={(_, value) => {
                                            userEditForm.setFieldValue(
                                                'gender',
                                                value || { label: '', id: '' },
                                            );
                                        }}
                                    />
                                </Grid>
                            </Grid>

                            {/* Address */}
                            <TextField
                                fullWidth
                                label="Address"
                                name="address"
                                value={userEditForm.values.address}
                                onChange={userEditForm.handleChange}
                                error={
                                    userEditForm.touched.address &&
                                    userEditForm.errors.address !== undefined
                                }
                                helperText={
                                    userEditForm.touched.address && userEditForm.errors.address
                                }
                            />

                            {/* Company */}
                            <Autocomplete
                                fullWidth
                                options={companiesList}
                                value={userEditForm.values.company}
                                renderInput={(params) => {
                                    return (
                                        <TextField
                                            {...params}
                                            label="Company"
                                            error={
                                                userEditForm.touched.company &&
                                                Boolean(userEditForm.errors.company)
                                            }
                                            helperText={
                                                userEditForm.touched.company &&
                                                userEditForm.errors.company
                                                    ? userEditForm.errors.company.label
                                                    : ''
                                            }
                                        />
                                    );
                                }}
                                onChange={(_, value) => {
                                    userEditForm.setFieldValue(
                                        'company',
                                        value || { label: '', id: '' },
                                    );
                                }}
                            />

                            {/* Role */}
                            <Autocomplete
                                fullWidth
                                options={roleList}
                                value={userEditForm.values.role}
                                renderInput={(params) => {
                                    return (
                                        <TextField
                                            {...params}
                                            label="Role"
                                            error={
                                                userEditForm.touched.role &&
                                                Boolean(userEditForm.errors.role)
                                            }
                                            helperText={
                                                userEditForm.touched.role &&
                                                userEditForm.errors.role
                                                    ? userEditForm.errors.role.label
                                                    : ''
                                            }
                                        />
                                    );
                                }}
                                onChange={(_, value) => {
                                    userEditForm.setFieldValue(
                                        'role',
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

export default EditUser;
