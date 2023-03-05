import React, { useState, useEffect } from 'react';
import { useOutletContext } from "react-router-dom";
import VerifyToken from '../../components/VerifyToken'
import { Button, Snackbar, Alert, Modal, Paper, Grid, Typography, Box, Autocomplete, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import gifImg from '../../images/gif.gif'
import '../../style/dashboard.css'
import Cookies from 'js-cookie';
import axios from 'axios';


const options = ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5', 'Option 6', 'lolll 2', 'lolll 3', 'lolll 4', 'lolll 5', 'lolll 6', 'ahmed'];

function DashboardContent() {

  const [IsProgress, setIsProgress] = useOutletContext()

  const check = () => {
    setIsProgress(true)
  }

  const [OpenSendModal, setOpenSendModal] = useState(false)
  const [OpenRequestModal, setOpenRequestModal] = useState(false)
  const [UserData, setUserData] = useState()
  const [AllFriendsData, setAllFriendsData] = useState()
  const [AllFriends, setAllFriends] = useState([''])
  const [testData, settestData] = useState()

  const [SendTargetValue, setSendTargetValue] = React.useState('')
  const [SendAmountError, setSendAmountError] = React.useState(false)
  const [SendTargetValueError, setSendTargetValueError] = React.useState(false)

  const [AlertType, setAlertType] = useState('info')
  const [AlertMessage, setAlertMessage] = useState('')
  const [ShowAlert, setShowAlert] = useState(false)

  const [SendIsLoading, setSendIsLoading] = useState(false)

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: 1.5
  }

  const getUserData = async () => {
    VerifyToken().then(async (result) => {
      if (result) {
        setUserData(result)
        await axios.get('http://localhost:8080/dashboard/').then((res) => {
          if (res.status === 200) {
            setAllFriendsData(res.data)
          }
          setTimeout(() => setIsProgress(false), 1000);
        }).catch((error) => {
          setIsProgress(false)
          console.log(error)
        })
      }
    })
  }

  useEffect(() => {
    getUserData()
  }, []);


  const SendAmountHandler = async (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    setSendIsLoading(true)

    if (data.get('amount') == '') {
      setSendTargetValueError(true)
      setSendIsLoading(false)
    }
    else {
      setSendTargetValueError(false)
    }

    if (!SendTargetValue) {
      setSendAmountError(true)
      setSendIsLoading(false)
    }
    else {
      if (!AllFriends.includes(SendTargetValue)) {
        setAlertType('error')
        setAlertMessage("Wrong target.")
        setShowAlert(true)
        setSendAmountError(true)
        setSendIsLoading(false)
        return
      }
      else {
        setSendAmountError(false)
      }
    }

    if (data.get('amount') == '' || !SendTargetValue) {
      setAlertType('info')
      setAlertMessage("Please fill all fields.")
      setSendIsLoading(false)
      setShowAlert(true)
      return
    }

    if (data.get('amount') == '0') {
      setAlertType('error')
      setAlertMessage("You cannot send 0 amount.")
      setSendIsLoading(false)
      setShowAlert(true)
      return
    }

    if (UserData.balance < data.get('amount')) {
      setAlertType('error')
      setAlertMessage("insufficient balance.")
      setSendIsLoading(false)
      setShowAlert(true)
      return
    }

    console.log(SendTargetValue)
    console.log(data.get('amount'))

    const SendData = {
      token: Cookies.get('token'),
      target: AllFriendsData.find(user => user.firstName + ' ' + user.lastName === SendTargetValue)._id,
      amount: data.get('amount'),
    }

    try {
      const res = await axios.post('http://localhost:8080/dashboard/SendAmount', SendData, { withCredentials: true });
      if (res.status === 200) {
        setIsProgress(true)
        setAlertType('success')
        setAlertMessage(res.data)
        setShowAlert(true)
        setSendIsLoading(false)
        setOpenSendModal(false)
        getUserData()
      }
      else {
        setAlertType('error')
        setAlertMessage(res.data)
        setShowAlert(true)
        setSendIsLoading(false)
      }
    } catch (error) {
      setAlertType('error')
      setAlertMessage(error)
      setShowAlert(true)
      setSendIsLoading(false)
    }
  }

  return (
    <>
      <Grid container spacing={20}>
        <Grid item xs={12} md={4} lg={6}>
          <div style={{ fontSize: 26, marginTop: 9 }}>
            Welcome Back, {UserData && UserData.firstName}
          </div>
          <div className="img_container">
            <img className="gifImg" src={gifImg} />
            <p className="your">Your balance</p>
            <p className="balance"><sup>$</sup>{UserData && UserData.balance}</p>
          </div>

          <Button
            sx={{ px: 4.6 }}
            variant="contained"
            className='sendButton'
            onClick={() => {
              let Data = []
              for (let friend in AllFriendsData) {
                if (UserData._id != AllFriendsData[friend]._id) {
                  Data.push(AllFriendsData[friend].firstName + ' ' + AllFriendsData[friend].lastName)
                }
              }
              setAllFriends(Data)
              setOpenSendModal(true)
            }}
          >
            Send
          </Button>
          <Button
            sx={{ px: 3, mx: 1.3 }}
            variant="contained"
            onClick={() => { setOpenRequestModal(true) }}
          >
            Request
          </Button>

          <div style={{ fontSize: 18, marginTop: 8, marginBottom: 8 }}>
            Recent activities
          </div>

          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 355,
            }}
          >
          </Paper>
        </Grid>
        <Grid item xs={12} md={4} lg={6}>
          <div style={{ fontSize: 18, marginTop: 55, marginBottom: 8 }}>
            Send again
          </div>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 205,
            }}
          >

          </Paper>
          <div style={{ fontSize: 18, marginTop: 8, marginBottom: 8 }}>
            Bank and cards
          </div>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 205,
            }}
          >

          </Paper>
          <Button variant="contained" sx={{ my: 2 }} onClick={() => { check() }}>
            Link a Bank or Card
          </Button>
        </Grid>



        <Modal
          open={OpenSendModal}
          // onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box component="form" onSubmit={SendAmountHandler} sx={style} >
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Send Amount
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              {/* Duis mollis, est non commodo luctus, nisi erat porttitor ligula. */}
            </Typography>

            <Autocomplete
              sx={{ my: 1 }}
              fullWidth
              size='small'
              onChange={(event, newValue) => {
                setSendTargetValue(newValue);
              }}
              onInputChange={(event, newInputValue) => {
                setSendTargetValue(newInputValue);
              }}
              id="controllable-states-demo"
              options={AllFriends}
              name='Sendtarget'

              renderInput={(params) => <TextField {...params} error={SendAmountError} label="Send to" />}
            />
            <TextField sx={{ my: 1 }} error={SendTargetValueError} type='number' id="outlined-basic" label="Amount" name='amount' variant="outlined" fullWidth size='small' />
            {/* <Button sx={{ my: 1 }} type='submit' variant="contained">Send</Button> */}
            <LoadingButton
              loading={SendIsLoading}
              type="submit"
              variant="contained"
              sx={{ my: 1, px: 3.1 }}
            >
              Send
            </LoadingButton>
            <Button sx={{ my: 1, mx: 2 }} variant="contained" onClick={() => { setOpenSendModal(false); setSendIsLoading(false) }}>Cancel</Button>
          </Box>
        </Modal>
      </Grid>

      {/* <Snackbar
        open={ShowAlert}
        autoHideDuration={4000}
        onClose={() => { setShowAlert(false) }}
        message={AlertMessage}
      /> */}

      <Snackbar
        open={ShowAlert}
        autoHideDuration={4000}
        onClose={() => { setShowAlert(false) }}
      >
        <Alert variant="filled" sx={{ width: '100%' }} severity={AlertType}>{AlertMessage}</Alert>
      </Snackbar>
    </>
  )
}

export default DashboardContent