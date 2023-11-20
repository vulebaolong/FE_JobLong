import { Ijob } from "@/interface/job";
import { Button, Chip } from "@mui/material";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
import Image from "next/image";
import { BASE_URL_SERVER, FOLDER_IMAGE_COMPANY } from "@/constant/apiContants";
import DOMPurify from "isomorphic-dompurify";

function DetailJob({ job }: { job: Ijob }) {
    let cleanDescription = DOMPurify.sanitize(job.description, { USE_PROFILES: { html: true } });
    return (
        <div className="container pt-24">
            <div className="flex gap-10">
                <div className="basis-[70%] space-y-10">
                    {/* TITLE */}
                    <div className="space-y-5">
                        <h1 className="text-3xl font-bold">{job.name}</h1>
                        <Button className="w-full" variant="contained">
                            Apply now
                        </Button>
                    </div>

                    {/* INFO */}
                    <div className="space-y-5">
                        <div className="space-x-2">{job.skills.map((skill, index) => {
                            return <Chip key={index} variant="outlined" color="info" size="small" label={skill} />;
                        })}</div>
                        <p className="flex items-center gap-2">
                            <LocationOnOutlinedIcon fontSize="small" />
                            <span className="font-medium text-sm">{job.location}</span>
                        </p>
                        <p className="flex items-center gap-2">
                            <PaidOutlinedIcon fontSize="small" />
                            <span className="font-medium text-sm">{job.salary}</span>
                        </p>
                        <p className="flex items-center gap-2">
                            <AccessTimeIcon fontSize="small" />
                            <span className="text-xs italic">{dayjs(job.updatedAt).fromNow()}</span>
                        </p>
                    </div>

                    {/* DESCRIPTION */}
                    <div>
                        <div dangerouslySetInnerHTML={{ __html: cleanDescription }} />
                    </div>
                </div>

                <div className="basis-[30%]">
                    <Image
                        className="rounded-xl mx-auto"
                        src={`${BASE_URL_SERVER}/${FOLDER_IMAGE_COMPANY}/${job.company.logo}`}
                        width={150}
                        height={150}
                        alt={`image logo company ${job.company.name}`}
                        priority={true}
                    />
                </div>
            </div>
        </div>
    );
}
export default DetailJob;
