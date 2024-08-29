import {Client, Account, Databases, Storage, Avatars} from "appwrite"

export const appwriteConfig = {
    projectID: '66c0cb73002023859483',
    url: 'https://cloud.appwrite.io/v1',
    

}

export const client = new Client();

client.setProject(appwriteConfig.projectID);
client.setEndpoint(appwriteConfig.url);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const avatar = new Avatars(client);