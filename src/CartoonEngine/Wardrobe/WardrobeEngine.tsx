import React from 'react';
import { WardrobeConfig } from '../types';

interface WardrobeEngineProps {
  config: WardrobeConfig;
  skinColor: string;
}

/**
 * Pure SVG Wardrobe & Clothing Engine
 * Coordinate Origin: Anchored to Torso SVG coordinates (200-400, 310-530)
 */
export const WardrobeEngine: React.FC<WardrobeEngineProps> = ({ config, skinColor }) => {
  const { preset, primaryColor, secondaryColor, accentColor, graphicOnShirt, lanyardBadge } = config;

  // Chest Graphic SVG Icons
  const renderGraphic = () => {
    if (graphicOnShirt === 'none') return null;

    if (graphicOnShirt === 'react_atom') {
      return (
        <g id="chest-graphic-react" transform="translate(300, 410)">
          <ellipse cx="0" cy="0" rx="20" ry="7" fill="none" stroke="#38bdf8" strokeWidth="2.5" />
          <ellipse cx="0" cy="0" rx="20" ry="7" fill="none" stroke="#38bdf8" strokeWidth="2.5" transform="rotate(60)" />
          <ellipse cx="0" cy="0" rx="20" ry="7" fill="none" stroke="#38bdf8" strokeWidth="2.5" transform="rotate(120)" />
          <circle cx="0" cy="0" r="3.5" fill="#38bdf8" />
        </g>
      );
    }

    if (graphicOnShirt === 'terminal_prompt') {
      return (
        <g id="chest-graphic-terminal" transform="translate(270, 395)">
          <rect x="0" y="0" width="60" height="24" rx="4" fill="#000000" stroke="#10b981" strokeWidth="1.5" opacity="0.9" />
          <text x="30" y="16" fill="#34d399" fontSize="11" fontFamily="monospace" fontWeight="bold" textAnchor="middle">&gt; dev$</text>
        </g>
      );
    }

    if (graphicOnShirt === 'coffee_cup') {
      return (
        <g id="chest-graphic-coffee" transform="translate(300, 410)">
          <rect x="-12" y="-10" width="24" height="20" rx="3" fill="#ffffff" stroke="#0f172a" strokeWidth="2" />
          <path d="M 12 -4 Q 20 -4 20 0 Q 20 4 12 4" fill="none" stroke="#0f172a" strokeWidth="2" />
          <path d="M -6 -14 Q -4 -18 -6 -22" fill="none" stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M 2 -14 Q 4 -18 2 -22" fill="none" stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round" />
        </g>
      );
    }

    return (
      <g id="chest-graphic-binary" transform="translate(300, 410)">
        <text x="0" y="5" fill="#38bdf8" fontSize="13" fontFamily="monospace" fontWeight="900" textAnchor="middle" letterSpacing="2">0101_AI</text>
      </g>
    );
  };

  // Lanyard Badge overlay
  const renderLanyard = () => {
    if (!lanyardBadge) return null;
    return (
      <g id="lanyard-badge" transform="translate(300, 320)">
        {/* Straps hanging from neck */}
        <line x1="-25" y1="0" x2="-4" y2="90" stroke="#3b82f6" strokeWidth="4" strokeLinecap="round" />
        <line x1="25" y1="0" x2="4" y2="90" stroke="#3b82f6" strokeWidth="4" strokeLinecap="round" />
        {/* Metal clip */}
        <rect x="-5" y="90" width="10" height="8" rx="2" fill="#94a3b8" stroke="#0f172a" strokeWidth="1.5" />
        {/* Badge Card */}
        <g transform="translate(0, 98)">
          <rect x="-22" y="0" width="44" height="56" rx="4" fill="#ffffff" stroke="#0f172a" strokeWidth="2.5" />
          <rect x="-20" y="2" width="40" height="12" rx="2" fill="#2563eb" />
          <text x="0" y="11" fill="#ffffff" fontSize="7" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">ENGINEER</text>
          {/* Avatar square */}
          <rect x="-12" y="18" width="24" height="22" rx="3" fill="#e2e8f0" />
          <circle cx="0" cy="27" r="5" fill="#94a3b8" />
          <rect x="-10" y="44" width="20" height="4" rx="1" fill="#cbd5e1" />
        </g>
      </g>
    );
  };

  switch (preset) {
    case 'tech_hoodie':
      return (
        <g id="wardrobe-tech-hoodie">
          {/* Hoodie Body */}
          <path
            d="M 215 340 C 215 320 250 315 300 315 C 350 315 385 320 385 340 L 395 515 C 395 525 380 530 300 530 C 220 530 205 525 205 515 Z"
            fill={primaryColor}
            stroke="#0f172a"
            strokeWidth="5"
            strokeLinejoin="round"
          />
          {/* Hoodie Neck Collar Wrap */}
          <path
            d="M 245 315 C 245 345 270 360 300 360 C 330 360 355 345 355 315 Z"
            fill={secondaryColor}
            stroke="#0f172a"
            strokeWidth="4"
          />
          {/* Drawstrings */}
          <line x1="285" y1="355" x2="282" y2="410" stroke="#f1f5f9" strokeWidth="3.5" strokeLinecap="round" />
          <circle cx="282" cy="412" r="3" fill="#cbd5e1" stroke="#0f172a" strokeWidth="1" />
          <line x1="315" y1="355" x2="318" y2="415" stroke="#f1f5f9" strokeWidth="3.5" strokeLinecap="round" />
          <circle cx="318" cy="417" r="3" fill="#cbd5e1" stroke="#0f172a" strokeWidth="1" />

          {/* Kangaroo Pouch */}
          <path
            d="M 235 450 L 365 450 L 375 510 L 225 510 Z"
            fill={secondaryColor}
            stroke="#0f172a"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          <line x1="260" y1="465" x2="340" y2="465" stroke="#0f172a" strokeWidth="2" opacity="0.4" />

          {/* Chest Graphic */}
          {renderGraphic()}
          {renderLanyard()}
        </g>
      );

    case 'cyberpunk_coat':
      return (
        <g id="wardrobe-cyberpunk-coat">
          {/* Base Coat */}
          <path
            d="M 210 335 C 210 315 250 310 300 310 C 350 310 390 315 390 335 L 400 525 C 400 535 380 540 300 540 C 220 540 200 535 200 525 Z"
            fill={primaryColor}
            stroke="#0f172a"
            strokeWidth="5"
          />
          {/* Cyberpunk High Stand Collar */}
          <path
            d="M 230 310 L 220 275 L 260 310 L 340 310 L 380 275 L 370 310 Z"
            fill={secondaryColor}
            stroke="#0f172a"
            strokeWidth="4"
          />
          {/* Glowing Neon Circuit Traces */}
          <path d="M 230 360 L 270 410 L 270 490" fill="none" stroke={secondaryColor} strokeWidth="3.5" strokeLinecap="round" />
          <circle cx="270" cy="490" r="3.5" fill={secondaryColor} />
          <path d="M 370 360 L 330 410 L 330 490" fill="none" stroke={accentColor} strokeWidth="3.5" strokeLinecap="round" />
          <circle cx="330" cy="490" r="3.5" fill={accentColor} />

          {/* Lapel V-split */}
          <polygon points="275,310 300,380 325,310" fill={skinColor} stroke="#0f172a" strokeWidth="3" />

          {renderGraphic()}
          {renderLanyard()}
        </g>
      );

    case 'dev_flannel':
      return (
        <g id="wardrobe-dev-flannel">
          {/* Outer Plaid Coat */}
          <path
            d="M 215 335 C 215 315 250 315 300 315 C 350 315 385 315 385 335 L 395 520 C 395 530 380 535 300 535 C 220 535 205 530 205 520 Z"
            fill={primaryColor}
            stroke="#0f172a"
            strokeWidth="5"
          />
          {/* Checkered Grid lines */}
          <g stroke="#0f172a" strokeWidth="2.5" opacity="0.3">
            <line x1="240" y1="330" x2="240" y2="525" />
            <line x1="270" y1="330" x2="270" y2="525" />
            <line x1="330" y1="330" x2="330" y2="525" />
            <line x1="360" y1="330" x2="360" y2="525" />
            <line x1="210" y1="380" x2="390" y2="380" />
            <line x1="210" y1="430" x2="390" y2="430" />
            <line x1="210" y1="480" x2="390" y2="480" />
          </g>

          {/* Inner White T-shirt showing in center */}
          <path d="M 275 320 L 275 535 L 325 535 L 325 320 Z" fill="#ffffff" stroke="#0f172a" strokeWidth="3" />

          {/* Flannel Collar flaps */}
          <polygon points="240,315 275,345 280,315" fill={primaryColor} stroke="#0f172a" strokeWidth="3" />
          <polygon points="360,315 325,345 320,315" fill={primaryColor} stroke="#0f172a" strokeWidth="3" />

          {renderGraphic()}
          {renderLanyard()}
        </g>
      );

    case 'minimalist_tee':
    default:
      return (
        <g id="wardrobe-minimalist-tee">
          {/* Clean T-Shirt */}
          <path
            d="M 215 335 C 215 315 250 315 300 315 C 350 315 385 315 385 335 L 395 515 C 395 525 380 530 300 530 C 220 530 205 525 205 515 Z"
            fill={primaryColor}
            stroke="#0f172a"
            strokeWidth="5"
            strokeLinejoin="round"
          />
          {/* Crew Neck Cutout */}
          <path
            d="M 265 315 C 265 345 335 345 335 315 Z"
            fill={skinColor}
            stroke="#0f172a"
            strokeWidth="4"
          />
          {/* Collar Band */}
          <path
            d="M 262 315 C 262 350 338 350 338 315"
            fill="none"
            stroke={secondaryColor || '#0f172a'}
            strokeWidth="3.5"
          />

          {renderGraphic()}
          {renderLanyard()}
        </g>
      );
  }
};
