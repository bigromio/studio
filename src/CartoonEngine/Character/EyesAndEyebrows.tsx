import React from 'react';
import { FacialExpression } from '../types';

interface EyesAndEyebrowsProps {
  expression: FacialExpression;
  eyeColorHex: string;
  frame: number;
}

export const EyesAndEyebrows: React.FC<EyesAndEyebrowsProps> = ({ expression, eyeColorHex, frame }) => {
  // Automatic natural blink every ~70 frames
  const isBlinking = frame % 70 > 66;

  // Pupil movement based on frame
  const pupilShiftX = Math.sin(frame * 0.05) * 2;
  const pupilShiftY = Math.cos(frame * 0.04) * 1;

  if (isBlinking && expression !== 'shocked_bug') {
    return (
      <div className="w-24 h-12 flex items-center justify-between px-2">
        <div className="w-7 h-1.5 bg-slate-900 rounded-full" />
        <div className="w-7 h-1.5 bg-slate-900 rounded-full" />
      </div>
    );
  }

  // Render eyes and brows per expression
  switch (expression) {
    case 'happy':
    case 'laughing':
      return (
        <div className="w-24 h-12 flex flex-col justify-between select-none">
          {/* Eyebrows lifted curved */}
          <div className="flex justify-between px-1">
            <svg className="w-7 h-3" viewBox="0 0 28 12">
              <path d="M 2 10 Q 14 2 26 8" fill="none" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" />
            </svg>
            <svg className="w-7 h-3" viewBox="0 0 28 12">
              <path d="M 2 8 Q 14 2 26 10" fill="none" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </div>
          {/* Happy Anime Crescent Eyes */}
          <div className="flex justify-between px-2">
            <svg className="w-8 h-6" viewBox="0 0 32 24">
              <path d="M 4 16 Q 16 2 28 16" fill="none" stroke="#0f172a" strokeWidth="4" strokeLinecap="round" />
            </svg>
            <svg className="w-8 h-6" viewBox="0 0 32 24">
              <path d="M 4 16 Q 16 2 28 16" fill="none" stroke="#0f172a" strokeWidth="4" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      );

    case 'shocked_bug':
      return (
        <div className="w-24 h-14 flex flex-col justify-between select-none">
          {/* High raised eyebrows */}
          <div className="flex justify-between px-1">
            <div className="w-8 h-1.5 bg-slate-900 rounded-full -rotate-6" />
            <div className="w-8 h-1.5 bg-slate-900 rounded-full rotate-6" />
          </div>
          {/* Wide round startled eyes with tiny pupils */}
          <div className="flex justify-between px-1">
            <div className="w-9 h-9 rounded-full bg-white border-2 border-slate-900 flex items-center justify-center shadow-inner">
              <div className="w-2.5 h-2.5 rounded-full bg-slate-950" />
            </div>
            <div className="w-9 h-9 rounded-full bg-white border-2 border-slate-900 flex items-center justify-center shadow-inner">
              <div className="w-2.5 h-2.5 rounded-full bg-slate-950" />
            </div>
          </div>
        </div>
      );

    case 'focused_coding':
      return (
        <div className="w-24 h-12 flex flex-col justify-between select-none">
          {/* Intense lowered eyebrows */}
          <div className="flex justify-between px-1">
            <svg className="w-8 h-3" viewBox="0 0 32 12">
              <path d="M 2 4 L 30 10" fill="none" stroke="#1e293b" strokeWidth="3.5" strokeLinecap="round" />
            </svg>
            <svg className="w-8 h-3" viewBox="0 0 32 12">
              <path d="M 2 10 L 30 4" fill="none" stroke="#1e293b" strokeWidth="3.5" strokeLinecap="round" />
            </svg>
          </div>
          {/* Half-closed focused eyes */}
          <div className="flex justify-between px-2">
            <div className="w-8 h-5 rounded-b-xl bg-white border-2 border-slate-900 overflow-hidden relative">
              <div 
                className="w-4 h-4 rounded-full absolute top-0.5 left-2 shadow"
                style={{ backgroundColor: eyeColorHex }}
              >
                <div className="w-1.5 h-1.5 bg-black rounded-full mx-auto mt-1" />
              </div>
            </div>
            <div className="w-8 h-5 rounded-b-xl bg-white border-2 border-slate-900 overflow-hidden relative">
              <div 
                className="w-4 h-4 rounded-full absolute top-0.5 left-2 shadow"
                style={{ backgroundColor: eyeColorHex }}
              >
                <div className="w-1.5 h-1.5 bg-black rounded-full mx-auto mt-1" />
              </div>
            </div>
          </div>
        </div>
      );

    case 'smug_genius':
      return (
        <div className="w-24 h-12 flex flex-col justify-between select-none">
          <div className="flex justify-between px-1">
            <div className="w-8 h-1.5 bg-slate-900 rounded-full -rotate-6" />
            <div className="w-8 h-1.5 bg-slate-900 rounded-full rotate-3" />
          </div>
          <div className="flex justify-between px-2 items-center">
            {/* Left eye smug slit */}
            <svg className="w-8 h-5" viewBox="0 0 32 20">
              <path d="M 2 8 Q 16 16 30 8" fill="none" stroke="#0f172a" strokeWidth="3.5" strokeLinecap="round" />
              <circle cx="16" cy="11" r="3" fill={eyeColorHex} />
            </svg>
            {/* Right eye open slightly */}
            <div className="w-7 h-5 rounded-full bg-white border-2 border-slate-900 relative overflow-hidden">
              <div className="w-3.5 h-3.5 rounded-full bg-slate-900 absolute top-0.5 right-1" />
            </div>
          </div>
        </div>
      );

    case 'confused_debugging':
      return (
        <div className="w-24 h-12 flex flex-col justify-between select-none">
          {/* One high eyebrow, one low furrowed */}
          <div className="flex justify-between px-1">
            <div className="w-8 h-2 bg-slate-900 rounded-full -rotate-12" />
            <div className="w-8 h-2 bg-slate-900 rounded-full rotate-6" />
          </div>
          <div className="flex justify-between px-2">
            <div className="w-7 h-6 rounded-full bg-white border-2 border-slate-900 relative overflow-hidden">
              <div className="w-3 h-3 rounded-full bg-slate-900 absolute top-1.5 left-2" />
            </div>
            <div className="w-8 h-7 rounded-full bg-white border-2 border-slate-900 relative overflow-hidden">
              <div className="w-4 h-4 rounded-full bg-slate-900 absolute top-1 left-2" />
            </div>
          </div>
        </div>
      );

    case 'wink':
      return (
        <div className="w-24 h-12 flex flex-col justify-between select-none">
          <div className="flex justify-between px-1">
            <div className="w-7 h-1.5 bg-slate-900 rounded-full" />
            <div className="w-7 h-1.5 bg-slate-900 rounded-full -rotate-6" />
          </div>
          <div className="flex justify-between px-2 items-center">
            {/* Winking right eye */}
            <div className="w-8 h-7 rounded-full bg-white border-2 border-slate-900 relative overflow-hidden">
              <div 
                className="w-4 h-4 rounded-full absolute top-1.5 left-2"
                style={{ backgroundColor: eyeColorHex }}
              >
                <div className="w-2 h-2 rounded-full bg-slate-950 mx-auto mt-0.5" />
              </div>
            </div>
            <svg className="w-8 h-4" viewBox="0 0 32 16">
              <path d="M 2 12 Q 16 2 30 12" fill="none" stroke="#0f172a" strokeWidth="4" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      );

    case 'angry_syntax_error':
      return (
        <div className="w-24 h-12 flex flex-col justify-between select-none">
          {/* Hard V-shaped angry brows */}
          <div className="flex justify-between px-1">
            <div className="w-8 h-2 bg-red-950 rounded-full rotate-12" />
            <div className="w-8 h-2 bg-red-950 rounded-full -rotate-12" />
          </div>
          <div className="flex justify-between px-2">
            <div className="w-8 h-6 rounded-b-lg bg-white border-2 border-red-950 relative overflow-hidden">
              <div className="w-4 h-4 rounded-full bg-red-900 absolute top-1 left-2" />
            </div>
            <div className="w-8 h-6 rounded-b-lg bg-white border-2 border-red-950 relative overflow-hidden">
              <div className="w-4 h-4 rounded-full bg-red-900 absolute top-1 right-2" />
            </div>
          </div>
        </div>
      );

    default: // Standard open confident eyes
      return (
        <div className="w-24 h-12 flex flex-col justify-between select-none">
          <div className="flex justify-between px-2">
            <div className="w-7 h-1.5 bg-slate-900 rounded-full" />
            <div className="w-7 h-1.5 bg-slate-900 rounded-full" />
          </div>
          <div className="flex justify-between px-2">
            <div className="w-8 h-7 rounded-full bg-white border-2 border-slate-900 relative overflow-hidden shadow-inner">
              <div 
                className="w-4 h-4 rounded-full absolute shadow"
                style={{ 
                  backgroundColor: eyeColorHex,
                  top: `${4 + pupilShiftY}px`,
                  left: `${4 + pupilShiftX}px`
                }}
              >
                <div className="w-2 h-2 rounded-full bg-slate-950 mx-auto mt-1" />
                <div className="w-1 h-1 rounded-full bg-white absolute top-0.5 right-0.5" />
              </div>
            </div>
            <div className="w-8 h-7 rounded-full bg-white border-2 border-slate-900 relative overflow-hidden shadow-inner">
              <div 
                className="w-4 h-4 rounded-full absolute shadow"
                style={{ 
                  backgroundColor: eyeColorHex,
                  top: `${4 + pupilShiftY}px`,
                  left: `${4 + pupilShiftX}px`
                }}
              >
                <div className="w-2 h-2 rounded-full bg-slate-950 mx-auto mt-1" />
                <div className="w-1 h-1 rounded-full bg-white absolute top-0.5 right-0.5" />
              </div>
            </div>
          </div>
        </div>
      );
  }
};
