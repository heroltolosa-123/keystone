import type { Metadata, Viewport } from "next";
import { Archivo, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const archivo = Archivo({ subsets: ["latin"], axes: ["wdth"], variable: "--font-archivo", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap" });

export const metadata: Metadata = {
  title: "Keystone Electrical Supply Corp. | Power substation, line & lineman equipment",
  description:
    "Quezon City importer and contractor supplying steel poles, transformers, testing equipment and Klein lineman's tools to Philippine electric cooperatives, with substation installation, testing, commissioning and maintenance.",
  icons: { icon: "/images/keystone-logo.png" },
  openGraph: {
    title: "Keystone Electrical Supply Corp.",
    description: "Equipment and engineering services for Philippine electric cooperatives and contractors.",
    images: ["/images/lineman-substation.webp"],
    locale: "en_PH",
    type: "website",
  },
};

export const viewport: Viewport = { themeColor: "#040917" };

const contract = `<!--
THESIS: Keystone's homepage is a single-line diagram of the grid; every product sits at the point on the line where a co-op crew uses it. Refuses the supplier template of logo wall plus category cards.
OWN-WORLD: midnight ink #040917, conductor cyan #45e1ff for current, Keystone logo yellow #e8f23a for action only, faint violet haze. Hairline conductors, ringed nodes, Archivo at 125% width in caps.
STORY: a co-op engineer sees the corridor energize, finds their stage of the grid, sees what Keystone builds and supplies there, trusts the NEA heritage and peer co-ops, and sends a quote request.
FIRST VIEWPORT: full-bleed canvas transmission corridor converging on a substation glow right of center; headline bottom-left at up to 6rem; volt CTA under it; four-value readout along the base.
FORM: brief-pinned energy-tech world (user brief), adapted to Keystone; no seed roll.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
-->`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${archivo.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <div hidden dangerouslySetInnerHTML={{ __html: contract }} />
        <a
          href="#main"
          className="fixed left-4 top-4 z-[60] -translate-y-24 rounded-full bg-volt px-4 py-2 font-bold text-ink focus:translate-y-0"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
