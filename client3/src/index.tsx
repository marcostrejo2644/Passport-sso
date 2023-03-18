import React from 'react'
import ReactDOM from 'react-dom'
import { UserProvider } from './context/userProvider'
import App from './App'
import './index.css'

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
