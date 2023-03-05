import { Fragment, useState } from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DescriptionIcon from '@mui/icons-material/Description';
import StyleIcon from '@mui/icons-material/Style';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import TuneIcon from '@mui/icons-material/Tune';
import ReceiptIcon from '@mui/icons-material/Receipt';
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie';

function ListItems() {

  const [active, setActive] = useState(window.location.pathname.substring(1))

  return (
    <Fragment>
      <ListItemButton onClick={() => { setActive('dashboard') }} component={Link} to="/dashboard"
        sx={{
          "&.Mui-selected": {
            backgroundColor: "#0D97FF"
          },
          ":hover": {
            backgroundColor: "#6CA9FA"
          }
        }}
        selected={active == 'dashboard' ? true : false}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
      <ListItemButton onClick={() => { setActive('Transactions') }} component={Link} to="/transactions"
        sx={{
          "&.Mui-selected": {
            backgroundColor: "#0D97FF"
          },
          ":hover": {
            backgroundColor: "#6CA9FA"
          }
        }}
        selected={active == 'Transactions' ? true : false}>
        <ListItemIcon>
          <ReceiptIcon />
        </ListItemIcon>
        <ListItemText primary="Transactions" />
      </ListItemButton>
      <ListItemButton onClick={() => { setActive('invoices') }} component={Link} to="/invoices"
        sx={{
          "&.Mui-selected": {
            backgroundColor: "#0D97FF"
          },
          ":hover": {
            backgroundColor: "#6CA9FA"
          }
        }}
        selected={active == 'invoices' ? true : false}>
        <ListItemIcon>
          <DescriptionIcon />
        </ListItemIcon>
        <ListItemText primary="Invoices" />
      </ListItemButton>
      <ListItemButton onClick={() => { setActive('cards') }} component={Link} to="/cards"
        sx={{
          "&.Mui-selected": {
            backgroundColor: "#0D97FF"
          },
          ":hover": {
            backgroundColor: "#6CA9FA"
          }
        }}
        selected={active == 'cards' ? true : false}>
        <ListItemIcon>
          <StyleIcon />
        </ListItemIcon>
        <ListItemText primary="Cards" />
      </ListItemButton>
      <ListItemButton onClick={() => { setActive('admin') }} component={Link} to="/admin"
        sx={{
          "&.Mui-selected": {
            backgroundColor: "#0D97FF"
          },
          ":hover": {
            backgroundColor: "#6CA9FA"
          }
        }}
        selected={active == 'admin' ? true : false}>
        <ListItemIcon>
          <AdminPanelSettingsIcon />
        </ListItemIcon>
        <ListItemText primary="Admin" />
      </ListItemButton>
      <ListItemButton onClick={() => { setActive('settings') }} component={Link} to="/settings"
        sx={{
          "&.Mui-selected": {
            backgroundColor: "#0D97FF"
          },
          ":hover": {
            backgroundColor: "#6CA9FA"
          }
        }}
        selected={active == 'settings' ? true : false}>
        <ListItemIcon>
          <TuneIcon />
        </ListItemIcon>
        <ListItemText primary="Settings" />
      </ListItemButton>
      <ListItemButton onClick={() => { Cookies.remove('token') }} to="/login"
        sx={{
          "&.Mui-selected": {
            backgroundColor: "#0D97FF"
          },
          ":hover": {
            backgroundColor: "#6CA9FA"
          }
        }}
        selected={active == 'login' ? true : false}>
        <ListItemIcon>
          <ExitToAppIcon />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItemButton>
    </Fragment>
  )
}

export default ListItems