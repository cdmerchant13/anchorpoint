import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { NextAuthOptions } from 'next-auth';

// Simple mock authentication for frontend-isolated branch
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // Mock authentication - always return a demo user for valid credentials
        if (credentials.email === 'demo@example.com' && credentials.password === 'demo') {
          return {
            id: '1',
            email: 'demo@example.com',
            name: 'Demo User',
            dutyStation: 'Fort Bragg, NC'
          };
        }

        // For any other credentials, create a new mock user
        return {
          id: String(Date.now()),
          email: credentials.email,
          name: credentials.email.split('@')[0],
          dutyStation: 'Unknown Base'
        };
      }
    })
  ],
  callbacks: {
    async session({ session, token }) {
      if (session.user && token) {
        session.user.id = token.sub || '';
        session.user.dutyStation = (token as any).dutyStation || '';
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.dutyStation = user.dutyStation;
      }
      return token;
    }
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/register'
  },
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: false // Set to true in production
      }
    },
    callbackUrl: {
      name: `next-auth.callback-url`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: false // Set to true in production
      }
    }
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
