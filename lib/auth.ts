import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          // await dbConnect(); // Not needed for mock auth

          // const user = await User.findOne({ email: credentials.email });
          // Mock users for demo
          let user;
          if (credentials.email === 'tourist@demo.com') {
            user = {
              _id: 'tourist-id',
              email: 'tourist@demo.com',
              password: 'demo123', // Plain text for demo
              name: 'Demo Tourist',
              role: 'tourist',
            };
          } else if (credentials.email === 'operator@demo.com') {
            user = {
              _id: 'operator-id',
              email: 'operator@demo.com',
              password: 'demo123', // Plain text for demo
              name: 'Demo Operator',
              role: 'operator',
            };
          } else {
            return null;
          }

          if (!user) {
            return null;
          }

          // Simple password check for demo
          if (credentials.password !== user.password) {
            return null;
          }

          return {
            id: user._id,
            email: user.email,
            name: user.name,
            role: user.role,
          };
        } catch (error) {
          console.error('Auth error:', error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub!;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
};