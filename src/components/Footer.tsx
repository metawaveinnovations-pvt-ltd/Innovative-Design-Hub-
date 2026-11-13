import React from 'react';
import { Link } from 'react-router-dom';
import { Phone } from 'lucide-react';
import { COURSES } from '../data/academyData';
import { siteConfig } from '../config/siteConfig';
import { IdhBrandLockup } from './IdhLogoMark';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-[#051B16] text-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-12">
          {/* Academy Overview & Motto */}
          <div className="lg:col-span-4">
            <Link to="/" aria-label="Innovative Design Hub Home" className="inline-flex">
              <IdhBrandLockup inverted />
            </Link>
            <p className="mt-2.5 text-xs font-medium tracking-wide text-[#9AC0B8]">
              — {siteConfig.logoSubtitle} —
            </p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#C6D8D4]">
              An online digital skills academy dedicated to purposeful craft across web
              development with AI, graphic design, digital marketing, artificial intelligence,
              Python programming, cyber security, and spoken English.
            </p>
            <p className="mt-4 text-xs font-semibold tracking-wide text-white">
              Learn Skills. <span className="text-[#F5B935]">Build Projects.</span> Create Your
              Future.
            </p>
          </div>

          {/* Courses Column */}
          <div className="lg:col-span-3">
            <h2 className="font-sans text-xs font-semibold tracking-[0.14em] text-[#9AC0B8] uppercase">
              Courses
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm text-[#DCE9E6]">
              {COURSES.map((course) => (
                <li key={course.slug}>
                  <Link
                    to={`/courses/${course.slug}`}
                    className="transition-colors hover:text-[#F5B935]"
                  >
                    {course.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Academy Links Column */}
          <div className="lg:col-span-2">
            <h2 className="font-sans text-xs font-semibold tracking-[0.14em] text-[#9AC0B8] uppercase">
              Academy
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm text-[#DCE9E6]">
              <li>
                <Link to="/internship" className="transition-colors hover:text-[#F5B935]">
                  IDH × MetaWave Internship
                </Link>
              </li>
              <li>
                <Link to="/instructors" className="transition-colors hover:text-[#F5B935]">
                  Our Instructors
                </Link>
              </li>
              <li>
                <Link to="/scholarships" className="transition-colors hover:text-[#F5B935]">
                  Scholarships
                </Link>
              </li>
              <li>
                <Link to="/about" className="transition-colors hover:text-[#F5B935]">
                  About IDH
                </Link>
              </li>
              <li>
                <Link to="/enroll" className="transition-colors hover:text-[#F5B935]">
                  Enquire Now
                </Link>
              </li>
              <li>
                <Link to="/faq" className="transition-colors hover:text-[#F5B935]">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="transition-colors hover:text-[#F5B935]">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Verified Contact Channels */}
          <div className="lg:col-span-3">
            <h2 className="font-sans text-xs font-semibold tracking-[0.14em] text-[#9AC0B8] uppercase">
              Admissions Desk
            </h2>
            <ul className="mt-4 space-y-3.5 text-sm text-[#DCE9E6]">
              {siteConfig.phoneNumbers.map((phone) => (
                <li key={phone.id}>
                  <a
                    href={phone.href}
                    className="inline-flex items-center gap-2 font-semibold text-white transition-colors hover:text-[#F5B935]"
                  >
                    <Phone className="h-4 w-4 text-[#2DD4BF]" aria-hidden="true" />
                    <span className="tabular-nums">{phone.display}</span>
                  </a>
                  <p className="mt-0.5 pl-6 text-xs text-[#9AC0B8]">{phone.label}</p>
                </li>
              ))}
            </ul>
            <div className="mt-5">
              <Link
                to="/contact"
                className="inline-flex items-center rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-xs font-semibold text-white transition-colors hover:border-[#F5B935]/50 hover:bg-white/10"
              >
                Send a Contact Message
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-[#9AC0B8] sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {currentYear} {siteConfig.organizationName} ({siteConfig.shortName}). Founded by{' '}
            {siteConfig.founderName}.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link to="/privacy" className="transition-colors hover:text-white">
              Privacy Policy
            </Link>
            {siteConfig.isCollaborationAttributionApproved && (
              <span>{siteConfig.collaborationCreditText}</span>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};
