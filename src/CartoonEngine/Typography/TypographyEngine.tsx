import React from 'react';
import { CaptionConfig, HookConfig, HookLayer } from '../types';
import { HookLibrary } from './HookLibrary';
import { CaptionLibrary } from './CaptionLibrary';

interface TypographyEngineProps {
  hook: HookConfig;
  caption?: CaptionConfig;
  targetLayer: HookLayer;
  frame: number;
}

export const TypographyEngine: React.FC<TypographyEngineProps> = ({ hook, caption, targetLayer, frame }) => {
  return (
    <>
      {/* 1. Hook Text (Renders on requested layer: behind or foreground) */}
      <HookLibrary config={hook} targetLayer={targetLayer} frame={frame} />

      {/* 2. Captions (Render exclusively on foreground layer) */}
      {targetLayer === 'in_front_of_character' && caption && (
        <CaptionLibrary config={caption} frame={frame} />
      )}
    </>
  );
};
