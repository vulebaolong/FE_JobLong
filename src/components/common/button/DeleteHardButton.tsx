'use client';

import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Divider, IconButton, ListItemText, Menu, Stack, Tooltip } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { Button } from '@mui/material';
import { toastError, toastSuccess } from '@/provider/ToastProvider';

interface IProps {
    onClick: () => Promise<boolean>;
}

const DeleteHardButton = ({ onClick }: IProps) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClickOke = async () => {
        const isClose = await onClick();
        if (isClose) {
            handleClose();
            toastSuccess('Deleted hard successfully');
            return;
        }

        toastError('Deletion failed');
    };
    return (
        <>
            <Tooltip title="Delete" placement="top">
                <IconButton size="small" id="delete-button" onClick={handleClick}>
                    <HighlightOffIcon color="error" fontSize="small" />
                </IconButton>
            </Tooltip>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'delete-button',
                }}
            >
                <Box>
                    <Stack
                        direction={'row'}
                        spacing={2}
                        alignItems={'center'}
                        onClick={handleClose}
                        paddingLeft={1}
                        paddingRight={1}
                    >
                        <InfoIcon fontSize="small" color="warning" />
                        <ListItemText>Sure to delete hard?</ListItemText>
                    </Stack>
                    <Divider sx={{ margin: '10px' }} />
                    <Stack
                        paddingLeft={1}
                        paddingRight={1}
                        direction={'row'}
                        justifyContent={'end'}
                        gap={1}
                    >
                        <Button onClick={handleClose} size="small">
                            Cancel
                        </Button>
                        <Button onClick={handleClickOke} size="small" variant="contained">
                            OKE
                        </Button>
                    </Stack>
                </Box>
            </Menu>
        </>
    );
};

export default DeleteHardButton;
