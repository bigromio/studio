import React from 'react';
import { HookConfig, HookLayer } from '../types';

interface HookLibraryProps {
  config: HookConfig;
  targetLayer: HookLayer;
  frame: number;
}

export const HookLibrary: React.FC<HookLibraryProps> = ({ config, targetLayer, frame }) => {
  // Only render if enabled and matching layer (behind or in front)
  if (!config.enabled || config.layer !== targetLayer || !config.text) {
    return null;
  }

  const { style, text, subText, primaryColor, secondaryColor, textColor, fontSize, positionY, positionX, animationType } = config;

  // Animation calculation based on frame
  let animTransform = '';
  let animOpacity = 1;

  if (animationType === 'spring_pop') {
    const popScale = frame < 8 ? Math.min(1.2, 0.4 + (frame / 8) * 0.8) : frame < 14 ? 1.2 - ((frame - 8) / 6) * 0.2 : 1;
    animTransform = `scale(${popScale})`;
  } else if (animationType === 'slide_in') {
    const slideOffset = frame < 12 ? Math.max(0, (12 - frame) * 15) : 0;
    animTransform = `translateY(${slideOffset}px)`;
    animOpacity = Math.min(1, frame / 6);
  } else if (animationType === 'glitch_shake') {
    const glitchX = (frame % 4 === 0) ? (Math.sin(frame) * 6) : 0;
    animTransform = `translateX(${glitchX}px)`;
  } else if (animationType === 'pulsing_glow') {
    const pulse = 1 + Math.sin(frame * 0.15) * 0.04;
    animTransform = `scale(${pulse})`;
  }

  // Position style
  const containerStyle: React.CSSProperties = {
    top: `${positionY}%`,
    left: `${positionX}%`,
    transform: `translate(-50%, -50%) ${animTransform}`,
    opacity: animOpacity,
    fontSize: `${fontSize}px`
  };

  // Render specific Hook style
  switch (style) {
    case 'kinetic_3d_block':
      return (
        <div 
          className="absolute z-10 pointer-events-none select-none text-center font-black uppercase tracking-tight transition-transform"
          style={containerStyle}
        >
          <div 
            className="px-6 py-3 rounded-2xl border-4 border-black inline-block shadow-[0_12px_0_#000000]"
            style={{
              backgroundColor: primaryColor,
              color: textColor,
              textShadow: `3px 3px 0 ${secondaryColor}, 6px 6px 0 #000000`
            }}
          >
            <div className="leading-tight drop-shadow-md">{text}</div>
            {subText && (
              <div className="text-[0.45em] tracking-widest font-mono text-black bg-white/90 px-2 py-0.5 rounded mt-1">
                {subText}
              </div>
            )}
          </div>
        </div>
      );

    case 'cyberpunk_glitch_tag':
      return (
        <div 
          className="absolute z-10 pointer-events-none select-none text-center font-mono font-black transition-transform"
          style={containerStyle}
        >
          <div 
            className="px-8 py-3 rounded-md border-2 border-cyan-400 relative overflow-hidden shadow-[0_0_25px_rgba(6,182,212,0.8)]"
            style={{ backgroundColor: primaryColor }}
          >
            <div className="absolute top-0 left-0 w-2 h-2 bg-cyan-400" />
            <div className="absolute bottom-0 right-0 w-2 h-2 bg-pink-500" />
            <div 
              className="text-white tracking-wider uppercase drop-shadow-[0_0_8px_#22d3ee]"
              style={{ color: textColor }}
            >
              &lt; {text} /&gt;
            </div>
            {subText && (
              <div className="text-[0.4em] text-cyan-300 font-bold tracking-widest mt-0.5">
                STATUS: {subText}
              </div>
            )}
          </div>
        </div>
      );

    case 'comic_pop_banner':
      return (
        <div 
          className="absolute z-10 pointer-events-none select-none text-center font-black transition-transform -rotate-3"
          style={containerStyle}
        >
          <div 
            className="px-8 py-4 rounded-3xl border-4 border-black inline-block relative shadow-[8px_8px_0_#000]"
            style={{ backgroundColor: primaryColor }}
          >
            <div 
              className="text-black uppercase tracking-tight"
              style={{ color: textColor, textShadow: '2px 2px 0 #fff' }}
            >
              💥 {text}
            </div>
            {subText && (
              <div className="text-[0.5em] text-white bg-black px-2 py-0.5 rounded-full inline-block mt-1">
                {subText}
              </div>
            )}
          </div>
        </div>
      );

    case 'neon_glowing_sign':
      return (
        <div 
          className="absolute z-10 pointer-events-none select-none text-center font-mono font-bold transition-transform"
          style={containerStyle}
        >
          <div 
            className="px-6 py-2.5 rounded-xl border-2 border-emerald-400/80 bg-black/80 backdrop-blur shadow-[0_0_30px_#10b981]"
          >
            <div 
              className="text-emerald-300 uppercase tracking-widest drop-shadow-[0_0_12px_#34d399]"
              style={{ color: textColor }}
            >
              ⚡ {text}
            </div>
          </div>
        </div>
      );

    case 'matrix_hacker_badge':
      return (
        <div 
          className="absolute z-10 pointer-events-none select-none font-mono font-bold transition-transform"
          style={containerStyle}
        >
          <div className="px-5 py-2 rounded bg-black/90 border border-emerald-500/60 shadow-[0_0_15px_rgba(16,185,129,0.4)]">
            <div className="text-[0.45em] text-emerald-600 border-b border-emerald-900 pb-0.5 mb-1">
              ROOT@TERMINAL: ~
            </div>
            <div className="text-emerald-400 flex items-center">
              <span>&gt; {text}</span>
              <span className="w-2 h-4 bg-emerald-400 ml-1 inline-block animate-pulse" />
            </div>
          </div>
        </div>
      );

    case 'bold_tech_slab':
    default:
      return (
        <div 
          className="absolute z-10 pointer-events-none select-none text-center font-sans font-black tracking-tight transition-transform"
          style={containerStyle}
        >
          <div 
            className="px-6 py-3 rounded-xl border-2 border-white/20 backdrop-blur-md shadow-2xl"
            style={{
              background: `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`,
              color: textColor
            }}
          >
            <div className="leading-none drop-shadow-md">{text}</div>
            {subText && (
              <div className="text-[0.45em] opacity-90 font-medium tracking-wide mt-1">
                {subText}
              </div>
            )}
          </div>
        </div>
      );
  }
};
