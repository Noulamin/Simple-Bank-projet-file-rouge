import React, { useState, useEffect } from 'react';
import VerifyToken from '../../components/VerifyToken'
import { Button, Modal, Paper, Grid, Typography, Box, Autocomplete, TextField } from '@mui/material';
import gifImg from '../../images/gif.gif'
import '../../style/dashboard.css'


const options = ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5', 'Option 6', 'lolll 2', 'lolll 3', 'lolll 4', 'lolll 5', 'lolll 6', 'ahmed'];

function DashboardContent() {

  const [OpenSendModal, setOpenSendModal] = useState(false)
  const [OpenRequestModal, setOpenRequestModal] = useState(false)
  const [UserData, setUserData] = useState()

  const [value, setValue] = React.useState(options[0])
  const [inputValue, setInputValue] = React.useState('')

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

  useEffect(() => {
    VerifyToken().then(async (result) => {
      if (result) {
        setUserData(result)
        // setTimeout(() => setIsProgress(false), 1000);
      }
    })
  }, []);

  const check = () => {
    console.log(UserData)
  }

  return (
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
          onClick={() => { setOpenSendModal(true) }}
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
        <Box sx={style}>
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
            // value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue);
            }}
            id="controllable-states-demo"
            options={options}
            renderInput={(params) => <TextField {...params} label="Send to" />}
          />

          <TextField sx={{ my: 1 }} type='number' id="outlined-basic" label="Amount" variant="outlined" fullWidth size='small' />
          <Button sx={{ my: 1 }} variant="contained">Send</Button>
          <Button sx={{ my: 1, mx: 2 }} variant="contained" onClick={() => { setOpenSendModal(false) }}>Cancel</Button>
        </Box>
      </Modal>

      <Modal
        open={OpenRequestModal}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Request Amount
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {/* Duis mollis, est non commodo luctus, nisi erat porttitor ligula. */}
          </Typography>

          <Autocomplete
            sx={{ my: 1 }}
            fullWidth
            size='small'
            // value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue);
            }}
            id="controllable-states-demo"
            options={options}
            renderInput={(params) => <TextField {...params} label="Request from" />}
          />
          <TextField sx={{ my: 1 }} type='number' id="outlined-basic" label="Amount" variant="outlined" fullWidth size='small' />
          <Button sx={{ my: 1 }} variant="contained">Request</Button>
          <Button sx={{ my: 1, mx: 2 }} variant="contained" onClick={() => { setOpenRequestModal(false) }}>Cancel</Button>
        </Box>
      </Modal>
    </Grid>
  )
}

export default DashboardContent