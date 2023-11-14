import NextAuth, { AuthOptions } from 'next-auth';
import CredentialsProvider  from 'next-auth/providers/credentials';
import { PrismaAdapter} from '@next-auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


import bcrypt from 'bcrypt'

export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma),
    debug: process.env.NODE_ENV === 'development',
    secret: process.env.SECRET_JWT,
    session: {
        strategy: 'jwt'
    },
    pages: {
        signIn: 'sign-in'
    },
    providers: [
    
          CredentialsProvider({
            name: 'credentials',
            credentials: {
              email: { label: 'email', type: 'text' },
              password: { label: 'password', type: 'password' }
            },
            async authorize(credentials) {
                console.log("credentials", credentials)
                if(!credentials?.email || !credentials?.password){
                    throw new Error('Email and password are empty')
                }
             
                const existingUser = await prisma.user.findUnique({
                    where: { email: credentials?.email}
                });


                if(!existingUser){
                    throw new Error('User not exists')
                }

                const passwordMatch = await bcrypt.compare(
                    credentials.password, 
                    existingUser.password
                );

                console.log("password", passwordMatch)

                if(!passwordMatch){
                    throw new Error('Password does not match')
                }
                return existingUser
            }
          })      
    ],
    async session({ session, token }) {
     return {
        ...session,
        user: {
            ...session.user,
            username: token.username
        }
     }
    },
    async jwt({ token, user }: {token: any, user: any}) {
        if(user){
            return {
                ...token,
                user: {
                    username: user.username
                }
            }
        }
    }
  
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };