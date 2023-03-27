import React, { useState, useEffect } from 'react';
import { useOutletContext } from "react-router-dom";
import VerifyToken from '../../components/VerifyToken'
import { Button, Snackbar, Alert, Modal, Paper, Grid, Typography, Box, Autocomplete, CircularProgress, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import gifImg from '../../images/gif.gif'
import '../../style/dashboard.css'
import Cookies from 'js-cookie';
import axios from 'axios';

function DashboardContent() {

  const [IsProgress, setIsProgress] = useOutletContext()

  const [OpenSendModal, setOpenSendModal] = useState(false)
  const [OpenRequestModal, setOpenRequestModal] = useState(false)
  const [UserData, setUserData] = useState()
  const [UserTransactionsData, setUserTransactionsData] = useState()
  const [AllFriendsData, setAllFriendsData] = useState()
  const [AllFriends, setAllFriends] = useState([''])

  const [SendTargetValue, setSendTargetValue] = useState('')
  const [SendAmountError, setSendAmountError] = useState(false)
  const [SendTargetValueError, setSendTargetValueError] = useState(false)

  const [RequestTargetValue, setRequestTargetValue] = useState('')
  const [RequestAmountError, setRequestAmountError] = useState(false)
  const [RequestTargetValueError, setRequestTargetValueError] = useState(false)

  const [AlertType, setAlertType] = useState('info')
  const [AlertMessage, setAlertMessage] = useState('')
  const [ShowAlert, setShowAlert] = useState(false)

  const [SendIsLoading, setSendIsLoading] = useState(false)
  const [RequestIsLoading, setRequestIsLoading] = useState(false)

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

  const StyledTableCell = styled(TableCell)(({ amount, product }) => ({
    color: product === 'Amount requested' ? 'orange' : amount < 0 ? 'red' : 'green'
  }))

  const getUserData = async () => {
    VerifyToken().then(async (result) => {
      if (result) {
        await axios.get('http://localhost:8080/dashboard/' + Cookies.get('token')).then((res) => {
          if (res.status === 200) {
            setAllFriendsData(res.data)
          }
        }).catch((error) => {
          setIsProgress(false)
          console.log(error)
        })

        await axios.get('http://localhost:8080/transactions/' + Cookies.get('token')).then((res) => {
          if (res.status === 200) {
            setUserTransactionsData(res.data.reverse())
          }
          setTimeout(() => setIsProgress(false), 1000);
        }).catch((error) => {
          setIsProgress(false)
          console.log(error)
        })
        setUserData(result)
        setIsProgress(false)
      }
    })
  }

  useEffect(() => {
    document.title = "Dashboard | Simple"
    setIsProgress(true)
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

  const RequestAmountHandler = async (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    setRequestIsLoading(true)

    if (data.get('amount') == '') {
      setRequestTargetValueError(true)
      setRequestIsLoading(false)
    }
    else {
      setRequestTargetValueError(false)
    }

    if (!RequestTargetValue) {
      setRequestAmountError(true)
      setRequestIsLoading(false)
    }
    else {
      if (!AllFriends.includes(RequestTargetValue)) {
        setAlertType('error')
        setAlertMessage("Wrong target.")
        setShowAlert(true)
        setRequestAmountError(true)
        setRequestIsLoading(false)
        return
      }
      else {
        setRequestAmountError(false)
      }
    }

    if (data.get('amount') == '' || !RequestTargetValue) {
      setAlertType('info')
      setAlertMessage("Please fill all fields.")
      setRequestIsLoading(false)
      setShowAlert(true)
      return
    }

    if (data.get('amount') == '0') {
      setAlertType('error')
      setAlertMessage("You cannot Request 0 amount.")
      setRequestIsLoading(false)
      setShowAlert(true)
      return
    }

    const RequestData = {
      token: Cookies.get('token'),
      target: AllFriendsData.find(user => user.firstName + ' ' + user.lastName === RequestTargetValue)._id,
      amount: data.get('amount'),
    }

    try {
      const res = await axios.post('http://localhost:8080/dashboard/RequestAmount', RequestData, { withCredentials: true });
      if (res.status === 200) {
        setIsProgress(true)
        setAlertType('success')
        setAlertMessage(res.data)
        setShowAlert(true)
        setRequestIsLoading(false)
        setOpenRequestModal(false)
        getUserData()
      }
      else {
        setAlertType('error')
        setAlertMessage(res.data)
        setShowAlert(true)
        setRequestIsLoading(false)
      }
    } catch (error) {
      setAlertType('error')
      setAlertMessage(error)
      setShowAlert(true)
      setRequestIsLoading(false)
    }
  }

  return (
    <>
      <Grid container spacing={20}>
        <Grid item xs={12} md={4} lg={6}>
          <div style={{ fontSize: 26, marginTop: 9 }}>
            Welcome Back, {UserData ? UserData.firstName : 'Mr ...'}
          </div>
          <div className="img_container">
            <img className="gifImg" src={gifImg} />
            <p className="your">Your balance</p>
            <p className="balance"><sup>$</sup>{UserData ? UserData.balance : '...'}</p>
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
              setSendAmountError(false)
              setSendTargetValueError(false)
            }}
          >
            Send
          </Button>
          <Button
            sx={{ px: 3, mx: 1.3 }}
            variant="contained"
            onClick={() => {
              let Data = []
              for (let friend in AllFriendsData) {
                if (UserData._id != AllFriendsData[friend]._id) {
                  Data.push(AllFriendsData[friend].firstName + ' ' + AllFriendsData[friend].lastName)
                }
              }
              setAllFriends(Data)
              setOpenRequestModal(true)
              setRequestAmountError(false)
              setRequestTargetValueError(false)
            }}
          >
            Request
          </Button>

          <div style={{ fontSize: 18, marginTop: 8, marginBottom: 8 }}>
            Recent activities
          </div>
          {
            UserTransactionsData ?
              (
                UserTransactionsData != '' ?
                  (
                    <TableContainer sx={{ height: 355 }} component={Paper}>
                      <Table aria-label="customized table">
                        <TableBody>
                          {UserTransactionsData.map((row) => (
                            <TableRow key={row._id}>
                              <TableCell component="th" scope="row">
                                {row.target}
                              </TableCell>
                              <StyledTableCell align="center" amount={row.amount} product={row.product}>
                                {row.amount}
                              </StyledTableCell>
                              <TableCell align="right">
                                {row.date}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  )
                  :
                  (
                    <Paper
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        height: 355,
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
                    height: 355,
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <CircularProgress size={33} />
                </Paper>
              )
          }
        </Grid>
        <Grid item xs={12} md={4} lg={6}>
          <div style={{ fontSize: 18, marginTop: 55, marginBottom: 8 }}>
            Send again
          </div>
          {
            AllFriendsData ?
              (
                AllFriendsData != '' ?
                  (
                    <TableContainer sx={{ height: 205 }} component={Paper}>
                      <Table aria-label="customized table">
                        <TableBody>
                          {AllFriendsData.map((row) => (
                            <TableRow key={row._id}>
                              <TableCell align="center" component="th" scope="row">
                                {row.firstName + ' ' + row.lastName}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  )
                  :
                  (
                    <Paper
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      height: 205,
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    No friends yet.
                  </Paper>
                  )
              )
              :
              (
                <Paper
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: 205,
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <CircularProgress size={33} />
                </Paper>
              )
          }
          <div style={{ fontSize: 18, marginTop: 8, marginBottom: 8 }}>
            Bank and cards
          </div>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 205,
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            Not available yet,
            Check back soon.
          </Paper>
          <Button variant="contained" sx={{ my: 2 }} onClick={() => { }}>
            Link a Bank or Card
          </Button>
        </Grid>

        <Modal
          open={OpenSendModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box component="form" onSubmit={SendAmountHandler} sx={style} >
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Send Amount
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
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

        <Modal
          open={OpenRequestModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box component="form" onSubmit={RequestAmountHandler} sx={style} >
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Request Amount
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            </Typography>

            <Autocomplete
              sx={{ my: 1 }}
              fullWidth
              size='small'
              onChange={(event, newValue) => {
                setRequestTargetValue(newValue);
              }}
              onInputChange={(event, newInputValue) => {
                setRequestTargetValue(newInputValue);
              }}
              id="controllable-states-demo"
              options={AllFriends}
              name='Requesttarget'

              renderInput={(params) => <TextField {...params} error={RequestAmountError} label="Request from" />}
            />
            <TextField sx={{ my: 1 }} error={RequestTargetValueError} type='number' id="outlined-basic" label="Amount" name='amount' variant="outlined" fullWidth size='small' />
            <LoadingButton
              loading={RequestIsLoading}
              type="submit"
              variant="contained"
              sx={{ my: 1, px: 3.1 }}
            >
              Request
            </LoadingButton>
            <Button sx={{ my: 1, mx: 2 }} variant="contained" onClick={() => { setOpenRequestModal(false); setRequestIsLoading(false) }}>Cancel</Button>
          </Box>
        </Modal>
      </Grid>

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