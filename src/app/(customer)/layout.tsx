import Header from "@/components/header/Header";
import { heightHeader } from "@/provider/ThemeRegistry";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header />
            <main style={{ paddingTop: heightHeader }}>{children}</main>
        </>
    );
}
