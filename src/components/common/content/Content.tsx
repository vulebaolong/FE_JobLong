import { Box, Stack, Typography } from '@mui/material';
import React from 'react';
import BackButton from '../button/BackButton';

interface IPropsContentHeader {
    title?: string;
    backButton?: boolean;
    rightContent?: any;
}

interface IPropsContentBody {
    children?: React.ReactNode;
    disablePadding?: boolean;
}

interface IPropsContent {
    children?: React.ReactNode;
    disablePadding?: boolean;
}

export const ContentHeader = ({
    title,
    backButton = false,
    rightContent = undefined,
}: IPropsContentHeader) => {
    return (
        <Stack direction="row" justifyContent="space-between" alignItems="center" padding={1}>
            {/* left content */}
            <Stack direction="row" spacing={1} alignItems={'center'}>
                {backButton && <BackButton />}
                <Typography variant="h6">{title}</Typography>
            </Stack>
            {/* left content */}

            {/* right content */}
            {rightContent}
            {/* right content */}
        </Stack>
    );
};

export const ContentBody = ({ children, disablePadding = false }: IPropsContentBody) => {
    return <Box padding={disablePadding ? 0 : 1}> {children}</Box>;
};

const Content = ({ children, disablePadding = false }: IPropsContent) => {
    return <Box padding={disablePadding ? 0 : 3}>{children}</Box>;
};

export default Content;
