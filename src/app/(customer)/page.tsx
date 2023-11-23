// import api from "@/api/apiConfig";
import { companyApi } from "@/api/companyApi";
import { jobApi } from "@/api/jobApi";
import ListCompany from "@/components/company/ListCompany";
import ListJob from "@/components/job/ListJob";
import { getSession } from "next-auth/react";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getServerSession } from "../api/auth/[...nextauth]/auth";
import { cookies } from "next/headers";
import { REFRESH_TOKEN } from "@/constant/userContants";
import { sendRequest } from "@/api/api";
import { IDataListCompany } from "@/interface/company";
import { userApi } from "@/api/userApi";

export default async function Page() {
    const resultCompany = await companyApi.getListCompany(1, 3);

    const resultJob = await jobApi.getListJob(1, 10);

    // const session = await getServerSession()
    // console.log("session: ",session);

    return (
        <div className="space-y-60 pt-24">
            <ListCompany dataListCompany={resultCompany.data} />
            <ListJob dataListJob={resultJob.data.data} />
        </div>
    );
}
