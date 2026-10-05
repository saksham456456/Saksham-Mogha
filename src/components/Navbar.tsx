"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { site } from "../../content/site";
import { CommandPalette } from "./CommandPalette";

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setIsOpen(false), [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-black/60 backdrop-blur-xl border-b border-white/10" : "bg-black/20 backdrop-blur-md border-b border-transparent"
      }`}
    >
      <nav aria-label="Main" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between transition-all duration-500 ${scrolled ? "h-16" : "h-20"}`}>
          <Link href="/" className="text-white font-bold text-2xl tracking-tighter" aria-label={`${site.name}, home`}>
            SAKSHAM<span className="text-indigo-500">.DEV</span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {site.nav.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`relative px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    active ? "text-white" : "text-gray-300 hover:text-white"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-white/10 border border-white/10"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative">{link.label}</span>
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <CommandPalette />
            <button
              type="button"
              onClick={() => setIsOpen((v) => !v)}
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-white hover:bg-white/10"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="md:hidden absolute w-full bg-black/95 backdrop-blur-xl border-b border-white/10"
          >
            <div className="px-3 pt-2 pb-4 space-y-1">
              {site.nav.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className={`block px-4 py-3 rounded-xl text-base font-medium ${
                    isActive(link.href) ? "text-white bg-white/10" : "text-gray-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
