import Container from "@/components/Container";
import { createClient } from "@/lib/supabase/supabaseServer";
import { getUserInfoById, type UserInfo, signOut } from "../auth/actions";
import { LogoutButton } from "@/components/LogoutButton";
import EventList from "@/components/EventsList";

export default async function AccountPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <Container className="pt-32 pb-16 lg:pt-40 lg:pb-24">
        <div className="mx-auto w-full max-w-3xl rounded-[2rem] border border-[#d8daf5] bg-[var(--background)] p-6 text-[var(--foreground)] shadow-[0_24px_80px_rgba(1,0,87,0.08)] sm:p-8 lg:p-10">
          <h1 className="mb-4 text-4xl">Account</h1>
          <p className="text-[var(--foreground-accent)]">
            Please sign in to view your account information.
          </p>
        </div>
      </Container>
    );
  }

  const userInfo: UserInfo = await getUserInfoById(user.id);

  return (
    <Container className="pt-32 pb-16 lg:pt-40 lg:pb-24">
      <div className="relative mx-auto w-full max-w-3xl rounded-[2rem] border border-[#d8daf5] bg-[var(--background)] p-6 text-[var(--foreground)] shadow-[0_24px_80px_rgba(1,0,87,0.08)] sm:p-8 lg:p-10">
        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <h1 className="mb-2 text-4xl">{userInfo.name}</h1>
            <p>Account Type: {userInfo.type}</p>
            <p className="text-[var(--foreground-accent)]">{userInfo.status}</p>
          </div>
          <img
            className="h-32 w-32 rounded-[1.8rem] object-cover"
            src={userInfo.custom_image}
          />
        </div>
        <div className="mt-4 flex flex-col gap-1">
          <p>Lifetime Points: {userInfo.lifetime_points}</p>
          <p>Monthly Points: {userInfo.monthly_points}</p>
          <p>In Fence: {userInfo.in_fence}</p>
        </div>
        <div className="mt-4 list-disc">
          <p>Email: {user.email}</p>
          <label className="ml-2">
            <input type="checkbox" checked={userInfo.visible} readOnly />
            Visible
          </label>
        </div>
        <div>
          <h2 className="mb-2 text-4xl">Your Upcoming Events</h2>
          <EventList userId={userInfo.id} />
        </div>
        <LogoutButton />
      </div>
    </Container>
  );
}
