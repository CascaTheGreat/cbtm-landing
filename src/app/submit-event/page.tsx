import Container from "@/components/Container";
import EventForm from "@/components/EventForm";
import OTP from "@/components/OTP";
import { createClient } from "@/lib/supabase/supabaseServer";
import { getCurrentUser } from "../auth/actions";

export default async function SubmitEvent() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { id, name, type } = await getCurrentUser(user?.id);
  const isLoggedIn = Boolean(name);
  console.log("User info:", { id, name, type, isLoggedIn });

  return (
    <Container className="pt-32 pb-16 lg:pt-40 lg:pb-24">
      {isLoggedIn && type == "organization" ? (
        <EventForm userId={parseInt(id)} />
      ) : (
        <div className="mx-auto w-full max-w-3xl rounded-[2rem] border border-[#d8daf5] bg-[var(--background)] p-6 text-[var(--foreground)] shadow-[0_24px_80px_rgba(1,0,87,0.08)] sm:p-8 lg:p-10">
          <h1 className="mb-4 text-4xl">Submit Your Event</h1>
          <p className="text-[var(--foreground-accent)]">
            Please sign in before submitting an event.
          </p>
          <button className="mt-4 rounded-lg bg-[var(--primary)] px-4 py-2 text-white hover:bg-[var(--primary-dark)]">
            <p>Login</p>
          </button>
        </div>
      )}
    </Container>
  );
}
