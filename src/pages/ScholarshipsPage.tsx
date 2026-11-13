import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CalendarX2, CheckCircle2, Info } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import { FAQ_ITEMS } from '../data/academyData';
import { getPublicScholarshipRounds, resolveScholarshipState } from '../utils/scholarship';
import { SeoHead } from '../components/SeoHead';
import { FaqAccordion } from '../components/FaqAccordion';
import scholarshipAtelierImg from '../assets/images/idh_scholarship_merit_atelier_1794603250288.jpg';

export const ScholarshipsPage: React.FC = () => {
  const [imgFailed, setImgFailed] = useState(false);

  const visibleRounds = getPublicScholarshipRounds(siteConfig.scholarshipRounds);
  const currentRound = visibleRounds[0];
  const roundState = currentRound ? resolveScholarshipState(currentRound) : null;

  const scholarshipFaqs = useMemo(
    () => FAQ_ITEMS.filter((item) => item.category === 'Scholarships'),
    [],
  );

  if (!currentRound || !roundState) {
    return (
      <>
        <SeoHead
          title="Scholarships — Innovative Design Hub (IDH)"
          description="Information about scholarship initiatives at Innovative Design Hub."
        />
        <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
          <h1 className="font-display text-3xl font-bold text-[#0C1B1A]">
            IDH Scholarship Initiatives
          </h1>
          <p className="mt-4 text-base text-[#435754]">
            No scholarship round is currently published. Please enquire about future opportunities.
          </p>
        </section>
      </>
    );
  }

  return (
    <>
      <SeoHead
        title={`${currentRound.title} — Innovative Design Hub (IDH)`}
        description="Historical details and future enquiry information for the IDH Skill Development Scholarship Program 2026. Applications for the 2026 round closed on 21 September 2026."
      />

      {/* Scholarship Hero Header */}
      <section className="relative overflow-hidden border-b border-white/10 bg-gradient-to-br from-[#051B16] via-[#09261F] to-[#044032] py-14 text-white sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#F5B935]">
                <CalendarX2 className="h-4 w-4" aria-hidden="true" />
                <span>{roundState.statusHeading}</span>
              </div>

              <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight text-white sm:text-5xl">
                {currentRound.title}
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#DCEAE7] sm:text-lg">
                {currentRound.subtitle}
              </p>

              {/* Key Historical Metadata */}
              <dl className="mt-8 grid grid-cols-1 gap-5 border-y border-white/15 py-5 sm:grid-cols-3">
                <div>
                  <dt className="text-xs text-[#A9C4BF]">Round Status</dt>
                  <dd className="mt-1 text-sm font-semibold text-[#F5B935]">
                    {roundState.effectiveStatus} (Historical Record)
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-[#A9C4BF]">Published Deadline</dt>
                  <dd className="mt-1 text-sm font-semibold tabular-nums text-white">
                    {currentRound.deadlineDisplay}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-[#A9C4BF]">Advertised Seats (2026)</dt>
                  <dd className="mt-1 text-sm font-semibold tabular-nums text-white">
                    {currentRound.advertisedSeats} (No longer open)
                  </dd>
                </div>
              </dl>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                {roundState.isAcceptingApplications ? (
                  <Link
                    to="/enroll?interest=scholarship"
                    className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-[#059669] px-6 py-3 text-sm font-semibold text-white hover:bg-[#10B981]"
                  >
                    <span>Apply Now</span>
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                ) : (
                  <Link
                    to="/enroll?interest=future-scholarships"
                    className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-[#059669] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#10B981] whitespace-nowrap"
                  >
                    <span>Enquire About Future Rounds</span>
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                )}

                <Link
                  to="/courses"
                  className="inline-flex min-h-[48px] items-center justify-center rounded-xl border border-white/25 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/15 whitespace-nowrap"
                >
                  Explore Regular Courses
                </Link>
              </div>
            </div>

            <figure className="lg:col-span-5">
              <div className="aspect-[16/10] overflow-hidden rounded-2xl border border-white/15 bg-[#09261F] shadow-xl">
                {!imgFailed ? (
                  <img
                    src={scholarshipAtelierImg}
                    alt="Obsidian academic desk displaying online Zoom tiles alongside a forest-green folio embossed with a gold hexagon crest"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    onError={() => setImgFailed(true)}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center p-6 text-sm text-[#C6D8D4]">
                    {currentRound.title}
                  </div>
                )}
              </div>
              <figcaption className="mt-3 text-xs text-[#9AC0B8]">
                Merit-based digital education record from the 2026 IDH Scholarship Program.
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* Historical Courses & Benefits */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            {/* Six Scholarship Courses */}
            <div className="lg:col-span-7 rounded-xl border border-[#DAE5E0] bg-white p-6 sm:p-8">
              <p className="text-xs font-semibold tracking-[0.14em] text-[#047857] uppercase">
                2026 Program Scope
              </p>
              <h2 className="mt-2 font-display text-2xl font-semibold text-[#091815]">
                Six Scholarship Course Options (2026 Round)
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-[#435754]">
                The 2026 scholarship announcement covered these six specific programs. Historical
                course titles are preserved exactly as published.
              </p>

              <ol className="mt-6 divide-y divide-[#EDF4F0]">
                {currentRound.courses.map((item, idx) => (
                  <li key={item.title} className="py-4 first:pt-0 last:pb-0">
                    <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
                      <div className="flex min-w-0 items-start gap-3">
                        <span className="mt-0.5 font-mono text-xs font-bold tabular-nums text-[#047857]">
                          0{idx + 1}
                        </span>
                        <div className="min-w-0">
                          <p className="font-display text-base font-bold text-[#091815]">
                            {item.title}
                          </p>
                          {item.historicalNote && (
                            <p className="mt-1 text-xs leading-relaxed text-[#425652]">
                              {item.historicalNote}
                            </p>
                          )}
                        </div>
                      </div>
                      {item.relatedAcademyCourseSlug && (
                        <Link
                          to={`/courses/${item.relatedAcademyCourseSlug}`}
                          className="inline-flex min-h-[36px] shrink-0 items-center rounded-md border border-[#DAE5E0] bg-[#FAFBF9] px-3 py-1 text-xs font-semibold text-[#047857] transition-colors hover:border-[#047857] hover:bg-[#047857] hover:text-white whitespace-nowrap"
                        >
                          View Course
                        </Link>
                      )}
                    </div>
                  </li>
                ))}
              </ol>

              <div className="mt-6 rounded-xl border border-[#DCE8E3] bg-[#ECFDF5]/45 p-4 flex items-start gap-3">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-[#047857]" aria-hidden="true" />
                <p className="text-xs leading-relaxed text-[#435754]">
                  Cyber Security is offered within IDH&rsquo;s academy courses, but it was not part
                  of the six courses included in the 2026 scholarship announcement.
                </p>
              </div>
            </div>

            {/* Program Benefits & Selection */}
            <div className="lg:col-span-5 space-y-6">
              <div className="rounded-2xl border border-[#DCE8E3] bg-white p-6 sm:p-8">
                <h2 className="font-display text-xl font-bold text-[#0C1B1A]">
                  Historical Program Benefits (2026)
                </h2>
                <ul className="mt-4 space-y-3 text-sm text-[#0C1B1A]">
                  {currentRound.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-2.5">
                      <CheckCircle2
                        className="mt-0.5 h-4 w-4 shrink-0 text-[#059669]"
                        aria-hidden="true"
                      />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-[#DCE8E3] bg-white p-6 sm:p-8">
                <h2 className="font-display text-xl font-bold text-[#0C1B1A]">
                  Selection &amp; Historical Notes
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-[#435754]">
                  {currentRound.eligibilitySummary}
                </p>
                <ul className="mt-4 space-y-2.5 border-t border-[#EDF4F0] pt-4 text-xs leading-relaxed text-[#435754]">
                  {currentRound.historicalNotes.map((note) => (
                    <li key={note}>• {note}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Scholarship FAQ */}
          <div className="mt-14 max-w-4xl">
            <h2 className="font-display text-2xl font-bold text-[#0C1B1A]">
              Scholarship Questions &amp; Answers
            </h2>
            <div className="mt-6">
              <FaqAccordion items={scholarshipFaqs} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
