import { Accordion, AccordionDetails, AccordionSummary, Grid, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { permissionModule } from '@/helpers/function.helper';
import ItemPermissionCreate from './ItemPermissionCreate';
import ItemPermissionEdit from './ItemPermissionEdit';

interface IProps {
    module: permissionModule;
    type: 'editRole' | 'createRole';
}

function AccordionModule({ module, type }: IProps) {
    return (
        <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle1">{module.module}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Grid container spacing={2}>
                    {module.data.map((permission) => {
                        if (type === 'createRole') {
                            return (
                                <ItemPermissionCreate
                                    permission={permission}
                                    key={permission._id}
                                />
                            );
                        }
                        if (type === 'editRole') {
                            return (
                                <ItemPermissionEdit permission={permission} key={permission._id} />
                            );
                        }
                    })}
                </Grid>
            </AccordionDetails>
        </Accordion>
    );
}
export default AccordionModule;
