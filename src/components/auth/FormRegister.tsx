import {
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField,
} from '@mui/material';
import { forwardRef, useState } from 'react';
import { NumericFormat, NumericFormatProps } from 'react-number-format';

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
                    <Select labelId="age" value={age} label="Giới tính" onChange={handleChange}>
                        <MenuItem value={10}>Nam</MenuItem>
                        <MenuItem value={20}>Nữ</MenuItem>
                    </Select>
                </FormControl>
            </div>

            <TextField id="outlined-basic" label="Địa chỉ" variant="outlined" fullWidth />
            <Button variant="contained">Đăng ký</Button>
        </div>
    );
}
export default FormRegister;

//     < Autocomplete
// sx = {{ width: "300px" }}
// size = "small"
// options = { organizationList }
// //render này để fix lỗi warning key :app-index.js:32 Warning: A props object containing a "key" prop is being spread into JSX
// renderOption = {(props, option) => {
//     return (
//         <li {...props} key={option.id}>
//             {option.label}
//         </li>
//     );
// }}
// //value ban đầu với lúc reset mình cho nó = "",nhưng mà cái array mình truyền vào options nó lại ko có phần tử "" này, trường hợp = "" thì return true để nó ko chửi, còn false thì nó sẽ chửi là value ko có trong options(mảng ban đầu).
// isOptionEqualToValue = {(option, value) => {
//     return value === "" || option.id === value.id;
// }}
// value = { searchForm.values.organization }
// renderInput = {(params) => {
//     return (<TextField {...params} label="企業・組織" />);
// }}
// onChange = {(_, value) => searchForm.setFieldValue("organization", value)} />
