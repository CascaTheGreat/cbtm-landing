"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/supabaseServer";

export async function sendOTP(email: string) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: email,
  };

  const { error } = await supabase.auth.signInWithOtp(data);

  if (error) {
    redirect("/error");
  }
}

export async function verifyOTP(email: string, token: string) {
  const supabase = await createClient();

  const { error } = await supabase.auth.verifyOtp({
    email: email,
    token: token,
    type: "email",
  });

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/account");
}
