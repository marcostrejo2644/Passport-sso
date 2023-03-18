import React, { useState, createContext, ReactNode } from 'react'

export type IUser = {
  isAuth: boolean
  user: {
    id: string
    username: string
    email: string
    profilePicture: string
  }
}

type IUserContext = [IUser, React.Dispatch<React.SetStateAction<IUser>>]

const userDefault: IUser = {
  isAuth: false,
  user: {
    id: '',
    username: '',
    email: '',
    profilePicture: '',
  },
}
export const UserContext = createContext<IUserContext>([
  userDefault,
  () => null,
])

export const UserProvider: React.FC<ReactNode> = ({ children }) => {
  const [user, setUser] = useState<IUser>(userDefault)
  return (
    <UserContext.Provider value={[user, setUser]}>
      {children}
    </UserContext.Provider>
  )
}
