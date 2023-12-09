"use client";

import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import InputNumber from "../InputNumber/InputNumber";
import * as Yup from "yup";
import { toastError, toastSuccess } from "@/provider/ToastProvider";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

import { useDispatch } from "react-redux";
import { DispatchType } from "@/redux/store";
import { ILoginRequest } from "@/interface/auth";
import { loginAction } from "@/app/auth/[id]/action";
import { loginAuth } from "@/redux/slices/authSlice";
import { lcStorage } from "@/helpers/localStorage";
import { ACCESS_TOKEN, USER_LOGIN } from "@/constant/userContants";

function FormLogin() {
  const dispatch: DispatchType = useDispatch();

  const router = useRouter();

  const formLogin = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Vui lòng nhập email")
        .email("Vui lòng nhập đúng định dạng email"),
      password: Yup.string().required("Vui lòng nhập password"),
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
      console.log(result);

      if (result.statusCode !== 201)
        return toastError("Đăng nhập không thành công");

      dispatch(
        loginAuth({
          userLogin: result.data.user,
          accessToken: result.data.access_token,
        }),
      );

      lcStorage.set(USER_LOGIN, result.data.user);
      lcStorage.set(ACCESS_TOKEN, result.data.access_token);

      toastSuccess("Đăng nhập thành công");
      router.back();
    },
  });

  const handleAutoField = () => {
    formLogin.setValues({
      email: "vulebaolong@gmail.com",
      password: "123456",
    });
  };

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
        error={
          formLogin.errors.password ? true : false && formLogin.touched.password
        }
        helperText={formLogin.errors.password}
      />
      <div>
        <Button onClick={handleAutoField} type="button" variant="outlined">
          Tài khoản dùng thử
        </Button>
      </div>

      <Button onClick={formLogin.submitForm} variant="contained">
        Đăng nhập
      </Button>
    </div>
  );
}
export default FormLogin;
