import React, { useState, useEffect } from 'react'
import { useOutletContext } from "react-router-dom"
import VerifyToken from '../../components/VerifyToken'
import { CircularProgress, Typography, Paper, Grid } from '@mui/material';
import '../../style/dashboard.css'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import Cookies from 'js-cookie';
import axios from 'axios';


const StyledTableHead = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableCell = styled(TableCell)(({ amount, product }) => ({
  color: product === 'Amount requested' ? 'orange' : amount < 0 ? 'red' : 'green'
}));

function TransactionsContent() {

  const [IsProgress, setIsProgress] = useOutletContext()

  const [UserTransactionsData, setUserTransactionsData] = useState()

  const getUserData = async () => {

    VerifyToken().then(async (result) => {
      if (result) {
        await axios.get('http://localhost:8080/transactions/' + Cookies.get('token')).then((res) => {
          if (res.status === 200) {
            setUserTransactionsData(res.data.reverse())
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
    document.title = "Transactions | Simple"
    setIsProgress(true)
    getUserData()
  }, []);

  return (
    <>
      <Grid item >
        <div style={{ fontSize: 26, marginTop: 40, marginBottom: 7 }}>
          Transactions
        </div>
        {
          UserTransactionsData ?
            (
              UserTransactionsData != '' ?
                (
                  <TableContainer sx={{ height: 540 }} component={Paper}>
                    <Table aria-label="customized table">
                      <TableHead>
                        <TableRow>
                          <StyledTableHead>Target</StyledTableHead>
                          <StyledTableHead align="center">Product</StyledTableHead>
                          <StyledTableHead align="center">Amount paid</StyledTableHead>
                          <StyledTableHead align="center">Operation date</StyledTableHead>
                          <StyledTableHead align="center">Operation state</StyledTableHead>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {UserTransactionsData.map((row) => (
                          <TableRow key={row._id}>
                            <TableCell component="th" scope="row">
                              {row.target}
                            </TableCell>
                            <TableCell align="center">{row.product}</TableCell>
                            <StyledTableCell align="center" amount={row.amount} product={row.product}>{row.amount}</StyledTableCell>
                            <TableCell align="center">{row.date}</TableCell>
                            <TableCell align="center"> <Typography variant="inherit">{row.product === 'Amount requested' ? 'Pending' : 'Completed'}</Typography> </TableCell>
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
    </>
  )
}

export default TransactionsContent