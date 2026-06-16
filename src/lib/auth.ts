import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "@/lib/prisma";


export const auth = betterAuth({
  // Tells Better Auth to store users, sessions, and accounts into Postgres via Prisma
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  // Activates social login tracking
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
  },
});
