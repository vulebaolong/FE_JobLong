import { getListJobAction } from './action';
import Content, { ContentBody, ContentHeader } from '@/components/common/content/Content';
import { TEXT } from '@/constant/text.contants';
import NavButton from '@/components/common/button/NavButton';
import { ROUTES } from '@/constant/routes.contants';
import AlertError from '@/components/common/alert/AlertError';
import { checkData } from '@/helpers/function.helper';
import { Stack } from '@mui/material';
import { IJob } from '@/interface/job';
import ListJob from '@/components/admin/jobs/ListJob';

interface IProps {
    params: { slug: string };
    searchParams: { [key: string]: string | undefined };
}

async function JobsPage({ searchParams }: IProps) {
    const dataRole = await getListJobAction({
        searchParams: {
            sort: '-createdAt',
            ...searchParams,
        },
    });

    const { success, messages } = checkData(dataRole);

    return (
        <Content>
            <ContentHeader
                title={TEXT.TITLE.JOB}
                rightContent={
                    <NavButton href={ROUTES.ADMIN.ROLE.CREATE} text={TEXT.BUTTON_TEXT.ADD} />
                }
            />
            <ContentBody>
                {success ? (
                    <ListJob
                        dataJob={dataRole.data as IModelPaginate<IJob[]>}
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
export default JobsPage;
