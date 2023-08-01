import { PrismaClient } from '@prisma/client';
import NextAuth from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { OAuthConfig } from 'next-auth/providers/oauth';
import GoogleProvider from 'next-auth/providers/google';

const prisma = new PrismaClient();

// Define the type for GoogleProvider configuration
interface GoogleProviderConfig {
    clientId: string;
    clientSecret: string;
}

export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        } as GoogleProviderConfig), // Type assertion to inform TypeScript about the configuration type
    ],
    adapter: PrismaAdapter(prisma),
});
