import "@/api/apiConfig";


import { Button, TextField } from "@mui/material"
import { useFormik } from "formik";
import InputNumber from "../InputNumber/InputNumber";
import * as Yup from "yup";
import { authApi } from "@/api/authApi";
import { ILoginRequest } from "@/interface/auth";
import { toast } from "react-toastify";
import { toastSuccess } from "@/provider/ToastProvider";

function FormLogin() {

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
            const { data } = await authApi.login(loginRequest)
            console.log(data);
            toastSuccess("Đăng nhập thành công")
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
                label="email"
                value={formLogin.values.email}
                variant="outlined"
                fullWidth
                onChange={formLogin.handleChange}
                error={formLogin.errors.email ? true : false && formLogin.touched.email}
                helperText={formLogin.errors.email}
            />
            <InputNumber
                name="password"
                label="mật khẩu"
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