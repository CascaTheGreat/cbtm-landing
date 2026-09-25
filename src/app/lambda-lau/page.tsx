"use client";
import CheckoutForm from "@/components/CheckoutForm";
import Container from "@/components/Container";
import { useEffect, useState } from "react";
import LambdaSvg from "./lambda";

export default function DonatePage(): JSX.Element {
  const [userId, setUserId] = useState<string | null>(null);
  const [isiPhone, setIsiPhone] = useState<boolean>(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const userIdParam = urlParams.get("user_id");
    setUserId(userIdParam);

    // Check if the user is on an iPhone
    setIsiPhone(/iPhone/.test(navigator.userAgent));
  }, []);

  if (userId) {
    return (
      <Container className="flex min-h-[70vh] items-center justify-center pt-32 pb-16 lg:pt-40 lg:pb-24">
        <div className="max-w-xl text-center">
          <div className="mx-auto mb-4 flex items-center justify-center">
            <LambdaSvg width={36} height={36} />
            <h1 className="text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl">
              L
            </h1>
          </div>
          <h1 className="text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl">
            Lambda Lau
          </h1>
          <p className="mt-4 text-base leading-7 text-zinc-600 sm:text-lg">
            Compete in a trial of endurace for a chance to win the prize pool
            and support Georgetown&apos;s finest library.{" "}
          </p>
          <div className="mb-4">
            <CheckoutForm userId={userId} />
          </div>
          <div className="mt-8 text-left">
            <h2 className="mb-3 text-xl font-semibold text-zinc-900">
              How it Works
            </h2>
            <ol className="list-decimal space-y-2 pl-5 text-base leading-7 text-zinc-600 sm:text-lg">
              <li>
                For every 15 minutes you spend inside Lau between 12:00 AM and
                11:59 PM on December 9th, 2026, you will earn points towards the
                prize pool. The longer you stay, the more points you earn!
              </li>
              <li>
                Register with the link above before the competition begins.
                We&apos;ll send you a confirmation email and more details closer
                to the event.
              </li>
              <li>
                At one second after midnight on December 9th, 2026, join us for
                the launch event (details to follow).
              </li>
              <li>
                Track your progress on the in-app leaderboard, study hard, and
                join us for sponsored study breaks.
              </li>
              <li>
                On December 12th, 2026, we&apos;ll announce the winner and the
                final totals for the fundraiser.
              </li>
            </ol>
          </div>
          <p className="text-xs mt-4 text-zinc-500">
            No purchase necessary. By purchasing a ticket, you agree to the{" "}
            <a
              href="https://docs.google.com/document/d/1_yGEnpDLVUIH4gMNXsG5YI9kA-8QcWgZbPPqh8GPKe0"
              className="text-primary hover:text-primary-accent underline"
            >
              Terms and Conditions
            </a>
          </p>
        </div>
      </Container>
    );
  } else {
    return (
      <Container className="flex min-h-[70vh] items-center justify-center pt-32 pb-16 lg:pt-40 lg:pb-24">
        <div className="max-w-xl text-center">
          <div className="mx-auto mb-4 flex items-center justify-center">
            <LambdaSvg width={36} height={36} />
            <h1 className="text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl">
              L
            </h1>
          </div>

          <h1 className="text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl">
            Lambda Lau
          </h1>
          <p className="mt-4 text-base leading-7 text-zinc-600 sm:text-lg mb-6">
            Lambda Lau is a celebration of Georgeown&apos;s finest (and most
            dated) library. Across three days, entrants will see who can stay in
            Lau the longest and win the grand prize.
          </p>
          <a
            href={
              isiPhone
                ? "cbtm://explore/lambda/register"
                : "https://apps.apple.com/us/app/cbtm/id6789364778"
            }
            className="rounded-lg bg-[#010057] px-8 py-4 text-white hover:bg-blue-600 mt-10"
          >
            Join the Fun
          </a>
          <p className="mt-6 text-base leading-7 text-zinc-600 sm:text-lg">
            If you want to track our progress or make a donation, please visit
            our{" "}
            <a
              href="/lambda-lau/progress"
              className="text-primary hover:text-primary-accent underline"
            >
              progress page
            </a>
            .
          </p>
        </div>
      </Container>
    );
  }
}
