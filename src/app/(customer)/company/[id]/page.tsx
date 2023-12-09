async function Page({ params }: { params: { id: string } }) {
    const { id } = params;
    // const  dataCompany  = await companyApi.getCompanyById(id);
    // const  dataCompany  = await getCompanyByIdAction(id);

    return <div>{/* <DetailCompany dataCompany={dataCompany} /> */}</div>;
}
export default Page;
