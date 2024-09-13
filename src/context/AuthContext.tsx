
import React, {createContext, useContext, useEffect, useState} from 'react'
import {IContextType, IUser} from '@/types'
import { getCurrentAccount } from '@/lib/appwrite/api';
import { useNavigate } from 'react-router-dom';

export const INITIAL_USER = {
    id: '',
    username: '',
    name: '',
    email: '',
    imageUrl: '',
    bio: ''

};

const INITIAL_STATE = {
    user: INITIAL_USER,
    isLoading: false,
    isAuthenticated: false,
    setUser: () => {},
    setIsAuthenticated: () => {},
    checkAuthUser: async () => false as boolean,
}

const AuthContext = createContext<IContextType>(INITIAL_STATE);


const navigate = useNavigate();

const AuthProvider = ({children}: {children: React.ReactNode}) => {

    const [user, setUser] = useState<IUser>(INITIAL_USER);
    const [isLoading. setIsLoading] = useState(false)
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const checkAuthUser = async () => {
        try {

            const currentAccount = await getCurrentAccount();
            if(currentAccount){
                setUser({
                    id:currentAccount.$id,
                    username: currentAccount.username,
                    email: currentAccount.email,
                    image: currentAccount.imageUrl,
                    bio : currentAccount.bio
                })

                setIsAuthenticated(true);
                return true;
            }

            return false;
               
         
        } catch (error) {
            console.log(error)
            return false;
            
        }finally{
            setIsLoading(false);
        }
    };

    useEffect (() => {
        if(
            localStorage.getItem('cookieFallback') === '[]' || 
            localStorage.getItem('cookieFallback') === null



        ) navigate ('/sign-in')

        checkAuthUser();

     }, []);





    const value = {
        user,
        setUser,
        isLoading,
        isAuthenticated,
        setIsAuthenticated,
        checkAuthUser,

    }


    return (

        <AuthContext.Provider value={value}>
            {children}

        </AuthContext.Provider>


    )
}