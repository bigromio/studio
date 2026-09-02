import { StudioSceneShot } from './types';

export const INITIAL_STUDIO_SHOTS: StudioSceneShot[] = [
  {
    id: 'shot_1_intro_hook',
    title: '1. لقطة البداية (Hook واسع ومبهر)',
    durationInFrames: 90,
    environment: {
      angle: 'front',
      timeOfDay: 'cyberpunk_night',
      showMonitorsCode: true,
      codeTheme: 'synthwave',
      ambientSteam: true,
      rgbStripColor: '#ec4899',
      posterTheme: 'retro_gaming',
      windowRain: true,
      serverRackBlink: true,
      plantOnDesk: true,
      mugText: 'CODE'
    },
    character: {
      direction: 'front',
      appearance: {
        skinTone: 'warm_sand',
        hairStyle: 'cyber_spiky',
        hairColorHex: '#1e293b',
        eyeColorHex: '#0284c7',
        facialHair: 'designer_stubble',
        glasses: 'cyber_ar_visor',
        glassesColorHex: '#06b6d4',
        headset: 'over_ear_rgb',
        headsetColorHex: '#0f172a',
        hat: 'none',
        hatColorHex: '#0284c7'
      },
      wardrobe: {
        preset: 'cyberpunk_coat',
        primaryColor: '#0f172a',
        secondaryColor: '#2dd4bf',
        accentColor: '#f43f5e',
        graphicOnShirt: 'react_atom',
        watch: 'smart_watch',
        lanyardBadge: true
      },
      expression: 'excited_idea',
      viseme: 'E_EE',
      action: 'explaining_two_hands',
      positionX: 50,
      positionY: 28,
      scale: 1.15
    },
    camera: {
      shot: 'medium_presenter',
      zoom: 1.25,
      panX: 0,
      panY: 15,
      rotation: 0,
      shakeIntensity: 0,
      transition: 'flash_white',
      depthOfFieldBlur: 1
    },
    lighting: {
      preset: 'cyberpunk_neon',
      keyLightColor: '#06b6d4',
      keyLightIntensity: 0.85,
      fillLightColor: '#ec4899',
      fillLightIntensity: 0.65,
      rimLightColor: '#38bdf8',
      rimLightIntensity: 0.9,
      vignetteStrength: 0.4,
      ambientGlowRadius: 40
    },
    hook: {
      enabled: true,
      text: 'كيف تصبح مبرمج ذكاء اصطناعي؟',
      subText: 'FULL STACK CARTOON STUDIO',
      layer: 'behind_character',
      style: 'kinetic_3d_block',
      primaryColor: '#f59e0b',
      secondaryColor: '#78350f',
      textColor: '#ffffff',
      fontSize: 32,
      positionY: 25,
      positionX: 50,
      animationType: 'spring_pop'
    },
    caption: {
      enabled: true,
      style: 'scattered_orbit',
      text: 'الذكاء_الاصطناعي كود ريموشن مصفوفة استديو إبداع خوارزميات',
      activeWordIndex: 0,
      words: [
        { word: 'الذكاء_الاصطناعي', startFrame: 0, endFrame: 25, highlight: true, sizeMultiplier: 1.3, scatterOffsetX: -140, scatterOffsetY: -70, rotation: -10, color: '#38bdf8' },
        { word: 'كود', startFrame: 26, endFrame: 45, highlight: false, sizeMultiplier: 1.1, scatterOffsetX: 130, scatterOffsetY: -60, rotation: 8, color: '#f43f5e' },
        { word: 'ريموشن', startFrame: 46, endFrame: 65, highlight: false, sizeMultiplier: 1.25, scatterOffsetX: -130, scatterOffsetY: 60, rotation: -6, color: '#facc15' },
        { word: 'إبداع', startFrame: 66, endFrame: 90, highlight: false, sizeMultiplier: 1.15, scatterOffsetX: 140, scatterOffsetY: 70, rotation: 12, color: '#34d399' }
      ],
      textColor: '#ffffff',
      highlightColor: '#facc15',
      backgroundColor: 'rgba(0,0,0,0.8)',
      fontSize: 18,
      positionY: 82,
      scatterSpread: 210
    }
  },
  {
    id: 'shot_2_coding_rage',
    title: '2. لقطة البرمجة السريعة (زاوية يمنى 45°)',
    durationInFrames: 90,
    environment: {
      angle: 'right_45',
      timeOfDay: 'midnight',
      showMonitorsCode: true,
      codeTheme: 'matrix',
      ambientSteam: true,
      rgbStripColor: '#10b981',
      posterTheme: 'linux_hack',
      windowRain: true,
      serverRackBlink: true,
      plantOnDesk: true,
      mugText: 'DEV'
    },
    character: {
      direction: 'front',
      appearance: {
        skinTone: 'warm_sand',
        hairStyle: 'messy_curly',
        hairColorHex: '#334155',
        eyeColorHex: '#10b981',
        facialHair: 'none',
        glasses: 'thick_square_nerd',
        glassesColorHex: '#0f172a',
        headset: 'over_ear_rgb',
        headsetColorHex: '#10b981',
        hat: 'none',
        hatColorHex: '#10b981'
      },
      wardrobe: {
        preset: 'tech_hoodie',
        primaryColor: '#064e3b',
        secondaryColor: '#022c22',
        accentColor: '#34d399',
        graphicOnShirt: 'terminal_prompt',
        watch: 'smart_watch',
        lanyardBadge: false
      },
      expression: 'focused_coding',
      viseme: 'silence',
      action: 'coding_furious',
      positionX: 45,
      positionY: 26,
      scale: 1.1
    },
    camera: {
      shot: 'over_shoulder_screen',
      zoom: 1.4,
      panX: -20,
      panY: 20,
      rotation: 0,
      shakeIntensity: 0,
      transition: 'cyber_glitch',
      depthOfFieldBlur: 2
    },
    lighting: {
      preset: 'matrix_green',
      keyLightColor: '#10b981',
      keyLightIntensity: 0.9,
      fillLightColor: '#064e3b',
      fillLightIntensity: 0.5,
      rimLightColor: '#34d399',
      rimLightIntensity: 0.8,
      vignetteStrength: 0.5,
      ambientGlowRadius: 30
    },
    hook: {
      enabled: true,
      text: 'SYSTEM KERNEL // ACTIVE',
      subText: 'MATRIX PROTOCOL',
      layer: 'in_front_of_character',
      style: 'cyberpunk_glitch_tag',
      primaryColor: '#052e16',
      secondaryColor: '#10b981',
      textColor: '#4ade80',
      fontSize: 22,
      positionY: 18,
      positionX: 50,
      animationType: 'glitch_shake'
    },
    caption: {
      enabled: true,
      style: 'cyberpunk_terminal',
      text: 'جاري بناء النواة البرمجية بسرعة فائقة مع مصفوفة الذاكرة',
      activeWordIndex: 0,
      words: [
        { word: 'جاري', startFrame: 0, endFrame: 15 },
        { word: 'بناء', startFrame: 16, endFrame: 30 },
        { word: 'النواة', startFrame: 31, endFrame: 45 },
        { word: 'البرمجية', startFrame: 46, endFrame: 60 },
        { word: 'بسرعة', startFrame: 61, endFrame: 75 },
        { word: 'فائقة!', startFrame: 76, endFrame: 90 }
      ],
      textColor: '#86efac',
      highlightColor: '#22c55e',
      backgroundColor: '#000000',
      fontSize: 16,
      positionY: 84,
      scatterSpread: 150
    }
  },
  {
    id: 'shot_3_eureka_close',
    title: '3. لقطة الاكتشاف (Close Up للوجه وفكرة عبقرية)',
    durationInFrames: 90,
    environment: {
      angle: 'low_angle',
      timeOfDay: 'sunset',
      showMonitorsCode: true,
      codeTheme: 'synthwave',
      ambientSteam: false,
      rgbStripColor: '#f97316',
      posterTheme: 'ai_neural',
      windowRain: false,
      serverRackBlink: true,
      plantOnDesk: false,
      mugText: 'DEV'
    },
    character: {
      direction: 'front',
      appearance: {
        skinTone: 'warm_sand',
        hairStyle: 'cyber_spiky',
        hairColorHex: '#1e293b',
        eyeColorHex: '#f59e0b',
        facialHair: 'designer_stubble',
        glasses: 'none',
        glassesColorHex: '#000000',
        headset: 'over_ear_rgb',
        headsetColorHex: '#f97316',
        hat: 'none',
        hatColorHex: '#f97316'
      },
      wardrobe: {
        preset: 'dev_flannel',
        primaryColor: '#b91c1c',
        secondaryColor: '#1e293b',
        accentColor: '#f59e0b',
        graphicOnShirt: 'coffee_cup',
        watch: 'digital_retro',
        lanyardBadge: true
      },
      expression: 'excited_idea',
      viseme: 'A_AH',
      action: 'point_up_idea',
      positionX: 50,
      positionY: 20,
      scale: 1.35
    },
    camera: {
      shot: 'close_up_face',
      zoom: 1.85,
      panX: 0,
      panY: 45,
      rotation: -3,
      shakeIntensity: 0,
      transition: 'smooth_zoom',
      depthOfFieldBlur: 3
    },
    lighting: {
      preset: 'sunset_golden',
      keyLightColor: '#fb923c',
      keyLightIntensity: 0.9,
      fillLightColor: '#831843',
      fillLightIntensity: 0.4,
      rimLightColor: '#fde047',
      rimLightIntensity: 0.85,
      vignetteStrength: 0.35,
      ambientGlowRadius: 40
    },
    hook: {
      enabled: true,
      text: 'وجدت الحل العبقري! 💡',
      subText: 'ALGORITHM SOLVED',
      layer: 'in_front_of_character',
      style: 'comic_pop_banner',
      primaryColor: '#facc15',
      secondaryColor: '#000000',
      textColor: '#000000',
      fontSize: 28,
      positionY: 16,
      positionX: 50,
      animationType: 'spring_pop'
    },
    caption: {
      enabled: true,
      style: 'bouncy_tiktok_badge',
      text: 'الخوارزمية الآن تعمل بكفاءة O(1) بنسبة 100%',
      activeWordIndex: 0,
      words: [
        { word: 'الخوارزمية', startFrame: 0, endFrame: 20 },
        { word: 'الآن', startFrame: 21, endFrame: 35 },
        { word: 'تعمل', startFrame: 36, endFrame: 50 },
        { word: 'بكفاءة', startFrame: 51, endFrame: 65 },
        { word: 'O(1) ⚡', startFrame: 66, endFrame: 90 }
      ],
      textColor: '#000000',
      highlightColor: '#facc15',
      backgroundColor: '#fde047',
      fontSize: 20,
      positionY: 82,
      scatterSpread: 120
    }
  },
  {
    id: 'shot_4_celebration',
    title: '4. لقطة الاحتفال والنشر (Top Down & احتفال النصر)',
    durationInFrames: 90,
    environment: {
      angle: 'top_down',
      timeOfDay: 'daylight',
      showMonitorsCode: true,
      codeTheme: 'vs_code_dark',
      ambientSteam: true,
      rgbStripColor: '#3b82f6',
      posterTheme: 'retro_gaming',
      windowRain: false,
      serverRackBlink: true,
      plantOnDesk: true,
      mugText: 'WIN'
    },
    character: {
      direction: 'front',
      appearance: {
        skinTone: 'warm_sand',
        hairStyle: 'messy_curly',
        hairColorHex: '#1e293b',
        eyeColorHex: '#0284c7',
        facialHair: 'designer_stubble',
        glasses: 'none',
        glassesColorHex: '#000000',
        headset: 'none',
        headsetColorHex: '#000000',
        hat: 'tech_snapback',
        hatColorHex: '#3b82f6'
      },
      wardrobe: {
        preset: 'minimalist_tee',
        primaryColor: '#2563eb',
        secondaryColor: '#1d4ed8',
        accentColor: '#ffffff',
        graphicOnShirt: 'react_atom',
        watch: 'smart_watch',
        lanyardBadge: true
      },
      expression: 'happy',
      viseme: 'E_EE',
      action: 'celebration_victory',
      positionX: 50,
      positionY: 28,
      scale: 1.2
    },
    camera: {
      shot: 'top_down_desk',
      zoom: 1.1,
      panX: 0,
      panY: 0,
      rotation: 0,
      shakeIntensity: 1.5,
      transition: 'slide_horizontal',
      depthOfFieldBlur: 0
    },
    lighting: {
      preset: 'clean_daylight',
      keyLightColor: '#ffffff',
      keyLightIntensity: 0.95,
      fillLightColor: '#bfdbfe',
      fillLightIntensity: 0.45,
      rimLightColor: '#93c5fd',
      rimLightIntensity: 0.6,
      vignetteStrength: 0.15,
      ambientGlowRadius: 20
    },
    hook: {
      enabled: true,
      text: 'تم النشر بنجاح! 🚀',
      subText: 'BUILD PASSING 100%',
      layer: 'in_front_of_character',
      style: 'neon_glowing_sign',
      primaryColor: '#10b981',
      secondaryColor: '#047857',
      textColor: '#a7f3d0',
      fontSize: 26,
      positionY: 20,
      positionX: 50,
      animationType: 'pulsing_glow'
    },
    caption: {
      enabled: true,
      style: 'karaoke_highlight',
      text: 'شكراً لمتابعتكم لا تنسوا الاشتراك وتجربة الكود في ريموشن',
      activeWordIndex: 0,
      words: [
        { word: 'شكراً', startFrame: 0, endFrame: 15 },
        { word: 'لمتابعتكم', startFrame: 16, endFrame: 30 },
        { word: 'لا', startFrame: 31, endFrame: 40 },
        { word: 'تنسوا', startFrame: 41, endFrame: 50 },
        { word: 'الاشتراك', startFrame: 51, endFrame: 65 },
        { word: 'وتجربة', startFrame: 66, endFrame: 75 },
        { word: 'ريموشن! 🔥', startFrame: 76, endFrame: 90 }
      ],
      textColor: '#ffffff',
      highlightColor: '#38bdf8',
      backgroundColor: 'rgba(15, 23, 42, 0.85)',
      fontSize: 18,
      positionY: 82,
      scatterSpread: 140
    }
  }
];
