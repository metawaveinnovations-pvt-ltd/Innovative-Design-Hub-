import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Phone } from 'lucide-react';
import { COURSES } from '../data/academyData';
import { siteConfig } from '../config/siteConfig';
import { SeoHead } from '../components/SeoHead';
import { IdhLogoMark, IdhOfficialBrandPlate } from '../components/IdhLogoMark';

export const AboutPage: React.FC = () => {

  return (
    <>
      <SeoHead
        title="About IDH — Innovative Design Hub"
        description="Learn about Innovative Design Hub (IDH), founded by Abdul Hannan Memon, and our practical digital skills education across technology, design, AI, programming, marketing, and English."
      />

      <section className="border-b border-[#DAE5E0] bg-gradient-to-b from-[#EFF6F3] to-[#FAFBF9] py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="text-xs font-semibold tracking-[0.14em] text-[#047857] uppercase">
                About Innovative Design Hub · {siteConfig.logoSubtitle}
              </p>
              <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-[#091815] sm:text-5xl">
                About Innovative <em className="italic text-[#047857]">Design Hub.</em>
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#425652] sm:text-lg">
                Innovative Design Hub (IDH) is a digital skills development and learning academy
                focused on helping students, beginners, and young professionals build practical
                capabilities in technology, creative design, artificial intelligence, marketing, and
                communication.
              </p>
            </div>

            {/* Official Supplied IDH Brand Lockup */}
            <div className="lg:col-span-5">
              <IdhOfficialBrandPlate caption={siteConfig.tagline} />
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            {/* Institutional Focus */}
            <div className="lg:col-span-7 rounded-xl border border-[#DCE5E3] bg-white p-6 sm:p-8">
              <h2 className="font-display text-2xl font-bold text-[#0C1B1A]">
                Focus on Practical Digital Education
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[#465957]">
                IDH brings together seven structured subjects under one roof so learners can
                explore both technical and creative disciplines with direct instructor guidance:
              </p>

              <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 text-sm text-[#0C1B1A]">
                {COURSES.map((course) => (
                  <li key={course.slug} className="flex items-start gap-2.5">
                    <CheckCircle2
                      className="mt-0.5 h-4 w-4 shrink-0 text-[#047857]"
                      aria-hidden="true"
                    />
                    <Link
                      to={`/courses/${course.slug}`}
                      className="font-medium hover:text-[#047857] hover:underline"
                    >
                      {course.title}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="mt-6 rounded-lg border border-[#E2ECE7] bg-[#FAFBF9] p-4">
                <p className="text-xs font-semibold text-[#047857]">
                  Post-Course Pathway · IDH × {siteConfig.internshipProgramme.partnerName}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-[#425652]">
                  {siteConfig.internshipProgramme.eligibilitySummary}{' '}
                  <Link
                    to="/internship"
                    className="font-semibold text-[#051B16] underline underline-offset-4 hover:text-[#047857]"
                  >
                    Explore the Remote Internship Programme
                  </Link>
                  .
                </p>
              </div>

              <div className="mt-8 flex flex-col gap-3 border-t border-[#EDF3F1] pt-6 sm:flex-row">
                <Link
                  to="/courses"
                  className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg bg-[#047857] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#065F46]"
                >
                  <span>Discover Courses</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex min-h-[44px] items-center justify-center rounded-lg border border-[#DCE5E3] bg-[#F7FAF9] px-5 py-2.5 text-sm font-semibold text-[#0C1B1A] hover:bg-white"
                >
                  Contact IDH
                </Link>
              </div>
            </div>

            {/* Founder Section */}
            <aside className="lg:col-span-5 space-y-6">
              <div className="rounded-xl border border-[#143D33] bg-[#051B16] p-6 text-white sm:p-8">
                <p className="text-xs font-semibold tracking-[0.14em] text-[#2DD4BF] uppercase">
                  Leadership
                </p>
                <div className="mt-4 flex items-center gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-[#047857]/30">
                    <IdhLogoMark size={36} />
                  </div>
                  <div>
                    <h2 className="font-display text-xl font-semibold text-white">
                      {siteConfig.founderName}
                    </h2>
                    <p className="mt-0.5 text-sm text-[#F5B935]">
                      Founder, Innovative Design Hub
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-sm text-[#C4D7D4]">
                  Instructor — Web Development with AI
                </p>
                <div className="mt-6 border-t border-white/15 pt-5">
                  <Link
                    to="/instructors"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#2DD4BF] hover:text-white"
                  >
                    <span>Meet All IDH Instructors</span>
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </div>

              <div className="rounded-xl border border-[#DCE5E3] bg-white p-6">
                <h2 className="font-display text-lg font-semibold text-[#0C1B1A]">
                  Direct Enquiries by Phone
                </h2>
                <p className="mt-1.5 text-sm text-[#465957]">
                  Speak with the IDH team regarding upcoming courses or future scholarships.
                </p>
                <div className="mt-4 space-y-2.5">
                  {siteConfig.phoneNumbers.map((phone) => (
                    <a
                      key={phone.id}
                      href={phone.href}
                      className="flex min-h-[44px] flex-wrap items-center justify-between gap-x-3 gap-y-1 rounded-lg border border-[#DAE5E0] bg-[#FAFBF9] px-4 py-2.5 text-sm font-semibold text-[#091815] transition-colors hover:border-[#047857]/40 hover:bg-white"
                    >
                      <span className="inline-flex items-center gap-2">
                        <Phone className="h-4 w-4 text-[#047857]" aria-hidden="true" />
                        <span className="tabular-nums">{phone.display}</span>
                      </span>
                      <span className="text-xs font-normal text-[#425652]">Call</span>
                    </a>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
};
