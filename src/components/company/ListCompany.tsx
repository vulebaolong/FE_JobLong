import { BASE_URL_SERVER, FOLDER_IMAGE_COMPANY } from "@/constant/apiContants";
import { IDataListCompany } from "@/interface/company";
import { Button, Card, CardContent, CardMedia, Typography } from "@mui/material";
import CardActions from "@mui/material/CardActions";
import Image from "next/image";

function ListCompany({ dataListCompany }: { dataListCompany: IDataListCompany }) {
    return (
        <div className="container">
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
        </div>
    );
}
export default ListCompany;
