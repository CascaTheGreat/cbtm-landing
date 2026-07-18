"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

import { createClient } from "@/lib/supabaseClient";

const Form: React.FC = () => {
  const router = useRouter();
  const supabase = createClient();
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const params = useSearchParams();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!params.get("user_id")) {
      alert(
        "CBTM user ID is missing. Please make sure you came from the app and try again.",
      );
      return;
    }
    const formData = new FormData(e.currentTarget);
    const name = String(formData.get("name") ?? "").trim();
    const instagram = String(formData.get("instagram") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();
    const userId = String(params.get("user_id") ?? "").trim();

    if (!file) {
      alert("Please select a file first!");
      return;
    }

    const path = await handleUpload();

    if (!path) {
      return;
    }

    const { data, error } = await supabase.from("moments").insert({
      username: name,
      instagram,
      message,
      user_id: userId,
      file_path: path,
    });

    if (error) {
      alert("Record insert failed: " + error.message);
    } else {
      alert("Your CBTMoment has been submitted successfully!");
      window.location.href = "/";
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select a file first!");

    try {
      setUploading(true);

      // Create a unique file path to prevent overwriting existing files
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `public/uploads/${fileName}`;

      // Upload file to the "documents" bucket
      const { data, error } = await supabase.storage
        .from("moments")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (error) throw error;

      return data.path;
    } catch (error: any) {
      alert("An error occurred during upload: " + error.message);
      return null;
    } finally {
      setUploading(false);
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="mx-auto w-full max-w-3xl rounded-[2rem] border border-[#d8daf5] bg-[var(--background)] p-6 shadow-[0_24px_80px_rgba(1,0,87,0.08)] sm:p-8 lg:p-10"
    >
      <h1 className="text-4xl mb-6 text-[var(--foreground)]">
        Share your CBTMoment
      </h1>
      <div className="grid gap-5">
        <div className="grid gap-2">
          <label
            htmlFor="name"
            className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--foreground-accent)]"
          >
            CBTM Username
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full rounded-2xl border border-[#d7d9f0] bg-white px-4 py-3 text-[var(--foreground)] shadow-sm outline-none transition placeholder:text-[#8c8fa8] focus:border-[var(--primary)] focus:ring-4 focus:ring-[#0100571a]"
            placeholder="Your CBTM handle"
            defaultValue={params.get("user_name") || ""}
          />
        </div>

        <div className="grid gap-2">
          <label
            htmlFor="instagram"
            className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--foreground-accent)]"
          >
            Instagram{" "}
            <span className="normal-case tracking-normal">(optional)</span>
          </label>
          <input
            type="text"
            id="instagram"
            name="instagram"
            className="w-full rounded-2xl border border-[#d7d9f0] bg-white px-4 py-3 text-[var(--foreground)] shadow-sm outline-none transition placeholder:text-[#8c8fa8] focus:border-[var(--primary)] focus:ring-4 focus:ring-[#0100571a]"
            placeholder="@yourname"
          />
        </div>

        <div className="grid gap-2">
          <label
            htmlFor="message"
            className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--foreground-accent)]"
          >
            Context{" "}
            <span className="normal-case tracking-normal">(optional)</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            className="w-full rounded-3xl border border-[#d7d9f0] bg-white px-4 py-3 text-[var(--foreground)] shadow-sm outline-none transition placeholder:text-[#8c8fa8] focus:border-[var(--primary)] focus:ring-4 focus:ring-[#0100571a]"
            placeholder="Add a short story or note about the moment"
          />
        </div>

        <div className="grid gap-2">
          <label
            htmlFor="file"
            className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--foreground-accent)]"
          >
            Your Moment
          </label>
          <input
            type="file"
            id="file"
            name="file"
            accept="image/*"
            required
            onChange={handleFileChange}
            className="w-full rounded-2xl border border-[#d7d9f0] bg-white px-4 py-3 text-sm text-[var(--foreground)] shadow-sm file:mr-4 file:rounded-full file:border-0 file:bg-[var(--primary)] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-[var(--secondary)] focus:outline-none focus:ring-4 focus:ring-[#0100571a]"
          />
        </div>

        <div className="rounded-3xl border border-[#d7d9f0] bg-[#f7f8ff] p-4 sm:p-5">
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="consent"
              name="consent"
              required
              className="mt-1 h-5 w-5 rounded border-[#b5b9dd] text-[var(--primary)] focus:ring-4 focus:ring-[#0100571a]"
            />
            <label
              htmlFor="consent"
              className="text-sm leading-6 text-[var(--foreground)]"
            >
              I consent to sharing my CBTMoment and understand that it may be
              used for promotional purposes. If I shared a photo, I confirm that
              I have the rights to it, and have obtained any necessary
              permissions from anyone featured in the photo. I represent that
              none of the depicted actions are illegal in the jurisdiction where
              the photo was taken. I understand that my submission may be
              reviewed and edited before being published. I understand that I
              will not receive any compensation for my submission, and that my
              submission may be used in various media formats, including but not
              limited to social media, websites, and promotional materials. I
              acknowledge that I have read and agree to the terms of this
              consent.
            </label>
          </div>
        </div>

        <button
          type="submit"
          disabled={uploading}
          className="inline-flex w-full items-center justify-center rounded-full bg-[var(--primary)] px-6 py-4 text-sm font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-[var(--secondary)] focus:outline-none focus:ring-4 focus:ring-[#01005733]"
        >
          {uploading ? "Uploading..." : "Submit Moment"}
        </button>
      </div>
    </form>
  );
};

export default Form;
