// import api from "@/api/apiConfig";
import { sendRequest } from "@/api/api";
import { companyApi } from "@/api/companyApi";
import { jobApi } from "@/api/jobApi";
import { userApi } from "@/api/userApi";
import ListCompany from "@/components/company/ListCompany";
import ListJob from "@/components/job/ListJob";
import { log } from "@/helpers/log";
import { cookies } from "next/headers";

export default async function Page() {
    const resultCompany = await companyApi.getListCompany(1, 3);

    const resultJob = await jobApi.getListJob(1, 10);

    const listUser = await userApi.getListUser(1, 3)
    console.log('listUser', listUser);
    log('listUser', listUser, "GREEN")

    return (
        <div className="space-y-60 pt-24">
            <ListCompany dataListCompany={resultCompany.data} listUser={listUser} />
            <ListJob dataListJob={resultJob.data.data} />
        </div>
    );
}
