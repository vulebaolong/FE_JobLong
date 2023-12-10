import { Box, Chip, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';

interface IPropsCreated {
    createdBy: string;
    createdAt: string;
}

export function CreatedInfoAction({ createdBy, createdAt }: IPropsCreated) {
    return (
        <Box>
            <Chip color={'success'} size="small" label={'Create'} sx={{ marginBottom: '10px' }} />
            <Stack sx={{ marginLeft: '20px' }} spacing={1}>
                <Stack direction={'row'} alignItems={'baseline'} spacing={1}>
                    <Chip size="small" label={'Created by:'} />
                    <Typography variant="subtitle2" gutterBottom>
                        {createdBy}
                    </Typography>
                </Stack>
                <Stack direction={'row'} alignItems={'baseline'} spacing={1}>
                    <Chip size="small" label={'Created at:'} />
                    <Typography variant="subtitle2" gutterBottom>
                        {dayjs(createdAt).format('DD/MM/YYYY HH:mm:ss')}
                    </Typography>
                </Stack>
            </Stack>
        </Box>
    );
}

interface IPropsUpdated {
    updatedBy: string;
    updatedAt: string;
}

export function UpdatedInfoAction({ updatedBy, updatedAt }: IPropsUpdated) {
    return (
        <Box>
            <Chip color={'warning'} size="small" label={'Update'} sx={{ marginBottom: '10px' }} />
            <Stack sx={{ marginLeft: '20px' }} spacing={1}>
                <Stack direction={'row'} alignItems={'baseline'} spacing={1}>
                    <Chip size="small" label={'Updated by:'} />
                    <Typography variant="subtitle2" gutterBottom>
                        {updatedBy}
                    </Typography>
                </Stack>
                <Stack direction={'row'} alignItems={'baseline'} spacing={1}>
                    <Chip size="small" label={'Updated at:'} />
                    <Typography variant="subtitle2" gutterBottom>
                        {dayjs(updatedAt).format('DD/MM/YYYY HH:mm:ss')}
                    </Typography>
                </Stack>
            </Stack>
        </Box>
    );
}

interface IPropsDeleted {
    deletedBy: string;
    deletedAt: string;
}

export function DeletedInfoAction({ deletedBy, deletedAt }: IPropsDeleted) {
    return (
        <Box>
            <Chip color={'error'} size="small" label={'Delete'} sx={{ marginBottom: '10px' }} />
            <Stack sx={{ marginLeft: '20px' }} spacing={1}>
                <Stack direction={'row'} alignItems={'baseline'} spacing={1}>
                    <Chip size="small" label={'Deleted by:'} />
                    <Typography variant="subtitle2" gutterBottom>
                        {deletedBy}
                    </Typography>
                </Stack>
                <Stack direction={'row'} alignItems={'baseline'} spacing={1}>
                    <Chip size="small" label={'Deleted at:'} />
                    <Typography variant="subtitle2" gutterBottom>
                        {dayjs(deletedAt).format('DD/MM/YYYY HH:mm:ss')}
                    </Typography>
                </Stack>
            </Stack>
        </Box>
    );
}
