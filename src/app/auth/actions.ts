"use server";

import { createClient } from "@/lib/supabase/supabaseClient";

export async function sendOTP(email: string) {
  const supabase = createClient();
  const { data, error } = await supabase.auth.signInWithOtp({ email });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function verifyOTP(email: string, token: string) {
  const supabase = createClient();
  const { data, error } = await supabase.auth.verifyOtp({
    email,
    token,
    type: "email",
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getCurrentUser(authId?: string) {
  if (!authId) {
    return { id: null, name: null, type: null };
  }
  const supabase = createClient();

  const { data: user, error: userError } = await supabase
    .from("users")
    .select("id, name, type")
    .eq("auth_id", authId)
    .single();
  if (userError) {
    throw new Error(userError.message);
  }

  return user;
}
