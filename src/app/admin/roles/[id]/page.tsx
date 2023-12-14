import { checkData, permissionModule } from '@/helpers/function.helper';
import { IDataEditRole, getDataPermissionProcessed, getDataRoleProcessed } from '../action';
import { TEXT } from '@/constant/text.contants';
import Content, { ContentBody, ContentHeader } from '@/components/common/content/Content';
import EditRole from '@/components/admin/roles/EditRole';
import { Stack } from '@mui/material';
import AlertError from '@/components/common/alert/AlertError';

interface IProps {
    params: { id: string };
}

async function RoleEditPage({ params }: IProps) {
    const { id } = params;

    const dataEdit = await getDataRoleProcessed(id);

    const permissionModule = await getDataPermissionProcessed();

    const { success, messages } = checkData(dataEdit, permissionModule);

    const initialActives = [
        { label: 'Active', id: `true` },
        { label: 'Not', id: `false` },
    ];
    return (
        <Content>
            <ContentHeader title={TEXT.TITLE.ROLE_EDIT} backButton />
            <ContentBody>
                {success ? (
                    <EditRole
                        dataEdit={dataEdit.data as IDataEditRole}
                        permissionModule={permissionModule.data as permissionModule[]}
                        initialActives={initialActives}
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
export default RoleEditPage;
