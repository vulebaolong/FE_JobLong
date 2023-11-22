// import api from "@/api/apiConfig";
import { companyApi } from "@/api/companyApi";
import { jobApi } from "@/api/jobApi";
import ListCompany from "@/components/company/ListCompany";
import ListJob from "@/components/job/ListJob";
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function Page() {
    const resultCompany = await companyApi.getListCompany(1, 3);
    const resultJob = await jobApi.getListJob(1, 10);

    const session = await getServerSession(authOptions)
    console.log(session);


    return (
        <div className="space-y-60 pt-24">
            <ListCompany dataListCompany={resultCompany.data.data} />
            <ListJob dataListJob={resultJob.data.data} />
        </div>
    );
}
