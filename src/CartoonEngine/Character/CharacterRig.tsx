import React from 'react';
import { CharacterAppearance, CharacterDirection, FacialExpression, VisemeType, WardrobeConfig, ActionState } from '../types';
import { HairStyles } from './HairStyles';
import { EyesAndEyebrows } from './EyesAndEyebrows';
import { MouthVisemes } from './MouthVisemes';
import { WardrobeEngine } from '../Wardrobe/WardrobeEngine';

interface CharacterRigProps {
  direction: CharacterDirection;
  appearance: CharacterAppearance;
  wardrobe: WardrobeConfig;
  expression: FacialExpression;
  viseme: VisemeType;
  pose: ActionState;
  frame: number;
}

const SKIN_TONE_COLORS: Record<string, string> = {
  fair_light: '#ffdfc4',
  warm_sand: '#f0c7a2',
  olive_tan: '#d6a374',
  caramel_brown: '#a86f44',
  deep_rich: '#683f23',
  cyber_alien_blue: '#7dd3fc'
};

/**
 * Unified SVG Character Rig
 * Fixed 600x800 coordinate system ensuring zero limb disconnects or canvas distortion.
 */
export const CharacterRig: React.FC<CharacterRigProps> = ({
  direction,
  appearance,
  wardrobe,
  expression,
  viseme,
  pose,
  frame
}) => {
  const skinColor = appearance.skinColorHex || SKIN_TONE_COLORS[appearance.skinTone] || '#f0c7a2';
  const {
    hairStyle,
    hairColorHex,
    eyeColorHex,
    glasses,
    glassesColorHex,
    headset,
    headsetColorHex,
    hat,
    hatColorHex,
    facialHair
  } = appearance;

  const isFlipped = direction === 'three_quarter_right' || direction === 'side_right';
  const isBack = direction === 'back';

  const { armLeftRotation, armRightRotation, headTilt, bodyLean, chestElevation, walkOffsetX, isSitting } = pose;

  return (
    <div
      style={{
        width: '600px',
        height: '800px',
        position: 'relative',
        transformOrigin: '50% 90%',
        transform: `translateX(${walkOffsetX}px) translateY(${-chestElevation}px) rotate(${bodyLean}deg) ${isFlipped ? 'scaleX(-1)' : ''}`,
        filter: 'drop-shadow(0 20px 30px rgba(0, 0, 0, 0.45))',
        pointerEvents: 'none',
        userSelect: 'none'
      }}
    >
      <svg
        viewBox="0 0 600 800"
        width="100%"
        height="100%"
        style={{ overflow: 'visible' }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="rgb-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* 1. SEAT / CHAIR BACKREST (If Sitting) */}
        {isSitting && (
          <g id="chair-backrest">
            <path
              d="M 190 320 C 190 200 230 180 300 180 C 370 180 410 200 410 320 L 420 560 L 180 560 Z"
              fill="#0f172a"
              stroke="#334155"
              strokeWidth="6"
            />
            {/* Ergonomic lumbar bolster */}
            <rect x="210" y="460" width="180" height="70" rx="16" fill="#1e293b" stroke="#475569" strokeWidth="3" />
            {/* Cyber seat piping */}
            <path d="M 210 240 C 250 220 350 220 390 240" fill="none" stroke="#06b6d4" strokeWidth="3" opacity="0.7" />
          </g>
        )}

        {/* 2. LOWER BODY (Legs / Base) */}
        <g id="lower-body">
          {isSitting ? (
            <g id="legs-sitting">
              {/* Thighs */}
              <rect x="205" y="520" width="85" height="120" rx="20" fill="#0f172a" stroke="#020617" strokeWidth="5" />
              <rect x="310" y="520" width="85" height="120" rx="20" fill="#0f172a" stroke="#020617" strokeWidth="5" />
              {/* Sneakers */}
              <g transform="translate(195, 620)">
                <path d="M 0 20 Q 50 10 90 20 L 85 45 L -5 45 Z" fill="#ffffff" stroke="#0f172a" strokeWidth="4" />
                <rect x="15" y="25" width="55" height="8" rx="2" fill="#ef4444" />
              </g>
              <g transform="translate(315, 620)">
                <path d="M 0 20 Q 50 10 90 20 L 85 45 L -5 45 Z" fill="#ffffff" stroke="#0f172a" strokeWidth="4" />
                <rect x="15" y="25" width="55" height="8" rx="2" fill="#ef4444" />
              </g>
            </g>
          ) : (
            <g id="legs-standing">
              <rect x="225" y="520" width="60" height="200" rx="14" fill="#0f172a" stroke="#020617" strokeWidth="5" />
              <rect x="315" y="520" width="60" height="200" rx="14" fill="#0f172a" stroke="#020617" strokeWidth="5" />
              {/* Shoes */}
              <path d="M 215 710 Q 255 700 290 710 L 285 735 L 210 735 Z" fill="#ffffff" stroke="#0f172a" strokeWidth="4" />
              <path d="M 305 710 Q 345 700 380 710 L 375 735 L 300 735 Z" fill="#ffffff" stroke="#0f172a" strokeWidth="4" />
            </g>
          )}
        </g>

        {/* 3. LEFT ARM (Rotates around left shoulder joint at (215, 345)) */}
        <g id="left-arm" transform={`rotate(${armLeftRotation} 215 345)`}>
          {/* Upper Arm / Sleeve */}
          <path
            d="M 200 340 C 190 340 185 420 195 440 L 235 440 C 240 420 235 340 225 340 Z"
            fill={wardrobe.primaryColor}
            stroke="#0f172a"
            strokeWidth="5"
          />
          {/* Forearm & Wrist */}
          <rect x="195" y="435" width="40" height="90" rx="18" fill={skinColor} stroke="#0f172a" strokeWidth="4.5" />
          {/* Hand Palm / Fist */}
          <circle cx="215" cy="535" r="22" fill={skinColor} stroke="#0f172a" strokeWidth="4.5" />
          {/* Fingers detail */}
          <path d="M 205 525 Q 215 540 225 525" fill="none" stroke="#0f172a" strokeWidth="2.5" />

          {/* Smart Watch */}
          {wardrobe.watch === 'smart_watch' && (
            <g transform="translate(195, 485)">
              <rect x="0" y="0" width="40" height="16" rx="4" fill="#0f172a" stroke="#06b6d4" strokeWidth="2" />
              <rect x="10" y="3" width="20" height="10" rx="2" fill="#22d3ee" filter="url(#rgb-glow)" />
            </g>
          )}
        </g>

        {/* 4. CENTRAL TORSO & WARDROBE */}
        <g id="torso-group">
          {/* Neck base */}
          <rect x="270" y="275" width="60" height="55" rx="10" fill={skinColor} stroke="#0f172a" strokeWidth="4" />
          <WardrobeEngine config={wardrobe} skinColor={skinColor} />
        </g>

        {/* 5. RIGHT ARM (Rotates around right shoulder joint at (385, 345)) */}
        <g id="right-arm" transform={`rotate(${armRightRotation} 385 345)`}>
          {/* Upper Arm / Sleeve */}
          <path
            d="M 370 340 C 360 340 360 420 365 440 L 405 440 C 415 420 410 340 400 340 Z"
            fill={wardrobe.primaryColor}
            stroke="#0f172a"
            strokeWidth="5"
          />
          {/* Forearm & Wrist */}
          <rect x="365" y="435" width="40" height="90" rx="18" fill={skinColor} stroke="#0f172a" strokeWidth="4.5" />
          {/* Hand Palm */}
          <circle cx="385" cy="535" r="22" fill={skinColor} stroke="#0f172a" strokeWidth="4.5" />
          {/* Fingers detail */}
          <path d="M 375 525 Q 385 540 395 525" fill="none" stroke="#0f172a" strokeWidth="2.5" />
        </g>

        {/* 6. HEAD & FACE SKELETON (Rotates around neck pivot at (300, 310)) */}
        <g id="head-skeleton" transform={`rotate(${headTilt} 300 310)`}>
          {/* Back Hair (if applicable) */}
          <HairStyles style={hairStyle} colorHex={hairColorHex} />

          {/* Ears */}
          <g id="ears">
            <ellipse cx="205" cy="225" rx="14" ry="20" fill={skinColor} stroke="#0f172a" strokeWidth="4.5" />
            <path d="M 205 218 Q 212 225 205 232" fill="none" stroke="#0f172a" strokeWidth="2.5" />
            <ellipse cx="395" cy="225" rx="14" ry="20" fill={skinColor} stroke="#0f172a" strokeWidth="4.5" />
            <path d="M 395 218 Q 388 225 395 232" fill="none" stroke="#0f172a" strokeWidth="2.5" />
          </g>

          {/* Head Base Skin Canvas */}
          <rect
            x="215"
            y="130"
            width="170"
            height="180"
            rx="60"
            fill={skinColor}
            stroke="#0f172a"
            strokeWidth="6"
          />

          {/* Airbuds Headset */}
          {headset === 'airbuds' && (
            <ellipse cx="398" cy="230" rx="5" ry="9" fill="#ffffff" stroke="#94a3b8" strokeWidth="1.5" />
          )}

          {!isBack ? (
            <>
              {/* Facial Hair / Stubble / Beard */}
              {facialHair === 'designer_stubble' && (
                <path
                  d="M 235 255 C 235 300 270 310 300 310 C 330 310 365 300 365 255 C 345 285 255 285 235 255 Z"
                  fill="#0f172a"
                  opacity="0.15"
                />
              )}
              {facialHair === 'full_beard' && (
                <path
                  d="M 220 240 C 220 325 255 335 300 335 C 345 335 380 325 380 240 C 365 290 235 290 220 240 Z"
                  fill={hairColorHex}
                  stroke="#0f172a"
                  strokeWidth="4.5"
                />
              )}

              {/* Eyes & Eyebrows */}
              <EyesAndEyebrows expression={expression} eyeColorHex={eyeColorHex} frame={frame} />

              {/* Cute Cartoon Nose */}
              <g id="nose">
                <path d="M 296 238 Q 300 248 306 245" fill="none" stroke="#0f172a" strokeWidth="3.5" strokeLinecap="round" />
              </g>

              {/* Dynamic Viseme Mouth */}
              <MouthVisemes viseme={viseme} skinColor={skinColor} frame={frame} />

              {/* Glasses & AR Visors */}
              {glasses === 'thick_square_nerd' && (
                <g id="glasses-nerd" transform="translate(0, 0)">
                  <rect x="238" y="195" width="54" height="42" rx="8" fill="rgba(224, 242, 254, 0.25)" stroke={glassesColorHex} strokeWidth="5.5" />
                  <rect x="308" y="195" width="54" height="42" rx="8" fill="rgba(224, 242, 254, 0.25)" stroke={glassesColorHex} strokeWidth="5.5" />
                  <line x1="292" y1="212" x2="308" y2="212" stroke={glassesColorHex} strokeWidth="5" />
                </g>
              )}

              {glasses === 'retro_round' && (
                <g id="glasses-round">
                  <circle cx="265" cy="215" r="24" fill="rgba(254, 243, 199, 0.2)" stroke={glassesColorHex} strokeWidth="4.5" />
                  <circle cx="335" cy="215" r="24" fill="rgba(254, 243, 199, 0.2)" stroke={glassesColorHex} strokeWidth="4.5" />
                  <line x1="289" y1="215" x2="311" y2="215" stroke={glassesColorHex} strokeWidth="4.5" />
                </g>
              )}

              {glasses === 'cyber_ar_visor' && (
                <g id="glasses-cyber-visor">
                  <rect x="225" y="195" width="150" height="38" rx="8" fill="rgba(6, 182, 212, 0.35)" stroke="#22d3ee" strokeWidth="3.5" filter="url(#rgb-glow)" />
                  <line x1="230" y1="214" x2="370" y2="214" stroke="#67e8f9" strokeWidth="1.5" strokeDasharray="6,4" />
                  <text x="300" y="218" fill="#e0f2fe" fontSize="10" fontFamily="monospace" fontWeight="900" textAnchor="middle" letterSpacing="3">AR // 100%</text>
                </g>
              )}

              {glasses === 'shades_aviator' && (
                <g id="glasses-aviator">
                  <path d="M 240 198 Q 265 195 290 198 L 285 235 Q 265 242 245 235 Z" fill="#0f172a" stroke="#334155" strokeWidth="3.5" />
                  <path d="M 310 198 Q 335 195 360 198 L 355 235 Q 335 242 315 235 Z" fill="#0f172a" stroke="#334155" strokeWidth="3.5" />
                  <line x1="290" y1="205" x2="310" y2="205" stroke="#334155" strokeWidth="4" />
                </g>
              )}
            </>
          ) : (
            <ellipse cx="300" cy="220" rx="60" ry="50" fill="#0f172a" opacity="0.15" />
          )}

          {/* Over-Ear RGB Headset */}
          {headset === 'over_ear_rgb' && (
            <g id="headset-over-ear">
              {/* Headband arch */}
              <path
                d="M 195 220 C 195 110 405 110 405 220"
                fill="none"
                stroke={headsetColorHex}
                strokeWidth="10"
                strokeLinecap="round"
              />
              {/* Left Earcup */}
              <rect x="182" y="195" width="26" height="60" rx="13" fill={headsetColorHex} stroke="#020617" strokeWidth="4" />
              <rect x="188" y="210" width="14" height="30" rx="7" fill="#06b6d4" filter="url(#rgb-glow)" />
              {/* Right Earcup */}
              <rect x="392" y="195" width="26" height="60" rx="13" fill={headsetColorHex} stroke="#020617" strokeWidth="4" />
              <rect x="398" y="210" width="14" height="30" rx="7" fill="#ec4899" filter="url(#rgb-glow)" />
            </g>
          )}

          {/* Hats */}
          {hat === 'hacker_beanie' && (
            <g id="hat-beanie" transform="translate(0, -10)">
              <path
                d="M 210 170 C 210 90 390 90 390 170 Z"
                fill={hatColorHex}
                stroke="#0f172a"
                strokeWidth="5"
              />
              <rect x="200" y="155" width="200" height="26" rx="8" fill={hatColorHex} stroke="#0f172a" strokeWidth="4" />
              <line x1="205" y1="168" x2="395" y2="168" stroke="#000000" strokeWidth="2" opacity="0.3" />
            </g>
          )}

          {hat === 'tech_snapback' && (
            <g id="hat-snapback" transform="translate(0, -5)">
              <path
                d="M 215 165 C 215 110 385 110 385 165 Z"
                fill={hatColorHex}
                stroke="#0f172a"
                strokeWidth="5"
              />
              {/* Snapback Brim */}
              <path d="M 210 165 L 435 165 L 420 180 L 210 180 Z" fill={hatColorHex} stroke="#0f172a" strokeWidth="4" />
            </g>
          )}

          {hat === 'dev_bucket_hat' && (
            <g id="hat-bucket" transform="translate(0, -10)">
              <path d="M 230 160 L 245 105 L 355 105 L 370 160 Z" fill={hatColorHex} stroke="#0f172a" strokeWidth="5" />
              {/* Brim */}
              <ellipse cx="300" cy="165" rx="125" ry="18" fill={hatColorHex} stroke="#0f172a" strokeWidth="4" />
            </g>
          )}
        </g>
      </svg>
    </div>
  );
};
