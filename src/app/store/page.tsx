"use client";
import Container from "@/components/Container";
import { Suspense } from "react";
import { useEffect } from "react";

export default function ShareYourCbtmoment() {
  useEffect(() => {
    window.location.href = "https://cbtm.printful.me/";
  }, []);

  return (
    <Container className="pt-32 pb-16 lg:pt-40 lg:pb-24">
      <Suspense fallback={<div>Loading...</div>}></Suspense>
    </Container>
  );
}
