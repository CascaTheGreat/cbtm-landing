import { calculateProgress, formatCurrency } from "./helpers";
import Container from "@/components/Container";
import LambdaSvg from "../lambda";

export default async function ProgressPage() {
  const progress = await calculateProgress();
  const target = process.env.NEXT_PUBLIC_TARGET
    ? parseFloat(process.env.NEXT_PUBLIC_TARGET)
    : 100;
  const percentage =
    target > 0 ? Math.min((progress.gift / target) * 100, 100) : 0;

  return (
    <Container className="flex min-h-[70vh] items-center justify-center pt-32 pb-16 lg:pt-40 lg:pb-24">
      <div className="w-full max-w-xl text-center">
        <div className="mx-auto mb-4 flex items-center justify-center">
          <LambdaSvg width={36} height={36} />
          <h1 className="text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl">
            L
          </h1>
        </div>
        <h1 className="text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl">
          Fundraiser progress
        </h1>
        <p className="mt-4 text-base leading-7 text-zinc-600 sm:text-lg">
          <a
            href="/lambda-lau"
            className="font-semibold text-primary hover:underline"
          >
            Join us
          </a>{" "}
          in supporting Georgetown&apos;s finest library.
        </p>

        <div className="mt-10 text-left">
          <div className="mb-3 flex items-end justify-between gap-4 text-zinc-700">
            <span className="text-base font-medium">Raised</span>
            <span className="text-right text-lg font-semibold text-zinc-900">
              {formatCurrency(progress.gift)} / {formatCurrency(target)}
            </span>
          </div>
          <div
            className="h-4 overflow-hidden rounded-full bg-zinc-200"
            role="progressbar"
            aria-label="Lambda Lau fundraiser progress"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(percentage)}
          >
            <div
              className="h-full rounded-full bg-primary transition-all duration-500"
              style={{ width: `${percentage}%` }}
            />
          </div>
          <p className="mt-2 text-right text-sm text-zinc-500">
            {Math.round(percentage)}% of goal
          </p>
        </div>

        <div className="mt-8 w-full flex-col">
          <a
            className="w-full inline-flex items-center justify-center rounded-full bg-primary px-8 py-3 text-base font-semibold text-white transition-colors hover:bg-primary-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            href="https://donate.stripe.com/7sYeV60od9mF1nQ6Ki8Zq00"
          >
            Donate Now
          </a>
          <p className="mt-2 text-left text-sm text-zinc-500">
            All direct donations will go entirely to the gift and event fees,
            please contact us if you wish for your donation to be allocated
            differently.
          </p>
        </div>

        <dl className="mt-6 grid grid-cols-1 gap-4 text-left sm:grid-cols-3">
          <div className="border-t border-zinc-200 pt-3">
            <dt className="text-sm text-zinc-500">Prize pool</dt>
            <dd className="mt-1 text-xl font-semibold text-zinc-900">
              {formatCurrency(progress.prize)}
            </dd>
          </div>
          <div className="border-t border-zinc-200 pt-3">
            <dt className="text-sm text-zinc-500">Library gift</dt>
            <dd className="mt-1 text-xl font-semibold text-zinc-900">
              {formatCurrency(progress.gift)}
            </dd>
          </div>
          <div className="border-t border-zinc-200 pt-3">
            <dt className="text-sm text-zinc-500">Event fees</dt>
            <dd className="mt-1 text-xl font-semibold text-zinc-900">
              {formatCurrency(progress.fees)}
            </dd>
          </div>
        </dl>
      </div>
    </Container>
  );
}
