import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import logo from '../../Resources/JobSkillz_logo_nombre.svg';
import volver from '../../Resources/flecha-izquierda.png';

export default function Navbar() {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/');
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: '#D9D9D9' }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleBackClick}
          >
            <img src={volver} alt="menu icon" style={{ width: 50, height: 50 }} />
          </IconButton>
          <Typography
            variant="h4"
            component="div"
            sx={{ flexGrow: 1, textAlign: 'center', color: 'black', fontWeight: 'bold' }}
          >
            CHATBOT
          </Typography>
          <IconButton color="inherit">
            <img src={logo} alt="login" style={{ width: 50, height: 50 }} />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
