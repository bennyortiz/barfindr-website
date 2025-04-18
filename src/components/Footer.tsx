import Link from "next/link";
import { Container } from "@/components/ui/container";

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <Container className="flex flex-col items-center justify-between gap-4 py-8 md:py-10 md:flex-row">
        <div className="flex flex-col items-center gap-4 md:flex-row md:gap-2 md:items-start">
          <p className="text-center text-xs sm:text-sm leading-loose text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} BarFindr. All rights reserved.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
          <Link
            href="/about"
            className="text-xs sm:text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="text-xs sm:text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Contact
          </Link>
          <Link
            href="/privacy"
            className="text-xs sm:text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Privacy
          </Link>
          <Link
            href="/terms"
            className="text-xs sm:text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Terms
          </Link>
        </div>
      </Container>
    </footer>
  );
}
