import { createClient } from "@/lib/supabase/supabaseServer";

const regPrice = 20;
const eventFees = process.env.NEXT_PUBLIC_EVENT_FEES
  ? parseFloat(process.env.NEXT_PUBLIC_EVENT_FEES)
  : 0;
const calculateRevenue = (num: number) => {
  //  registrants * (price - processing fee)
  // Stripe processing fee: 2.9% + $0.30
  return num * (regPrice - (regPrice * 0.029 + 0.3));
};

const calculatePool = (num: number) => {
  const revenue = calculateRevenue(num);
  //  revenue - event fees split between prize pool and gift to lau
  return (revenue - eventFees) / 2;
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

async function calculateProgress() {
  // Create a supabase client
  const client = await createClient();
  // Query the number of records in users where lambda_lau is true
  const count = await client
    .from("users")
    .select("*", { count: "exact", head: true })
    .eq("lambda_lau", true);
  if (count.error) {
    throw new Error(count.error.message);
  } else {
    const poolAmount = calculatePool(count.count ?? 0);
    const progress = {
      prize: poolAmount,
      gift: poolAmount,
      fees: eventFees,
    };
    return progress;
  }
}

export { calculateRevenue, calculatePool, formatCurrency, calculateProgress };
