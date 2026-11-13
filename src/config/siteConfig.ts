export type ScholarshipStatus = 'Draft' | 'Open' | 'Closed' | 'Archived';

export interface ScholarshipCourseOption {
  title: string;
  historicalNote?: string;
  relatedAcademyCourseSlug?: string;
}

export interface ScholarshipRound {
  id: string;
  year: number;
  title: string;
  subtitle: string;
  status: ScholarshipStatus;
  deadlineISO: string;
  deadlineDisplay: string;
  advertisedSeats: string;
  selectionMethod: string;
  eligibilitySummary: string;
  benefits: readonly string[];
  courses: readonly ScholarshipCourseOption[];
  historicalNotes: readonly string[];
}

export interface ContactPhoneChannel {
  id: string;
  display: string;
  href: string;
  label: string;
}

export interface SocialLinkConfig {
  label: string;
  url: string;
}

export interface InternshipPathwayStep {
  step: string;
  title: string;
  subtitle: string;
  description: string;
}

export interface InternshipProgrammeConfig {
  title: string;
  shortTitle: string;
  partnerName: string;
  entranceTestThresholdPercent: number;
  entranceTestRequirementLabel: string;
  durationRangeDisplay: string;
  monthlyFeePKR: number;
  monthlyFeeDisplay: string;
  deliveryMode: string;
  eligibilitySummary: string;
  programmeOverview: string;
  certificationSummary: string;
  certificates: readonly {
    title: string;
    issuer: string;
    detail: string;
  }[];
  highlights: readonly string[];
  pathwaySteps: readonly InternshipPathwayStep[];
}

export const siteConfig = {
  organizationName: 'Innovative Design Hub',
  shortName: 'IDH',
  logoSubtitle: 'The Creative Designing Hub',
  tagline: 'Learn Skills. Build Projects. Create Your Future.',
  founderName: 'Abdul Hannan Memon',
  /**
   * Partnership attribution flag.
   * Set to true only after public attribution for MetaWave Innovations LTD is formally approved.
   */
  isCollaborationAttributionApproved: false,
  collaborationCreditText: 'Digital experience in collaboration with MetaWave Innovations LTD',
  /**
   * Verified phone numbers only.
   * Add WhatsApp links only when a number is explicitly confirmed as a WhatsApp channel.
   */
  phoneNumbers: [
    {
      id: 'primary-phone',
      display: '03103816085',
      href: 'tel:+923103816085',
      label: 'Primary Admissions & Enquiries',
    },
    {
      id: 'secondary-phone',
      display: '0316 3042347',
      href: 'tel:+923163042347',
      label: 'Student Support & General Information',
    },
  ] as readonly ContactPhoneChannel[],
  /**
   * Populate only with verified official social URLs.
   */
  socialLinks: [] as readonly SocialLinkConfig[],
  /**
   * IDH × MetaWave Innovations — Advanced Training & Internship Programme
   */
  internshipProgramme: {
    title: 'IDH × MetaWave Innovations — Advanced Training & Internship Programme',
    shortTitle: 'Advanced Training & Internship Programme',
    partnerName: 'MetaWave Innovations',
    entranceTestThresholdPercent: 40,
    entranceTestRequirementLabel: 'More than 40% in Internship Entrance Test',
    durationRangeDisplay: '3–6 Months',
    monthlyFeePKR: 3500,
    monthlyFeeDisplay: 'PKR 3,500 per month',
    deliveryMode: 'Remote Internship & Advanced Practical Training',
    eligibilitySummary:
      'Students who complete their courses at Innovative Design Hub (IDH) and achieve more than 40% in the Internship Entrance Test will qualify for MetaWave Innovations\u2019 Advanced Training & Remote Internship Programme.',
    programmeOverview:
      'The programme provides 3–6 months of advanced practical learning, professional skill development, and supervised real-world project experience, depending on the selected course, at a fixed fee of PKR 3,500 per month.',
    certificationSummary:
      'Upon successful completion of the respective programmes, students will receive a Course Completion Certificate from IDH and an Internship Certificate from MetaWave Innovations, subject to the applicable completion requirements.',
    certificates: [
      {
        title: 'Course Completion Certificate',
        issuer: 'Innovative Design Hub (IDH)',
        detail:
          'Awarded upon successful completion of your selected IDH skill course, subject to IDH course completion requirements.',
      },
      {
        title: 'Internship Certificate',
        issuer: 'MetaWave Innovations',
        detail:
          'Awarded upon successful completion of the 3–6 month Advanced Training & Remote Internship Programme, subject to applicable completion requirements.',
      },
    ],
    highlights: [
      '3–6 months of advanced practical learning depending on selected course',
      'Structured professional skill development beyond classroom foundations',
      'Supervised real-world project experience in a remote format',
      'Fixed monthly programme fee of PKR 3,500 per month',
      'Dual certification from IDH and MetaWave Innovations upon completion',
    ],
    pathwaySteps: [
      {
        step: '01',
        title: 'Complete IDH Course',
        subtitle: 'Foundational Mastery',
        description:
          'Complete your enrolled course at Innovative Design Hub (IDH) to build core practical proficiency.',
      },
      {
        step: '02',
        title: 'Pass Entrance Test',
        subtitle: 'More Than 40% Required',
        description:
          'Sit the Internship Entrance Test and achieve strictly above 40% to qualify for the internship track.',
      },
      {
        step: '03',
        title: '3–6 Months Remote Training',
        subtitle: 'PKR 3,500 / Month',
        description:
          'Join MetaWave Innovations for advanced practical learning, professional skill growth, and supervised real-world projects.',
      },
      {
        step: '04',
        title: 'Dual Certification',
        subtitle: 'IDH & MetaWave Innovations',
        description:
          'Receive your IDH Course Completion Certificate and MetaWave Innovations Internship Certificate upon meeting respective requirements.',
      },
    ],
  } as InternshipProgrammeConfig,
  /**
   * Editable scholarship rounds configuration.
   * Administrators can add future rounds or update statuses without redesigning pages.
   */
  scholarshipRounds: [
    {
      id: 'idh-scholarship-2026',
      year: 2026,
      title: 'IDH Skill Development Scholarship Program 2026',
      subtitle: 'An initiative supporting selected students in developing practical digital skills.',
      status: 'Closed',
      deadlineISO: '2026-09-21',
      deadlineDisplay: '21 September 2026',
      advertisedSeats: '100+',
      selectionMethod: 'Merit-based selection',
      eligibilitySummary:
        'Selection for the 2026 round was conducted on a merit basis. Specific selection criteria for any future scholarship round will be published by IDH when announced.',
      benefits: [
        '100% Tuition Fee Scholarship for selected students',
        '100% Online Zoom Classes',
        'Expert Instructors',
        'Class Recordings Provided',
        'Merit-Based Selection',
        'Certificate & Internship Opportunities',
      ],
      courses: [
        {
          title: 'Graphic Design',
          relatedAcademyCourseSlug: 'graphic-design',
        },
        {
          title: 'Foundation of AI',
          historicalNote:
            'Listed in the 2026 scholarship announcement as "Foundation of AI", distinct from the broader academy category "Artificial Intelligence".',
          relatedAcademyCourseSlug: 'artificial-intelligence',
        },
        {
          title: 'Python Programming',
          relatedAcademyCourseSlug: 'python-programming',
        },
        {
          title: 'Web Design with AI',
          historicalNote:
            'Listed in the 2026 scholarship announcement as "Web Design with AI", preserved alongside the academy listing "Web Development with AI".',
          relatedAcademyCourseSlug: 'web-development-with-ai',
        },
        {
          title: 'English Language Program',
          historicalNote:
            'Listed in the 2026 scholarship announcement as "English Language Program".',
          relatedAcademyCourseSlug: 'english-language-and-conversation-club',
        },
        {
          title: 'Digital Marketing',
          relatedAcademyCourseSlug: 'digital-marketing',
        },
      ],
      historicalNotes: [
        'The 2026 round advertised 100+ scholarship seats with an application deadline of 21 September 2026.',
        'Online Zoom-based classes and class recordings were stated as features of the 2026 scholarship program.',
        'Certificate and internship opportunities were referenced as program opportunities rather than guaranteed outcomes.',
        'Cyber Security was not part of the six courses listed for the 2026 scholarship announcement.',
      ],
    },
  ] as readonly ScholarshipRound[],
} as const;
