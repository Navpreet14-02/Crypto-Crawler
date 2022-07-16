import { AppBar, Container, createTheme, MenuItem, Select, ThemeProvider, Toolbar, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CryptoState } from '../CryptoContext';
import AuthModal from './Authentication/AuthModal';
import UserSidebar from './Authentication/UserSidebar';



const TitleStyles = {
  flex: 1,
  color: 'gold',
  fontFamily: 'Montserrat,sans-serif',
  fontWeight: 'bold',
  cursor: 'pointer'
}

const Header = () => {

  const navigate = useNavigate();

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: '#fff',
      },
      mode: 'dark',
    },
  });

  const { currency, setCurrency, user } = CryptoState();

  // console.log(currency);

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color='transparent' position='static' >
        <Container>
          <Toolbar>
            <Typography onClick={() => navigate("/")} sx={{ ...TitleStyles }} variant="h6">
              Crypto Crawler
            </Typography>
            <Select variant='outlined' style={{ width: 100, height: 40, marginRight: 15 }} value={currency} onChange={(e) => setCurrency(e.target.value)}>
              <MenuItem value={'USD'}>USD</MenuItem>
              <MenuItem value={'INR'} >INR</MenuItem>
            </Select>

            {user ? <UserSidebar/> : <AuthModal />}
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  )
}

export default Header;