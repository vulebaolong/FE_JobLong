"use client";

import { Pagination } from "@mui/material";

const MPagination = ({ totalPages, currentPage, onChange }) => {
    return (
        <Pagination
            color="primary"
            shape="rounded"
            count={totalPages}
            page={currentPage}
            onChange={onChange}
        />
    );
};

export default MPagination;
