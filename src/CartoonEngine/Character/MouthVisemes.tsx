import React from 'react';
import { VisemeType } from '../types';

interface MouthVisemesProps {
  viseme: VisemeType;
  skinColor: string;
  isTalking?: boolean;
  frame?: number;
}

/**
 * Pure SVG Mouth & Speech Visemes
 * Coordinate Origin: Centered in Head SVG at (300, 275)
 */
export const MouthVisemes: React.FC<MouthVisemesProps> = ({ viseme, skinColor, isTalking = false, frame = 0 }) => {
  const talkBounce = isTalking ? Math.sin(frame * 0.4) * 2 : 0;

  switch (viseme) {
    case 'A_AH': // Open wide mouth
      return (
        <g id="viseme-a-ah" transform={`translate(0, ${talkBounce})`}>
          <ellipse cx="300" cy="275" rx="22" ry="15" fill="#7f1d1d" stroke="#0f172a" strokeWidth="4" />
          {/* Upper Teeth */}
          <path d="M 285 264 Q 300 268 315 264 L 313 268 Q 300 270 287 268 Z" fill="#ffffff" />
          {/* Tongue */}
          <path d="M 288 282 Q 300 274 312 282 Q 300 288 288 282 Z" fill="#f43f5e" />
        </g>
      );

    case 'O_OH': // Rounded O shape
      return (
        <g id="viseme-o-oh" transform={`translate(0, ${talkBounce})`}>
          <ellipse cx="300" cy="275" rx="14" ry="16" fill="#7f1d1d" stroke="#0f172a" strokeWidth="4" />
          <ellipse cx="300" cy="278" rx="7" ry="5" fill="#f43f5e" />
        </g>
      );

    case 'E_EE': // Wide teeth smile / grin
      return (
        <g id="viseme-e-ee" transform={`translate(0, ${talkBounce})`}>
          <path d="M 275 272 Q 300 264 325 272 Q 300 288 275 272 Z" fill="#7f1d1d" stroke="#0f172a" strokeWidth="4" />
          <path d="M 280 272 Q 300 270 320 272 Q 300 280 280 272 Z" fill="#ffffff" />
          <line x1="280" y1="273" x2="320" y2="273" stroke="#cbd5e1" strokeWidth="1.5" />
        </g>
      );

    case 'M_B_P': // Pressed lips
      return (
        <g id="viseme-m-b-p">
          <path d="M 280 275 Q 300 278 320 275" fill="none" stroke="#0f172a" strokeWidth="5" strokeLinecap="round" />
          <path d="M 288 279 Q 300 281 312 279" fill="none" stroke={skinColor} strokeWidth="2" opacity="0.6" />
        </g>
      );

    case 'F_V': // Upper teeth on lower lip
      return (
        <g id="viseme-f-v">
          <path d="M 282 272 Q 300 269 318 272 L 315 279 Q 300 282 285 279 Z" fill="#7f1d1d" stroke="#0f172a" strokeWidth="3.5" />
          <rect x="291" y="271" width="18" height="5" fill="#ffffff" rx="1.5" />
        </g>
      );

    case 'L_TH': // Tongue sticking between teeth
      return (
        <g id="viseme-l-th">
          <path d="M 280 273 Q 300 268 320 273 Q 300 286 280 273 Z" fill="#7f1d1d" stroke="#0f172a" strokeWidth="4" />
          <ellipse cx="300" cy="277" rx="8" ry="5" fill="#f43f5e" />
          <path d="M 286 272 Q 300 274 314 272" stroke="#ffffff" strokeWidth="3" />
        </g>
      );

    case 'S_Z': // Clamped teeth
      return (
        <g id="viseme-s-z">
          <rect x="282" y="270" width="36" height="10" rx="4" fill="#ffffff" stroke="#0f172a" strokeWidth="3.5" />
          <line x1="284" y1="275" x2="316" y2="275" stroke="#94a3b8" strokeWidth="2" />
        </g>
      );

    case 'W_OO': // Small whistle lips
      return (
        <g id="viseme-w-oo">
          <circle cx="300" cy="275" r="9" fill="#7f1d1d" stroke="#0f172a" strokeWidth="3.5" />
          <circle cx="300" cy="275" r="4" fill="#f43f5e" />
        </g>
      );

    case 'silence':
    default: // Relaxed mouth
      return (
        <g id="viseme-silence">
          <path d="M 284 274 Q 300 282 316 274" fill="none" stroke="#0f172a" strokeWidth="4.5" strokeLinecap="round" />
        </g>
      );
  }
};
