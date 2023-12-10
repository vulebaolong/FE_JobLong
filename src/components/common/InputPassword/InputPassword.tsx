import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { MouseEvent, useState } from 'react';

type TextFieldProps = React.ComponentProps<typeof TextField>;

interface InputNumberProps extends TextFieldProps {
    password?: boolean;
}

function InputPassword({ password, ...props }: InputNumberProps) {
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const inputProps = password
        ? {
              endAdornment: (
                  <InputAdornment position="end">
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
              ),
          }
        : {};

    return (
        <TextField
            {...props}
            type={showPassword && password ? 'text' : 'password'}
            InputProps={inputProps}
            autoComplete="off"
            variant="outlined"
            size="small"
        />
    );
}

export default InputPassword;
