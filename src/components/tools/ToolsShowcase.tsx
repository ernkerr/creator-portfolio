"use client";

import { useState } from "react";
import { statusLabel, statusOrder, type Tool } from "@/data/tools";
import { SlideUp } from "@/components/motion/SlideUp";
import { ToolCard } from "./ToolCard";
import { WaitlistModal } from "./WaitlistModal";

type Props = {
  tools: Tool[];
};

export function ToolsShowcase({ tools }: Props) {
  const [active, setActive] = useState<Tool | null>(null);

  // Render one grid per status that actually has tools, in a fixed order. Today
  // that's just "Paid"; dropping "free" tools into the data lights up a second
  // section automatically — no change needed here.
  const sections = statusOrder
    .map((status) => ({
      status,
      items: tools.filter((t) => t.status === status),
    }))
    .filter((s) => s.items.length > 0);

  const showHeadings = sections.length > 1;

  return (
    <>
      {sections.map(({ status, items }) => (
        <div key={status} className="mb-12 last:mb-0">
          {showHeadings && (
            <h2 className="text-fg-soft mb-6 font-mono text-sm tracking-wider uppercase">
              {statusLabel[status]}
            </h2>
          )}
          <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
            {items.map((tool, i) => (
              <SlideUp key={tool.slug} delay={i * 0.05} className="h-full">
                <ToolCard tool={tool} onJoin={setActive} />
              </SlideUp>
            ))}
          </div>
        </div>
      ))}

      <WaitlistModal tool={active} onClose={() => setActive(null)} />
    </>
  );
}
