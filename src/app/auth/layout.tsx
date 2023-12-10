import Logo from '@/components/header/Logo';
import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <div className="w-screen flex flex-col items-center gap-10 justify-center pt-28">
            <Logo />
            <div className=" w-[500px] border border-[rgb(51,234,255)] rounded-[15px] overflow-hidden">
                {children}
            </div>
        </div>
    );
}
