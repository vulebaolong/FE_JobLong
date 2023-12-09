import { IOptionAutocomplete } from '@/helpers/formik.helper';
import {
    Autocomplete as AutocompleteMui,
    AutocompleteChangeDetails,
    AutocompleteChangeReason,
    AutocompleteProps,
    AutocompleteRenderInputParams,
} from '@mui/material';
import { ReactNode, SyntheticEvent } from 'react';

interface IProps {
    options: IOptionAutocomplete[];
    value: any;
    renderInput: (params: AutocompleteRenderInputParams) => ReactNode;
    onChange:
        | ((
              event: SyntheticEvent<Element, Event>,
              value: any,
              reason: AutocompleteChangeReason,
              details?: AutocompleteChangeDetails<any> | undefined,
          ) => void)
        | undefined;
}

function Autocomplete({
    options,
    value,
    renderInput,
    onChange,
    ...props
}: AutocompleteProps<any, false, false, false> & IProps) {
    return (
        <AutocompleteMui
            size="small"
            options={options}
            renderOption={(propsRenderOption, option) => {
                return (
                    <li {...propsRenderOption} key={option.id}>
                        {option.label}
                    </li>
                );
            }}
            isOptionEqualToValue={(option, value) => value.id === '' || option.id === value.id}
            value={value}
            renderInput={renderInput}
            onChange={onChange}
            {...props}
        />
    );
}

export default Autocomplete;
