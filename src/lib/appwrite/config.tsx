import {Client, Account, Databases, Storage, Avatars} from "appwrite"

export const appwriteConfig = {
    projectID: import.meta.env.VITE_APPWRITE_PROJECT_ID,
    url: import.meta.env.VITE_APPWRITE_URL,
    media: import.meta.env.VITE_APPWRITE_MEDIA,
    database: import.meta.env.VITE_APPWRITE_DATABASE,
    saves: import.meta.env.VITE_APPWRITE_SAVES,
    users: import.meta.env.VITE_APPWRITE_USERS,
    posts: import.meta.env.VITE_APPWRITE_POSTS


    

}

export const client = new Client();

client.setProject(appwriteConfig.projectID);
client.setEndpoint(appwriteConfig.url);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const avatar = new Avatars(client);