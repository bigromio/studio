import React from 'react';
import { LightingConfig } from '../types';

interface LightingEngineProps {
  config: LightingConfig;
  frame: number;
}

/**
 * Pure SVG & CSS Lighting Engine
 * Provides 3-point key/fill/rim lighting, screen glow flicker, and vignette overlay.
 */
export const LightingEngine: React.FC<LightingEngineProps> = ({ config, frame }) => {
  const {
    preset,
    keyLightColor,
    keyLightIntensity,
    fillLightColor,
    fillLightIntensity,
    rimLightColor,
    rimLightIntensity,
    vignetteStrength,
    ambientGlowRadius
  } = config;

  const flicker = 1 + Math.sin(frame * 0.35) * 0.04;

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        overflow: 'hidden'
      }}
    >
      {/* 1. Volumetric Key Light Radial Beam from Top */}
      <div
        style={{
          position: 'absolute',
          top: '-10%',
          left: '20%',
          width: `${ambientGlowRadius * 8}px`,
          height: `${ambientGlowRadius * 10}px`,
          background: `radial-gradient(circle at 50% 0%, ${keyLightColor} 0%, transparent 70%)`,
          opacity: keyLightIntensity * 0.35 * flicker,
          mixBlendMode: 'screen'
        }}
      />

      {/* 2. Fill Light from Bottom-Left */}
      <div
        style={{
          position: 'absolute',
          bottom: '10%',
          left: '-10%',
          width: '600px',
          height: '600px',
          background: `radial-gradient(circle at 30% 70%, ${fillLightColor} 0%, transparent 65%)`,
          opacity: fillLightIntensity * 0.3,
          mixBlendMode: 'screen'
        }}
      />

      {/* 3. Rim Light Glow (Edge Neon Border Highlights) */}
      {rimLightIntensity > 0 && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            boxShadow: `inset 0 0 120px ${rimLightColor}${Math.round(rimLightIntensity * 40).toString(16).padStart(2, '0')}`,
            mixBlendMode: 'overlay'
          }}
        />
      )}

      {/* 4. Cinematic Vignette Overlay */}
      {vignetteStrength > 0 && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(circle at 50% 50%, transparent 45%, rgba(0, 0, 0, ${vignetteStrength * 0.95}) 100%)`
          }}
        />
      )}
    </div>
  );
};
