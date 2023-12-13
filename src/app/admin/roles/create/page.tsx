import Content, { ContentBody, ContentHeader } from '@/components/common/content/Content';
import { TEXT } from '@/constant/text.contants';
import CreateRole from '@/components/admin/roles/CreateRole';
import { permissionModule, checkData } from '@/helpers/function.helper';
import { Stack } from '@mui/material';
import AlertError from '@/components/common/alert/AlertError';
import { getDataPermissionProcessed } from '../action';

const RoleCreatePage = async () => {
    const permissionModule = await getDataPermissionProcessed();

    const { success, messages } = checkData(permissionModule);

    const initialActives = [
        { label: 'Active', id: `true` },
        { label: 'Not', id: `false` },
    ];
    return (
        <Content>
            <ContentHeader title={TEXT.TITLE.ROLE_CREATE} backButton />
            <ContentBody>
                {success ? (
                    <CreateRole
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
};

export default RoleCreatePage;
