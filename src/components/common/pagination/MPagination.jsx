"use client";

import { Pagination } from "@mui/material";

const MPagination = ({ count, page, onChange }) => {
    return (
        <Pagination color="primary" shape="rounded" count={count} page={page} onChange={onChange} />
    );
};

export default MPagination;
