import React from 'react';
import { VisemeType } from '../types';

interface MouthVisemesProps {
  viseme: VisemeType;
  skinColor: string;
  isTalking?: boolean;
  frame?: number;
}

export const MouthVisemes: React.FC<MouthVisemesProps> = ({ viseme, skinColor, isTalking = false, frame = 0 }) => {
  // If talking, add subtle dynamic variation if viseme is steady
  const talkBounce = isTalking ? Math.sin(frame * 0.4) * 1.5 : 0;

  switch (viseme) {
    case 'A_AH': // Open wide mouth
      return (
        <svg className="w-12 h-8" viewBox="0 0 48 32">
          <ellipse cx="24" cy={16 + talkBounce} rx="14" ry="10" fill="#7f1d1d" stroke="#450a0a" strokeWidth="2" />
          {/* Top teeth */}
          <path d="M 14 12 Q 24 14 34 12 L 32 15 Q 24 16 16 15 Z" fill="#ffffff" />
          {/* Tongue */}
          <path d="M 16 22 Q 24 18 32 22 Q 24 26 16 22 Z" fill="#f43f5e" />
        </svg>
      );

    case 'O_OH': // Rounded O shape
      return (
        <svg className="w-10 h-8" viewBox="0 0 40 32">
          <ellipse cx="20" cy={16 + talkBounce} rx="9" ry="11" fill="#7f1d1d" stroke="#450a0a" strokeWidth="2" />
          <ellipse cx="20" cy={18 + talkBounce} rx="5" ry="4" fill="#f43f5e" />
        </svg>
      );

    case 'E_EE': // Wide teeth smile / grin
      return (
        <svg className="w-14 h-7" viewBox="0 0 56 28">
          <path d="M 8 12 Q 28 8 48 12 Q 28 24 8 12 Z" fill="#7f1d1d" stroke="#450a0a" strokeWidth="2" />
          {/* Upper & lower teeth */}
          <path d="M 12 12 Q 28 11 44 12 Q 28 18 12 12 Z" fill="#ffffff" />
          <line x1="12" y1="13" x2="44" y2="13" stroke="#e2e8f0" strokeWidth="1" />
        </svg>
      );

    case 'M_B_P': // Closed lips / pressed
      return (
        <svg className="w-12 h-5" viewBox="0 0 48 20">
          <path d="M 10 10 Q 24 13 38 10" fill="none" stroke="#450a0a" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M 16 14 Q 24 16 32 14" fill="none" stroke={skinColor} strokeWidth="1.5" opacity="0.6" />
        </svg>
      );

    case 'F_V': // Upper teeth resting on lower lip
      return (
        <svg className="w-12 h-6" viewBox="0 0 48 24">
          <path d="M 12 10 Q 24 8 36 10 L 34 16 Q 24 18 14 16 Z" fill="#7f1d1d" stroke="#450a0a" strokeWidth="2" />
          {/* Teeth showing */}
          <rect x="18" y="9" width="12" height="4" fill="#ffffff" rx="1" />
        </svg>
      );

    case 'L_TH': // Tongue sticking between teeth
      return (
        <svg className="w-12 h-7" viewBox="0 0 48 28">
          <path d="M 12 12 Q 24 10 36 12 Q 24 22 12 12 Z" fill="#7f1d1d" stroke="#450a0a" strokeWidth="2" />
          <ellipse cx="24" cy="15" rx="6" ry="4" fill="#f43f5e" />
          <path d="M 16 11 Q 24 12 32 11" stroke="#ffffff" strokeWidth="2" />
        </svg>
      );

    case 'S_Z': // Narrow clamped teeth
      return (
        <svg className="w-12 h-6" viewBox="0 0 48 24">
          <rect x="12" y="9" width="24" height="7" rx="3" fill="#ffffff" stroke="#450a0a" strokeWidth="2" />
          <line x1="14" y1="12.5" x2="34" y2="12.5" stroke="#94a3b8" strokeWidth="1.5" />
        </svg>
      );

    case 'W_OO': // Pursed small whistle lips
      return (
        <svg className="w-8 h-8" viewBox="0 0 32 32">
          <circle cx="16" cy="16" r="6" fill="#7f1d1d" stroke="#450a0a" strokeWidth="2" />
          <circle cx="16" cy="16" r="3" fill="#f43f5e" />
        </svg>
      );

    case 'silence':
    default: // Natural relaxed mouth
      return (
        <svg className="w-12 h-6" viewBox="0 0 48 24">
          <path d="M 14 11 Q 24 16 34 11" fill="none" stroke="#450a0a" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );
  }
};
