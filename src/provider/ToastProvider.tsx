import { ToastContainer, ToastPosition } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

export default function ToastProvider() {
    return (
        <ToastContainer
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable={false}
            pauseOnHover
            theme="colored"
        />
    );
}

export const toastSuccess = (message: string, position: ToastPosition = 'bottom-left') => {
    toast.success(message, { position });
};

export const toastError = (message: string, position: ToastPosition = 'bottom-left') => {
    toast.error(message, { position });
};

export const toastWarning = (message: string, position: ToastPosition = 'bottom-left') => {
    toast.warn(message, { position });
};

export const toastInfo = (message: string, position: ToastPosition = 'bottom-left') => {
    toast.info(message, { position });
};
