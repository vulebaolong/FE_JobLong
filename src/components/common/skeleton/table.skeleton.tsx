import Content, { ContentBody, ContentHeader } from '../content/Content';
import { TEXT } from '@/constant/text.contants';
import NavButton from '../button/NavButton';
import { ROUTES } from '@/constant/routes.contants';
import {
    Card,
    CardActions,
    CardContent,
    Divider,
    Skeleton,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';

interface IProps {
    rowsNum: number;
}

export const TableSkeleton = ({ rowsNum }: IProps) => {
    return (
        <Content>
            <ContentHeader
                title={TEXT.TITLE.USER}
                rightContent={
                    <NavButton href={ROUTES.ADMIN.USERS.CREATE} text={TEXT.BUTTON_TEXT.ADD} />
                }
            />
            <ContentBody>
                <Stack spacing={4}>
                    {/* SEARCH */}
                    <Card variant="outlined">
                        <CardContent>
                            <Stack direction={'row'} flexWrap="wrap" gap={2}>
                                {/* Name */}
                                <Skeleton animation="wave" variant="text" width={300} />

                                {/* Address */}
                                <Skeleton animation="wave" variant="text" width={300} />

                                {/* Age */}
                                <Skeleton animation="wave" variant="text" width={300} />

                                {/* Company */}
                                <Skeleton animation="wave" variant="text" width={300} />

                                {/* Email */}
                                <Skeleton animation="wave" variant="text" width={300} />

                                {/* Gender */}
                                <Skeleton animation="wave" variant="text" width={300} />

                                {/* Role */}
                                <Skeleton animation="wave" variant="text" width={300} />
                            </Stack>
                        </CardContent>
                        <Divider />
                        <CardActions>
                            <Skeleton variant="rounded" width={60} height={30} />
                            <Skeleton variant="rounded" width={60} height={30} />
                        </CardActions>
                    </Card>

                    {/* TABLE */}
                    <Card variant="outlined">
                        <CardContent sx={{ padding: 0 }}>
                            <TableContainer>
                                <Table sx={{ minWidth: 650 }} size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>
                                                <Skeleton animation="wave" variant="text" />
                                            </TableCell>
                                            <TableCell>
                                                <Skeleton animation="wave" variant="text" />
                                            </TableCell>
                                            <TableCell>
                                                <Skeleton animation="wave" variant="text" />
                                            </TableCell>
                                            <TableCell>
                                                <Skeleton animation="wave" variant="text" />
                                            </TableCell>
                                            <TableCell>
                                                <Skeleton animation="wave" variant="text" />
                                            </TableCell>
                                            <TableCell>
                                                <Skeleton animation="wave" variant="text" />
                                            </TableCell>
                                            <TableCell>
                                                <Skeleton animation="wave" variant="text" />
                                            </TableCell>
                                            <TableCell>
                                                <Skeleton animation="wave" variant="text" />
                                            </TableCell>
                                            <TableCell>
                                                <Skeleton animation="wave" variant="text" />
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {[...Array(10)].map((user, index) => (
                                            <TableRow key={index}>
                                                <TableCell>
                                                    <Skeleton animation="wave" variant="text" />
                                                </TableCell>
                                                <TableCell>
                                                    <Skeleton animation="wave" variant="text" />
                                                </TableCell>
                                                <TableCell>
                                                    <Skeleton animation="wave" variant="text" />
                                                </TableCell>
                                                <TableCell>
                                                    <Skeleton animation="wave" variant="text" />
                                                </TableCell>
                                                <TableCell>
                                                    <Skeleton animation="wave" variant="text" />
                                                </TableCell>
                                                <TableCell>
                                                    <Skeleton animation="wave" variant="text" />
                                                </TableCell>
                                                <TableCell>
                                                    <Skeleton animation="wave" variant="text" />
                                                </TableCell>
                                                <TableCell>
                                                    <Skeleton animation="wave" variant="text" />
                                                </TableCell>
                                                <TableCell>
                                                    <Skeleton animation="wave" variant="text" />
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </CardContent>
                        <Divider />
                        <CardActions>
                            <Skeleton variant="rounded" width={26} height={26} />
                            <Skeleton variant="rounded" width={26} height={26} />
                            <Skeleton variant="rounded" width={26} height={26} />
                        </CardActions>
                    </Card>
                </Stack>
            </ContentBody>
        </Content>
    );
};
