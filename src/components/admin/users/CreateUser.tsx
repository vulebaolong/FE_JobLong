'use client';

import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Divider,
    Grid,
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
import { IOptionAutocomplete } from '@/helpers/formik.helper';
import Autocomplete from '@/components/common/autocomplete/Autocomplete';

interface IProps {
    initialGender: IOptionAutocomplete[];
    initialRole: IOptionAutocomplete[];
    initialCompaies: IOptionAutocomplete[];
}

const CreateUser = ({ initialGender, initialRole, initialCompaies }: IProps) => {
    const router = useRouter();

    const [errMessage, setErrMessage] = useState('');
    const [ownerTenants, setOwnerTenants] = useState([]);
    const [onRequest, setOnRequest] = useState(false);

    const [genderList, setGenderList] = useState<IOptionAutocomplete[]>(initialGender);
    const [roleList, setRoleList] = useState<IOptionAutocomplete[]>(initialRole);
    const [companiesList, setCompaniesList] = useState<IOptionAutocomplete[]>(initialCompaies);

    const userCreateForm = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            address: '',
            age: '',
            gender: { label: '', id: '' },
            role: { label: '', id: '' },
            company: { label: '', id: '' },
        },
        validationSchema: Yup.object({
            name: Yup.string().required(TEXT.MESSAGE.REQUIRED_FIELD('Name')),
            email: Yup.string()
                .email(TEXT.MESSAGE.EMAIL_FIELD)
                .required(TEXT.MESSAGE.REQUIRED_FIELD('Email')),
            password: Yup.string().required(TEXT.MESSAGE.REQUIRED_FIELD('Password')),
            address: Yup.string().required(TEXT.MESSAGE.REQUIRED_FIELD('Address')),
            age: Yup.string().required(TEXT.MESSAGE.REQUIRED_FIELD('Age')),
            gender: Yup.object().shape({
                label: Yup.string().required(TEXT.MESSAGE.REQUIRED_FIELD('Gender')),
            }),
            role: Yup.object().shape({
                label: Yup.string().required(TEXT.MESSAGE.REQUIRED_FIELD('Role')),
            }),
            company: Yup.object().shape({
                label: Yup.string().required(TEXT.MESSAGE.REQUIRED_FIELD('Company')),
            }),
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
                                name="email"
                                label="Email"
                                fullWidth
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

                            {/* password */}
                            <InputPassword
                                name="password"
                                label="Password"
                                password
                                fullWidth
                                value={userCreateForm.values.password}
                                onChange={userCreateForm.handleChange}
                                error={
                                    userCreateForm.touched.password &&
                                    userCreateForm.errors.password !== undefined
                                }
                                helperText={
                                    userCreateForm.touched.password &&
                                    userCreateForm.errors.password
                                }
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
                                        value={userCreateForm.values.age}
                                        onChange={userCreateForm.handleChange}
                                        error={
                                            userCreateForm.touched.age &&
                                            userCreateForm.errors.age !== undefined
                                        }
                                        helperText={
                                            userCreateForm.touched.age && userCreateForm.errors.age
                                        }
                                    />
                                </Grid>

                                {/* Gender */}
                                <Grid item xs={6}>
                                    <Autocomplete
                                        fullWidth
                                        options={genderList}
                                        value={userCreateForm.values.gender}
                                        renderInput={(params) => {
                                            return (
                                                <TextField
                                                    {...params}
                                                    label="Gender"
                                                    error={
                                                        userCreateForm.touched.gender &&
                                                        Boolean(userCreateForm.errors.gender)
                                                    }
                                                    helperText={
                                                        userCreateForm.touched.gender &&
                                                        userCreateForm.errors.gender
                                                            ? userCreateForm.errors.gender.label
                                                            : ''
                                                    }
                                                />
                                            );
                                        }}
                                        onChange={(_, value) => {
                                            userCreateForm.setFieldValue(
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

                            {/* Role */}
                            <Autocomplete
                                fullWidth
                                options={roleList}
                                value={userCreateForm.values.role}
                                renderInput={(params) => {
                                    return (
                                        <TextField
                                            {...params}
                                            label="Role"
                                            error={
                                                userCreateForm.touched.role &&
                                                Boolean(userCreateForm.errors.role)
                                            }
                                            helperText={
                                                userCreateForm.touched.role &&
                                                userCreateForm.errors.role
                                                    ? userCreateForm.errors.role.label
                                                    : ''
                                            }
                                        />
                                    );
                                }}
                                onChange={(_, value) => {
                                    userCreateForm.setFieldValue('role', value || { label: '', id: '' });
                                }}
                            />

                            {/* Company */}
                            <Autocomplete
                                fullWidth
                                options={companiesList}
                                value={userCreateForm.values.company}
                                renderInput={(params) => {
                                    return (
                                        <TextField
                                            {...params}
                                            label="Company"
                                            error={
                                                userCreateForm.touched.company &&
                                                Boolean(userCreateForm.errors.company)
                                            }
                                            helperText={
                                                userCreateForm.touched.company &&
                                                userCreateForm.errors.company
                                                    ? userCreateForm.errors.company.label
                                                    : ''
                                            }
                                        />
                                    );
                                }}
                                onChange={(_, value) => {
                                    userCreateForm.setFieldValue('company', value || { label: '', id: '' });
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
