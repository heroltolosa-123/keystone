"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown, Menu, X } from "lucide-react";
import { productGroups, services } from "@/lib/content";

type NavItem = { href: string; label: string; children?: { href: string; label: string }[] };

const nav: NavItem[] = [
  { href: "#top", label: "Home" },
  { href: "#about", label: "About" },
  {
    href: "#services",
    label: "Services",
    children: services.map((s) => ({ href: `#service-${s.id}`, label: s.title })),
  },
  {
    href: "#products",
    label: "Products",
    children: productGroups.map((g) => ({ href: `#products-${g.id}`, label: g.name })),
  },
  { href: "#clients", label: "Clients" },
  { href: "#contact", label: "Contact" },
];

const sectionIds = ["top", "grid", "services", "products", "klein", "about", "clients", "contact"];
const navFor: Record<string, string> = { grid: "#services", klein: "#products" };

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [drop, setDrop] = useState<string | null>(null);
  const [active, setActive] = useState("#top");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(navFor[e.target.id] ?? `#${e.target.id}`);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    }
    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        setDrop(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-500 ${
        scrolled || open
          ? "border-b border-white/10 bg-ink/75 backdrop-blur-xl backdrop-saturate-150"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-18 max-w-[88rem] items-center justify-between gap-6 px-4 sm:px-8">
        <a href="#top" className="flex items-center gap-3" aria-label="Keystone Electrical Supply Corp., home">
          <Image src="/images/keystone-logo.png" alt="" width={62} height={35} priority className="h-8 w-auto" />
          <span className="leading-none">
            <span className="block text-[15px] font-extrabold tracking-wide [font-stretch:125%]">KEYSTONE</span>
            <span className="block text-[10.5px] tracking-[0.2em] text-muted">ELECTRICAL SUPPLY</span>
          </span>
        </a>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => (
              <li
                key={item.href}
                className="relative"
                onMouseEnter={() => item.children && setDrop(item.href)}
                onMouseLeave={() => setDrop(null)}
              >
                <div className="flex items-center">
                  <a
                    href={item.href}
                    aria-current={active === item.href ? "location" : undefined}
                    className={`relative px-3 py-2 text-sm font-medium transition-colors ${
                      active === item.href ? "text-text" : "text-muted hover:text-text"
                    }`}
                  >
                    {item.label}
                    {active === item.href && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-x-3 -bottom-0.5 h-px bg-cyan shadow-[0_0_12px_2px_rgba(69,225,255,0.6)]"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                  </a>
                  {item.children && (
                    <button
                      type="button"
                      aria-expanded={drop === item.href}
                      aria-label={`${item.label} menu`}
                      onClick={() => setDrop(drop === item.href ? null : item.href)}
                      className="-ml-2 p-1 text-muted hover:text-text"
                    >
                      <ChevronDown
                        className={`size-3.5 transition-transform duration-300 ${drop === item.href ? "rotate-180" : ""}`}
                      />
                    </button>
                  )}
                </div>
                <AnimatePresence>
                  {item.children && drop === item.href && (
                    <motion.ul
                      initial={{ opacity: 0, y: -6, filter: "blur(4px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      exit={{ opacity: 0, y: -4, filter: "blur(4px)" }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute left-0 top-full min-w-64 rounded-lg border border-white/10 bg-night/95 p-2 shadow-[0_24px_48px_-12px_rgba(0,0,0,0.7)] backdrop-blur-xl"
                    >
                      {item.children.map((c) => (
                        <li key={c.href}>
                          <a
                            href={c.href}
                            onClick={() => setDrop(null)}
                            className="block rounded-md px-3 py-2.5 text-sm text-muted transition-colors hover:bg-white/5 hover:text-text"
                          >
                            {c.label}
                          </a>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#contact"
            className="hidden rounded-full bg-volt px-5 py-2.5 text-sm font-bold text-ink transition-[background-color,box-shadow] hover:bg-white hover:shadow-[0_8px_30px_-6px_rgba(232,242,58,0.55)] sm:inline-block"
          >
            Request a Quote
          </a>
          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid size-11 place-items-center rounded-full border border-white/15 lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-nav"
            aria-label="Mobile"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="h-[calc(100dvh-4.5rem)] overflow-y-auto bg-ink px-4 pb-10 sm:px-8 lg:hidden"
          >
            <ul className="divide-y divide-white/10 border-t border-white/10">
              {nav.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 * i + 0.1, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="display block py-5 text-3xl"
                  >
                    {item.label}
                  </a>
                  {item.children && (
                    <ul className="-mt-2 pb-4">
                      {item.children.map((c) => (
                        <li key={c.href}>
                          <a href={c.href} onClick={() => setOpen(false)} className="block py-1.5 text-muted">
                            {c.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </motion.li>
              ))}
            </ul>
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-8 block rounded-full bg-volt py-4 text-center font-bold text-ink"
            >
              Request a Quote
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
