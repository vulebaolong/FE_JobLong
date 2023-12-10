import { Alert } from '@mui/material';

const AlertError = ({ message = '' }) => {
    return <Alert severity="error">{message}</Alert>;
};

export default AlertError;
