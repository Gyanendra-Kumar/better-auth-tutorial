import prisma from "@/lib/prisma";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { APIError, createAuthMiddleware } from "better-auth/api";
import { sendMail } from "./sendMail";
import { passwordSchema } from "./validation";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
  },
  emailAndPassword: {
    enabled: true,
    // requireEmailVerification: true,
    async sendResetPassword({ user, url }) {
      await sendMail({
        to: user.email,
        userName: user.name,
        subject: `Reset your password`,
        html: `Click the link to reset your password: ${url}`,
      });
    },
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    async sendVerificationEmail({ user, url }) {
      await sendMail({
        to: user?.email,
        userName: user?.name,
        subject: `Verify your email`,
        html: `Click to verify your email ${url}`,
      });
    },
  },
  user: {
    changeEmail: {
      enabled: true,
      async sendChangeEmailVerification({ user, url, newEmail }) {
        await sendMail({
          to: user.email,
          userName: user.name,
          subject: `Approve email change`,
          html: `Your email has been changed to ${newEmail}. Click the link to approve the change: ${url}`,
        });
      },
    },
    additionalFields: {
      role: {
        type: "string",
        input: false,
      },
    },
  },
  hooks: {
    before: createAuthMiddleware(async (ctx) => {
      if (
        ctx.path === "/sign-up/email" ||
        ctx.path === "/reset-password" ||
        ctx.path === "/change-password"
      ) {
        const password = ctx.body.password || ctx.body.newPassword;
        const { error } = passwordSchema.safeParse(password);

        if (error) {
          throw new APIError("BAD_REQUEST", {
            message: `Password is not strong enough`,
          });
        }
      }
    }),
  },
});

export type Session = typeof auth.$Infer.Session;
export type User = typeof auth.$Infer.Session.user;
