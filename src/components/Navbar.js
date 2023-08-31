import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import logo from "../assets/wordmark.svg"
import { ShoppingBag } from '@mui/icons-material';
import { Badge } from '@mui/material';
import { Link } from 'react-router-dom';
import { useStateValue } from '../StateProvider'

export default function Navbar() {
  const [{basket}, dispatch] = useStateValue();
  return (
    <Box sx={{ flexGrow: 1, marginBottom: '7rem' }}>
      <AppBar position="fixed" sx={{ backgroundColor: 'whitesmoke' }}>
        <Toolbar>
          <Link to={'/'}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <img src={logo} alt='logotipo' style={{ width: '80px', height: '50px' }}/>
          </IconButton>
          </Link>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'black'}}>
            Hello Guest
          </Typography>
          <Link to={'/sign-in'}>
          <Button variant='outlined' sx={{ color: 'black' }}>Sign In</Button>
          </Link>
          <Link to={'checkout-page'}>
          <IconButton>
            <Badge badgeContent={basket?.length} color='secondary'>
              <ShoppingBag sx={{ color: 'black' }}/>
            </Badge>
          
          </IconButton>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
