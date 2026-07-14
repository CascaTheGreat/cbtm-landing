"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { createClient } from "@/lib/supabaseClient";

const OTP: React.FC = () => {
  const router = useRouter();
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isOTPSent, setIsOTPSent] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendOTP = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOtp({ email });

      if (error) {
        throw error;
      }

      setIsOTPSent(true);
      setError("");
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.verifyOtp({
        email,
        token: otp,
        type: "email",
      });

      if (error) {
        throw error;
      }

      setError("");
      router.refresh();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-8 grid gap-4 rounded-3xl border border-[#d7d9f0] bg-white p-5 shadow-sm sm:p-6">
      <h2 className="text-xl font-semibold text-[var(--foreground)]">
        Sign in with a code
      </h2>
      <p className="text-sm text-[var(--foreground-accent)]">
        We’ll email you a one-time passcode.
      </p>
      {!isOTPSent ? (
        <div className="grid gap-3">
          <input
            type="email"
            autoComplete="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-2xl border border-[#d7d9f0] bg-white px-4 py-3 text-[var(--foreground)] shadow-sm outline-none transition placeholder:text-[#8c8fa8] focus:border-[var(--primary)] focus:ring-4 focus:ring-[#0100571a]"
          />
          <button
            type="button"
            onClick={handleSendOTP}
            disabled={isLoading || !email.trim()}
            className="inline-flex w-full items-center justify-center rounded-full bg-[var(--primary)] px-6 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-[var(--secondary)] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? "Sending..." : "Send code"}
          </button>
        </div>
      ) : (
        <div className="grid gap-3">
          <input
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full rounded-2xl border border-[#d7d9f0] bg-white px-4 py-3 text-[var(--foreground)] shadow-sm outline-none transition placeholder:text-[#8c8fa8] focus:border-[var(--primary)] focus:ring-4 focus:ring-[#0100571a]"
          />
          <button
            type="button"
            onClick={handleVerifyOTP}
            disabled={isLoading || !otp.trim()}
            className="inline-flex w-full items-center justify-center rounded-full bg-[var(--primary)] px-6 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-[var(--secondary)] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? "Verifying..." : "Verify code"}
          </button>
        </div>
      )}
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default OTP;
