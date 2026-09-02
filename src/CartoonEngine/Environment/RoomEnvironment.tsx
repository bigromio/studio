import React from 'react';
import { RoomEnvironmentConfig } from '../types';
import { ScreenCodeDisplay, CoffeeCupSteamSVG, ProgrammerWindowSVG, ServerRackTowerSVG } from './elements';

interface RoomEnvironmentProps {
  config: RoomEnvironmentConfig;
  frame: number;
}

/**
 * Pure SVG Room Environment natively calibrated for 1080x1920 Vertical Canvas (9:16)
 * Supports 5 camera perspectives: front, right_45, left_45, top_down, low_angle
 */
export const RoomEnvironment: React.FC<RoomEnvironmentProps> = ({ config, frame }) => {
  const {
    angle,
    timeOfDay,
    showMonitorsCode,
    codeTheme,
    ambientSteam,
    rgbStripColor,
    windowRain,
    serverRackBlink,
    mugText,
    plantOnDesk
  } = config;

  const isNight = timeOfDay === 'midnight' || timeOfDay === 'cyberpunk_night';
  const isSunset = timeOfDay === 'sunset';

  const wallBg = isNight ? '#0b0f19' : isSunset ? '#1a0e24' : '#e2e8f0';
  const floorBg = isNight ? '#030712' : isSunset ? '#090514' : '#cbd5e1';

  // 1. FRONT VIEW (NATIVE 1080x1920 VERTICAL)
  if (angle === 'front') {
    return (
      <svg
        viewBox="0 0 1080 1920"
        width="100%"
        height="100%"
        style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="wall-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={wallBg} />
            <stop offset="100%" stopColor={isNight ? '#040711' : '#f1f5f9'} />
          </linearGradient>
          <filter id="neon-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="15" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* 1.1 ROOM BACKGROUND WALL */}
        <rect x="0" y="0" width="1080" height="1700" fill="url(#wall-grad)" />

        {/* 1.2 TOP RGB LIGHT BAR */}
        <rect x="0" y="0" width="1080" height="24" fill={rgbStripColor} filter="url(#neon-glow)" />

        {/* 1.3 UPPER THIRD (Y: 0 - 600): Posters, Shelf, Window & Server Rack */}
        {/* Acoustic Sound Dampening Hex Panels */}
        <g fill="#1e293b" opacity="0.35" stroke="#334155" strokeWidth="2">
          <polygon points="460,80 500,105 500,150 460,175 420,150 420,105" />
          <polygon points="550,80 590,105 590,150 550,175 510,150 510,105" />
          <polygon points="505,160 545,185 545,230 505,255 465,230 465,185" />
        </g>

        {/* Left Server Rack */}
        <g transform="translate(45, 160)">
          <ServerRackTowerSVG blinking={serverRackBlink} frame={frame} height={600} />
        </g>

        {/* Floating Wall Shelf with Retro Figurines & Dev Books */}
        <g transform="translate(260, 240)">
          {/* Shelf Plank */}
          <rect x="0" y="100" width="360" height="18" rx="4" fill="#78350f" stroke="#451a03" strokeWidth="3" />
          {/* Books */}
          <rect x="20" y="20" width="28" height="80" rx="3" fill="#059669" />
          <rect x="52" y="10" width="34" height="90" rx="3" fill="#4f46e5" />
          <rect x="90" y="30" width="26" height="70" rx="3" fill="#ea580c" />
          <rect x="120" y="15" width="32" height="85" rx="3" fill="#0284c7" />
          {/* Arcade Mini Figurine */}
          <g transform="translate(240, 30)">
            <rect x="0" y="0" width="55" height="70" rx="10" fill="#ec4899" stroke="#0f172a" strokeWidth="4" />
            <circle cx="20" cy="25" r="5" fill="#ffffff" />
            <circle cx="35" cy="25" r="5" fill="#ffffff" />
            <rect x="15" y="45" width="25" height="8" rx="2" fill="#0f172a" />
          </g>
        </g>

        {/* Tech / AI Poster */}
        <g transform="translate(260, 410)">
          <rect x="0" y="0" width="280" height="180" rx="10" fill="#0f172a" stroke="#334155" strokeWidth="4" />
          <rect x="12" y="12" width="256" height="156" rx="6" fill="#1e1b4b" />
          <text x="140" y="55" fill="#38bdf8" fontSize="18" fontFamily="monospace" fontWeight="900" textAnchor="middle" letterSpacing="3">
            REMOTION // STUDIO
          </text>
          <circle cx="140" cy="105" r="30" fill="none" stroke="#ec4899" strokeWidth="4" />
          <polygon points="132,92 154,105 132,118" fill="#facc15" />
        </g>

        {/* High Window with City Skyline */}
        <g transform="translate(680, 140)">
          <ProgrammerWindowSVG timeOfDay={timeOfDay} rain={windowRain} frame={frame} width={340} height={450} />
        </g>

        {/* 1.4 LOWER THIRD (Y: 1350 - 1920): Monitors, Desk, Mechanical Keyboard & Floor */}
        {/* Ultrawide Dual Screens */}
        {/* Main Center Ultrawide Screen */}
        <g transform="translate(180, 1220)">
          {/* Stand */}
          <rect x="330" y="320" width="60" height="60" fill="#334155" stroke="#0f172a" strokeWidth="4" />
          <rect x="250" y="360" width="220" height="20" rx="6" fill="#1e293b" stroke="#0f172a" strokeWidth="3" />
          {/* Screen Outer Bevel */}
          <rect x="0" y="0" width="720" height="330" rx="14" fill="#020617" stroke="#475569" strokeWidth="8" />
          {/* Screen Code Content */}
          <g transform="translate(14, 14)">
            {showMonitorsCode && <ScreenCodeDisplay theme={codeTheme} frame={frame} width={692} height={302} />}
          </g>
        </g>

        {/* Secondary Vertical Monitor on Right */}
        <g transform="translate(915, 1140)">
          <rect x="0" y="0" width="135" height="420" rx="10" fill="#020617" stroke="#334155" strokeWidth="6" />
          <g transform="translate(8, 8)">
            {showMonitorsCode && <ScreenCodeDisplay theme="matrix" frame={frame + 30} width={119} height={404} />}
          </g>
        </g>

        {/* Heavy Developer Desk */}
        <g id="desk-group" transform="translate(0, 1540)">
          {/* Desk Top Bevel */}
          <rect x="0" y="0" width="1080" height="160" fill="#1e293b" stroke="#0f172a" strokeWidth="6" />
          <rect x="0" y="0" width="1080" height="30" fill="#334155" />
          {/* Glowing under-desk LED Strip */}
          <rect x="0" y="160" width="1080" height="15" fill={rgbStripColor} filter="url(#neon-glow)" />

          {/* Plant on Left */}
          {plantOnDesk && (
            <g transform="translate(90, -45)">
              <rect x="15" y="45" width="50" height="50" rx="8" fill="#b45309" stroke="#78350f" strokeWidth="3" />
              {/* Succulent leaves */}
              <ellipse cx="40" cy="35" rx="15" ry="30" fill="#10b981" stroke="#047857" strokeWidth="2" />
              <ellipse cx="25" cy="40" rx="12" ry="25" fill="#34d399" stroke="#047857" strokeWidth="2" transform="rotate(-30 25 40)" />
              <ellipse cx="55" cy="40" rx="12" ry="25" fill="#34d399" stroke="#047857" strokeWidth="2" transform="rotate(30 55 40)" />
            </g>
          )}

          {/* Steaming Coffee Mug */}
          <g transform="translate(230, -30)">
            <CoffeeCupSteamSVG showSteam={ambientSteam} frame={frame} text={mugText} />
          </g>

          {/* Mechanical Keyboard & Desk Mat */}
          <g transform="translate(360, 20)">
            {/* Cyber Desk Mat */}
            <rect x="-40" y="-10" width="460" height="110" rx="10" fill="#090d16" stroke={rgbStripColor} strokeWidth="2" />
            {/* Mechanical Keyboard Body */}
            <rect x="0" y="0" width="320" height="85" rx="8" fill="#0f172a" stroke="#334155" strokeWidth="3" />
            {/* Keycaps Grid */}
            <g fill="#1e293b" stroke="#334155" strokeWidth="1.5">
              {[...Array(10)].map((_, i) => (
                <rect key={`k1-${i}`} x={12 + i * 30} y="10" width="24" height="14" rx="2" />
              ))}
              {[...Array(10)].map((_, i) => (
                <rect key={`k2-${i}`} x={12 + i * 30} y="28" width="24" height="14" rx="2" />
              ))}
              {[...Array(9)].map((_, i) => (
                <rect key={`k3-${i}`} x={12 + i * 33} y="46" width="27" height="14" rx="2" />
              ))}
              {/* Spacebar */}
              <rect x="75" y="64" width="160" height="14" rx="3" fill="#334155" stroke={rgbStripColor} strokeWidth="1.5" />
            </g>
            {/* High-DPI Mouse */}
            <rect x="345" y="15" width="40" height="60" rx="18" fill="#1e293b" stroke="#475569" strokeWidth="2.5" />
            <circle cx="365" cy="30" r="4" fill="#06b6d4" />
          </g>

          {/* Desk Underframe & Legs */}
          <rect x="80" y="175" width="40" height="205" fill="#334155" stroke="#0f172a" strokeWidth="4" />
          <rect x="960" y="175" width="40" height="205" fill="#334155" stroke="#0f172a" strokeWidth="4" />
        </g>

        {/* 1.5 FLOOR LAYER */}
        <rect x="0" y="1715" width="1080" height="205" fill={floorBg} />
        <line x1="0" y1="1715" x2="1080" y2="1715" stroke="#020617" strokeWidth="6" />
        {/* Cable Route on Floor */}
        <path d="M 280 1850 Q 540 1890 800 1840" fill="none" stroke="#0f172a" strokeWidth="8" strokeLinecap="round" opacity="0.6" />
      </svg>
    );
  }

  // 2. RIGHT 45 ANGLE PERSPECTIVE
  if (angle === 'right_45') {
    return (
      <svg
        viewBox="0 0 1080 1920"
        width="100%"
        height="100%"
        style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="neon-glow-r" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="15" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        <rect x="0" y="0" width="1080" height="1700" fill={wallBg} />
        <rect x="0" y="0" width="1080" height="24" fill={rgbStripColor} filter="url(#neon-glow-r)" />

        {/* Left Side Wall Code Hologram */}
        <g transform="translate(60, 180) skewY(6)">
          <rect x="0" y="0" width="400" height="460" rx="12" fill="#0f172a" stroke="#38bdf8" strokeWidth="4" opacity="0.9" />
          <text x="200" y="50" fill="#38bdf8" fontSize="22" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
            &gt; CODE_FLOW: 45°
          </text>
          <line x1="20" y1="70" x2="380" y2="70" stroke="#334155" strokeWidth="2" />
        </g>

        {/* Angled Window on Back Right */}
        <g transform="translate(620, 140) skewY(-4)">
          <ProgrammerWindowSVG timeOfDay={timeOfDay} rain={windowRain} frame={frame} width={380} height={480} />
        </g>

        {/* Angled 3D Desk Surface */}
        <g transform="translate(200, 1400) skewX(-10)">
          <rect x="0" y="0" width="880" height="320" rx="20" fill="#1e293b" stroke="#0f172a" strokeWidth="6" />
          {/* Angled Monitor */}
          <g transform="translate(100, -80) skewY(3)">
            <rect x="0" y="0" width="560" height="260" rx="10" fill="#020617" stroke="#475569" strokeWidth="6" />
            <g transform="translate(10, 10)">
              {showMonitorsCode && <ScreenCodeDisplay theme={codeTheme} frame={frame} width={540} height={240} />}
            </g>
          </g>
          {/* Coffee on desk */}
          <g transform="translate(700, 40)">
            <CoffeeCupSteamSVG showSteam={ambientSteam} frame={frame} text={mugText} />
          </g>
        </g>

        {/* Floor */}
        <rect x="0" y="1720" width="1080" height="200" fill={floorBg} />
      </svg>
    );
  }

  // 3. LEFT 45 ANGLE PERSPECTIVE
  if (angle === 'left_45') {
    return (
      <svg
        viewBox="0 0 1080 1920"
        width="100%"
        height="100%"
        style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="neon-glow-l" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="15" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        <rect x="0" y="0" width="1080" height="1700" fill={wallBg} />
        <rect x="0" y="0" width="1080" height="24" fill={rgbStripColor} filter="url(#neon-glow-l)" />

        {/* Towering Server Rack on Left */}
        <g transform="translate(50, 160)">
          <ServerRackTowerSVG blinking={serverRackBlink} frame={frame} height={650} />
        </g>

        {/* Window on Left-Center Wall */}
        <g transform="translate(250, 150) skewY(4)">
          <ProgrammerWindowSVG timeOfDay={timeOfDay} rain={windowRain} frame={frame} width={360} height={460} />
        </g>

        {/* Right Wall Tech Poster */}
        <g transform="translate(680, 200) skewY(-5)">
          <rect x="0" y="0" width="340" height="420" rx="14" fill="#0f172a" stroke="#ec4899" strokeWidth="4" />
          <text x="170" y="60" fill="#f472b6" fontSize="22" fontFamily="monospace" fontWeight="900" textAnchor="middle">
            FULL_STACK
          </text>
        </g>

        {/* Desk extending left to right */}
        <g transform="translate(0, 1400) skewX(10)">
          <rect x="0" y="0" width="880" height="320" rx="20" fill="#1e293b" stroke="#0f172a" strokeWidth="6" />
          <g transform="translate(200, -80) skewY(-3)">
            <rect x="0" y="0" width="560" height="260" rx="10" fill="#020617" stroke="#475569" strokeWidth="6" />
            <g transform="translate(10, 10)">
              {showMonitorsCode && <ScreenCodeDisplay theme={codeTheme} frame={frame} width={540} height={240} />}
            </g>
          </g>
          <g transform="translate(80, 40)">
            <CoffeeCupSteamSVG showSteam={ambientSteam} frame={frame} text={mugText} />
          </g>
        </g>

        <rect x="0" y="1720" width="1080" height="200" fill={floorBg} />
      </svg>
    );
  }

  // 4. TOP-DOWN BIRD'S EYE VIEW
  if (angle === 'top_down') {
    return (
      <svg
        viewBox="0 0 1080 1920"
        width="100%"
        height="100%"
        style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="0" y="0" width="1080" height="1920" fill="#090d16" />
        {/* Top Wall Bevel */}
        <rect x="0" y="0" width="1080" height="40" fill={rgbStripColor} />

        {/* Giant Developer Desk from Above */}
        <g transform="translate(60, 100)">
          <rect x="0" y="0" width="960" height="1500" rx="24" fill="#1e293b" stroke="#334155" strokeWidth="8" />

          {/* Monitors Top Profile Bar */}
          <rect x="80" y="60" width="580" height="45" rx="8" fill="#020617" stroke="#06b6d4" strokeWidth="3" />
          <text x="370" y="88" fill="#38bdf8" fontSize="16" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
            [PRIMARY SCREEN TOP VIEW]
          </text>
          <rect x="700" y="60" width="200" height="45" rx="8" fill="#020617" stroke="#ec4899" strokeWidth="3" />

          {/* Extra Large Desk Mat */}
          <rect x="100" y="240" width="760" height="520" rx="20" fill="#090d16" stroke={rgbStripColor} strokeWidth="4" />

          {/* Mechanical Keyboard Grid from Above */}
          <g transform="translate(180, 320)">
            <rect x="0" y="0" width="440" height="200" rx="12" fill="#0f172a" stroke="#475569" strokeWidth="4" />
            {[...Array(6)].map((_, row) => (
              <g key={row} transform={`translate(15, ${20 + row * 28})`}>
                {[...Array(12)].map((_, col) => (
                  <rect key={col} x={col * 34} y="0" width="28" height="20" rx="4" fill="#1e293b" stroke="#334155" strokeWidth="1.5" />
                ))}
              </g>
            ))}
          </g>

          {/* Mouse & Mousepad */}
          <rect x="680" y="340" width="120" height="180" rx="14" fill="#0f172a" stroke="#334155" strokeWidth="3" />
          <rect x="710" y="380" width="60" height="100" rx="25" fill="#1e293b" stroke="#06b6d4" strokeWidth="3" />

          {/* Coffee Mug Top View */}
          <circle cx="160" cy="900" r="45" fill="#92400e" stroke="#451a03" strokeWidth="6" />
          <circle cx="160" cy="900" r="32" fill="#451a03" />

          {/* Sticky Notes */}
          <rect x="660" y="860" width="180" height="180" rx="6" fill="#fef08a" stroke="#ca8a04" strokeWidth="2" />
          <text x="680" y="900" fill="#854d0e" fontSize="16" fontFamily="monospace" fontWeight="bold">
            📌 REMOTION 9:16
          </text>
          <text x="680" y="930" fill="#713f12" fontSize="14" fontFamily="monospace">
            - Zero Tailwind
          </text>
          <text x="680" y="955" fill="#713f12" fontSize="14" fontFamily="monospace">
            - Pure SVG Engine
          </text>
        </g>

        {/* Chair Headrest Silhouette */}
        <g transform="translate(340, 1660)">
          <rect x="0" y="0" width="400" height="140" rx="30" fill="#020617" stroke="#334155" strokeWidth="6" />
          <text x="200" y="75" fill="#64748b" fontSize="16" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
            ERGO GAMING SEAT
          </text>
        </g>
      </svg>
    );
  }

  // 5. LOW ANGLE HEROIC VIEW
  return (
    <svg
      viewBox="0 0 1080 1920"
      width="100%"
      height="100%"
      style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="neon-glow-low" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="20" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      <rect x="0" y="0" width="1080" height="1920" fill="#090d16" />

      {/* Ceiling Rafters */}
      <rect x="80" y="60" width="920" height="30" fill="#1e293b" />
      <rect x="80" y="130" width="920" height="30" fill="#1e293b" />

      {/* Heroic Massive Desk Underframe */}
      <g transform="translate(0, 750)">
        {/* Desk Top Profile Looming */}
        <rect x="0" y="0" width="1080" height="240" fill="#1e293b" stroke="#0f172a" strokeWidth="8" />
        {/* Huge glowing neon strip */}
        <rect x="0" y="240" width="1080" height="30" fill={rgbStripColor} filter="url(#neon-glow-low)" />

        {/* Giant Liquid Cooled PC Tower */}
        <g transform="translate(700, 320)">
          <rect x="0" y="0" width="300" height="650" rx="20" fill="#020617" stroke="#334155" strokeWidth="8" />
          <text x="150" y="50" fill="#38bdf8" fontSize="18" fontFamily="monospace" fontWeight="900" textAnchor="middle">
            TITAN_RIG // 4.8GHz
          </text>
          {/* 3 Spinning RGB Fans */}
          {[0, 1, 2].map((f) => (
            <g key={f} transform={`translate(75, ${90 + f * 170})`}>
              <circle cx="75" cy="75" r="65" fill="#0f172a" stroke="#06b6d4" strokeWidth="5" />
              <g transform={`rotate(${(frame * 12 + f * 60) % 360} 75 75)`}>
                <line x1="15" y1="75" x2="135" y2="75" stroke="#ec4899" strokeWidth="12" strokeLinecap="round" />
                <line x1="75" y1="15" x2="75" y2="135" stroke="#ec4899" strokeWidth="12" strokeLinecap="round" />
              </g>
              <circle cx="75" cy="75" r="22" fill="#ffffff" />
            </g>
          ))}
        </g>

        {/* Heavy Desk Legs */}
        <rect x="100" y="270" width="70" height="750" fill="#334155" stroke="#0f172a" strokeWidth="6" />
      </g>
    </svg>
  );
};
