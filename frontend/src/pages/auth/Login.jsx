import React, { useState, useEffect } from 'react';
import { CssBaseline, TextField, FormControlLabel, Checkbox, Link, Grid, Box, Typography, Container, Snackbar } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import axios from 'axios'
import SimpleImg from '../../images/simple.jpg'
import './styleIdentify.css'

export default function Login() {

  const [IsLoading, setIsLoading] = useState(false)
  const [ShowAlert, setShowAlert] = useState(false)
  const [AlertMessage, setAlertMessage] = useState(false)

  useEffect(() => {
    document.title = "Login | Simple"
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsLoading(true)
    const data = new FormData(event.currentTarget)

    if (data.get('email').length === 0 || data.get('password').length === 0) {
      setAlertMessage("Please fill all fields.")
      setShowAlert(true)
      setIsLoading(false)
      return
    }

    const LoginData = {
      email: data.get('email'),
      password: data.get('password')
    }

    try {
      const res = await axios.post('http://localhost:8080/api/auth/login', LoginData, { withCredentials: true });
      if (res.status === 200) {
        window.open('/dashboard', '_self')
      }
      else {
        setAlertMessage(res.data)
        setShowAlert(true)
        setIsLoading(false)
      }
    } catch (error) {
      setAlertMessage(error.toJSON().message)
      setShowAlert(true)
      setIsLoading(false)
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <img src={SimpleImg} className="logoIdentify" />
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <LoadingButton
            loading={IsLoading}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </LoadingButton>
          <Grid container>
            <Grid item xs>
              <Link href="forgetpassword" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>

      <Snackbar
        open={ShowAlert}
        autoHideDuration={4000}
        onClose={() => { setShowAlert(false) }}
        message={AlertMessage}
      />
    </Container>
  )
}