import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

export const Home = (props: any) => {

  return (
    <Fragment>
      <h1>Testing SSO</h1>
      <p>This is a test for Loggin SSO with auth0</p>
      <button onClick={props.testAuth}>Loggin</button>
      <Link to="/login">Go Login</Link>
    </Fragment>
  )
}
