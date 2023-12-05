"use client";

import GotoEditButton from "@/components/common/button/GotoEditButton";
import MPagination from "@/components/common/pagination/MPagination";
import { routerReplace } from "@/helpers/router.helper";
import { IPermissions } from "@/interface/auth";
import {
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
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface IProps {
    dataPermissions: IModelPaginate<IPermissions[]>;
}

function ListPermissions({ dataPermissions }: IProps) {

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const onPageChange = ( _: any, page: number) => {
        routerReplace({
            router,
            pathname,
            searchParams,
            newSearchParams: {currentPage: page}
        });
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
                                {dataPermissions.data?.result?.map((permission, index) => (
                                    <TableRow key={index}>
                                        <TableCell>
                                            <GotoEditButton href={"/"} />
                                        </TableCell>
                                        <TableCell>{permission.name}</TableCell>
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
                        count={dataPermissions.data?.meta?.totalPages}
                        page={dataPermissions.data?.meta?.currentPage}
                        onChange={onPageChange}
                    />
                </CardActions>
            </Card>
        </Stack>
    );
}
export default ListPermissions;
