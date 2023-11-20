export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-screen flex justify-center pt-28">
            <div className=" w-[500px] border border-[rgb(51,234,255)] rounded-[15px] overflow-hidden">{children}</div>
        </div>
    );
}
