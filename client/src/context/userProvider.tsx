import React, { useState, createContext, ReactNode } from 'react'

type IUser = {
  isAuth: boolean
  user: {
    id: string
    username: string
    profilePicture: string
    email: string
  }
}

type IUserContext = [IUser, React.Dispatch<React.SetStateAction<IUser>>]

const userDefault: IUser = {
  isAuth: false,
  user: {
    id: '',
    email: '',
    username: '',
    profilePicture: '',
  },
}

export const UserContext = createContext<IUserContext>([
  userDefault,
  () => null,
])

export const UserProvider: React.FC<ReactNode> = ({ children }) => {
  const [user, setUser] = useState(userDefault)
  console.log('userProvider', user)
  return (
    <UserContext.Provider value={[user, setUser]}>
      {children}
    </UserContext.Provider>
  )
}
