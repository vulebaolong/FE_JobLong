'use client';

import { IconButton } from '@mui/material';
import { useRouter } from 'next/navigation';
import WestOutlinedIcon from '@mui/icons-material/WestOutlined';

const BackButton = () => {
    const router = useRouter();
    const onClick = () => router.back();

    return (
        <IconButton onClick={onClick}>
            <WestOutlinedIcon />
        </IconButton>
    );
};

export default BackButton;
