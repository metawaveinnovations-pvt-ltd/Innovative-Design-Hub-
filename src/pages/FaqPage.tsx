import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { FAQ_ITEMS, type FaqItem } from '../data/academyData';
import { SeoHead } from '../components/SeoHead';
import { FaqAccordion } from '../components/FaqAccordion';

type FaqFilter = 'All' | FaqItem['category'];

export const FaqPage: React.FC = () => {
  const [category, setCategory] = useState<FaqFilter>('All');

  const visibleItems = useMemo(() => {
    if (category === 'All') return FAQ_ITEMS;
    return FAQ_ITEMS.filter((item) => item.category === category);
  }, [category]);

  const faqSchema = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: FAQ_ITEMS.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    }),
    [],
  );

  return (
    <>
      <SeoHead
        title="Frequently Asked Questions — Innovative Design Hub (IDH)"
        description="Answers to common questions about Innovative Design Hub courses, instructors, admission enquiries, and the 2026 scholarship program."
        structuredData={faqSchema}
      />

      <section className="border-b border-[#DAE5E0] bg-gradient-to-b from-[#EFF6F3] to-[#FAFBF9] py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold tracking-[0.14em] text-[#047857] uppercase">
            Questions &amp; Answers
          </p>
          <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-[#091815] sm:text-5xl">
            Frequently Asked <em className="italic text-[#047857]">Questions.</em>
          </h1>
          <p className="mt-4 text-base text-[#425652]">
            Helpful answers about IDH courses, instructors, enquiries, and scholarship rules.
          </p>

          <div
            className="mt-8 inline-flex max-w-full flex-wrap gap-1 rounded-xl border border-[#DAE5E0] bg-white p-1"
            role="group"
            aria-label="Filter FAQ by topic"
          >
            {(
              [
                'All',
                'Courses & Admission',
                'Internship & Certification',
                'Instructors',
                'Scholarships',
              ] as const
            ).map((tab) => {
              const active = category === tab;
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setCategory(tab)}
                  aria-pressed={active}
                  className={`min-h-[40px] rounded-lg px-3.5 py-2 text-xs font-semibold transition-colors whitespace-nowrap ${
                    active
                      ? 'bg-[#051B16] text-white shadow-sm'
                      : 'text-[#425652] hover:bg-[#F3F7F5] hover:text-[#091815]'
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <FaqAccordion items={visibleItems} />

          <div className="mt-10 rounded-xl border border-[#DCE5E3] bg-white p-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-display text-lg font-semibold text-[#0C1B1A]">
                Still have a specific question?
              </h2>
              <p className="mt-1 text-sm text-[#465957]">
                Reach out to our team directly for batch timings, fees, or general assistance.
              </p>
            </div>
            <Link
              to="/enroll"
              className="inline-flex min-h-[44px] shrink-0 items-center justify-center rounded-lg bg-[#047857] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#065F46]"
            >
              Enquire Now
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};
