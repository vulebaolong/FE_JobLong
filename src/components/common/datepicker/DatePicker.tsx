'use client';

import { DatePicker as DatePickerMui } from '@mui/x-date-pickers';
import { Dayjs } from 'dayjs';

interface IProps {
    label?: string;
    size?: 'small' | 'medium';
    format?: string;
    width?: string | number;
    value: string | Dayjs | any;
    helperText?: any;
    error?: boolean;
    onChange: (value: string | null) => void;
}

const DatePicker = ({
    label = '',
    size = 'small',
    width = '100%',
    error = false,
    helperText = '',
    value,
    onChange,
}: IProps) => {
    return (
        <DatePickerMui
            sx={{ width: width }}
            label={label}
            slotProps={{
                textField: {
                    size,
                    helperText: helperText,
                    error: error,
                },
            }}
            value={value}
            // onChange={(newValue) => onChange(dayjs(newValue).format(format))}
            onChange={onChange}
            format="DD/MM/YYYY"
        />
    );
};

export default DatePicker;
