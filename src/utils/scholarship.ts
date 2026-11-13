import type { ScholarshipRound, ScholarshipStatus } from '../config/siteConfig';

export interface ResolvedScholarshipState {
  effectiveStatus: ScholarshipStatus;
  statusHeading: string;
  isAcceptingApplications: boolean;
  isDeadlinePassed: boolean;
}

/**
 * Evaluates a scholarship round against the current date.
 * Ensures an expired round can never present as active or accept applications,
 * even if an administrator has not yet manually flipped status from 'Open' to 'Closed'.
 */
export function resolveScholarshipState(
  round: ScholarshipRound,
  referenceDate: Date = new Date(),
): ResolvedScholarshipState {
  const deadlineEnd = new Date(`${round.deadlineISO}T23:59:59Z`);
  const isDeadlinePassed = referenceDate.getTime() > deadlineEnd.getTime();

  let effectiveStatus: ScholarshipStatus = round.status;
  if (round.status === 'Open' && isDeadlinePassed) {
    effectiveStatus = 'Closed';
  }

  const isAcceptingApplications = effectiveStatus === 'Open' && !isDeadlinePassed;

  let statusHeading: string;
  switch (effectiveStatus) {
    case 'Open':
      statusHeading = `Applications Open — ${round.year} Round`;
      break;
    case 'Closed':
      statusHeading = `Applications Closed — ${round.year} Round`;
      break;
    case 'Archived':
      statusHeading = `Archived Program — ${round.year} Round`;
      break;
    case 'Draft':
    default:
      statusHeading = `Program Overview — ${round.year} Round`;
      break;
  }

  return {
    effectiveStatus,
    statusHeading,
    isAcceptingApplications,
    isDeadlinePassed,
  };
}

export function getPublicScholarshipRounds(
  rounds: readonly ScholarshipRound[],
): ScholarshipRound[] {
  return rounds.filter((round) => round.status !== 'Draft');
}
