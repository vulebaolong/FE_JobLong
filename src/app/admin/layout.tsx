import Sidebar from "@/components/admin/sidebar/Sidebar";
import Header from "@/components/admin/header/Header";
import { getListPermissionsAction } from "../action";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    const dataPermission = await getListPermissionsAction();
    return (
        <div className="flex">
            <Sidebar dataPermission={dataPermission} />

            <div className="bg-gray-300/10 basis-full h-screen flex flex-col overflow-hidden">
                <div className="bg-green-400/10">
                    <Header />
                </div>
                <div className="flex-grow p-5">{children}</div>
            </div>
        </div>
    );
}
