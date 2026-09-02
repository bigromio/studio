import React from 'react';
import { RoomEnvironmentConfig, TimeOfDay } from '../types';

// Animated Code on Screen
export const ScreenCodeDisplay: React.FC<{ theme: RoomEnvironmentConfig['codeTheme']; frame: number }> = ({ theme, frame }) => {
  const codeLinesMatrix = [
    '01011001 01100001 01111001',
    'const brain = new NeuralCore();',
    'while(alive) { innovate(); }',
    'import { future } from "ai";',
    'system.matrix.override(0x7F);',
    'renderScene({ angle: 45 });',
    'export default SuperCartoon;'
  ];

  const codeLinesVsCode = [
    'import { RemotionStudio } from "remotion";',
    'export const CartoonScene = () => {',
    '  const frame = useCurrentFrame();',
    '  const { fps } = useVideoConfig();',
    '  return <RoomEnvironment angle="front" />;',
    '};',
    '// Compiling shader 100% OK'
  ];

  const codeLinesSynth = [
    'NEON_WAVE_OS: RUNNING',
    'FREQ: 432Hz | BPM: 128',
    'CYBER_DECK_LINK: ACTIVE',
    'GPU_TEMP: 42°C [OPTIMAL]',
    'RENDERING RAYTRACED SPRITES...'
  ];

  const lines = theme === 'matrix' ? codeLinesMatrix : theme === 'synthwave' ? codeLinesSynth : codeLinesVsCode;
  const activeLine = Math.floor(frame / 6) % lines.length;

  const colorStyle = theme === 'matrix' 
    ? 'text-emerald-400 bg-black/90 font-mono border-emerald-500/40' 
    : theme === 'synthwave' 
    ? 'text-pink-400 bg-purple-950/90 font-mono border-pink-500/40' 
    : 'text-sky-300 bg-slate-900/90 font-mono border-sky-500/30';

  return (
    <div className={`w-full h-full p-2.5 text-[10px] leading-relaxed overflow-hidden border rounded flex flex-col justify-between select-none shadow-inner ${colorStyle}`}>
      <div className="flex items-center justify-between border-b border-current pb-1 opacity-70 mb-1">
        <div className="flex space-x-1 rtl:space-x-reverse">
          <span className="w-2 h-2 rounded-full bg-red-400 inline-block opacity-80" />
          <span className="w-2 h-2 rounded-full bg-yellow-400 inline-block opacity-80" />
          <span className="w-2 h-2 rounded-full bg-green-400 inline-block opacity-80" />
        </div>
        <span className="text-[8px] uppercase tracking-wider font-semibold">terminal.sh</span>
      </div>
      <div className="space-y-1">
        {lines.map((line, idx) => (
          <div key={idx} className={`transition-all duration-150 flex items-center ${idx === activeLine ? 'opacity-100 font-bold translate-x-1' : 'opacity-60'}`}>
            <span className="opacity-40 mr-1.5 text-[8px]">{idx + 1}</span>
            <span className="truncate">{line}</span>
            {idx === activeLine && <span className="inline-block w-1.5 h-3 bg-current ml-1 animate-pulse" />}
          </div>
        ))}
      </div>
      <div className="mt-1 pt-1 border-t border-current/20 flex justify-between text-[7px] opacity-75">
        <span>UTF-8</span>
        <span>GIT: main*</span>
        <span>FPS: 30</span>
      </div>
    </div>
  );
};

// Coffee Cup with Animated Steam
export const CoffeeCupSteam: React.FC<{ showSteam: boolean; frame: number; text: string }> = ({ showSteam, frame, text }) => {
  const wave1 = Math.sin(frame * 0.1) * 3;
  const wave2 = Math.cos(frame * 0.08) * 3;

  return (
    <div className="relative inline-block">
      {showSteam && (
        <svg className="absolute -top-6 left-1/2 -translate-x-1/2 w-6 h-7 pointer-events-none opacity-70" viewBox="0 0 24 30">
          <path
            d={`M 8 26 Q ${8 + wave1} 16, ${12 - wave2} 8 T 14 2`}
            fill="none"
            stroke="rgba(255,255,255,0.7)"
            strokeWidth="2"
            strokeLinecap="round"
            className="animate-pulse"
          />
          <path
            d={`M 14 26 Q ${14 - wave2} 18, ${10 + wave1} 10 T 12 3`}
            fill="none"
            stroke="rgba(220,240,255,0.5)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      )}
      <div className="w-8 h-9 rounded-b-md bg-amber-800 border-2 border-amber-950 flex flex-col justify-end items-center relative shadow-md">
        <span className="text-[6px] text-amber-100 font-black tracking-tighter truncate max-w-[24px] mb-1">
          {text || 'DEV'}
        </span>
        <div className="absolute right-[-6px] top-1.5 w-2.5 h-4 border-2 border-amber-950 rounded-r-md" />
      </div>
    </div>
  );
};

// Window with dynamic time of day / rain / city skyline
export const ProgrammerWindow: React.FC<{ timeOfDay: TimeOfDay; rain: boolean; frame: number }> = ({ timeOfDay, rain, frame }) => {
  const bgGradient = 
    timeOfDay === 'midnight' ? 'from-indigo-950 via-slate-900 to-black' :
    timeOfDay === 'sunset' ? 'from-orange-500 via-purple-800 to-slate-950' :
    timeOfDay === 'cyberpunk_night' ? 'from-fuchsia-950 via-cyan-950 to-slate-950' :
    'from-sky-300 via-blue-200 to-amber-100';

  return (
    <div className={`w-full h-full rounded-lg border-4 border-slate-700 overflow-hidden relative shadow-2xl bg-gradient-to-b ${bgGradient}`}>
      {/* City skyline silhouettes */}
      <div className="absolute bottom-0 inset-x-0 h-1/2 flex items-end justify-around opacity-40">
        <div className="w-5 h-16 bg-slate-950 rounded-t" />
        <div className="w-8 h-24 bg-slate-900 rounded-t flex flex-wrap gap-0.5 p-1">
          <div className="w-1 h-1 bg-yellow-200/60" />
          <div className="w-1 h-1 bg-yellow-200/60" />
          <div className="w-1 h-1 bg-cyan-200/60" />
        </div>
        <div className="w-6 h-12 bg-slate-950 rounded-t" />
        <div className="w-9 h-20 bg-slate-900 rounded-t" />
      </div>

      {/* Moon or Sun */}
      {timeOfDay === 'daylight' ? (
        <div className="absolute top-3 right-4 w-7 h-7 rounded-full bg-amber-200 shadow-[0_0_20px_rgba(251,191,36,0.8)]" />
      ) : (
        <div className="absolute top-3 right-4 w-6 h-6 rounded-full bg-slate-100 shadow-[0_0_15px_rgba(255,255,255,0.4)]" />
      )}

      {/* Rain droplets overlay */}
      {rain && (
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <line x1={`${(frame * 7) % 100}%`} y1="0%" x2={`${((frame * 7) % 100) - 10}%`} y2="100%" stroke="rgba(255,255,255,0.6)" strokeWidth="1" strokeDasharray="5,15" />
            <line x1={`${((frame * 11) + 40) % 100}%`} y1="0%" x2={`${(((frame * 11) + 40) % 100) - 10}%`} y2="100%" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeDasharray="4,12" />
          </svg>
        </div>
      )}

      {/* Window Grill Cross */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-full h-1 bg-slate-700" />
        <div className="h-full w-1 bg-slate-700 absolute" />
      </div>
    </div>
  );
};

// Blinking Server Rack
export const ServerRackTower: React.FC<{ blinking: boolean; frame: number }> = ({ blinking, frame }) => {
  return (
    <div className="w-14 h-48 bg-slate-900 border-2 border-slate-700 rounded-md p-1.5 flex flex-col justify-between shadow-2xl relative">
      <div className="text-[7px] text-slate-400 font-mono text-center border-b border-slate-800 pb-0.5">DEV-NODE-01</div>
      <div className="space-y-1.5 my-auto">
        {[0, 1, 2, 3, 4].map((unit) => {
          const isLedOn1 = blinking ? (frame + unit * 3) % 4 === 0 : true;
          const isLedOn2 = blinking ? (frame + unit * 5) % 6 === 0 : false;
          return (
            <div key={unit} className="h-5 bg-slate-950 border border-slate-800 rounded p-1 flex items-center justify-between">
              <div className="w-2 h-2 rounded-full bg-slate-800 flex items-center justify-center">
                <span className={`w-1.5 h-1.5 rounded-full ${isLedOn1 ? 'bg-emerald-400 shadow-[0_0_6px_#34d399]' : 'bg-emerald-950'}`} />
              </div>
              <div className="flex space-x-1 rtl:space-x-reverse">
                <span className={`w-1 h-1 rounded-full ${isLedOn2 ? 'bg-cyan-400 shadow-[0_0_5px_#22d3ee]' : 'bg-cyan-950'}`} />
                <span className="w-1 h-1 rounded-full bg-blue-500 animate-pulse" />
              </div>
              <div className="w-4 h-1 bg-slate-800 rounded" />
            </div>
          );
        })}
      </div>
      <div className="text-[6px] text-emerald-400 font-mono text-center bg-black/60 rounded px-0.5">99.99% UP</div>
    </div>
  );
};
