import React from 'react';
import { LightingConfig } from '../types';

interface LightingEngineProps {
  config: LightingConfig;
  frame: number;
}

export const LightingEngine: React.FC<LightingEngineProps> = ({ config, frame }) => {
  const { keyLightColor, keyLightIntensity, fillLightColor, fillLightIntensity, rimLightColor, rimLightIntensity, vignetteStrength } = config;

  // Subtle breathing pulse for neon lighting
  const pulse = Math.sin(frame * 0.08) * 0.05;

  return (
    <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden">
      {/* 1. Key Light (Top-Left Angle Ambient Spotlight) */}
      <div 
        className="absolute -top-1/4 -left-1/4 w-3/4 h-3/4 rounded-full blur-3xl mix-blend-screen transition-all duration-300"
        style={{
          background: `radial-gradient(circle, ${keyLightColor} 0%, transparent 70%)`,
          opacity: Math.max(0, keyLightIntensity + pulse)
        }}
      />

      {/* 2. Fill Light (Bottom-Right Soft Ambient) */}
      <div 
        className="absolute -bottom-1/4 -right-1/4 w-3/4 h-3/4 rounded-full blur-3xl mix-blend-screen transition-all duration-300"
        style={{
          background: `radial-gradient(circle, ${fillLightColor} 0%, transparent 70%)`,
          opacity: Math.max(0, fillLightIntensity)
        }}
      />

      {/* 3. Rim Lighting Center Gradient (Gives pop to character edges) */}
      <div 
        className="absolute inset-0 mix-blend-color-dodge transition-all duration-300 pointer-events-none"
        style={{
          background: `linear-gradient(135deg, ${rimLightColor}22 0%, transparent 50%, ${rimLightColor}33 100%)`,
          opacity: Math.max(0, rimLightIntensity)
        }}
      />

      {/* 4. Cinematic Vignette */}
      {vignetteStrength > 0 && (
        <div 
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            background: `radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.85) 100%)`,
            opacity: vignetteStrength
          }}
        />
      )}
    </div>
  );
};
