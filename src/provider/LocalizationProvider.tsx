import { LocalizationProvider as LocalizationProviderMui } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export function LocalizationProvider({ children }: { children: React.ReactNode }) {
    return <LocalizationProviderMui dateAdapter={AdapterDayjs}>{children}</LocalizationProviderMui>;
}
