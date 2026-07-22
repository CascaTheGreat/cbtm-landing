"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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

export async function signOut() {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/", "layout");
  redirect("/login");
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

// Load detailed info for the logged in user
export async function getUserInfoById(authId: string) {
  const supabase = createClient();
  const { data: user, error } = await supabase
    .from("users")
    .select("*")
    .eq("auth_id", authId)
    .single();
  if (error) {
    throw new Error(error.message);
  }
  return user;
}

export type UserInfo = {
  id: number;
  name: string;
  in_fence: string;
  color: string;
  type: string;
  lifetime_points: number;
  monthly_points: number;
  status: string;
  custom_image: string;
  visible: boolean;
};
