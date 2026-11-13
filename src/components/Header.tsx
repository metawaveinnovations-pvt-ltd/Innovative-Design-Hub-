import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ArrowRight, Menu, Phone, X } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import { IdhLogoMark } from './IdhLogoMark';

const DESKTOP_NAV_LINKS = [
  { to: '/courses', label: 'Courses' },
  { to: '/internship', label: 'Internship' },
  { to: '/instructors', label: 'Instructors' },
  { to: '/scholarships', label: 'Scholarships' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
] as const;

const MOBILE_NAV_LINKS = [
  { to: '/', label: 'Home' },
  ...DESKTOP_NAV_LINKS,
] as const;

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const primaryPhone = siteConfig.phoneNumbers[0]!;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  return (
    <header
      className={`sticky top-0 z-40 border-b border-[#DAE5E0] bg-[#FAFBF9]/95 backdrop-blur-md transition-all duration-200 ${
        isScrolled ? 'shadow-[0_10px_30px_-12px_rgba(5,27,22,0.14)]' : ''
      }`}
    >
      {/* Signature IDH Emerald-to-Gold Crest Rule */}
      <div
        className="h-[3px] w-full bg-gradient-to-r from-[#051B16] via-[#047857] to-[#D99B26]"
        aria-hidden="true"
      />

      <div
        className={`mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 transition-all duration-200 sm:gap-6 sm:px-6 lg:px-8 ${
          isScrolled ? 'py-2.5' : 'py-3.5'
        }`}
      >
        {/* Zone 1: Official IDH Crest + Vertical Brand Hairline + Wordmark & Descriptor */}
        <Link
          to="/"
          aria-label="Innovative Design Hub Home"
          className="inline-flex items-center gap-2.5 rounded-lg py-0.5 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#047857] sm:gap-3"
        >
          <IdhLogoMark size={38} className="h-[32px] w-[32px] sm:h-[38px] sm:w-[38px]" />
          <span
            className="hidden h-7 w-[1.5px] rounded-full bg-gradient-to-b from-[#2DD4BF] via-[#047857] to-[#051B16] opacity-80 sm:block"
            aria-hidden="true"
          />
          <span className="flex flex-col leading-none">
            <span className="font-sans text-[15px] font-bold tracking-tight text-[#091815] sm:text-[17.5px]">
              Innovative <span className="text-[#047857]">Design</span> Hub
            </span>
            <span className="mt-1 hidden text-[10.5px] font-medium tracking-[0.03em] text-[#425652] sm:block">
              {siteConfig.logoSubtitle}
            </span>
          </span>
        </Link>

        {/* Zone 2: Concise Single-Line Academic Navigation */}
        <nav
          aria-label="Primary Navigation"
          className="hidden lg:flex items-center gap-5 xl:gap-7 text-[13.5px] font-semibold text-[#354B46]"
        >
          {DESKTOP_NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `relative py-1.5 whitespace-nowrap shrink-0 transition-colors hover:text-[#051B16] ${
                  isActive
                    ? 'text-[#051B16] after:absolute after:inset-x-0 after:bottom-0 after:h-[2px] after:rounded-full after:bg-gradient-to-r after:from-[#047857] after:to-[#D99B26]'
                    : 'after:absolute after:inset-x-0 after:bottom-0 after:h-[2px] after:scale-x-0 after:rounded-full after:bg-[#047857]/40 after:transition-transform after:duration-200 hover:after:scale-x-100'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Zone 3: Verified Admissions Line + Primary Obsidian CTA + Mobile Toggle */}
        <div className="flex items-center gap-2.5 sm:gap-3.5 shrink-0">
          <a
            href={primaryPhone.href}
            aria-label={`Call IDH Admissions at ${primaryPhone.display}`}
            className="hidden xl:inline-flex items-center gap-1.5 rounded-lg px-2 py-1.5 font-mono text-xs font-medium text-[#354B46] transition-colors hover:bg-[#F3F7F5] hover:text-[#047857] whitespace-nowrap shrink-0 tabular-nums"
          >
            <Phone className="h-3.5 w-3.5 text-[#047857]" aria-hidden="true" />
            <span>{primaryPhone.display}</span>
          </a>

          <span className="hidden h-5 w-px bg-[#DAE5E0] xl:block" aria-hidden="true" />

          <Link
            to="/enroll"
            className="hidden sm:inline-flex min-h-[40px] items-center justify-center gap-1.5 rounded-lg border border-[#09261F] bg-[#051B16] px-4 py-2 text-[13px] font-semibold text-white shadow-[0_6px_16px_-6px_rgba(5,27,22,0.35)] transition-all hover:border-[#047857] hover:bg-[#047857] whitespace-nowrap shrink-0 lg:px-5 lg:py-2.5 lg:text-[13.5px]"
          >
            <span>Enquire Now</span>
            <ArrowRight className="h-3.5 w-3.5 text-[#F5B935]" aria-hidden="true" />
          </Link>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[#CEDBD5] bg-white text-[#091815] transition-colors hover:bg-[#F3F7F5] lg:hidden"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation-drawer"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation-drawer"
          className="max-h-[calc(100dvh-68px)] overflow-y-auto overscroll-contain border-t border-[#DAE5E0] bg-white px-4 pb-6 pt-4 shadow-lg lg:hidden"
        >
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2 border-b border-[#EBF1EE] pb-3 text-xs text-[#425652]">
            <span className="font-semibold text-[#047857]">{siteConfig.logoSubtitle}</span>
            <a
              href={primaryPhone.href}
              className="inline-flex min-h-[32px] items-center gap-1 font-mono font-medium text-[#091815]"
            >
              <Phone className="h-3 w-3 text-[#047857]" aria-hidden="true" />
              <span>{primaryPhone.display}</span>
            </a>
          </div>

          <nav aria-label="Mobile Navigation" className="flex flex-col space-y-1">
            {MOBILE_NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `flex min-h-[44px] items-center rounded-lg px-3 text-base font-medium transition-colors ${
                    isActive
                      ? 'bg-[#F3F7F5] font-semibold text-[#047857]'
                      : 'text-[#091815] hover:bg-[#FAFBF9]'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="mt-4 grid grid-cols-1 gap-2.5 border-t border-[#DAE5E0] pt-4 sm:grid-cols-2">
            <Link
              to="/courses"
              className="inline-flex min-h-[44px] items-center justify-center rounded-lg border border-[#CEDBD5] bg-white px-4 py-2.5 text-sm font-semibold text-[#091815] hover:bg-[#F3F7F5]"
            >
              Explore Courses
            </Link>
            <Link
              to="/enroll"
              className="inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-lg bg-[#051B16] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#047857]"
            >
              <span>Enquire Now</span>
              <ArrowRight className="h-3.5 w-3.5 text-[#F5B935]" aria-hidden="true" />
            </Link>
          </div>

          <p className="mt-4 text-center text-xs font-medium text-[#425652]">
            {siteConfig.tagline}
          </p>
        </div>
      )}
    </header>
  );
};
