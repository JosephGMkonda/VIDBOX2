import {
    useQuery,
    useMutation,
    useQueryClient,
    useInfiniteQuery

}from '@tanstack/react-query'
import { createUserAccount, SignInAccount } from '../appwrite/api'
import { INewUser } from '@/types'


export const useCreateUserAccountMutation = () => {
    return useMutation ({
        mutationfn: (user: INewUser) => createUserAccount(user)
    })
}


export const useSignInAccount= () => {
    return useMutation ({
        mutationfn: (user: {
            username: string;
            password: string;
        }) => SignInAccount(user)
    })
}