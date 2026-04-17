import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { db, hasCoreTables, isDatabaseConfigured } from "@/lib/db";
import { signInSchema } from "@/lib/validations";

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: { strategy: "jwt" },
  pages: {
    signIn: "/auth/sign-in",
  },
  secret: process.env.AUTH_SECRET ?? "sandbox-dev-secret-change-this",
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        const parsed = signInSchema.safeParse(credentials);

        if (!parsed.success) {
          return null;
        }

        if (!isDatabaseConfigured() || !(await hasCoreTables())) {
          if (
            parsed.data.email === "admin@sandbox.bd" &&
            parsed.data.password === "sandbox-admin-2026"
          ) {
            return {
              id: "demo-admin",
              name: "Sandbox Super Admin",
              email: parsed.data.email,
              role: "SUPER_ADMIN",
            };
          }

          return null;
        }

        const admin = await db.adminUser.findUnique({
          where: { email: parsed.data.email },
        });

        if (!admin) {
          return null;
        }

        const matches = await bcrypt.compare(parsed.data.password, admin.passwordHash);

        if (!matches) {
          return null;
        }

        return {
          id: admin.id,
          name: admin.name,
          email: admin.email,
          role: admin.role,
        };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }

      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub ?? "";
        session.user.role = (token.role as string | undefined) ?? "MANAGER";
      }

      return session;
    },
  },
});
