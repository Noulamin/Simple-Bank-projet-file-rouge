import React, { useState, useEffect } from 'react';
import VerifyToken from '../../components/VerifyToken'
import { Button, Modal, Paper, Grid, Typography, Box, Autocomplete, TextField } from '@mui/material';
import gifImg from '../../images/gif.gif'
import '../../style/dashboard.css'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
]

const options = ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5', 'Option 6'];

function TransactionsContent() {

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

  return (
    <>
      <Grid item fullWidth>
        <div style={{ fontSize: 26, marginTop: 40, marginBottom: 7 }}>
          Transactions
        </div>
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Dessert (100g serving)</StyledTableCell>
            <StyledTableCell align="right">Calories</StyledTableCell>
            <StyledTableCell align="right">Fat&nbsp;(g)</StyledTableCell>
            <StyledTableCell align="right">Carbs&nbsp;(g)</StyledTableCell>
            <StyledTableCell align="right">Protein&nbsp;(g)</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="right">{row.calories}</StyledTableCell>
              <StyledTableCell align="right">{row.fat}</StyledTableCell>
              <StyledTableCell align="right">{row.carbs}</StyledTableCell>
              <StyledTableCell align="right">{row.protein}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
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
    </>
  )
}

export default TransactionsContent