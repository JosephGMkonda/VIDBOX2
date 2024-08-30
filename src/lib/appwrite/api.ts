import {ID} from 'appwrite'
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