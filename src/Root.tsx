import React from 'react';
import { Composition } from 'remotion';
import { CartoonPresenterVideo } from './CartoonEngine/CartoonPresenterVideo';
import { SAMPLE_STUDIO_SHOTS } from './CartoonEngine/sampleScenes';

export const RemotionRoot: React.FC = () => {
  const totalDuration = SAMPLE_STUDIO_SHOTS.reduce((acc, shot) => acc + shot.durationInFrames, 0);

  return (
    <>
      {/* 1. Master Sequence Composition (Full Multi-Cut Video) */}
      <Composition
        id="CartoonPresenter"
        component={CartoonPresenterVideo}
        durationInFrames={totalDuration}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          shots: SAMPLE_STUDIO_SHOTS
        }}
      />

      {/* 2. Individual Shot Compositions for Single-Scene Testing & Rendering */}
      {SAMPLE_STUDIO_SHOTS.map((shot, idx) => (
        <Composition
          key={shot.id}
          id={`Shot_${idx + 1}_${shot.id}`}
          component={CartoonPresenterVideo}
          durationInFrames={shot.durationInFrames}
          fps={30}
          width={1080}
          height={1920}
          defaultProps={{
            shot
          }}
        />
      ))}
    </>
  );
};
