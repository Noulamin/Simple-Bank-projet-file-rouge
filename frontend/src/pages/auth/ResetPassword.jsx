import React, { useState, useEffect } from 'react';
import { CssBaseline, TextField, Link, Grid, Box, Typography, Container, Snackbar } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import axios from 'axios'
import { useParams } from 'react-router-dom';

export default function ResetPassword() {

  const [isValid, setisValid] = useState(null)
  const [CanCheck, setCanCheck] = useState(null)
  const [IsLoading, setIsLoading] = useState(false)
  const [ShowAlert, setShowAlert] = useState(false)
  const [AlertMessage, setAlertMessage] = useState(false)

  const { token } = useParams();

  const verifyToken = async () => {

    axios.get('http://localhost:8080/api/auth/resetLinkTokenVerification/' + token, { withCredentials: true }).then((res) => {

      if (res.status === 200) {
        console.log(res.data)
        setisValid(true)
        setCanCheck(true)
      } else {
        setisValid(false)
        setCanCheck(true)
      }
    }).catch((error) => {
      console.log(error);
      setisValid(false)
      setCanCheck(true)
    })
  }

  useEffect(() => {
    if (token) {
      verifyToken()
    }
    else {
      setisValid(false)
      setCanCheck(true)
    }
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsLoading(true)
    const data = new FormData(event.currentTarget)

    if (data.get('password').length === 0 || data.get('confirmPassword').length === 0) {
      setAlertMessage("Please fill all fields.")
      setShowAlert(true)
      setIsLoading(false)
      return
    }

    if (data.get('password') !== data.get('confirmPassword')) {
      setAlertMessage("Password dose not match.")
      setShowAlert(true)
      setIsLoading(false)
      return
    }

    const ResetData = {
      password: data.get('password'),
      token: token
    }

    try {
      const res = await axios.post('http://localhost:8080/api/auth/resetpassword/', ResetData, { withCredentials: true });
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
    <>
      {CanCheck ?
        <>
          {!isValid ?
            <p>
              Link expired.
            </p>
            :
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
                  Please enter your new password to reset it
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '100%'  }}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="password"
                    label="New Password"
                    name="password"
                    type="password"
                    autoComplete="password"
                    autoFocus
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="confirmPassword"
                    label="Confirm New Password"
                    name="confirmPassword"
                    type="password"
                    autoComplete="password"
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
                      <Link href="../login" variant="body2">
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
          }
        </>
        :
        <>
        </>
      }
    </>
  )
}