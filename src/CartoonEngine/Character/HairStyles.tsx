import React from 'react';
import { HairStyleId } from '../types';

interface HairStylesProps {
  style: HairStyleId;
  colorHex: string;
}

export const HairStyles: React.FC<HairStylesProps> = ({ style, colorHex }) => {
  switch (style) {
    case 'cyber_spiky':
      return (
        <svg className="w-36 h-24 -mt-6" viewBox="0 0 120 80">
          <path
            d="M 15 65 Q 10 40 25 30 L 35 10 L 48 26 L 60 4 L 72 26 L 85 8 L 95 32 Q 110 42 105 65 Z"
            fill={colorHex}
            stroke="#0f172a"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          {/* Cyber Neon Highlights */}
          <path d="M 46 28 L 60 12 L 70 28" fill="none" stroke="#22d3ee" strokeWidth="2" opacity="0.8" />
        </svg>
      );

    case 'slick_fade':
      return (
        <svg className="w-34 h-20 -mt-5" viewBox="0 0 110 65">
          <path
            d="M 12 55 C 10 25, 30 5, 80 5 C 100 5, 102 30, 98 55 C 90 40, 30 35, 12 55 Z"
            fill={colorHex}
            stroke="#0f172a"
            strokeWidth="3"
          />
          {/* Fade Texture */}
          <line x1="16" y1="45" x2="30" y2="40" stroke="#000000" strokeWidth="1.5" opacity="0.3" />
          <line x1="20" y1="50" x2="35" y2="45" stroke="#000000" strokeWidth="1.5" opacity="0.3" />
        </svg>
      );

    case 'afro':
      return (
        <svg className="w-38 h-28 -mt-9" viewBox="0 0 130 95">
          <circle cx="65" cy="50" r="42" fill={colorHex} stroke="#0f172a" strokeWidth="3" />
          <circle cx="35" cy="45" r="22" fill={colorHex} />
          <circle cx="95" cy="45" r="22" fill={colorHex} />
          <circle cx="65" cy="22" r="22" fill={colorHex} />
        </svg>
      );

    case 'ponytail':
      return (
        <div className="relative">
          <svg className="w-34 h-22 -mt-5" viewBox="0 0 110 70">
            <path
              d="M 15 55 C 15 20, 45 8, 85 15 C 95 25, 95 50, 95 55 C 80 40, 40 40, 15 55 Z"
              fill={colorHex}
              stroke="#0f172a"
              strokeWidth="3"
            />
          </svg>
          {/* Back ponytail tail */}
          <div 
            className="absolute -top-3 -right-6 w-12 h-20 rounded-r-3xl border-3 border-slate-900 shadow-md"
            style={{ backgroundColor: colorHex }}
          />
        </div>
      );

    case 'anime_bangs':
      return (
        <svg className="w-36 h-24 -mt-6" viewBox="0 0 120 80">
          <path
            d="M 15 65 C 10 20, 45 8, 105 20 C 105 45, 100 65, 95 65 L 85 45 L 75 60 L 60 42 L 48 58 L 35 44 L 25 65 Z"
            fill={colorHex}
            stroke="#0f172a"
            strokeWidth="3"
            strokeLinejoin="round"
          />
        </svg>
      );

    case 'beanie_hair':
      return (
        <svg className="w-34 h-20 -mt-5" viewBox="0 0 110 65">
          {/* Peeking hair tufts */}
          <path d="M 20 45 Q 15 60 10 58 Q 25 50 30 45" fill={colorHex} stroke="#0f172a" strokeWidth="2" />
          <path d="M 80 45 Q 95 60 100 58 Q 85 50 80 45" fill={colorHex} stroke="#0f172a" strokeWidth="2" />
        </svg>
      );

    case 'bald_beard':
      return <div className="w-32 h-6" />; // Clean dome

    case 'messy_curly':
    default:
      return (
        <svg className="w-36 h-24 -mt-7" viewBox="0 0 120 80">
          <path
            d="M 18 60 C 10 45, 12 25, 30 18 C 45 5, 75 5, 90 18 C 108 25, 110 45, 102 60 C 95 45, 85 38, 70 40 C 55 35, 35 45, 18 60 Z"
            fill={colorHex}
            stroke="#0f172a"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          {/* Curly loops */}
          <circle cx="38" cy="22" r="7" fill={colorHex} stroke="#0f172a" strokeWidth="2" />
          <circle cx="58" cy="16" r="8" fill={colorHex} stroke="#0f172a" strokeWidth="2" />
          <circle cx="80" cy="22" r="7" fill={colorHex} stroke="#0f172a" strokeWidth="2" />
        </svg>
      );
  }
};
