import React, { useEffect, useContext } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Navbar from 'components/Navbar'
import Home from 'pages/Home'
import Login from 'pages/Login'
import LoginSuccess from 'pages/LoginSuccess'
import { UserContext } from 'context/userProvider'
import API from 'utils/API'

const App: React.FC = () => {
  const [user, setUser] = useContext(UserContext)

  const testAuth = async () => {
    try {
      const response: any = await API.isAuthAndGetUser()
      console.log('response', response)
      if (response.data && response.data.user) setUser(response.data.user)
    } catch (error) {
      console.log('Error Login Callback', error)
    }
  }
  const logout = () => {
    window.open(
      `http://localhost:8000/api/v1/logout?returnTo=${window.location.origin}`
    )
  }

  useEffect(() => {
    testAuth()
  }, [])

  return (
    <>
      <Navbar user={user} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={<Login setUser={setUser} user={user} />}
          />
          <Route path="/login/success" element={<LoginSuccess />} />
        </Routes>
      </BrowserRouter>
      <button style={{ padding: '4rem' }} onClick={logout}>
        Logout
      </button>
    </>
  )
}

export default App
