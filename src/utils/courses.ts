import {
  COURSES,
  INSTRUCTORS,
  type Course,
  type CourseCategory,
  type CourseSlug,
  type Instructor,
} from '../data/academyData';

export type CourseFilterCategory = 'All' | CourseCategory;

export function filterCourses(
  courses: readonly Course[],
  query: string,
  category: CourseFilterCategory,
): Course[] {
  const normalizedQuery = query.trim().toLowerCase();

  return courses.filter((course) => {
    if (category !== 'All' && course.category !== category) {
      return false;
    }
    if (!normalizedQuery) {
      return true;
    }
    const instructor = getInstructorById(course.instructorId);
    const searchableText = [
      course.title,
      course.code,
      course.category,
      course.shortDescription,
      instructor?.name ?? '',
    ]
      .join(' ')
      .toLowerCase();

    return searchableText.includes(normalizedQuery);
  });
}

export function getCourseBySlug(slug: string | undefined): Course | undefined {
  if (!slug) {
    return undefined;
  }
  return COURSES.find((course) => course.slug === slug);
}

export function getInstructorById(id: string): Instructor | undefined {
  return INSTRUCTORS.find((instructor) => instructor.id === id);
}

export function getRelatedCourses(course: Course): Course[] {
  return course.relatedSlugs
    .map((slug: CourseSlug) => COURSES.find((item) => item.slug === slug))
    .filter((item): item is Course => Boolean(item));
}
