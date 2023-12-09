import DetailJob from '@/components/job/DetailJob';

async function Page({ params }: { params: { id: string } }) {
    const { id } = params;
    // const  dataJob  = await jobApi.getJobById(id);

    return (
        <div>
            <DetailJob />
        </div>
    );
}
export default Page;
