import React from 'react';
import { RoomEnvironmentConfig, TimeOfDay } from '../types';

/**
 * Pure SVG Screen Code Display
 * Renders syntax-highlighted scrolling code natively inside SVG
 */
export const ScreenCodeDisplay: React.FC<{
  theme: RoomEnvironmentConfig['codeTheme'];
  frame: number;
  width?: number;
  height?: number;
}> = ({ theme, frame, width = 600, height = 300 }) => {
  const codeLinesMatrix = [
    '01011001 01100001 01111001',
    'const brain = new NeuralCore();',
    'while(alive) { innovate(); }',
    'import { future } from "ai";',
    'system.matrix.override(0x7F);',
    'renderScene({ canvas: "1080x1920" });',
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

  const bgFill = theme === 'matrix' ? '#020617' : theme === 'synthwave' ? '#1e1035' : '#0f172a';
  const textColor = theme === 'matrix' ? '#34d399' : theme === 'synthwave' ? '#f472b6' : '#38bdf8';
  const activeColor = theme === 'matrix' ? '#10b981' : theme === 'synthwave' ? '#ec4899' : '#60a5fa';

  return (
    <g id="screen-code-display">
      {/* Terminal background */}
      <rect x="0" y="0" width={width} height={height} rx="8" fill={bgFill} stroke="#334155" strokeWidth="3" />

      {/* Terminal Title Bar */}
      <rect x="0" y="0" width={width} height="36" rx="8" fill="#020617" />
      <circle cx="20" cy="18" r="5" fill="#ef4444" />
      <circle cx="36" cy="18" r="5" fill="#eab308" />
      <circle cx="52" cy="18" r="5" fill="#22c55e" />
      <text x={width / 2} y="22" fill="#94a3b8" fontSize="13" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
        terminal.sh — 1080x1920
      </text>

      {/* Code Lines */}
      <g transform="translate(24, 65)">
        {lines.map((line, idx) => {
          const isActive = idx === activeLine;
          return (
            <g key={idx} transform={`translate(0, ${idx * 30})`}>
              <text x="0" y="0" fill="#475569" fontSize="14" fontFamily="monospace">
                {String(idx + 1).padStart(2, '0')}
              </text>
              <text
                x="35"
                y="0"
                fill={isActive ? activeColor : textColor}
                fontSize={isActive ? '15' : '14'}
                fontFamily="monospace"
                fontWeight={isActive ? 'bold' : 'normal'}
                opacity={isActive ? 1 : 0.75}
              >
                {line}
              </text>
              {isActive && (
                <rect x={35 + line.length * 8.8} y="-12" width="8" height="15" fill={activeColor} opacity={(frame % 15 > 7) ? 1 : 0} />
              )}
            </g>
          );
        })}
      </g>
    </g>
  );
};

/**
 * Pure SVG Coffee Cup with animated steam
 */
export const CoffeeCupSteamSVG: React.FC<{
  showSteam: boolean;
  frame: number;
  text: string;
}> = ({ showSteam, frame, text }) => {
  const wave1 = Math.sin(frame * 0.1) * 4;
  const wave2 = Math.cos(frame * 0.08) * 4;

  return (
    <g id="coffee-cup-group">
      {/* Animated Steam */}
      {showSteam && (
        <g id="steam" opacity="0.75">
          <path
            d={`M 20 -10 Q ${20 + wave1} -30, ${28 - wave2} -50 T 32 -70`}
            fill="none"
            stroke="rgba(255,255,255,0.7)"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <path
            d={`M 35 -10 Q ${35 - wave2} -35, ${25 + wave1} -55 T 30 -75`}
            fill="none"
            stroke="rgba(186,230,253,0.6)"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </g>
      )}

      {/* Mug Body */}
      <rect x="0" y="0" width="55" height="60" rx="10" fill="#92400e" stroke="#451a03" strokeWidth="4" />
      {/* Mug Handle */}
      <path d="M 55 12 Q 78 12 78 30 Q 78 48 55 48" fill="none" stroke="#451a03" strokeWidth="7" strokeLinecap="round" />
      <path d="M 55 12 Q 74 12 74 30 Q 74 48 55 48" fill="none" stroke="#92400e" strokeWidth="4" strokeLinecap="round" />

      {/* Custom Text on Mug */}
      <text x="27" y="36" fill="#fef3c7" fontSize="13" fontFamily="sans-serif" fontWeight="900" textAnchor="middle">
        {text || 'CODE'}
      </text>
    </g>
  );
};

/**
 * Pure SVG High Window with City Skyline & Rain
 */
export const ProgrammerWindowSVG: React.FC<{
  timeOfDay: TimeOfDay;
  rain: boolean;
  frame: number;
  width?: number;
  height?: number;
}> = ({ timeOfDay, rain, frame, width = 340, height = 400 }) => {
  const isNight = timeOfDay === 'midnight' || timeOfDay === 'cyberpunk_night';
  const isSunset = timeOfDay === 'sunset';

  const skyFill = isNight ? '#090d16' : isSunset ? '#4a1d4a' : '#38bdf8';

  return (
    <g id="programmer-window">
      {/* Window Frame Outer Bevel */}
      <rect x="0" y="0" width={width} height={height} rx="16" fill={skyFill} stroke="#334155" strokeWidth="8" />

      {/* Sun or Glowing Moon */}
      {isNight ? (
        <circle cx={width - 60} cy="70" r="30" fill="#f1f5f9" opacity="0.9" />
      ) : isSunset ? (
        <circle cx={width - 70} cy="90" r="40" fill="#f97316" opacity="0.9" />
      ) : (
        <circle cx={width - 60} cy="70" r="35" fill="#fef08a" opacity="0.95" />
      )}

      {/* City High-rise Skylines */}
      <g fill="#020617" opacity={isNight ? 0.95 : 0.7}>
        <rect x="20" y={height - 220} width="60" height="220" rx="4" />
        <rect x="90" y={height - 280} width="75" height="280" rx="4" />
        <rect x="175" y={height - 180} width="55" height="180" rx="4" />
        <rect x="240" y={height - 310} width="80" height="310" rx="4" />
      </g>

      {/* Building Windows Glowing */}
      <g fill="#fde047" opacity="0.6">
        <circle cx="110" cy={height - 240} r="2" />
        <circle cx="130" cy={height - 240} r="2" />
        <circle cx="110" cy={height - 200} r="2" />
        <circle cx="140" cy={height - 200} r="2" />
        <circle cx="260" cy={height - 260} r="2" />
        <circle cx="290" cy={height - 260} r="2" />
        <circle cx="270" cy={height - 220} r="2" />
      </g>

      {/* Rain Effect */}
      {rain && (
        <g stroke="#93c5fd" strokeWidth="2" opacity="0.4" strokeLinecap="round">
          {[...Array(12)].map((_, i) => {
            const rx = ((i * 35 + frame * 9) % width);
            const ry = ((i * 45 + frame * 14) % height);
            return <line key={i} x1={rx} y1={ry} x2={rx - 8} y2={ry + 22} />;
          })}
        </g>
      )}

      {/* Window Grill Grid */}
      <line x1="0" y1={height / 2} x2={width} y2={height / 2} stroke="#334155" strokeWidth="6" />
      <line x1={width / 2} y1="0" x2={width / 2} y2={height} stroke="#334155" strokeWidth="6" />
    </g>
  );
};

/**
 * Pure SVG Server Rack Tower
 */
export const ServerRackTowerSVG: React.FC<{
  blinking: boolean;
  frame: number;
  height?: number;
}> = ({ blinking, frame, height = 550 }) => {
  return (
    <g id="server-rack-tower">
      {/* Tower Cabinet */}
      <rect x="0" y="0" width="160" height={height} rx="8" fill="#090d16" stroke="#1e293b" strokeWidth="6" />
      <rect x="15" y="15" width="130" height="24" rx="4" fill="#020617" />
      <text x="80" y="32" fill="#64748b" fontSize="11" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
        DEV-RACK-01
      </text>

      {/* Rack Units */}
      {[0, 1, 2, 3, 4, 5].map((u) => {
        const yPos = 55 + u * 75;
        const ledOn1 = blinking ? (frame + u * 4) % 4 === 0 : true;
        const ledOn2 = blinking ? (frame + u * 6) % 6 === 0 : false;
        return (
          <g key={u} transform={`translate(15, ${yPos})`}>
            <rect x="0" y="0" width="130" height="65" rx="4" fill="#0f172a" stroke="#334155" strokeWidth="2.5" />
            <circle cx="18" cy="32" r="6" fill={ledOn1 ? '#10b981' : '#064e3b'} />
            <circle cx="36" cy="32" r="6" fill={ledOn2 ? '#06b6d4' : '#083344'} />
            <circle cx="54" cy="32" r="6" fill="#ef4444" opacity="0.8" />
            {/* Ventilation slots */}
            <line x1="72" y1="25" x2="118" y2="25" stroke="#1e293b" strokeWidth="3" />
            <line x1="72" y1="35" x2="118" y2="35" stroke="#1e293b" strokeWidth="3" />
            <line x1="72" y1="45" x2="118" y2="45" stroke="#1e293b" strokeWidth="3" />
          </g>
        );
      })}
    </g>
  );
};
