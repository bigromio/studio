import React from 'react';
import { CameraConfig } from '../types';

interface CameraEngineProps {
  config: CameraConfig;
  frame: number;
  children: React.ReactNode;
}

/**
 * Headless Camera Engine for 1080x1920 Remotion Canvas
 * Handles dynamic zoom, camera pan, procedural shake physics, and transition overlays.
 */
export const CameraEngine: React.FC<CameraEngineProps> = ({ config, frame, children }) => {
  const { zoom, panX, panY, rotation, shakeIntensity, transition } = config;

  // Calculate Camera Shake if intensity > 0
  const shakeX = shakeIntensity > 0 ? (Math.sin(frame * 1.7) * shakeIntensity * 4.5) : 0;
  const shakeY = shakeIntensity > 0 ? (Math.cos(frame * 2.1) * shakeIntensity * 4.5) : 0;
  const shakeRot = shakeIntensity > 0 ? (Math.sin(frame * 1.3) * shakeIntensity * 0.5) : 0;

  // Total transformed coordinates
  const totalPanX = panX + shakeX;
  const totalPanY = panY + shakeY;
  const totalRot = rotation + shakeRot;

  // Transition FX Overlays
  const renderTransitionFX = () => {
    if (transition === 'flash_white' && frame < 10) {
      const opacity = Math.max(0, 1 - frame / 10);
      return (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: '#ffffff',
            opacity,
            zIndex: 60,
            pointerEvents: 'none'
          }}
        />
      );
    }

    if (transition === 'cyber_glitch' && frame < 15) {
      return (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 60,
            pointerEvents: 'none',
            mixBlendMode: 'color-dodge',
            opacity: 0.65,
            background: 'linear-gradient(180deg, transparent 0%, rgba(6, 182, 212, 0.3) 50%, rgba(236, 72, 153, 0.3) 100%)'
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '25%',
              left: 0,
              right: 0,
              height: '8px',
              backgroundColor: 'rgba(34, 211, 238, 0.6)',
              transform: 'translateX(10px)'
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: '65%',
              left: 0,
              right: 0,
              height: '6px',
              backgroundColor: 'rgba(236, 72, 153, 0.6)',
              transform: 'translateX(-15px)'
            }}
          />
        </div>
      );
    }

    return null;
  };

  return (
    <div
      style={{
        position: 'absolute',
        width: '1080px',
        height: '1920px',
        overflow: 'hidden',
        backgroundColor: '#000000'
      }}
    >
      {/* 3D Camera Transform Container */}
      <div
        style={{
          width: '100%',
          height: '100%',
          transformOrigin: '50% 50%',
          transform: `scale(${zoom}) translate(${totalPanX}px, ${totalPanY}px) rotate(${totalRot}deg)`
        }}
      >
        {children}
      </div>

      {/* Transition Overlay */}
      {renderTransitionFX()}
    </div>
  );
};
