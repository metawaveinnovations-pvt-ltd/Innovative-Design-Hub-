import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import type { Course } from '../data/academyData';
import { getInstructorById } from '../utils/courses';
import { getCourseTheme } from '../utils/courseTheme';
import { CourseIcon } from './CourseIcon';

interface CourseCardProps {
  course: Course;
  featured?: boolean;
  spanTabletFull?: boolean;
  indexNumber?: number;
}

export const CourseCard: React.FC<CourseCardProps> = ({
  course,
  featured = false,
  spanTabletFull = false,
  indexNumber,
}) => {
  const instructor = getInstructorById(course.instructorId);
  const theme = getCourseTheme(course.slug);
  const formattedIndex =
    typeof indexNumber === 'number' ? String(indexNumber + 1).padStart(2, '0') : null;
  const spanClass = [
    featured ? 'lg:col-span-2' : '',
    spanTabletFull ? 'md:col-span-2' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <article
      className={`group flex h-full flex-col overflow-hidden rounded-xl border border-[#DAE5E0] bg-white transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[0_18px_36px_-16px_rgba(5,27,22,0.14)] ${theme.hoverBorderClass} ${spanClass}`}
    >
      {/* Crisp Architectural Jewel Rule */}
      <div className={`h-[3px] w-full ${theme.topBarClass}`} aria-hidden="true" />

      {featured ? (
        /* Featured 2-Column Editorial Split */
        <div className="grid flex-1 grid-cols-1 lg:grid-cols-12">
          <div className="flex flex-col justify-between p-5 sm:p-7 lg:col-span-7">
            <div>
              <div className="flex items-start justify-between gap-3">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-[#425652]">
                  {formattedIndex && (
                    <>
                      <span
                        className={`font-mono font-semibold tabular-nums ${theme.accentTextClass}`}
                      >
                        {formattedIndex}
                      </span>
                      <span aria-hidden="true">·</span>
                    </>
                  )}
                  <span>{course.category}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono tabular-nums text-[#617672]">{course.code}</span>
                </div>

                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#E6EEEA] ${theme.iconBgClass} ${theme.iconTextClass}`}
                >
                  <CourseIcon slug={course.slug} className="h-5 w-5" />
                </div>
              </div>

              <h3 className="mt-4 font-display text-2xl font-semibold tracking-tight text-[#091815]">
                <Link
                  to={`/courses/${course.slug}`}
                  className="transition-colors hover:text-[#047857] focus-visible:outline-none focus-visible:underline"
                >
                  {course.title}
                </Link>
              </h3>

              <p className="mt-2.5 text-sm leading-relaxed text-[#425652]">
                {course.shortDescription}
              </p>
            </div>

            <div className="mt-6 flex flex-wrap items-end justify-between gap-3 border-t border-[#ECF2EF] pt-4">
              <div className="min-w-0">
                <p className="text-[11px] font-medium text-[#617672]">Instructor</p>
                <p className="text-sm font-semibold leading-snug text-[#091815]">
                  {instructor?.name ?? 'IDH Faculty'}
                </p>
              </div>

              <Link
                to={`/courses/${course.slug}`}
                className="inline-flex min-h-[40px] shrink-0 items-center gap-1.5 rounded-lg border border-[#DAE5E0] bg-[#FAFBF9] px-3.5 py-2 text-xs font-semibold text-[#051B16] transition-colors hover:border-[#051B16] hover:bg-[#051B16] hover:text-white whitespace-nowrap"
                aria-label={`Explore ${course.title}`}
              >
                <span>Explore Course</span>
                <ArrowRight
                  className="h-3.5 w-3.5 transition-transform duration-150 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </div>

          <div className="flex flex-col justify-center border-t border-[#ECF2EF] bg-[#F7FAF8] p-5 sm:p-7 lg:col-span-5 lg:border-l lg:border-t-0">
            <p className={`text-[11px] font-semibold tracking-wider uppercase ${theme.accentTextClass}`}>
              Key Focus Areas
            </p>
            <ul className="mt-3 space-y-2.5 text-xs leading-relaxed text-[#425652]">
              {course.subjectAreas.slice(0, 3).map((topic) => (
                <li key={topic} className="flex items-start gap-2">
                  <Check
                    className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${theme.accentTextClass}`}
                    aria-hidden="true"
                  />
                  <span>{topic}</span>
                </li>
              ))}
            </ul>
            {course.whoItSuits[0] && (
              <p className="mt-4 border-t border-[#E6EEEA] pt-3 text-[11px] leading-relaxed text-[#617672]">
                Ideal for: <span className="font-medium text-[#091815]">{course.whoItSuits[0]}</span>
              </p>
            )}
          </div>
        </div>
      ) : (
        /* Standard 1-Column Luxury Atelier Card */
        <div className="flex flex-1 flex-col justify-between p-5 sm:p-7">
          <div>
            <div className="flex items-start justify-between gap-3">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-[#425652]">
                {formattedIndex && (
                  <>
                    <span className={`font-mono font-semibold tabular-nums ${theme.accentTextClass}`}>
                      {formattedIndex}
                    </span>
                    <span aria-hidden="true">·</span>
                  </>
                )}
                <span>{course.category}</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono tabular-nums text-[#617672]">{course.code}</span>
              </div>

              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#E6EEEA] ${theme.iconBgClass} ${theme.iconTextClass}`}
              >
                <CourseIcon slug={course.slug} className="h-5 w-5" />
              </div>
            </div>

            <h3 className="mt-4 font-display text-xl font-semibold tracking-tight text-[#091815]">
              <Link
                to={`/courses/${course.slug}`}
                className="transition-colors hover:text-[#047857] focus-visible:outline-none focus-visible:underline"
              >
                {course.title}
              </Link>
            </h3>

            <p className="mt-2.5 text-sm leading-relaxed text-[#425652]">
              {course.shortDescription}
            </p>

            {course.whoItSuits[0] && (
              <p className="mt-3 text-xs leading-relaxed text-[#617672]">
                Ideal for: <span className="text-[#425652]">{course.whoItSuits[0]}</span>
              </p>
            )}
          </div>

          <div className="mt-6 flex flex-wrap items-end justify-between gap-3 border-t border-[#ECF2EF] pt-4">
            <div className="min-w-0">
              <p className="text-[11px] font-medium text-[#617672]">Instructor</p>
              <p className="text-sm font-semibold leading-snug text-[#091815]">
                {instructor?.name ?? 'IDH Faculty'}
              </p>
            </div>

            <Link
              to={`/courses/${course.slug}`}
              className="inline-flex min-h-[40px] shrink-0 items-center gap-1.5 rounded-lg border border-[#DAE5E0] bg-[#FAFBF9] px-3.5 py-2 text-xs font-semibold text-[#051B16] transition-colors hover:border-[#051B16] hover:bg-[#051B16] hover:text-white whitespace-nowrap"
              aria-label={`Explore ${course.title}`}
            >
              <span>Explore Course</span>
              <ArrowRight
                className="h-3.5 w-3.5 transition-transform duration-150 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>
      )}
    </article>
  );
};
