import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { FaqItem } from '../data/academyData';

interface FaqAccordionProps {
  items: readonly FaqItem[];
}

export const FaqAccordion: React.FC<FaqAccordionProps> = ({ items }) => {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="divide-y divide-[#DAE5E0] overflow-hidden rounded-xl border border-[#DAE5E0] bg-white">
      {items.map((item) => {
        const isOpen = openId === item.id;
        const panelId = `faq-panel-${item.id}`;
        const buttonId = `faq-trigger-${item.id}`;

        return (
          <div key={item.id} className={isOpen ? 'bg-[#FAFBF9]' : 'bg-white'}>
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggleItem(item.id)}
                className="flex min-h-[56px] w-full items-center justify-between gap-4 px-4 py-4 text-left transition-colors hover:text-[#047857] focus-visible:outline-none sm:px-6 sm:py-5"
              >
                <span className="font-display text-[15px] font-semibold leading-snug text-[#091815] sm:text-base">
                  {item.question}
                </span>
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border transition-colors ${
                    isOpen
                      ? 'border-[#051B16] bg-[#051B16] text-white'
                      : 'border-[#DAE5E0] bg-[#FAFBF9] text-[#425652]'
                  }`}
                >
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                    aria-hidden="true"
                  />
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className="max-w-3xl px-5 pb-5 pt-0.5 text-sm leading-relaxed text-[#425652] sm:px-6 sm:text-[15px]"
            >
              {item.answer}
            </div>
          </div>
        );
      })}
    </div>
  );
};
