import { INewUser } from "@/Types";
import { account, appwriteConfig, avatars, databases } from "./config";
import { ID} from 'appwrite'
import { error } from "console";

export async function createUserAccount(user: INewUser) {
try {
    const newAccount = await account.create(
        ID.unique(),
        user.email,
        user.password,
        user.name
    )

    if(!newAccount) throw Error

    const avatarUrl = avatars.getInitials(user.name);

    const newUser = await saveUserToDB({
        accountId: newAccount.$id,
        name: newAccount.name,
        email:newAccount.email,
        username: user.username,
        imageUrl: avatarUrl,
    })

    return newUser
} catch (error) {
    console.log(error)
    return error;  
}
    
}

export async function saveUserToDB(user:{
    accountId: string;
    email: string;
    name: string;
    imageUrl: string;
    username?: string;
}) {
    try {
        const newUser = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            user,

        )
        return newUser
    } catch (error) {
       console.log(error) 
    }
}

export async function signInAccount(user: {email: string; password: string}) {

    try {
        const session = await account.createSession(user.email, user.password)
        
        return session
    } catch (error) {
        console.log(error)
    }
}

export async function getCurrentUser(user: ) {
    try {
        const currenAccount = await account.get()

        if(!currenAccount) throw error

        const currentUser = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal('accountId', currenAccount.$id)]
        )

        if(!currentUser) throw error

        return currentUser;

    } catch (error) {
        
    }
}