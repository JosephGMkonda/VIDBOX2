import {ID} from 'appwrite'
import { Query } from 'appwrite'; 
import { account, databases, appwriteConfig, avatar} from './config';
import { INewUser } from "@/types";



export async function createUserAccount(user: INewUser){

    try{
        const newAccount = await account.create (
            ID.unique(),
            user.email,
            user.password,
            user.username
        )

        
        console.log('Created user:', newAccount);
        if (!newAccount) throw new Error('Account creation failed');
        const avatarURL = avatar.getInitials(user.username);

        const newUser = {
            accountId: newAccount.$id,
            email: newAccount.email,
            username: user.username,
            imageURL: avatarURL

        }

        console.log('Created newUser:', newUser);

        const savedUser = await saveUserToDB(newUser);
        console.log('Created savedUser:', savedUser);
        return savedUser;
        
            
        } catch(error){
        console.log(error);
        return error;
    }
    
}

export async function saveUserToDB(user: {
    accountId: string;
    email: string;
    imageURL: URL;
    username: string;



}){
    try{

        const newUser = await databases.createDocument(
            appwriteConfig.database,
            appwriteConfig.users,
            ID.unique(),
            user,
        )
        return newUser;

    }catch(error){
        console.log(error);
        return error
    }
}




export async function SignInAccount(user: {username: string; password: string}) {

    try {

        const userEmailquery = await databases.listDocuments(
            appwriteConfig.database,
            appwriteConfig.users,
            [Query.equal('username', user.username)]
        );

        if (userEmailquery.documents.length === 0) {
            throw new Error('No user found with that username');
        }
        
        const userEmail = userEmailquery.documents[0].email;
        

        const session = await account.createSession(userEmail, user.password);
        console.log('Login successful', session);

        return session;


        
    } catch (error) {
        
        console.log(error)
    }
    
}

export async function getCurrentAccount(){
    try {

        const currentAccount = await account.get();
        if(!currentAccount) throw Error;

        const currentUser = await databases.listDocuments(
            appwriteConfig.database,
            appwriteConfig.users,
            [Query.equal('accountId', currentAccount.$id)]


        )

        if(!currentUser) throw Error;
        
        return currentUser.documents[0];
    } catch (error) {
        console.log(error)
        
    }
}