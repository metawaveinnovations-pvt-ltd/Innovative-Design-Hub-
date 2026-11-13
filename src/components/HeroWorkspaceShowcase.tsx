import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, GraduationCap } from 'lucide-react';
import webAiStudioImg from '../assets/images/idh_hero_tab_web_ai_1794604354551.jpg';
import graphicDesignStudioImg from '../assets/images/idh_hero_tab_graphic_design_1794604353261.jpg';
import marketingStudioImg from '../assets/images/idh_tab_marketing_studio_1794604179061.jpg';
import pythonAiStudioImg from '../assets/images/idh_hero_tab_python_ai_1794604354558.jpg';
import type { CourseSlug } from '../data/academyData';
import { getCourseTheme } from '../utils/courseTheme';
import { CourseIcon } from './CourseIcon';

interface HeroTrackSpotlight {
  id: 'web' | 'design' | 'marketing' | 'python';
  tabLabel: string;
  courseTitle: string;
  instructor: string;
  slug: CourseSlug;
  studentOutcome: string;
  image: string;
  imageAlt: string;
  stageEyebrow: string;
  stageHeadline: string;
}

const HERO_TRACKS: readonly HeroTrackSpotlight[] = [
  {
    id: 'web',
    tabLabel: 'Web + AI',
    courseTitle: 'Web Development with AI',
    instructor: 'Abdul Hannan Memon',
    slug: 'web-development-with-ai',
    studentOutcome:
      'Plan, structure, and refine responsive web interfaces using core front-end foundations paired with AI-assisted workflows.',
    image: webAiStudioImg,
    imageAlt:
      'Matte studio monitor displaying a responsive emerald-ivory website alongside an AI Layout Assistant structure and component panel',
    stageEyebrow: 'Web Development with AI · Abdul Hannan Memon',
    stageHeadline: 'Responsive web interfaces built with semantic craft and modern AI workflows.',
  },
  {
    id: 'design',
    tabLabel: 'Graphic Design',
    courseTitle: 'Graphic Design',
    instructor: 'Muhammad Ahsan Memon',
    slug: 'graphic-design',
    studentOutcome:
      'Develop an eye for visual hierarchy, composition, typography pairing, and disciplined digital brand assets.',
    image: graphicDesignStudioImg,
    imageAlt:
      'Creative pen display illustrating vector bezier geometry and emerald-gold brand poster beside color swatch decks and typography specimens',
    stageEyebrow: 'Graphic Design · Muhammad Ahsan Memon',
    stageHeadline: 'Visual hierarchy, typography pairing & refined digital brand composition.',
  },
  {
    id: 'marketing',
    tabLabel: 'Marketing',
    courseTitle: 'Digital Marketing',
    instructor: 'Tofeeque Unar',
    slug: 'digital-marketing',
    studentOutcome:
      'Learn how digital audiences discover, trust, and engage with purposeful content strategy and outreach channels.',
    image: marketingStudioImg,
    imageAlt:
      'Editorial strategy studio desk with digital marketing growth charts, campaign curves, forest-green planner, and brass pen',
    stageEyebrow: 'Digital Marketing · Tofeeque Unar',
    stageHeadline: 'Audience discovery, content strategy & structured digital growth channels.',
  },
  {
    id: 'python',
    tabLabel: 'Python & AI',
    courseTitle: 'Python Programming',
    instructor: 'Syeda Aleena Fatima',
    slug: 'python-programming',
    studentOutcome:
      'Build clean algorithmic thinking, problem decomposition, and foundational coding fluency in Python.',
    image: pythonAiStudioImg,
    imageAlt:
      'Studio monitor displaying structured Python model code alongside an emerald and burnished gold AI neural network node diagram',
    stageEyebrow: 'Python Programming · Syeda Aleena Fatima',
    stageHeadline: 'Algorithmic thinking, problem decomposition & structured Python coding.',
  },
];

export const HeroWorkspaceShowcase: React.FC = () => {
  const [activeId, setActiveId] = useState<HeroTrackSpotlight['id']>('web');
  const [failedTrackId, setFailedTrackId] = useState<HeroTrackSpotlight['id'] | null>(null);

  const activeTrack = HERO_TRACKS.find((track) => track.id === activeId) ?? HERO_TRACKS[0]!;
  const activeTheme = getCourseTheme(activeTrack.slug);
  const imgFailed = failedTrackId === activeTrack.id;

  return (
    <div className="overflow-hidden rounded-2xl border border-[#CEDBD5] bg-white shadow-[0_24px_60px_-20px_rgba(5,27,22,0.18)]">
      {/* Unified IDH Emerald-to-Gold Crest Rule */}
      <div
        className="h-[3px] w-full bg-gradient-to-r from-[#051B16] via-[#047857] to-[#D99B26]"
        aria-hidden="true"
      />

      {/* Curated Architectural Studio Visual Stage */}
      <div className="relative h-[260px] w-full overflow-hidden bg-[#051B16]">
        {!imgFailed ? (
          <img
            key={activeTrack.id}
            src={activeTrack.image}
            alt={activeTrack.imageAlt}
            decoding="async"
            referrerPolicy="no-referrer"
            onError={() => setFailedTrackId(activeTrack.id)}
            className="h-full w-full object-cover object-[center_35%] transition-opacity duration-300"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-[#051B16] via-[#09261F] to-[#047857] p-8 text-center text-white">
            <GraduationCap className="h-10 w-10 text-[#F5B935]" aria-hidden="true" />
            <p className="mt-3 font-display text-xl font-semibold">{activeTrack.courseTitle}</p>
            <p className="mt-1 text-sm text-[#DCEAE7]">{activeTrack.instructor}</p>
          </div>
        )}

        {/* Deep Architectural Scrim for Crisp Typography */}
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#041512]/95 via-[#041512]/55 to-transparent"
          aria-hidden="true"
        />

        {/* Editorial Overlay Statement synced with active tab */}
        <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6">
          <p className="text-[11px] font-semibold text-[#F5B935] sm:text-xs">{activeTrack.stageEyebrow}</p>
          <p className="mt-1 font-display text-[15px] font-medium leading-snug text-white sm:text-xl">
            {activeTrack.stageHeadline}
          </p>
        </div>
      </div>

      {/* Curated Program Track Switcher */}
      <div className="border-t border-[#DAE5E0] bg-white p-4 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-xs font-semibold text-[#425652]">Preview an IDH track</p>
          <Link
            to="/courses"
            className="inline-flex min-h-[32px] items-center gap-1 text-xs font-semibold text-[#047857] transition-colors hover:text-[#051B16] whitespace-nowrap"
          >
            <span>All 7 programs</span>
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>

        {/* Disciplined Architectural Tabs (Obsidian Active State — No Candy Colors) */}
        <div
          className="mt-2.5 grid grid-cols-2 gap-1 rounded-xl border border-[#E5EDE9] bg-[#F3F7F5] p-1 sm:flex sm:items-center"
          role="tablist"
          aria-label="Explore featured academy courses"
        >
          {HERO_TRACKS.map((track) => {
            const isSelected = track.id === activeTrack.id;
            return (
              <button
                key={track.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => setActiveId(track.id)}
                className={`min-h-[42px] sm:min-h-[38px] sm:flex-1 rounded-lg px-2 py-1.5 text-[11.5px] font-semibold transition-all whitespace-nowrap sm:px-2.5 sm:text-xs ${
                  isSelected
                    ? 'bg-[#051B16] text-white shadow-sm'
                    : 'text-[#425652] hover:bg-white hover:text-[#091815]'
                }`}
              >
                {track.tabLabel}
              </button>
            );
          })}
        </div>

        {/* Active Track Summary */}
        <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3.5 min-w-0">
            <div
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#E5EDE9] ${activeTheme.iconBgClass} ${activeTheme.iconTextClass}`}
            >
              <CourseIcon slug={activeTrack.slug} className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <h2 className="font-display text-lg font-semibold leading-snug text-[#091815]">
                {activeTrack.courseTitle}
              </h2>
              <p className="mt-0.5 text-xs text-[#425652]">
                Led by <span className="font-semibold text-[#091815]">{activeTrack.instructor}</span>
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-[#425652]">
                {activeTrack.studentOutcome}
              </p>
            </div>
          </div>

          <Link
            to={`/courses/${activeTrack.slug}`}
            className="inline-flex min-h-[42px] w-full shrink-0 items-center justify-center gap-1.5 rounded-lg border border-[#CEDBD5] bg-[#FAFBF9] px-4 py-2.5 text-xs font-semibold text-[#051B16] transition-colors hover:border-[#047857] hover:bg-[#051B16] hover:text-white whitespace-nowrap sm:min-h-[40px] sm:w-auto"
          >
            <span>View Track</span>
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
};
