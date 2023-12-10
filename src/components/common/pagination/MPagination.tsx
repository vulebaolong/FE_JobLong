'use client';

import { Pagination } from '@mui/material';

interface IProps {
    totalPages: number | undefined;
    currentPage: number | undefined;
    onChange: (_: any, page: number) => void;
}

const MPagination = ({ totalPages, currentPage, onChange }: IProps) => {
    return (
        <Pagination
            color="primary"
            shape="rounded"
            count={totalPages || 1}
            page={currentPage || 1}
            onChange={onChange}
            variant="outlined"
            size="small"
        />
    );
};

export default MPagination;
