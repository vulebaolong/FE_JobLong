'use client';

import Link from 'next/link';
import React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton, Tooltip } from '@mui/material';

const EditButton = ({ href = '#' }) => {
    return (
        <Link href={href}>
            <Tooltip title="Edit" placement="top">
                <IconButton size="small">
                    <EditIcon fontSize="small" />
                </IconButton>
            </Tooltip>
        </Link>
    );
};

export default EditButton;
