import React from 'react';
import { RoomEnvironmentConfig } from '../types';
import { ScreenCodeDisplay, CoffeeCupSteam, ProgrammerWindow, ServerRackTower } from './elements';

interface RoomEnvironmentProps {
  config: RoomEnvironmentConfig;
  frame: number;
}

export const RoomEnvironment: React.FC<RoomEnvironmentProps> = ({ config, frame }) => {
  const { angle, timeOfDay, showMonitorsCode, codeTheme, ambientSteam, rgbStripColor, windowRain, serverRackBlink, mugText, plantOnDesk } = config;

  // Background wall styling based on time of day
  const wallBg = 
    timeOfDay === 'midnight' ? 'bg-[#0b0f19]' :
    timeOfDay === 'sunset' ? 'bg-[#1a0e23]' :
    timeOfDay === 'cyberpunk_night' ? 'bg-[#0f0c24]' :
    'bg-[#f0f4f8]';

  const floorBg = 
    timeOfDay === 'daylight' ? 'bg-[#cbd5e1]' : 'bg-[#05070d]';

  // Render Front View
  if (angle === 'front') {
    return (
      <div className={`relative w-full h-full overflow-hidden ${wallBg} select-none transition-colors duration-300`}>
        {/* RGB Light Strip on Wall */}
        <div 
          className="absolute top-0 inset-x-0 h-1.5 shadow-lg transition-all"
          style={{ backgroundColor: rgbStripColor, boxShadow: `0 0 35px ${rgbStripColor}` }}
        />

        {/* Ambient Wall Posters / Shelves */}
        <div className="absolute top-10 left-12 w-28 h-40 bg-slate-900/90 border-2 border-slate-700/60 rounded-md p-2 shadow-xl flex flex-col justify-between overflow-hidden">
          <div className="text-[8px] font-black uppercase text-pink-400 tracking-wider">KEEP CALM & GIT PUSH</div>
          <div className="w-16 h-16 mx-auto rounded-full border-2 border-cyan-400/40 flex items-center justify-center">
            <span className="text-xl">🚀</span>
          </div>
          <div className="text-[6px] text-slate-500 font-mono">STAGING // PRODUCTION</div>
        </div>

        {/* Window on right */}
        <div className="absolute top-8 right-12 w-48 h-56 z-0">
          <ProgrammerWindow timeOfDay={timeOfDay} rain={windowRain} frame={frame} />
        </div>

        {/* Floating Wall Shelf with Books & Figurines */}
        <div className="absolute top-28 left-48 w-44 h-3 bg-amber-900 rounded shadow-md border-b-2 border-amber-950 flex items-end px-2 space-x-1.5 rtl:space-x-reverse">
          <div className="w-3 h-10 bg-emerald-600 rounded-t -mb-1 shadow-sm" />
          <div className="w-3.5 h-12 bg-indigo-600 rounded-t -mb-1 shadow-sm" />
          <div className="w-3 h-8 bg-amber-600 rounded-t -mb-1 shadow-sm" />
          <div className="w-4 h-6 bg-cyan-400/80 rounded-t -mb-1 flex items-center justify-center text-[8px]">👾</div>
        </div>

        {/* Server Rack on far left */}
        <div className="absolute bottom-24 left-6 z-10">
          <ServerRackTower blinking={serverRackBlink} frame={frame} />
        </div>

        {/* Main Programmer Desk Surface */}
        <div className="absolute bottom-0 inset-x-0 h-36 z-10 flex flex-col justify-end">
          {/* Desk Top Wood Panel */}
          <div className="w-full h-14 bg-gradient-to-b from-slate-800 to-slate-900 border-t-4 border-slate-600 relative shadow-2xl flex items-center justify-between px-16">
            
            {/* Left Decor: Plant */}
            {plantOnDesk && (
              <div className="relative -top-8 flex flex-col items-center">
                <div className="flex -space-x-1 -mb-1">
                  <div className="w-4 h-8 bg-emerald-500 rounded-full rotate-[-25deg] shadow" />
                  <div className="w-5 h-9 bg-emerald-400 rounded-full shadow" />
                  <div className="w-4 h-8 bg-emerald-600 rounded-full rotate-[25deg] shadow" />
                </div>
                <div className="w-8 h-8 bg-amber-700 rounded-b-md border-2 border-amber-900" />
              </div>
            )}

            {/* Center: Keyboard & Mousepad glow */}
            <div className="relative -top-3 w-80 h-10 bg-slate-950/80 rounded border border-slate-700 flex items-center justify-center px-4 shadow-lg">
              <div 
                className="w-48 h-6 bg-slate-900 rounded border border-slate-600 flex items-center justify-around px-1"
                style={{ boxShadow: `0 0 12px ${rgbStripColor}33` }}
              >
                {[...Array(12)].map((_, i) => (
                  <span key={i} className="w-2.5 h-3 bg-slate-800 rounded-sm inline-block border border-slate-700" />
                ))}
              </div>
              <div className="w-4 h-6 ml-4 bg-slate-800 rounded-full border border-slate-600" />
            </div>

            {/* Right Decor: Coffee Cup */}
            <div className="relative -top-4">
              <CoffeeCupSteam showSteam={ambientSteam} frame={frame} text={mugText} />
            </div>
          </div>

          {/* Desk Legs & Floor */}
          <div className={`w-full h-22 ${floorBg} border-t-2 border-slate-900/60 relative flex justify-between px-20`}>
            <div className="w-4 h-full bg-slate-700 shadow-md" />
            <div className="w-4 h-full bg-slate-700 shadow-md" />
            {/* Cables on floor */}
            <div className="absolute bottom-2 left-32 w-48 h-2 border-b-2 border-slate-800 rounded-full opacity-60" />
          </div>
        </div>

        {/* Dual Ultrawide Monitors Setup */}
        <div className="absolute bottom-36 inset-x-0 flex justify-center items-end space-x-4 rtl:space-x-reverse z-10">
          {/* Main Primary Center Screen */}
          <div className="w-80 h-48 bg-slate-900 rounded-t-lg border-4 border-slate-700 shadow-2xl relative flex flex-col justify-between p-1">
            {showMonitorsCode && <ScreenCodeDisplay theme={codeTheme} frame={frame} />}
            {/* Monitor Stand */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-10 h-6 bg-slate-700" />
          </div>

          {/* Secondary Vertical Screen */}
          <div className="w-32 h-56 bg-slate-900 rounded-t-lg border-4 border-slate-700 shadow-2xl relative p-1">
            {showMonitorsCode && <ScreenCodeDisplay theme="matrix" frame={frame + 30} />}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-8 h-6 bg-slate-700" />
          </div>
        </div>
      </div>
    );
  }

  // Render Right Angle (45 degrees side-perspective)
  if (angle === 'right_45') {
    return (
      <div className={`relative w-full h-full overflow-hidden ${wallBg} select-none transition-colors`}>
        <div 
          className="absolute top-0 inset-x-0 h-1.5"
          style={{ backgroundColor: rgbStripColor, boxShadow: `0 0 35px ${rgbStripColor}` }}
        />
        {/* Wall Art on Left Side */}
        <div className="absolute top-12 left-10 w-44 h-48 bg-slate-900/80 border-2 border-slate-700 rounded-lg p-3 shadow-2xl transform skew-y-3">
          <div className="text-[10px] font-black text-cyan-400 font-mono">DEBUGGING_MODE: ON</div>
          <div className="mt-4 w-full h-24 bg-slate-950 rounded border border-cyan-500/30 p-2 text-[8px] font-mono text-emerald-400 overflow-hidden">
            &gt; CPU: 12 Cores 4.8GHz<br/>
            &gt; RAM: 64GB DDR5<br/>
            &gt; STACK: React + Remotion<br/>
            &gt; READY.
          </div>
        </div>

        {/* Angled Window on Back Right */}
        <div className="absolute top-8 right-20 w-44 h-52 transform -skew-y-3">
          <ProgrammerWindow timeOfDay={timeOfDay} rain={windowRain} frame={frame} />
        </div>

        {/* 3D Angled Desk Surface */}
        <div className="absolute bottom-0 right-0 w-3/4 h-52 bg-slate-800 border-l-4 border-t-4 border-slate-600 rounded-tl-3xl shadow-2xl transform -skew-x-6 flex items-start justify-around pt-6 px-10 z-10">
          <div className="w-56 h-36 bg-slate-900 border-2 border-slate-600 rounded-lg p-1 shadow-2xl transform skew-y-2">
            {showMonitorsCode && <ScreenCodeDisplay theme={codeTheme} frame={frame} />}
          </div>
          <div className="mt-8">
            <CoffeeCupSteam showSteam={ambientSteam} frame={frame} text={mugText} />
          </div>
        </div>

        {/* Ergonomic Chair silhouette */}
        <div className="absolute bottom-10 left-32 w-28 h-64 bg-slate-900/90 rounded-t-3xl border-4 border-slate-700 shadow-2xl z-0 flex flex-col items-center pt-3">
          <div className="w-20 h-12 bg-slate-800 rounded-full border border-slate-600" />
          <div className="w-24 h-28 bg-slate-800/80 rounded-2xl mt-4 border border-slate-600" />
        </div>
      </div>
    );
  }

  // Render Left Angle (45 degrees from left perspective)
  if (angle === 'left_45') {
    return (
      <div className={`relative w-full h-full overflow-hidden ${wallBg} select-none transition-colors`}>
        <div 
          className="absolute top-0 inset-x-0 h-1.5"
          style={{ backgroundColor: rgbStripColor, boxShadow: `0 0 35px ${rgbStripColor}` }}
        />
        {/* Left Server Rack and Audio Monitors */}
        <div className="absolute top-16 left-8 z-10">
          <ServerRackTower blinking={serverRackBlink} frame={frame} />
        </div>

        {/* Angled Window on Left Wall */}
        <div className="absolute top-10 left-28 w-44 h-52 transform skew-y-3">
          <ProgrammerWindow timeOfDay={timeOfDay} rain={windowRain} frame={frame} />
        </div>

        {/* Desk extending from left to right */}
        <div className="absolute bottom-0 left-0 w-3/4 h-52 bg-slate-800 border-r-4 border-t-4 border-slate-600 rounded-tr-3xl shadow-2xl transform skew-x-6 flex items-start justify-around pt-6 px-10 z-10">
          <div className="mt-8">
            <CoffeeCupSteam showSteam={ambientSteam} frame={frame} text={mugText} />
          </div>
          <div className="w-60 h-36 bg-slate-900 border-2 border-slate-600 rounded-lg p-1 shadow-2xl transform -skew-y-2">
            {showMonitorsCode && <ScreenCodeDisplay theme={codeTheme} frame={frame} />}
          </div>
        </div>

        {/* Right Wall Decor */}
        <div className="absolute top-16 right-10 w-40 h-44 bg-slate-900/80 border-2 border-slate-700 rounded-lg p-3 shadow-2xl transform -skew-y-3">
          <div className="text-[9px] font-black text-pink-400 font-mono text-center">CLEAN CODE ARCHITECTURE</div>
          <div className="mt-3 flex justify-center">
            <span className="text-3xl">☕</span>
          </div>
          <div className="mt-2 text-[7px] text-slate-400 text-center font-mono">Eat - Sleep - Code - Repeat</div>
        </div>
      </div>
    );
  }

  // Render Top-Down (Bird's Eye Perspective)
  if (angle === 'top_down') {
    return (
      <div className={`relative w-full h-full overflow-hidden ${wallBg} select-none transition-colors p-6 flex flex-col justify-between`}>
        {/* Top Edge: Wall with glowing LED strip */}
        <div 
          className="w-full h-4 rounded shadow-lg"
          style={{ backgroundColor: rgbStripColor, boxShadow: `0 0 25px ${rgbStripColor}` }}
        />

        {/* Huge Desk Layout from Above */}
        <div className="w-full h-4/5 bg-slate-800/95 border-4 border-slate-700 rounded-2xl shadow-2xl relative p-6 flex flex-col justify-between">
          {/* Monitors Top Profile Bar */}
          <div className="flex justify-center space-x-6 rtl:space-x-reverse">
            <div className="w-72 h-8 bg-slate-950 rounded border-2 border-slate-700 shadow-inner flex items-center justify-center">
              <span className="text-[9px] text-cyan-400 font-mono tracking-widest">[PRIMARY SCREEN ACTIVE]</span>
            </div>
            <div className="w-36 h-8 bg-slate-950 rounded border-2 border-slate-700 shadow-inner flex items-center justify-center">
              <span className="text-[8px] text-pink-400 font-mono">[DEV TOOLS]</span>
            </div>
          </div>

          {/* Desk Mat & Mechanical Keyboard */}
          <div className="w-4/5 mx-auto h-32 bg-slate-950/90 rounded-xl border-2 border-slate-700/80 flex items-center justify-between px-8 shadow-2xl">
            {/* Keyboard Grid */}
            <div 
              className="w-72 h-20 bg-slate-900 rounded-lg border-2 border-slate-600 p-2 flex flex-col justify-between"
              style={{ boxShadow: `0 0 16px ${rgbStripColor}44` }}
            >
              <div className="flex justify-between">
                {[...Array(14)].map((_, i) => (
                  <span key={i} className="w-3 h-3 bg-slate-800 rounded-sm inline-block border border-slate-700" />
                ))}
              </div>
              <div className="flex justify-between">
                {[...Array(12)].map((_, i) => (
                  <span key={i} className="w-3.5 h-3 bg-slate-800 rounded-sm inline-block border border-slate-700" />
                ))}
              </div>
              <div className="flex justify-center">
                <span className="w-32 h-3 bg-slate-700 rounded-sm border border-slate-600" />
              </div>
            </div>

            {/* Mouse & Mousepad */}
            <div className="w-14 h-22 bg-slate-900 rounded-2xl border-2 border-slate-700 flex flex-col items-center justify-start pt-2 shadow-md">
              <div className="w-2 h-4 bg-cyan-400 rounded-full animate-pulse" />
            </div>
          </div>

          {/* Coffee Mug & Notes on desk */}
          <div className="flex justify-between items-center px-8">
            <div className="w-12 h-12 rounded-full bg-amber-900 border-4 border-amber-950 flex items-center justify-center shadow-lg">
              <div className="w-6 h-6 rounded-full bg-amber-950" />
            </div>
            <div className="w-28 h-16 bg-yellow-100/90 rounded shadow-md border border-yellow-300 p-1.5 text-[7px] font-mono text-slate-800">
              📌 TODO:<br/>
              - Fix Remotion state<br/>
              - Ship Cartoon Engine!
            </div>
          </div>
        </div>

        {/* Programmer Chair Headrest */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-48 h-10 bg-slate-900 border-2 border-slate-700 rounded-full shadow-2xl flex items-center justify-center">
          <span className="text-[8px] font-mono text-slate-500">GAMING SEAT // ERGO</span>
        </div>
      </div>
    );
  }

  // Render Low Angle (Dramatic Floor Level looking up)
  return (
    <div className={`relative w-full h-full overflow-hidden ${wallBg} select-none transition-colors`}>
      <div 
        className="absolute top-0 inset-x-0 h-2 shadow-2xl"
        style={{ backgroundColor: rgbStripColor, boxShadow: `0 0 50px ${rgbStripColor}` }}
      />
      {/* Huge Floor perspective with glowing neon grid */}
      <div className="absolute inset-0 flex flex-col justify-between">
        {/* Distant ceiling rafters */}
        <div className="w-full h-16 bg-slate-950/80 border-b-2 border-slate-800 flex justify-around items-center px-4">
          <div className="w-1/4 h-2 bg-slate-800 rounded" />
          <div className="w-1/4 h-2 bg-slate-800 rounded" />
          <div className="w-1/4 h-2 bg-slate-800 rounded" />
        </div>

        {/* Low angle massive desk underframe */}
        <div className="w-full h-2/3 bg-gradient-to-t from-slate-950 via-slate-900 to-slate-800 border-t-8 border-slate-700 relative shadow-2xl flex flex-col justify-end p-8">
          {/* Glowing under-desk neon */}
          <div 
            className="absolute top-0 inset-x-0 h-4 blur-md"
            style={{ backgroundColor: rgbStripColor }}
          />

          {/* Giant PC Tower with tempered glass RGB fans */}
          <div className="absolute bottom-6 right-16 w-36 h-60 bg-slate-950 border-4 border-slate-700 rounded-xl p-3 flex flex-col justify-between shadow-2xl">
            <div className="text-[9px] font-mono text-cyan-400 font-bold border-b border-slate-800 pb-1 flex justify-between">
              <span>TITAN_RIG</span>
              <span className="animate-pulse">● RT-ON</span>
            </div>
            {/* 3 RGB Fans */}
            <div className="space-y-2">
              {[0, 1, 2].map((fan) => (
                <div 
                  key={fan}
                  className="w-14 h-14 mx-auto rounded-full border-2 border-cyan-400 flex items-center justify-center shadow-lg animate-spin"
                  style={{ animationDuration: '4s' }}
                >
                  <div className="w-8 h-8 rounded-full border border-pink-400 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-white" />
                  </div>
                </div>
              ))}
            </div>
            <div className="text-[7px] text-slate-500 font-mono text-center">LIQUID COOLED</div>
          </div>

          {/* Giant screen bottom bevels looming above */}
          <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-4/5 h-24 bg-slate-900 border-4 border-slate-600 rounded-t-3xl shadow-[0_20px_50px_rgba(0,0,0,0.9)] flex items-center justify-center">
            <span className="text-xs font-mono text-cyan-300 font-black tracking-widest animate-pulse">&lt; HEROIC CODER VIEW /&gt;</span>
          </div>
        </div>
      </div>
    </div>
  );
};
