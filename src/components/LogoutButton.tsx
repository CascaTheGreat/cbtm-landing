"use client";
import { signOut } from "@/app/auth/actions";
export const LogoutButton: React.FC = () => {
  const handleLogout = async () => {
    try {
      await signOut();
      // Optionally, you can redirect the user to the login page after logout
      // window.location.href = "/login";
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="mt-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
    >
      Sign Out
    </button>
  );
};
