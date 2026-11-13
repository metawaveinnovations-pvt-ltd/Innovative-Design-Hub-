import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import type { Instructor } from '../data/academyData';
import { getCourseTheme } from '../utils/courseTheme';

interface InstructorCardProps {
  instructor: Instructor;
  compact?: boolean;
}

export const InstructorCard: React.FC<InstructorCardProps> = ({
  instructor,
  compact = false,
}) => {
  const theme = getCourseTheme(instructor.courseSlug);

  return (
    <article
      className={`flex h-full flex-col justify-between overflow-hidden rounded-xl border border-[#DAE5E0] bg-white transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[0_16px_32px_-16px_rgba(5,27,22,0.12)] ${theme.hoverBorderClass}`}
    >
      <div className={`h-[3px] w-full ${theme.topBarClass}`} aria-hidden="true" />

      <div className="flex flex-1 flex-col justify-between p-6">
        <div>
          <div className="flex items-start gap-3.5">
            <div
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-[#E6EEEA] font-display text-base font-semibold ${theme.avatarBgClass} ${theme.avatarTextClass}`}
              aria-hidden="true"
            >
              {instructor.initials}
            </div>

            <div className="min-w-0">
              <h3 className="font-display text-lg font-semibold leading-snug text-[#091815]">
                {instructor.name}
              </h3>
              <p className={`mt-0.5 text-xs font-medium leading-snug ${theme.accentTextClass}`}>
                {instructor.roleTitle}
              </p>
            </div>
          </div>

          <p className={`mt-4 text-sm leading-relaxed text-[#425652] ${compact ? 'line-clamp-2' : ''}`}>
            {instructor.teachingFocus}
          </p>
        </div>

        <div className="mt-5 flex flex-wrap items-end justify-between gap-3 border-t border-[#ECF2EF] pt-4">
          <div className="min-w-0">
            <p className="text-[11px] font-medium text-[#617672]">Course Taught</p>
            <p className="mt-0.5 text-sm font-semibold leading-snug text-[#091815]">
              {instructor.courseTitle}
            </p>
          </div>

          <Link
            to={`/courses/${instructor.courseSlug}`}
            className="inline-flex min-h-[40px] shrink-0 items-center gap-1 rounded-lg border border-[#DAE5E0] bg-[#FAFBF9] px-3.5 py-2 text-xs font-semibold text-[#051B16] transition-colors hover:border-[#051B16] hover:bg-[#051B16] hover:text-white whitespace-nowrap"
            aria-label={`View ${instructor.courseTitle} course`}
          >
            <span>View Course</span>
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
};
