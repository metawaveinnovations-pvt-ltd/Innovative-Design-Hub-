import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Award,
  BookOpen,
  Briefcase,
  CalendarClock,
  CheckCircle2,
  Compass,
  GraduationCap,
  Layers,
  MessageCircle,
  Phone,
  Search,
  Sparkles,
  Users,
} from 'lucide-react';
import {
  COURSES,
  COURSE_CATEGORIES,
  FAQ_ITEMS,
  INSTRUCTORS,
} from '../data/academyData';
import { siteConfig } from '../config/siteConfig';
import { filterCourses, type CourseFilterCategory } from '../utils/courses';
import { resolveScholarshipState } from '../utils/scholarship';
import { SeoHead } from '../components/SeoHead';
import { HeroWorkspaceShowcase } from '../components/HeroWorkspaceShowcase';
import { IdhLogoMark, IdhOfficialBrandPlate } from '../components/IdhLogoMark';
import { CourseCard } from '../components/CourseCard';
import { InstructorCard } from '../components/InstructorCard';
import { FaqAccordion } from '../components/FaqAccordion';
import craftMentorshipImg from '../assets/images/idh_craft_mentorship_studio_1794603249555.jpg';
import internshipAtelierImg from '../assets/images/idh_metawave_internship_atelier_1794606355339.jpg';
import scholarshipAtelierImg from '../assets/images/idh_scholarship_merit_atelier_1794603250288.jpg';
import studentClarityImg from '../assets/images/idh_student_clarity_desk_1794603250342.jpg';

const VALUE_STRIP_ITEMS = [
  {
    index: '01',
    title: 'Project-Minded Craft',
    description:
      'Every subject emphasizes structured principles and real digital output—building confidence that lasts.',
    icon: Layers,
  },
  {
    index: '02',
    title: 'Seven Focused Tracks',
    description:
      'Web with AI, Graphic Design, Python, Artificial Intelligence, Cyber Security, Marketing & English.',
    icon: Compass,
  },
  {
    index: '03',
    title: 'Named Academy Mentors',
    description:
      'Learn directly from an identified instructor assigned to each subject from day one.',
    icon: Users,
  },
  {
    index: '04',
    title: 'Direct Admission Clarity',
    description:
      'Reach our team by enquiry or phone for transparent batch schedules, fees, and intake guidance.',
    icon: MessageCircle,
  },
] as const;

const JOURNEY_STEPS = [
  {
    step: '01',
    title: 'Explore',
    subtitle: 'Review the Seven Tracks',
    description:
      'Compare course outlines, topics, and assigned instructors across technology, design, and communication.',
    icon: Compass,
  },
  {
    step: '02',
    title: 'Select',
    subtitle: 'Align With Your Goal',
    description:
      'Choose the discipline that matches your curiosity—whether building websites, designing visuals, or coding in Python.',
    icon: BookOpen,
  },
  {
    step: '03',
    title: 'Connect',
    subtitle: 'Receive Direct Guidance',
    description:
      'Submit an online enquiry or speak by phone with IDH for confirmed schedules, formats, and fee details.',
    icon: MessageCircle,
  },
  {
    step: '04',
    title: 'Begin',
    subtitle: 'Start Building Real Skills',
    description:
      'Step into your confirmed cohort with clear expectations, structured lessons, and dedicated instructor support.',
    icon: GraduationCap,
  },
] as const;

const STUDENT_EXPERIENCE_POINTS = [
  'Transparent course introductions across all seven IDH digital skill disciplines',
  'Frictionless enquiry and contact routes with zero forced account signups',
  'Full visibility into every assigned course instructor before you reach out',
  'Clear historical documentation for the 2026 Skill Development Scholarship Program',
  'Responsive reading and discovery engineered cleanly for mobile phones and laptops',
] as const;

export const HomePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CourseFilterCategory>('All');
  const [creativeImgFailed, setCreativeImgFailed] = useState(false);
  const [internshipImgFailed, setInternshipImgFailed] = useState(false);
  const [scholarshipImgFailed, setScholarshipImgFailed] = useState(false);
  const [studentImgFailed, setStudentImgFailed] = useState(false);
  const internshipProgramme = siteConfig.internshipProgramme;

  const filteredCourses = useMemo(
    () => filterCourses(COURSES, searchQuery, selectedCategory),
    [searchQuery, selectedCategory],
  );

  const categoryCounts = useMemo(() => {
    const counts: Record<CourseFilterCategory, number> = {
      All: COURSES.length,
      'Technology & AI': COURSES.filter((c) => c.category === 'Technology & AI').length,
      'Design & Creative': COURSES.filter((c) => c.category === 'Design & Creative').length,
      'Marketing & Communication': COURSES.filter(
        (c) => c.category === 'Marketing & Communication',
      ).length,
    };
    return counts;
  }, []);

  const primaryScholarship = siteConfig.scholarshipRounds[0];
  const scholarshipState = primaryScholarship
    ? resolveScholarshipState(primaryScholarship)
    : null;

  const founder = INSTRUCTORS[0];
  const facultyRoster = INSTRUCTORS.slice(1);

  const organizationSchema = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@type': 'EducationalOrganization',
      name: siteConfig.organizationName,
      alternateName: siteConfig.shortName,
      founder: {
        '@type': 'Person',
        name: siteConfig.founderName,
      },
      description:
        'Digital skills development and learning academy offering courses in Web Development with AI, Graphic Design, Digital Marketing, Artificial Intelligence, English Language, Python Programming, and Cyber Security.',
      telephone: siteConfig.phoneNumbers.map((p) => p.display),
    }),
    [],
  );

  return (
    <>
      <SeoHead
        title="Innovative Design Hub (IDH) — Learn Digital Skills. Build Your Future."
        description="Explore practical digital skills learning in Web Development with AI, Graphic Design, Digital Marketing, Artificial Intelligence, Python, Cyber Security, and English with IDH."
        structuredData={organizationSchema}
      />

      {/* SECTION 01 — LUXURY ACADEMY HERO */}
      <section className="border-b border-[#DAE5E0] bg-gradient-to-b from-[#EFF6F3] via-[#F7FAF8] to-[#FAFBF9]">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-6">
              <p className="text-xs font-semibold tracking-wide text-[#047857]">
                Innovative Design Hub · {siteConfig.logoSubtitle}
              </p>

              <h1 className="mt-3 font-display text-[32px] font-semibold leading-[1.12] tracking-tight text-[#091815] sm:mt-3.5 sm:text-5xl lg:text-[54px] lg:leading-[1.08]">
                Learn Refined Skills.{' '}
                <em className="italic text-[#047857]">Create Your Future.</em>
              </h1>

              <p className="mt-5 max-w-xl text-base leading-relaxed text-[#425652] sm:text-[17px]">
                Where dedicated mentorship meets real digital craft—master{' '}
                <span className="font-medium text-[#091815]">
                  web development with AI, graphic design, Python, artificial intelligence, digital
                  marketing, cyber security, and spoken English
                </span>
                .
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  to="/courses"
                  className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-lg bg-[#051B16] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#047857] whitespace-nowrap"
                >
                  <span>Explore All Courses</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link
                  to="/enroll"
                  className="inline-flex min-h-[48px] items-center justify-center rounded-lg border border-[#CEDBD5] bg-white px-6 py-3 text-sm font-semibold text-[#091815] transition-colors hover:border-[#051B16] hover:bg-[#F3F7F5] whitespace-nowrap"
                >
                  Enquire for Admission
                </Link>
              </div>

              <div className="mt-7 flex flex-col gap-1.5 border-t border-[#DDE8E3] pt-5 text-xs text-[#425652] sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-3">
                <span className="font-semibold text-[#091815]">
                  Learn Skills. <span className="text-[#B87A0E]">Build Projects.</span> Create Your
                  Future.
                </span>
                <span className="hidden text-[#9BB0AA] sm:inline lg:hidden xl:inline" aria-hidden="true">
                  ·
                </span>
                <span>Founded by {siteConfig.founderName}</span>
              </div>
            </div>

            <div className="lg:col-span-6">
              <HeroWorkspaceShowcase />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 02 — IDH PILLARS MANIFESTO */}
      <section
        aria-label="Core academy standards at Innovative Design Hub"
        className="border-b border-[#DAE5E0] bg-[#F3F7F5]"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {VALUE_STRIP_ITEMS.map((item, idx) => {
              const Icon = item.icon;
              const borderClasses = [
                idx < 3 ? 'border-b border-[#DAE5E0]' : '',
                idx < 2 ? 'sm:border-b' : 'sm:border-b-0',
                idx % 2 === 0 ? 'sm:border-r sm:border-[#DAE5E0]' : 'sm:border-r-0',
                idx < 3 ? 'lg:border-b-0 lg:border-r lg:border-[#DAE5E0]' : 'lg:border-b-0 lg:border-r-0',
              ]
                .filter(Boolean)
                .join(' ');
              const padClasses = [
                'py-5 sm:p-6 lg:py-6 lg:px-5',
                idx === 0 ? 'lg:pl-0' : '',
                idx === 3 ? 'lg:pr-0' : '',
                idx % 2 === 0 ? 'sm:pl-0 lg:pl-5' : 'sm:pr-0 lg:pr-5',
              ]
                .filter(Boolean)
                .join(' ');
              return (
                <div
                  key={item.title}
                  className={`flex items-start gap-3.5 ${borderClasses} ${padClasses}`}
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#D4E2DC] bg-white text-[#047857]">
                    <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-mono text-[11px] font-semibold tabular-nums text-[#B87A0E]">
                      {item.index}
                    </p>
                    <h2 className="mt-0.5 font-display text-base font-semibold text-[#091815]">
                      {item.title}
                    </h2>
                    <p className="mt-1 text-xs leading-relaxed text-[#425652]">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 03 — CURATED COURSES ATELIER */}
      <section id="courses" className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold tracking-wide text-[#047857]">
                Academic Disciplines
              </p>
              <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-[#091815] sm:text-4xl">
                Curated Courses <em className="italic text-[#047857]">Worth Mastering.</em>
              </h2>
              <p className="mt-3 text-base text-[#425652]">
                Filter by discipline or search directly to examine each subject, core focus areas,
                and the dedicated instructor guiding it.
              </p>
            </div>
            <Link
              to="/courses"
              className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-[#051B16] transition-colors hover:text-[#047857] whitespace-nowrap"
            >
              <span>Browse Full Directory</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          {/* Search & Category Filter Bar */}
          <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative w-full lg:max-w-sm">
              <label htmlFor="home-course-search" className="sr-only">
                Search courses by title or instructor
              </label>
              <Search
                className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#425652]"
                aria-hidden="true"
              />
              <input
                id="home-course-search"
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search courses or instructors..."
                className="min-h-[44px] w-full rounded-lg border border-[#DAE5E0] bg-white py-2.5 pl-10 pr-4 text-sm text-[#091815] placeholder:text-[#6B7C79] focus:border-[#047857] focus:outline-none"
              />
            </div>

            <div
              className="flex flex-wrap items-center gap-1 rounded-xl border border-[#DAE5E0] bg-white p-1"
              role="group"
              aria-label="Filter courses by category"
            >
              {(['All', ...COURSE_CATEGORIES] as const).map((category) => {
                const isActive = selectedCategory === category;
                const count = categoryCounts[category];
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setSelectedCategory(category)}
                    aria-pressed={isActive}
                    className={`min-h-[40px] shrink-0 rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap ${
                      isActive
                        ? 'bg-[#051B16] text-white'
                        : 'text-[#425652] hover:bg-[#F3F7F5] hover:text-[#091815]'
                    }`}
                  >
                    {category} ({count})
                  </button>
                );
              })}
            </div>
          </div>

          {/* Balanced 7-Card Grid */}
          {filteredCourses.length > 0 ? (
            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredCourses.map((course, index) => (
                <CourseCard
                  key={course.slug}
                  course={course}
                  indexNumber={index}
                  featured={filteredCourses.length === 7 && (index === 0 || index === 6)}
                  spanTabletFull={filteredCourses.length === 7 && index === 6}
                />
              ))}
            </div>
          ) : (
            <div className="mt-8 rounded-xl border border-[#DAE5E0] bg-white px-6 py-12 text-center">
              <p className="font-display text-lg font-semibold text-[#091815]">
                No matching courses found
              </p>
              <p className="mt-2 text-sm text-[#425652]">
                No courses matched &ldquo;{searchQuery}&rdquo; in {selectedCategory}.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
                className="mt-5 inline-flex min-h-[40px] items-center justify-center rounded-lg bg-[#051B16] px-5 py-2 text-sm font-semibold text-white hover:bg-[#047857]"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* SECTION 04 — THE IDH MINDSET & CRAFT PHILOSOPHY */}
      <section className="border-y border-[#DAE5E0] bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
            {/* Left Column: Craft Visual + Gallery-Mounted Official IDH Crest */}
            <div className="space-y-5 lg:col-span-6">
              <figure>
                <div className="aspect-[16/10] overflow-hidden rounded-2xl border border-[#DAE5E0] bg-[#051B16]">
                  {!creativeImgFailed ? (
                    <img
                      src={craftMentorshipImg}
                      alt="Hand-inked golden-ratio UI wireframes alongside solid brass calipers and emerald-gold studio material swatches"
                      loading="lazy"
                      decoding="async"
                      referrerPolicy="no-referrer"
                      onError={() => setCreativeImgFailed(true)}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center p-8 text-center text-white">
                      <Sparkles className="h-8 w-8 text-[#F5B935]" aria-hidden="true" />
                      <p className="mt-3 font-display text-base font-semibold">
                        Disciplined Digital Craft
                      </p>
                    </div>
                  )}
                </div>
                <figcaption className="mt-2.5 text-xs text-[#425652]">
                  Intentional structure, visual proportion, and real-world technical foundations.
                </figcaption>
              </figure>

              <IdhOfficialBrandPlate
                compact
                caption={`Founded by ${siteConfig.founderName} · ${siteConfig.organizationName}`}
              />
            </div>

            {/* Right Column: IDH Learning Mindset */}
            <div className="lg:col-span-6">
              <p className="text-xs font-semibold tracking-wide text-[#047857]">
                The IDH Mindset
              </p>
              <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-[#091815] sm:text-4xl">
                Crafted Around{' '}
                <em className="italic text-[#047857]">Real Digital Capability.</em>
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[#425652]">
                True prestige in education comes not from inflated claims, but from clarity,
                mentorship, and disciplined practice. Innovative Design Hub unites creative visual
                disciplines and modern software literacy in a coherent academic setting.
              </p>

              <dl className="mt-8 divide-y divide-[#DAE5E0] border-y border-[#DAE5E0]">
                <div className="flex items-start gap-4 py-5">
                  <span className="font-mono text-xs font-semibold tabular-nums text-[#B87A0E] pt-1">
                    01
                  </span>
                  <div>
                    <dt className="font-display text-lg font-semibold text-[#091815]">
                      Learn skills grounded in real projects
                    </dt>
                    <dd className="mt-1 text-sm leading-relaxed text-[#425652]">
                      From semantic websites and visual identity systems to Python problem-solving
                      and conversational English, study focuses on lasting comprehension.
                    </dd>
                  </div>
                </div>

                <div className="flex items-start gap-4 py-5">
                  <span className="font-mono text-xs font-semibold tabular-nums text-[#B87A0E] pt-1">
                    02
                  </span>
                  <div>
                    <dt className="font-display text-lg font-semibold text-[#091815]">
                      Accountable, named instructors
                    </dt>
                    <dd className="mt-1 text-sm leading-relaxed text-[#425652]">
                      Every course introduces its assigned mentor upfront—including leadership from
                      Founder Abdul Hannan Memon and IDH Administrator Muhammad Ahmed.
                    </dd>
                  </div>
                </div>

                <div className="flex items-start gap-4 py-5">
                  <span className="font-mono text-xs font-semibold tabular-nums text-[#B87A0E] pt-1">
                    03
                  </span>
                  <div>
                    <dt className="font-display text-lg font-semibold text-[#091815]">
                      Verified admission details without guesswork
                    </dt>
                    <dd className="mt-1 text-sm leading-relaxed text-[#425652]">
                      Connect directly via form or verified phone lines to receive confirmed cohort
                      timings, class format, and current tuition details.
                    </dd>
                  </div>
                </div>
              </dl>

              <div className="mt-7 flex flex-wrap items-center gap-4">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#051B16] transition-colors hover:text-[#047857]"
                >
                  <span>Read About IDH</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 05 — ARCHITECTURAL 4-STEP JOURNEY */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold tracking-wide text-[#047857]">
                How Enrollment Works
              </p>
              <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-[#091815] sm:text-4xl">
                From Curiosity to <em className="italic text-[#047857]">Structured Learning.</em>
              </h2>
              <p className="mt-3 text-base text-[#425652]">
                Four deliberate steps to evaluate your discipline and confirm upcoming intake
                details directly with IDH.
              </p>
            </div>
            <Link
              to="/enroll"
              className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-[#051B16] transition-colors hover:text-[#047857] whitespace-nowrap"
            >
              <span>Begin an Enquiry</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <ol className="mt-10 grid grid-cols-1 overflow-hidden rounded-2xl border border-[#DAE5E0] bg-white sm:grid-cols-2 lg:grid-cols-4">
            {JOURNEY_STEPS.map((item, idx) => {
              const Icon = item.icon;
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
                  className={`flex flex-col justify-between p-5 transition-colors hover:bg-[#FAFBF9] sm:p-7 ${dividerClasses}`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-mono text-xs font-semibold tabular-nums text-[#B87A0E]">
                        STEP {item.step}
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

      {/* SECTION 05B — IDH × METAWAVE INNOVATIONS ADVANCED TRAINING & INTERNSHIP PROGRAMME */}
      <section
        aria-labelledby="idh-metawave-internship-heading"
        className="border-t border-[#DAE5E0] bg-white py-16 sm:py-20"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
            <figure className="lg:col-span-6">
              <div className="aspect-[16/10] overflow-hidden rounded-2xl border border-[#DAE5E0] bg-[#051B16]">
                {!internshipImgFailed ? (
                  <img
                    src={internshipAtelierImg}
                    alt="Modern remote software and design mentorship desk prepared for IDH and MetaWave Innovations supervised project experience"
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    onError={() => setInternshipImgFailed(true)}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center p-8 text-center text-white">
                    <Briefcase className="h-8 w-8 text-[#F5B935]" aria-hidden="true" />
                    <p className="mt-3 font-display text-lg font-semibold">
                      IDH × {internshipProgramme.partnerName}
                    </p>
                    <p className="mt-1 text-xs text-[#9AC0B8]">
                      {internshipProgramme.deliveryMode}
                    </p>
                  </div>
                )}
              </div>
              <figcaption className="mt-2.5 text-xs text-[#425652]">
                Supervised remote practical learning and real-world project collaboration following
                IDH course completion.
              </figcaption>
            </figure>

            <div className="lg:col-span-6">
              <div className="flex flex-col gap-y-0.5 text-xs font-semibold text-[#047857] sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-2.5">
                <span>IDH × {internshipProgramme.partnerName}</span>
                <span aria-hidden="true" className="hidden text-[#9BB0AA] sm:inline">
                  ·
                </span>
                <span className="text-[#B87A0E]">Remote Internship Track</span>
              </div>

              <h2
                id="idh-metawave-internship-heading"
                className="mt-2 font-display text-3xl font-semibold tracking-tight text-[#091815] [text-wrap:balance] sm:text-4xl"
              >
                Advanced Training &amp;{' '}
                <em className="italic text-[#047857]">Remote Internship.</em>
              </h2>

              <p className="mt-4 text-base leading-relaxed text-[#425652]">
                {internshipProgramme.eligibilitySummary}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-[#425652]">
                {internshipProgramme.programmeOverview}
              </p>

              <dl className="mt-6 grid grid-cols-1 gap-4 border-y border-[#DAE5E0] py-4 sm:grid-cols-3">
                <div>
                  <dt className="text-[11px] font-medium text-[#617672]">Entrance Test</dt>
                  <dd className="mt-0.5 font-mono text-sm font-semibold tabular-nums text-[#047857]">
                    &gt; {internshipProgramme.entranceTestThresholdPercent}% Score
                  </dd>
                </div>
                <div>
                  <dt className="text-[11px] font-medium text-[#617672]">Duration (Remote)</dt>
                  <dd className="mt-0.5 font-mono text-sm font-semibold tabular-nums text-[#091815]">
                    {internshipProgramme.durationRangeDisplay}
                  </dd>
                </div>
                <div>
                  <dt className="text-[11px] font-medium text-[#617672]">Programme Fee</dt>
                  <dd className="mt-0.5 font-mono text-sm font-semibold tabular-nums text-[#091815]">
                    PKR 3,500 / mo
                  </dd>
                </div>
              </dl>

              <div className="mt-5 flex items-start gap-3 rounded-xl border border-[#DAE5E0] bg-[#FAFBF9] p-4">
                <Award className="mt-0.5 h-5 w-5 shrink-0 text-[#B87A0E]" aria-hidden="true" />
                <p className="text-xs leading-relaxed text-[#425652]">
                  <span className="font-semibold text-[#091815]">Dual Certification: </span>
                  {internshipProgramme.certificationSummary}
                </p>
              </div>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/internship"
                  className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-lg bg-[#051B16] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#047857] whitespace-nowrap"
                >
                  <span>Explore Internship Programme</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link
                  to="/enroll?interest=internship-programme"
                  className="inline-flex min-h-[46px] items-center justify-center rounded-lg border border-[#CEDBD5] bg-white px-5 py-2.5 text-sm font-semibold text-[#091815] transition-colors hover:border-[#051B16] hover:bg-[#F3F7F5] whitespace-nowrap"
                >
                  Enquire About Qualification
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 06 — IDH SCHOLARSHIP PROGRAM (MERIT & ACCESS) */}
      {primaryScholarship && scholarshipState && (
        <section className="relative overflow-hidden border-y border-white/10 bg-[#051B16] py-16 text-white sm:py-20">
          <div
            className="pointer-events-none absolute -right-40 -top-40 h-96 w-96 rounded-full bg-[#047857]/20 blur-3xl"
            aria-hidden="true"
          />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
              <div className="lg:col-span-6">
                <p className="text-xs font-semibold tracking-wide text-[#F5B935]">
                  IDH Scholarship Initiative
                </p>
                <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                  Merit Opportunity in{' '}
                  <em className="italic text-[#2DD4BF]">Digital Education.</em>
                </h2>
                <p className="mt-4 text-base leading-relaxed text-[#C6D8D4]">
                  {primaryScholarship.title} offered 100% tuition fee scholarships across six
                  selected skill tracks, connecting deserving students to live online instruction.
                </p>

                <div className="mt-7 border-y border-white/15 py-5">
                  <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-[#F5B935]">
                    <CalendarClock className="h-4 w-4" aria-hidden="true" />
                    <span>{scholarshipState.statusHeading}</span>
                  </div>

                  <dl className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div>
                      <dt className="text-[11px] text-[#9AC0B8]">2026 Deadline</dt>
                      <dd className="mt-0.5 text-sm font-semibold tabular-nums text-white">
                        {primaryScholarship.deadlineDisplay}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-[11px] text-[#9AC0B8]">Seats (Historical)</dt>
                      <dd className="mt-0.5 text-sm font-semibold tabular-nums text-white">
                        {primaryScholarship.advertisedSeats}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-[11px] text-[#9AC0B8]">Selection &amp; Mode</dt>
                      <dd className="mt-0.5 text-sm font-semibold text-white">
                        Merit · Online Zoom
                      </dd>
                    </div>
                  </dl>

                  <p className="mt-4 text-xs leading-relaxed text-[#9AC0B8]">
                    The 2026 round included live Zoom classes, session recordings, and certificate
                    and internship opportunities. Applications for 2026 are closed.
                  </p>
                </div>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link
                    to="/scholarships"
                    className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-lg bg-[#047857] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#059669] whitespace-nowrap"
                  >
                    <span>View 2026 Program Record</span>
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                  <Link
                    to="/enroll?interest=future-scholarships"
                    className="inline-flex min-h-[46px] items-center justify-center rounded-lg border border-white/25 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:border-[#F5B935]/50 hover:bg-white/10 whitespace-nowrap"
                  >
                    Ask About Future Rounds
                  </Link>
                </div>
              </div>

              <figure className="lg:col-span-6">
                <div className="aspect-[16/10] overflow-hidden rounded-2xl border border-white/15 bg-[#09261F] shadow-xl">
                  {!scholarshipImgFailed ? (
                    <img
                      src={scholarshipAtelierImg}
                      alt="Obsidian study table featuring an online Zoom session laptop alongside a deep emerald portfolio embossed with a gold hexagon crest"
                      loading="lazy"
                      decoding="async"
                      referrerPolicy="no-referrer"
                      onError={() => setScholarshipImgFailed(true)}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center p-8 text-center text-sm text-[#C6D8D4]">
                      IDH Skill Development Scholarship Program 2026
                    </div>
                  )}
                </div>
                <figcaption className="mt-3 text-xs text-[#9AC0B8]">
                  Historical record: merit-based access empowering learners through online cohorts.
                </figcaption>
              </figure>
            </div>
          </div>
        </section>
      )}

      {/* SECTION 07 — LEADERSHIP & FACULTY */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold tracking-wide text-[#047857]">
                Faculty &amp; Leadership
              </p>
              <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-[#091815] sm:text-4xl">
                Guided by Dedicated{' '}
                <em className="italic text-[#047857]">Subject Mentors.</em>
              </h2>
              <p className="mt-3 text-base text-[#425652]">
                Each course at Innovative Design Hub is led by a dedicated instructor committed to
                clear explanations and structured skill growth.
              </p>
            </div>
            <Link
              to="/instructors"
              className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-[#051B16] transition-colors hover:text-[#047857] whitespace-nowrap"
            >
              <span>Meet the Full Team</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          {/* Founder Spotlight Monograph */}
          {founder && (
            <div className="mt-8 overflow-hidden rounded-2xl border border-[#143D33] bg-gradient-to-r from-[#051B16] to-[#09261F] p-6 text-white sm:p-8">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-[#047857]/30">
                    <IdhLogoMark size={38} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold tracking-[0.12em] text-[#2DD4BF] uppercase">
                      Founder &amp; Lead Web Instructor
                    </p>
                    <h3 className="mt-1 font-display text-2xl font-semibold text-white">
                      {founder.name}
                    </h3>
                    <p className="mt-1 text-xs font-semibold text-[#F5B935]">
                      {founder.roleTitle} · {founder.courseTitle}
                    </p>
                    <p className="mt-2.5 max-w-2xl text-sm leading-relaxed text-[#C6D8D4]">
                      {founder.teachingFocus}
                    </p>
                  </div>
                </div>
                <Link
                  to={`/courses/${founder.courseSlug}`}
                  className="inline-flex min-h-[44px] w-full shrink-0 items-center justify-center gap-1.5 rounded-lg bg-[#047857] px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#059669] whitespace-nowrap sm:w-auto"
                >
                  <span>Explore {founder.courseTitle}</span>
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              </div>
            </div>
          )}

          {/* 3x2 Faculty Grid */}
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {facultyRoster.map((instructor) => (
              <InstructorCard key={instructor.id} instructor={instructor} compact />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 08 — CALM, STRUCTURED STUDENT EXPERIENCE */}
      <section className="border-y border-[#DAE5E0] bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-6">
              <p className="text-xs font-semibold tracking-wide text-[#047857]">
                Student Experience
              </p>
              <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-[#091815] sm:text-4xl">
                A Calm, Clear Way to{' '}
                <em className="italic text-[#047857]">Start Learning.</em>
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[#425652]">
                Designed with respect for every prospective learner—explore tracks cleanly, verify
                faculty upfront, and enquire without unnecessary account portals.
              </p>

              <ul className="mt-7 divide-y divide-[#E7EFEA] border-y border-[#E7EFEA]">
                {STUDENT_EXPERIENCE_POINTS.map((point) => (
                  <li key={point} className="flex items-start gap-3 py-3.5 text-sm text-[#091815]">
                    <CheckCircle2
                      className="mt-0.5 h-[18px] w-[18px] shrink-0 text-[#047857]"
                      aria-hidden="true"
                    />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#051B16] transition-colors hover:text-[#047857]"
                >
                  <span>Have a question? Contact the IDH team</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>

            <figure className="lg:col-span-6">
              <div className="aspect-[4/3] overflow-hidden rounded-2xl border border-[#DAE5E0] bg-[#F3F7F5]">
                {!studentImgFailed ? (
                  <img
                    src={studentClarityImg}
                    alt="Serene oak study desk with matte black headphones, tablet displaying emerald-ivory geometry, dot-grid notebook, and travertine backdrop"
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    onError={() => setStudentImgFailed(true)}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center p-8 text-center text-sm text-[#425652]">
                    Calm, Focused Learning Environment
                  </div>
                )}
              </div>
              <figcaption className="mt-2.5 text-xs text-[#425652]">
                Study comfortably with structured clarity across desktop and mobile.
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* SECTION 09 — ASYMMETRIC FAQ & ADMISSIONS CONCIERGE */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-4">
              <p className="text-xs font-semibold tracking-wide text-[#047857]">
                Admissions Information
              </p>
              <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-[#091815]">
                Frequently Asked Questions
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[#425652]">
                Accurate, verified answers on IDH disciplines, faculty leadership, admission
                enquiries, and the closed 2026 scholarship round.
              </p>

              <div className="mt-7 overflow-hidden rounded-xl border border-[#DAE5E0] bg-white">
                <div className="h-[3px] w-full bg-gradient-to-r from-[#051B16] to-[#B87A0E]" aria-hidden="true" />
                <div className="p-5">
                  <p className="font-display text-base font-semibold text-[#091815]">
                    Speak With Admissions Directly
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-[#425652]">
                    Call our verified lines for confirmed timings, tuition details, and guidance.
                  </p>
                  <div className="mt-4 space-y-2.5">
                    {siteConfig.phoneNumbers.map((phone) => (
                      <a
                        key={phone.id}
                        href={phone.href}
                        className="flex min-h-[44px] flex-wrap items-center justify-between gap-2 rounded-lg border border-[#DAE5E0] bg-[#FAFBF9] px-3.5 py-2.5 text-xs font-semibold text-[#091815] transition-colors hover:border-[#051B16] hover:bg-white"
                      >
                        <span className="inline-flex items-center gap-2">
                          <Phone className="h-3.5 w-3.5 text-[#047857]" aria-hidden="true" />
                          <span className="tabular-nums">{phone.display}</span>
                        </span>
                        <span className="text-[11px] font-medium text-[#047857]">Call</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-5">
                <Link
                  to="/faq"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#051B16] transition-colors hover:text-[#047857]"
                >
                  <span>Browse Filtered FAQ Directory</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-8">
              <FaqAccordion items={FAQ_ITEMS} />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 10 — PRESTIGE ENROLLMENT INVITATION */}
      <section className="relative overflow-hidden border-t border-white/10 bg-gradient-to-br from-[#051B16] via-[#09261F] to-[#044032] py-16 text-white sm:py-20">
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mx-auto mb-4 flex justify-center">
            <IdhLogoMark size={44} />
          </div>
          <p className="text-xs font-semibold tracking-wide text-[#F5B935]">
            Learn Skills · Build Projects · Create Your Future
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-white sm:text-5xl">
            Your Next Craft Starts Here.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[#C6D8D4]">
            Explore our seven digital disciplines or send an enquiry to receive verified cohort
            guidance directly from Innovative Design Hub.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              to="/courses"
              className="inline-flex min-h-[48px] items-center justify-center rounded-lg bg-[#047857] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#059669] whitespace-nowrap"
            >
              Explore Courses
            </Link>
            <Link
              to="/enroll"
              className="inline-flex min-h-[48px] items-center justify-center rounded-lg border border-white/25 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-[#F5B935]/50 hover:bg-white/10 whitespace-nowrap"
            >
              Enquire Now
            </Link>
          </div>

          <p className="mt-6 text-xs text-[#9AC0B8]">
            Verified IDH Telephone Lines:{' '}
            <a
              href={siteConfig.phoneNumbers[0]!.href}
              className="font-semibold text-white underline-offset-4 hover:text-[#F5B935] hover:underline tabular-nums"
            >
              {siteConfig.phoneNumbers[0]!.display}
            </a>{' '}
            ·{' '}
            <a
              href={siteConfig.phoneNumbers[1]!.href}
              className="font-semibold text-white underline-offset-4 hover:text-[#F5B935] hover:underline tabular-nums"
            >
              {siteConfig.phoneNumbers[1]!.display}
            </a>
          </p>
        </div>
      </section>
    </>
  );
};
