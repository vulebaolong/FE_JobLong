// import api from "@/api/apiConfig";
import { companyApi } from "@/api/companyApi";
import { jobApi } from "@/api/jobApi";
import ListCompany from "@/components/company/ListCompany";
import ListJob from "@/components/job/ListJob";

export default async function Page() {
    const dataCompany = await companyApi.getListCompany(1, 3);

    const dataJob = await jobApi.getListJob(1, 10);

    return (
        <div className="space-y-60 py-24">
            {!dataCompany.error && (
                <ListCompany dataCompany={dataCompany}  />
            )}
            {!dataJob.error && <ListJob dataJob={dataJob} />}
        </div>
    );
}
