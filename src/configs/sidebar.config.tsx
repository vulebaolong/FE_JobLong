import {
    BiCategory,
    BiUser,
    BiShield,
    BiShieldQuarter,
    BiBookAlt,
    BiFoodMenu,
    BiHomeCircle,
    BiMailSend,
} from 'react-icons/bi';

interface ISidebarMenus {
    title: string;
    icon: JSX.Element;
    url: string;
    role: string;
    module: string;
}

export const rootSidebarMenus: ISidebarMenus[] = [
    {
        title: 'Dashboard',
        module: '',
        icon: <BiCategory size="1.25em" />,
        url: '/admin',
        role: 'admin',
    },
    {
        title: 'Users',
        module: 'USERS',
        icon: <BiUser size="1.25em" />,
        url: '/admin/users',
        role: 'admin',
    },
    {
        title: 'Permissions',
        module: 'PERMISSIONS',
        icon: <BiShield size="1.25em" />,
        url: '/admin/permissions',
        role: 'admin',
    },
    {
        title: 'Roles',
        module: 'ROLES',
        icon: <BiShieldQuarter size="1.25em" />,
        url: '/admin/roles',
        role: 'admin',
    },
    {
        title: 'Jobs',
        module: 'JOBS',
        icon: <BiFoodMenu size="1.25em" />,
        url: '/admin/jobs',
        role: 'admin',
    },
    {
        title: 'Companies',
        module: 'COMPANIES',
        icon: <BiHomeCircle size="1.25em" />,
        url: '/admin/companies',
        role: 'admin',
    },
    {
        title: 'Resumes',
        module: 'RESUMES',
        icon: <BiBookAlt size="1.25em" />,
        url: '/admin/resumes',
        role: 'admin',
    },
    {
        title: 'Subscribers',
        module: 'SUBSCRIBERS',
        icon: <BiMailSend size="1.25em" />,
        url: '/admin/subscribers',
        role: 'admin',
    },
];

export const sidebarActiveModule = (pathname: string) => {
    const arrPathname = pathname.trim().split('/');

    if (arrPathname.length > 2) return arrPathname[2].toUpperCase();

    return '';
};
