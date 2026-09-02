import React from 'react';
import { HairStyleId } from '../types';

interface HairStylesProps {
  style: HairStyleId;
  colorHex: string;
}

/**
 * Pure SVG Hair Styles Component
 * Anchored to the Head SVG coordinate system (Head center ~ (300, 220))
 */
export const HairStyles: React.FC<HairStylesProps> = ({ style, colorHex }) => {
  switch (style) {
    case 'cyber_spiky':
      return (
        <g id="hair-cyber-spiky">
          <path
            d="M 210 220 C 200 160 215 110 240 90 L 260 40 L 285 85 L 300 30 L 320 85 L 345 45 L 365 95 C 390 120 405 170 390 220 C 375 160 350 135 300 135 C 250 135 225 160 210 220 Z"
            fill={colorHex}
            stroke="#0f172a"
            strokeWidth="5"
            strokeLinejoin="round"
          />
          {/* Cyber Neon Accents */}
          <path
            d="M 285 90 L 300 45 L 315 90"
            fill="none"
            stroke="#06b6d4"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <path
            d="M 245 100 L 260 55 L 270 95"
            fill="none"
            stroke="#ec4899"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </g>
      );

    case 'slick_fade':
      return (
        <g id="hair-slick-fade">
          <path
            d="M 215 200 C 210 130 250 70 340 70 C 385 70 395 120 385 190 C 365 150 255 140 215 200 Z"
            fill={colorHex}
            stroke="#0f172a"
            strokeWidth="5"
          />
          {/* Fade Texture Detail */}
          <path d="M 220 180 L 245 165" stroke="#000000" strokeWidth="2.5" opacity="0.3" strokeLinecap="round" />
          <path d="M 225 190 L 250 175" stroke="#000000" strokeWidth="2.5" opacity="0.3" strokeLinecap="round" />
          <path d="M 230 200 L 255 185" stroke="#000000" strokeWidth="2.5" opacity="0.3" strokeLinecap="round" />
        </g>
      );

    case 'afro':
      return (
        <g id="hair-afro">
          <circle cx="300" cy="190" r="105" fill={colorHex} stroke="#0f172a" strokeWidth="6" />
          <circle cx="225" cy="170" r="50" fill={colorHex} />
          <circle cx="375" cy="170" r="50" fill={colorHex} />
          <circle cx="300" cy="115" r="50" fill={colorHex} />
          <circle cx="250" cy="130" r="45" fill={colorHex} />
          <circle cx="350" cy="130" r="45" fill={colorHex} />
        </g>
      );

    case 'ponytail':
      return (
        <g id="hair-ponytail">
          {/* Back Ponytail Tail */}
          <path
            d="M 370 140 C 420 120 440 160 435 240 C 425 250 405 240 395 200 C 390 170 375 155 370 140 Z"
            fill={colorHex}
            stroke="#0f172a"
            strokeWidth="5"
          />
          {/* Ponytail Hair tie */}
          <ellipse cx="380" cy="150" rx="8" ry="14" fill="#f43f5e" stroke="#0f172a" strokeWidth="3" />
          {/* Front hair sweep */}
          <path
            d="M 215 210 C 215 125 270 85 365 95 C 385 115 385 180 380 200 C 350 150 260 150 215 210 Z"
            fill={colorHex}
            stroke="#0f172a"
            strokeWidth="5"
          />
        </g>
      );

    case 'anime_bangs':
      return (
        <g id="hair-anime-bangs">
          <path
            d="M 210 220 C 200 120 260 80 390 100 C 400 150 390 220 380 220 L 360 170 L 340 210 L 315 160 L 290 205 L 265 165 L 245 220 Z"
            fill={colorHex}
            stroke="#0f172a"
            strokeWidth="5"
            strokeLinejoin="round"
          />
        </g>
      );

    case 'beanie_hair':
      return (
        <g id="hair-beanie-tufts">
          {/* Subtle side tufts peeking out */}
          <path
            d="M 220 190 Q 205 225 195 215 Q 225 200 235 190"
            fill={colorHex}
            stroke="#0f172a"
            strokeWidth="3.5"
          />
          <path
            d="M 380 190 Q 395 225 405 215 Q 375 200 365 190"
            fill={colorHex}
            stroke="#0f172a"
            strokeWidth="3.5"
          />
        </g>
      );

    case 'bald_beard':
      return null; // Clean dome

    case 'messy_curly':
    default:
      return (
        <g id="hair-messy-curly">
          <path
            d="M 215 210 C 195 170 200 120 240 100 C 265 75 335 75 360 100 C 395 115 405 165 385 210 C 370 165 350 145 320 150 C 285 138 250 160 215 210 Z"
            fill={colorHex}
            stroke="#0f172a"
            strokeWidth="5"
            strokeLinejoin="round"
          />
          {/* Stylized Curls */}
          <circle cx="260" cy="115" r="16" fill={colorHex} stroke="#0f172a" strokeWidth="4" />
          <circle cx="300" cy="98" r="18" fill={colorHex} stroke="#0f172a" strokeWidth="4" />
          <circle cx="340" cy="115" r="16" fill={colorHex} stroke="#0f172a" strokeWidth="4" />
        </g>
      );
  }
};
