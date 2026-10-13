// Every company fact on the site lives here. Source: "Keystone - Company Profile.pdf"
// and "Presentation.docx". Edit this file to change site copy; do not add claims
// that are not backed by a company document.

export const company = {
  name: "Keystone Electrical Supply Corp.",
  short: "Keystone",
  tagline: "Importer of electrical and mechanical equipment",
  incorporated: "March 29, 2016",
  secRegistration: "CS201606346",
  address: "#1 Bataan St., NAPOCOR Village, Tandang Sora, Quezon City, Philippines",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=1+Bataan+St+NAPOCOR+Village+Tandang+Sora+Quezon+City",
  email: "keystonepower@gmail.com",
  phones: [
    { label: "Office tel. / fax", display: "(02) 7739-4432", href: "tel:+63277394432" },
    { label: "Mobile · Viber / WhatsApp", display: "0919 001 3196", href: "tel:+639190013196" },
    { label: "Mobile · Viber", display: "0917 140 7911", href: "tel:+639171407911" },
  ],
  whatsapp: "639190013196",
  mission:
    "To be the total solution provider of our clients' electrical requirements: reliable, quality material for every major electric cooperative and contractor in the Philippines, delivered with direct manufacturer contact and competitive pricing.",
} as const;

export const stats = [
  { value: 2016, label: "Incorporated in Quezon City", format: "year" },
  { value: 1200, label: "Product categories available", format: "number" },
  { value: 35, label: "Co-ops and contractors on our client list", format: "number" },
  { value: 22, label: "Years of NEA field experience behind the founder", format: "number" },
] as const;

export const services = [
  {
    id: "installation",
    title: "Installation & construction",
    body: "Installation, testing and commissioning of power substations, plus construction of transmission and distribution lines, for co-ops and contractors working on fast-track schedules.",
    points: ["Power substations", "Transmission lines", "Distribution lines", "Testing & commissioning"],
  },
  {
    id: "maintenance",
    title: "Preventive maintenance",
    body: "Preventive maintenance of power substation transformers and their protection equipment, so they keep running reliably and efficiently.",
    points: ["Power transformers", "Protection equipment", "Scheduled servicing", "Field testing"],
  },
  {
    id: "supply",
    title: "Product supply & importation",
    body: "Steel poles, testing equipment, lineman's tools and line materials, imported directly from the manufacturer and supplied to industry standards.",
    points: ["Direct manufacturer contact", "Steel poles", "Lineman's tools", "Testing equipment"],
  },
] as const;

export type ProductGroup = { id: string; name: string; items: string[] };

export const productGroups: ProductGroup[] = [
  {
    id: "lines",
    name: "Lines, poles & hardware",
    items: ["Steel poles", "Conductor, duplex & ACSR", "Insulators, spool & pin type", "Line hardware", "Fuse links"],
  },
  {
    id: "transformers",
    name: "Transformers",
    items: ["Distribution transformers", "Current transformers", "Potential transformers"],
  },
  {
    id: "testing",
    name: "Testing & measurement",
    items: ["Fluke instruments", "Halo ammeters", "Live line power quality meters", "Qualstik", "Testing equipment"],
  },
  {
    id: "tools",
    name: "Lineman's tools & safety",
    items: ["Lineman's climber sets", "Telescopic hotsticks", "Fiberglass ladders", "Lever hoists"],
  },
];

export const brands = [
  "Klein Tools",
  "Fluke",
  "Hastings",
  "Fameca",
  "Ritz",
  "Louisville Ladder",
  "Kito",
  "Hi-Tool",
  "Band-It",
  "SensorLink",
  "Shihlin Electric",
  "Chance",
];

// From Presentation.docx: Klein products proposed for stocking, and their lead times.
export const kleinProducts = [
  { cat: "5266N-23D", name: "Body belt" },
  { cat: "5268N-23D", name: "Body belt" },
  { cat: "KG5295-6-6L", name: "Positioning strap" },
  { cat: "KG5295-6L", name: "Positioning strap" },
  { cat: "CN1972AR", name: "Pole climber set" },
  { cat: "D213-9NE", name: "Lineman's plier" },
];

export const kleinLeadTime = [
  { step: "Manufacturing", time: "4–6 weeks", days: 35, note: "Body belts & straps are made to order. Climber sets and pliers are typically in stock at Klein HQ." },
  { step: "Ocean freight", time: "30–45 days", days: 38, note: "Texas, USA to the Philippines, under normal weather conditions." },
  { step: "Customs", time: "≈ 2 weeks", days: 14, note: "Customs processing and release." },
];

export const timeline = [
  { year: "2004", title: "Midwest Power International", body: "Engr. Nelson S. Milo is an incorporator and General Manager through 2008." },
  { year: "2008", title: "Keystone Power Engineering & Construction", body: "Incorporator and General Manager through 2016." },
  { year: "2016", title: "Keystone Electrical Supply Corp.", body: "Incorporated March 29 and registered with the SEC, starting out as a supplier." },
  { year: "2018", title: "Regional expansion", body: "Services extended to regional markets." },
  { year: "2023", title: "New product line & partnership", body: "A new product line launched, alongside a partnership with leading firms." },
];

export type Client = { code: string; name: string };

export const clients: { region: string; list: Client[] }[] = [
  {
    region: "Luzon",
    list: [
      { code: "CAGELCO 2", name: "Cagayan 2 Electric Coop." },
      { code: "CANORECO", name: "Camarines Norte Electric Coop." },
      { code: "CASURECO I", name: "Camarines Sur I Electric Coop." },
      { code: "CASURECO II", name: "Camarines Sur II Electric Coop." },
      { code: "DECORP", name: "Dagupan Electric Corporation" },
      { code: "FLECO", name: "First Laguna Electric Coop." },
      { code: "LUECO", name: "La Union Electric Company" },
      { code: "MASELCO", name: "Masbate Electric Coop." },
      { code: "NEECO I", name: "Nueva Ecija I Electric Coop." },
      { code: "NEECO II A1", name: "Nueva Ecija II Area 1 Electric Coop." },
      { code: "NEECO II A2", name: "Nueva Ecija II Area 2 Electric Coop." },
      { code: "OMECO", name: "Occidental Mindoro Electric Coop." },
      { code: "PALECO", name: "Palawan Electric Coop." },
      { code: "PANELCO I", name: "Pangasinan I Electric Coop." },
      { code: "PELCO I", name: "Pampanga I Electric Coop." },
      { code: "PELCO II", name: "Pampanga II Electric Coop." },
      { code: "PENELCO", name: "Peninsula Electric Coop." },
      { code: "TARELCO I", name: "Tarlac I Electric Coop." },
      { code: "TARELCO II", name: "Tarlac II Electric Coop." },
    ],
  },
  {
    region: "Visayas",
    list: [
      { code: "ANTECO", name: "Antique Electric Coop." },
      { code: "BILECO", name: "Biliran Electric Coop." },
      { code: "ILECO II", name: "Iloilo 2 Electric Coop." },
      { code: "ILECO III", name: "Iloilo 3 Electric Coop." },
      { code: "NONECO", name: "Negros Occidental Electric Coop." },
    ],
  },
  {
    region: "Mindanao",
    list: [
      { code: "ASELCO", name: "Agusan del Sur Electric Coop." },
      { code: "DORECO", name: "Davao Oriental Electric Coop." },
      { code: "TAWELCO", name: "Tawi-Tawi Electric Coop." },
      { code: "ZAMSURECO 2", name: "Zamboanga del Sur 2 Electric Coop." },
      { code: "ZANECO", name: "Zamboanga del Norte Electric Coop." },
    ],
  },
  {
    region: "Contractors & trade",
    list: [
      { code: "3CA", name: "3CA Builders" },
      { code: "AIM GLOBAL", name: "AIM Global Product Inc." },
      { code: "BANITRADE", name: "Banitrade Enterprises" },
      { code: "CO BAN KIAT", name: "Co Ban Kiat Hardware Inc." },
      { code: "RHOB", name: "RHOB Construction" },
      { code: "TRISTAR", name: "Tristar Line Company Inc." },
    ],
  },
];

// Grid explorer: where Keystone's work sits on the path from plant to consumer.
// Illustrative only; this is not telemetry from any real network.
export type GridNode = {
  id: string;
  label: string;
  x: number;
  y: number;
  kind: "flow" | "support";
  upstream?: boolean;
  summary: string;
  services: string[];
  products: string[];
};

export const gridNodes: GridNode[] = [
  {
    id: "generation",
    label: "Generation",
    x: 90,
    y: 150,
    kind: "flow",
    upstream: true,
    summary: "Power plants feed the grid. This is upstream of our work; we come in where power leaves the plant for the lines.",
    services: [],
    products: [],
  },
  {
    id: "transmission",
    label: "Transmission",
    x: 295,
    y: 150,
    kind: "flow",
    summary: "High-voltage lines carry power across the province to substations.",
    services: ["Construction of transmission lines", "Testing & commissioning"],
    products: ["Steel poles", "Conductor, ACSR", "Insulators, spool & pin type", "Line hardware"],
  },
  {
    id: "substation",
    label: "Substation",
    x: 500,
    y: 150,
    kind: "flow",
    summary: "Substations step the voltage down for distribution, and protection equipment keeps faults from spreading.",
    services: [
      "Installation, testing & commissioning of power substations",
      "Preventive maintenance of power transformers",
      "Maintenance of protection equipment",
    ],
    products: ["Current transformers", "Potential transformers", "Testing equipment"],
  },
  {
    id: "distribution",
    label: "Distribution",
    x: 705,
    y: 150,
    kind: "flow",
    summary: "Co-op distribution lines and transformers bring power down every street.",
    services: ["Construction of distribution lines"],
    products: ["Distribution transformers", "Fuse links", "Conductor, duplex", "Steel poles", "Line hardware"],
  },
  {
    id: "consumers",
    label: "Member-consumers",
    x: 910,
    y: 150,
    kind: "flow",
    upstream: true,
    summary: "Homes, farms and businesses served by the co-op. Everything to the left of here is what keeps their lights on.",
    services: [],
    products: [],
  },
  {
    id: "crew",
    label: "Line crew",
    x: 400,
    y: 335,
    kind: "support",
    summary: "The linemen who build and maintain every span. They need gear they can trust their lives to.",
    services: ["Direct importation of Klein Tools"],
    products: ["Lineman's climber sets", "Body belts & positioning straps", "Telescopic hotsticks", "Fiberglass ladders", "Lever hoists"],
  },
  {
    id: "testing",
    label: "Testing & metering",
    x: 600,
    y: 335,
    kind: "support",
    summary: "Measurement on live and de-energized equipment, from commissioning to fault-finding.",
    services: ["Field testing during commissioning and maintenance"],
    products: ["Fluke instruments", "Halo ammeters", "Live line power quality meters", "Qualstik"],
  },
];
