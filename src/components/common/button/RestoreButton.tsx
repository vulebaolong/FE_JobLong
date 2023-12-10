'use client';

import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';
import { toastError, toastSuccess } from '@/provider/ToastProvider';

interface IProps {
    onClick: () => Promise<boolean>;
}

const RestoreButton = ({ onClick }: IProps) => {
    const handleClick = async () => {
        const isClose = await onClick();

        if (isClose) return toastSuccess('Restore successfully');

        toastError('Restore failed');
    };
    return (
        <Tooltip title="Restore" placement="top">
            <IconButton size="small" onClick={handleClick}>
                <RestoreIcon color="primary" fontSize="small" />
            </IconButton>
        </Tooltip>
    );
};

export default RestoreButton;
