"use client";

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
    TextField,
} from "@mui/material";
import MPagination from "@/components/common/pagination/MPagination";
import GotoEditButton from "@/components/common/button/GotoEditButton";
import { IUserInfo } from "@/interface/user";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { routerReplace } from "@/helpers/router.helper";
import { TEXT } from "@/constant/text.contants";

interface IProps {
    dataUser: IModelPaginate<IUserInfo[]>;
}

function ListUser({ dataUser }: IProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const onPageChange = (_: any, page: number) => {
        routerReplace({
            router,
            pathname,
            searchParams,
            newSearchParams: { currentPage: page },
        });
    };

    const onSearch = () => {};

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
                            // value={searchForm.values.organizationId}
                            // onChange={searchForm.handleChange}
                        />

                        {/* Address */}
                        <TextField
                            sx={{ width: "300px" }}
                            size="small"
                            variant="outlined"
                            label="Address"
                            name="address"
                            // value={searchForm.values.name}
                            // onChange={searchForm.handleChange}
                        />

                        {/* Age */}
                        <TextField
                            sx={{ width: "300px" }}
                            size="small"
                            variant="outlined"
                            label="Age"
                            name="age"
                            // value={searchForm.values.lastName}
                            // onChange={searchForm.handleChange}
                        />

                        {/* Company */}
                        <TextField
                            sx={{ width: "300px" }}
                            size="small"
                            variant="outlined"
                            label="Company"
                            name="company"
                            // value={searchForm.values.firstName}
                            // onChange={searchForm.handleChange}
                        />

                        {/* Email */}
                        <TextField
                            sx={{ width: "300px" }}
                            size="small"
                            variant="outlined"
                            label="Email"
                            name="email"
                            // value={searchForm.values.tel}
                            // onChange={searchForm.handleChange}
                        />

                        {/* Gender */}
                        <TextField
                            sx={{ width: "300px" }}
                            size="small"
                            variant="outlined"
                            label="Gender"
                            name="gender"
                            // value={searchForm.values.tel}
                            // onChange={searchForm.handleChange}
                        />
                        
                        {/* Gender */}
                        <TextField
                            sx={{ width: "300px" }}
                            size="small"
                            variant="outlined"
                            label="Gender"
                            name="gender"
                            // value={searchForm.values.tel}
                            // onChange={searchForm.handleChange}
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
