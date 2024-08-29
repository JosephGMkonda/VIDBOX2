import {Client, Account, Databases, Storage, Avatars} from "appwrite"

export const appwriteConfig = {
    projectID: import.meta.env.INVITE_APP_APPWRITE_PROJECT_ID,
    url: import.meta.env.INVITE_APP_APPWRITE_URL,
    

}

export const client = new Client();

client.setProject(appwriteConfig.projectID);
client.setEndpoint(appwriteConfig.url);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const avatar = new Avatars(client);