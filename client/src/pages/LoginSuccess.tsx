import React, { useEffect } from 'react'

const LoginSuccess = () => {
  useEffect(() => {
    setTimeout(() => {
      window.close()
    }, 2000)
  }, [])

  return <>Thanks for Login</>
}

export default LoginSuccess
