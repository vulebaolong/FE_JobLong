// import api from "@/api/apiConfig";
import { companyApi } from "@/api/companyApi";
import { jobApi } from "@/api/jobApi";
import ListCompany from "@/components/company/ListCompany";
import ListJob from "@/components/job/ListJob";
import { cookies } from 'next/headers'

export default async function Page() {
    const resultCompany = await companyApi.getListCompany(1, 3);
    const resultJob = await jobApi.getListJob(1, 10);

    // const cookieStore = cookies()
    // console.log(cookieStore.get('refresh_token'));

    return (
        <div className="space-y-60 pt-24">
            <ListCompany dataListCompany={resultCompany.data.data} />
            <ListJob dataListJob={resultJob.data.data} />
        </div>
    );
}
