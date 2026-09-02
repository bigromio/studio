import React from 'react';
import { CaptionConfig } from '../types';

interface CaptionLibraryProps {
  config: CaptionConfig;
  frame: number;
}

export const CaptionLibrary: React.FC<CaptionLibraryProps> = ({ config, frame }) => {
  if (!config.enabled || !config.text) return null;

  const { style, text, words, activeWordIndex, textColor, highlightColor, backgroundColor, fontSize, positionY, scatterSpread } = config;

  // Split words if structured words array is empty
  const wordList = words && words.length > 0 ? words : text.split(' ').map((w, idx) => ({
    word: w,
    startFrame: idx * 8,
    endFrame: (idx + 1) * 8,
    color: '#ffffff',
    highlight: false,
    sizeMultiplier: 1,
    scatterOffsetX: ((idx * 57) % 240) - 120,
    scatterOffsetY: ((idx * 83) % 180) - 90,
    rotation: ((idx * 23) % 30) - 15
  }));

  // Determine active word index from frame if words have timestamps
  let currentActiveIndex = activeWordIndex;
  const foundIndex = wordList.findIndex(w => frame >= w.startFrame && frame <= w.endFrame);
  if (foundIndex !== -1) {
    currentActiveIndex = foundIndex;
  } else if (wordList.length > 0) {
    currentActiveIndex = Math.floor((frame / 8) % wordList.length);
  }

  // Style 1: Scattered Words Orbiting around the character
  if (style === 'scattered_orbit') {
    const orbitRadius = scatterSpread || 160;

    return (
      <div className="absolute inset-0 pointer-events-none select-none z-40">
        {wordList.map((item, idx) => {
          const isActive = idx === currentActiveIndex;
          // Calculate orbiting trajectory with sin/cos
          const angle = (idx / wordList.length) * (2 * Math.PI) + (frame * 0.02);
          const orbitX = Math.cos(angle) * orbitRadius;
          const orbitY = Math.sin(angle) * (orbitRadius * 0.55);

          // Pop size when word is active
          const scale = isActive ? 1.35 : 0.9;
          const opacity = isActive ? 1 : 0.65;
          const fontWeight = idx % 2 === 0 ? 'font-black' : 'font-extrabold';
          const fontColor = isActive ? highlightColor : idx % 3 === 0 ? '#38bdf8' : idx % 3 === 1 ? '#f43f5e' : textColor;

          return (
            <div
              key={idx}
              className="absolute left-1/2 top-1/2 transition-all duration-150 ease-out"
              style={{
                transform: `translate(calc(-50% + ${orbitX}px), calc(-50% + ${orbitY}px)) scale(${scale}) rotate(${item.rotation || 0}deg)`,
                opacity
              }}
            >
              <div 
                className={`px-3 py-1 rounded-xl shadow-2xl backdrop-blur-sm border-2 ${fontWeight} uppercase tracking-tight`}
                style={{
                  fontSize: `${fontSize * (item.sizeMultiplier || 1)}px`,
                  color: fontColor,
                  backgroundColor: isActive ? 'rgba(0,0,0,0.85)' : 'rgba(15,23,42,0.6)',
                  borderColor: isActive ? highlightColor : 'rgba(255,255,255,0.2)',
                  boxShadow: isActive ? `0 0 20px ${highlightColor}66` : '0 4px 12px rgba(0,0,0,0.5)'
                }}
              >
                {item.word}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  // Style 2: Dynamic Karaoke Highlight word-by-word
  if (style === 'karaoke_highlight') {
    return (
      <div 
        className="absolute inset-x-0 z-40 flex justify-center pointer-events-none select-none px-6"
        style={{ top: `${positionY}%` }}
      >
        <div 
          className="px-6 py-3 rounded-2xl border-2 border-white/20 backdrop-blur-md shadow-2xl flex flex-wrap items-center justify-center gap-2 max-w-2xl"
          style={{ backgroundColor: backgroundColor || 'rgba(0, 0, 0, 0.75)' }}
        >
          {wordList.map((item, idx) => {
            const isActive = idx === currentActiveIndex;
            const isPast = idx < currentActiveIndex;

            return (
              <span
                key={idx}
                className={`transition-all duration-100 font-black tracking-tight ${isActive ? 'scale-115 -translate-y-0.5' : 'scale-100'}`}
                style={{
                  fontSize: `${fontSize}px`,
                  color: isActive ? highlightColor : isPast ? '#94a3b8' : textColor,
                  textShadow: isActive ? `0 0 16px ${highlightColor}` : 'none'
                }}
              >
                {item.word}
              </span>
            );
          })}
        </div>
      </div>
    );
  }

  // Style 3: Bouncy TikTok / Reels Badge
  if (style === 'bouncy_tiktok_badge') {
    const activeWord = wordList[currentActiveIndex]?.word || text;
    const bounceScale = 1 + Math.abs(Math.sin(frame * 0.4)) * 0.15;

    return (
      <div 
        className="absolute inset-x-0 z-40 flex justify-center pointer-events-none select-none"
        style={{ top: `${positionY}%` }}
      >
        <div 
          className="px-8 py-3 rounded-2xl border-4 border-black font-black uppercase tracking-tight shadow-[0_8px_0_#000] transition-transform"
          style={{
            transform: `scale(${bounceScale})`,
            backgroundColor: highlightColor || '#fde047',
            color: textColor || '#000000',
            fontSize: `${fontSize * 1.3}px`
          }}
        >
          {activeWord}
        </div>
      </div>
    );
  }

  // Style 4: Cyberpunk Terminal Subtitles
  if (style === 'cyberpunk_terminal') {
    return (
      <div 
        className="absolute inset-x-0 z-40 flex justify-center pointer-events-none select-none px-4"
        style={{ top: `${positionY}%` }}
      >
        <div className="px-6 py-2.5 rounded bg-black/90 border border-emerald-500/60 shadow-[0_0_20px_rgba(16,185,129,0.3)] font-mono flex items-center space-x-2 rtl:space-x-reverse">
          <span className="text-emerald-500 font-bold text-[0.8em]">[SUB_SYNC]</span>
          <div className="flex space-x-1.5 rtl:space-x-reverse" style={{ fontSize: `${fontSize}px` }}>
            {wordList.map((item, idx) => (
              <span
                key={idx}
                className={idx === currentActiveIndex ? 'text-emerald-300 font-black underline' : 'text-emerald-600'}
              >
                {item.word}
              </span>
            ))}
          </div>
          <span className="w-2 h-4 bg-emerald-400 inline-block animate-pulse" />
        </div>
      </div>
    );
  }

  // Style 5: Comic Speech Bubble
  if (style === 'comic_sound_bubble') {
    return (
      <div 
        className="absolute z-40 pointer-events-none select-none"
        style={{ top: `${positionY - 20}%`, left: '48%' }}
      >
        <div className="relative px-6 py-3 bg-white rounded-3xl border-4 border-black shadow-[6px_6px_0_#000] font-black max-w-sm text-center">
          <div style={{ fontSize: `${fontSize}px`, color: textColor }}>
            {text}
          </div>
          {/* Speech Bubble Pointer */}
          <div className="absolute -bottom-4 left-8 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[16px] border-t-black" />
          <div className="absolute -bottom-3 left-9 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[14px] border-t-white" />
        </div>
      </div>
    );
  }

  // Style 6: Minimalist Clean Subtitle Bar
  return (
    <div 
      className="absolute inset-x-0 z-40 flex justify-center pointer-events-none select-none px-6"
      style={{ top: `${positionY}%` }}
    >
      <div 
        className="px-6 py-2 rounded-lg bg-black/80 backdrop-blur-sm text-center font-semibold tracking-normal shadow-lg max-w-2xl"
        style={{ fontSize: `${fontSize}px`, color: textColor }}
      >
        {text}
      </div>
    </div>
  );
};
