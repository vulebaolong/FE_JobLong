import { Accordion, AccordionDetails, AccordionSummary, Grid, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ItemPermission from './ItemPermission';
import { permissionModule } from '@/helpers/function.helper';

interface IProps {
    module: permissionModule;
}

function AccordionModule({ module }: IProps) {
    return (
        <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle1">{module.module}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Grid container spacing={2}>
                    {module.data.map((permission) => {
                        return <ItemPermission permission={permission} key={permission._id} />;
                    })}
                </Grid>
            </AccordionDetails>
        </Accordion>
    );
}
export default AccordionModule;
