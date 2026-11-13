export const INTERNSHIP_MIN_ENTRANCE_SCORE_EXCLUSIVE = 40;
export const INTERNSHIP_MONTHLY_FEE_PKR = 3500;
export const INTERNSHIP_MIN_MONTHS = 3;
export const INTERNSHIP_MAX_MONTHS = 6;

export interface InternshipEvaluationInput {
  courseCompleted: boolean;
  entranceTestScorePercent: number;
  durationMonths: number;
}

export interface InternshipEvaluationResult {
  qualified: boolean;
  reasonCode: 'QUALIFIED' | 'COURSE_INCOMPLETE' | 'SCORE_TOO_LOW';
  statusLabel: string;
  statusDetail: string;
  clampedScorePercent: number;
  validDurationMonths: number;
  monthlyFeePKR: number;
  totalEstimatedFeePKR: number;
  eligibleCertificates: readonly string[];
}

export function clampDurationMonths(months: number): number {
  if (!Number.isFinite(months)) return INTERNSHIP_MIN_MONTHS;
  const rounded = Math.round(months);
  if (rounded < INTERNSHIP_MIN_MONTHS) return INTERNSHIP_MIN_MONTHS;
  if (rounded > INTERNSHIP_MAX_MONTHS) return INTERNSHIP_MAX_MONTHS;
  return rounded;
}

export function clampScorePercent(score: number): number {
  if (!Number.isFinite(score)) return 0;
  const rounded = Math.round(score * 10) / 10;
  if (rounded < 0) return 0;
  if (rounded > 100) return 100;
  return rounded;
}

export function formatPkr(amount: number): string {
  return `PKR ${amount.toLocaleString('en-US')}`;
}

/**
 * Pure qualification & fee computation rule for:
 * IDH × MetaWave Innovations — Advanced Training & Internship Programme
 *
 * Qualification requires:
 * 1. Completing an IDH course (courseCompleted === true)
 * 2. Achieving STRICTLY MORE THAN 40% in the Internship Entrance Test (> 40%)
 */
export function evaluateInternshipEligibility(
  input: InternshipEvaluationInput,
): InternshipEvaluationResult {
  const clampedScorePercent = clampScorePercent(input.entranceTestScorePercent);
  const validDurationMonths = clampDurationMonths(input.durationMonths);
  const monthlyFeePKR = INTERNSHIP_MONTHLY_FEE_PKR;
  const totalEstimatedFeePKR = monthlyFeePKR * validDurationMonths;

  const passesTest = clampedScorePercent > INTERNSHIP_MIN_ENTRANCE_SCORE_EXCLUSIVE;
  const qualified = input.courseCompleted && passesTest;

  let reasonCode: InternshipEvaluationResult['reasonCode'];
  let statusLabel: string;
  let statusDetail: string;

  if (!input.courseCompleted) {
    reasonCode = 'COURSE_INCOMPLETE';
    statusLabel = 'Complete IDH Course First';
    statusDetail =
      'Students must first complete their course at Innovative Design Hub (IDH) before entering the MetaWave Innovations Remote Internship Programme.';
  } else if (!passesTest) {
    reasonCode = 'SCORE_TOO_LOW';
    statusLabel = 'Entrance Score Below Requirement (> 40%)';
    statusDetail = `An entrance test score strictly above ${INTERNSHIP_MIN_ENTRANCE_SCORE_EXCLUSIVE}% is required to qualify (40% or lower does not qualify).`;
  } else {
    reasonCode = 'QUALIFIED';
    statusLabel = 'Qualified for MetaWave Internship';
    statusDetail = `Meets IDH course completion and the > ${INTERNSHIP_MIN_ENTRANCE_SCORE_EXCLUSIVE}% entrance test requirement for ${validDurationMonths} months of supervised remote internship training.`;
  }

  const eligibleCertificates = input.courseCompleted
    ? qualified
      ? [
          'Course Completion Certificate from IDH',
          'Internship Certificate from MetaWave Innovations (upon programme completion)',
        ]
      : ['Course Completion Certificate from IDH (subject to course completion requirements)']
    : [];

  return {
    qualified,
    reasonCode,
    statusLabel,
    statusDetail,
    clampedScorePercent,
    validDurationMonths,
    monthlyFeePKR,
    totalEstimatedFeePKR,
    eligibleCertificates,
  };
}
