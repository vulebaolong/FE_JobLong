import { ListItem, ListItemButton, ListItemIcon, ListItemText, Skeleton } from '@mui/material';

interface IProps {
    sidebarOpen: boolean;
    activeState?: string;
}

function SlidebarSkeleton({ sidebarOpen, activeState }: IProps) {
    return (
        <div>
            {[...Array(10)].map((user, index) => {
                return (
                    <ListItem key={index} disablePadding sx={{ display: 'block' }}>
                        <ListItemButton
                            sx={{
                                minHeight: 48,
                                justifyContent: sidebarOpen ? 'initial' : 'center',
                                px: 2.5,
                                backgroundColor: 'unset',
                                color: 'unset',
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: sidebarOpen ? 3 : 'auto',
                                    justifyContent: 'center',
                                    color: 'unset',
                                }}
                            >
                                <Skeleton variant="rounded" width={20} height={20} />
                            </ListItemIcon>
                            <ListItemText
                                primary={<Skeleton animation="wave" variant="text" />}
                                sx={{ opacity: sidebarOpen ? 1 : 0 }}
                            />
                        </ListItemButton>
                    </ListItem>
                );
            })}
        </div>
    );
}
export default SlidebarSkeleton;
