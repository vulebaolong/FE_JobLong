'use client'

import { sendRequest } from "@/api/api";
import { userApi } from "@/api/userApi";
import { BASE_URL_SERVER, FOLDER_IMAGE_COMPANY } from "@/constant/apiContants";
import { IDataListCompany } from "@/interface/company";
import { IUserInfo } from "@/interface/user";
import { Button, Card, CardContent, CardMedia, Typography } from "@mui/material";
import CardActions from "@mui/material/CardActions";
import { useSession } from "next-auth/react";
import Image from "next/image";

function ListCompany({ dataListCompany, listUser }: { dataListCompany: IDataListCompany, listUser: IModelPaginate<IUserInfo> }) {
    const { data: session } = useSession()

    const handleFetchListUser = async () => {
        const listUser = await userApi.getListUser(1, 3)
        console.log(listUser);
    }

    const handleShowSession = () => {
        console.log(session);
    }

    return (
        <div className="container">
            <div className="flex gap-5">
                <Button onClick={handleFetchListUser} variant="contained">fetch list user</Button>
                <Button onClick={handleShowSession} variant="contained">show session</Button>
            </div>
            <h2 className="font-bold text-3xl text-center mb-20">Nhà tuyển dụng hàng đầu</h2>
            <div className="grid grid-cols-3 gap-4">
                {dataListCompany.result.map((company) => {
                    return (
                        <Card key={company._id} className="!rounded-3xl space-y-5 p-5">
                            <Image
                                className="m-auto rounded-3xl"
                                src={`${BASE_URL_SERVER}/${FOLDER_IMAGE_COMPANY}/${company.logo}`}
                                width={160}
                                height={160}
                                alt={`image logo company ${company.name}`}
                                priority={true}
                            />
                            <CardContent>
                                <h3 className="text-lg font-bold text-center mb-5">{company.name}</h3>
                                <p className="text-base font-normal text-white/70 text-center">{company.address}</p>
                            </CardContent>
                            <CardActions>
                                <Button size="small">Share</Button>
                                <Button size="small">Learn More</Button>
                            </CardActions>
                        </Card>
                    );
                })}
            </div>
            {listUser?.data?.result.map((item) => {
                return <p key={item._id}>{item.name}</p>
            })}
        </div>
    );
}
export default ListCompany;
