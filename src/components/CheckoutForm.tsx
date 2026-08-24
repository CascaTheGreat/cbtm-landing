"use client";

import { createCheckoutSession } from "@/app/actions/stripe";

export default function CheckoutForm(userId: { userId: string }): JSX.Element {
  const formAction = async (data: FormData): Promise<void> => {
    const { url } = await createCheckoutSession(data);
    window.location.assign(url as string);
  };

  return (
    <form
      action={formAction}
      className="mt-8 flex flex-col items-center justify-center gap-4"
    >
      <input type="hidden" name="uiMode" value="hosted" />
      <input type="hidden" name="userId" value={userId.userId} />
      <button
        type="submit"
        className="rounded-lg bg-[#010057] px-8 py-4 text-white hover:bg-blue-600"
      >
        Buy Your Ticket
      </button>
    </form>
  );
}
