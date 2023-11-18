import { BASE_URL_SERVER, FOLDER_IMAGE_COMPANY } from "@/constant/apiContants";
import { IDataListJob } from "@/interface/job";
import { Card, CardActionArea, CardContent } from "@mui/material";
import Image from "next/image";

function ListJob({ dataListJob }: { dataListJob: IDataListJob }) {
    return (
        <div className="container">
            <h2 className="font-bold text-3xl text-center mb-20">Công việc mới nhất</h2>
            <div className="grid grid-cols-5 gap-4">
                {dataListJob.result.map((job) => {
                    return (
                        <Card key={job._id} className="!rounded-3xl space-y-5 p-5">
                            <CardActionArea>
                                <Image
                                    className="m-auto rounded-3xl"
                                    src={`${BASE_URL_SERVER}/${FOLDER_IMAGE_COMPANY}/${job.company.logo}`}
                                    width={160}
                                    height={160}
                                    alt="Picture of the author"
                                />
                                <CardContent>
                                    <h3 className="text-lg font-bold text-center mb-5">{job.name}</h3>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}
export default ListJob;
