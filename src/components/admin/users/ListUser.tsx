"use client";

import * as React from "react";
import {
    Autocomplete,
    Button,
    Card,
    CardActions,
    CardContent,
    Chip,
    Divider,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import MPagination from "@/components/common/pagination/MPagination";
import GotoEditButton from "@/components/common/button/GotoEditButton";
import { IUserInfo } from "@/interface/user";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { routerReplace } from "@/helpers/router.helper";
import { TEXT } from "@/constant/text.contants";
import { useFormik } from "formik";
import { NumericFormatCustom } from "@/helpers/numericFormat.helper";
import TextField from "@/components/common/textField/TextField";

interface IProps {
    dataUser: IModelPaginate<IUserInfo[]>;
}

function ListUser({ dataUser }: IProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const searchForm = useFormik({
        initialValues: {
            name: searchParams.get("name") || "",
            address: searchParams.get("address") || "",
            age: searchParams.get("age") || "",
            company: searchParams.get("company") || "",
            email: searchParams.get("email") || "",
            gender: searchParams.get("gender") || "",
            role: searchParams.get("role") || "",
            page: searchParams.get("page") || 1,
        },
        onSubmit: (values) => {
            routerReplace({ router, pathname, searchParams, newSearchParams: { ...values } });
        },
    });

    const onPageChange = (_: any, page: number) => {
        routerReplace({
            router,
            pathname,
            searchParams,
            newSearchParams: { currentPage: page },
        });
    };

    const onSearch = () => {
        searchForm.setFieldValue("page", 1);
        searchForm.submitForm();
    };

    const onResetSearch = () => {};

    return (
        <Stack spacing={4}>
            {/* SEARCH */}
            <Card variant="outlined">
                <CardContent>
                    <Stack direction={"row"} flexWrap="wrap" gap={2}>
                        {/* Name */}
                        <TextField
                            sx={{ width: "300px" }}
                            size="small"
                            variant="outlined"
                            label="Name"
                            name="name"
                            value={searchForm.values.name}
                            onChange={searchForm.handleChange}
                        />

                        {/* Address */}
                        <TextField
                            sx={{ width: "300px" }}
                            size="small"
                            variant="outlined"
                            label="Address"
                            name="address"
                            value={searchForm.values.address}
                            onChange={searchForm.handleChange}
                        />

                        {/* Age */}
                        <TextField
                            type="number"
                            sx={{ width: "300px" }}
                            size="small"
                            variant="outlined"
                            name="age"
                            label="Age"
                            value={searchForm.values.age}
                            onChange={searchForm.handleChange}
                        />

                        {/* Company */}
                        <TextField
                            sx={{ width: "300px" }}
                            size="small"
                            variant="outlined"
                            label="Company"
                            name="company"
                            value={searchForm.values.company}
                            onChange={searchForm.handleChange}
                        />

                        {/* Email */}
                        <TextField
                            sx={{ width: "300px" }}
                            size="small"
                            variant="outlined"
                            label="Email"
                            name="email"
                            value={searchForm.values.email}
                            onChange={searchForm.handleChange}
                        />

                        {/* Gender */}
                        <TextField
                            sx={{ width: "300px" }}
                            size="small"
                            variant="outlined"
                            label="Gender"
                            name="gender"
                            value={searchForm.values.gender}
                            onChange={searchForm.handleChange}
                        />

                        {/* Role */}
                        <TextField
                            sx={{ width: "300px" }}
                            size="small"
                            variant="outlined"
                            label="Role"
                            name="role"
                            value={searchForm.values.role}
                            onChange={searchForm.handleChange}
                        />
                    </Stack>
                </CardContent>
                <Divider />
                <CardActions>
                    <Button variant="contained" onClick={onSearch}>
                        {TEXT.BUTTON_TEXT.SEARCH}
                    </Button>
                    <Button onClick={onResetSearch}>{TEXT.BUTTON_TEXT.RESET}</Button>
                </CardActions>
            </Card>

            {/* TABLE */}
            <Card variant="outlined">
                <CardContent sx={{ padding: 0 }}>
                    <TableContainer>
                        <Table sx={{ minWidth: 650 }} size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell width={50}></TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Address</TableCell>
                                    <TableCell>Age</TableCell>
                                    <TableCell>Company</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Gender</TableCell>
                                    <TableCell>Role</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {dataUser.data?.result?.map((user, index) => (
                                    <TableRow key={index}>
                                        <TableCell>
                                            <GotoEditButton href={"/"} />
                                        </TableCell>
                                        <TableCell>{user.name}</TableCell>
                                        <TableCell>{user.address}</TableCell>
                                        <TableCell>{user.age}</TableCell>
                                        <TableCell>{user?.company?.name}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>{user.gender}</TableCell>
                                        <TableCell>
                                            <Chip
                                                key={index}
                                                variant="outlined"
                                                color={
                                                    user.role.name === "ROLE_ADMIN"
                                                        ? "error"
                                                        : "info"
                                                }
                                                size="small"
                                                label={user.role.name}
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>
                <Divider />
                <CardActions>
                    <MPagination
                        totalPages={dataUser.data?.meta?.totalPages}
                        currentPage={dataUser.data?.meta?.currentPage}
                        onChange={onPageChange}
                    />
                </CardActions>
            </Card>
        </Stack>
    );
}
export default ListUser;
