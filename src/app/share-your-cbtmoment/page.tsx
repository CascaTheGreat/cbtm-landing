import Container from "@/components/Container";
import Form from "@/components/Form";
import { Suspense } from "react";

export default function ShareYourCbtmoment() {
  return (
    <Container className="pt-32 pb-16 lg:pt-40 lg:pb-24">
      <Suspense fallback={<div>Loading...</div>}>
        <Form />
      </Suspense>
    </Container>
  );
}
