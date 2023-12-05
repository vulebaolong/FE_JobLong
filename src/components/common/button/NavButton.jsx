import { Button } from '@mui/material';
import Link from 'next/link';

const NavButton = ({ href, text }) => {
  return (
    <Link href={href}>
      <Button variant="contained">
        {text}
      </Button>
    </Link>
  );
};

export default NavButton;