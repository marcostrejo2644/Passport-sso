import React, { useEffect, useContext } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AxiosResponse } from 'axios'

import Home from 'pages/Home'
import Login from 'pages/Login'
import LoginSuccess from 'pages/LoginSuccess'
import Navbar from 'components/Navbar'
import { IUser, UserContext } from 'context/userProvider'
import API from 'utils/API'

const App: React.FC = () => {
  const [user, setUser] = useContext(UserContext)

  const testAuth = async () => {
    try {
      const response: AxiosResponse = await API.isAuthAndGetUser()
      if (response.data && response.data.user) {
        const userForContext: IUser = {
          isAuth: true,
          user: {
            id: response.data.user._id,
            email: response.data.user.email,
            username: response.data.user.username,
            profilePicture: response.data.user.profilePicture,
          },
        }
        setUser(userForContext)
      }
    } catch (error) {
      console.log('Error Login Callback', error)
    }
  }

  useEffect(() => {
    testAuth()
  }, [user])

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
    </>
  )
}

export default App
