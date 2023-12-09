import { Button } from '@mui/material';
import Link from 'next/link';

interface IProps {
    href: string;
    text: string;
}

const NavButton = ({ href, text }: IProps) => {
    return (
        <Link href={href}>
            <Button variant="contained">{text}</Button>
        </Link>
    );
};

export default NavButton;
