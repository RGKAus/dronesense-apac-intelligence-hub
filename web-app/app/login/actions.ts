"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createSessionToken } from "../../lib/auth";

export async function login(formData: FormData): Promise<void> {
  const username = String(formData.get("username") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  const expectedUsername = process.env.APP_USERNAME;
  const expectedPassword = process.env.APP_PASSWORD;

  if (!expectedUsername || !expectedPassword) {
    throw new Error("Login credentials are not configured.");
  }

  if (username !== expectedUsername || password !== expectedPassword) {
    redirect("/login?error=invalid");
  }

  const token = await createSessionToken();
  const cookieStore = await cookies();

  cookieStore.set("rpas_session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8,
  });

  redirect("/");
}