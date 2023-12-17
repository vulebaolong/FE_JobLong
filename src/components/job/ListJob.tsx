'use client';

import { IJob } from '@/interface/job';
import ItemJob from './ItemJob';

interface IProps {
    dataJob?: IModelPaginate<IJob[]>;
}

function ListJob({ dataJob }: IProps) {
    const jobs = dataJob?.data?.result || [];

    return (
        <div className="container">
            <h2 className="font-bold text-3xl text-center mb-20">Công việc mới nhất</h2>
            <div className="grid grid-cols-2 gap-4">
                {jobs.map((job) => {
                    return <ItemJob job={job} key={job._id} />;
                })}
            </div>
        </div>
    );
}
export default ListJob;
