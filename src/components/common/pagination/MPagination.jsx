"use client";

import { Pagination } from "@mui/material";

const MPagination = ({ totalPages, currentPage, onChange }) => {
    return (
        <Pagination
            color="primary"
            shape="rounded"
            count={totalPages || 1}
            page={currentPage || 1}
            onChange={onChange}
        />
    );
};

export default MPagination;
