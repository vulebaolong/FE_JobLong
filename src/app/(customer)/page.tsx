import ListCompany from '@/components/company/ListCompany';
import { getListCompanyAction } from './company/action';

export default async function CustomerPage() {
    const dataCompany = await getListCompanyAction(1, 10);

    // const dataJob = undefined;

    return (
        <div className="space-y-60 py-24">
            <ListCompany dataCompany={dataCompany} />
            {/* {!dataJob && <ListJob dataJob={dataJob} />} */}
        </div>
    );
}
