"use client";

import { ICompany } from "@/interface/company";
import ItemCompany from "./ItemCompany";

interface IProps {
  dataCompany: IModelPaginate<ICompany[]>;
}

function ListCompany({ dataCompany }: IProps) {
  const companies = dataCompany?.data?.result || [];

  return (
    <div className="container">
      <h2 className="font-bold text-3xl text-center mb-20">
        Nhà tuyển dụng hàng đầu
      </h2>
      <div className="grid grid-cols-3 gap-4">
        {companies.map((company) => {
          return <ItemCompany company={company} key={company._id} />;
        })}
      </div>
    </div>
  );
}
export default ListCompany;
