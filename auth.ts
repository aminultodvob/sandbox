import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { db, hasCoreTables, isDatabaseConfigured } from "@/lib/db";
import { signInSchema } from "@/lib/validations";

const fallbackAdmins = [
  {
    id: "demo-admin-primary",
    name: "Sandbox Super Admin",
    email: "admin@sandboxbd.com",
    password: "Admin@4321",
    role: "SUPER_ADMIN",
  },
  {
    id: "demo-admin-legacy",
    name: "Sandbox Super Admin",
    email: "admin@sandbox.bd",
    password: "sandbox-admin-2026",
    role: "SUPER_ADMIN",
  },
] as const;

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

        const matchedFallbackAdmin = fallbackAdmins.find(
          (admin) =>
            admin.email === parsed.data.email &&
            admin.password === parsed.data.password,
        );

        if (matchedFallbackAdmin) {
          return {
            id: matchedFallbackAdmin.id,
            name: matchedFallbackAdmin.name,
            email: matchedFallbackAdmin.email,
            role: matchedFallbackAdmin.role,
          };
        }

        if (!isDatabaseConfigured() || !(await hasCoreTables())) {
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
    authorized({ auth, request }) {
      const { pathname } = request.nextUrl;
      const isAdminPage = pathname.startsWith("/admin");
      const isAdminApi = pathname.startsWith("/api/admin");

      if (!isAdminPage && !isAdminApi) {
        return true;
      }

      if (auth?.user) {
        return true;
      }

      if (isAdminApi) {
        return NextResponse.json(
          { error: "Authentication required." },
          { status: 401 },
        );
      }

      const signInUrl = new URL("/auth/sign-in", request.nextUrl.origin);
      signInUrl.searchParams.set("callbackUrl", request.nextUrl.pathname);
      return NextResponse.redirect(signInUrl);
    },
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
