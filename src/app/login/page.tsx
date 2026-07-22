"use client";

import { sendOTP, verifyOTP } from "./actions";
import { useState } from "react";
import Container from "@/components/Container";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isOTPSent, setIsOTPSent] = useState(false);

  const handleSendOTP = async () => {
    if (!email.trim()) return;
    setIsLoading(true);
    setError(null);
    try {
      await sendOTP(email);
      setIsOTPSent(true);
    } catch {
      setError("Failed to send code. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!otp.trim()) return;
    setIsLoading(true);
    setError(null);
    try {
      await verifyOTP(email, otp);
    } catch {
      setError("Invalid code. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container className="pt-32 pb-16 lg:pt-40 lg:pb-24">
      <div className="mx-auto mt-8 w-1/2 grid gap-4 rounded-3xl border border-[#d7d9f0] bg-white p-5 text-center shadow-sm sm:p-6">
        <h2 className="text-xl font-semibold text-[var(--foreground)]">
          Sign in with a code
        </h2>
        <p className="text-sm text-[var(--foreground-accent)]">
          We’ll email you a one-time passcode.
        </p>
        {!isOTPSent ? (
          <form className="grid gap-3">
            <input
              type="email"
              autoComplete="email"
              placeholder="Enter your email"
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
          </form>
        ) : (
          <form className="grid gap-3">
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
          </form>
        )}
        {error && <p className="text-sm text-red-600">{error}</p>}
      </div>
    </Container>
  );
}
