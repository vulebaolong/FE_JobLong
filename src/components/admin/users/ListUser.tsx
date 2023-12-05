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
} from "@mui/material";
import MPagination from "@/components/common/pagination/MPagination";
import GotoEditButton from "@/components/common/button/GotoEditButton";
import { IUserInfo } from "@/interface/user";

interface IProps {
    dataUser: IModelPaginate<IUserInfo[]>;
}

function ListUser({ dataUser }: IProps) {
    const onPageChange = () => {
        // searchForm.setFieldValue("page", page);
        // searchForm.submitForm();
    };



  
    return (
        <Stack spacing={4}>
            <Card variant="outlined">
                <CardContent sx={{ padding: 0 }}>
                    <TableContainer>
                        <Table sx={{ minWidth: 650 }} size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell width={50}></TableCell>
                                    <TableCell>Tên</TableCell>
                                    <TableCell>Địa chỉ</TableCell>
                                    <TableCell>Tuổi</TableCell>
                                    <TableCell>Công ty</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Giới tính</TableCell>
                                    <TableCell>Vai trò</TableCell>
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
                        // count={totalPages}
                        // page={parseInt(searchForm.values.page)}
                        // onChange={onPageChange}
                        count={dataUser.data?.meta?.totalPages}
                        page={dataUser.data?.meta?.currentPage}
                        onChange={onPageChange}
                    />
                </CardActions>
            </Card>
        </Stack>
    );
}
export default ListUser;
