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

export async function getUserEvents(userId: number): Promise<EventInfo[]> {
  const supabase = createClient();
  const { data: events, error } = await supabase
    .from("events")
    .select(
      "id, host, location, sublocation, name, description, start_time, end_time, action_link, popularity, image, promoted, pois!events_location_fkey(id, name, bounds, location)",
    )
    .eq("host", userId)
    .gte("end_time", new Date().toISOString());
  if (error) {
    throw new Error(error.message);
  }

  return events.map((event) => ({
    id: event.id,
    host: event.host,
    location: event.location,
    sublocation: event.sublocation,
    name: event.name,
    description: event.description,
    start_time: new Date(event.start_time),
    end_time: new Date(event.end_time),
    action_link: event.action_link,
    popularity: event.popularity,
    image: event.image,
    promoted: event.promoted,
    location_id: event.pois.id,
    location_name: event.pois.name,
    location_bounds: event.pois.bounds,
    location_location: event.pois.location,
  }));
}

// TODO: add a claims check on this
export async function updateEvent(eventData: EventInfo): Promise<void> {
  const supabase = createClient();
  console.log("Updating event:", eventData);

  const { data, error } = await supabase
    .from("events")
    .update({
      name: eventData.name,
      description: eventData.description,
      start_time: eventData.start_time.toISOString(),
      end_time: eventData.end_time.toISOString(),
      location: eventData.location_id,
    })
    .eq("id", eventData.id);

  if (error) {
    throw new Error(error.message);
  }

  console.log("Event updated successfully:", data);
}

export async function getVisibleLocations(): Promise<
  { id: number; name: string }[]
> {
  const supabase = createClient();
  const { data: locations, error } = await supabase
    .from("pois")
    .select("id, name")
    .eq("visible", true)
    .gte("id", 1); // Filter out the whole-campus dummy poi
  if (error) {
    throw new Error(error.message);
  }

  return locations;
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

export type EventInfo = {
  id: number;
  host: number;
  location: number;
  sublocation?: number;
  name: string;
  description: string;
  start_time: Date;
  end_time: Date;
  action_link?: string;
  popularity: number;
  image?: string;
  promoted: boolean;
  location_id: number;
  location_name: string;
  location_bounds: string;
  location_location: string;
};
