"use client";

import Link from "next/link";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";

const DeleteButton = ({ href = "#" }) => {
    return (
        <IconButton size="small">
            <DeleteIcon color="error" fontSize="small" />
        </IconButton>
    );
};

export default DeleteButton;
