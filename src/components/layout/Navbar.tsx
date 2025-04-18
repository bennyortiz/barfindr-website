/**
 * Navbar Component
 * 
 * Main navigation bar for the BarFindr application.
 * Includes responsive mobile menu, search functionality, and navigation links.
 * 
 * @component
 */

"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState, useEffect, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/container";
import { themeConfig } from "@/lib/theme-config";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Handle scroll event to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when clicking outside or pressing escape
  useEffect(() => {
    if (!isMenuOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.mobile-menu') && !target.closest('.menu-button')) {
        setIsMenuOpen(false);
      }
    };

    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    document.addEventListener('keydown', handleEscapeKey);
    
    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isMenuOpen]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      // Save the current scroll position
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
    } else {
      // Restore the scroll position
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }
    return () => {
      // Clean up in case component unmounts while menu is open
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
    };
  }, [isMenuOpen]);

  /**
   * Handles search form submission
   * @param e - Form event
   */
  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/bars?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
      setIsMenuOpen(false);
    }
  };

  return (
    <header className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${scrolled ? 'bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 shadow-sm' : 'bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/70'}`}>
      <Container className="flex h-16 items-center">
        <div className="flex items-center justify-between w-full md:w-auto">
          <Link href="/" className="flex items-center space-x-2 z-50">
            <motion.span
              className="text-lg sm:text-xl font-bold text-primary"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              BarFindr
            </motion.span>
          </Link>
          <motion.button
            className="inline-flex items-center justify-center rounded-full p-2 text-foreground md:hidden menu-button z-50 hover:bg-primary/10 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileTap={{ scale: 0.85 }}
            whileHover={{ scale: 1.05, backgroundColor: "rgba(236, 72, 153, 0.15)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <span className="sr-only">Open main menu</span>
            <AnimatePresence mode="wait" initial={false}>
              {isMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                  transition={{
                    duration: 0.3,
                    type: "spring",
                    stiffness: 300,
                    damping: 22
                  }}
                >
                  <X className="h-6 w-6 text-primary" aria-hidden="true" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
                  transition={{
                    duration: 0.3,
                    type: "spring",
                    stiffness: 300,
                    damping: 22
                  }}
                >
                  <Menu className="h-6 w-6" aria-hidden="true" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium ml-6">
          <Link href="/bars" className="transition-colors hover:text-primary relative group">
            Bars
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link href="/map" className="transition-colors hover:text-primary relative group">
            Map
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link href="/happy-hours" className="transition-colors hover:text-primary relative group">
            Happy Hours
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </nav>

        <div className="hidden md:flex flex-1 items-center justify-end space-x-4">
          <div className="w-auto">
            <form onSubmit={handleSearch}>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search bars..."
                  className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[300px] transition-all focus:border-primary"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </form>
          </div>
          <Button variant="default" size="sm" className="transition-all hover:bg-primary/90">
            Sign In
          </Button>
        </div>
      </Container>

      {/* Mobile menu with animation */}
      <AnimatePresence mode="wait">
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-background/95 backdrop-blur-md z-40 md:hidden mobile-menu flex flex-col"
            initial={{ opacity: 0, height: 0, y: -20 }}
            animate={{ opacity: 1, height: "100vh", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -20 }}
            transition={{
              duration: 0.4,
              ease: [0.22, 1, 0.36, 1], // Custom cubic-bezier for smooth animation
              height: { duration: 0.4 }
            }}
          >
            <div className="flex-1 flex flex-col justify-center px-4 py-8 overflow-y-auto">
              <motion.nav
                className="flex flex-col space-y-6 text-center"
                initial="closed"
                animate="open"
                variants={{
                  open: {
                    transition: { staggerChildren: 0.08, delayChildren: 0.15 }
                  },
                  closed: {
                    transition: { staggerChildren: 0.05, staggerDirection: -1 }
                  }
                }}
              >
                <motion.div
                  variants={{
                    open: { y: 0, opacity: 1, scale: 1 },
                    closed: { y: 30, opacity: 0, scale: 0.9 }
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 24 }}
                >
                  <Link
                    href="/bars"
                    className="block text-2xl font-medium text-foreground hover:text-primary transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Bars
                  </Link>
                </motion.div>
                <motion.div
                  variants={{
                    open: { y: 0, opacity: 1, scale: 1 },
                    closed: { y: 30, opacity: 0, scale: 0.9 }
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 24 }}
                >
                  <Link
                    href="/map"
                    className="block text-2xl font-medium text-foreground hover:text-primary transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Map
                  </Link>
                </motion.div>
                <motion.div
                  variants={{
                    open: { y: 0, opacity: 1, scale: 1 },
                    closed: { y: 30, opacity: 0, scale: 0.9 }
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 24 }}
                >
                  <Link
                    href="/happy-hours"
                    className="block text-2xl font-medium text-foreground hover:text-primary transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Happy Hours
                  </Link>
                </motion.div>
              </motion.nav>

              <motion.div
                className="mt-12 space-y-4 px-4 sm:px-12"
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.4, type: "spring", stiffness: 200, damping: 20 }}
              >
                <form onSubmit={handleSearch}>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search bars..."
                      className="w-full rounded-full bg-background/50 border-primary/20 pl-10 py-6 text-base"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </form>
                <Button variant="default" className="w-full rounded-full py-6 mt-4 text-base">
                  Sign In
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
