import { companyApi } from "@/api/companyApi";
import DetailCompany from "@/components/company/DetailCompany";

async function Page({ params }: { params: { id: string } }) {
    const { id } = params;
    const  dataCompany  = await companyApi.getCompanyById(id);
 
    
    return (
        <div>
            <DetailCompany dataCompany={dataCompany} />
        </div>
    );
}
export default Page