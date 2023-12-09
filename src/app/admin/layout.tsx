import Sidebar from '@/components/admin/sidebar/Sidebar';
import Header from '@/components/admin/header/Header';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex w-screen">
            <Sidebar />

            <div className="dark:bg-gray-300/10 bg-gray-300/50 basis-full h-screen flex flex-col overflow-x-hidden overflow-y-scroll">
                <div className="sticky top-0 z-50">
                    <Header />
                </div>
                <div className="flex-grow">{children}</div>
            </div>
        </div>
    );
}
