// import api from "@/api/apiConfig";
import { companyApi } from "@/api/companyApi";
import { jobApi } from "@/api/jobApi";
import { userApi } from "@/api/userApi";
import ListCompany from "@/components/company/ListCompany";
import ListJob from "@/components/job/ListJob";
import { log } from "@/helpers/log";

export default async function Page() {
    const dataCompany = await companyApi.getListCompany(1, 3);

    const dataJob = await jobApi.getListJob(1, 10);

    const dataUsers = await userApi.getListUser(1, 3)
    
    return (
        <div className="space-y-60 pt-24">
            {!dataCompany.error && !dataUsers.error && <ListCompany dataCompany={dataCompany} dataUsers={dataUsers} />}
            {!dataJob.error && <ListJob dataJob={dataJob} />}
        </div>
    );
}
