export type LearningLevel = '' | 'Beginner' | 'Some Experience' | 'Experienced';

export interface EnrollmentEnquiryInput {
  fullName: string;
  email: string;
  phone: string;
  courseInterest: string;
  learningLevel?: LearningLevel;
  message?: string;
  privacyConsent: boolean;
  website?: string; // Honeypot field (must remain empty)
}

export interface ContactEnquiryInput {
  fullName: string;
  email: string;
  phone: string;
  topic: string;
  message: string;
  privacyConsent: boolean;
  website?: string; // Honeypot field
}

export interface ValidationResult<T> {
  valid: boolean;
  errors: Partial<Record<keyof T, string>>;
  sanitized?: T;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_PATTERN = /^[+\d][\d\s()-]{6,18}\d$/;

export function sanitizeText(value: string | undefined, maxLength: number): string {
  if (!value) return '';
  return value.trim().replace(/\s+/g, ' ').slice(0, maxLength);
}

export function sanitizeMultilineText(value: string | undefined, maxLength: number): string {
  if (!value) return '';
  return value.trim().slice(0, maxLength);
}

export function validateEnrollmentEnquiry(
  input: EnrollmentEnquiryInput,
): ValidationResult<EnrollmentEnquiryInput> {
  const errors: Partial<Record<keyof EnrollmentEnquiryInput, string>> = {};

  const fullName = sanitizeText(input.fullName, 120);
  const email = sanitizeText(input.email, 160).toLowerCase();
  const phone = sanitizeText(input.phone, 32);
  const courseInterest = sanitizeText(input.courseInterest, 120);
  const learningLevel = input.learningLevel ?? '';
  const message = sanitizeMultilineText(input.message, 1500);
  const website = sanitizeText(input.website, 80);

  if (fullName.length < 2) {
    errors.fullName = 'Please enter your full name (at least 2 characters).';
  }

  if (!email) {
    errors.email = 'Please enter your email address.';
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!phone) {
    errors.phone = 'Please enter a valid phone number.';
  } else if (!PHONE_PATTERN.test(phone)) {
    errors.phone = 'Please enter a valid phone number (at least 8 digits).';
  }

  if (!courseInterest) {
    errors.courseInterest = 'Please select a course or learning interest.';
  }

  if (
    learningLevel !== '' &&
    learningLevel !== 'Beginner' &&
    learningLevel !== 'Some Experience' &&
    learningLevel !== 'Experienced'
  ) {
    errors.learningLevel = 'Please choose a valid learning level.';
  }

  if (!input.privacyConsent) {
    errors.privacyConsent =
      'Please confirm your consent so IDH can contact you regarding your enquiry.';
  }

  if (Object.keys(errors).length > 0) {
    return { valid: false, errors };
  }

  return {
    valid: true,
    errors: {},
    sanitized: {
      fullName,
      email,
      phone,
      courseInterest,
      learningLevel,
      message,
      privacyConsent: true,
      website,
    },
  };
}

export function validateContactEnquiry(
  input: ContactEnquiryInput,
): ValidationResult<ContactEnquiryInput> {
  const errors: Partial<Record<keyof ContactEnquiryInput, string>> = {};

  const fullName = sanitizeText(input.fullName, 120);
  const email = sanitizeText(input.email, 160).toLowerCase();
  const phone = sanitizeText(input.phone, 32);
  const topic = sanitizeText(input.topic, 120);
  const message = sanitizeMultilineText(input.message, 1500);
  const website = sanitizeText(input.website, 80);

  if (fullName.length < 2) {
    errors.fullName = 'Please enter your full name.';
  }

  if (!email) {
    errors.email = 'Please enter your email address.';
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!phone) {
    errors.phone = 'Please enter your phone number.';
  } else if (!PHONE_PATTERN.test(phone)) {
    errors.phone = 'Please enter a valid phone number.';
  }

  if (!topic) {
    errors.topic = 'Please select an enquiry topic.';
  }

  if (message.length < 10) {
    errors.message = 'Please include a brief message (at least 10 characters).';
  }

  if (!input.privacyConsent) {
    errors.privacyConsent =
      'Please confirm your consent so the IDH team can respond to your message.';
  }

  if (Object.keys(errors).length > 0) {
    return { valid: false, errors };
  }

  return {
    valid: true,
    errors: {},
    sanitized: {
      fullName,
      email,
      phone,
      topic,
      message,
      privacyConsent: true,
      website,
    },
  };
}
