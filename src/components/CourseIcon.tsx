import React from 'react';
import {
  Code2,
  Palette,
  Megaphone,
  Cpu,
  MessageSquare,
  Terminal,
  ShieldCheck,
} from 'lucide-react';
import type { CourseSlug } from '../data/academyData';

interface CourseIconProps {
  slug: CourseSlug;
  className?: string;
}

export const CourseIcon: React.FC<CourseIconProps> = ({ slug, className = 'w-5 h-5' }) => {
  switch (slug) {
    case 'web-development-with-ai':
      return <Code2 className={className} aria-hidden="true" />;
    case 'graphic-design':
      return <Palette className={className} aria-hidden="true" />;
    case 'digital-marketing':
      return <Megaphone className={className} aria-hidden="true" />;
    case 'artificial-intelligence':
      return <Cpu className={className} aria-hidden="true" />;
    case 'english-language-and-conversation-club':
      return <MessageSquare className={className} aria-hidden="true" />;
    case 'python-programming':
      return <Terminal className={className} aria-hidden="true" />;
    case 'cyber-security':
      return <ShieldCheck className={className} aria-hidden="true" />;
  }
};
