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
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useStateValue } from '../StateProvider'
import { auth } from '../firebase';
import { actionTypes } from '../reducer';

export default function Navbar() {
  const [{basket, user}, dispatch] = useStateValue();
  const navigate = useNavigate();
  const handleAuth = ()=>{
    if (user){
      auth.signOut();
      dispatch({
        type: actionTypes.EMPTY_BASKET,
        basket: [],
      });
      dispatch({
        type: actionTypes.SET_USER,
        user: null,
      });
      navigate('/')
    }
  }
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
            Hello {user ? user.email : "Guest"}
          </Typography>
          <Link to={'/sign-in'}>
          <Button variant='outlined' onClick={handleAuth} sx={{ color: 'black' }}>{user ? "Sign Out" : "Sign In" }</Button>
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
