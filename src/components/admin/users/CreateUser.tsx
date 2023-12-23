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

    const createForm = useFormik({
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
                    age: +values.age,
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
            <Box component={'form'} onSubmit={createForm.handleSubmit}>
                <Card variant="outlined">
                    <CardContent>
                        <Stack gap={3}>
                            {/* Name */}
                            <TextField
                                fullWidth
                                label="Name"
                                name="name"
                                value={createForm.values.name}
                                onChange={createForm.handleChange}
                                error={
                                    createForm.touched.name && createForm.errors.name !== undefined
                                }
                                helperText={createForm.touched.name && createForm.errors.name}
                            />

                            {/* Email */}
                            <TextField
                                name="email"
                                label="Email"
                                fullWidth
                                value={createForm.values.email}
                                onChange={createForm.handleChange}
                                error={
                                    createForm.touched.email &&
                                    createForm.errors.email !== undefined
                                }
                                helperText={createForm.touched.email && createForm.errors.email}
                            />

                            {/* password */}
                            <InputPassword
                                name="password"
                                label="Password"
                                password
                                fullWidth
                                value={createForm.values.password}
                                onChange={createForm.handleChange}
                                error={
                                    createForm.touched.password &&
                                    createForm.errors.password !== undefined
                                }
                                helperText={
                                    createForm.touched.password && createForm.errors.password
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
                                        value={createForm.values.age}
                                        onChange={createForm.handleChange}
                                        error={
                                            createForm.touched.age &&
                                            createForm.errors.age !== undefined
                                        }
                                        helperText={createForm.touched.age && createForm.errors.age}
                                    />
                                </Grid>

                                {/* Gender */}
                                <Grid item xs={6}>
                                    <Autocomplete
                                        fullWidth
                                        options={genderList}
                                        value={createForm.values.gender}
                                        renderInput={(params) => {
                                            return (
                                                <TextField
                                                    {...params}
                                                    label="Gender"
                                                    error={
                                                        createForm.touched.gender &&
                                                        Boolean(createForm.errors.gender)
                                                    }
                                                    helperText={
                                                        createForm.touched.gender &&
                                                        createForm.errors.gender
                                                            ? createForm.errors.gender.label
                                                            : ''
                                                    }
                                                />
                                            );
                                        }}
                                        onChange={(_, value) => {
                                            createForm.setFieldValue(
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
                                value={createForm.values.address}
                                onChange={createForm.handleChange}
                                error={
                                    createForm.touched.address &&
                                    createForm.errors.address !== undefined
                                }
                                helperText={createForm.touched.address && createForm.errors.address}
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
