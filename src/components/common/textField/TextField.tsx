import { TextField as TextFieldMui, TextFieldProps } from '@mui/material';
import * as React from 'react';
import { NumericFormat, NumericFormatProps } from 'react-number-format';

interface CustomProps {
    onChange: (event: { target: { name: string; value: string } }) => void;
    name: string;
}

interface IProps {
    type?: 'number' | 'text';
    prefix?: string;
    min?: number;
    max?: number;
}

function TextField({ prefix, type = 'text', min, max, ...props }: TextFieldProps & IProps) {
    const NumericFormatCustom = React.useMemo(() => {
        return React.forwardRef<NumericFormatProps, CustomProps>(
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
                        prefix={prefix}
                        allowNegative={false}
                        isAllowed={(inputObj) => {
                            const { value } = inputObj;
                            if (min !== undefined && max !== undefined) {
                                return +value >= min && +value <= max;
                            }
                            if (min !== undefined) {
                                return +value >= min;
                            }
                            if (max !== undefined) {
                                return +value <= max;
                            }
                            return true;
                        }}
                    />
                );
            },
        );
    }, []);

    return (
        <>
            {type === 'number' ? (
                <TextFieldMui
                    variant="outlined"
                    size="small"
                    InputProps={{
                        inputComponent: NumericFormatCustom as any,
                    }}
                    {...props}
                />
            ) : (
                <TextFieldMui variant="outlined" size="small" {...props} />
            )}
        </>
    );
}

export default TextField;
