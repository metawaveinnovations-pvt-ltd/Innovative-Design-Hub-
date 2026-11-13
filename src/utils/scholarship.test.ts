import test from 'node:test';
import assert from 'node:assert/strict';
import { siteConfig, type ScholarshipRound } from '../config/siteConfig';
import { getPublicScholarshipRounds, resolveScholarshipState } from './scholarship';

test('2026 scholarship round strictly contains 6 courses and excludes Cyber Security', () => {
  const round2026 = siteConfig.scholarshipRounds[0];
  assert.ok(round2026);
  assert.equal(round2026.courses.length, 6);

  const titles = round2026.courses.map((c) => c.title);
  assert.deepEqual(titles, [
    'Graphic Design',
    'Foundation of AI',
    'Python Programming',
    'Web Design with AI',
    'English Language Program',
    'Digital Marketing',
  ]);
  assert.equal(titles.includes('Cyber Security'), false);
});

test('2026 scholarship round resolves as Closed after 21 September 2026', () => {
  const round2026 = siteConfig.scholarshipRounds[0];
  assert.ok(round2026);
  const state = resolveScholarshipState(round2026, new Date('2026-11-13T12:00:00Z'));

  assert.equal(state.effectiveStatus, 'Closed');
  assert.equal(state.statusHeading, 'Applications Closed — 2026 Round');
  assert.equal(state.isAcceptingApplications, false);
  assert.equal(state.isDeadlinePassed, true);
});

test('expired scholarship marked Open automatically flips to Closed and rejects applications', () => {
  const expiredOpenRound: ScholarshipRound = {
    ...siteConfig.scholarshipRounds[0]!,
    status: 'Open',
    deadlineISO: '2026-09-21',
  };
  const state = resolveScholarshipState(expiredOpenRound, new Date('2026-10-01T00:00:00Z'));

  assert.equal(state.effectiveStatus, 'Closed');
  assert.equal(state.isAcceptingApplications, false);
});

test('future Open scholarship before deadline allows applications and hides Draft rounds', () => {
  const futureOpenRound: ScholarshipRound = {
    ...siteConfig.scholarshipRounds[0]!,
    id: 'idh-scholarship-2027',
    year: 2027,
    status: 'Open',
    deadlineISO: '2027-06-01',
    deadlineDisplay: '1 June 2027',
  };
  const draftRound: ScholarshipRound = {
    ...futureOpenRound,
    id: 'idh-scholarship-draft',
    status: 'Draft',
  };

  const openState = resolveScholarshipState(futureOpenRound, new Date('2027-03-01T00:00:00Z'));
  assert.equal(openState.effectiveStatus, 'Open');
  assert.equal(openState.isAcceptingApplications, true);

  const visible = getPublicScholarshipRounds([draftRound, futureOpenRound]);
  assert.equal(visible.length, 1);
  assert.equal(visible[0]?.id, 'idh-scholarship-2027');
});
