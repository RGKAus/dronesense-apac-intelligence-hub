"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logout() {
  const cookieStore = await cookies();

  cookieStore.delete("rpas_session");

  redirect("/login");
}