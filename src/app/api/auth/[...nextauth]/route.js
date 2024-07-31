import { promises as fs } from 'fs';
import path from 'path';
import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';

// Define the path to the JSON file containing user data
const filePath = path.join(process.cwd(), 'public', 'data', 'users.json');

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {},

      async authorize(credentials) {
        const { name, password } = credentials;

        try {
          // read the JSON file
          const jsonData = await fs.readFile(filePath, 'utf8');
          const users = JSON.parse(jsonData);

          // find the user by name
          const user = users.find((u) => u.name === name);

          if (!user) {
            return null;
          }

          // compare the input password with the hashed password
          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (!passwordsMatch) {
            return null;
          }

          return user;
        } catch (e) {
          console.log('Error:', e);
          return null;
        }
      },
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
    signIn: '/',
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
