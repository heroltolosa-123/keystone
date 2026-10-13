"use client";

import { useEffect, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, Copy, Mail, MessageCircle, TriangleAlert } from "lucide-react";
import { company } from "@/lib/content";
import { QUOTE_EVENT, requestQuote, validate, type Errors, type Fields } from "@/lib/quote";

const empty: Fields = { name: "", org: "", email: "", phone: "", items: "", message: "" };

function compose(f: Fields) {
  const subject = `Quote request: ${f.org.trim()}`;
  const head = [
    `Name: ${f.name.trim()}`,
    `Organization: ${f.org.trim()}`,
    `Email: ${f.email.trim()}`,
    f.phone.trim() && `Phone: ${f.phone.trim()}`,
    f.items.trim() && `Items / services: ${f.items.trim()}`,
  ].filter(Boolean);
  return { subject, body: `${head.join("\n")}\n\n${f.message.trim()}` };
}

const label = "block text-sm font-semibold text-text";
const input =
  "mt-2 block w-full rounded-lg border bg-ink/60 px-4 py-3 text-text placeholder:text-muted/70 transition-[border-color,box-shadow] focus:outline-none focus:ring-4";

function Field({
  id,
  text,
  error,
  hint,
  children,
}: {
  id: string;
  text: string;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className={label}>
        {text}
        {hint && <span className="ml-2 font-normal text-muted">{hint}</span>}
      </label>
      {children}
      <AnimatePresence initial={false}>
        {error && (
          <motion.p
            id={`${id}-error`}
            initial={{ opacity: 0, height: 0, y: -4 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-1.5 overflow-hidden pt-2 text-sm text-[#ff9b8a]"
          >
            <TriangleAlert className="size-3.5 shrink-0" /> {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function QuoteForm() {
  const [f, setF] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState<{ subject: string; body: string } | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const onQuote = (e: Event) => {
      const item = (e as CustomEvent<string>).detail;
      setSent(null);
      setF((prev) => {
        const list = prev.items.split(",").map((s) => s.trim()).filter(Boolean);
        return list.includes(item) ? prev : { ...prev, items: [...list, item].join(", ") };
      });
    };
    window.addEventListener(QUOTE_EVENT, onQuote);
    return () => window.removeEventListener(QUOTE_EVENT, onQuote);
  }, []);

  const set = (k: keyof Fields) => (e: { target: { value: string } }) => {
    setF({ ...f, [k]: e.target.value });
    if (errors[k]) setErrors({ ...errors, [k]: undefined });
  };

  const ring = (k: keyof Fields) =>
    errors[k]
      ? "border-[#ff9b8a] focus:ring-[#ff9b8a]/20"
      : "border-white/12 hover:border-white/25 focus:border-cyan focus:ring-cyan/15";

  const a11y = (k: keyof Fields) => ({
    "aria-invalid": errors[k] ? true : undefined,
    "aria-describedby": errors[k] ? `${k}-error` : undefined,
  });

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const errs = validate(f);
    setErrors(errs);
    const first = Object.keys(errs)[0];
    if (first) {
      document.getElementById(first)?.focus();
      return;
    }
    const msg = compose(f);
    setSent(msg);
    window.location.href = `mailto:${company.email}?subject=${encodeURIComponent(msg.subject)}&body=${encodeURIComponent(msg.body)}`;
  }

  async function copy() {
    if (!sent) return;
    try {
      await navigator.clipboard.writeText(`${sent.subject}\n\n${sent.body}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      setCopied(false);
    }
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      {sent ? (
        <motion.div
          key="sent"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-2xl border border-cyan/30 bg-cyan/[0.06] p-8"
          role="status"
        >
          <span className="grid size-12 place-items-center rounded-full bg-cyan/15 text-cyan">
            <Mail className="size-5" />
          </span>
          <h3 className="mt-5 text-2xl font-bold">Your request is ready in your email app.</h3>
          <p className="mt-3 leading-relaxed text-muted">
            We opened a pre-filled email to {company.email}. Nothing has been sent yet: review it and press Send in
            your email app. If no window opened, send the same message by WhatsApp or copy it.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={`https://wa.me/${company.whatsapp}?text=${encodeURIComponent(`${sent.subject}\n\n${sent.body}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-volt px-5 py-3 text-sm font-bold text-ink hover:bg-white"
            >
              <MessageCircle className="size-4" /> Send by WhatsApp
            </a>
            <button
              type="button"
              onClick={copy}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-sm font-semibold hover:border-white/50"
            >
              {copied ? <Check className="size-4 text-leaf" /> : <Copy className="size-4" />}
              {copied ? "Copied" : "Copy message"}
            </button>
            <button
              type="button"
              onClick={() => setSent(null)}
              className="px-2 py-3 text-sm text-muted underline underline-offset-4 hover:text-text"
            >
              Edit request
            </button>
          </div>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onSubmit={onSubmit}
          noValidate
          id="quote-form"
          className="grid gap-5 sm:grid-cols-2"
        >
          <Field id="name" text="Your name" error={errors.name}>
            <input id="name" autoComplete="name" value={f.name} onChange={set("name")} className={`${input} ${ring("name")}`} {...a11y("name")} />
          </Field>
          <Field id="org" text="Co-op or company" error={errors.org}>
            <input id="org" autoComplete="organization" value={f.org} onChange={set("org")} className={`${input} ${ring("org")}`} {...a11y("org")} />
          </Field>
          <Field id="email" text="Email" error={errors.email}>
            <input id="email" type="email" autoComplete="email" value={f.email} onChange={set("email")} className={`${input} ${ring("email")}`} {...a11y("email")} />
          </Field>
          <Field id="phone" text="Phone" hint="optional" error={errors.phone}>
            <input id="phone" type="tel" autoComplete="tel" value={f.phone} onChange={set("phone")} className={`${input} ${ring("phone")}`} {...a11y("phone")} />
          </Field>
          <div className="sm:col-span-2">
            <Field id="items" text="Products or services" hint="optional">
              <input
                id="items"
                value={f.items}
                onChange={set("items")}
                placeholder="e.g. Steel poles, distribution transformers"
                className={`${input} ${ring("items")}`}
              />
            </Field>
          </div>
          <div className="sm:col-span-2">
            <Field id="message" text="Details" error={errors.message}>
              <textarea
                id="message"
                rows={5}
                value={f.message}
                onChange={set("message")}
                placeholder="Quantities, specifications, delivery site, and when you need it."
                className={`${input} ${ring("message")} resize-y`}
                {...a11y("message")}
              />
            </Field>
          </div>
          <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted">Opens your email app with the request filled in. You press Send.</p>
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-volt px-7 py-3.5 font-bold text-ink transition-[background-color,box-shadow] hover:bg-white hover:shadow-[0_10px_34px_-8px_rgba(232,242,58,0.6)]"
            >
              <Mail className="size-4" /> Prepare quote email
            </button>
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  );
}

export function QuoteButton({ item, className, children }: { item: string; className?: string; children: React.ReactNode }) {
  return (
    <button type="button" onClick={() => requestQuote(item)} className={className}>
      {children}
    </button>
  );
}
