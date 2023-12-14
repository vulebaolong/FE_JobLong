import { Box, Card, CardActions, CardContent, Divider, Grid, Skeleton, Stack } from '@mui/material';
import Content, { ContentBody, ContentHeader } from '../content/Content';

interface IProps {}

export const FormSkeleton = ({}: IProps) => {
    return (
        <Content>
            <ContentHeader title={'TITLE'} backButton />
            <ContentBody>
                <Stack gap={3} sx={{ maxWidth: 'sm' }}>
                    <Box component={'form'}>
                        <Card variant="outlined">
                            <CardContent>
                                <Stack gap={3}>
                                    {/* Name */}
                                    <Skeleton animation="wave" variant="text" height={40} />

                                    {/* Email */}
                                    <Skeleton animation="wave" variant="text" height={40} />

                                    {/* password */}
                                    <Skeleton animation="wave" variant="text" height={40} />

                                    {/* Age / Gender */}
                                    <Grid container spacing={2}>
                                        {/* Age */}
                                        <Grid item xs={6}>
                                            <Skeleton animation="wave" variant="text" height={40} />
                                        </Grid>

                                        {/* Gender */}
                                        <Grid item xs={6}>
                                            <Skeleton animation="wave" variant="text" height={40} />
                                        </Grid>
                                    </Grid>

                                    {/* Address */}
                                    <Skeleton animation="wave" variant="text" height={40} />

                                    {/* USER or HR */}
                                    <Skeleton
                                        animation="wave"
                                        variant="text"
                                        width={80}
                                        height={40}
                                    />
                                    <Skeleton
                                        animation="wave"
                                        variant="text"
                                        width={80}
                                        height={40}
                                    />

                                    {/* Company */}
                                    <Skeleton animation="wave" variant="text" height={40} />
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
};
