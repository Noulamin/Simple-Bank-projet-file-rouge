import React, { useState } from 'react';
import { CssBaseline, TextField, Link, Grid, Box, Typography, Container, Snackbar } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import axios from 'axios'

export default function ForgetPassword() {

  const [IsLoading, setIsLoading] = useState(false)
  const [ShowAlert, setShowAlert] = useState(false)
  const [AlertMessage, setAlertMessage] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsLoading(true)
    const data = new FormData(event.currentTarget)

    if (data.get('email').length === 0) {
      setAlertMessage("Please enter email address.")
      setShowAlert(true)
      setIsLoading(false)
      return
    }

    const ForgetData = {
      email: data.get('email'),
    }

    try {
      const res = await axios.get('http://localhost:8080/api/auth/forgetpassword/' + ForgetData.email, { withCredentials: true });
      console.log(res.data)
      if (res.status === 200) {
        setAlertMessage(res.data)
        setShowAlert(true)
        setIsLoading(false)
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
        <Typography component="h1" variant="h5">
          Please enter your email to reset password
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '100%' }}>
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
          <LoadingButton
            loading={IsLoading}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Reset password
          </LoadingButton>
          <Grid container>
            <Grid item xs>
            </Grid>
            <Grid item>
              <Link href="login" variant="body2">
                {"have an account? Sign In"}
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