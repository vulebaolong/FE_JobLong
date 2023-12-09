

interface IProps {
     params: { id: string } 
}

async function DetailUserPage({ params }: IProps) {
    const { id } = params;
    // const  dataCompany  = await companyApi.getCompanyById(id);
    // const  dataCompany  = await getCompanyByIdAction(id);
 
    
    return (
        <div>
            <h1>{id}</h1>
            {/* <DetailCompany dataCompany={dataCompany} /> */}
        </div>
    );
}
export default DetailUserPage