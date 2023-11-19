import { jobApi } from "@/api/jobApi";
import DetailJob from "@/components/job/DetailJob";

async function Page({ params }: { params: { id: string } }) {
    const { id } = params;
    const { data } = await jobApi.getJobById(id);
    return (
        <div>
            <DetailJob job={data.data} />
        </div>
    );
}
export default Page;
