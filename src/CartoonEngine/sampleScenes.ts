import { StudioSceneShot, CharacterAppearance, WardrobeConfig } from './types';

export const DEFAULT_DEV_APPEARANCE: CharacterAppearance = {
  skinTone: 'warm_sand',
  skinColorHex: '#f0c7a2',
  hairStyle: 'messy_curly',
  hairColorHex: '#1e293b',
  eyeColorHex: '#38bdf8',
  glasses: 'thick_square_nerd',
  glassesColorHex: '#0f172a',
  headset: 'over_ear_rgb',
  headsetColorHex: '#020617',
  hat: 'none',
  hatColorHex: '#0f172a',
  facialHair: 'designer_stubble'
};

export const DEFAULT_WARDROBE: WardrobeConfig = {
  preset: 'tech_hoodie',
  primaryColor: '#0284c7',
  secondaryColor: '#0369a1',
  accentColor: '#38bdf8',
  graphicOnShirt: 'react_atom',
  watch: 'smart_watch',
  lanyardBadge: true
};

export const SAMPLE_STUDIO_SHOTS: StudioSceneShot[] = [
  // Shot 1: The Dramatic 3 AM Hook
  {
    id: 'shot_1_hook',
    title: '3AM Bug Hook',
    durationInFrames: 75, // 2.5s at 30fps
    environment: {
      angle: 'front',
      timeOfDay: 'midnight',
      showMonitorsCode: true,
      codeTheme: 'matrix',
      ambientSteam: true,
      rgbStripColor: '#06b6d4',
      posterTheme: 'ai_neural',
      windowRain: true,
      serverRackBlink: true,
      mugText: 'DEBUG',
      plantOnDesk: true
    },
    character: {
      direction: 'front',
      action: 'coding_furious',
      viseme: 'silence',
      expression: 'shocked_bug',
      positionX: 50,
      positionY: 28,
      scale: 1.55,
      appearance: DEFAULT_DEV_APPEARANCE,
      wardrobe: DEFAULT_WARDROBE
    },
    camera: {
      shot: 'medium_presenter',
      zoom: 1.05,
      panX: 0,
      panY: 0,
      rotation: 0,
      shakeIntensity: 0.3,
      transition: 'flash_white',
      depthOfFieldBlur: 0
    },
    lighting: {
      preset: 'cyberpunk_neon',
      keyLightColor: '#38bdf8',
      keyLightIntensity: 0.9,
      fillLightColor: '#ec4899',
      fillLightIntensity: 0.6,
      rimLightColor: '#06b6d4',
      rimLightIntensity: 1.0,
      vignetteStrength: 0.4,
      ambientGlowRadius: 100
    },
    hook: {
      enabled: true,
      layer: 'in_front_of_character',
      style: 'kinetic_3d_block',
      text: 'WHY REACT 19 CHANGES EVERYTHING',
      subText: 'FULL CRASH COURSE // 60 SECONDS',
      primaryColor: '#facc15',
      secondaryColor: '#ca8a04',
      textColor: '#000000',
      fontSize: 54,
      positionY: 18,
      positionX: 50,
      animationType: 'spring_pop'
    },
    caption: {
      enabled: true,
      style: 'karaoke_highlight',
      text: 'Stop writing useEffect for data fetching in 2026!',
      activeWordIndex: 0,
      words: [],
      textColor: '#ffffff',
      highlightColor: '#38bdf8',
      backgroundColor: 'rgba(0,0,0,0.85)',
      fontSize: 36,
      positionY: 82,
      scatterSpread: 160
    }
  },

  // Shot 2: Debugging Chin Rub (Angled Perspective)
  {
    id: 'shot_2_explain',
    title: 'Deep Debugging',
    durationInFrames: 90, // 3s
    environment: {
      angle: 'left_45',
      timeOfDay: 'cyberpunk_night',
      showMonitorsCode: true,
      codeTheme: 'synthwave',
      ambientSteam: true,
      rgbStripColor: '#ec4899',
      posterTheme: 'anime_cyber',
      windowRain: true,
      serverRackBlink: true,
      mugText: 'DEV',
      plantOnDesk: true
    },
    character: {
      direction: 'front',
      action: 'debugging_chin_rub',
      viseme: 'silence',
      expression: 'confused_debugging',
      positionX: 50,
      positionY: 28,
      scale: 1.6,
      appearance: DEFAULT_DEV_APPEARANCE,
      wardrobe: DEFAULT_WARDROBE
    },
    camera: {
      shot: 'medium_presenter',
      zoom: 1.15,
      panX: -20,
      panY: -10,
      rotation: 0,
      shakeIntensity: 0,
      transition: 'cyber_glitch',
      depthOfFieldBlur: 0
    },
    lighting: {
      preset: 'cyberpunk_neon',
      keyLightColor: '#ec4899',
      keyLightIntensity: 0.9,
      fillLightColor: '#3b82f6',
      fillLightIntensity: 0.7,
      rimLightColor: '#f43f5e',
      rimLightIntensity: 1.2,
      vignetteStrength: 0.35,
      ambientGlowRadius: 100
    },
    hook: {
      enabled: true,
      layer: 'behind_character',
      style: 'cyberpunk_glitch_tag',
      text: 'SERVER ACTIONS 101',
      subText: 'ZERO CLIENT BUNDLE SIZE',
      primaryColor: '#0f172a',
      secondaryColor: '#ec4899',
      textColor: '#ffffff',
      fontSize: 48,
      positionY: 22,
      positionX: 50,
      animationType: 'glitch_shake'
    },
    caption: {
      enabled: true,
      style: 'bouncy_tiktok_badge',
      text: 'Mutations happen securely on the server!',
      activeWordIndex: 0,
      words: [],
      textColor: '#000000',
      highlightColor: '#fde047',
      backgroundColor: '#fde047',
      fontSize: 38,
      positionY: 84,
      scatterSpread: 160
    }
  },

  // Shot 3: Presenting with Two Hands & Speech
  {
    id: 'shot_3_hands',
    title: 'Hands Explaining',
    durationInFrames: 90,
    environment: {
      angle: 'front',
      timeOfDay: 'midnight',
      showMonitorsCode: true,
      codeTheme: 'vs_code_dark',
      ambientSteam: false,
      rgbStripColor: '#10b981',
      posterTheme: 'linux_hack',
      windowRain: false,
      serverRackBlink: true,
      mugText: 'CODE',
      plantOnDesk: true
    },
    character: {
      direction: 'front',
      action: 'explaining_two_hands',
      viseme: 'A_AH',
      expression: 'talking_confident',
      positionX: 50,
      positionY: 28,
      scale: 1.55,
      appearance: DEFAULT_DEV_APPEARANCE,
      wardrobe: DEFAULT_WARDROBE
    },
    camera: {
      shot: 'medium_presenter',
      zoom: 1.0,
      panX: 0,
      panY: 0,
      rotation: 0,
      shakeIntensity: 0,
      transition: 'cut',
      depthOfFieldBlur: 0
    },
    lighting: {
      preset: 'midnight_coder',
      keyLightColor: '#10b981',
      keyLightIntensity: 0.8,
      fillLightColor: '#0284c7',
      fillLightIntensity: 0.6,
      rimLightColor: '#34d399',
      rimLightIntensity: 0.8,
      vignetteStrength: 0.3,
      ambientGlowRadius: 80
    },
    hook: {
      enabled: true,
      layer: 'in_front_of_character',
      style: 'bold_tech_slab',
      text: 'PURE REMOTION 9:16',
      subText: 'VECTOR GRAPHICS ENGINE',
      primaryColor: '#0284c7',
      secondaryColor: '#06b6d4',
      textColor: '#ffffff',
      fontSize: 44,
      positionY: 16,
      positionX: 50,
      animationType: 'slide_in'
    },
    caption: {
      enabled: true,
      style: 'cyberpunk_terminal',
      text: 'Notice zero blur at any scale factor!',
      activeWordIndex: 0,
      words: [],
      textColor: '#ffffff',
      highlightColor: '#34d399',
      backgroundColor: 'rgba(0,0,0,0.9)',
      fontSize: 34,
      positionY: 82,
      scatterSpread: 160
    }
  },

  // Shot 4: Celebration Victory
  {
    id: 'shot_4_victory',
    title: 'Victory & Subscribe',
    durationInFrames: 75,
    environment: {
      angle: 'front',
      timeOfDay: 'cyberpunk_night',
      showMonitorsCode: true,
      codeTheme: 'synthwave',
      ambientSteam: true,
      rgbStripColor: '#f43f5e',
      posterTheme: 'retro_gaming',
      windowRain: true,
      serverRackBlink: true,
      mugText: '100X',
      plantOnDesk: true
    },
    character: {
      direction: 'front',
      action: 'celebration_victory',
      viseme: 'E_EE',
      expression: 'wink',
      positionX: 50,
      positionY: 28,
      scale: 1.55,
      appearance: DEFAULT_DEV_APPEARANCE,
      wardrobe: DEFAULT_WARDROBE
    },
    camera: {
      shot: 'medium_presenter',
      zoom: 1.08,
      panX: 0,
      panY: -15,
      rotation: 0,
      shakeIntensity: 0.1,
      transition: 'flash_white',
      depthOfFieldBlur: 0
    },
    lighting: {
      preset: 'synthwave_purple',
      keyLightColor: '#f43f5e',
      keyLightIntensity: 1.0,
      fillLightColor: '#8b5cf6',
      fillLightIntensity: 0.8,
      rimLightColor: '#f43f5e',
      rimLightIntensity: 1.4,
      vignetteStrength: 0.4,
      ambientGlowRadius: 120
    },
    hook: {
      enabled: true,
      layer: 'in_front_of_character',
      style: 'comic_pop_banner',
      text: 'DROP A STAR ON GITHUB',
      subText: 'LINK IN PINNED COMMENT',
      primaryColor: '#facc15',
      secondaryColor: '#000000',
      textColor: '#000000',
      fontSize: 48,
      positionY: 18,
      positionX: 50,
      animationType: 'spring_pop'
    },
    caption: {
      enabled: true,
      style: 'bouncy_tiktok_badge',
      text: 'Build awesome shorts with Remotion!',
      activeWordIndex: 0,
      words: [],
      textColor: '#000000',
      highlightColor: '#38bdf8',
      backgroundColor: '#38bdf8',
      fontSize: 36,
      positionY: 84,
      scatterSpread: 160
    }
  }
];
