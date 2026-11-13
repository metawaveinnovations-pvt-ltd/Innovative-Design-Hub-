import type { CourseSlug } from '../data/academyData';

export interface CourseAccentTheme {
  topBarClass: string;
  iconBgClass: string;
  iconTextClass: string;
  accentTextClass: string;
  avatarBgClass: string;
  avatarTextClass: string;
  hoverBorderClass: string;
  shortTrackLabel: string;
}

/**
 * Unified luxury jewel palette derived directly from the official IDH emblem:
 * deep obsidian emerald, luminous teal, and burnished architectural bronze-gold.
 */
const COURSE_THEMES: Record<CourseSlug, CourseAccentTheme> = {
  'web-development-with-ai': {
    topBarClass: 'bg-gradient-to-r from-[#047857] to-[#0D9488]',
    iconBgClass: 'bg-[#ECFDF5]',
    iconTextClass: 'text-[#047857]',
    accentTextClass: 'text-[#047857]',
    avatarBgClass: 'bg-[#051B16]',
    avatarTextClass: 'text-[#2DD4BF]',
    hoverBorderClass: 'hover:border-[#047857]/50',
    shortTrackLabel: 'Web + AI',
  },
  'graphic-design': {
    topBarClass: 'bg-gradient-to-r from-[#9A630A] to-[#D99B26]',
    iconBgClass: 'bg-[#FDF8EC]',
    iconTextClass: 'text-[#9A630A]',
    accentTextClass: 'text-[#9A630A]',
    avatarBgClass: 'bg-[#FDF8EC]',
    avatarTextClass: 'text-[#9A630A]',
    hoverBorderClass: 'hover:border-[#B87A0E]/50',
    shortTrackLabel: 'Graphic Design',
  },
  'digital-marketing': {
    topBarClass: 'bg-gradient-to-r from-[#0F766E] to-[#14B8A6]',
    iconBgClass: 'bg-[#EFFAF8]',
    iconTextClass: 'text-[#0F766E]',
    accentTextClass: 'text-[#0F766E]',
    avatarBgClass: 'bg-[#EFFAF8]',
    avatarTextClass: 'text-[#0F766E]',
    hoverBorderClass: 'hover:border-[#0F766E]/50',
    shortTrackLabel: 'Digital Marketing',
  },
  'artificial-intelligence': {
    topBarClass: 'bg-gradient-to-r from-[#051B16] to-[#047857]',
    iconBgClass: 'bg-[#F0F5F3]',
    iconTextClass: 'text-[#051B16]',
    accentTextClass: 'text-[#09261F]',
    avatarBgClass: 'bg-[#09261F]',
    avatarTextClass: 'text-[#F5B935]',
    hoverBorderClass: 'hover:border-[#09261F]/45',
    shortTrackLabel: 'Artificial Intelligence',
  },
  'english-language-and-conversation-club': {
    topBarClass: 'bg-gradient-to-r from-[#8C5808] to-[#C28312]',
    iconBgClass: 'bg-[#FCF7EB]',
    iconTextClass: 'text-[#8C5808]',
    accentTextClass: 'text-[#8C5808]',
    avatarBgClass: 'bg-[#FCF7EB]',
    avatarTextClass: 'text-[#8C5808]',
    hoverBorderClass: 'hover:border-[#8C5808]/45',
    shortTrackLabel: 'Spoken English',
  },
  'python-programming': {
    topBarClass: 'bg-gradient-to-r from-[#065F46] to-[#059669]',
    iconBgClass: 'bg-[#EDF8F3]',
    iconTextClass: 'text-[#065F46]',
    accentTextClass: 'text-[#065F46]',
    avatarBgClass: 'bg-[#EDF8F3]',
    avatarTextClass: 'text-[#065F46]',
    hoverBorderClass: 'hover:border-[#065F46]/45',
    shortTrackLabel: 'Python Coding',
  },
  'cyber-security': {
    topBarClass: 'bg-gradient-to-r from-[#115E59] to-[#0D9488]',
    iconBgClass: 'bg-[#EEF8F7]',
    iconTextClass: 'text-[#115E59]',
    accentTextClass: 'text-[#115E59]',
    avatarBgClass: 'bg-[#115E59]',
    avatarTextClass: 'text-[#99F6E4]',
    hoverBorderClass: 'hover:border-[#115E59]/45',
    shortTrackLabel: 'Cyber Security',
  },
};

export function getCourseTheme(slug: CourseSlug): CourseAccentTheme {
  return COURSE_THEMES[slug];
}
