import { Client, Account, Databases } from 'appwrite'

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1') // API Endpoint
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID as string) // Project ID

export const appwriteAccount = new Account(client)
export const databases = new Databases(client)
