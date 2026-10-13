import Image from "next/image";
import { ArrowRight, ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import Header from "@/components/Header";
import HeroGrid from "@/components/HeroGrid";
import GridExplorer from "@/components/GridExplorer";
import QuoteForm, { QuoteButton } from "@/components/QuoteForm";
import { Counter, Magnetic, RevealObserver } from "@/components/Motion";
import {
  brands,
  clients,
  company,
  kleinLeadTime,
  kleinProducts,
  productGroups,
  services,
  stats,
  timeline,
} from "@/lib/content";

const wrap = "mx-auto w-full max-w-[88rem] px-4 sm:px-8";
const h2 = "display text-[clamp(2.25rem,5.2vw,4.5rem)]";
const totalDays = kleinLeadTime.reduce((s, x) => s + x.days, 0);

function Words({ text, start = 0 }: { text: string; start?: number }) {
  return text.split(" ").map((w, i) => (
    <span key={i} className="energize mr-[0.22em]" style={{ "--d": `${start + i * 90}ms` } as React.CSSProperties}>
      {w}
    </span>
  ));
}

export default function Home() {
  return (
    <>
      <RevealObserver />
      <Header />
      <main id="main">
        {/* HERO */}
        <section id="top" className="relative isolate flex min-h-[100svh] flex-col overflow-hidden">
          <HeroGrid />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,#040917_0%,rgba(4,9,23,0.82)_34%,rgba(4,9,23,0.1)_70%)] max-md:bg-[linear-gradient(180deg,rgba(4,9,23,0.1)_0%,rgba(4,9,23,0.55)_45%,rgba(4,9,23,0.9)_80%,#040917_100%)]" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-ink to-transparent" />

          <div className={`${wrap} relative flex flex-1 flex-col justify-end pb-10 pt-32 sm:pb-12`}>
            <h1 className="display max-w-[16ch] text-[clamp(1.75rem,8.2vw,5.75rem)]">
              <span className="block [text-wrap:balance]">
                <Words text="Equipping the grid." />
              </span>
              <span className="block text-cyan [text-wrap:balance]">
                <Words text="Connecting communities." start={300} />
              </span>
            </h1>
            <p
              className="energize mt-7 max-w-[54ch] text-lg leading-relaxed text-muted sm:text-xl"
              style={{ "--d": "700ms" } as React.CSSProperties}
            >
              Keystone imports the steel poles, transformers, testing equipment and lineman&rsquo;s tools that
              Philippine electric cooperatives run on, then installs, tests and maintains the substations and lines
              they power.
            </p>
            <div className="energize mt-9 flex flex-wrap gap-3" style={{ "--d": "850ms" } as React.CSSProperties}>
              <Magnetic
                href="#grid"
                className="group inline-flex items-center gap-2 rounded-full bg-volt px-7 py-4 font-bold text-ink shadow-[0_12px_40px_-10px_rgba(232,242,58,0.55)] transition-colors hover:bg-white"
              >
                Explore our services
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Magnetic>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-4 font-semibold backdrop-blur-sm transition-colors hover:border-cyan hover:text-cyan"
              >
                Request a quote
              </a>
            </div>

            <dl className="mt-16 grid grid-cols-2 border-t border-white/12 lg:grid-cols-4">
              {stats.map((s, i) => (
                <div
                  key={s.label}
                  className={`py-6 pr-6 ${i % 2 ? "pl-6 border-l border-white/12" : ""} ${i > 0 ? "lg:border-l lg:border-white/12 lg:pl-6" : ""} ${i > 1 ? "max-lg:border-t max-lg:border-white/12" : ""}`}
                >
                  <dd className="display text-4xl sm:text-5xl">
                    <Counter value={s.value} format={s.format} />
                  </dd>
                  <dt className="mt-2 max-w-[24ch] text-sm text-muted">{s.label}</dt>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* BRANDS */}
        <section aria-label="Brands we source" className="border-y border-white/10 bg-night/60 py-6">
          <div className="flex items-center gap-8 overflow-hidden">
            <p className="shrink-0 pl-4 text-sm font-semibold text-text sm:pl-8">
              Sourced direct
              <br className="hidden sm:block" /> from the maker
            </p>
            <div className="relative flex-1 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
              <ul className="marquee flex w-max gap-12">
                {[...brands, ...brands].map((b, i) => (
                  <li
                    key={i}
                    aria-hidden={i >= brands.length || undefined}
                    className="whitespace-nowrap text-xl font-bold uppercase text-muted/80 [font-stretch:112%]"
                  >
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* GRID EXPLORER */}
        <section id="grid" className="relative py-28 sm:py-36">
          <div className={wrap}>
            <div className="mb-14 grid gap-6 lg:grid-cols-[1.7fr_1fr] lg:items-end lg:gap-14">
              <h2 data-reveal className={h2}>
                Wherever the power goes, our equipment is on the line.
              </h2>
              <p data-reveal style={{ "--d": "120ms" } as React.CSSProperties} className="text-lg leading-relaxed text-muted">
                Follow power from the plant to the consumer. Select a stage to see what we build and what we supply
                there.
              </p>
            </div>
            <div data-reveal style={{ "--d": "200ms" } as React.CSSProperties}>
              <GridExplorer />
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" className="relative border-t border-white/10 py-28 sm:py-36">
          <div className={`${wrap} grid gap-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20`}>
            <div className="lg:sticky lg:top-28 lg:self-start">
              <h2 data-reveal className={h2}>
                We build it, test it, and keep it running.
              </h2>
              <div
                data-reveal
                style={{ "--d": "120ms" } as React.CSSProperties}
                className="relative mt-10 aspect-[4/3] overflow-hidden rounded-2xl border border-white/10"
              >
                <Image
                  src="/images/lineman-testing.webp"
                  alt="Lineman in a hard hat and high-visibility vest testing equipment on a steel structure"
                  fill
                  sizes="(min-width: 1024px) 38vw, 100vw"
                  className="object-cover saturate-[0.8]"
                />
                <div className="absolute inset-0 bg-[linear-gradient(200deg,transparent_40%,rgba(4,9,23,0.85))] mix-blend-normal" />
                <div className="absolute inset-0 bg-cyan/10 mix-blend-color" />
              </div>
            </div>

            <ol className="border-t border-white/12">
              {services.map((s, i) => (
                <li
                  key={s.id}
                  id={`service-${s.id}`}
                  data-reveal
                  style={{ "--d": `${i * 100}ms` } as React.CSSProperties}
                  className="group relative border-b border-white/12 py-10 sm:py-12"
                >
                  <span className="absolute inset-x-0 -top-px h-px origin-left scale-x-0 bg-cyan shadow-[0_0_14px_rgba(69,225,255,0.8)] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" />
                  <h3 className="display text-3xl sm:text-[2.6rem]">{s.title}</h3>
                  <p className="mt-5 max-w-[60ch] text-lg leading-relaxed text-muted">{s.body}</p>
                  <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-text">
                    {s.points.map((p) => (
                      <li key={p} className="flex items-center gap-2">
                        <span className="size-1.5 rounded-full bg-cyan shadow-[0_0_8px_rgba(69,225,255,0.9)]" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* PRODUCTS (light) */}
        <section id="products" className="bg-paper py-28 text-navy-text [color-scheme:light] sm:py-36">
          <div className={wrap}>
            <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:items-end lg:gap-14">
              <h2 data-reveal className={h2}>
                From the pole top to the lineman&rsquo;s belt.
              </h2>
              <p data-reveal style={{ "--d": "120ms" } as React.CSSProperties} className="text-lg leading-relaxed text-slate">
                Over 1,200 product categories, imported through direct manufacturer contact so co-ops get quality
                material at competitive prices. Select any item to add it to a quote request.
              </p>
            </div>

            <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-navy-text/10 bg-navy-text/10 md:grid-cols-2 xl:grid-cols-4">
              {productGroups.map((g, gi) => (
                <div
                  key={g.id}
                  id={`products-${g.id}`}
                  data-reveal
                  style={{ "--d": `${gi * 90}ms` } as React.CSSProperties}
                  className="scroll-mt-28 bg-paper p-7 sm:p-8"
                >
                  <h3 className="text-xl font-extrabold uppercase [font-stretch:115%]">{g.name}</h3>
                  <p className="mt-1 text-sm text-slate">{g.items.length} lines</p>
                  <ul className="mt-6">
                    {g.items.map((item) => (
                      <li key={item} className="border-t border-navy-text/10">
                        <QuoteButton
                          item={item}
                          className="group flex w-full items-center justify-between gap-3 py-3.5 text-left font-medium transition-colors hover:text-cyan-dim focus-visible:text-cyan-dim"
                        >
                          {item}
                          <span className="flex items-center gap-1 text-xs font-semibold text-slate opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 max-md:opacity-100">
                            Quote <ArrowUpRight className="size-3.5" />
                          </span>
                        </QuoteButton>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <p className="mt-8 text-sm text-slate">
              Brands we carry include {brands.slice(0, -1).join(", ")} and {brands.at(-1)}.
            </p>
          </div>
        </section>

        {/* KLEIN IMPORT */}
        <section id="klein" className="relative overflow-hidden py-28 sm:py-36">
          <div className="pointer-events-none absolute -right-40 top-10 size-[42rem] rounded-full bg-[radial-gradient(circle,rgba(141,125,255,0.16),transparent_65%)]" />
          <div className={`${wrap} relative`}>
            <h2 data-reveal className={`${h2} max-w-[18ch]`}>
              Klein Tools, imported straight to your co-op.
            </h2>
            <p data-reveal style={{ "--d": "120ms" } as React.CSSProperties} className="mt-6 max-w-[60ch] text-lg leading-relaxed text-muted">
              We order directly from Klein in Texas, so crews get genuine body belts, straps, climbers and pliers.
              Here is how long that takes, so you can plan the order around your project.
            </p>

            <div data-reveal style={{ "--d": "200ms" } as React.CSSProperties} className="mt-16">
              <div className="flex items-center justify-between text-sm font-semibold">
                <span>Order placed</span>
                <span className="text-volt">Delivered to your warehouse</span>
              </div>
              <div className="mt-3 flex h-3 gap-1">
                {kleinLeadTime.map((s, i) => (
                  <div key={s.step} className="h-full overflow-hidden rounded-full bg-white/8" style={{ flex: s.days }}>
                    <div
                      className={`charge h-full rounded-full ${i === 0 ? "bg-violet" : i === 1 ? "bg-cyan" : "bg-volt"}`}
                      style={{ "--d": `${300 + i * 500}ms` } as React.CSSProperties}
                    />
                  </div>
                ))}
              </div>
              <ol className="mt-6 grid gap-8 md:grid-cols-3">
                {kleinLeadTime.map((s) => (
                  <li key={s.step}>
                    <p className="display text-3xl">{s.time}</p>
                    <p className="mt-1 font-semibold">{s.step}</p>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{s.note}</p>
                  </li>
                ))}
              </ol>
              <p className="mt-6 text-sm text-muted">
                Roughly {Math.round(totalDays / 7)}–{Math.round((totalDays + 21) / 7)} weeks end to end for made-to-order
                items. In-stock items skip manufacturing. Times are typical, not guaranteed.
              </p>
            </div>

            <ul className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-3 lg:grid-cols-6">
              {kleinProducts.map((p, i) => (
                <li key={p.cat} data-reveal style={{ "--d": `${i * 70}ms` } as React.CSSProperties} className="bg-ink">
                  <QuoteButton
                    item={`Klein ${p.name} Cat. No. ${p.cat}`}
                    className="group flex h-full w-full flex-col justify-between gap-6 p-5 text-left transition-colors hover:bg-night sm:p-6"
                  >
                    <span className="font-mono text-xs text-cyan">
                      <span className="block text-muted">Cat. No.</span>
                      <span className="whitespace-nowrap">{p.cat}</span>
                    </span>
                    <span>
                      <span className="block text-lg font-bold">{p.name}</span>
                      <span className="mt-1 flex items-center gap-1 text-xs text-muted group-hover:text-volt">
                        Request quote <ArrowUpRight className="size-3" />
                      </span>
                    </span>
                  </QuoteButton>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="relative border-t border-white/10 py-28 sm:py-36">
          <div className={`${wrap} grid gap-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20`}>
            <figure data-reveal className="relative lg:sticky lg:top-28 lg:self-start">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/10">
                <Image
                  src="/images/lineman-substation.webp"
                  alt="Lineman in an orange high-visibility suit and harness laying out tools beside a power line structure"
                  fill
                  sizes="(min-width: 1024px) 38vw, 100vw"
                  className="object-cover saturate-[0.85]"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(4,9,23,0.9))]" />
              </div>
              <figcaption className="absolute inset-x-6 bottom-6 text-sm text-text/90">
                SEC Reg. No. {company.secRegistration} · Incorporated {company.incorporated}
              </figcaption>
            </figure>

            <div>
              <h2 data-reveal className={h2}>
                Founded by an engineer with 22 years at NEA.
              </h2>
              <div data-reveal style={{ "--d": "120ms" } as React.CSSProperties} className="mt-8 space-y-5 text-lg leading-relaxed text-muted">
                <p>
                  One of our incorporators, Engr. Nelson S. Milo, spent 22 years with the National Electrification
                  Administration, three of them as Officer-in-Charge of its Construction Management Division. He knows
                  co-op work from the inside: substation installation, testing and commissioning, transmission and
                  distribution lines, transformer maintenance, and fast-track projects.
                </p>
                <p>
                  Keystone Electrical Supply Corp. was organized under Philippine law in 2016 and operates its office and
                  equipment warehouse in NAPOCOR Village, Quezon City.
                </p>
              </div>
              <blockquote
                data-reveal
                style={{ "--d": "200ms" } as React.CSSProperties}
                className="mt-10 border-t border-cyan/40 pt-6 text-xl font-semibold leading-snug text-text sm:text-2xl"
              >
                {company.mission}
              </blockquote>
            </div>
          </div>

          <div className={`${wrap} mt-24`}>
            <h3 data-reveal className="text-sm font-bold text-cyan">
              The road to Keystone
            </h3>
            <ol data-reveal className="relative mt-8 grid gap-10 md:grid-cols-5 md:gap-6">
              <span className="charge absolute left-[7px] top-2 h-[calc(100%-1rem)] w-px origin-top bg-gradient-to-b from-cyan to-violet md:left-0 md:top-[7px] md:h-px md:w-full md:origin-left md:bg-gradient-to-r" />
              {timeline.map((t, i) => (
                <li key={t.year} className="relative pl-8 md:pl-0 md:pt-10">
                  <span
                    className={`absolute left-0 top-1 size-[15px] rounded-full border-2 md:top-0 ${
                      t.year === "2016" ? "border-volt bg-volt shadow-[0_0_16px_rgba(232,242,58,0.7)]" : "border-cyan bg-ink"
                    }`}
                    style={{ transitionDelay: `${i * 120}ms` }}
                  />
                  <p className="display text-3xl tnum">{t.year}</p>
                  <p className="mt-2 font-semibold">{t.title}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{t.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* CLIENTS (light) */}
        <section id="clients" className="bg-paper py-28 text-navy-text [color-scheme:light] sm:py-36">
          <div className={wrap}>
            <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:items-end lg:gap-14">
              <h2 data-reveal className={h2}>
                Trusted from Cagayan to Tawi-Tawi.
              </h2>
              <p data-reveal style={{ "--d": "120ms" } as React.CSSProperties} className="text-lg leading-relaxed text-slate">
                27 electric cooperatives, 2 private distribution utilities, and the contractors and traders who build
                with them.
              </p>
            </div>

            <div className="mt-16 grid gap-x-10 gap-y-14 md:grid-cols-2 xl:grid-cols-[1.6fr_1fr_1fr_1fr]">
              {clients.map((g, gi) => (
                <div key={g.region} data-reveal style={{ "--d": `${gi * 90}ms` } as React.CSSProperties}>
                  <div className="flex items-baseline justify-between border-b-2 border-navy-text pb-3">
                    <h3 className="text-xl font-extrabold uppercase [font-stretch:115%]">{g.region}</h3>
                    <span className="display text-3xl tnum">{g.list.length}</span>
                  </div>
                  <ul className={`mt-2 ${g.list.length > 10 ? "sm:columns-2 sm:gap-8" : ""}`}>
                    {g.list.map((c) => (
                      <li key={c.code} className="break-inside-avoid border-b border-navy-text/10 py-2.5">
                        <span className="block font-bold">{c.code}</span>
                        <span className="block text-sm text-slate">{c.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <p className="mt-10 text-sm text-slate">Key clients as listed in our company profile.</p>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="relative overflow-hidden py-28 sm:py-36">
          <div className="pointer-events-none absolute -left-60 bottom-0 size-[48rem] rounded-full bg-[radial-gradient(circle,rgba(69,225,255,0.12),transparent_65%)]" />
          <div className={`${wrap} relative grid gap-16 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20`}>
            <div>
              <h2 data-reveal className={h2}>
                Tell us what the job needs.
              </h2>
              <p data-reveal style={{ "--d": "120ms" } as React.CSSProperties} className="mt-6 max-w-[48ch] text-lg leading-relaxed text-muted">
                Send specifications, quantities and the delivery site. We reply with availability, lead time and
                pricing.
              </p>
              <ul data-reveal style={{ "--d": "200ms" } as React.CSSProperties} className="mt-10 space-y-6">
                <li className="flex gap-4">
                  <MapPin className="mt-1 size-5 shrink-0 text-cyan" />
                  <a href={company.mapsUrl} target="_blank" rel="noopener noreferrer" className="hover:text-cyan">
                    {company.address}
                    <span className="sr-only"> (opens Google Maps)</span>
                  </a>
                </li>
                <li className="flex gap-4">
                  <Mail className="mt-1 size-5 shrink-0 text-cyan" />
                  <a href={`mailto:${company.email}`} className="hover:text-cyan">
                    {company.email}
                  </a>
                </li>
                {company.phones.map((p) => (
                  <li key={p.href} className="flex gap-4">
                    <Phone className="mt-1 size-5 shrink-0 text-cyan" />
                    <span>
                      <a href={p.href} className="tnum font-semibold hover:text-cyan">
                        {p.display}
                      </a>
                      <span className="block text-sm text-muted">{p.label}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div
              data-reveal
              style={{ "--d": "160ms" } as React.CSSProperties}
              className="rounded-3xl border border-white/10 bg-night/70 p-6 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)] backdrop-blur-md sm:p-10"
            >
              <QuoteForm />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 py-12">
        <div className={`${wrap} flex flex-col gap-8 md:flex-row md:items-center md:justify-between`}>
          <div className="flex items-center gap-3">
            <Image src="/images/keystone-logo.png" alt="" width={62} height={35} className="h-8 w-auto" />
            <div className="text-sm">
              <p className="font-bold">{company.name}</p>
              <p className="text-muted">SEC Reg. No. {company.secRegistration}</p>
            </div>
          </div>
          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
              {[
                ["#services", "Services"],
                ["#products", "Products"],
                ["#about", "About"],
                ["#clients", "Clients"],
                ["#contact", "Contact"],
              ].map(([href, label]) => (
                <li key={href}>
                  <a href={href} className="hover:text-text">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <p className="text-sm text-muted">© {new Date().getFullYear()} {company.name}</p>
        </div>
      </footer>
    </>
  );
}
