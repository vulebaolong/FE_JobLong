"use client";

import {
    Autocomplete,
    Avatar,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Checkbox,
    Chip,
    Divider,
    FormControlLabel,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import MPagination from "@/components/common/pagination/MPagination";
import EditButton from "@/components/common/button/EditButton";
import { IUserInfo } from "@/interface/user";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { routerReplace } from "@/helpers/router.helper";
import { TEXT } from "@/constant/text.contants";
import { useFormik } from "formik";
import TextField from "@/components/common/textField/TextField";
import { useState, useTransition } from "react";
import {
    IOptionAutocomplete,
    convertStringToBoolean,
    initValueFormik,
} from "@/helpers/formik.helper";
import { ROUTES } from "@/constant/routes.contants";
import DeleteButton from "@/components/common/button/DeleteButton";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import { useFormStatus } from "react-dom";

interface IProps {
    dataUser: IModelPaginate<IUserInfo[]>;
    initialCompaies: IOptionAutocomplete[];
    initialRole: IOptionAutocomplete[];
    initialGender: IOptionAutocomplete[];
}

function ListUser({ dataUser, initialCompaies, initialRole, initialGender }: IProps) {
    
    const { pending } = useFormStatus();
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [companiesList, setCompaniesList] = useState<IOptionAutocomplete[]>(initialCompaies);
    const [genderList, setGenderList] = useState<IOptionAutocomplete[]>(initialGender);
    const [roleList, setRoleList] = useState<IOptionAutocomplete[]>(initialRole);
    const [loading, setLoading] = useState(false);

    const searchForm = useFormik({
        initialValues: {
            name: searchParams.get("name") || "",
            address: searchParams.get("address") || "",
            age: searchParams.get("age") || "",
            company: initValueFormik("company", companiesList, searchParams),
            email: searchParams.get("email") || "",
            gender: initValueFormik("gender", genderList, searchParams),
            role: initValueFormik("role", roleList, searchParams),
            page: searchParams.get("page") || 1,
            isDeleted: convertStringToBoolean(searchParams.get("isDeleted")),
        },
        onSubmit: (values) => {
            setLoading(true)
            routerReplace({
                router,
                pathname,
                searchParams,
                newSearchParams: {
                    ...values,
                    company: values.company.id || "",
                    gender: values.gender.label || "",
                    role: values.role.id || "",
                    isDeleted: convertStringToBoolean(values.isDeleted),
                },
            });
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

    const onResetSearch = () => {
        searchForm.setFieldValue("name", "");
        searchForm.setFieldValue("address", "");
        searchForm.setFieldValue("age", "");
        searchForm.setFieldValue("company", { label: "", id: "" });
        searchForm.setFieldValue("email", "");
        searchForm.setFieldValue("gender", { label: "", id: "" });
        searchForm.setFieldValue("role", { label: "", id: "" });
        searchForm.setFieldValue("page", 1);
        searchForm.submitForm();
    };

    const handleCheckBox = (_: any, value: boolean) => {
        searchForm.setFieldValue("isDeleted", value);
        searchForm.submitForm();
    };

    return (
        <Stack spacing={4}>
            <Box>{pending && <AutorenewIcon className="animate-spin" />}</Box>

            {/* SEARCH */}
            <Card variant="outlined">
                <CardContent>
                    <Stack direction={"row"} flexWrap="wrap" gap={2}>
                        {/* Name */}
                        <TextField
                            label="Name"
                            name="name"
                            value={searchForm.values.name}
                            onChange={searchForm.handleChange}
                        />

                        {/* Address */}
                        <TextField
                            label="Address"
                            name="address"
                            value={searchForm.values.address}
                            onChange={searchForm.handleChange}
                        />

                        {/* Age */}
                        <TextField
                            type="number"
                            max={199}
                            name="age"
                            label="Age"
                            value={searchForm.values.age}
                            onChange={searchForm.handleChange}
                        />

                        {/* Company */}
                        <Autocomplete
                            sx={{ width: "300px" }}
                            size="small"
                            options={companiesList}
                            renderOption={(props, option) => {
                                return (
                                    <li {...props} key={option.id}>
                                        {option.label}
                                    </li>
                                );
                            }}
                            isOptionEqualToValue={(option, value) =>
                                value.id === "" || option.id === value.id
                            }
                            value={searchForm.values.company}
                            renderInput={(params) => <TextField {...params} label="Company" />}
                            onChange={(_, value) => {
                                searchForm.setFieldValue("company", value || { label: "", id: "" });
                            }}
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
                        <Autocomplete
                            sx={{ width: "300px" }}
                            size="small"
                            options={genderList}
                            renderOption={(props, option) => {
                                return (
                                    <li {...props} key={option.id}>
                                        {option.label}
                                    </li>
                                );
                            }}
                            isOptionEqualToValue={(option, value) =>
                                value.id === "" || option.id === value.id
                            }
                            value={searchForm.values.gender}
                            renderInput={(params) => <TextField {...params} label="Gender" />}
                            onChange={(_, value) => {
                                searchForm.setFieldValue("gender", value || { label: "", id: "" });
                            }}
                        />

                        {/* Role */}
                        <Autocomplete
                            sx={{ width: "300px" }}
                            size="small"
                            options={roleList}
                            renderOption={(props, option) => {
                                return (
                                    <li {...props} key={option.id}>
                                        {option.label}
                                    </li>
                                );
                            }}
                            isOptionEqualToValue={(option, value) =>
                                value.id === "" || option.id === value.id
                            }
                            value={searchForm.values.role}
                            renderInput={(params) => <TextField {...params} label="Role" />}
                            onChange={(_, value) => {
                                searchForm.setFieldValue("role", value || { label: "", id: "" });
                            }}
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
                                    <TableCellNote
                                        dataUser={dataUser}
                                        onChange={handleCheckBox}
                                        checked={convertStringToBoolean(
                                            searchForm.values.isDeleted
                                        )}
                                        loading={loading}
                                    />
                                </TableRow>

                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Address</TableCell>
                                    <TableCell>Age</TableCell>
                                    <TableCell>Company</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Gender</TableCell>
                                    <TableCell>Role</TableCell>
                                    <TableCell>Deleted</TableCell>
                                    <TableCell>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {dataUser.data?.result?.map((user, index) => (
                                    <TableRow key={index}>
                                        <TableCell>
                                            <Stack
                                                direction="row"
                                                justifyContent="flex-start"
                                                alignItems="center"
                                                spacing={1}
                                            >
                                                <Avatar
                                                    sx={{ width: 30, height: 30 }}
                                                    src={user.avatar}
                                                />
                                                <Box>{user.name}</Box>
                                            </Stack>
                                        </TableCell>
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
                                        <TableCell>
                                            {user.isDeleted ? (
                                                <ThumbDownIcon fontSize="small" color="error" />
                                            ) : (
                                                <ThumbUpIcon fontSize="small" color="primary" />
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {user.isDeleted ? (
                                                <EditButton
                                                    href={ROUTES.ADMIN.USERS.DETAIL(user._id)}
                                                />
                                            ) : (
                                                <>
                                                    <EditButton
                                                        href={ROUTES.ADMIN.USERS.DETAIL(user._id)}
                                                    />
                                                    <DeleteButton />
                                                </>
                                            )}
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

interface IPropsTableCellNote {
    dataUser: IModelPaginate<IUserInfo[]>;
    onChange: (_: any, value: boolean) => void;
    checked: boolean;
    loading?: boolean;
}

function TableCellNote({ dataUser, onChange, checked, loading }: IPropsTableCellNote) {
    return (
        <TableCell colSpan={9} sx={{ borderBottom: "none", paddingBottom: "0 !important" }}>
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                width={"100%"}
            >
                <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={3}>
                    <Box sx={{ fontSize: "1rem" }}>Total: {dataUser.data?.meta?.totalItems}</Box>
                    <Box>
                        <FormControlLabel
                            control={
                                <Checkbox onChange={onChange} size="small" checked={checked} />
                            }
                            label={<Box sx={{ fontSize: "1rem", paddingTop: "1px" }}>label</Box>}
                        />
                    </Box>
                </Stack>
                <Box>{loading && <AutorenewIcon className="animate-spin" />}</Box>
            </Stack>
        </TableCell>
    );
}
