import NextAuth, { AuthOptions } from 'next-auth';
import CredentialsProvider  from 'next-auth/providers/credentials';
import prisma from "@/app/libs/prismadb"
import { PrismaAdapter} from '@next-auth/prisma-adapter';
import bcrypt from 'bcrypt'

export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
    
          CredentialsProvider({
            name: 'credentials',
            credentials: {
              email: { label: 'email', type: 'text' },
              password: { label: 'password', type: 'password' }
            },
            async authorize(credentials) {
                if(!credentials?.email || !credentials?.password){
                    return null;
                }
             
                const existingUser = await prisma.user.findUnique({
                    where: { email: credentials?.email}
                });
                if(!existingUser){
                    return null;
                }

                const passwordMatch = await bcrypt.compare(credentials.password, existingUser.password);

                if(!passwordMatch){
                    return null
                }
                return {
                    id: `${existingUser.id}`,
                    username: existingUser.username,
                    email: existingUser.email
                }
            }
          })      
    ],
    debug: process.env.NODE_ENV === 'development',
    session: {
      strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };