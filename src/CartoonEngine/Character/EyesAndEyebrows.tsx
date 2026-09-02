import React from 'react';
import { FacialExpression } from '../types';

interface EyesAndEyebrowsProps {
  expression: FacialExpression;
  eyeColorHex: string;
  frame: number;
}

/**
 * Pure SVG Eyes & Eyebrows
 * Coordinate Origin: Centered in Head SVG coordinates around (300, 215)
 */
export const EyesAndEyebrows: React.FC<EyesAndEyebrowsProps> = ({ expression, eyeColorHex, frame }) => {
  // Natural blink loop every ~75 frames
  const isBlinking = frame % 75 > 71;

  // Pupil micro-saccades
  const pupilShiftX = Math.sin(frame * 0.05) * 3;
  const pupilShiftY = Math.cos(frame * 0.04) * 2;

  if (isBlinking && expression !== 'shocked_bug') {
    return (
      <g id="eyes-blinking">
        {/* Eyebrows */}
        <path d="M 245 185 Q 265 180 285 185" fill="none" stroke="#0f172a" strokeWidth="4.5" strokeLinecap="round" />
        <path d="M 315 185 Q 335 180 355 185" fill="none" stroke="#0f172a" strokeWidth="4.5" strokeLinecap="round" />
        {/* Closed Eyes Eyelashes */}
        <path d="M 245 215 Q 265 225 285 215" fill="none" stroke="#0f172a" strokeWidth="5" strokeLinecap="round" />
        <path d="M 315 215 Q 335 225 355 215" fill="none" stroke="#0f172a" strokeWidth="5" strokeLinecap="round" />
      </g>
    );
  }

  switch (expression) {
    case 'happy':
    case 'laughing':
      return (
        <g id="eyes-happy">
          {/* Eyebrows lifted curved */}
          <path d="M 245 180 Q 265 170 285 180" fill="none" stroke="#0f172a" strokeWidth="4.5" strokeLinecap="round" />
          <path d="M 315 180 Q 335 170 355 180" fill="none" stroke="#0f172a" strokeWidth="4.5" strokeLinecap="round" />
          {/* Happy Anime Crescent Arcs */}
          <path d="M 245 220 Q 265 195 285 220" fill="none" stroke="#0f172a" strokeWidth="6" strokeLinecap="round" />
          <path d="M 315 220 Q 335 195 355 220" fill="none" stroke="#0f172a" strokeWidth="6" strokeLinecap="round" />
          {/* Cute anime cheek blush */}
          <ellipse cx="235" cy="235" rx="14" ry="7" fill="#f43f5e" opacity="0.35" />
          <ellipse cx="365" cy="235" rx="14" ry="7" fill="#f43f5e" opacity="0.35" />
        </g>
      );

    case 'shocked_bug':
      return (
        <g id="eyes-shocked">
          {/* High Raised Eyebrows */}
          <path d="M 245 170 L 285 178" stroke="#0f172a" strokeWidth="5" strokeLinecap="round" />
          <path d="M 315 178 L 355 170" stroke="#0f172a" strokeWidth="5" strokeLinecap="round" />
          {/* Huge Wide Sclera */}
          <circle cx="265" cy="215" r="22" fill="#ffffff" stroke="#0f172a" strokeWidth="4.5" />
          <circle cx="335" cy="215" r="22" fill="#ffffff" stroke="#0f172a" strokeWidth="4.5" />
          {/* Tiny Shocked Pupils */}
          <circle cx="265" cy="215" r="6" fill="#0f172a" />
          <circle cx="335" cy="215" r="6" fill="#0f172a" />
          {/* Sweat drop */}
          <path d="M 370 170 C 375 160 380 180 375 185 C 370 185 368 180 370 170 Z" fill="#38bdf8" />
        </g>
      );

    case 'focused_coding':
      return (
        <g id="eyes-focused">
          {/* Intense Downward Eyebrows */}
          <path d="M 245 180 L 288 190" stroke="#0f172a" strokeWidth="5.5" strokeLinecap="round" />
          <path d="M 312 190 L 355 180" stroke="#0f172a" strokeWidth="5.5" strokeLinecap="round" />
          {/* Narrow Focused Sclera */}
          <g>
            <clipPath id="left-focus-clip">
              <rect x="245" y="195" width="40" height="24" rx="6" />
            </clipPath>
            <rect x="245" y="195" width="40" height="24" rx="6" fill="#ffffff" stroke="#0f172a" strokeWidth="4" />
            <g clipPath="url(#left-focus-clip)">
              <circle cx={265 + pupilShiftX} cy={207 + pupilShiftY} r="12" fill={eyeColorHex} />
              <circle cx={265 + pupilShiftX} cy={207 + pupilShiftY} r="6" fill="#0f172a" />
              <circle cx={262 + pupilShiftX} cy={204 + pupilShiftY} r="3" fill="#ffffff" />
            </g>
          </g>
          <g>
            <clipPath id="right-focus-clip">
              <rect x="315" y="195" width="40" height="24" rx="6" />
            </clipPath>
            <rect x="315" y="195" width="40" height="24" rx="6" fill="#ffffff" stroke="#0f172a" strokeWidth="4" />
            <g clipPath="url(#right-focus-clip)">
              <circle cx={335 + pupilShiftX} cy={207 + pupilShiftY} r="12" fill={eyeColorHex} />
              <circle cx={335 + pupilShiftX} cy={207 + pupilShiftY} r="6" fill="#0f172a" />
              <circle cx={332 + pupilShiftX} cy={204 + pupilShiftY} r="3" fill="#ffffff" />
            </g>
          </g>
        </g>
      );

    case 'smug_genius':
      return (
        <g id="eyes-smug">
          {/* One cocked brow */}
          <path d="M 245 178 L 285 185" stroke="#0f172a" strokeWidth="5" strokeLinecap="round" />
          <path d="M 315 174 Q 335 168 355 180" stroke="#0f172a" strokeWidth="5" strokeLinecap="round" />
          {/* Left eye smug curve */}
          <path d="M 245 215 Q 265 205 285 215" fill="none" stroke="#0f172a" strokeWidth="5.5" strokeLinecap="round" />
          {/* Right eye open slit */}
          <ellipse cx="335" cy="215" rx="18" ry="12" fill="#ffffff" stroke="#0f172a" strokeWidth="4" />
          <circle cx="338" cy="215" r="7" fill={eyeColorHex} />
          <circle cx="338" cy="215" r="3.5" fill="#0f172a" />
        </g>
      );

    case 'wink':
      return (
        <g id="eyes-wink">
          {/* Eyebrows */}
          <path d="M 245 180 Q 265 172 285 180" fill="none" stroke="#0f172a" strokeWidth="4.5" strokeLinecap="round" />
          <path d="M 315 182 L 355 176" stroke="#0f172a" strokeWidth="4.5" strokeLinecap="round" />
          {/* Left eye wide open */}
          <ellipse cx="265" cy="215" rx="19" ry="16" fill="#ffffff" stroke="#0f172a" strokeWidth="4" />
          <circle cx={265 + pupilShiftX} cy={215 + pupilShiftY} r="10" fill={eyeColorHex} />
          <circle cx={265 + pupilShiftX} cy={215 + pupilShiftY} r="5" fill="#0f172a" />
          <circle cx={262 + pupilShiftX} cy={212 + pupilShiftY} r="2.5" fill="#ffffff" />
          {/* Right eye winking smile */}
          <path d="M 315 218 Q 335 200 355 218" fill="none" stroke="#0f172a" strokeWidth="6" strokeLinecap="round" />
        </g>
      );

    case 'angry_syntax_error':
      return (
        <g id="eyes-angry">
          {/* Furrowed angry brows */}
          <path d="M 245 188 L 290 200" stroke="#7f1d1d" strokeWidth="6" strokeLinecap="round" />
          <path d="M 310 200 L 355 188" stroke="#7f1d1d" strokeWidth="6" strokeLinecap="round" />
          {/* Narrow eyes */}
          <ellipse cx="265" cy="216" rx="18" ry="12" fill="#ffffff" stroke="#7f1d1d" strokeWidth="4" />
          <circle cx="265" cy="216" r="7" fill="#dc2626" />
          <circle cx="265" cy="216" r="3.5" fill="#0f172a" />
          <ellipse cx="335" cy="216" rx="18" ry="12" fill="#ffffff" stroke="#7f1d1d" strokeWidth="4" />
          <circle cx="335" cy="216" r="7" fill="#dc2626" />
          <circle cx="335" cy="216" r="3.5" fill="#0f172a" />
        </g>
      );

    default: // Confident / Standard Open Cartoon Eyes
      return (
        <g id="eyes-default">
          {/* Eyebrows */}
          <path d="M 245 182 Q 265 174 285 182" fill="none" stroke="#0f172a" strokeWidth="4.5" strokeLinecap="round" />
          <path d="M 315 182 Q 335 174 355 182" fill="none" stroke="#0f172a" strokeWidth="4.5" strokeLinecap="round" />
          {/* Left Eye */}
          <ellipse cx="265" cy="215" rx="20" ry="17" fill="#ffffff" stroke="#0f172a" strokeWidth="4.5" />
          <circle cx={265 + pupilShiftX} cy={215 + pupilShiftY} r="11" fill={eyeColorHex} />
          <circle cx={265 + pupilShiftX} cy={215 + pupilShiftY} r="5.5" fill="#0f172a" />
          <circle cx={262 + pupilShiftX} cy={211 + pupilShiftY} r="3" fill="#ffffff" />
          {/* Right Eye */}
          <ellipse cx="335" cy="215" rx="20" ry="17" fill="#ffffff" stroke="#0f172a" strokeWidth="4.5" />
          <circle cx={335 + pupilShiftX} cy={215 + pupilShiftY} r="11" fill={eyeColorHex} />
          <circle cx={335 + pupilShiftX} cy={215 + pupilShiftY} r="5.5" fill="#0f172a" />
          <circle cx={332 + pupilShiftX} cy={211 + pupilShiftY} r="3" fill="#ffffff" />
        </g>
      );
  }
};
