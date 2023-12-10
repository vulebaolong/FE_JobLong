'use client';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { MouseEvent, useEffect, useState } from 'react';
import { ModeToggle } from '@/components/common/modeToggle/ModeToggle';
import { useRouter } from 'next/navigation';
import { Divider, ListItemIcon } from '@mui/material';
import { Logout, PersonAdd, Settings } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { DispatchType, RootState } from '@/redux/store';
import { setSidebarOpen } from '@/redux/slices/sidebarSlice';
import { lcStorage } from '@/helpers/localStorage';
import { ACCESS_TOKEN, USER_LOGIN } from '@/constant/userContants';
import { logoutAction } from '@/app/auth/[id]/action';

function Header() {
    const router = useRouter();
    const { userLogin } = useSelector((state: RootState) => state.authSlice);
    const [isClient, setIsClient] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const dispatch: DispatchType = useDispatch();

    const onSidebarOpen = () => {
        dispatch(setSidebarOpen());
    };

    useEffect(() => {
        setIsClient(true);
    }, []);

    const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorEl(null);
    };

    const handleLogin = () => {
        router.push('/auth/login');
    };
    const handleRegister = () => {
        router.push('/auth/register');
    };

    const handleLogout = async () => {
        await logoutAction();
        lcStorage.remove(USER_LOGIN);
        lcStorage.remove(ACCESS_TOKEN);
        window.location.reload();
        handleCloseUserMenu();
    };

    return (
        <>
            {isClient && (
                <AppBar
                    className="justify-center px-5"
                    sx={{
                        position: 'unset',
                        height: '80px',
                        backgroundImage: 'none',
                    }}
                >
                    <Toolbar disableGutters>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                width: '100%',
                            }}
                        >
                            <IconButton
                                color="inherit"
                                sx={{ marginRight: 3 }}
                                onClick={onSidebarOpen}
                            >
                                <MenuIcon
                                    sx={{
                                        color: (theme) => {
                                            if (theme.palette.mode === 'dark') return 'white';
                                            if (theme.palette.mode === 'light') return 'black';
                                        },
                                    }}
                                />
                            </IconButton>

                            {/* USER CONTROL */}
                            <Box className="flex items-center">
                                {/* LOGGED */}
                                {userLogin && (
                                    <Box sx={{ flexGrow: 0 }}>
                                        <Tooltip title="Open settings">
                                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                                <Avatar src={userLogin.avatar} />
                                            </IconButton>
                                        </Tooltip>
                                        <Menu
                                            anchorEl={anchorEl}
                                            id="account-menu"
                                            open={open}
                                            onClose={handleCloseUserMenu}
                                            onClick={handleCloseUserMenu}
                                            sx={{
                                                overflow: 'visible',
                                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                                mt: 1.5,
                                                '& .MuiAvatar-root': {
                                                    width: 32,
                                                    height: 32,
                                                    ml: -0.5,
                                                    mr: 1,
                                                },
                                                '&:before': {
                                                    content: '""',
                                                    display: 'block',
                                                    position: 'absolute',
                                                    top: 0,
                                                    right: 14,
                                                    width: 10,
                                                    height: 10,
                                                    bgcolor: 'background.paper',
                                                    transform: 'translateY(-50%) rotate(45deg)',
                                                    zIndex: 0,
                                                },
                                            }}
                                            transformOrigin={{
                                                horizontal: 'right',
                                                vertical: 'top',
                                            }}
                                            anchorOrigin={{
                                                horizontal: 'right',
                                                vertical: 'bottom',
                                            }}
                                        >
                                            {/* <MenuItem onClick={handleCloseUserMenu}>
                                                    <Avatar /> Profile
                                                </MenuItem> */}
                                            <MenuItem onClick={handleCloseUserMenu}>
                                                <Avatar src={userLogin.avatar} /> {userLogin.name}
                                            </MenuItem>
                                            <Divider />
                                            <MenuItem onClick={handleCloseUserMenu}>
                                                <ListItemIcon>
                                                    <PersonAdd fontSize="small" />
                                                </ListItemIcon>
                                                Add another account
                                            </MenuItem>
                                            <MenuItem onClick={handleCloseUserMenu}>
                                                <ListItemIcon>
                                                    <Settings fontSize="small" />
                                                </ListItemIcon>
                                                Settings
                                            </MenuItem>
                                            <MenuItem onClick={handleLogout}>
                                                <ListItemIcon>
                                                    <Logout fontSize="small" />
                                                </ListItemIcon>
                                                Logout
                                            </MenuItem>
                                        </Menu>
                                    </Box>
                                )}

                                {/* NOT LOGGED  */}
                                {!userLogin && (
                                    <Box sx={{ flexGrow: 0 }}>
                                        <Button
                                            onClick={handleLogin}
                                            variant="outlined"
                                            color="primary"
                                            size="small"
                                        >
                                            Đăng nhập
                                        </Button>
                                        <Button onClick={handleRegister} size="small">
                                            Đăng ký
                                        </Button>
                                    </Box>
                                )}
                                <ModeToggle />
                            </Box>
                        </Box>
                    </Toolbar>
                </AppBar>
            )}
        </>
    );
}
export default Header;
