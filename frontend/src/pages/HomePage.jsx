import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import logoImg from '../images/logo.png'
import SimpleBank from '../images/SimpleBank.png'
import './style.css'

import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';

function HomePage() {
  return (
    <React.Fragment>
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
      <CssBaseline />
      <AppBar
        position="static"
        elevation={0}
        sx={{ backgroundColor: 'white' }}
      >
        <Toolbar sx={{ flexWrap: 'wrap' }}>
          <Typography color="inherit" sx={{ flexGrow: 1, mx: 3 }}>
            <img src={logoImg} className='homePageLogo' />
          </Typography>
          <Button href="login" variant="outlined" sx={{ mx: 2 }}>
            Login
          </Button>
          <Button href="register" variant="contained" sx={{ mr: 3 }}>
            Get Started
          </Button>
        </Toolbar>
      </AppBar>
      {/* Hero unit */}
      <Container component="main" sx={{ mt: 10 }}>
        <div className='divParent'>
          <div className='divLeft'>
            <Typography variant="h3" align="left" color="black" component="p">
              Banking & <br />
              budgeting, made <br />
              Simple
            </Typography>
            <Typography variant="h7" align="left" color="black" component="p">
              Master your money with one easy app.
            </Typography>
            <Button href="register" variant="contained" sx={{ mt: 1.5, width: '340px' }} >
              Get Started
            </Button>
            <p className="Paragraph">Already a customer? <a href="login" className='Link'>Login here</a>.</p>
          </div>
          <div className='divRight'>
            <img src={SimpleBank} className='SimpleBank' />
          </div>
        </div>
      </Container>
      {/* Footer */}
      <div className='footer'>
        <Typography variant="body2" color="text.secondary" align="center">
          {'Copyright © '}
          <Link color="inherit" href="">
            Simple Bank
          </Link>{' '}
          2023
          {'.'}
        </Typography>
      </div>

      {/* End footer */}
    </React.Fragment>
  );
}

export default HomePage