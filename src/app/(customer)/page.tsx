// import api from "@/api/apiConfig";
import { companyApi } from "@/api/companyApi";
import { jobApi } from "@/api/jobApi";
import ListCompany from "@/components/company/ListCompany";
import ListJob from "@/components/job/ListJob";

export default async function Page() {
    const { data: dataCompany } = await companyApi.getListCompany(1, 3);
    const { data: dataJob } = await jobApi.getListJob(1, 10);
    return (
        <div className="space-y-60 pt-24">
            <ListCompany dataListCompany={dataCompany.data} />
            <ListJob dataListJob={dataJob.data} />
        </div>
    );
}
