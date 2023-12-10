import Auth from '@/components/auth/Auth';

function Page({ params }: { params: { id: string } }) {
    const { id } = params;
    return (
        <>
            <Auth />
        </>
    );
}
export default Page;
