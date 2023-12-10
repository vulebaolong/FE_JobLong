import Footer from '@/components/footer/Footer';
import Header from '@/components/header/Header';
import { heightHeader } from '@/provider/ThemeRegistry';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header />
            <main
                className="dark:bg-gray-300/10 bg-gray-300/50"
                style={{ paddingTop: heightHeader }}
            >
                {children}
            </main>
            <Footer />
        </>
    );
}
