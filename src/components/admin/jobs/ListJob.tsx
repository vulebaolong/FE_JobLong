import { IJob } from "@/interface/job"

interface IProps {
    dataJob: IModelPaginate<IJob[]>
}

function ListJob({dataJob}: IProps) {
    console.log(dataJob);
  return (
    <div>ListJob</div>
  )
}
export default ListJob