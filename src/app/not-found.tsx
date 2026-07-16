import Container from "@/components/Container";

function NotFound() {
  return (
    <Container className="flex min-h-[70vh] items-center justify-center pt-32 pb-16 lg:pt-40 lg:pb-24">
      <div className="max-w-xl text-center">
        <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-zinc-500">
          404
        </p>
        <h1 className="text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl">
          Where&apos;s the party?
        </h1>
        <p className="mt-4 text-base leading-7 text-zinc-600 sm:text-lg">
          Sorry, we couldn&apos;t find the page you were looking for.
        </p>
      </div>
    </Container>
  );
}

export default NotFound;
