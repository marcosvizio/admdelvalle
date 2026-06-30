import { cookies } from "next/headers";
import { signSession, verifySession } from "./crypto-utils";

const ADMIN_COOKIE = "adv_admin_session";
const EXPENSAS_COOKIE = "adv_expensas_session";

const ADMIN_TTL_SECONDS = 60 * 60 * 4; // 4 horas
const EXPENSAS_TTL_SECONDS = 60 * 60 * 2; // 2 horas

interface AdminSessionPayload extends Record<string, unknown> {
  role: "admin";
}

interface ExpensasSessionPayload extends Record<string, unknown> {
  slug: string;
}

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: true,
  sameSite: "strict" as const,
  path: "/",
};

export async function createAdminSession(secret: string): Promise<void> {
  const token = await signSession({ role: "admin" }, secret, ADMIN_TTL_SECONDS);
  const store = await cookies();
  store.set(ADMIN_COOKIE, token, { ...COOKIE_OPTIONS, maxAge: ADMIN_TTL_SECONDS });
}

export async function requireAdminSession(secret: string): Promise<boolean> {
  const store = await cookies();
  const token = store.get(ADMIN_COOKIE)?.value;
  const payload = await verifySession<AdminSessionPayload>(token, secret);
  return payload?.role === "admin";
}

export async function clearAdminSession(): Promise<void> {
  const store = await cookies();
  store.delete(ADMIN_COOKIE);
}

export async function createExpensasSession(slug: string, secret: string): Promise<void> {
  const token = await signSession({ slug }, secret, EXPENSAS_TTL_SECONDS);
  const store = await cookies();
  store.set(EXPENSAS_COOKIE, token, { ...COOKIE_OPTIONS, maxAge: EXPENSAS_TTL_SECONDS });
}

export async function getExpensasSlug(secret: string): Promise<string | null> {
  const store = await cookies();
  const token = store.get(EXPENSAS_COOKIE)?.value;
  const payload = await verifySession<ExpensasSessionPayload>(token, secret);
  return payload?.slug ?? null;
}

export async function clearExpensasSession(): Promise<void> {
  const store = await cookies();
  store.delete(EXPENSAS_COOKIE);
}
