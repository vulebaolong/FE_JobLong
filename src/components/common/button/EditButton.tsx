"use client";

import Link from "next/link";
import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";

const EditButton = ({ href = "#" }) => {
    return (
        <Link href={href}>
            <IconButton size="small">
                <EditIcon fontSize="small" />
            </IconButton>
        </Link>
    );
};

export default EditButton;
