'use client';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { MouseEvent, useEffect, useState } from 'react';
import { ModeToggle } from '../common/modeToggle/ModeToggle';
import Logo from './Logo';
import { useRouter } from 'next/navigation';
import { Divider, ListItemIcon } from '@mui/material';
import { Logout, PersonAdd, Settings } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { DispatchType, RootState } from '@/redux/store';
import { lcStorage } from '@/helpers/localStorage';
import { ACCESS_TOKEN, USER_LOGIN } from '@/constant/userContants';

const pages = ['Products', 'Pricing', 'Blog'];

function Header() {
    const router = useRouter();

    const { userLogin } = useSelector((state: RootState) => state.authSlice);
    const [isClient, setIsClient] = useState(false);
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    useEffect(() => {
        setIsClient(true);
    }, []);

    // useEffect(() => {
    //     if (!session?.access_token) {
    //         console.log("đăng nhập lại");
    //         // signOut()
    //     }
    // }, [session]);

    const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
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

    const handleLogout = () => {
        lcStorage.remove(USER_LOGIN);
        lcStorage.remove(ACCESS_TOKEN);
        window.location.reload();
        handleCloseUserMenu();
    };

    return (
        <>
            {isClient && (
                <AppBar position="fixed" className="justify-center" sx={{ height: '80px' }}>
                    <Container maxWidth="xl">
                        <Toolbar disableGutters>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    width: '100%',
                                }}
                            >
                                {/* LOGO DESKTOP */}
                                <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                                    <Logo />
                                </Box>
                                {/* MENU DESKTOP */}
                                <Box
                                    sx={{
                                        flexGrow: 1,
                                        display: { xs: 'none', md: 'flex' },
                                    }}
                                >
                                    {pages.map((page) => (
                                        <Button
                                            key={page}
                                            onClick={handleCloseNavMenu}
                                            sx={{
                                                my: 2,
                                                color: (theme) => theme.palette.primary.light,
                                                display: 'block',
                                            }}
                                        >
                                            {page}
                                        </Button>
                                    ))}
                                </Box>

                                {/* MENU MOBILE */}
                                <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                                    <IconButton
                                        size="large"
                                        aria-label="account of current user"
                                        aria-controls="menu-appbar"
                                        aria-haspopup="true"
                                        onClick={handleOpenNavMenu}
                                        sx={{
                                            color: (theme) => theme.palette.primary.light,
                                        }}
                                    >
                                        <MenuIcon />
                                    </IconButton>
                                    <Menu
                                        id="menu-appbar"
                                        anchorEl={anchorElNav}
                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'left',
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'left',
                                        }}
                                        open={Boolean(anchorElNav)}
                                        onClose={handleCloseNavMenu}
                                        sx={{
                                            display: {
                                                xs: 'block',
                                                md: 'none',
                                            },
                                        }}
                                    >
                                        {pages.map((page) => (
                                            <MenuItem key={page} onClick={handleCloseNavMenu}>
                                                <Typography
                                                    sx={{
                                                        color: (theme) =>
                                                            theme.palette.primary.light,
                                                    }}
                                                    textAlign="center"
                                                >
                                                    {page}
                                                </Typography>
                                            </MenuItem>
                                        ))}
                                    </Menu>
                                </Box>
                                {/* LOGO MOBILE */}
                                <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                                    <Logo />
                                </Box>

                                {/* USER CONTROL */}
                                <Box className="flex items-center">
                                    {/* LOGGED */}
                                    {userLogin && (
                                        <Box sx={{ flexGrow: 0 }}>
                                            <Tooltip title="Open settings">
                                                <IconButton
                                                    onClick={handleOpenUserMenu}
                                                    sx={{ p: 0 }}
                                                >
                                                    <Avatar alt="Remy Sharp" />
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
                                                    <Avatar /> {userLogin.name}
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
                    </Container>
                </AppBar>
            )}
        </>
    );
}
export default Header;
