import "@/api/apiConfig";
import { Button, TextField } from "@mui/material"
import { useFormik } from "formik";
import InputNumber from "../InputNumber/InputNumber";
import * as Yup from "yup";
import { authApi } from "@/api/authApi";
import { ILoginRequest } from "@/interface/auth";
import { toastSuccess } from "@/provider/ToastProvider";
import { lcStorage } from "@/helpers/localStorage";
import { ACCESS_TOKEN, USER_LOGIN } from "@/constant/userContants";
import { useDispatch } from "react-redux";
import { DispatchType } from "@/redux/store";
import { setAuth } from "@/redux/slices/authSlice";

function FormLogin() {

    const dispatch: DispatchType = useDispatch()

    const formLogin = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().required("Vui lòng nhập email").email("Vui lòng nhập đúng định dạng email"),
            password: Yup.string().required("Vui lòng nhập password")
        }),
        onSubmit: async (values) => {
            const loginRequest: ILoginRequest = {
                username: values.email,
                password: values.password
            }
            const result = await authApi.login(loginRequest)
            toastSuccess("Đăng nhập thành công")

            lcStorage.set(ACCESS_TOKEN, result.data.data.access_token)
            lcStorage.set(USER_LOGIN, result.data.data.user)

            dispatch(setAuth({
                userLogin: result.data.data.user,
                accessToken: result.data.data.access_token
            }))
        },
    });

    const handleAutoField = () => {
        formLogin.setValues({
            email: 'vulebaolongdeptrai@gmail.com',
            password: '123456'
        })
    }

    return (
        <div className="space-y-5">
            <TextField
                name="email"
                label="Email"
                value={formLogin.values.email}
                variant="outlined"
                fullWidth
                onChange={formLogin.handleChange}
                error={formLogin.errors.email ? true : false && formLogin.touched.email}
                helperText={formLogin.errors.email}
            />
            <InputNumber
                name="password"
                label="Mật khẩu"
                value={formLogin.values.password}
                variant="outlined"
                fullWidth
                onChange={formLogin.handleChange}
                password
                error={formLogin.errors.password ? true : false && formLogin.touched.password}
                helperText={formLogin.errors.password}
            />
            <div >
                <Button onClick={handleAutoField} type="button" variant="outlined">Tài khoản dùng thử</Button>
            </div>

            <Button onClick={formLogin.submitForm} variant="contained">Đăng nhập</Button>
        </div>
    )
}
export default FormLogin