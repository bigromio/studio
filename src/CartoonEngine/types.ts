/**
 * Cartoon Engine Core Types
 * Comprehensive data contracts for Remotion Cartoon Presenter Studio
 */

// 1. Environment & Camera Perspectives
export type RoomAngle = 'front' | 'right_45' | 'left_45' | 'top_down' | 'low_angle';

export type TimeOfDay = 'midnight' | 'sunset' | 'daylight' | 'cyberpunk_night';

export interface RoomEnvironmentConfig {
  angle: RoomAngle;
  timeOfDay: TimeOfDay;
  showMonitorsCode: boolean;
  codeTheme: 'matrix' | 'vs_code_dark' | 'synthwave' | 'retro_amber';
  ambientSteam: boolean;
  rgbStripColor: string;
  posterTheme: 'retro_gaming' | 'ai_neural' | 'linux_hack' | 'anime_cyber';
  windowRain: boolean;
  serverRackBlink: boolean;
  plantOnDesk: boolean;
  mugText: string;
}

// 2. Character Anatomy & Poses
export type CharacterDirection = 'front' | 'three_quarter_left' | 'three_quarter_right' | 'side_left' | 'side_right' | 'back';

export type FacialExpression = 
  | 'happy'
  | 'focused_coding'
  | 'shocked_bug'
  | 'smug_genius'
  | 'confused_debugging'
  | 'talking_confident'
  | 'excited_idea'
  | 'tired_caffeine'
  | 'angry_syntax_error'
  | 'laughing'
  | 'wink';

export type VisemeType = 'silence' | 'A_AH' | 'O_OH' | 'E_EE' | 'M_B_P' | 'F_V' | 'L_TH' | 'S_Z' | 'W_OO';

export type HairStyleId = 
  | 'messy_curly'
  | 'slick_fade'
  | 'cyber_spiky'
  | 'ponytail'
  | 'afro'
  | 'beanie_hair'
  | 'anime_bangs'
  | 'bald_beard';

export type SkinToneId = 
  | 'fair_light'
  | 'warm_sand'
  | 'olive_tan'
  | 'caramel_brown'
  | 'deep_rich'
  | 'cyber_alien_blue';

export interface CharacterAppearance {
  skinTone: SkinToneId;
  skinColorHex?: string;
  hairStyle: HairStyleId;
  hairColorHex: string;
  eyeColorHex: string;
  facialHair: 'none' | 'designer_stubble' | 'full_beard' | 'goatee';
  facialHairColorHex?: string;
  glasses: 'none' | 'retro_round' | 'thick_square_nerd' | 'cyber_ar_visor' | 'shades_aviator';
  glassesColorHex: string;
  headset: 'none' | 'over_ear_rgb' | 'airbuds' | 'one_ear_broadcast';
  headsetColorHex: string;
  hat: 'none' | 'hacker_beanie' | 'tech_snapback' | 'dev_bucket_hat';
  hatColorHex: string;
}

// 3. Wardrobe System
export type OutfitCategory = 'top' | 'bottom' | 'shoes' | 'accessory';

export type OutfitPresetId = 
  | 'tech_hoodie'
  | 'cyberpunk_coat'
  | 'dev_flannel'
  | 'minimalist_tee'
  | 'silicon_valley_vest'
  | 'retro_pixel_sweater'
  | 'robotics_lab_suit'
  | 'indie_hacker_jacket';

export interface WardrobeConfig {
  preset: OutfitPresetId;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  graphicOnShirt: 'react_atom' | 'terminal_prompt' | 'binary_matrix' | 'coffee_cup' | 'none';
  watch: 'none' | 'smart_watch' | 'digital_retro' | 'cyber_hologram';
  lanyardBadge: boolean;
}

// 4. Character Actions & Animations
export type ActionId = 
  | 'idle_breathing'
  | 'coding_furious'
  | 'debugging_chin_rub'
  | 'facepalm_error'
  | 'explaining_two_hands'
  | 'presenting_right_screen'
  | 'presenting_left_screen'
  | 'point_up_idea'
  | 'point_down_subscribe'
  | 'sip_coffee'
  | 'celebration_victory'
  | 'typing_slow_think'
  | 'walk_left_to_right'
  | 'spin_in_chair'
  | 'shocked_lean_back'
  | 'shrug_dont_know';

export interface ActionState {
  action: ActionId;
  progress: number; // 0 to 1 loop or sequence
  armLeftRotation: number;
  armRightRotation: number;
  headTilt: number;
  bodyLean: number;
  chestElevation: number;
  walkOffsetX: number;
  isSitting: boolean;
}

// 5. Camera & Transitions
export type CameraShotType = 
  | 'wide_room'
  | 'medium_presenter'
  | 'close_up_face'
  | 'extreme_close_up_eyes'
  | 'over_shoulder_screen'
  | 'dutch_angle_dynamic'
  | 'top_down_desk'
  | 'low_angle_heroic';

export type CameraTransitionType = 
  | 'cut'
  | 'smooth_zoom'
  | 'whip_pan'
  | 'blur_dissolve'
  | 'cyber_glitch'
  | 'flash_white'
  | 'slide_horizontal';

export interface CameraConfig {
  shot: CameraShotType;
  zoom: number; // 0.8x to 3.0x
  panX: number; // -100 to 100 px
  panY: number; // -100 to 100 px
  rotation: number; // -30 to 30 deg
  shakeIntensity: number; // 0 (none) to 10 (earthquake/impact)
  transition: CameraTransitionType;
  depthOfFieldBlur: number; // px blur for background
}

// 6. Lighting Engine
export type LightingPresetId = 
  | 'cyberpunk_neon'
  | 'midnight_coder'
  | 'studio_3point'
  | 'matrix_green'
  | 'red_alert_bug'
  | 'sunset_golden'
  | 'synthwave_purple'
  | 'clean_daylight';

export interface LightingConfig {
  preset: LightingPresetId;
  keyLightColor: string;
  keyLightIntensity: number; // 0 to 1
  fillLightColor: string;
  fillLightIntensity: number;
  rimLightColor: string;
  rimLightIntensity: number;
  vignetteStrength: number; // 0 to 1
  ambientGlowRadius: number;
}

// 7. Typography: Hooks & Captions
export type HookLayer = 'behind_character' | 'in_front_of_character';

export type HookStyleId = 
  | 'kinetic_3d_block'
  | 'cyberpunk_glitch_tag'
  | 'comic_pop_banner'
  | 'bold_tech_slab'
  | 'neon_glowing_sign'
  | 'matrix_hacker_badge'
  | 'retro_vaporwave'
  | 'clean_glass_pill';

export interface HookConfig {
  enabled: boolean;
  text: string;
  subText?: string;
  layer: HookLayer;
  style: HookStyleId;
  primaryColor: string;
  secondaryColor: string;
  textColor: string;
  fontSize: number; // px scale factor
  positionY: number; // percentage from top (10% to 90%)
  positionX: number; // percentage from left
  animationType: 'spring_pop' | 'typewriter' | 'glitch_shake' | 'slide_in' | 'pulsing_glow';
}

export type CaptionStyleId = 
  | 'karaoke_highlight'
  | 'scattered_orbit'
  | 'cyberpunk_terminal'
  | 'bouncy_tiktok_badge'
  | 'minimalist_clean_subtitle'
  | 'comic_sound_bubble';

export interface CaptionWord {
  word: string;
  startFrame: number;
  endFrame: number;
  color?: string;
  highlight?: boolean;
  sizeMultiplier?: number;
  scatterOffsetX?: number;
  scatterOffsetY?: number;
  rotation?: number;
}

export interface CaptionConfig {
  enabled: boolean;
  style: CaptionStyleId;
  text: string;
  activeWordIndex: number;
  words: CaptionWord[];
  textColor: string;
  highlightColor: string;
  backgroundColor: string;
  fontSize: number;
  positionY: number; // percentage from top (e.g. 80%)
  scatterSpread: number; // px spread radius for scattered mode
}

// 8. Video Sequence & Timeline Shot Definition
export interface StudioSceneShot {
  id: string;
  title: string;
  durationInFrames: number; // e.g. 90 frames = 3s at 30fps
  environment: RoomEnvironmentConfig;
  character: {
    direction: CharacterDirection;
    appearance: CharacterAppearance;
    wardrobe: WardrobeConfig;
    expression: FacialExpression;
    viseme: VisemeType;
    action: ActionId;
    positionX: number; // % in room (20% to 80%)
    positionY: number;
    scale: number;
  };
  camera: CameraConfig;
  lighting: LightingConfig;
  hook: HookConfig;
  caption: CaptionConfig;
}

// Studio Overall Timeline State
export interface StudioTimelineState {
  currentFrame: number;
  totalFrames: number;
  fps: number;
  isPlaying: boolean;
  aspectRatio: '16:9' | '9:16' | '1:1';
  shots: StudioSceneShot[];
  activeShotIndex: number;
}
