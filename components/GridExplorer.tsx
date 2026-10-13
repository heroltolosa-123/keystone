"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Factory, Gauge, HardHat, House } from "lucide-react";
import { gridNodes, type GridNode } from "@/lib/content";
import { requestQuote } from "@/lib/quote";

const flow = gridNodes.filter((n) => n.kind === "flow");
const links: Record<string, string[]> = {
  crew: ["transmission", "substation", "distribution"],
  testing: ["transmission", "substation", "distribution"],
};

/** Single-line-diagram glyphs, drawn in the same stroke as the conductors. */
function Glyph({ node }: { node: GridNode }) {
  const p = { x: node.x - 13, y: node.y - 13, width: 26, height: 26, strokeWidth: 1.5 };
  switch (node.id) {
    case "generation":
      return <Factory {...p} />;
    case "consumers":
      return <House {...p} />;
    case "crew":
      return <HardHat {...p} />;
    case "testing":
      return <Gauge {...p} />;
    case "transmission":
      return (
        <path
          d={`M${node.x - 9} ${node.y + 13} L${node.x} ${node.y - 13} L${node.x + 9} ${node.y + 13} M${node.x - 12} ${node.y - 5} H${node.x + 12} M${node.x - 9} ${node.y + 2} H${node.x + 9} M${node.x - 6} ${node.y + 8} L${node.x + 4} ${node.y - 2} M${node.x + 6} ${node.y + 8} L${node.x - 4} ${node.y - 2}`}
          strokeWidth={1.5}
        />
      );
    default: {
      // transformer: two interlocking windings
      const r = node.id === "substation" ? 9 : 7;
      return (
        <>
          <circle cx={node.x} cy={node.y - r * 0.55} r={r} strokeWidth={1.5} />
          <circle cx={node.x} cy={node.y + r * 0.55} r={r} strokeWidth={1.5} />
        </>
      );
    }
  }
}

export default function GridExplorer() {
  const [active, setActive] = useState("substation");
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const scroller = useRef<HTMLDivElement>(null);
  const node = gridNodes.find((n) => n.id === active)!;

  // On narrow screens the diagram scrolls sideways; keep the selected stage in view.
  useEffect(() => {
    const el = scroller.current;
    if (!el || el.scrollWidth <= el.clientWidth) return;
    el.scrollTo({ left: (node.x / 1000) * el.scrollWidth - el.clientWidth / 2, behavior: "smooth" });
  }, [node.x]);
  const reach = node.kind === "flow" ? node.x : -1;

  const onKey = (e: KeyboardEvent, i: number) => {
    const d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!d) return;
    e.preventDefault();
    const next = (i + d + gridNodes.length) % gridNodes.length;
    setActive(gridNodes[next].id);
    tabs.current[next]?.focus();
  };

  return (
    <div>
      <div>
        <div
          ref={scroller}
          className="relative overflow-x-auto rounded-2xl border border-white/10 bg-[linear-gradient(180deg,rgba(11,26,61,0.6),rgba(4,9,23,0.6))] [scrollbar-width:thin]"
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
          <svg viewBox="0 0 1000 420" className="relative block w-full min-w-[680px]" aria-hidden="true" fill="none">
            {/* support links */}
            {Object.entries(links).flatMap(([from, tos]) =>
              tos.map((to) => {
                const a = gridNodes.find((n) => n.id === from)!;
                const b = gridNodes.find((n) => n.id === to)!;
                const on = active === from;
                return (
                  <path
                    key={from + to}
                    d={`M${a.x} ${a.y - 30} C${a.x} ${(a.y + b.y) / 2}, ${b.x} ${(a.y + b.y) / 2}, ${b.x} ${b.y + 30}`}
                    stroke={on ? "#e8f23a" : "rgba(130,180,255,0.22)"}
                    strokeWidth={on ? 1.6 : 1}
                    strokeDasharray="3 7"
                    className={on ? "flow" : undefined}
                    style={{ transition: "stroke 0.4s" }}
                  />
                );
              }),
            )}

            {/* main bus */}
            <line
              x1={flow[0].x}
              y1={150}
              x2={flow[flow.length - 1].x}
              y2={150}
              stroke="rgba(130,180,255,0.25)"
              strokeWidth={2}
            />
            {reach > 0 && (
              <motion.line
                x1={flow[0].x}
                y1={150}
                y2={150}
                initial={false}
                animate={{ x2: reach }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                stroke="#45e1ff"
                strokeWidth={2.5}
                style={{ filter: "drop-shadow(0 0 6px rgba(69,225,255,0.8))" }}
              />
            )}
            <line
              x1={flow[0].x}
              y1={150}
              x2={flow[flow.length - 1].x}
              y2={150}
              stroke="#ffffff"
              strokeWidth={2}
              className="flow"
              opacity={0.55}
            />

            {gridNodes.map((n) => {
              const on = n.id === active;
              const lit = on || (n.kind === "flow" && n.x <= reach);
              const color = n.upstream ? "#9cabc8" : n.kind === "support" ? "#e8f23a" : "#45e1ff";
              return (
                <g
                  key={n.id}
                  onClick={() => setActive(n.id)}
                  className="cursor-pointer"
                  stroke={lit ? color : "rgba(156,171,200,0.6)"}
                  style={{ transition: "stroke 0.4s" }}
                >
                  {on && <circle cx={n.x} cy={n.y} r={30} className="ring" stroke={color} strokeWidth={1.5} />}
                  <circle
                    cx={n.x}
                    cy={n.y}
                    r={30}
                    fill={on ? "rgba(69,225,255,0.12)" : "#07122c"}
                    strokeWidth={on ? 2 : 1.2}
                    strokeDasharray={n.upstream ? "4 4" : undefined}
                  />
                  <Glyph node={n} />
                  <text
                    x={n.x}
                    y={n.kind === "flow" ? n.y - 50 : n.y + 58}
                    textAnchor="middle"
                    stroke="none"
                    fill={on ? "#e9eef8" : "#9cabc8"}
                    fontSize={17}
                    fontWeight={on ? 700 : 500}
                    style={{ transition: "fill 0.3s" }}
                  >
                    {n.label}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
        <p className="mt-3 text-xs text-muted">
          Illustrative diagram of where our work sits on the grid. Not a live network view.
        </p>
      </div>

      <div className="mt-10">
        <div role="tablist" aria-label="Grid stage" className="flex flex-wrap gap-2">
          {gridNodes.map((n, i) => (
            <button
              key={n.id}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              role="tab"
              id={`tab-${n.id}`}
              aria-selected={n.id === active}
              aria-controls="grid-panel"
              tabIndex={n.id === active ? 0 : -1}
              onClick={() => setActive(n.id)}
              onKeyDown={(e) => onKey(e, i)}
              className={`rounded-full border px-3.5 py-1.5 text-[13px] font-medium transition-colors ${
                n.id === active
                  ? "border-cyan bg-cyan/10 text-text"
                  : "border-white/12 text-muted hover:border-white/30 hover:text-text"
              }`}
            >
              {n.label}
            </button>
          ))}
        </div>

        <div id="grid-panel" role="tabpanel" aria-labelledby={`tab-${node.id}`} className="mt-10 min-h-[18rem]">
          <AnimatePresence mode="wait">
            <motion.div
              key={node.id}
              initial={{ opacity: 0, x: 16, filter: "blur(6px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: -10, filter: "blur(4px)" }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
                <div>
                  <h3 className="display text-3xl sm:text-5xl">{node.label}</h3>
                  <p className="mt-4 max-w-prose text-lg leading-relaxed text-muted">{node.summary}</p>
                </div>
                <div className="grid content-start gap-8 sm:grid-cols-2 lg:gap-10">
                  {node.services.length > 0 && (
                    <div>
                      <h4 className="text-sm font-bold text-cyan">What we do here</h4>
                      <ul className="mt-3 space-y-2">
                        {node.services.map((s) => (
                          <li key={s} className="flex gap-3 text-text">
                            <span className="mt-2.5 h-px w-4 shrink-0 bg-cyan" />
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {node.products.length > 0 && (
                    <div>
                      <h4 className="text-sm font-bold text-volt">What we supply here</h4>
                      <ul className="mt-3 flex flex-wrap gap-2">
                        {node.products.map((p) => (
                          <li key={p}>
                            <button
                              type="button"
                              onClick={() => requestQuote(p)}
                              className="group inline-flex items-center gap-1.5 rounded-md border border-white/12 bg-white/[0.03] px-3 py-2 text-sm transition-colors hover:border-volt hover:text-volt"
                            >
                              {p}
                              <ArrowUpRight className="size-3.5 opacity-50 transition-[opacity,transform] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                            </button>
                          </li>
                        ))}
                      </ul>
                      <p className="mt-3 text-xs text-muted">Pick an item to start a quote request.</p>
                    </div>
                  )}
                  {node.upstream && (
                    <p className="text-sm leading-relaxed text-muted sm:col-span-2">
                      Outside our scope. Select Transmission, Substation or Distribution to see our work.
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
