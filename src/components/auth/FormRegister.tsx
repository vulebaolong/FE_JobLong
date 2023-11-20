import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material"
import { forwardRef, useState } from "react";
import { NumericFormat, NumericFormatProps } from "react-number-format";

interface CustomProps {
    onChange: (event: { target: { name: string; value: string } }) => void;
    name: string;
}

const NumericFormatCustom = forwardRef<NumericFormatProps, CustomProps>(
    function NumericFormatCustom(props, ref) {
        const { onChange, ...other } = props;

        return (
            <NumericFormat
                {...other}
                getInputRef={ref}
                onValueChange={(values) => {
                    onChange({
                        target: {
                            name: props.name,
                            value: values.value,
                        },
                    });
                }}
                thousandSeparator
                valueIsNumericString
            // prefix="$"
            />
        );
    },
);
function FormRegister() {
    const [age, setAge] = useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value as string);
    };
    return (
        <div className="space-y-5">
            <TextField id="outlined-basic" label="Tên" variant="outlined" fullWidth />
            <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth />
            <TextField id="outlined-basic" label="Mật khẩu" variant="outlined" fullWidth />
            <div className="flex gap-2">
                <TextField
                    className="basis-1/2"
                    label="Tuổi"
                    name="numberformat"
                    InputProps={{
                        inputComponent: NumericFormatCustom as any,
                    }}
                    variant="outlined"
                />
                <FormControl className="basis-1/2">
                    <InputLabel id="age">Giới tính</InputLabel>
                    <Select
                        labelId="age"
                        value={age}
                        label="Giới tính"
                        onChange={handleChange}
                    >
                        <MenuItem value={10}>Nam</MenuItem>
                        <MenuItem value={20}>Nữ</MenuItem>
                    </Select>
                </FormControl>
            </div>
            
            <TextField id="outlined-basic" label="Địa chỉ" variant="outlined" fullWidth />
            <Button variant="contained">Đăng ký</Button>
        </div>
    )
}
export default FormRegister