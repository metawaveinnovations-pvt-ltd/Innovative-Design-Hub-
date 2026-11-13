import React from 'react';
import { Link } from 'react-router-dom';
import { SeoHead } from '../components/SeoHead';

export const NotFoundPage: React.FC = () => {
  return (
    <>
      <SeoHead
        title="Page Not Found — Innovative Design Hub (IDH)"
        description="The requested page could not be found on Innovative Design Hub."
      />

      <section className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6">
        <p className="font-mono text-sm font-semibold text-[#B87A0E]">404</p>
        <h1 className="mt-2 font-display text-3xl font-semibold text-[#091815] sm:text-4xl">
          Page not found
        </h1>
        <p className="mt-3 text-base text-[#425652]">
          The page you are looking for does not exist or may have moved. Use the links below to
          explore IDH courses, instructors, scholarships, or enquiries.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            to="/"
            className="inline-flex min-h-[44px] items-center justify-center rounded-lg bg-[#051B16] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#047857]"
          >
            Back to Home
          </Link>
          <Link
            to="/courses"
            className="inline-flex min-h-[44px] items-center justify-center rounded-lg border border-[#DCE5E3] bg-white px-5 py-2.5 text-sm font-semibold text-[#0C1B1A] hover:bg-[#F7FAF9]"
          >
            Browse Courses
          </Link>
          <Link
            to="/enroll"
            className="inline-flex min-h-[44px] items-center justify-center rounded-lg border border-[#DCE5E3] bg-white px-5 py-2.5 text-sm font-semibold text-[#0C1B1A] hover:bg-[#F7FAF9]"
          >
            Enquire Now
          </Link>
        </div>
      </section>
    </>
  );
};
