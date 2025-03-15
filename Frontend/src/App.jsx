import React from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Login from './Pages/Login'
import SignUp from './Pages/SignUp'
import { AppContextProvider } from './Context/AppContext'
import { ToastContainer } from 'react-toastify'

const App = () => {
  return (
    <Router basename="/">
      <ToastContainer />
      <AppContextProvider>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/home' element={<Home />} />
        </Routes>
      </AppContextProvider>
    </Router>
  )
}

export default App