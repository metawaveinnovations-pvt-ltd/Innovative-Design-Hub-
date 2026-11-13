import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { INSTRUCTORS } from '../data/academyData';
import { SeoHead } from '../components/SeoHead';
import { IdhLogoMark } from '../components/IdhLogoMark';
import { InstructorCard } from '../components/InstructorCard';

export const InstructorsPage: React.FC = () => {
  const founder = INSTRUCTORS.find((inst) => inst.isFounder);
  const faculty = INSTRUCTORS.filter((inst) => !inst.isFounder);

  return (
    <>
      <SeoHead
        title="Our Instructors — Innovative Design Hub (IDH)"
        description="Meet the founder, administrator, and subject instructors behind Innovative Design Hub's seven digital skills courses."
      />

      <section className="border-b border-[#DAE5E0] bg-gradient-to-b from-[#EFF6F3] to-[#FAFBF9] py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold tracking-[0.14em] text-[#047857] uppercase">
            Faculty &amp; Leadership
          </p>
          <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-[#091815] sm:text-5xl">
            Learn From the People <em className="italic text-[#047857]">Behind IDH.</em>
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#425652]">
            Every course at Innovative Design Hub is guided by a dedicated instructor. Meet our
            academy leadership and the subject specialists teaching across all seven tracks.
          </p>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Founder Spotlight (non-duplicated) */}
          {founder && (
            <div className="mb-12 overflow-hidden rounded-2xl border border-[#143D33] bg-gradient-to-br from-[#051B16] via-[#09261F] to-[#044032] p-6 text-white sm:p-10">
              <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
                <div className="lg:col-span-8">
                  <p className="text-xs font-semibold tracking-[0.14em] text-[#2DD4BF] uppercase">
                    Academy Leadership &amp; Web Instruction
                  </p>
                  <h2 className="mt-2 font-display text-2xl font-semibold text-white sm:text-4xl">
                    {founder.name}
                  </h2>
                  <p className="mt-1.5 text-sm font-semibold text-[#F5B935]">
                    Founder, Innovative Design Hub · Instructor — {founder.courseTitle}
                  </p>
                  <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#C6D8D4] sm:text-base">
                    {founder.teachingFocus}
                  </p>
                </div>
                <div className="flex flex-col items-start gap-4 lg:col-span-4 lg:items-end">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-white/15 bg-[#047857]/30">
                    <IdhLogoMark size={38} />
                  </div>
                  <Link
                    to={`/courses/${founder.courseSlug}`}
                    className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-lg bg-[#047857] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#059669] sm:w-auto"
                  >
                    <span>Explore {founder.courseTitle}</span>
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Balanced 3x2 Faculty & Administration Grid */}
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="font-display text-2xl font-bold text-[#091815] sm:text-3xl">
              Course Instructors &amp; Administration
            </h2>
            <p className="text-xs font-medium text-[#425652]">
              6 Subject Instructors · Including IDH Administrator
            </p>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {faculty.map((instructor) => (
              <InstructorCard key={instructor.id} instructor={instructor} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
