import Navbar from "@/components/admin/navbar/Navbar";
import Header from "@/components/admin/header/Header";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex">
            <div className="basis-60 bg-gray-500/10 h-screen">
                <Navbar />
            </div>

            <div className="bg-gray-300/10 basis-full h-screen flex flex-col">
                <div className="bg-green-400/10 h-20">
                    <Header />
                </div>
                <div className="bg-red-400/10 flex-grow">{children}</div>
            </div>
        </div>
    );
}
