import NextAuth, { DefaultSession } from "next-auth"
import GoogleProvider from "next-auth/providers/google"

// Extend the built-in session type
declare module "next-auth" {
  interface Session extends DefaultSession {
    accessToken?: string
  }
}

// Extend the built-in JWT type
declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string
  }
}

export default NextAuth({
  secret: process.env.NEXT_PUBLIC_AUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID as string,
      clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET as string,
      authorization: {
        params: {
          scope: 'openid email profile https://www.googleapis.com/auth/fitness.activity.read https://www.googleapis.com/auth/fitness.body.read https://www.googleapis.com/auth/fitness.location.read'
        }
      }
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        console.log('Setting access token in JWT')
        token.accessToken = account.access_token
      }
      return token
    },
    async session({ session, token }) {
      console.log('Setting access token in session')
      session.accessToken = token.accessToken
      return session
    }
  },
  debug: true, // Enable debug messages in the console
})