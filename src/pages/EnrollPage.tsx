import React, { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { AlertCircle, CheckCircle2, Loader2, Phone } from 'lucide-react';
import { COURSES } from '../data/academyData';
import { siteConfig } from '../config/siteConfig';
import {
  validateEnrollmentEnquiry,
  type EnrollmentEnquiryInput,
  type LearningLevel,
} from '../utils/validation';
import { SeoHead } from '../components/SeoHead';

const COURSE_OPTIONS = [
  ...COURSES.map((c) => c.title),
  'IDH × MetaWave Internship Programme',
  'Future Scholarship Opportunities',
  'General Guidance (Not Sure Yet)',
] as const;

export const EnrollPage: React.FC = () => {
  const [searchParams] = useSearchParams();

  const initialCourseInterest = useMemo(() => {
    const courseParam = searchParams.get('course');
    const interestParam = searchParams.get('interest');
    if (interestParam === 'internship-programme') {
      return 'IDH × MetaWave Internship Programme';
    }
    if (interestParam === 'future-scholarships') {
      return 'Future Scholarship Opportunities';
    }
    if (courseParam && COURSE_OPTIONS.some((opt) => opt === courseParam)) {
      return courseParam;
    }
    return '';
  }, [searchParams]);

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [courseInterest, setCourseInterest] = useState(initialCourseInterest);
  const [learningLevel, setLearningLevel] = useState<LearningLevel>('');
  const [message, setMessage] = useState('');
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const [website, setWebsite] = useState(''); // Honeypot

  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<keyof EnrollmentEnquiryInput, string>>
  >({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submittedReceipt, setSubmittedReceipt] = useState<{
    referenceId: string;
    courseInterest: string;
  } | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitError(null);

    const validation = validateEnrollmentEnquiry({
      fullName,
      email,
      phone,
      courseInterest,
      learningLevel,
      message,
      privacyConsent,
      website,
    });

    if (!validation.valid || !validation.sanitized) {
      setFieldErrors(validation.errors);
      return;
    }

    setFieldErrors({});
    setSubmitting(true);

    try {
      const response = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(validation.sanitized),
      });

      const data = (await response.json().catch(() => null)) as {
        ok?: boolean;
        referenceId?: string;
        message?: string;
        errors?: Partial<Record<keyof EnrollmentEnquiryInput, string>>;
      } | null;

      if (!response.ok || !data?.ok || !data.referenceId) {
        if (data?.errors) {
          setFieldErrors(data.errors);
        }
        setSubmitError(
          data?.message ??
            'The enquiry service could not accept your submission right now. Please call IDH directly.',
        );
        return;
      }

      setSubmittedReceipt({
        referenceId: data.referenceId,
        courseInterest: validation.sanitized.courseInterest,
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      setSubmitError(
        'Unable to reach the IDH enquiry backend. Please check your connection or call IDH directly by phone.',
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <SeoHead
        title="Enquire Now — Innovative Design Hub (IDH)"
        description="Submit an enrollment enquiry to Innovative Design Hub (IDH) to receive course schedule, fee, and admission guidance."
      />

      <section className="border-b border-[#DAE5E0] bg-gradient-to-b from-[#EFF6F3] to-[#FAFBF9] py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold tracking-[0.14em] text-[#047857] uppercase">
              Enrollment Enquiry
            </p>
            <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-[#091815] sm:text-5xl">
              Start Your Learning <em className="italic text-[#047857]">Journey.</em>
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#425652]">
              Tell us which skill you&rsquo;d like to explore, and the IDH team will reply with
              clear batch timings, fee info, and next steps.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            {/* Main Form */}
            <div className="lg:col-span-7">
              {submittedReceipt ? (
                <div
                  role="status"
                  aria-live="polite"
                  className="rounded-2xl border border-[#047857]/30 bg-white p-6 sm:p-8"
                >
                  <div className="flex items-start gap-3.5">
                    <CheckCircle2
                      className="mt-0.5 h-6 w-6 shrink-0 text-[#047857]"
                      aria-hidden="true"
                    />
                    <div>
                      <h2 className="font-display text-2xl font-bold text-[#0C1B1A]">
                        Enquiry Received
                      </h2>
                      <p className="mt-2 text-sm leading-relaxed text-[#465957]">
                        Thank you. Your enquiry for{' '}
                        <span className="font-semibold text-[#0C1B1A]">
                          {submittedReceipt.courseInterest}
                        </span>{' '}
                        has been recorded by our server.
                      </p>
                      <p className="mt-4 rounded-lg border border-[#DCE5E3] bg-[#F7FAF9] px-4 py-3 font-mono text-xs text-[#0C1B1A]">
                        Reference ID: {submittedReceipt.referenceId}
                      </p>
                      <p className="mt-4 text-xs leading-relaxed text-[#465957]">
                        Need an immediate update? You may call IDH directly on{' '}
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
                      <div className="mt-6 flex flex-wrap gap-3">
                        <button
                          type="button"
                          onClick={() => {
                            setSubmittedReceipt(null);
                            setFullName('');
                            setEmail('');
                            setPhone('');
                            setLearningLevel('');
                            setMessage('');
                            setPrivacyConsent(false);
                          }}
                          className="inline-flex min-h-[44px] items-center justify-center rounded-lg border border-[#DCE5E3] bg-white px-4 py-2 text-sm font-semibold text-[#0C1B1A] hover:bg-[#F7FAF9]"
                        >
                          Submit Another Enquiry
                        </button>
                        <Link
                          to="/courses"
                          className="inline-flex min-h-[44px] items-center justify-center rounded-lg bg-[#047857] px-4 py-2 text-sm font-semibold text-white hover:bg-[#065F46]"
                        >
                          Browse Courses
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  className="rounded-2xl border border-[#DCE5E3] bg-white p-6 sm:p-8"
                >
                  <p className="text-xs text-[#465957]">
                    Fields marked with <span className="font-semibold text-[#B91C1C]">*</span> are
                    required.
                  </p>

                  {submitError && (
                    <div
                      role="alert"
                      className="mt-4 flex items-start gap-2.5 rounded-lg border border-[#FCA5A5] bg-[#FEF2F2] p-4 text-sm text-[#991B1B]"
                    >
                      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                      <span>{submitError}</span>
                    </div>
                  )}

                  {/* Honeypot anti-spam field */}
                  <div className="hidden" aria-hidden="true">
                    <label htmlFor="enroll-website">Leave this field blank</label>
                    <input
                      id="enroll-website"
                      name="website"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                    />
                  </div>

                  <div className="mt-6 space-y-5">
                    <div>
                      <label
                        htmlFor="enroll-fullName"
                        className="block text-sm font-medium text-[#0C1B1A]"
                      >
                        Full name <span className="text-[#B91C1C]">*</span>
                      </label>
                      <input
                        id="enroll-fullName"
                        name="fullName"
                        type="text"
                        required
                        autoComplete="name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        aria-invalid={Boolean(fieldErrors.fullName)}
                        aria-describedby={
                          fieldErrors.fullName ? 'enroll-fullName-error' : undefined
                        }
                        placeholder="Enter your full name"
                        className="mt-1.5 min-h-[44px] w-full rounded-lg border border-[#DAE5E0] bg-[#FAFBF9] px-3.5 py-2.5 text-sm text-[#091815] focus:border-[#047857] focus:bg-white focus:outline-none"
                      />
                      {fieldErrors.fullName && (
                        <p id="enroll-fullName-error" className="mt-1.5 text-xs text-[#B91C1C]">
                          {fieldErrors.fullName}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="enroll-email"
                          className="block text-sm font-medium text-[#091815]"
                        >
                          Email address <span className="text-[#B91C1C]">*</span>
                        </label>
                        <input
                          id="enroll-email"
                          name="email"
                          type="email"
                          required
                          autoComplete="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          aria-invalid={Boolean(fieldErrors.email)}
                          aria-describedby={fieldErrors.email ? 'enroll-email-error' : undefined}
                          placeholder="you@example.com"
                          className="mt-1.5 min-h-[44px] w-full rounded-lg border border-[#DAE5E0] bg-[#FAFBF9] px-3.5 py-2.5 text-sm text-[#091815] focus:border-[#047857] focus:bg-white focus:outline-none"
                        />
                        {fieldErrors.email && (
                          <p id="enroll-email-error" className="mt-1.5 text-xs text-[#B91C1C]">
                            {fieldErrors.email}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="enroll-phone"
                          className="block text-sm font-medium text-[#091815]"
                        >
                          Phone number <span className="text-[#B91C1C]">*</span>
                        </label>
                        <input
                          id="enroll-phone"
                          name="phone"
                          type="tel"
                          required
                          autoComplete="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          aria-invalid={Boolean(fieldErrors.phone)}
                          aria-describedby={fieldErrors.phone ? 'enroll-phone-error' : undefined}
                          placeholder="e.g. 03XX XXXXXXX"
                          className="mt-1.5 min-h-[44px] w-full rounded-lg border border-[#DAE5E0] bg-[#FAFBF9] px-3.5 py-2.5 text-sm text-[#091815] focus:border-[#047857] focus:bg-white focus:outline-none"
                        />
                        {fieldErrors.phone && (
                          <p id="enroll-phone-error" className="mt-1.5 text-xs text-[#B91C1C]">
                            {fieldErrors.phone}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="enroll-course"
                          className="block text-sm font-medium text-[#091815]"
                        >
                          Course of interest <span className="text-[#B91C1C]">*</span>
                        </label>
                        <select
                          id="enroll-course"
                          name="courseInterest"
                          required
                          value={courseInterest}
                          onChange={(e) => setCourseInterest(e.target.value)}
                          aria-invalid={Boolean(fieldErrors.courseInterest)}
                          aria-describedby={
                            fieldErrors.courseInterest ? 'enroll-course-error' : undefined
                          }
                          className="mt-1.5 min-h-[44px] w-full rounded-lg border border-[#DAE5E0] bg-[#FAFBF9] px-3.5 py-2.5 text-sm text-[#091815] focus:border-[#047857] focus:bg-white focus:outline-none"
                        >
                          <option value="">Select a course or interest</option>
                          {COURSE_OPTIONS.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                        {fieldErrors.courseInterest && (
                          <p id="enroll-course-error" className="mt-1.5 text-xs text-[#B91C1C]">
                            {fieldErrors.courseInterest}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="enroll-level"
                          className="block text-sm font-medium text-[#091815]"
                        >
                          Current learning level{' '}
                          <span className="text-xs font-normal text-[#425652]">(Optional)</span>
                        </label>
                        <select
                          id="enroll-level"
                          name="learningLevel"
                          value={learningLevel}
                          onChange={(e) => setLearningLevel(e.target.value as LearningLevel)}
                          className="mt-1.5 min-h-[44px] w-full rounded-lg border border-[#DAE5E0] bg-[#FAFBF9] px-3.5 py-2.5 text-sm text-[#091815] focus:border-[#047857] focus:bg-white focus:outline-none"
                        >
                          <option value="">Prefer not to specify</option>
                          <option value="Beginner">Beginner</option>
                          <option value="Some Experience">Some Experience</option>
                          <option value="Experienced">Experienced</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="enroll-message"
                        className="block text-sm font-medium text-[#091815]"
                      >
                        Message or question{' '}
                        <span className="text-xs font-normal text-[#425652]">(Optional)</span>
                      </label>
                      <textarea
                        id="enroll-message"
                        name="message"
                        rows={4}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Ask about batch schedules, fees, or upcoming opportunities..."
                        className="mt-1.5 w-full rounded-lg border border-[#DAE5E0] bg-[#FAFBF9] px-3.5 py-2.5 text-sm text-[#091815] focus:border-[#047857] focus:bg-white focus:outline-none"
                      />
                    </div>

                    <div>
                      <div className="flex min-h-[44px] items-start gap-3 py-1">
                        <input
                          id="enroll-consent"
                          name="privacyConsent"
                          type="checkbox"
                          checked={privacyConsent}
                          onChange={(e) => setPrivacyConsent(e.target.checked)}
                          aria-invalid={Boolean(fieldErrors.privacyConsent)}
                          aria-describedby={
                            fieldErrors.privacyConsent ? 'enroll-consent-error' : undefined
                          }
                          className="mt-0.5 h-5 w-5 shrink-0 rounded border-[#DAE5E0] text-[#047857] focus:ring-[#047857]"
                        />
                        <label htmlFor="enroll-consent" className="text-xs leading-relaxed text-[#425652]">
                          I agree to allow Innovative Design Hub (IDH) to contact me using the
                          details provided above in response to this enquiry, in accordance with
                          the{' '}
                          <Link to="/privacy" className="font-semibold text-[#047857] underline">
                            Privacy Policy
                          </Link>
                          . <span className="text-[#B91C1C]">*</span>
                        </label>
                      </div>
                      {fieldErrors.privacyConsent && (
                        <p id="enroll-consent-error" className="mt-1.5 text-xs text-[#B91C1C]">
                          {fieldErrors.privacyConsent}
                        </p>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-lg bg-[#051B16] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#047857] disabled:cursor-not-allowed disabled:opacity-65"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                          <span>Submitting Enquiry...</span>
                        </>
                      ) : (
                        <span>Submit Enrollment Enquiry</span>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Sidebar Guidance */}
            <aside className="lg:col-span-5 space-y-6">
              <div className="rounded-xl border border-[#DCE5E3] bg-white p-6 sm:p-8">
                <h2 className="font-display text-xl font-bold text-[#0C1B1A]">
                  Prefer to Speak Directly?
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-[#465957]">
                  You can reach Innovative Design Hub directly on our verified phone lines for
                  course and admission guidance.
                </p>

                <div className="mt-5 space-y-3">
                  {siteConfig.phoneNumbers.map((phoneItem) => (
                    <a
                      key={phoneItem.id}
                      href={phoneItem.href}
                      className="flex min-h-[48px] flex-wrap items-center justify-between gap-x-3 gap-y-1 rounded-lg border border-[#DAE5E0] bg-[#FAFBF9] px-4 py-3 text-sm font-semibold text-[#091815] transition-colors hover:border-[#047857]/40 hover:bg-white"
                    >
                      <span className="inline-flex items-center gap-2.5">
                        <Phone className="h-4 w-4 text-[#047857]" aria-hidden="true" />
                        <span className="tabular-nums">{phoneItem.display}</span>
                      </span>
                      <span className="text-xs font-normal text-[#425652]">{phoneItem.label}</span>
                    </a>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-[#143D33] bg-[#051B16] p-6 text-white sm:p-8">
                <h2 className="font-display text-lg font-semibold text-white">
                  What Happens After You Enquire
                </h2>
                <ul className="mt-4 space-y-3 text-sm leading-relaxed text-[#C4D7D4]">
                  <li>• No account creation or identity document upload is required at this stage.</li>
                  <li>
                    • The IDH team reviews your selected course and contacts you with confirmed
                    schedule, fee, and batch information.
                  </li>
                  <li>
                    • Students completing an IDH course who score above 40% in the Internship
                    Entrance Test qualify for MetaWave Innovations&rsquo; 3–6 month remote
                    internship (PKR 3,500/month).
                  </li>
                  <li>
                    • Note: The 2026 Skill Development Scholarship Program closed on 21 September
                    2026. Select &ldquo;Future Scholarship Opportunities&rdquo; if you wish to
                    enquire about upcoming announcements.
                  </li>
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
};
