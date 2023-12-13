'use client';

import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Divider,
    FormControlLabel,
    Grid,
    Radio,
    RadioGroup,
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
import { ROLE_HR, ROLE_USER } from '@/constant/role.constant';
import { createUserHrAction, createUserAction } from '@/app/admin/users/action';
import { ICreateUser, ICreateUserHr } from '@/interface/user';
import { toastSuccess } from '@/provider/ToastProvider';

interface IProps {
    initialGender: IOptionAutocomplete[];
    initialCompaies: IOptionAutocomplete[];
}

const CreateUser = ({ initialGender, initialCompaies }: IProps) => {
    const router = useRouter();

    const [errMessage, setErrMessage] = useState<string | undefined>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [genderList] = useState<IOptionAutocomplete[]>(initialGender);
    const [companiesList] = useState<IOptionAutocomplete[]>(initialCompaies);
    const [isUserOrHr, setIsUserOrHr] = useState<string>(ROLE_HR);

    const userCreateForm = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            address: '',
            age: '',
            gender: { label: '', id: '' },
            company: { label: '', id: '' },
        },
        validationSchema: Yup.object().shape({
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
            company: Yup.object().shape({
                label:
                    isUserOrHr === ROLE_HR
                        ? Yup.string().required(TEXT.MESSAGE.REQUIRED_FIELD('Company'))
                        : Yup.string(),
            }),
        }),
        onSubmit: async (values) => {
            setErrMessage(undefined);
            setIsLoading(true);
            if (isUserOrHr === ROLE_HR) {
                const data: ICreateUserHr = {
                    name: values.name,
                    email: values.email,
                    password: values.password,
                    address: values.address,
                    age: values.age,
                    gender: values.gender.label,
                    company: values.company.id,
                };
                const dataCreateUserHr = await createUserHrAction(data);

                setIsLoading(false);

                if (!dataCreateUserHr.success) return setErrMessage(dataCreateUserHr.message);

                toastSuccess(TEXT.MESSAGE.CREATE_SUCCESS);

                router.back();
            }

            if (isUserOrHr === ROLE_USER) {
                const data: ICreateUser = {
                    name: values.name,
                    email: values.email,
                    password: values.password,
                    address: values.address,
                    age: values.age,
                    gender: values.gender.label,
                };
                const dataCreateUser = await createUserAction(data);

                setIsLoading(false);

                if (!dataCreateUser.success) return setErrMessage(dataCreateUser.message);

                toastSuccess(TEXT.MESSAGE.CREATE_SUCCESS);

                router.back();
            }
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

                            {/* USER or HR */}
                            <RadioGroup
                                value={isUserOrHr}
                                onChange={(_: any, isUserOrHr: string) => {
                                    setIsUserOrHr(isUserOrHr);
                                }}
                            >
                                <FormControlLabel
                                    value={ROLE_USER}
                                    control={<Radio size="small" />}
                                    label="User"
                                />
                                <FormControlLabel
                                    value={ROLE_HR}
                                    control={<Radio size="small" />}
                                    label="Hr"
                                />
                            </RadioGroup>

                            {/* Company */}
                            {isUserOrHr === ROLE_HR && (
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
                                        userCreateForm.setFieldValue(
                                            'company',
                                            value || { label: '', id: '' },
                                        );
                                    }}
                                />
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

export default CreateUser;
