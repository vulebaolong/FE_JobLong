'use client';

import { LocalizationProvider } from '@/provider/LocalizationProvider';
import { ReduxProvider } from '@/provider/ReduxProvider';
import ThemeRegistry from '@/provider/ThemeRegistry';
import ToastProvider from '@/provider/ToastProvider';
// import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';

function Provider({ children }: { children: ReactNode }) {
    return (
        <ReduxProvider>
            {/* <SessionProvider> */}
            <LocalizationProvider>
                <ToastProvider />
                <ThemeRegistry options={{ key: 'mui' }}>{children}</ThemeRegistry>
            </LocalizationProvider>
            {/* </SessionProvider> */}
        </ReduxProvider>
    );
}
export default Provider;
