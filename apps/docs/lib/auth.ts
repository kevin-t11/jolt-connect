import db from "@jolt-connect/db";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import GoogleProvider from "next-auth/providers/google";

export const authConfigs: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET ?? "",
      allowDangerousEmailAccountLinking: true,
    }),

    GithubProvider({
      clientId: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID ?? "",
      clientSecret: process.env.NEXT_PUBLIC_GITHUB_CLIENT_SECRET ?? "",
      allowDangerousEmailAccountLinking: true,
    }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any) {
        try {
          const { email, password } = credentials;

          // Find the user in the database
          const user = await db.user.findUnique({
            where: { email },
          });

          // Check if the user exists and the password is correct
          if (user && bcrypt.compareSync(password, user.password)) {
            return user; // Return user object on successful login
          }
        } catch (err) {
          console.error("Error during authorization", err);
        }

        return null; // Return null on failure
      },
    }),
  ],
  pages: {
    signIn: "/sign-in",
    error: "/error",
    signOut: "/sign-out",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  jwt: {
    secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      console.log("SignIn callback triggered", { user, account, profile });
      return true;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.uid as string;
      }
      return session;
    },
    async jwt({ user, token }) {
      if (user) {
        token.uid = user.id;
      }
      return token;
    },
  },
  debug: true,
};
