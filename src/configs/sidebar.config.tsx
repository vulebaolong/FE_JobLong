import { BiCategory, BiDevices } from "react-icons/bi";

interface ISidebarMenus {
    title: string;
    icon: JSX.Element;
    url: string;
    role: string;
    module: string;
}

export const rootSidebarMenus: ISidebarMenus[] = [
    {
        title: "Dashboard",
        module: "",
        icon: <BiCategory size="1.25em" />,
        url: "/admin",
        role: "admin",
    },
    {
        title: "Users",
        module: "USERS",
        icon: <BiCategory size="1.25em" />,
        url: "/admin/users",
        role: "admin",
    },
    {
        title: "Permissions",
        module: "PERMISSIONS",
        icon: <BiCategory size="1.25em" />,
        url: "/admin/permissions",
        role: "admin",
    },
    {
        title: "Roles",
        module: "ROLES",
        icon: <BiCategory size="1.25em" />,
        url: "/admin/roles",
        role: "admin",
    },
    {
        title: "Jobs",
        module: "JOBS",
        icon: <BiCategory size="1.25em" />,
        url: "/admin/jobs",
        role: "admin",
    },
    {
        title: "Companies",
        module: "COMPANIES",
        icon: <BiCategory size="1.25em" />,
        url: "/admin/companies",
        role: "admin",
    },
    {
        title: "Resumes",
        module: "RESUMES",
        icon: <BiCategory size="1.25em" />,
        url: "/admin/resumes",
        role: "admin",
    },
    {
        title: "Subscribers",
        module: "SUBSCRIBERS",
        icon: <BiCategory size="1.25em" />,
        url: "/admin/subscribers",
        role: "admin",
    },
];
