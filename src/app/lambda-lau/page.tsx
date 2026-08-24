"use client";
import CheckoutForm from "@/components/CheckoutForm";
import Container from "@/components/Container";
import { useEffect, useState } from "react";

export default function DonatePage(): JSX.Element {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const sessionIdParam = urlParams.get("session_id");
    const userIdParam = urlParams.get("user_id");
    setUserId(userIdParam);
  }, []);

  if (userId) {
    return (
      <Container className="flex min-h-[70vh] items-center justify-center pt-32 pb-16 lg:pt-40 lg:pb-24">
        <div className="max-w-xl text-center">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-zinc-500">
            ΛL
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl">
            Lambda Lau
          </h1>
          <p className="mt-4 text-base leading-7 text-zinc-600 sm:text-lg">
            Our biannual fundraiser, Lambda Lau, is a celebration of Georgeown's
            finest (and most dated) library. Entrants compete for a chance to
            win a share of the prize pool, funded by donations and entry fees
            like yours. Your support helps us keep the library running and
            ensures that future generations can enjoy its unique charm.
          </p>
          <CheckoutForm userId={userId} />
        </div>
      </Container>
    );
  } else {
    return (
      <Container className="flex min-h-[70vh] items-center justify-center pt-32 pb-16 lg:pt-40 lg:pb-24">
        <div className="max-w-xl text-center">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-zinc-500">
            500
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl">
            Where&apos;s the party?
          </h1>
          <p className="mt-4 text-base leading-7 text-zinc-600 sm:text-lg">
            We couldn't find your user ID. Please log in or open this page from
            the app.
          </p>
        </div>
      </Container>
    );
  }
}
