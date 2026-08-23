import type { Metadata } from "next";
import CheckoutForm from "@/components/CheckoutForm";
import Container from "@/components/Container";

export const metadata: Metadata = {
  title: "Donate with hosted Checkout | Next.js + TypeScript Example",
};

export default function DonatePage(): JSX.Element {
  return (
    <Container className="pt-32 pb-16 lg:pt-40 lg:pb-24">
      <h1>Donate with hosted Checkout</h1>
      <p>Donate to our project 💖</p>
      <CheckoutForm />
    </Container>
  );
}
