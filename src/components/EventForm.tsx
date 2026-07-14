"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { createClient } from "@/lib/supabaseClient";

const EventForm: React.FC<{ userId: number }> = ({ userId }) => {
  const router = useRouter();
  const supabase = createClient();
  const [locations, setLocations] = useState<{ id: number; name: string }[]>(
    [],
  );
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const fetchLocations = async () => {
      const { data, error } = await supabase.from("pois").select("id, name");

      if (error) {
        console.error("Error fetching locations:", error);
      } else {
        data.sort((a, b) => a.name.localeCompare(b.name));
        setLocations(data);
      }
    };

    fetchLocations();
  }, [supabase]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUploading(true);
    const formData = new FormData(e.currentTarget);
    const name = String(formData.get("name") ?? "").trim();
    const description = String(formData.get("description") ?? "").trim();
    const startTime = String(formData.get("start_time") ?? "").trim();
    const endTime = String(formData.get("end_time") ?? "").trim();
    const location = Number(formData.get("location") ?? 0);
    const link = String(formData.get("link") ?? "").trim();

    const { data, error } = await supabase.from("events").insert({
      name,
      host: userId,
      description,
      start_time: startTime,
      end_time: endTime,
      location,
      action_link: link,
    });

    if (error) {
      alert("Event submission failed: " + error.message);
    } else {
      alert("Your event has been submitted successfully!");
      window.location.href = "/";
    }
    setUploading(false);
  };

  return (
    <form
      onSubmit={onSubmit}
      className="mx-auto w-full max-w-3xl rounded-[2rem] border border-[#d8daf5] bg-[var(--background)] p-6 shadow-[0_24px_80px_rgba(1,0,87,0.08)] sm:p-8 lg:p-10"
    >
      <h1 className="text-4xl mb-6 text-[var(--foreground)]">
        Submit Your Event
      </h1>
      <div className="grid gap-5">
        <div className="grid gap-2">
          <label
            htmlFor="name"
            className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--foreground-accent)]"
          >
            Event Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full rounded-2xl border border-[#d7d9f0] bg-white px-4 py-3 text-[var(--foreground)] shadow-sm outline-none transition placeholder:text-[#8c8fa8] focus:border-[var(--primary)] focus:ring-4 focus:ring-[#0100571a]"
            placeholder="Cool event name"
          />
        </div>

        <div className="grid gap-2">
          <label
            htmlFor="description"
            className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--foreground-accent)]"
          >
            Description{" "}
            <span className="normal-case tracking-normal">(optional)</span>
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            className="w-full rounded-2xl border border-[#d7d9f0] bg-white px-4 py-3 text-[var(--foreground)] shadow-sm outline-none transition placeholder:text-[#8c8fa8] focus:border-[var(--primary)] focus:ring-4 focus:ring-[#0100571a]"
            placeholder="Describe your event in a sentence"
          />
        </div>

        <div className="grid gap-2">
          <label
            htmlFor="link"
            className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--foreground-accent)]"
          >
            Link <span className="normal-case tracking-normal">(optional)</span>
          </label>
          <input
            id="link"
            name="link"
            type="url"
            className="w-full rounded-3xl border border-[#d7d9f0] bg-white px-4 py-3 text-[var(--foreground)] shadow-sm outline-none transition placeholder:text-[#8c8fa8] focus:border-[var(--primary)] focus:ring-4 focus:ring-[#0100571a]"
            placeholder="Add a link to your event (e.g., website, registration page)"
          />
        </div>
        <div className="grid gap-2">
          <label
            htmlFor="location"
            className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--foreground-accent)]"
          >
            Location
          </label>
          <select
            id="location"
            name="location"
            required
            className="w-full rounded-3xl border border-[#d7d9f0] bg-white px-4 py-3 text-[var(--foreground)] shadow-sm outline-none transition placeholder:text-[#8c8fa8] focus:border-[var(--primary)] focus:ring-4 focus:ring-[#0100571a]"
          >
            <option value="">Select a location</option>
            {locations.map((loc) => (
              <option key={loc.id} value={loc.id}>
                {loc.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-5 mt-6">
        <div className="grid gap-2">
          <label
            htmlFor="start_time"
            className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--foreground-accent)]"
          >
            Start Time
          </label>
          <input
            type="datetime-local"
            id="start_time"
            name="start_time"
            required
            className="w-full rounded-3xl border border-[#d7d9f0] bg-white px-4 py-3 text-[var(--foreground)] shadow-sm outline-none transition placeholder:text-[#8c8fa8] focus:border-[var(--primary)] focus:ring-4 focus:ring-[#0100571a]"
          />
        </div>

        <div className="grid gap-2">
          <label
            htmlFor="end_time"
            className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--foreground-accent)]"
          >
            End Time
          </label>
          <input
            type="datetime-local"
            id="end_time"
            name="end_time"
            required
            className="w-full rounded-3xl border border-[#d7d9f0] bg-white px-4 py-3 text-[var(--foreground)] shadow-sm outline-none transition placeholder:text-[#8c8fa8] focus:border-[var(--primary)] focus:ring-4 focus:ring-[#0100571a]"
          />
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-lg font-semibold text-[var(--foreground)]">
          Consent
        </h2>
        <p className="mt-1 text-sm text-[var(--foreground-accent)]">
          By submitting this form, you consent to sharing your event details
          with us. We may use this information for promotional purposes and to
          improve our services. You further acknowledge that you have followed
          all applicable laws and regulations in the hosting and promotion of
          your event. Please ensure that you have obtained all necessary
          permissions and rights for any content you submit.
        </p>
      </div>

      <div className="mt-6 grid gap-4">
        <button
          type="submit"
          disabled={uploading}
          className="inline-flex w-full items-center justify-center rounded-full bg-[var(--primary)] px-6 py-4 text-sm font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-[var(--secondary)] focus:outline-none focus:ring-4 focus:ring-[#01005733]"
        >
          {uploading ? "Uploading..." : "Submit Event"}
        </button>
      </div>
    </form>
  );
};

export default EventForm;
