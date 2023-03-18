import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Login = (props: any) => {
  const fetchAuthUser = async () => {
    /* try { */
    /*   const response: any =  */
    /*   console.log('response', response) */
    /*   if (response && response.data) { */
    /*     console.log('User', response.data) */
    /*     props.setUser(response.data) */
    /*   } */
    /* } catch (error) { */
    /*   console.log('error fetchAuthUser', error) */
    /* } */
  }


  const logout = () => {
    window.open(
      `http://localhost:8000/api/v1/logout?returnTo=${window.location.origin}`
    )
  }

  const loginCallback = async () => {
    try {
      const response: any = await axios.get(
        'http://localhost:8000/api/v1/callback',
        {
          withCredentials: true,
          data: {
            user: props.user,
          },
        }
      )
      console.log('Response login callback', response)
    } catch (error) {
      console.log('Error Login Callback', error)
    }
  }

  const testLogin = async () => {
    try {
      const response = await axios.get(
        'http://localhost:8000/api/v1/testLogin',
        {
          data: {
            user: props.user,
          },
          withCredentials: true,
        }
      )
      console.log('response testLogin', response)
    } catch (err) {
      console.log('ERROR test Login', err)
    }
  }

  return (
    <>
      <button onClick={loginCallback}>Log in</button>
      <button onClick={logout}>Logout</button>
      <button onClick={testLogin}>TESTING</button>
      <button onClick={() => console.log('props User: ', props.user)}>
        view User
      </button>
      <Link to="/">Go Home</Link>
    </>
  )
}

export default Login
