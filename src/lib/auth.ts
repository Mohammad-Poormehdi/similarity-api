import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "./db";
import GitHubProvider from "next-auth/providers/github";

const authOptions: NextAuthOptions = {
  providers: [
    // CredentialsProvider({
    //   name: "credentials",
    //   credentials: {
    //     email: { label: "email", type: "text" },
    //     password: { label: "password", type: "password" },
    //   },
    //   async authorize(credentials) {
    //     if (!credentials?.email || !credentials.password) {
    //       throw new Error("Invalid credentials");
    //     }
    //     const user = await db.user.findUnique({
    //       where: {
    //         email: credentials?.email,
    //       },
    //     });
    //     if (!user || !user.hashedPassword) {
    //       throw new Error("User Does not exists");
    //     }
    //     const comparedPassword = bcrypt.compare(
    //       credentials?.password,
    //       user?.hashedPassword
    //     );
    //     if (!comparedPassword) {
    //       throw new Error("Invalid password");
    //     }

    //     return user;
    //   },
    // }),
    // ,
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
      }
      return session;
    },
  },

  adapter: PrismaAdapter(db as any),
  pages: { signIn: "/" },
  debug: process.env.NODE_ENV === "development",
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
};
export default authOptions;
