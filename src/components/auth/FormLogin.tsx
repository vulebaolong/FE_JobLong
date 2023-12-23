'use client';

import { Button } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toastError, toastSuccess } from '@/provider/ToastProvider';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { DispatchType } from '@/redux/store';
import { ILoginRequest } from '@/interface/auth';
import { loginAction } from '@/app/auth/[id]/action';
import { loginAuth } from '@/redux/slices/authSlice';
import { lcStorage } from '@/helpers/localStorage';
import { ACCESS_TOKEN, USER_LOGIN } from '@/constant/userContants';
import InputPassword from '../common/InputPassword/InputPassword';
import { TEXT } from '@/constant/text.contants';
import TextField from '../common/textField/TextField';

function FormLogin() {
    const dispatch: DispatchType = useDispatch();

    const router = useRouter();

    const formLogin = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email(TEXT.MESSAGE.EMAIL_FIELD)
                .required(TEXT.MESSAGE.REQUIRED_FIELD('Email')),
            password: Yup.string().required(TEXT.MESSAGE.REQUIRED_FIELD('Password')),
        }),
        onSubmit: async (values) => {
            // signIn('credentials', {
            //     username: values.email,
            //     password: values.password,
            //     redirect: false,
            //     callbackUrl: '/'
            // }).then((res) => {
            //     console.log(res);
            //     if (res?.error) return toastError("Đăng nhập không thành công")

            //     toastSuccess("Đăng nhập thành công")
            //     // router.push('/')
            //     router.back()

            //     // setTimeout(() => {
            //     //     window.location.reload()
            //     // }, 100);

            // })

            const loginRequest: ILoginRequest = {
                username: values.email,
                password: values.password,
            };

            const result = await loginAction(loginRequest);
            if (result.statusCode !== 201) return toastError('Đăng nhập không thành công');

            dispatch(
                loginAuth({
                    userLogin: result.data.user,
                    accessToken: result.data.access_token,
                }),
            );

            lcStorage.set(USER_LOGIN, result.data.user);
            lcStorage.set(ACCESS_TOKEN, result.data.access_token);

            toastSuccess('Đăng nhập thành công');
            router.back();
        },
    });

    const handleAutoField = () => {
        formLogin.setValues({
            email: 'vulebaolong@gmail.com',
            password: '123456',
        });
    };

    return (
        <form className="space-y-5">
            <TextField
                name="email"
                label="Email"
                fullWidth
                value={formLogin.values.email}
                onChange={formLogin.handleChange}
                error={formLogin.touched.email && formLogin.errors.email !== undefined}
                helperText={formLogin.touched.email && formLogin.errors.email}
            />

            <InputPassword
                name="password"
                label="Password"
                password
                fullWidth
                value={formLogin.values.password}
                onChange={formLogin.handleChange}
                error={formLogin.touched.password && formLogin.errors.password !== undefined}
                helperText={formLogin.touched.password && formLogin.errors.password}
            />

            <div>
                <Button onClick={handleAutoField} type="button" variant="outlined">
                    Trial account
                </Button>
            </div>

            <Button onClick={formLogin.submitForm} variant="contained">
                {TEXT.BUTTON_TEXT.LOGIN}
            </Button>
        </form>
    );
}
export default FormLogin;
