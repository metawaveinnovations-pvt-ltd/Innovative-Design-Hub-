import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AlertCircle,
  ArrowRight,
  Award,
  Briefcase,
  CheckCircle2,
  ClipboardCheck,
  GraduationCap,
  Laptop,
  Phone,
  ShieldCheck,
} from 'lucide-react';
import { FAQ_ITEMS } from '../data/academyData';
import { siteConfig } from '../config/siteConfig';
import {
  evaluateInternshipEligibility,
  formatPkr,
  INTERNSHIP_MAX_MONTHS,
  INTERNSHIP_MIN_ENTRANCE_SCORE_EXCLUSIVE,
  INTERNSHIP_MIN_MONTHS,
  INTERNSHIP_MONTHLY_FEE_PKR,
} from '../utils/internship';
import { SeoHead } from '../components/SeoHead';
import { FaqAccordion } from '../components/FaqAccordion';
import internshipAtelierImg from '../assets/images/idh_metawave_internship_atelier_1794606355339.jpg';

const STEP_ICONS = [GraduationCap, ClipboardCheck, Laptop, Award] as const;
const SCORE_PRESETS = [35, 40, 41, 65, 85] as const;
const DURATION_OPTIONS = [3, 4, 5, 6] as const;

export const InternshipPage: React.FC = () => {
  const programme = siteConfig.internshipProgramme;
  const [imgFailed, setImgFailed] = useState(false);

  const [courseCompleted, setCourseCompleted] = useState(true);
  const [entranceTestScorePercent, setEntranceTestScorePercent] = useState(65);
  const [durationMonths, setDurationMonths] = useState(4);

  const evaluation = useMemo(
    () =>
      evaluateInternshipEligibility({
        courseCompleted,
        entranceTestScorePercent,
        durationMonths,
      }),
    [courseCompleted, entranceTestScorePercent, durationMonths],
  );

  const internshipFaqs = useMemo(
    () => FAQ_ITEMS.filter((item) => item.category === 'Internship & Certification'),
    [],
  );

  const programmeSchema = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@type': 'EducationalOccupationalProgram',
      name: programme.title,
      description: `${programme.eligibilitySummary} ${programme.programmeOverview}`,
      provider: [
        {
          '@type': 'EducationalOrganization',
          name: siteConfig.organizationName,
        },
        {
          '@type': 'Organization',
          name: programme.partnerName,
        },
      ],
      programType: 'Remote Internship & Advanced Training',
      timeToComplete: 'P3M/P6M',
      offers: {
        '@type': 'Offer',
        price: programme.monthlyFeePKR,
        priceCurrency: 'PKR',
        billingIncrement: 1,
        unitText: 'month',
      },
    }),
    [programme],
  );

  return (
    <>
      <SeoHead
        title="IDH × MetaWave Innovations — Advanced Training & Internship Programme"
        description="Students who complete an IDH course and score more than 40% in the Internship Entrance Test qualify for MetaWave Innovations' 3–6 month Advanced Training & Remote Internship Programme at PKR 3,500/month."
        structuredData={programmeSchema}
      />

      {/* SECTION 01 — PROGRAMME HERO & VERIFIED SPECIFICATIONS */}
      <section className="relative overflow-hidden border-b border-white/10 bg-gradient-to-br from-[#051B16] via-[#09261F] to-[#044032] py-12 text-white sm:py-16">
        <div
          className="pointer-events-none absolute -right-40 -top-40 h-96 w-96 rounded-full bg-[#047857]/20 blur-3xl"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div className="flex flex-col gap-y-0.5 text-xs font-semibold text-[#F5B935] sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-2.5">
                <span>IDH × {programme.partnerName}</span>
                <span aria-hidden="true" className="hidden text-white/40 sm:inline">
                  ·
                </span>
                <span className="text-[#2DD4BF]">{programme.deliveryMode}</span>
              </div>

              <h1 className="mt-3 font-display text-[32px] font-semibold leading-[1.12] tracking-tight text-white [text-wrap:balance] sm:text-5xl">
                Advanced Training &amp;{' '}
                <em className="italic text-[#2DD4BF]">Remote Internship.</em>
              </h1>

              <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#DCEAE7] sm:text-[17px]">
                {programme.eligibilitySummary}
              </p>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#C6D8D4] sm:text-base">
                {programme.programmeOverview}
              </p>

              {/* Key Programme Ledger */}
              <dl className="mt-7 grid grid-cols-1 gap-5 border-y border-white/15 py-5 sm:grid-cols-3">
                <div>
                  <dt className="text-xs text-[#9AC0B8]">Entrance Test Score</dt>
                  <dd className="mt-1 font-mono text-sm font-semibold tabular-nums text-[#F5B935]">
                    &gt; {INTERNSHIP_MIN_ENTRANCE_SCORE_EXCLUSIVE}% Required
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-[#9AC0B8]">Programme Duration</dt>
                  <dd className="mt-1 font-mono text-sm font-semibold tabular-nums text-white">
                    {programme.durationRangeDisplay} (Remote)
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-[#9AC0B8]">Fixed Monthly Fee</dt>
                  <dd className="mt-1 font-mono text-sm font-semibold tabular-nums text-white">
                    {formatPkr(INTERNSHIP_MONTHLY_FEE_PKR)} / month
                  </dd>
                </div>
              </dl>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  to="/enroll?interest=internship-programme"
                  className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-lg bg-[#047857] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#059669] whitespace-nowrap"
                >
                  <span>Enquire About Internship Programme</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link
                  to="/courses"
                  className="inline-flex min-h-[48px] items-center justify-center rounded-lg border border-white/25 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-[#F5B935]/50 hover:bg-white/10 whitespace-nowrap"
                >
                  Explore IDH Courses
                </Link>
              </div>
            </div>

            <figure className="lg:col-span-5">
              <div className="aspect-[16/10] overflow-hidden rounded-2xl border border-white/15 bg-[#09261F] shadow-xl">
                {!imgFailed ? (
                  <img
                    src={internshipAtelierImg}
                    alt="Quiet modern software and design mentorship desk with laptop architecture layouts and forest green mentorship folio"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    onError={() => setImgFailed(true)}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center p-8 text-center text-[#DCEAE7]">
                    <Briefcase className="h-8 w-8 text-[#F5B935]" aria-hidden="true" />
                    <p className="mt-3 font-display text-lg font-semibold">
                      IDH × {programme.partnerName}
                    </p>
                    <p className="mt-1 text-xs text-[#9AC0B8]">{programme.deliveryMode}</p>
                  </div>
                )}
              </div>
              <figcaption className="mt-3 text-xs text-[#9AC0B8]">
                Supervised remote project training bridging classroom coursework at IDH with
                practical delivery at {programme.partnerName}.
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* SECTION 02 — 4-STAGE PROGRESSION FROM IDH TO METAWAVE INNOVATIONS */}
      <section className="border-b border-[#DAE5E0] bg-white py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-wide text-[#047857]">
              Progression Architecture
            </p>
            <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-[#091815] sm:text-4xl">
              From IDH Coursework to{' '}
              <em className="italic text-[#047857]">Supervised Project Experience.</em>
            </h2>
            <p className="mt-3 text-base text-[#425652]">
              A transparent, merit-checked pathway from foundational academy learning to remote
              practical training and dual certification.
            </p>
          </div>

          <ol className="mt-9 grid grid-cols-1 overflow-hidden rounded-2xl border border-[#DAE5E0] bg-[#FAFBF9] sm:grid-cols-2 lg:grid-cols-4">
            {programme.pathwaySteps.map((item, idx) => {
              const Icon = STEP_ICONS[idx] ?? Award;
              const dividerClasses = [
                idx < 3 ? 'border-b border-[#DAE5E0]' : '',
                idx < 2 ? 'sm:border-b' : 'sm:border-b-0',
                idx % 2 === 0 ? 'sm:border-r sm:border-[#DAE5E0]' : 'sm:border-r-0',
                idx < 3 ? 'lg:border-b-0 lg:border-r lg:border-[#DAE5E0]' : 'lg:border-b-0 lg:border-r-0',
              ]
                .filter(Boolean)
                .join(' ');
              return (
                <li
                  key={item.step}
                  className={`flex flex-col justify-between bg-white p-5 transition-colors hover:bg-[#FAFBF9] sm:p-7 ${dividerClasses}`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-mono text-xs font-semibold tabular-nums text-[#B87A0E]">
                        STAGE {item.step}
                      </span>
                      <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#E5EDE9] bg-[#F3F7F5] text-[#047857]">
                        <Icon className="h-4 w-4" aria-hidden="true" />
                      </span>
                    </div>
                    <h3 className="mt-5 font-display text-xl font-semibold text-[#091815]">
                      {item.title}
                    </h3>
                    <p className="mt-0.5 text-xs font-semibold text-[#047857]">{item.subtitle}</p>
                    <p className="mt-2.5 text-sm leading-relaxed text-[#425652]">
                      {item.description}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* SECTION 03 — INTERACTIVE QUALIFICATION CHECKER & DUAL CERTIFICATION */}
      <section className="py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
            {/* Left: Interactive Eligibility & Programme Fee Planner */}
            <div className="lg:col-span-7 overflow-hidden rounded-2xl border border-[#DAE5E0] bg-white">
              <div
                className="h-[3px] w-full bg-gradient-to-r from-[#051B16] via-[#047857] to-[#D99B26]"
                aria-hidden="true"
              />
              <div className="p-5 sm:p-8">
                <p className="text-xs font-semibold tracking-wide text-[#047857]">
                  Interactive Eligibility &amp; Fee Planner
                </p>
                <h2 className="mt-1.5 font-display text-2xl font-semibold text-[#091815]">
                  Check Qualification &amp; Programme Fee
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-[#425652]">
                  Adjust your IDH course status, Internship Entrance Test percentage, and selected
                  track duration ({INTERNSHIP_MIN_MONTHS}–{INTERNSHIP_MAX_MONTHS} months) to verify
                  qualification and total fee breakdown.
                </p>

                <div className="mt-6 space-y-6">
                  {/* Requirement 1: IDH Course Completion Toggle */}
                  <div className="rounded-xl border border-[#E2ECE7] bg-[#FAFBF9] p-4">
                    <div className="flex min-h-[44px] items-start gap-3">
                      <input
                        id="internship-course-completed"
                        type="checkbox"
                        checked={courseCompleted}
                        onChange={(e) => setCourseCompleted(e.target.checked)}
                        className="mt-0.5 h-5 w-5 shrink-0 rounded border-[#CEDBD5] text-[#047857] focus:ring-[#047857]"
                      />
                      <label
                        htmlFor="internship-course-completed"
                        className="cursor-pointer select-none"
                      >
                        <span className="block text-sm font-semibold text-[#091815]">
                          Completed an IDH Course
                        </span>
                        <span className="mt-0.5 block text-xs leading-relaxed text-[#425652]">
                          Required before qualifying for {programme.partnerName}&rsquo;s remote
                          internship intake.
                        </span>
                      </label>
                    </div>
                  </div>

                  {/* Requirement 2: Entrance Test Score (> 40%) */}
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <label
                        htmlFor="internship-test-score"
                        className="text-sm font-semibold text-[#091815]"
                      >
                        Internship Entrance Test Score:{' '}
                        <span className="font-mono text-[#047857] tabular-nums">
                          {evaluation.clampedScorePercent}%
                        </span>
                      </label>
                      <span className="font-mono text-xs text-[#425652] tabular-nums">
                        Qualifying score: &gt; {INTERNSHIP_MIN_ENTRANCE_SCORE_EXCLUSIVE}%
                      </span>
                    </div>

                    <input
                      id="internship-test-score"
                      type="range"
                      min={0}
                      max={100}
                      step={1}
                      value={evaluation.clampedScorePercent}
                      onChange={(e) => setEntranceTestScorePercent(Number(e.target.value))}
                      className="mt-3 h-3 w-full cursor-pointer accent-[#047857]"
                    />

                    <div
                      className="mt-3 flex flex-wrap items-center gap-2"
                      role="group"
                      aria-label="Quick score presets"
                    >
                      <span className="text-xs font-medium text-[#425652]">Quick test:</span>
                      {SCORE_PRESETS.map((preset) => {
                        const isActive = evaluation.clampedScorePercent === preset;
                        return (
                          <button
                            key={preset}
                            type="button"
                            onClick={() => setEntranceTestScorePercent(preset)}
                            aria-pressed={isActive}
                            className={`min-h-[36px] rounded-lg border px-3 py-1 font-mono text-xs font-semibold tabular-nums transition-colors whitespace-nowrap ${
                              isActive
                                ? 'border-[#051B16] bg-[#051B16] text-white'
                                : 'border-[#DAE5E0] bg-white text-[#425652] hover:bg-[#F3F7F5] hover:text-[#091815]'
                            }`}
                          >
                            {preset}%
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Requirement 3: Programme Duration (3-6 Months) */}
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-sm font-semibold text-[#091815]">
                        Selected Course Duration ({INTERNSHIP_MIN_MONTHS}–{INTERNSHIP_MAX_MONTHS}{' '}
                        Months)
                      </span>
                      <span className="font-mono text-xs text-[#425652] tabular-nums">
                        Fixed rate: {formatPkr(INTERNSHIP_MONTHLY_FEE_PKR)} / month
                      </span>
                    </div>
                    <div
                      className="mt-2.5 grid grid-cols-2 gap-2 sm:grid-cols-4"
                      role="group"
                      aria-label="Select internship duration in months"
                    >
                      {DURATION_OPTIONS.map((months) => {
                        const isSelected = evaluation.validDurationMonths === months;
                        return (
                          <button
                            key={months}
                            type="button"
                            onClick={() => setDurationMonths(months)}
                            aria-pressed={isSelected}
                            className={`min-h-[42px] rounded-lg border px-3 py-2 text-xs font-semibold tabular-nums transition-colors whitespace-nowrap ${
                              isSelected
                                ? 'border-[#051B16] bg-[#051B16] text-white'
                                : 'border-[#DAE5E0] bg-[#FAFBF9] text-[#091815] hover:bg-[#F3F7F5]'
                            }`}
                          >
                            {months} Months
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Dual-coded Live Evaluation Result */}
                  <div
                    role="status"
                    aria-live="polite"
                    className={`rounded-xl border p-5 ${
                      evaluation.qualified
                        ? 'border-[#047857]/35 bg-[#EFF6F3]'
                        : 'border-[#D99B26]/45 bg-[#FFFBEB]'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {evaluation.qualified ? (
                        <CheckCircle2
                          className="mt-0.5 h-5 w-5 shrink-0 text-[#047857]"
                          aria-hidden="true"
                        />
                      ) : (
                        <AlertCircle
                          className="mt-0.5 h-5 w-5 shrink-0 text-[#B45309]"
                          aria-hidden="true"
                        />
                      )}
                      <div className="min-w-0 flex-1">
                        <p
                          className={`text-sm font-bold ${
                            evaluation.qualified ? 'text-[#051B16]' : 'text-[#78350F]'
                          }`}
                        >
                          {evaluation.statusLabel}
                        </p>
                        <p className="mt-1 text-xs leading-relaxed text-[#425652]">
                          {evaluation.statusDetail}
                        </p>

                        <dl className="mt-4 grid grid-cols-1 gap-3 border-t border-[#D6E3DD] pt-4 sm:grid-cols-3">
                          <div>
                            <dt className="text-[11px] text-[#425652]">Monthly Fee</dt>
                            <dd className="mt-0.5 font-mono text-sm font-semibold tabular-nums text-[#091815]">
                              {formatPkr(evaluation.monthlyFeePKR)}
                            </dd>
                          </div>
                          <div>
                            <dt className="text-[11px] text-[#425652]">Selected Duration</dt>
                            <dd className="mt-0.5 font-mono text-sm font-semibold tabular-nums text-[#091815]">
                              {evaluation.validDurationMonths} Months
                            </dd>
                          </div>
                          <div>
                            <dt className="text-[11px] text-[#425652]">Total Estimated Fee</dt>
                            <dd className="mt-0.5 font-mono text-sm font-bold tabular-nums text-[#047857]">
                              {formatPkr(evaluation.totalEstimatedFeePKR)}
                            </dd>
                          </div>
                        </dl>
                      </div>
                    </div>
                  </div>

                  {/* Direct Action Bar inside Planner */}
                  <div className="flex flex-col gap-3 border-t border-[#ECF2EF] pt-5 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-xs leading-relaxed text-[#425652]">
                      Ready to prepare for the entrance test or confirm upcoming batch timings?
                    </p>
                    <Link
                      to="/enroll?interest=internship-programme"
                      className="inline-flex min-h-[42px] shrink-0 items-center justify-center gap-2 rounded-lg bg-[#051B16] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#047857] whitespace-nowrap"
                    >
                      <span>Enquire About Internship</span>
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Dual Certification & Programme Scope */}
            <div className="lg:col-span-5 space-y-6">
              <div className="rounded-2xl border border-[#143D33] bg-[#051B16] p-6 text-white sm:p-8">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#F5B935]">
                  <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                  <span>Dual Certification Recognition</span>
                </div>
                <h2 className="mt-2 font-display text-2xl font-semibold text-white">
                  Certificates Awarded Upon Completion
                </h2>
                <p className="mt-2.5 text-sm leading-relaxed text-[#C6D8D4]">
                  {programme.certificationSummary}
                </p>

                <div className="mt-6 space-y-4 border-t border-white/15 pt-5">
                  {programme.certificates.map((cert, index) => (
                    <div
                      key={cert.title}
                      className="rounded-xl border border-white/15 bg-white/5 p-4"
                    >
                      <p className="font-mono text-[11px] font-semibold tabular-nums text-[#2DD4BF]">
                        CERTIFICATE 0{index + 1} · {cert.issuer}
                      </p>
                      <h3 className="mt-1 font-display text-lg font-semibold text-white">
                        {cert.title}
                      </h3>
                      <p className="mt-1.5 text-xs leading-relaxed text-[#C6D8D4]">
                        {cert.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-[#DAE5E0] bg-white p-6 sm:p-8">
                <h2 className="font-display text-xl font-semibold text-[#091815]">
                  What the Internship Covers
                </h2>
                <ul className="mt-4 space-y-3 text-sm text-[#425652]">
                  {programme.highlights.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <CheckCircle2
                        className="mt-0.5 h-4 w-4 shrink-0 text-[#047857]"
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 border-t border-[#ECF2EF] pt-5">
                  <p className="text-xs font-semibold text-[#091815]">
                    Need Entrance Test or Cohort Guidance?
                  </p>
                  <div className="mt-3 space-y-2.5">
                    {siteConfig.phoneNumbers.map((phoneItem) => (
                      <a
                        key={phoneItem.id}
                        href={phoneItem.href}
                        className="flex min-h-[44px] flex-wrap items-center justify-between gap-2 rounded-lg border border-[#DAE5E0] bg-[#FAFBF9] px-3.5 py-2.5 text-xs font-semibold text-[#091815] transition-colors hover:border-[#047857]/40 hover:bg-white"
                      >
                        <span className="inline-flex items-center gap-2">
                          <Phone className="h-3.5 w-3.5 text-[#047857]" aria-hidden="true" />
                          <span className="tabular-nums">{phoneItem.display}</span>
                        </span>
                        <span className="text-[11px] font-medium text-[#047857]">Call IDH</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 04 — INTERNSHIP & CERTIFICATION FAQ */}
          <div className="mt-14 max-w-4xl">
            <h2 className="font-display text-2xl font-semibold text-[#091815]">
              Internship &amp; Certification Questions
            </h2>
            <div className="mt-6">
              <FaqAccordion items={internshipFaqs} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
