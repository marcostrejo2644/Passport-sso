import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import axios from 'axios'
import { Home } from './pages/Home'
import Login from './pages/Login'
import LoginSuccess from './pages/LoginSuccess'

const App: React.FC = () => {
  const [user, setUser] = useState({})

  const testAuth = async () => {
    try {
      const response: any = await axios.get(
        'http://localhost:8000/api/v1/testLogin',
        {
          data: {
            user: user,
          },
          withCredentials: true,
        }
      )
      console.log('Response login callback', response)
    } catch (error) {
      console.log('Error Login Callback', error)
    }
  }

  useEffect(() => {
    testAuth()
    console.log('user from state', user)
  }, [user])

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home testAuth={testAuth} />} />
          <Route
            path="/login"
            element={<Login setUser={setUser} user={user} />}
          />
          <Route path="/login/success" element={<LoginSuccess />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
// <Route path="/login">
//   <button>Login</button>
// </Route>
// <Route path="/login/error">
//   Login error. Please try again later!
// </Route>

export default App
