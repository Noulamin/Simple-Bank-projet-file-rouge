import React, { useState, useEffect } from 'react'
import { useOutletContext } from "react-router-dom"
import VerifyToken from '../../components/VerifyToken'
import { CircularProgress, TextField, Box, Paper, Grid, Snackbar, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import '../../style/dashboard.css'
import axios from 'axios';
import Cookies from 'js-cookie';
import UserImg from '../../images/user.png'

function SettingsContent() {

  const [IsProgress, setIsProgress] = useOutletContext()
  const [UserData, setUserData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [AlertMessage, setAlertMessage] = useState('')
  const [ShowAlert, setShowAlert] = useState(false)
  
  const getUserData = async () => {

    VerifyToken().then(async (result) => {
      if (result) {
        setUserData(result)
        setIsProgress(false)
      }
    })
  }

  useEffect(() => {
    document.title = "Settings | Simple"
    setIsProgress(true)
    getUserData()
  }, []);

  const UpdateHandler = async (event) => {
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

    const UpdateData = {
      token: Cookies.get('token'),
      firstName: data.get('firstName'),
      lastName: data.get('lastName'),
      email: data.get('email'),
      password: data.get('password'),
    }

    try {
      const res = await axios.post('http://localhost:8080/api/auth/updateUserData', UpdateData, { withCredentials: true });
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
    <>
      <Grid item >
        <div style={{ fontSize: 26, marginTop: 40, marginBottom: 7 }}>
          Settings
        </div>
        {
          UserData ?
            (
              UserData != '' ?
                (
                  <Paper
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      height: 540,
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Box component="form" onSubmit={UpdateHandler}>
                      <div style={{ justifyContent: 'center', display: 'flex' }} >

                        <img src={UserImg} style={{ width: 80, marginBottom: 30 }} />
                      </div>
                      <Grid container item sx={{ my: 2 }}>
                        <TextField
                          id="outlined-helperText"
                          label="First Name"
                          name='firstName'
                          defaultValue={UserData.firstName}
                          size="small"
                          sx={{ mr: 1 }}
                        />
                        <TextField
                          id="outlined-helperText"
                          label="Last Name"
                          name='lastName'
                          defaultValue={UserData.lastName}
                          size="small"
                        />
                      </Grid>
                      <Grid container item sx={{ my: 2 }}>
                        <TextField
                          id="outlined-helperText"
                          label="Email address"
                          name='email'
                          defaultValue={UserData.email}
                          size="small"
                          sx={{ mr: 1 }}
                          fullWidth
                        />
                      </Grid>
                      <Grid container item sx={{ my: 2 }}>
                        <TextField
                          id="outlined-helperText"
                          label="Password"
                          name='password'
                          type='password'
                          size="small"
                          sx={{ mr: 1 }}
                        />
                        <TextField
                          id="outlined-helperText"
                          label="Confirm Password"
                          name='confirmPassword'
                          type='password'
                          size="small"
                          sx={{ mr: 1 }}
                        />
                      </Grid>
                      <LoadingButton
                        loading={isLoading}
                        type="submit"
                        variant="contained"
                        fullWidth
                      >
                        Update profile
                      </LoadingButton>
                    </Box>
                  </Paper>
                )
                :
                (
                  <Paper
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      height: 540,
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    No transactions yet.
                  </Paper>
                )
            )
            :
            (
              <Paper
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  height: 540,
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <CircularProgress size={33} />
              </Paper>
            )
        }
      </Grid>

      <Snackbar
        open={ShowAlert}
        autoHideDuration={4000}
        onClose={() => { setShowAlert(false) }}
      >
        <Alert variant="filled" sx={{ width: '100%' }} severity={'info'}>{AlertMessage}</Alert>
      </Snackbar>
    </>
  )
}

export default SettingsContent