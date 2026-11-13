import React, { useState } from 'react';
import { siteConfig } from '../config/siteConfig';

interface IdhLogoMarkProps {
  className?: string;
  size?: number;
}

/**
 * Razor-sharp vector crest matching the official beveled Innovative Design Hub hexagon.
 */
export const IdhLogoMark: React.FC<IdhLogoMarkProps> = ({ className = '', size = 36 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="idhHexOuter" x1="6" y1="6" x2="58" y2="58" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#14E8B6" />
          <stop offset="45%" stopColor="#047857" />
          <stop offset="100%" stopColor="#0D9488" />
        </linearGradient>
        <linearGradient id="idhHexInner" x1="12" y1="10" x2="52" y2="56" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#09382D" />
          <stop offset="55%" stopColor="#051B16" />
          <stop offset="100%" stopColor="#041512" />
        </linearGradient>
        <linearGradient id="idhGlossHighlight" x1="8" y1="8" x2="46" y2="42" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#2DD4BF" stopOpacity="0.28" />
          <stop offset="65%" stopColor="#051B16" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* Outer luminous emerald beveled hexagon */}
      <path
        d="M19.5 6.5H44.5C47.1 6.5 49.5 7.9 50.8 10.1L61.2 28.4C62.5 30.6 62.5 33.4 61.2 35.6L50.8 53.9C49.5 56.1 47.1 57.5 44.5 57.5H19.5C16.9 57.5 14.5 56.1 13.2 53.9L2.8 35.6C1.5 33.4 1.5 30.6 2.8 28.4L13.2 10.1C14.5 7.9 16.9 6.5 19.5 6.5Z"
        fill="url(#idhHexOuter)"
      />
      {/* Crisp white inner ring + deep obsidian emerald body */}
      <path
        d="M20.6 9.5H43.4C45.4 9.5 47.3 10.6 48.3 12.3L57.8 29C58.8 30.8 58.8 33.2 57.8 35L48.3 51.7C47.3 53.4 45.4 54.5 43.4 54.5H20.6C18.6 54.5 16.7 53.4 15.7 51.7L6.2 35C5.2 33.2 5.2 30.8 6.2 29L15.7 12.3C16.7 10.6 18.6 9.5 20.6 9.5Z"
        fill="url(#idhHexInner)"
        stroke="#F4FBF8"
        strokeWidth="1.3"
      />
      {/* Diagonal satin sheen matching crest */}
      <path
        d="M20.6 10.5H43.4C45 10.5 46.5 11.4 47.3 12.8L52 21L10 38L7.2 33C6.5 31.7 6.5 30.1 7.2 28.8L16.7 12.8C17.5 11.4 19 10.5 20.6 10.5Z"
        fill="url(#idhGlossHighlight)"
      />
      {/* Geometric 'idh' monogram */}
      <circle cx="32" cy="18.5" r="3" fill="#FFFFFF" />
      <path
        d="M32 24.5V43.5C32 45.4 30.4 47 28.5 47H21.5C19.6 47 18 45.4 18 43.5V37.5C18 35.6 19.6 34 21.5 34H27.5"
        stroke="#FFFFFF"
        strokeWidth="4.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M32 34H42.5C44.4 34 46 35.6 46 37.5V45"
        stroke="#FFFFFF"
        strokeWidth="4.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

interface IdhBrandLockupProps {
  inverted?: boolean;
}

export const IdhBrandLockup: React.FC<IdhBrandLockupProps> = ({ inverted = false }) => {
  return (
    <span className="inline-flex items-center gap-2.5 whitespace-nowrap shrink-0">
      <IdhLogoMark size={34} />
      <span
        className={`font-sans text-[17px] font-bold tracking-tight ${
          inverted ? 'text-white' : 'text-[#091815]'
        }`}
      >
        Innovative{' '}
        <span className={inverted ? 'text-[#2DD4BF]' : 'text-[#047857]'}>Design</span> Hub
      </span>
    </span>
  );
};

interface IdhOfficialBrandPlateProps {
  compact?: boolean;
  caption?: string;
}

/**
 * Clean museum-mounted display of the supplied official IDH brand artwork.
 */
export const IdhOfficialBrandPlate: React.FC<IdhOfficialBrandPlateProps> = ({
  compact = false,
  caption,
}) => {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <div
      className={`overflow-hidden rounded-2xl border border-[#DAE5E0] bg-white ${
        compact ? 'p-4 sm:p-5' : 'p-6 sm:p-8'
      }`}
    >
      <div className="flex items-center justify-center bg-white">
        {!imgFailed ? (
          <img
            src="/assets/aistudio/image_bc5f6bc2.png"
            alt="Official Innovative Design Hub logo — The Creative Designing Hub: Learn Skills. Build Projects. Create Your Future."
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
            onError={() => setImgFailed(true)}
            className={`h-auto w-full object-contain ${compact ? 'max-w-[300px]' : 'max-w-[400px]'}`}
          />
        ) : (
          <div className="py-4 text-center">
            <IdhBrandLockup />
            <p className="mt-2 text-xs font-medium text-[#425652]">{siteConfig.logoSubtitle}</p>
            <p className="mt-1 text-xs font-semibold text-[#B87A0E]">{siteConfig.tagline}</p>
          </div>
        )}
      </div>

      {caption && (
        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-[#EBF1EE] pt-3.5 text-xs text-[#425652]">
          <span>{caption}</span>
          <span className="font-mono text-[11px] font-medium text-[#047857]">IDH Official Seal</span>
        </div>
      )}
    </div>
  );
};
