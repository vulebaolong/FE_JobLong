'use client';

import { getListPermissionsByUserAction } from '@/app/admin/permissions/action';
import { logoutAction } from '@/app/auth/[id]/action';
import SlidebarSkeleton from '@/components/common/skeleton/slidebar.skeleton';
import { rootSidebarMenus, sidebarActiveModule } from '@/configs/sidebar.config';
import { ROUTES } from '@/constant/routes.contants';
import { ACCESS_TOKEN, USER_LOGIN } from '@/constant/userContants';
import { extractUniqueModules } from '@/helpers/function.helper';
import { lcStorage } from '@/helpers/localStorage';
import { IPermissions } from '@/interface/auth';
import { RootState } from '@/redux/store';
import {
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
    colors,
} from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';
import { cyan } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const drawerWidth = 240;

const openedMixin = (theme: any) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme: any) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }: any) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme),
    }),
}));

function Sidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const { sidebarOpen } = useSelector((state: RootState) => state.sidebarSlice);
    const [activeState, setActiveState] = useState<string | undefined>('');
    const [permission, setPermission] = useState<IPermissions[]>([]);
    const [loading, setLoading] = useState(false);
    const uniqueModules: string[] = extractUniqueModules(permission);

    const sidebarMenus = rootSidebarMenus.filter((item) => {
        if (item.module === '') return true;
        if (uniqueModules.includes(item.module)) {
            return true;
        }
    });

    useEffect(() => {
        setActiveState(sidebarActiveModule(pathname));
    }, [pathname]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const dataPermission = await getListPermissionsByUserAction();
            setLoading(false);

            if (dataPermission.statusCode === 401) {
                await logoutAction();
                lcStorage.remove(USER_LOGIN);
                lcStorage.remove(ACCESS_TOKEN);
                router.push(ROUTES.ADMIN.DASHBOARD.INDEX);
            }

            if (dataPermission.error) router.push(ROUTES.ADMIN.DASHBOARD.INDEX);
            setPermission(dataPermission.data);
        };
        fetchData();
    }, []);

    return (
        <Drawer variant="permanent" open={sidebarOpen}>
            <Toolbar sx={{ height: '80px' }} />
            {loading ? (
                <SlidebarSkeleton sidebarOpen={sidebarOpen} />
            ) : (
                <List sx={{ paddingTop: 0 }}>
                    {sidebarMenus.map((item, index) => {
                        return (
                            <ListItem key={index} disablePadding sx={{ display: 'block' }}>
                                <Link
                                    href={item.url}
                                    style={{
                                        textDecoration: 'none',
                                        color: 'unset',
                                    }}
                                >
                                    <ListItemButton
                                        sx={{
                                            minHeight: 48,
                                            justifyContent: sidebarOpen ? 'initial' : 'center',
                                            px: 2.5,
                                            backgroundColor:
                                                item.module === activeState ? cyan['400'] : 'unset',
                                            color: item.module === activeState ? '#fff' : 'unset',
                                            '&:hover': {
                                                backgroundColor:
                                                    item.module === activeState ? cyan['600'] : '',
                                                color:
                                                    item.module === activeState
                                                        ? '#fff'
                                                        : 'inherit',
                                            },
                                        }}
                                    >
                                        <ListItemIcon
                                            sx={{
                                                minWidth: 0,
                                                mr: sidebarOpen ? 3 : 'auto',
                                                justifyContent: 'center',
                                                color:
                                                    item.module === activeState ? '#fff' : 'unset',
                                            }}
                                        >
                                            {item.icon}
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={item.title}
                                            sx={{
                                                opacity: sidebarOpen ? 1 : 0,
                                            }}
                                        />
                                    </ListItemButton>
                                </Link>
                            </ListItem>
                        );
                    })}
                </List>
            )}
        </Drawer>
    );
}
export default Sidebar;
