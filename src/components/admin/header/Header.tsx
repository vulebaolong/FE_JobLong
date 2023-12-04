"use client";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { MouseEvent, useEffect, useState } from "react";
import { ModeToggle } from "@/components/modeToggle/ModeToggle";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { Divider, ListItemIcon } from "@mui/material";
import { Logout, PersonAdd, Settings } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { DispatchType } from "@/redux/store";
import { setSidebarOpen } from "@/redux/slices/sidebarSlice";


function Header() {
    const { data: session, status } = useSession();
    const router = useRouter();
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

    useEffect(() => {
        if (session?.error === "RefreshAccessTokenError") {
            console.log("đăng nhập lại");
            // signOut()
        }
    }, [session]);

    const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorEl(null);
    };

    const handleLogin = () => {
        router.push("/auth/login");
    };
    const handleRegister = () => {
        router.push("/auth/register");
    };

    const handleLogout = () => {
        signOut();
        handleCloseUserMenu();
    };

    return (
        <>
            {isClient && (
                <AppBar className="justify-center px-5" sx={{ position: "unset", height: "80px" }}>
                        <Toolbar disableGutters>
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    width: "100%",
                                }}
                            >
                                 <IconButton
                                    color="inherit"
                                    sx={{ marginRight: 3 }}
                                    onClick={onSidebarOpen}
                                >
                                    <MenuIcon />
                                </IconButton>

                                {/* USER CONTROL */}
                                <Box className="flex items-center">
                                    {/* LOGGED */}
                                    {status === "authenticated" && (
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
                                                    "overflow": "visible",
                                                    "filter":
                                                        "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                                                    "mt": 1.5,
                                                    "& .MuiAvatar-root": {
                                                        width: 32,
                                                        height: 32,
                                                        ml: -0.5,
                                                        mr: 1,
                                                    },
                                                    "&:before": {
                                                        content: '""',
                                                        display: "block",
                                                        position: "absolute",
                                                        top: 0,
                                                        right: 14,
                                                        width: 10,
                                                        height: 10,
                                                        bgcolor: "background.paper",
                                                        transform: "translateY(-50%) rotate(45deg)",
                                                        zIndex: 0,
                                                    },
                                                }}
                                                transformOrigin={{
                                                    horizontal: "right",
                                                    vertical: "top",
                                                }}
                                                anchorOrigin={{
                                                    horizontal: "right",
                                                    vertical: "bottom",
                                                }}
                                            >
                                                {/* <MenuItem onClick={handleCloseUserMenu}>
                                                    <Avatar /> Profile
                                                </MenuItem> */}
                                                <MenuItem onClick={handleCloseUserMenu}>
                                                    <Avatar /> {session.user.name}
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
                                    {status === "unauthenticated" && (
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
