import React from 'react';
import { WardrobeConfig } from '../types';

interface WardrobeEngineProps {
  config: WardrobeConfig;
  skinColor: string;
}

export const WardrobeEngine: React.FC<WardrobeEngineProps> = ({ config, skinColor }) => {
  const { preset, primaryColor, secondaryColor, accentColor, graphicOnShirt, lanyardBadge } = config;

  // Render Graphic on chest
  const renderGraphic = () => {
    if (graphicOnShirt === 'none') return null;

    if (graphicOnShirt === 'react_atom') {
      return (
        <svg className="w-8 h-8 opacity-90 animate-spin" style={{ animationDuration: '10s' }} viewBox="0 0 32 32">
          <ellipse cx="16" cy="16" rx="12" ry="4" fill="none" stroke="#38bdf8" strokeWidth="1.5" />
          <ellipse cx="16" cy="16" rx="12" ry="4" fill="none" stroke="#38bdf8" strokeWidth="1.5" transform="rotate(60 16 16)" />
          <ellipse cx="16" cy="16" rx="12" ry="4" fill="none" stroke="#38bdf8" strokeWidth="1.5" transform="rotate(120 16 16)" />
          <circle cx="16" cy="16" r="2" fill="#38bdf8" />
        </svg>
      );
    }

    if (graphicOnShirt === 'terminal_prompt') {
      return (
        <div className="text-[7px] font-mono text-emerald-400 bg-black/70 px-1.5 py-0.5 rounded border border-emerald-500/40">
          &gt; dev$
        </div>
      );
    }

    if (graphicOnShirt === 'coffee_cup') {
      return <span className="text-sm">☕</span>;
    }

    return (
      <div className="text-[6px] font-mono font-bold tracking-tighter text-cyan-300">
        0101
      </div>
    );
  };

  switch (preset) {
    case 'tech_hoodie':
      return (
        <div className="relative w-44 h-36 flex flex-col items-center">
          {/* Hoodie Collar & Strings */}
          <div 
            className="w-32 h-14 rounded-t-full border-t-4 border-slate-950 flex flex-col items-center justify-between pt-1 relative z-10"
            style={{ backgroundColor: primaryColor }}
          >
            {/* Drawstrings */}
            <div className="flex justify-between w-14 mt-1">
              <div className="w-1 h-8 rounded-full bg-slate-200 shadow" />
              <div className="w-1 h-9 rounded-full bg-slate-200 shadow" />
            </div>
          </div>

          {/* Torso & Kangaroo Pocket */}
          <div 
            className="w-44 h-24 rounded-b-2xl border-b-4 border-slate-950 flex flex-col items-center justify-between pb-2 relative shadow-lg"
            style={{ backgroundColor: primaryColor }}
          >
            {/* Chest Graphic */}
            <div className="mt-1">{renderGraphic()}</div>

            {/* Kangaroo Pouch */}
            <div 
              className="w-28 h-10 rounded-t-lg border-2 border-slate-900/40 flex items-center justify-center shadow-inner"
              style={{ backgroundColor: secondaryColor }}
            >
              <div className="w-16 h-1 bg-black/20 rounded" />
            </div>
          </div>

          {/* Lanyard Badge */}
          {lanyardBadge && (
            <div className="absolute top-2 left-1/2 -translate-x-1/2 flex flex-col items-center z-20">
              <div className="w-1 h-14 bg-indigo-500 shadow" />
              <div className="w-8 h-10 bg-white rounded border border-slate-400 p-0.5 shadow-md flex flex-col items-center justify-between">
                <div className="w-6 h-1 bg-indigo-600 rounded" />
                <div className="w-4 h-4 bg-slate-300 rounded-full" />
                <div className="text-[4px] font-mono text-slate-800">VIP DEV</div>
              </div>
            </div>
          )}
        </div>
      );

    case 'cyberpunk_coat':
      return (
        <div className="relative w-44 h-36 flex flex-col items-center">
          {/* Cyberpunk High Stand Collar */}
          <div 
            className="w-36 h-14 rounded-t-xl border-2 border-slate-950 flex justify-between px-3 pt-1 relative z-10"
            style={{ backgroundColor: primaryColor }}
          >
            <div className="w-2 h-10 rounded bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
            {/* Inner neck skin */}
            <div className="w-14 h-8 rounded-b-lg mt-1" style={{ backgroundColor: skinColor }} />
            <div className="w-2 h-10 rounded bg-pink-500 shadow-[0_0_8px_#ec4899]" />
          </div>

          {/* Coat Body with Neon Circuit Traces */}
          <div 
            className="w-44 h-24 rounded-b-xl border-2 border-slate-950 relative overflow-hidden shadow-2xl flex flex-col items-center pt-2"
            style={{ backgroundColor: primaryColor }}
          >
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 160 90">
              <line x1="20" y1="10" x2="50" y2="40" stroke={secondaryColor} strokeWidth="2" />
              <line x1="50" y1="40" x2="50" y2="80" stroke={secondaryColor} strokeWidth="2" />
              <line x1="140" y1="10" x2="110" y2="40" stroke={accentColor} strokeWidth="2" />
              <line x1="110" y1="40" x2="110" y2="80" stroke={accentColor} strokeWidth="2" />
            </svg>
            <div className="z-10">{renderGraphic()}</div>
          </div>
        </div>
      );

    case 'dev_flannel':
      return (
        <div className="relative w-44 h-36 flex flex-col items-center">
          {/* Flannel Collar */}
          <div 
            className="w-34 h-12 rounded-t-xl border-t-2 border-slate-900 flex justify-between px-4 pt-1 z-10"
            style={{ backgroundColor: primaryColor }}
          >
            <div className="w-4 h-6 bg-amber-200/40 rounded -rotate-12 border border-slate-900" />
            <div className="w-12 h-8 rounded-b-md" style={{ backgroundColor: skinColor }} />
            <div className="w-4 h-6 bg-amber-200/40 rounded rotate-12 border border-slate-900" />
          </div>

          {/* Plaid Grid Pattern Torso */}
          <div 
            className="w-44 h-24 rounded-b-xl border-2 border-slate-900 relative overflow-hidden flex flex-col items-center justify-between"
            style={{ backgroundColor: primaryColor }}
          >
            {/* Inner White Tee visible */}
            <div className="w-16 h-full bg-white/90 border-x-2 border-slate-800 flex items-center justify-center p-1">
              {renderGraphic()}
            </div>
            {/* Checkered lines */}
            <div className="absolute inset-0 grid grid-cols-6 grid-rows-3 pointer-events-none opacity-40">
              {[...Array(18)].map((_, i) => (
                <div key={i} className="border border-black" />
              ))}
            </div>
          </div>
        </div>
      );

    case 'minimalist_tee':
    default:
      return (
        <div className="relative w-44 h-36 flex flex-col items-center">
          {/* Round Crew Neck */}
          <div 
            className="w-32 h-10 rounded-t-2xl border-t-2 border-slate-900 flex justify-center pt-1 z-10"
            style={{ backgroundColor: primaryColor }}
          >
            <div className="w-12 h-6 rounded-b-full" style={{ backgroundColor: skinColor }} />
          </div>

          {/* Clean T-Shirt Torso */}
          <div 
            className="w-42 h-26 rounded-b-2xl border-2 border-slate-900 flex flex-col items-center justify-center p-2 shadow-md relative"
            style={{ backgroundColor: primaryColor }}
          >
            {renderGraphic()}
          </div>

          {lanyardBadge && (
            <div className="absolute top-2 left-1/2 -translate-x-1/2 flex flex-col items-center z-20">
              <div className="w-1 h-12 bg-sky-500 shadow" />
              <div className="w-7 h-9 bg-white rounded border border-slate-400 p-0.5 shadow-md flex flex-col items-center justify-between">
                <div className="w-5 h-1 bg-sky-600 rounded" />
                <div className="text-[4px] font-mono text-slate-800">ENGINEER</div>
              </div>
            </div>
          )}
        </div>
      );
  }
};
