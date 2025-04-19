import Link from "next/link";
import { Button } from "@/core/components/ui/button";
import { Navbar, Footer } from "@/core/components/layout";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center">
        <div className="container flex flex-col items-center justify-center gap-6 text-center">
          <h1 className="text-6xl font-bold text-primary">404</h1>
          <h2 className="text-3xl font-bold">Page Not Found</h2>
          <p className="max-w-md text-muted-foreground">
            Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been moved or doesn&apos;t exist.
          </p>
          <Button asChild>
            <Link href="/">Go Back Home</Link>
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
