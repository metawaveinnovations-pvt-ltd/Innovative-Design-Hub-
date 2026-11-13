import test from 'node:test';
import assert from 'node:assert/strict';
import { COURSES, INSTRUCTORS } from '../data/academyData';
import {
  filterCourses,
  getCourseBySlug,
  getInstructorById,
  getRelatedCourses,
} from './courses';

test('academy lists exactly 7 verified courses and 7 instructors', () => {
  assert.equal(COURSES.length, 7);
  assert.equal(INSTRUCTORS.length, 7);
});

test('every course maps to its verified instructor', () => {
  const expectedMapping: Record<string, string> = {
    'web-development-with-ai': 'Abdul Hannan Memon',
    'graphic-design': 'Muhammad Ahsan Memon',
    'digital-marketing': 'Tofeeque Unar',
    'artificial-intelligence': 'Muhammad Ahmed',
    'english-language-and-conversation-club': 'Muhammad Ashnad Hussain',
    'python-programming': 'Syeda Aleena Fatima',
    'cyber-security': 'Jannat e Khizra',
  };

  for (const [slug, expectedName] of Object.entries(expectedMapping)) {
    const course = getCourseBySlug(slug);
    assert.ok(course, `Expected course ${slug} to exist`);
    const instructor = getInstructorById(course.instructorId);
    assert.ok(instructor, `Expected instructor for ${slug} to exist`);
    assert.equal(instructor.name, expectedName);
  }
});

test('Abdul Hannan Memon is Founder and Muhammad Ahmed is IDH Administrator', () => {
  const founder = getInstructorById('abdul-hannan-memon');
  assert.equal(founder?.isFounder, true);

  const admin = getInstructorById('muhammad-ahmed');
  assert.equal(admin?.isAdministrator, true);
});

test('filterCourses filters by category and search query accurately', () => {
  const pythonResults = filterCourses(COURSES, 'python', 'All');
  assert.equal(pythonResults.length, 1);
  assert.equal(pythonResults[0]?.slug, 'python-programming');

  const designResults = filterCourses(COURSES, '', 'Design & Creative');
  assert.equal(designResults.length, 1);
  assert.equal(designResults[0]?.slug, 'graphic-design');

  const instructorSearch = filterCourses(COURSES, 'Khizra', 'All');
  assert.equal(instructorSearch.length, 1);
  assert.equal(instructorSearch[0]?.slug, 'cyber-security');

  const emptyResults = filterCourses(COURSES, 'nonexistent-topic-xyz', 'All');
  assert.equal(emptyResults.length, 0);
});

test('getRelatedCourses returns valid non-self related courses', () => {
  const webCourse = getCourseBySlug('web-development-with-ai');
  assert.ok(webCourse);
  const related = getRelatedCourses(webCourse);
  assert.equal(related.length, 3);
  assert.ok(related.every((c) => c.slug !== webCourse.slug));
});
