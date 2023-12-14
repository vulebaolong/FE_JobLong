import { permissionModule } from '@/helpers/function.helper';
import { Card, CardContent, CardHeader, Typography } from '@mui/material';
import AccordionModule from './AccordionModule';
import { memo } from 'react';

interface IProps {
    permissionModule: permissionModule[];
    type: 'editRole' | 'createRole';
}

function ModulePermission({ permissionModule, type }: IProps) {
    return (
        <Card variant="outlined">
            <CardHeader
                title={<Typography variant="subtitle1">Permissions</Typography>}
                subheader={
                    <Typography variant="body2">The permissions allowed for this role</Typography>
                }
            />
            <CardContent>
                {permissionModule.map((module, index) => {
                    return <AccordionModule type={type} module={module} key={index} />;
                })}
            </CardContent>
        </Card>
    );
}
export default memo(ModulePermission);
