import { IDataListJob, Ijob } from "@/interface/job";
import ItemJob from "./ItemJob";

interface IProps {
    dataJob: IModelPaginate<Ijob[]>
}

function ListJob({ dataJob }: IProps) {

    const { meta, result: jobs } = dataJob.data

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
