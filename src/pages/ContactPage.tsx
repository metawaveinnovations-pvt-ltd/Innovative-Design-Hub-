import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, ArrowRight, CheckCircle2, Loader2, Phone } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import { validateContactEnquiry, type ContactEnquiryInput } from '../utils/validation';
import { SeoHead } from '../components/SeoHead';

const CONTACT_TOPICS = [
  'General Academy Enquiry',
  'Course Schedule & Fee Information',
  'IDH × MetaWave Internship Programme',
  'Future Scholarship Opportunities',
  'Student Support',
] as const;

export const ContactPage: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [topic, setTopic] = useState<string>(CONTACT_TOPICS[0]);
  const [message, setMessage] = useState('');
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const [website, setWebsite] = useState('');

  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<keyof ContactEnquiryInput, string>>
  >({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [receiptId, setReceiptId] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitError(null);

    const validation = validateContactEnquiry({
      fullName,
      email,
      phone,
      topic,
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
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(validation.sanitized),
      });

      const data = (await response.json().catch(() => null)) as {
        ok?: boolean;
        referenceId?: string;
        message?: string;
        errors?: Partial<Record<keyof ContactEnquiryInput, string>>;
      } | null;

      if (!response.ok || !data?.ok || !data.referenceId) {
        if (data?.errors) {
          setFieldErrors(data.errors);
        }
        setSubmitError(
          data?.message ??
            'Could not record your message right now. Please call IDH directly using the phone numbers listed.',
        );
        return;
      }

      setReceiptId(data.referenceId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      setSubmitError(
        'Unable to reach the IDH contact backend. Please call IDH directly by phone.',
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <SeoHead
        title="Contact IDH — Innovative Design Hub"
        description="Contact Innovative Design Hub (IDH) by phone on 03103816085 or 0316 3042347, or submit a general enquiry message online."
      />

      <section className="border-b border-[#DAE5E0] bg-gradient-to-b from-[#EFF6F3] to-[#FAFBF9] py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold tracking-[0.14em] text-[#047857] uppercase">
            Contact IDH
          </p>
          <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-[#091815] sm:text-5xl">
            Get in Touch With <em className="italic text-[#047857]">Innovative Design Hub.</em>
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#425652]">
            Have a question about upcoming batches, course fit, or future scholarships? Call or send
            us a message anytime.
          </p>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            {/* Contact Channels & Shortcuts */}
            <div className="lg:col-span-5 space-y-6">
              <div className="rounded-xl border border-[#DCE5E3] bg-white p-6 sm:p-8">
                <h2 className="font-display text-xl font-bold text-[#0C1B1A]">
                  Verified Phone Numbers
                </h2>
                <p className="mt-2 text-sm text-[#465957]">
                  Tap either number below to place a call directly from your device.
                </p>

                <div className="mt-5 space-y-3">
                  {siteConfig.phoneNumbers.map((phoneItem) => (
                    <a
                      key={phoneItem.id}
                      href={phoneItem.href}
                      className="flex min-h-[52px] flex-wrap items-center justify-between gap-x-3 gap-y-1 rounded-lg border border-[#DAE5E0] bg-[#FAFBF9] px-4 py-3 transition-colors hover:border-[#047857]/40 hover:bg-white"
                    >
                      <span className="inline-flex items-center gap-2.5 text-base font-semibold text-[#091815]">
                        <Phone className="h-4 w-4 text-[#047857]" aria-hidden="true" />
                        <span className="tabular-nums">{phoneItem.display}</span>
                      </span>
                      <span className="text-xs text-[#425652]">{phoneItem.label}</span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Enquiry Shortcuts */}
              <div className="rounded-xl border border-[#DAE5E0] bg-white p-6 sm:p-8 space-y-4">
                <h2 className="font-display text-lg font-bold text-[#091815]">
                  Quick Enquiry Shortcuts
                </h2>
                <Link
                  to="/enroll"
                  className="flex min-h-[56px] items-center justify-between gap-3 rounded-lg border border-[#DAE5E0] bg-[#FAFBF9] p-4 transition-colors hover:border-[#047857]/40 hover:bg-white"
                >
                  <div>
                    <p className="font-display text-sm font-semibold text-[#091815]">
                      Course Enrollment Enquiry
                    </p>
                    <p className="mt-0.5 text-xs text-[#425652]">
                      Choose a specific IDH course and learning level
                    </p>
                  </div>
                  <ArrowRight className="h-4 w-4 shrink-0 text-[#047857]" aria-hidden="true" />
                </Link>

                <Link
                  to="/internship"
                  className="flex min-h-[56px] items-center justify-between gap-3 rounded-lg border border-[#DAE5E0] bg-[#FAFBF9] p-4 transition-colors hover:border-[#047857]/40 hover:bg-white"
                >
                  <div>
                    <p className="font-display text-sm font-semibold text-[#091815]">
                      IDH × MetaWave Internship Programme
                    </p>
                    <p className="mt-0.5 text-xs text-[#425652]">
                      Entrance test (&gt; 40%), 3–6 month remote training &amp; PKR 3,500/mo details
                    </p>
                  </div>
                  <ArrowRight className="h-4 w-4 shrink-0 text-[#047857]" aria-hidden="true" />
                </Link>

                <Link
                  to="/enroll?interest=future-scholarships"
                  className="flex min-h-[56px] items-center justify-between gap-3 rounded-lg border border-[#DAE5E0] bg-[#FAFBF9] p-4 transition-colors hover:border-[#047857]/40 hover:bg-white"
                >
                  <div>
                    <p className="font-display text-sm font-semibold text-[#091815]">
                      Future Scholarship Opportunities
                    </p>
                    <p className="mt-0.5 text-xs text-[#425652]">
                      Register interest in future IDH scholarship rounds
                    </p>
                  </div>
                  <ArrowRight className="h-4 w-4 shrink-0 text-[#047857]" aria-hidden="true" />
                </Link>
              </div>
            </div>

            {/* General Contact Form */}
            <div className="lg:col-span-7">
              {receiptId ? (
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
                        Message Received
                      </h2>
                      <p className="mt-2 text-sm text-[#465957]">
                        Your contact message has been recorded by the IDH server.
                      </p>
                      <p className="mt-4 rounded-lg border border-[#DCE5E3] bg-[#F7FAF9] px-4 py-3 font-mono text-xs text-[#0C1B1A]">
                        Reference ID: {receiptId}
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setReceiptId(null);
                          setFullName('');
                          setEmail('');
                          setPhone('');
                          setMessage('');
                          setPrivacyConsent(false);
                        }}
                        className="mt-6 inline-flex min-h-[44px] items-center justify-center rounded-lg border border-[#DCE5E3] bg-white px-4 py-2 text-sm font-semibold text-[#0C1B1A] hover:bg-[#F7FAF9]"
                      >
                        Send Another Message
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  className="rounded-2xl border border-[#DCE5E3] bg-white p-6 sm:p-8"
                >
                  <h2 className="font-display text-2xl font-bold text-[#0C1B1A]">
                    Send a General Enquiry
                  </h2>
                  <p className="mt-1.5 text-sm text-[#465957]">
                    All fields marked <span className="text-[#B91C1C]">*</span> are required.
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

                  <div className="hidden" aria-hidden="true">
                    <label htmlFor="contact-website">Leave this blank</label>
                    <input
                      id="contact-website"
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
                        htmlFor="contact-fullName"
                        className="block text-sm font-medium text-[#0C1B1A]"
                      >
                        Full name <span className="text-[#B91C1C]">*</span>
                      </label>
                      <input
                        id="contact-fullName"
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="mt-1.5 min-h-[44px] w-full rounded-lg border border-[#DAE5E0] bg-[#FAFBF9] px-3.5 py-2.5 text-sm text-[#091815] focus:border-[#047857] focus:bg-white focus:outline-none"
                      />
                      {fieldErrors.fullName && (
                        <p className="mt-1 text-xs text-[#B91C1C]">{fieldErrors.fullName}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="contact-email"
                          className="block text-sm font-medium text-[#091815]"
                        >
                          Email address <span className="text-[#B91C1C]">*</span>
                        </label>
                        <input
                          id="contact-email"
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="mt-1.5 min-h-[44px] w-full rounded-lg border border-[#DAE5E0] bg-[#FAFBF9] px-3.5 py-2.5 text-sm text-[#091815] focus:border-[#047857] focus:bg-white focus:outline-none"
                        />
                        {fieldErrors.email && (
                          <p className="mt-1 text-xs text-[#B91C1C]">{fieldErrors.email}</p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="contact-phone"
                          className="block text-sm font-medium text-[#091815]"
                        >
                          Phone number <span className="text-[#B91C1C]">*</span>
                        </label>
                        <input
                          id="contact-phone"
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="mt-1.5 min-h-[44px] w-full rounded-lg border border-[#DAE5E0] bg-[#FAFBF9] px-3.5 py-2.5 text-sm text-[#091815] focus:border-[#047857] focus:bg-white focus:outline-none"
                        />
                        {fieldErrors.phone && (
                          <p className="mt-1 text-xs text-[#B91C1C]">{fieldErrors.phone}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="contact-topic"
                        className="block text-sm font-medium text-[#091815]"
                      >
                        Topic <span className="text-[#B91C1C]">*</span>
                      </label>
                      <select
                        id="contact-topic"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        className="mt-1.5 min-h-[44px] w-full rounded-lg border border-[#DAE5E0] bg-[#FAFBF9] px-3.5 py-2.5 text-sm text-[#091815] focus:border-[#047857] focus:bg-white focus:outline-none"
                      >
                        {CONTACT_TOPICS.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="contact-message"
                        className="block text-sm font-medium text-[#091815]"
                      >
                        Message <span className="text-[#B91C1C]">*</span>
                      </label>
                      <textarea
                        id="contact-message"
                        rows={4}
                        required
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="mt-1.5 w-full rounded-lg border border-[#DAE5E0] bg-[#FAFBF9] px-3.5 py-2.5 text-sm text-[#091815] focus:border-[#047857] focus:bg-white focus:outline-none"
                      />
                      {fieldErrors.message && (
                        <p className="mt-1 text-xs text-[#B91C1C]">{fieldErrors.message}</p>
                      )}
                    </div>

                    <div>
                      <div className="flex min-h-[44px] items-start gap-3 py-1">
                        <input
                          id="contact-consent"
                          type="checkbox"
                          checked={privacyConsent}
                          onChange={(e) => setPrivacyConsent(e.target.checked)}
                          className="mt-0.5 h-5 w-5 shrink-0 rounded border-[#DAE5E0] text-[#047857] focus:ring-[#047857]"
                        />
                        <label
                          htmlFor="contact-consent"
                          className="text-xs leading-relaxed text-[#425652]"
                        >
                          I consent to IDH using this information to respond to my enquiry under
                          the{' '}
                          <Link to="/privacy" className="font-semibold text-[#047857] underline">
                            Privacy Policy
                          </Link>
                          . <span className="text-[#B91C1C]">*</span>
                        </label>
                      </div>
                      {fieldErrors.privacyConsent && (
                        <p className="mt-1 text-xs text-[#B91C1C]">
                          {fieldErrors.privacyConsent}
                        </p>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-lg bg-[#051B16] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#047857] disabled:opacity-65"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                          <span>Sending Message...</span>
                        </>
                      ) : (
                        <span>Send Message</span>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
