"use client";
import Container from "@/components/Container";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/supabaseClient";
import { updateUserLambdaLauStatus } from "@/app/actions/stripe";

export default function DonatePage(): JSX.Element {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  const handleSuccessfulPayment = async (userId: string) => {
    try {
      await updateUserLambdaLauStatus(userId as string);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const sessionIdParam = urlParams.get("session_id");
    const userIdParam = urlParams.get("user_id");
    console.log("Session ID:", sessionIdParam);
    console.log("User ID:", userIdParam);
    setSessionId(sessionIdParam);
    setUserId(userIdParam);
    if (sessionIdParam && userIdParam) {
      console.log("Payment successful for user ID:", userIdParam);
      handleSuccessfulPayment(userIdParam);
    }
  }, []);

  if (sessionId) {
    return (
      <Container className="pt-32 pb-16 lg:pt-40 lg:pb-24">
        <h1>Test succesful payments</h1>
      </Container>
    );
  } else {
    return (
      <Container className="pt-32 pb-16 lg:pt-40 lg:pb-24">
        <h1>Test failed payments</h1>
      </Container>
    );
  }
}
