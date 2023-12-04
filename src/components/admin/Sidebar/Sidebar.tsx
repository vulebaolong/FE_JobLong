"use client";

import { rootSidebarMenus } from "@/configs/sidebar.config";
import { extractUniqueModules } from "@/helpers/function";
import { IPermissions } from "@/interface/auth";
import { RootState } from "@/redux/store";
import {
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
    colors,
} from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import { styled } from "@mui/material/styles";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const drawerWidth = 240;

const openedMixin = (theme: any) => ({
    width: drawerWidth,
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
});

const closedMixin = (theme: any) => ({
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up("sm")]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== "open" })(
    ({ theme, open }: any) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: "nowrap",
        boxSizing: "border-box",
        ...(open && {
            ...openedMixin(theme),
            "& .MuiDrawer-paper": openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            "& .MuiDrawer-paper": closedMixin(theme),
        }),
    })
);

function Sidebar() {
    const { data: session, status } = useSession();
    const pathname = usePathname();
    const { sidebarOpen } = useSelector((state: RootState) => state.sidebarSlice);
    const [activeState, setActiveState] = useState("");

    const uniqueModules: string[] = extractUniqueModules(session?.user?.permissions);

    const sidebarMenus = rootSidebarMenus.filter((item) => {
        if (item.module === "") return true;
        if (uniqueModules.includes(item.module)) {
            return true;
        }
    });

    useEffect(() => {
        setActiveState(pathname);
    }, [pathname]);

    return (
        <Drawer variant="permanent" open={sidebarOpen}>
            <Toolbar sx={{ height: "80px" }} />
            <List sx={{ paddingTop: 0 }}>
                {sidebarMenus.map((item, index) => {
                    return (
                        <ListItem key={index} disablePadding sx={{ display: "block" }}>
                            <Link
                                href={item.url}
                                style={{ textDecoration: "none", color: "unset" }}
                            >
                                <ListItemButton
                                    sx={{
                                        "minHeight": 48,
                                        "justifyContent": sidebarOpen ? "initial" : "center",
                                        "px": 2.5,
                                        "backgroundColor":
                                            item.url === activeState ? "#199fff" : "unset",
                                        "color": item.url === activeState ? "#fff" : "unset",
                                        "&:hover": {
                                            backgroundColor:
                                                item.url === activeState
                                                    ? "#199fff"
                                                    : colors.grey[900],
                                            color: item.url === activeState ? "#fff" : "inherit",
                                        },
                                    }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: sidebarOpen ? 3 : "auto",
                                            justifyContent: "center",
                                            color: item.url === activeState ? "#fff" : "unset",
                                        }}
                                    >
                                        {item.icon}
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={item.title}
                                        sx={{ opacity: sidebarOpen ? 1 : 0 }}
                                    />
                                </ListItemButton>
                            </Link>
                        </ListItem>
                    );
                })}
            </List>
        </Drawer>
    );
}
export default Sidebar;
