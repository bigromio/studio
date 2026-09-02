import React from 'react';
import { StudioSceneShot } from './types';
import { RoomEnvironment } from './Environment/RoomEnvironment';
import { CharacterRig } from './Character/CharacterRig';
import { computeCharacterPose } from './Actions/useCharacterPose';
import { CameraEngine } from './Camera/CameraEngine';
import { LightingEngine } from './Lighting/LightingEngine';
import { TypographyEngine } from './Typography/TypographyEngine';

interface CartoonPresenterVideoProps {
  shot: StudioSceneShot;
  frame: number;
}

export const CartoonPresenterVideo: React.FC<CartoonPresenterVideoProps> = ({ shot, frame }) => {
  const { environment, character, camera, lighting, hook, caption } = shot;

  // Calculate bone rotations and dynamic visemes for speech/action
  const { pose, dynamicViseme } = computeCharacterPose(
    character.action,
    frame,
    character.viseme
  );

  return (
    <div className="relative w-full h-full overflow-hidden bg-black select-none">
      {/* 1. Master Camera Viewport */}
      <CameraEngine config={camera} frame={frame}>
        <div className="relative w-full h-full">
          {/* 2. Room Environment (5 Angular Perspectives & Elements) */}
          <div className="absolute inset-0 z-0">
            <RoomEnvironment config={environment} frame={frame} />
          </div>

          {/* 3. Behind-Character 3D Depth Typography Layer */}
          <TypographyEngine
            hook={hook}
            targetLayer="behind_character"
            frame={frame}
          />

          {/* 4. Character Vector Rig Layer */}
          <div 
            className="absolute z-20 pointer-events-none origin-bottom transition-all duration-75"
            style={{
              left: `${character.positionX}%`,
              bottom: `${character.positionY}%`,
              transform: `translateX(-50%) scale(${character.scale})`
            }}
          >
            <CharacterRig
              direction={character.direction}
              appearance={character.appearance}
              wardrobe={character.wardrobe}
              expression={character.expression}
              viseme={dynamicViseme}
              pose={pose}
              frame={frame}
            />
          </div>

          {/* 5. In-Front-Of-Character Typography Layer & Synced Captions */}
          <TypographyEngine
            hook={hook}
            caption={caption}
            targetLayer="in_front_of_character"
            frame={frame}
          />

          {/* 6. Dynamic Lighting, Rim Light & Vignette Overlay */}
          <LightingEngine config={lighting} frame={frame} />
        </div>
      </CameraEngine>
    </div>
  );
};
