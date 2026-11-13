import test from 'node:test';
import assert from 'node:assert/strict';
import {
  evaluateInternshipEligibility,
  formatPkr,
  INTERNSHIP_MONTHLY_FEE_PKR,
} from './internship';

test('requires strictly more than 40% on the entrance test after IDH course completion', () => {
  const exactBoundary = evaluateInternshipEligibility({
    courseCompleted: true,
    entranceTestScorePercent: 40,
    durationMonths: 3,
  });
  assert.equal(exactBoundary.qualified, false);
  assert.equal(exactBoundary.reasonCode, 'SCORE_TOO_LOW');

  const justAboveBoundary = evaluateInternshipEligibility({
    courseCompleted: true,
    entranceTestScorePercent: 41,
    durationMonths: 3,
  });
  assert.equal(justAboveBoundary.qualified, true);
  assert.equal(justAboveBoundary.reasonCode, 'QUALIFIED');
  assert.equal(justAboveBoundary.eligibleCertificates.length, 2);
});

test('rejects applicants who have not completed an IDH course even with high test scores', () => {
  const incompleteCourse = evaluateInternshipEligibility({
    courseCompleted: false,
    entranceTestScorePercent: 92,
    durationMonths: 6,
  });
  assert.equal(incompleteCourse.qualified, false);
  assert.equal(incompleteCourse.reasonCode, 'COURSE_INCOMPLETE');
  assert.equal(incompleteCourse.eligibleCertificates.length, 0);
});

test('calculates fixed PKR 3,500 monthly fee accurately across 3 to 6 months', () => {
  assert.equal(INTERNSHIP_MONTHLY_FEE_PKR, 3500);

  const threeMonths = evaluateInternshipEligibility({
    courseCompleted: true,
    entranceTestScorePercent: 65,
    durationMonths: 3,
  });
  assert.equal(threeMonths.validDurationMonths, 3);
  assert.equal(threeMonths.monthlyFeePKR, 3500);
  assert.equal(threeMonths.totalEstimatedFeePKR, 10500);
  assert.equal(formatPkr(threeMonths.totalEstimatedFeePKR), 'PKR 10,500');

  const sixMonths = evaluateInternshipEligibility({
    courseCompleted: true,
    entranceTestScorePercent: 78,
    durationMonths: 6,
  });
  assert.equal(sixMonths.validDurationMonths, 6);
  assert.equal(sixMonths.totalEstimatedFeePKR, 21000);
  assert.equal(formatPkr(sixMonths.totalEstimatedFeePKR), 'PKR 21,000');
});

test('clamps out-of-range duration and score inputs safely', () => {
  const clamped = evaluateInternshipEligibility({
    courseCompleted: true,
    entranceTestScorePercent: 140,
    durationMonths: 12,
  });
  assert.equal(clamped.clampedScorePercent, 100);
  assert.equal(clamped.validDurationMonths, 6);
  assert.equal(clamped.qualified, true);

  const clampedLow = evaluateInternshipEligibility({
    courseCompleted: true,
    entranceTestScorePercent: -5,
    durationMonths: 1,
  });
  assert.equal(clampedLow.clampedScorePercent, 0);
  assert.equal(clampedLow.validDurationMonths, 3);
  assert.equal(clampedLow.qualified, false);
});
