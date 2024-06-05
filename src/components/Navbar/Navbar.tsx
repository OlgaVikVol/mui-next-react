import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Link from 'next/link';
import Button from '@mui/material/Button';

export const Navbar = () => {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Link href="/" passHref>
          <Button color="inherit">Home</Button>
        </Link>
        <Link href="/about" passHref>
          <Button color="inherit">About</Button>
        </Link>
        <Link href="/tasks" passHref>
          <Button color="inherit">Tasks</Button>
        </Link>
      </Toolbar>
    </AppBar>
  );
}
