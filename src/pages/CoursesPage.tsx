import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Search } from 'lucide-react';
import { COURSES, COURSE_CATEGORIES } from '../data/academyData';
import { siteConfig } from '../config/siteConfig';
import { filterCourses, type CourseFilterCategory } from '../utils/courses';
import { SeoHead } from '../components/SeoHead';
import { CourseCard } from '../components/CourseCard';

export const CoursesPage: React.FC = () => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<CourseFilterCategory>('All');

  const filtered = useMemo(() => filterCourses(COURSES, query, category), [query, category]);

  return (
    <>
      <SeoHead
        title="Courses — Innovative Design Hub (IDH)"
        description="Explore all seven digital skill courses offered by Innovative Design Hub: Web Development with AI, Graphic Design, Digital Marketing, Artificial Intelligence, English Language, Python Programming, and Cyber Security."
      />

      <section className="border-b border-[#DAE5E0] bg-gradient-to-b from-[#EFF6F3] to-[#FAFBF9] py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold tracking-[0.14em] text-[#047857] uppercase">
            Academic Directory
          </p>
          <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-[#091815] sm:text-5xl">
            Curated Skills <em className="italic text-[#047857]">Worth Mastering.</em>
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#425652]">
            Explore all seven courses taught at Innovative Design Hub across web &amp; AI, creative
            design, digital marketing, Python, cyber security, and spoken English.
          </p>

          <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative w-full lg:max-w-md">
              <label htmlFor="courses-directory-search" className="sr-only">
                Search courses by name, code, or instructor
              </label>
              <Search
                className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#435754]"
                aria-hidden="true"
              />
              <input
                id="courses-directory-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by course title or instructor..."
                className="min-h-[44px] w-full rounded-xl border border-[#DAE5E0] bg-white py-2.5 pl-10 pr-4 text-sm text-[#091815] placeholder:text-[#6B7C79] focus:border-[#047857] focus:outline-none"
              />
            </div>

            <div
              className="flex flex-wrap items-center gap-1 rounded-xl border border-[#DAE5E0] bg-white p-1"
              role="group"
              aria-label="Filter courses by category"
            >
              {(['All', ...COURSE_CATEGORIES] as const).map((item) => {
                const isActive = category === item;
                const count =
                  item === 'All'
                    ? COURSES.length
                    : COURSES.filter((c) => c.category === item).length;
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setCategory(item)}
                    aria-pressed={isActive}
                    className={`min-h-[40px] shrink-0 rounded-lg px-3.5 py-2 text-xs font-semibold transition-colors whitespace-nowrap ${
                      isActive
                        ? 'bg-[#051B16] text-white shadow-sm'
                        : 'text-[#425652] hover:bg-[#F3F7F5] hover:text-[#091815]'
                    }`}
                  >
                    {item} ({count})
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-center justify-between text-xs text-[#435754]">
            <p className="tabular-nums font-medium">
              Showing {filtered.length} of {COURSES.length} courses
            </p>
            {(query || category !== 'All') && (
              <button
                type="button"
                onClick={() => {
                  setQuery('');
                  setCategory('All');
                }}
                className="font-semibold text-[#047857] hover:text-[#059669]"
              >
                Clear filters
              </button>
            )}
          </div>

          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((course, index) => (
                <CourseCard
                  key={course.slug}
                  course={course}
                  indexNumber={index}
                  featured={filtered.length === 7 && (index === 0 || index === 6)}
                  spanTabletFull={filtered.length === 7 && index === 6}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-[#DCE8E3] bg-white px-6 py-14 text-center">
              <h2 className="font-display text-lg font-bold text-[#0C1B1A]">
                No courses match your search
              </h2>
              <p className="mt-2 text-sm text-[#435754]">
                Try a different keyword or reset the category filter to view all IDH courses.
              </p>
              <button
                type="button"
                onClick={() => {
                  setQuery('');
                  setCategory('All');
                }}
                className="mt-5 inline-flex min-h-[44px] items-center justify-center rounded-xl bg-[#047857] px-5 py-2 text-sm font-semibold text-white hover:bg-[#059669]"
              >
                Show All Courses
              </button>
            </div>
          )}

          {/* Admission Information Banner */}
          <div className="mt-12 rounded-2xl border border-[#CBE0D8] bg-gradient-to-r from-[#ECFDF5]/60 to-white p-6 sm:p-8 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <h2 className="font-display text-xl font-bold text-[#0C1B1A]">
                Have questions about batch timings or fees?
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-[#435754]">
                Our admissions team shares confirmed class timings, fee details, and upcoming batch
                dates directly when you enquire or give us a quick call.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row shrink-0">
              <Link
                to="/enroll"
                className="inline-flex min-h-[44px] items-center justify-center rounded-xl bg-[#047857] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#059669] whitespace-nowrap"
              >
                Enquire Now
              </Link>
              <a
                href={siteConfig.phoneNumbers[0]!.href}
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-[#DCE8E3] bg-white px-4 py-2.5 text-sm font-semibold text-[#0C1B1A] hover:bg-[#ECFDF5]/50 whitespace-nowrap"
              >
                <Phone className="h-4 w-4 text-[#047857]" aria-hidden="true" />
                <span className="tabular-nums">{siteConfig.phoneNumbers[0]!.display}</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
