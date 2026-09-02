import React from 'react';
import { useCurrentFrame, AbsoluteFill, Series } from 'remotion';
import { StudioSceneShot } from './types';
import { RoomEnvironment } from './Environment/RoomEnvironment';
import { CharacterRig } from './Character/CharacterRig';
import { computeCharacterPose } from './Actions/useCharacterPose';
import { CameraEngine } from './Camera/CameraEngine';
import { LightingEngine } from './Lighting/LightingEngine';
import { TypographyEngine } from './Typography/TypographyEngine';
import { SAMPLE_STUDIO_SHOTS } from './sampleScenes';

interface SingleShotPresenterProps {
  shot: StudioSceneShot;
  frame?: number;
}

/**
 * Single Shot Scene Presenter
 * Renders in pure 1080x1920 isolated canvas with absolute positioning and SVG vectors.
 */
export const SingleShotPresenter: React.FC<SingleShotPresenterProps> = ({ shot, frame: propFrame }) => {
  const currentFrame = useCurrentFrame();
  const frame = propFrame !== undefined ? propFrame : currentFrame;

  const { environment, character, camera, lighting, hook, caption } = shot;

  // Calculate bone rotations and dynamic visemes for speech/action
  const { pose, dynamicViseme } = computeCharacterPose(
    character.action,
    frame,
    character.viseme
  );

  return (
    <AbsoluteFill style={{ backgroundColor: '#000000', overflow: 'hidden' }}>
      {/* 1. Master Camera Viewport */}
      <CameraEngine config={camera} frame={frame}>
        <div style={{ position: 'relative', width: '1080px', height: '1920px' }}>
          {/* 2. Room Environment (5 Angular Perspectives & Elements) */}
          <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
            <RoomEnvironment config={environment} frame={frame} />
          </div>

          {/* 3. Behind-Character 3D Depth Typography Layer */}
          <TypographyEngine
            hook={hook}
            targetLayer="behind_character"
            frame={frame}
          />

          {/* 4. Character Vector Rig Layer (Precision Anchored Above Desk) */}
          <div
            style={{
              position: 'absolute',
              zIndex: 20,
              pointerEvents: 'none',
              left: `${character.positionX}%`,
              bottom: `${character.positionY}%`,
              transform: `translateX(-50%) scale(${character.scale})`,
              transformOrigin: '50% 90%'
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
    </AbsoluteFill>
  );
};

export interface CartoonPresenterVideoProps {
  shots?: StudioSceneShot[];
  shot?: StudioSceneShot;
  frame?: number;
}

/**
 * Master CartoonPresenterVideo Remotion Composition
 * Can render either a single scene or a full sequenced series of shots.
 */
export const CartoonPresenterVideo: React.FC<CartoonPresenterVideoProps> = ({
  shots = SAMPLE_STUDIO_SHOTS,
  shot,
  frame
}) => {
  // If a single shot is directly passed
  if (shot) {
    return <SingleShotPresenter shot={shot} frame={frame} />;
  }

  // If a sequence of shots is passed, render with Remotion <Series>
  if (shots.length === 1) {
    return <SingleShotPresenter shot={shots[0]} frame={frame} />;
  }

  return (
    <AbsoluteFill style={{ backgroundColor: '#000000' }}>
      <Series>
        {shots.map((s) => (
          <Series.Sequence key={s.id} durationInFrames={s.durationInFrames}>
            <SingleShotPresenter shot={s} />
          </Series.Sequence>
        ))}
      </Series>
    </AbsoluteFill>
  );
};
