import { TextField as TextFieldMui, TextFieldProps } from "@mui/material";
import * as React from "react";
import { NumericFormat, NumericFormatProps } from "react-number-format";

interface CustomProps {
    onChange: (event: { target: { name: string; value: string } }) => void;
    name: string;
}

interface IProps {
    type?: "number" | "text";
    prefix?: string;
}

export const TextField: React.FC<TextFieldProps & IProps> = ({
    prefix,
    type = "text",
    ...props
}) => {
    const NumericFormatCustom = React.useMemo(() => {
        return React.forwardRef<NumericFormatProps, CustomProps>(function NumericFormatCustom(
            props,
            ref
        ) {
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
                />
            );
        });
    }, []);

    return (
        <>
            {type === "number" ? (
                <TextFieldMui
                    {...props}
                    InputProps={{
                        inputComponent: NumericFormatCustom as any,
                    }}
                />
            ) : (
                <TextFieldMui {...props} />
            )}
        </>
    );
};

export default TextField;
