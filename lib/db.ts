import { Prisma } from "@prisma/client";
import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
  var sandboxCoreTablesAvailable: boolean | undefined;
}

export const db =
  global.prisma ??
  new PrismaClient({
    log: ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  global.prisma = db;
}

export function isDatabaseConfigured() {
  return Boolean(process.env.DATABASE_URL);
}

export function isMissingTableError(error: unknown) {
  return (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    error.code === "P2021"
  );
}

export async function hasCoreTables() {
  if (!isDatabaseConfigured()) {
    return false;
  }

  if (typeof global.sandboxCoreTablesAvailable === "boolean") {
    return global.sandboxCoreTablesAvailable;
  }

  try {
    const result = (await db.$queryRawUnsafe(
      `SELECT
        to_regclass('public."Track"')::text AS "trackTable",
        to_regclass('public."Application"')::text AS "applicationTable"`,
    )) as Array<{
      trackTable: string | null;
      applicationTable: string | null;
    }>;

    const available = Boolean(
      result[0]?.trackTable && result[0]?.applicationTable,
    );

    global.sandboxCoreTablesAvailable = available;
    return available;
  } catch {
    global.sandboxCoreTablesAvailable = false;
    return false;
  }
}
