import React from 'react';
import { CameraConfig } from '../types';

interface CameraEngineProps {
  config: CameraConfig;
  frame: number;
  children: React.ReactNode;
}

export const CameraEngine: React.FC<CameraEngineProps> = ({ config, frame, children }) => {
  const { zoom, panX, panY, rotation, shakeIntensity, transition, depthOfFieldBlur } = config;

  // Calculate Camera Shake if intensity > 0
  const shakeX = shakeIntensity > 0 ? (Math.sin(frame * 1.7) * shakeIntensity * 2.5) : 0;
  const shakeY = shakeIntensity > 0 ? (Math.cos(frame * 2.1) * shakeIntensity * 2.5) : 0;
  const shakeRot = shakeIntensity > 0 ? (Math.sin(frame * 1.3) * shakeIntensity * 0.4) : 0;

  // Dynamic Camera Transform Matrix
  const totalPanX = panX + shakeX;
  const totalPanY = panY + shakeY;
  const totalRot = rotation + shakeRot;

  // Transition overlays
  const renderTransitionFX = () => {
    if (transition === 'flash_white' && frame < 10) {
      const opacity = Math.max(0, 1 - frame / 10);
      return <div className="absolute inset-0 bg-white z-50 pointer-events-none transition-opacity" style={{ opacity }} />;
    }

    if (transition === 'cyber_glitch' && frame < 15) {
      return (
        <div className="absolute inset-0 z-50 pointer-events-none mix-blend-color-dodge opacity-60">
          <div className="w-full h-full bg-gradient-to-b from-transparent via-cyan-500/20 to-pink-500/20 animate-pulse" />
          <div className="absolute top-1/4 inset-x-0 h-4 bg-cyan-400/40 transform translate-x-2" />
          <div className="absolute top-2/3 inset-x-0 h-2 bg-pink-500/40 transform -translate-x-3" />
        </div>
      );
    }

    return null;
  };

  return (
    <div className="relative w-full h-full overflow-hidden bg-black">
      {/* 3D Camera Viewport Container */}
      <div 
        className="w-full h-full origin-center transition-all duration-150 ease-out"
        style={{
          transform: `scale(${zoom}) translate(${totalPanX}px, ${totalPanY}px) rotate(${totalRot}deg)`
        }}
      >
        {children}
      </div>

      {/* Transition FX Overlay */}
      {renderTransitionFX()}
    </div>
  );
};
