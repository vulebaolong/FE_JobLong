"use client";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { MouseEvent, useEffect, useState } from "react";
import { ModeToggle } from "../modeToggle/ModeToggle";
import Logo from "./Logo";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

const pages = ["Products", "Pricing", "Blog"];
const settings = [
    {
        index: 1,
        title: "Profile",
        onClick: () => { console.log('click Profile') }
    },
    {
        index: 2,
        title: "Account",
        onClick: () => { console.log('click Account') }
    },
    {
        index: 3,
        title: "Dashboard",
        onClick: () => { console.log('click Dashboard') }
    },
    {
        index: 4,
        title: "Logout",
        onClick: () => {
            console.log('click Logout')
            signOut()
        }
    }
];

function Header() {
    const { data: session, status } = useSession()
    // console.log("status", status);
    console.log("session", session);

    const router = useRouter();
    const [isClient, setIsClient] = useState(false);
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogin = () => {
        router.push("/auth/login");
        // signIn()
    };

    const handleRegister = () => {
        router.push("/auth/register");
        // signIn()
    };

    return (
        <>
            {isClient && (
                <AppBar position="fixed" className="justify-center">
                    <Container maxWidth="xl">
                        <Toolbar disableGutters>
                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
                                {/* LOGO DESKTOP */}
                                <Box sx={{ display: { xs: "none", md: "flex" } }}>
                                    <Logo />
                                </Box>
                                {/* MENU DESKTOP */}
                                <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                                    {pages.map((page) => (
                                        <Button
                                            key={page}
                                            onClick={handleCloseNavMenu}
                                            sx={{ my: 2, color: (theme) => theme.palette.primary.light, display: "block" }}
                                        >
                                            {page}
                                        </Button>
                                    ))}
                                </Box>

                                {/* MENU MOBILE */}
                                <Box sx={{ display: { xs: "flex", md: "none" } }}>
                                    <IconButton
                                        size="large"
                                        aria-label="account of current user"
                                        aria-controls="menu-appbar"
                                        aria-haspopup="true"
                                        onClick={handleOpenNavMenu}
                                        sx={{ color: (theme) => theme.palette.primary.light }}
                                    >
                                        <MenuIcon />
                                    </IconButton>
                                    <Menu
                                        id="menu-appbar"
                                        anchorEl={anchorElNav}
                                        anchorOrigin={{
                                            vertical: "bottom",
                                            horizontal: "left",
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: "top",
                                            horizontal: "left",
                                        }}
                                        open={Boolean(anchorElNav)}
                                        onClose={handleCloseNavMenu}
                                        sx={{
                                            display: { xs: "block", md: "none" },
                                        }}
                                    >
                                        {pages.map((page) => (
                                            <MenuItem key={page} onClick={handleCloseNavMenu}>
                                                <Typography sx={{ color: (theme) => theme.palette.primary.light }} textAlign="center">
                                                    {page}
                                                </Typography>
                                            </MenuItem>
                                        ))}
                                    </Menu>
                                </Box>
                                {/* LOGO MOBILE */}
                                <Box sx={{ display: { xs: "flex", md: "none" } }}>
                                    <Logo />
                                </Box>

                                {/* USER CONTROL */}
                                <Box className="flex items-center">
                                    {/* LOGGED */}
                                    {status === 'authenticated' &&
                                        <Box sx={{ flexGrow: 0 }}>
                                            <Tooltip title="Open settings">
                                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                                    <Avatar alt="Remy Sharp" />
                                                </IconButton>
                                            </Tooltip>
                                            <Menu
                                                sx={{ mt: "45px" }}
                                                id="menu-appbar"
                                                anchorEl={anchorElUser}
                                                anchorOrigin={{
                                                    vertical: "top",
                                                    horizontal: "right",
                                                }}
                                                keepMounted
                                                transformOrigin={{
                                                    vertical: "top",
                                                    horizontal: "right",
                                                }}
                                                open={Boolean(anchorElUser)}
                                                onClose={handleCloseUserMenu}
                                            >
                                                {settings.map((setting) => (
                                                    <MenuItem key={setting.index} onClick={
                                                        () => {
                                                            handleCloseUserMenu()
                                                            setting.onClick()
                                                        }
                                                    }>
                                                        <Typography textAlign="center">{setting.title}</Typography>
                                                    </MenuItem>
                                                ))}
                                            </Menu>
                                        </Box>
                                    }

                                    {/* NOT LOGGED  */}
                                    {status === 'unauthenticated' &&
                                        <Box sx={{ flexGrow: 0 }}>
                                            <Button onClick={handleLogin} variant="outlined" color="primary" size="small">
                                                Đăng nhập
                                            </Button>
                                            <Button onClick={handleRegister} size="small">
                                                Đăng ký
                                            </Button>
                                        </Box>
                                    }
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
