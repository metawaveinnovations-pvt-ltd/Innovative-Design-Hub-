import React from 'react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../config/siteConfig';
import { SeoHead } from '../components/SeoHead';

export const PrivacyPage: React.FC = () => {
  return (
    <>
      <SeoHead
        title="Privacy Policy — Innovative Design Hub (IDH)"
        description="How Innovative Design Hub handles student enquiry information, consent, and communication."
      />

      <section className="border-b border-[#DCE5E3] bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold tracking-[0.14em] text-[#047857] uppercase">
            Legal &amp; Trust
          </p>
          <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-[#0C1B1A] sm:text-4xl">
            Privacy Policy
          </h1>
          <p className="mt-3 text-sm text-[#465957]">
            Applies to enquiries submitted through the {siteConfig.organizationName} (
            {siteConfig.shortName}) website.
          </p>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-8 rounded-2xl border border-[#DCE5E3] bg-white p-6 text-sm leading-relaxed text-[#465957] sm:p-10">
            <div>
              <h2 className="font-display text-lg font-semibold text-[#0C1B1A]">
                1. Information We Collect
              </h2>
              <p className="mt-2">
                When you submit an enrollment or general contact enquiry, IDH collects only the
                details you intentionally provide: your full name, email address, phone number,
                selected course or enquiry topic, optional learning level, and any message you
                write. We do not require account registration or identity-document uploads on this
                website.
              </p>
            </div>

            <div>
              <h2 className="font-display text-lg font-semibold text-[#0C1B1A]">
                2. How Your Information Is Used
              </h2>
              <p className="mt-2">
                Submitted details are used strictly to respond to your enquiry, share requested
                course or enrollment information, or note interest in future scholarship
                announcements when you explicitly request updates.
              </p>
            </div>

            <div>
              <h2 className="font-display text-lg font-semibold text-[#0C1B1A]">
                3. Consent &amp; Data Protection
              </h2>
              <p className="mt-2">
                Enquiry forms require explicit consent before submission. Submitted records are
                validated and stored on the server for IDH administrative follow-up and are never
                published on public endpoints or sold to third parties.
              </p>
            </div>

            <div>
              <h2 className="font-display text-lg font-semibold text-[#0C1B1A]">
                4. Contact &amp; Removal Requests
              </h2>
              <p className="mt-2">
                If you would like to update or remove enquiry details you have previously
                submitted, please contact IDH directly by phone on{' '}
                <a
                  href={siteConfig.phoneNumbers[0]!.href}
                  className="font-semibold text-[#047857] underline"
                >
                  {siteConfig.phoneNumbers[0]!.display}
                </a>{' '}
                or{' '}
                <a
                  href={siteConfig.phoneNumbers[1]!.href}
                  className="font-semibold text-[#047857] underline"
                >
                  {siteConfig.phoneNumbers[1]!.display}
                </a>
                .
              </p>
            </div>

            <div className="border-t border-[#EDF3F1] pt-6">
              <Link
                to="/enroll"
                className="text-sm font-semibold text-[#047857] hover:text-[#065F46]"
              >
                Return to Enrollment Enquiry
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
