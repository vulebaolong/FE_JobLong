import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Button, IconButton, InputAdornment, TextField } from "@mui/material"
import { useFormik } from "formik";
import { MouseEvent, useState } from "react";

function FormLogin() {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const formLogin = useFormik({
        initialValues: {
            email: '',
        },
        onSubmit: values => {
            console.log(values);
        },
    });
    return (
        <div className="space-y-5">
            <TextField
                name="email"
                label="email"
                variant="outlined"
                fullWidth
                onChange={formLogin.handleChange}
            />
            <TextField
                name="password"
                label="mật khẩu"
                variant="outlined"
                fullWidth
                onChange={formLogin.handleChange}
                type={showPassword ? "text" : "password"}
                InputProps={{
                    endAdornment: <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                            size="small"
                        >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                }}
                error={true}
                helperText={'123'}
            />
            <Button onClick={formLogin.submitForm} variant="contained">Đăng nhập</Button>
        </div>
    )
}
export default FormLogin