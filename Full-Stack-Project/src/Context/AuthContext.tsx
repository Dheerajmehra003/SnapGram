import { getCurrentUser } from '@/lib/appwrite/api';
import { IContextType } from '@/Types';
import React, { useState } from 'react'
import { createContext } from 'vm';

export const INITIAL_USER = {
    id: '',
    name: '',
    username: '',
    email: '',
    imageUrl: '',
    bio: '',
};

const INITIAL_STATE = {
    user: INITIAL_USER,
    isLoading: false,
    isAuthenticated: false,
    setUser: () => {},
    setIsAuthenticated: () => {},
    checkAuthUser: () => false as boolean,
}

const AuthContext = createContext<IContextType>(INITIAL_STATE)

const AuthProvider = ({children}: {children: React.ReactNode }) => {
    const [user, setUser] = useState(INITIAL_STATE)
    const [isLoading, setIsLoading] = useState(false)
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    const checkAuthUser = async() => {
        try {
            const currentAccount = await getCurrentUser()

            
        } catch (error) {
            console.log(error)
            return false;

        } finally {
            setIsLoading(false)
        }
    }

     const value={
      user,
      setUser,
      setIsAuthenticated,
      setIsLoading,
      isLoading,
      isAuthenticated,
      checkAuthUser,
    }

  return (
     <AuthContext.Provider value={value}>
       {children}
     </AuthContext.Provider>
  )
}

export default AuthProvider;