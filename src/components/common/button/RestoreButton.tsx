"use client";

import Link from "next/link";
import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import RestoreIcon from '@mui/icons-material/Restore';

interface IProps {
    href? : string
}

const RestoreButton = ({ href = "#" }: IProps) => {
    return (
        <Link href={href}>
            <Tooltip title="Restore" placement="top">
                <IconButton size="small">
                    <RestoreIcon color="primary" fontSize="small"/>
                </IconButton>
            </Tooltip>
        </Link>
    );
};

export default RestoreButton;
