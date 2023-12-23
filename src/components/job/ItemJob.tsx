'use client';
import { IJob } from '@/interface/job';
import { Card, CardActionArea } from '@mui/material';
import Image from 'next/image';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useRouter } from 'next/navigation';
dayjs.extend(relativeTime);

function ItemJob({ job }: { job: IJob }) {
    const router = useRouter();
    const handleClick = (id: string) => {
        router.push(`/job/${id}`);
    };
    return (
        <Card
            key={job._id}
            onClick={() => {
                handleClick(job._id);
            }}
        >
            <CardActionArea className="!rounded-xl !flex !justify-start !items-start gap-4 !p-5 h-full">
                <Image
                    className="rounded-xl"
                    src={`${job.company.logo}`}
                    width={50}
                    height={50}
                    alt={`image logo company ${job.company.name}`}
                    priority={true}
                />
                <div className="flex flex-col w-full h-full">
                    <div>
                        <h3 className="text-base font-semibold text-start mb-3">{job.name}</h3>
                        <p className="flex items-center gap-2 mb-2">
                            <LocationOnOutlinedIcon fontSize="small" />
                            <span className="font-medium text-sm">{job.location}</span>
                        </p>
                        <p className="flex items-center gap-2">
                            <PaidOutlinedIcon fontSize="small" />
                            <span className="font-medium text-sm">{job.salary}</span>
                        </p>
                    </div>
                    <p className="text-end mt-auto block">
                        <AccessTimeIcon fontSize="small" />
                        <span className="text-xs italic">{dayjs(job.updatedAt).fromNow()}</span>
                    </p>
                </div>
            </CardActionArea>
        </Card>
    );
}
export default ItemJob;
