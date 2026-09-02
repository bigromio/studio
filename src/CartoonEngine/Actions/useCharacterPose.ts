import { ActionId, ActionState, VisemeType } from '../types';

export function computeCharacterPose(action: ActionId, frame: number, baseViseme: VisemeType = 'silence'): {
  pose: ActionState;
  dynamicViseme: VisemeType;
} {
  const t = frame * 0.15;
  const loopT = (frame % 60) / 60; // 0 to 1 in 2-second cycle (at 30fps)

  let armLeftRotation = 0;
  let armRightRotation = 0;
  let headTilt = 0;
  let bodyLean = 0;
  let chestElevation = 0;
  let walkOffsetX = 0;
  let isSitting = false;
  let dynamicViseme = baseViseme;

  switch (action) {
    case 'idle_breathing':
      chestElevation = Math.sin(t * 0.5) * 2;
      headTilt = Math.sin(t * 0.3) * 1.5;
      armLeftRotation = Math.sin(t * 0.5) * 3;
      armRightRotation = -Math.sin(t * 0.5) * 3;
      break;

    case 'coding_furious':
      isSitting = true;
      bodyLean = 6 + Math.sin(t * 2) * 1.5;
      headTilt = Math.sin(t * 3) * 3;
      // Fast alternating typing hands
      armLeftRotation = -40 + Math.sin(t * 4) * 10;
      armRightRotation = 40 + Math.cos(t * 4) * 10;
      break;

    case 'debugging_chin_rub':
      isSitting = true;
      bodyLean = -3;
      headTilt = -6 + Math.sin(t * 0.5) * 2;
      armLeftRotation = 10;
      armRightRotation = 65 + Math.sin(t * 0.8) * 4; // Right hand near chin
      break;

    case 'facepalm_error':
      bodyLean = 8;
      headTilt = 12;
      armLeftRotation = 5;
      armRightRotation = 110; // Hand covering face
      break;

    case 'explaining_two_hands':
      bodyLean = Math.sin(t * 0.8) * 2;
      headTilt = Math.cos(t * 0.7) * 3;
      // Expressive gesturing hands
      armLeftRotation = -35 + Math.sin(t * 1.2) * 15;
      armRightRotation = 35 + Math.cos(t * 1.2) * 15;
      // If base viseme is silence, oscillate between talk visemes
      if (baseViseme === 'silence') {
        const visemesCycle: VisemeType[] = ['A_AH', 'O_OH', 'E_EE', 'M_B_P'];
        dynamicViseme = visemesCycle[Math.floor(frame / 6) % visemesCycle.length];
      }
      break;

    case 'presenting_right_screen':
      bodyLean = -4;
      headTilt = -5;
      armLeftRotation = -10;
      armRightRotation = 75 + Math.sin(t * 0.8) * 8; // Extended out to right
      break;

    case 'presenting_left_screen':
      bodyLean = 4;
      headTilt = 5;
      armLeftRotation = -75 - Math.sin(t * 0.8) * 8; // Extended out to left
      armRightRotation = 10;
      break;

    case 'point_up_idea':
      headTilt = -8;
      chestElevation = 4;
      armLeftRotation = -10;
      armRightRotation = 125; // Pointing straight up
      break;

    case 'point_down_subscribe':
      headTilt = 6;
      armLeftRotation = -50;
      armRightRotation = 50;
      break;

    case 'sip_coffee':
      const sipCycle = Math.sin(t * 0.6);
      headTilt = sipCycle > 0.5 ? -10 : 0;
      armLeftRotation = 0;
      armRightRotation = 40 + (sipCycle > 0.3 ? 70 : 0);
      break;

    case 'celebration_victory':
      chestElevation = 5 + Math.sin(t * 2) * 3;
      headTilt = Math.sin(t * 1.5) * 4;
      // Double arms pumped high
      armLeftRotation = -115 + Math.sin(t * 2) * 10;
      armRightRotation = 115 - Math.sin(t * 2) * 10;
      break;

    case 'walk_left_to_right':
      // Walk translation across screen
      walkOffsetX = ((frame * 2.5) % 300) - 150;
      bodyLean = 4;
      chestElevation = Math.abs(Math.sin(t * 2)) * 4;
      armLeftRotation = Math.sin(t * 2) * 35;
      armRightRotation = -Math.sin(t * 2) * 35;
      break;

    case 'spin_in_chair':
      isSitting = true;
      headTilt = Math.sin(t * 3) * 8;
      armLeftRotation = Math.sin(t * 2) * 40;
      armRightRotation = -Math.sin(t * 2) * 40;
      break;

    case 'shocked_lean_back':
      bodyLean = -14;
      headTilt = -10;
      armLeftRotation = -50;
      armRightRotation = 50;
      chestElevation = 6;
      break;

    case 'shrug_dont_know':
      chestElevation = 6;
      headTilt = 6;
      armLeftRotation = -45;
      armRightRotation = 45;
      break;

    default:
      break;
  }

  const pose: ActionState = {
    action,
    progress: loopT,
    armLeftRotation,
    armRightRotation,
    headTilt,
    bodyLean,
    chestElevation,
    walkOffsetX,
    isSitting
  };

  return { pose, dynamicViseme };
}
