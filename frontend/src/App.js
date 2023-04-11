import { BrowserRouter, Routes, Route } from 'react-router-dom'
import React from 'react'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Dashboard from './pages/auth/Dashboard'
import Transactions from './pages/auth/Transactions'
import Invoices from './pages/auth/Invoices'
import Cards from './pages/auth/Cards'
import Admin from './pages/auth/Admin'
import Settings from './pages/auth/Settings'
import NotFound from './pages/NotFound'
import PrivateRoutes from './components/PrivateRoutes'
import PublicRoutes from './components/PublicRoutes'
import ForgetPassword from './pages/auth/ForgetPassword'
import ResetPassword from './pages/auth/ResetPassword'
import LayoutAdmin from './components/LayoutAdmin'
import HomePage from './pages/HomePage'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route element={<PublicRoutes />}>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/forgetpassword' element={<ForgetPassword />} />
          <Route path='/resetpassword/:token' element={<ResetPassword />} />
        </Route>
        <Route element={<PrivateRoutes />}>
          <Route element={<LayoutAdmin />}>
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/transactions' element={<Transactions />} />
            <Route path='/invoices' element={<Invoices />} />
            <Route path='/cards' element={<Cards />} />
            <Route path='/admin' element={<Admin />} />
            <Route path='/settings' element={<Settings />} />
          </Route>
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;