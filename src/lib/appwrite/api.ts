import {ID} from 'appwrite'
import { Query } from 'appwrite'; 
import { account, databases, appwriteConfig } from './config';
import { INewUser } from "@/types";
import { account, appwriteConfig, avatar, databases } from './config';


export async function createUserAccount(user: INewUser){

    try{
        const newAccount = await account.create (
            ID.unique(),
            user.email,
            user.password,
            user.username
        )

        return newAccount

        if(!newAccount) throw error;
        const avatarURL = avatar.getInitials(user.username);

        const user = {
            accountId: newAccount.$id,
            
            email: newAccount.email,
            username: newAccount.username,
            imageUrl: avatarURL

        }

        const newUser = await saveUserToDB(user);
        
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
        




    } catch(error){
        console.log(error);
        return error;
    }
    
}

export async function saveUserToDB(user: {
    accountId: string;
    email: string;
    imageUrl: URL;
    username: string;

})




export async function SignInAccount(user: {username: string; password: string}) {

    try {

        const userEmailquery = await databases.listDocuments(
            appwriteConfig.database,
            appwriteConfig.users,
            [Query.equal('username', username)]
        );

        if(userEmailquery.documents.length === 0){
            throw new Error('No user found with that username');
        }

        const userEmail = userEmailQuery.documents[0].email;

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