import Sidebar from "@/components/admin/Sidebar/Sidebar";
import Header from "@/components/admin/Header/Header";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex">
            <Sidebar />

            <div className="bg-gray-300/10 basis-full h-screen flex flex-col">
                <div className="bg-green-400/10">
                    <Header />
                </div>
                <div className="bg-red-400/10 flex-grow">{children}</div>
            </div>
        </div>
    );
}
