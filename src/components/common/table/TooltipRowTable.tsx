import { Stack } from '@mui/material';
import { CreatedInfoAction, DeletedInfoAction, UpdatedInfoAction } from '../infoAction/InfoAction';

function TooltipRowTable({ data }: { data: any }) {
    return (
        <Stack direction={'column'} spacing={2} padding={1}>
            {/* Created by */}
            <CreatedInfoAction createdBy={data?.createdBy?.email} createdAt={data?.createdAt} />

            {/* Updated by */}
            <UpdatedInfoAction updatedBy={data?.createdBy?.email} updatedAt={data?.createdAt} />

            {/* Deleted by */}
            <DeletedInfoAction deletedBy={data?.createdBy?.email} deletedAt={data?.createdAt} />
        </Stack>
    );
}

export default TooltipRowTable;
