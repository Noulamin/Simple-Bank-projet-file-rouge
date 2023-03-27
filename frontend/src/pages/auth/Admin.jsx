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

const options = ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5', 'Option 6'];

function AdminContent() {

  const [IsProgress, setIsProgress] = useOutletContext()

  const [value, setValue] = React.useState(options[0])
  const [inputValue, setInputValue] = React.useState('')
  const [UserTransactionsData, setUserTransactionsData] = useState()

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
    document.title = "Admin | Simple"
    setIsProgress(true)
    getUserData()
  }, []);

  return (
    <>
      <Grid item >
        <div style={{ fontSize: 26, marginTop: 40, marginBottom: 7 }}>
          Admin
        </div>
        {
          UserTransactionsData ?
            (
              UserTransactionsData != '' ?
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
                    Not available yet, Check back soon.
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
    </>
  )
}

export default AdminContent