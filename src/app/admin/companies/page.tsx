import Content, { ContentBody, ContentHeader } from '@/components/common/content/Content';
import { TEXT } from '@/constant/text.contants';
import NavButton from '@/components/common/button/NavButton';
import { ROUTES } from '@/constant/routes.contants';
import AlertError from '@/components/common/alert/AlertError';
import { checkData } from '@/helpers/function.helper';
import { Stack } from '@mui/material';
import { getListCompaniesAction } from '../companies/action';
import { ICompany } from '@/interface/company';
import ListCompanies from '@/components/admin/companies/ListCompanies';

interface IProps {
    params: { slug: string };
    searchParams: { [key: string]: string | undefined };
}

async function CompaniesPage({ searchParams }: IProps) {
    const dataCompanies = await getListCompaniesAction({
        searchParams: {
            sort: '-createdAt',
            fields: '-description',
            ...searchParams,
        },
    });

    const { success, messages } = checkData(dataCompanies);
    return (
        <Content>
            <ContentHeader
                title={TEXT.TITLE.COMPANY}
                rightContent={
                    <NavButton href={ROUTES.ADMIN.COMPANY.CREATE} text={TEXT.BUTTON_TEXT.ADD} />
                }
            />
            <ContentBody>
                {success ? (
                    <ListCompanies
                        dataCompanies={dataCompanies.data as IModelPaginate<ICompany[]>}
                    />
                ) : (
                    <Stack spacing={2}>
                        {messages.map((message, index) => (
                            <AlertError message={message} key={index} />
                        ))}
                    </Stack>
                )}
            </ContentBody>
        </Content>
    );
}
export default CompaniesPage;
