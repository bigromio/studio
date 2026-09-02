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

// Map skin tones to refined cartoon skin hexes
const SKIN_TONE_COLORS: Record<string, string> = {
  fair_light: '#ffdfc4',
  warm_sand: '#f0c7a2',
  olive_tan: '#d6a374',
  caramel_brown: '#a86f44',
  deep_rich: '#683f23',
  cyber_alien_blue: '#7dd3fc'
};

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
  const { hairStyle, hairColorHex, eyeColorHex, glasses, glassesColorHex, headset, headsetColorHex, hat, hatColorHex, facialHair } = appearance;

  // Direction transform flip/rotation
  const isFlipped = direction === 'three_quarter_right' || direction === 'side_right';
  const isBack = direction === 'back';
  const isSide = direction === 'side_left' || direction === 'side_right';

  // Arm & head dynamics
  const { armLeftRotation, armRightRotation, headTilt, bodyLean, chestElevation, walkOffsetX, isSitting } = pose;

  return (
    <div 
      className="relative flex flex-col items-center select-none transition-transform duration-75 origin-bottom"
      style={{
        transform: `translateX(${walkOffsetX}px) translateY(${-chestElevation}px) rotate(${bodyLean}deg) ${isFlipped ? 'scaleX(-1)' : ''}`,
        filter: 'drop-shadow(0 15px 25px rgba(0,0,0,0.35))'
      }}
    >
      {/* 1. HEAD & FACE GROUP */}
      <div 
        className="relative z-30 flex flex-col items-center origin-bottom transition-transform"
        style={{ transform: `rotate(${headTilt}deg)` }}
      >
        {/* Hat (Behind or Top Layer) */}
        {hat !== 'none' && (
          <div className="absolute -top-7 z-40">
            {hat === 'hacker_beanie' && (
              <div 
                className="w-32 h-14 rounded-t-full border-2 border-slate-900 shadow-md flex items-end justify-center pb-1"
                style={{ backgroundColor: hatColorHex }}
              >
                <div className="w-34 h-3 bg-black/30 rounded" />
              </div>
            )}
            {hat === 'tech_snapback' && (
              <div className="relative">
                <div 
                  className="w-30 h-12 rounded-t-2xl border-2 border-slate-900"
                  style={{ backgroundColor: hatColorHex }}
                />
                <div 
                  className="absolute bottom-0 -right-6 w-14 h-3 rounded-r-full border border-slate-900 shadow"
                  style={{ backgroundColor: hatColorHex }}
                />
              </div>
            )}
            {hat === 'dev_bucket_hat' && (
              <div className="flex flex-col items-center">
                <div 
                  className="w-28 h-10 rounded-t-lg border-2 border-slate-900"
                  style={{ backgroundColor: hatColorHex }}
                />
                <div 
                  className="w-36 h-3 rounded-full border-2 border-slate-900 -mt-0.5 shadow"
                  style={{ backgroundColor: hatColorHex }}
                />
              </div>
            )}
          </div>
        )}

        {/* Hair Styles */}
        <div className="z-20">
          <HairStyles style={hairStyle} colorHex={hairColorHex} />
        </div>

        {/* Head Shape & Face Canvas */}
        <div 
          className="w-28 h-30 rounded-3xl border-3 border-slate-900 relative shadow-inner flex flex-col items-center justify-between py-3 -mt-6 z-10"
          style={{ backgroundColor: skinColor }}
        >
          {/* Ears */}
          <div 
            className="absolute top-10 -left-3.5 w-4 h-6 rounded-l-full border-2 border-slate-900"
            style={{ backgroundColor: skinColor }}
          />
          <div 
            className="absolute top-10 -right-3.5 w-4 h-6 rounded-r-full border-2 border-slate-900"
            style={{ backgroundColor: skinColor }}
          />

          {/* Over-Ear RGB Headset or Airbuds */}
          {headset === 'over_ear_rgb' && (
            <div className="absolute -top-4 inset-x-[-12px] flex items-center justify-between z-30 pointer-events-none">
              {/* Headband arch */}
              <div 
                className="absolute -top-2 inset-x-2 h-8 border-t-4 border-slate-900 rounded-t-full"
                style={{ borderColor: headsetColorHex }}
              />
              {/* Left ear cup */}
              <div 
                className="w-5 h-9 rounded-2xl border-2 border-slate-950 shadow-md flex items-center justify-center"
                style={{ backgroundColor: headsetColorHex }}
              >
                <div className="w-2 h-5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee] animate-pulse" />
              </div>
              {/* Right ear cup */}
              <div 
                className="w-5 h-9 rounded-2xl border-2 border-slate-950 shadow-md flex items-center justify-center"
                style={{ backgroundColor: headsetColorHex }}
              >
                <div className="w-2 h-5 rounded-full bg-pink-400 shadow-[0_0_8px_#f43f5e] animate-pulse" />
              </div>
            </div>
          )}

          {headset === 'airbuds' && (
            <div className="absolute top-11 -right-2 w-2 h-3.5 bg-white rounded-full border border-slate-400 shadow z-30" />
          )}

          {!isBack ? (
            <>
              {/* Eyes & Eyebrows */}
              <div className="mt-1 relative z-20">
                <EyesAndEyebrows expression={expression} eyeColorHex={eyeColorHex} frame={frame} />
              </div>

              {/* Glasses & AR Visors */}
              {glasses !== 'none' && (
                <div className="absolute top-7 inset-x-0 flex justify-center z-30 pointer-events-none">
                  {glasses === 'thick_square_nerd' && (
                    <div className="flex items-center space-x-1 rtl:space-x-reverse">
                      <div 
                        className="w-9 h-7 rounded-md border-3 border-slate-950 bg-cyan-200/20 shadow-inner"
                        style={{ borderColor: glassesColorHex }}
                      />
                      <div className="w-3 h-1 bg-slate-950" style={{ backgroundColor: glassesColorHex }} />
                      <div 
                        className="w-9 h-7 rounded-md border-3 border-slate-950 bg-cyan-200/20 shadow-inner"
                        style={{ borderColor: glassesColorHex }}
                      />
                    </div>
                  )}
                  {glasses === 'retro_round' && (
                    <div className="flex items-center space-x-1 rtl:space-x-reverse">
                      <div 
                        className="w-8 h-8 rounded-full border-2 border-amber-900 bg-amber-100/20"
                        style={{ borderColor: glassesColorHex }}
                      />
                      <div className="w-2.5 h-0.5 bg-amber-900" style={{ backgroundColor: glassesColorHex }} />
                      <div 
                        className="w-8 h-8 rounded-full border-2 border-amber-900 bg-amber-100/20"
                        style={{ borderColor: glassesColorHex }}
                      />
                    </div>
                  )}
                  {glasses === 'cyber_ar_visor' && (
                    <div 
                      className="w-24 h-6 rounded-lg border-2 border-cyan-400 bg-cyan-500/40 shadow-[0_0_12px_#06b6d4] flex items-center justify-center"
                      style={{ borderColor: glassesColorHex }}
                    >
                      <span className="text-[6px] font-mono text-cyan-200 tracking-widest animate-pulse">AR: 100%</span>
                    </div>
                  )}
                  {glasses === 'shades_aviator' && (
                    <div className="flex items-center space-x-1 rtl:space-x-reverse">
                      <div className="w-9 h-8 rounded-b-2xl bg-slate-900 border border-slate-700 shadow-md" />
                      <div className="w-2.5 h-0.5 bg-slate-700" />
                      <div className="w-9 h-8 rounded-b-2xl bg-slate-900 border border-slate-700 shadow-md" />
                    </div>
                  )}
                </div>
              )}

              {/* Cute Cartoon Nose */}
              <div className="w-2 h-2.5 rounded-full bg-slate-900/20 border-b-2 border-slate-900/40 -mt-1" />

              {/* Facial Hair / Beard */}
              {facialHair === 'designer_stubble' && (
                <div className="absolute bottom-3 inset-x-4 h-6 bg-slate-950/10 rounded-b-2xl pointer-events-none" />
              )}
              {facialHair === 'full_beard' && (
                <div 
                  className="absolute bottom-[-6px] inset-x-2 h-10 rounded-b-3xl border-2 border-slate-950 shadow-md flex items-end justify-center pb-1"
                  style={{ backgroundColor: hairColorHex }}
                >
                  <div className="w-6 h-1 bg-black/20 rounded" />
                </div>
              )}

              {/* Dynamic Viseme Mouth */}
              <div className="mb-1 relative z-20">
                <MouthVisemes viseme={viseme} skinColor={skinColor} frame={frame} />
              </div>
            </>
          ) : (
            /* Back of Head View */
            <div className="w-full h-full flex flex-col justify-center items-center">
              <div className="w-20 h-16 rounded-full bg-black/10" />
            </div>
          )}
        </div>
      </div>

      {/* 2. UPPER BODY, TORSO & ARMS */}
      <div className="relative z-20 flex justify-center items-start -mt-3">
        {/* Left Arm Joint */}
        <div 
          className="w-10 h-28 origin-top-right transition-transform"
          style={{
            transform: `rotate(${armLeftRotation}deg)`,
            marginRight: '-10px'
          }}
        >
          {/* Upper sleeve */}
          <div 
            className="w-8 h-16 rounded-full border-2 border-slate-900 shadow-md"
            style={{ backgroundColor: wardrobe.primaryColor }}
          />
          {/* Forearm & Hand */}
          <div 
            className="w-6 h-12 rounded-full border-2 border-slate-900 -mt-3 mx-auto shadow"
            style={{ backgroundColor: skinColor }}
          >
            {/* Smart Watch */}
            {wardrobe.watch === 'smart_watch' && (
              <div className="w-6 h-2.5 bg-slate-900 rounded-sm mt-2 border border-cyan-400 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              </div>
            )}
          </div>
        </div>

        {/* Central Torso Wardrobe */}
        <div className="z-10">
          <WardrobeEngine config={wardrobe} skinColor={skinColor} />
        </div>

        {/* Right Arm Joint */}
        <div 
          className="w-10 h-28 origin-top-left transition-transform"
          style={{
            transform: `rotate(${armRightRotation}deg)`,
            marginLeft: '-10px'
          }}
        >
          {/* Upper sleeve */}
          <div 
            className="w-8 h-16 rounded-full border-2 border-slate-900 shadow-md"
            style={{ backgroundColor: wardrobe.primaryColor }}
          />
          {/* Forearm & Hand */}
          <div 
            className="w-6 h-12 rounded-full border-2 border-slate-900 -mt-3 mx-auto shadow"
            style={{ backgroundColor: skinColor }}
          />
        </div>
      </div>

      {/* 3. LOWER BODY & LEGS / SEAT */}
      <div className="relative z-10 -mt-2 flex flex-col items-center">
        {isSitting ? (
          /* Sitting Pose / Ergonomic Chair base */
          <div className="flex flex-col items-center">
            {/* Bent Knees */}
            <div className="flex space-x-6 rtl:space-x-reverse">
              <div className="w-12 h-14 bg-slate-900 rounded-lg border-2 border-slate-950 shadow" />
              <div className="w-12 h-14 bg-slate-900 rounded-lg border-2 border-slate-950 shadow" />
            </div>
            {/* Sneakers */}
            <div className="flex space-x-8 rtl:space-x-reverse -mt-2">
              <div className="w-12 h-6 bg-white border-2 border-slate-900 rounded-r-xl shadow flex items-center px-1">
                <div className="w-3 h-1 bg-red-500 rounded" />
              </div>
              <div className="w-12 h-6 bg-white border-2 border-slate-900 rounded-r-xl shadow flex items-center px-1">
                <div className="w-3 h-1 bg-red-500 rounded" />
              </div>
            </div>
          </div>
        ) : (
          /* Standing Legs */
          <div className="flex flex-col items-center">
            <div className="flex space-x-4 rtl:space-x-reverse">
              <div className="w-8 h-28 bg-slate-900 rounded-b-xl border-2 border-slate-950 shadow-md" />
              <div className="w-8 h-28 bg-slate-900 rounded-b-xl border-2 border-slate-950 shadow-md" />
            </div>
            {/* Shoes */}
            <div className="flex space-x-4 rtl:space-x-reverse -mt-2">
              <div className="w-12 h-6 bg-white border-2 border-slate-950 rounded-lg shadow flex items-center px-1">
                <div className="w-4 h-1.5 bg-cyan-500 rounded" />
              </div>
              <div className="w-12 h-6 bg-white border-2 border-slate-950 rounded-lg shadow flex items-center px-1">
                <div className="w-4 h-1.5 bg-cyan-500 rounded" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
