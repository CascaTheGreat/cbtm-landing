// Partial of app/actions/stripe.ts
"use server";

import Stripe from "stripe";
import { formatAmountForStripe } from "@/lib/stripe/stripe-helpers";
import { createClient } from "@/lib/supabase/supabaseServer";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function createCheckoutSession(
  data: FormData,
): Promise<{ client_secret: string | null; url: string | null }> {
  const userId = data.get("userId") as string;
  const checkoutSession: Stripe.Checkout.Session =
    await stripe.checkout.sessions.create({
      mode: "payment",
      submit_type: "donate",
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "usd",
            product_data: { name: "Lambda Lau Entry Ticket" },
            unit_amount: formatAmountForStripe(20, "usd"),
          },
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/lambda-lau/result?session_id={CHECKOUT_SESSION_ID}&user_id=${userId}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/lambda-lau`,
    });

  return {
    client_secret: checkoutSession.client_secret,
    url: checkoutSession.url,
  };
}

export async function updateUserLambdaLauStatus(userId: string): Promise<void> {
  console.log("Updating user with ID:", userId);
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("users")
    .update({ lambda_lau: true })
    .eq("id", userId);

  if (error) {
    console.error("Error updating user:", error);
  } else {
    console.log("User updated successfully:", data);
  }
}
