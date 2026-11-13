import test from 'node:test';
import assert from 'node:assert/strict';
import { validateContactEnquiry, validateEnrollmentEnquiry } from './validation';

test('validateEnrollmentEnquiry rejects missing required fields', () => {
  const result = validateEnrollmentEnquiry({
    fullName: '',
    email: 'invalid-email',
    phone: '123',
    courseInterest: '',
    privacyConsent: false,
  });

  assert.equal(result.valid, false);
  assert.ok(result.errors.fullName);
  assert.ok(result.errors.email);
  assert.ok(result.errors.phone);
  assert.ok(result.errors.courseInterest);
  assert.ok(result.errors.privacyConsent);
});

test('validateEnrollmentEnquiry accepts and sanitizes valid student enquiry', () => {
  const result = validateEnrollmentEnquiry({
    fullName: '  Amina   Raza  ',
    email: ' Amina.Raza@Example.com ',
    phone: '0310 3816085',
    courseInterest: 'Web Development with AI',
    learningLevel: 'Beginner',
    message: '  Interested in next batch details.  ',
    privacyConsent: true,
    website: '',
  });

  assert.equal(result.valid, true);
  assert.equal(result.sanitized?.fullName, 'Amina Raza');
  assert.equal(result.sanitized?.email, 'amina.raza@example.com');
  assert.equal(result.sanitized?.courseInterest, 'Web Development with AI');
  assert.equal(result.sanitized?.learningLevel, 'Beginner');
});

test('validateContactEnquiry validates topic, message length, and consent', () => {
  const invalid = validateContactEnquiry({
    fullName: 'Tariq',
    email: 'tariq@example.com',
    phone: '0316 3042347',
    topic: 'General Enquiry',
    message: 'Hi',
    privacyConsent: true,
  });
  assert.equal(invalid.valid, false);
  assert.ok(invalid.errors.message);

  const valid = validateContactEnquiry({
    fullName: 'Tariq Ali',
    email: 'tariq@example.com',
    phone: '0316 3042347',
    topic: 'Future Scholarship Enquiry',
    message: 'Please let me know when future scholarship announcements are posted.',
    privacyConsent: true,
  });
  assert.equal(valid.valid, true);
});
