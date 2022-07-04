import NextAuth, { type NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "../../../server/db/client";

export const authOptions: NextAuthOptions = {
	// Configure one or more authentication providers
	adapter: PrismaAdapter(prisma),
	providers: [
		GithubProvider({
			clientId: process.env.GITHUB_ID,
			clientSecret: process.env.GITHUB_SECRET,
		}),
	],
	secret: "lbvjkvbwlbwveliuwbvliuwbvliwubvliuwev", // to be replaced
	session: {
		maxAge: 60 * 60 * 5, // 5 hrs, since maxAge must be < then expiryDate
		strategy: "jwt",
	},
};

export default NextAuth(authOptions);
