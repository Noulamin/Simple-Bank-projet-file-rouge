import React, { useState, useEffect } from 'react';
import { CssBaseline, TextField, Link, Grid, Box, Typography, Container, Snackbar } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import axios from 'axios'
import SimpleImg from '../../images/simple.jpg'
import './styleIdentify.css'

export default function Register() {

  const [IsLoading, setIsLoading] = useState(false)
  const [ShowAlert, setShowAlert] = useState(false)
  const [AlertMessage, setAlertMessage] = useState(false)

  useEffect(() => {
    document.title = "Register | Simple"
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsLoading(true)
    const data = new FormData(event.currentTarget)

    if (data.get('email').length === 0 || data.get('password').length === 0 ||
      data.get('firstName').length === 0 || data.get('lastName').length === 0 ||
      data.get('confirmPassword').length === 0) {
      setAlertMessage("Please fill all fields.")
      setShowAlert(true)
      setIsLoading(false)
      return
    }
    else {
      if (data.get('confirmPassword') !== data.get('password')) {
        setAlertMessage("Password does not match.")
        setShowAlert(true)
        setIsLoading(false)
        return
      }
    }

    const RegisterData = {
      firstName: data.get('firstName'),
      lastName: data.get('lastName'),
      email: data.get('email'),
      password: data.get('password'),
    }

    try {
      const res = await axios.post('http://localhost:8080/api/auth/register', RegisterData, { withCredentials: true });
      console.log(res.data)
      setAlertMessage(res.data)
      setShowAlert(true)
      setIsLoading(false)
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
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                autoComplete="confirm-new-password"
              />
            </Grid>
          </Grid>
          <LoadingButton
            loading={IsLoading}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </LoadingButton>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="login" variant="body2">
                Already have an account? Sign in
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
  );
}