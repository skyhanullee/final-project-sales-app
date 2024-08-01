import { promises as fs } from 'fs';
import path from 'path';
import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';

const filePath = path.join(process.cwd(), 'public', 'data', 'users.json');

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {},

      async authorize(credentials) {
        const { name, password } = credentials;
      
        try {
          console.log(`Attempting to authenticate user: ${name}`);
          
          // Read the JSON file
          const jsonData = await fs.readFile(filePath, 'utf8');
          const users = JSON.parse(jsonData);
          console.log('Users loaded from JSON:', users);
      
          // Find the user by name
          const user = users.find((user) => user.name === name);
          if (!user) {
            console.log('User not found');
            return null;
          }
      
          console.log('User found:', user);
      
          // Compare the input password with the hashed password
          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (!passwordsMatch) {
            console.log('Password mismatch');
            return null;
          }
      
          console.log('Password match successful');
          return user;
        } catch (e) {
          console.log('Error during authentication:', e);
          return null;
        }
      }
      ,
    }),
  ],
  callbacks: {
    session: async ({ session, token }) => {
      if (session?.user) {
        session.user.id = token.sub;
      }
      return session;
    },
    jwt: async ({ user, token }) => {
      if (user) {
        token.uid = user.id;
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/home',
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
