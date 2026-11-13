import React, { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Award, CheckCircle2, Info, Phone } from 'lucide-react';
import { FAQ_ITEMS } from '../data/academyData';
import { siteConfig } from '../config/siteConfig';
import { getCourseBySlug, getInstructorById, getRelatedCourses } from '../utils/courses';
import { getCourseTheme } from '../utils/courseTheme';
import { SeoHead } from '../components/SeoHead';
import { CourseIcon } from '../components/CourseIcon';
import { CourseCard } from '../components/CourseCard';
import { FaqAccordion } from '../components/FaqAccordion';

export const CourseDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const course = getCourseBySlug(slug);
  const instructor = course ? getInstructorById(course.instructorId) : undefined;
  const relatedCourses = course ? getRelatedCourses(course) : [];
  const theme = course ? getCourseTheme(course.slug) : null;

  const relevantFaqs = useMemo(
    () => FAQ_ITEMS.filter((item) => item.category !== 'Scholarships').slice(0, 4),
    [],
  );

  const courseSchema = useMemo(() => {
    if (!course) return undefined;
    return {
      '@context': 'https://schema.org',
      '@type': 'Course',
      name: course.title,
      courseCode: course.code,
      description: course.introductoryOverview,
      provider: {
        '@type': 'EducationalOrganization',
        name: siteConfig.organizationName,
      },
      instructor: instructor
        ? {
            '@type': 'Person',
            name: instructor.name,
          }
        : undefined,
    };
  }, [course, instructor]);

  if (!course || !theme) {
    return (
      <>
        <SeoHead
          title="Course Not Found — Innovative Design Hub (IDH)"
          description="The requested course could not be found. Browse all seven courses offered by Innovative Design Hub."
        />
        <section className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
          <h1 className="font-display text-3xl font-bold text-[#0C1B1A]">Course not found</h1>
          <p className="mt-3 text-base text-[#435754]">
            We could not find a course matching that address. Please browse our available courses
            or contact IDH directly.
          </p>
          <div className="mt-7 flex justify-center gap-3">
            <Link
              to="/courses"
              className="inline-flex min-h-[44px] items-center justify-center rounded-xl bg-[#047857] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#059669]"
            >
              Browse All Courses
            </Link>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <SeoHead
        title={`${course.title} — Innovative Design Hub (IDH)`}
        description={course.shortDescription}
        structuredData={courseSchema}
      />

      {/* Course Header */}
      <section className="border-b border-[#DAE5E0] bg-gradient-to-b from-[#EFF6F3] to-[#FAFBF9] py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-6">
            <Link
              to="/courses"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#425652] hover:text-[#047857]"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              <span>All Courses</span>
            </Link>
          </nav>

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#425652]">
                <span className={`font-mono font-semibold tabular-nums ${theme.accentTextClass}`}>
                  {course.code}
                </span>
                <span aria-hidden="true">·</span>
                <span>{course.category}</span>
              </div>

              <div className="mt-4 flex items-start gap-3.5 sm:items-center sm:gap-4">
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#DAE5E0] sm:h-13 sm:w-13 ${theme.iconBgClass} ${theme.iconTextClass}`}
                >
                  <CourseIcon slug={course.slug} className="h-6 w-6" />
                </div>
                <h1 className="font-display text-[28px] font-semibold leading-[1.15] tracking-tight text-[#091815] sm:text-4xl lg:text-5xl">
                  {course.title}
                </h1>
              </div>

              <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#425652] sm:text-lg">
                {course.introductoryOverview}
              </p>
            </div>

            {/* Enrollment & Instructor Summary Card */}
            <aside className="lg:col-span-4">
              <div className="overflow-hidden rounded-xl border border-[#DAE5E0] bg-white shadow-sm">
                <div className={`h-[3px] w-full ${theme.topBarClass}`} aria-hidden="true" />
                <div className="p-6">
                  <p className={`text-xs font-semibold tracking-wide uppercase ${theme.accentTextClass}`}>
                    Your Course Instructor
                  </p>
                  <div className="mt-3 flex items-center gap-3.5">
                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-[#E6EEEA] font-display text-base font-semibold ${theme.avatarBgClass} ${theme.avatarTextClass}`}
                      aria-hidden="true"
                    >
                      {instructor?.initials ?? 'ID'}
                    </div>
                    <div>
                      <p className="font-display text-base font-semibold text-[#091815]">
                        {instructor?.name ?? 'IDH Faculty'}
                      </p>
                      <p className="text-xs text-[#425652]">{instructor?.roleTitle}</p>
                    </div>
                  </div>

                  <div className="mt-5 border-t border-[#ECF2EF] pt-5">
                    <p className="text-xs font-bold text-[#091815]">
                      Batch Timings, Fees &amp; Admission
                    </p>
                    <p className="mt-1.5 text-xs leading-relaxed text-[#425652]">
                      Send an enquiry or call IDH directly to get upcoming cohort dates, class
                      schedules, and fee details.
                    </p>
                  </div>

                  <div className="mt-6 flex flex-col gap-2.5">
                    <Link
                      to={`/enroll?course=${encodeURIComponent(course.title)}`}
                      className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg bg-[#051B16] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#047857]"
                    >
                      <span>Enquire About This Course</span>
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                    <a
                      href={siteConfig.phoneNumbers[0]!.href}
                      className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg border border-[#DAE5E0] bg-[#FAFBF9] px-4 py-2.5 text-sm font-semibold text-[#091815] transition-colors hover:border-[#051B16] hover:bg-white"
                    >
                      <Phone className="h-4 w-4 text-[#047857]" aria-hidden="true" />
                      <span className="tabular-nums">Call {siteConfig.phoneNumbers[0]!.display}</span>
                    </a>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Subject Overview & Suitability */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="lg:col-span-6 rounded-2xl border border-[#DCE8E3] bg-white p-6 sm:p-8">
              <h2 className="font-display text-xl font-bold text-[#0C1B1A]">
                Who Will Enjoy This Course
              </h2>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-[#435754]">
                {course.whoItSuits.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <CheckCircle2
                      className="mt-0.5 h-4 w-4 shrink-0 text-[#059669]"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-6 rounded-2xl border border-[#DCE8E3] bg-white p-6 sm:p-8">
              <h2 className="font-display text-xl font-bold text-[#0C1B1A]">
                What You Will Explore
              </h2>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-[#435754]">
                {course.subjectAreas.map((area) => (
                  <li key={area} className="flex items-start gap-2.5">
                    <CheckCircle2
                      className="mt-0.5 h-4 w-4 shrink-0 text-[#059669]"
                      aria-hidden="true"
                    />
                    <span>{area}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Learning Information Notice */}
          <div className="mt-8 rounded-2xl border border-[#CBE0D8] bg-[#ECFDF5]/45 p-6 flex items-start gap-3.5">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-[#047857]" aria-hidden="true" />
            <div>
              <h2 className="font-display text-base font-bold text-[#0C1B1A]">
                Get Confirmed Batch Information
              </h2>
              <p className="mt-1 text-sm leading-relaxed text-[#435754]">{course.learningNotes}</p>
            </div>
          </div>

          {/* Post-Course Internship Pathway */}
          <div className="mt-5 rounded-2xl border border-[#DAE5E0] bg-white p-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3.5">
              <Award className="mt-0.5 h-5 w-5 shrink-0 text-[#B87A0E]" aria-hidden="true" />
              <div>
                <h2 className="font-display text-base font-bold text-[#091815]">
                  IDH × {siteConfig.internshipProgramme.partnerName} Internship Pathway
                </h2>
                <p className="mt-1 text-sm leading-relaxed text-[#425652]">
                  Graduates who complete this course and achieve more than{' '}
                  <span className="font-semibold text-[#091815]">40%</span> on the Internship
                  Entrance Test qualify for 3–6 months of supervised remote internship training at{' '}
                  <span className="font-semibold text-[#091815]">PKR 3,500/month</span>, earning
                  both an IDH Course Completion Certificate and a MetaWave Innovations Internship
                  Certificate upon meeting respective requirements.
                </p>
              </div>
            </div>
            <Link
              to="/internship"
              className="inline-flex min-h-[42px] shrink-0 items-center justify-center gap-1.5 rounded-lg border border-[#051B16] bg-[#FAFBF9] px-4 py-2 text-xs font-semibold text-[#051B16] transition-colors hover:bg-[#051B16] hover:text-white whitespace-nowrap"
            >
              <span>View Internship Details</span>
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>

          {/* Related Courses */}
          <div className="mt-14">
            <div className="flex items-center justify-between gap-4">
              <h2 className="font-display text-2xl font-bold text-[#0C1B1A]">
                Explore Similar Courses
              </h2>
              <Link
                to="/courses"
                className="text-sm font-semibold text-[#047857] hover:text-[#059669]"
              >
                All Courses
              </Link>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {relatedCourses.map((related, idx) => (
                <CourseCard
                  key={related.slug}
                  course={related}
                  spanTabletFull={relatedCourses.length === 3 && idx === 2}
                />
              ))}
            </div>
          </div>

          {/* Course FAQ */}
          <div className="mt-14 max-w-4xl">
            <h2 className="font-display text-2xl font-bold text-[#0C1B1A]">
              Common Admission Questions
            </h2>
            <div className="mt-6">
              <FaqAccordion items={relevantFaqs} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
