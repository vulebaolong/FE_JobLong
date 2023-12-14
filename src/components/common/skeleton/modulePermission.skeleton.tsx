import {
    Box,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Divider,
    Grid,
    Skeleton,
    Stack,
    Typography,
} from '@mui/material';
import Content, { ContentBody, ContentHeader } from '../content/Content';

function ModulePermissionSkeleton() {
    return (
        <Content>
            <ContentHeader title={'TITLE'} backButton />
            <ContentBody>
                <Stack gap={3}>
                    <Box>
                        <Card variant="outlined">
                            <CardContent>
                                <Stack gap={3}>
                                    {/* Name and Status */}
                                    <Grid container spacing={2}>
                                        {/* Name */}
                                        <Grid item xs={6}>
                                            <Skeleton animation="wave" variant="text" height={40} />
                                        </Grid>

                                        {/* Status */}
                                        <Grid item xs={6}>
                                            <Skeleton animation="wave" variant="text" height={40} />
                                        </Grid>
                                    </Grid>

                                    {/* Description */}
                                    <Skeleton animation="wave" variant="text" height={40} />

                                    {/* Accordion */}
                                    <Card variant="outlined">
                                        <CardHeader
                                            title={
                                                <Typography variant="subtitle1">Title</Typography>
                                            }
                                            subheader={
                                                <Typography variant="body2">Description</Typography>
                                            }
                                        />
                                        <CardContent>
                                            {[...Array(10)].map((_, index) => {
                                                return (
                                                    <Skeleton
                                                        animation="wave"
                                                        variant="text"
                                                        height={52}
                                                        key={index}
                                                    />
                                                );
                                            })}
                                        </CardContent>
                                    </Card>
                                </Stack>
                            </CardContent>
                            <Divider />
                            <CardActions>
                                <Skeleton variant="rounded" width={60} height={40} />
                                <Skeleton variant="rounded" width={60} height={40} />
                            </CardActions>
                        </Card>
                    </Box>
                </Stack>
            </ContentBody>
        </Content>
    );
}
export default ModulePermissionSkeleton;
