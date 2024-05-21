import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Logo from '../Resources/JobSkillz_logo_nombre.svg';
import './NavbarHome.css';

const NavbarHome = () => {
  return (
      <AppBar sx={{ color: 'black', backgroundColor: '#D9D9D9', opacity:'0.8' }}position="static">
        <Toolbar variant="dense">
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <img src={Logo} alt='logo' style={{height: '3vw'}}/>
          </IconButton>
          <Typography variant="h4" sx={{ fontFamily: 'MiTipografia', fontWeight: 'bold'}} component="div">
            JOBSKILLZ
          </Typography>
        </Toolbar>
      </AppBar>
  );
}

export default NavbarHome;