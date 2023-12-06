"use client";

import Link from 'next/link';
import React from 'react';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { IconButton } from '@mui/material';

const GotoEditButton = ({ href = "#" }) => {
  return (
    <Link href={href}>
      <IconButton>
        <EditOutlinedIcon />
      </IconButton>
    </Link>
  );
};

export default GotoEditButton;