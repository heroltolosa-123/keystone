export const QUOTE_EVENT = "keystone:quote";

/** Prefill the quote form with an item and bring it into view. */
export function requestQuote(item: string) {
  window.dispatchEvent(new CustomEvent<string>(QUOTE_EVENT, { detail: item }));
  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
}

export type Fields = { name: string; org: string; email: string; phone: string; items: string; message: string };
export type Errors = Partial<Record<keyof Fields, string>>;

export function validate(f: Fields): Errors {
  const e: Errors = {};
  if (!f.name.trim()) e.name = "Enter your name so we know who to reply to.";
  if (!f.org.trim()) e.org = "Enter your co-op, company, or project.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim())) e.email = "Enter a valid email address, like name@coop.ph.";
  if (f.phone.trim() && !/^[+\d][\d\s()-]{6,}$/.test(f.phone.trim()))
    e.phone = "Use digits only, e.g. 0917 123 4567.";
  if (f.message.trim().length < 10) e.message = "Add quantities, specs, or a delivery site (at least 10 characters).";
  return e;
}
