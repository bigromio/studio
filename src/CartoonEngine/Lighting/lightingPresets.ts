import { LightingPresetId } from '../types';

export interface LightingPresetDefinition {
  id: LightingPresetId;
  nameEn: string;
  nameAr: string;
  keyLightColor: string;
  keyLightIntensity: number;
  fillLightColor: string;
  fillLightIntensity: number;
  rimLightColor: string;
  rimLightIntensity: number;
  vignetteStrength: number;
  description: string;
}

export const LIGHTING_PRESETS: LightingPresetDefinition[] = [
  {
    id: 'cyberpunk_neon',
    nameEn: 'Cyberpunk Cyan & Magenta Neon',
    nameAr: 'إضاءة نيون سايبربانك (سماوي وفوشيا)',
    keyLightColor: '#06b6d4',
    keyLightIntensity: 0.8,
    fillLightColor: '#ec4899',
    fillLightIntensity: 0.6,
    rimLightColor: '#3b82f6',
    rimLightIntensity: 0.9,
    vignetteStrength: 0.45,
    description: 'High contrast futuristic neon with saturated electric blue key and hot pink fill'
  },
  {
    id: 'midnight_coder',
    nameEn: 'Midnight Warm Desk Lamp',
    nameAr: 'إضاءة منتصف الليل الدافئة',
    keyLightColor: '#f59e0b',
    keyLightIntensity: 0.7,
    fillLightColor: '#1e1b4b',
    fillLightIntensity: 0.4,
    rimLightColor: '#fbbf24',
    rimLightIntensity: 0.5,
    vignetteStrength: 0.6,
    description: 'Cozy late night coding atmosphere with focused amber incandescent glow'
  },
  {
    id: 'matrix_green',
    nameEn: 'Matrix Cyber Terminal Green',
    nameAr: 'إضاءة ماتريكس الخضراء الرقمية',
    keyLightColor: '#10b981',
    keyLightIntensity: 0.85,
    fillLightColor: '#064e3b',
    fillLightIntensity: 0.5,
    rimLightColor: '#34d399',
    rimLightIntensity: 0.8,
    vignetteStrength: 0.5,
    description: 'Phosphor green CRT glow reminiscent of classic cyber terminals and hacking'
  },
  {
    id: 'studio_3point',
    nameEn: 'Professional 3-Point Studio Light',
    nameAr: 'إضاءة استديو احترافية ثلاثية النقاط',
    keyLightColor: '#ffffff',
    keyLightIntensity: 0.9,
    fillLightColor: '#93c5fd',
    fillLightIntensity: 0.4,
    rimLightColor: '#fef08a',
    rimLightIntensity: 0.6,
    vignetteStrength: 0.2,
    description: 'Balanced broadcast studio lighting for crisp clear presentation clarity'
  },
  {
    id: 'red_alert_bug',
    nameEn: 'Production Red Alert Error',
    nameAr: 'إنذار أحمر حرج (خطأ الإنتاج)',
    keyLightColor: '#ef4444',
    keyLightIntensity: 0.9,
    fillLightColor: '#7f1d1d',
    fillLightIntensity: 0.7,
    rimLightColor: '#f87171',
    rimLightIntensity: 0.95,
    vignetteStrength: 0.65,
    description: 'Pulsing emergency red lighting for critical bug alarms and drama moments'
  },
  {
    id: 'sunset_golden',
    nameEn: 'Golden Hour Sunset Glow',
    nameAr: 'شمس الغروب الذهبية الدافئة',
    keyLightColor: '#fb923c',
    keyLightIntensity: 0.8,
    fillLightColor: '#831843',
    fillLightIntensity: 0.35,
    rimLightColor: '#fef08a',
    rimLightIntensity: 0.7,
    vignetteStrength: 0.3,
    description: 'Rich warm orange sun beams streaming through the programmer window'
  },
  {
    id: 'synthwave_purple',
    nameEn: '80s Synthwave Sunset Purple',
    nameAr: 'سينث ويف بنفسجي كلاسيكي',
    keyLightColor: '#a855f7',
    keyLightIntensity: 0.8,
    fillLightColor: '#f43f5e',
    fillLightIntensity: 0.5,
    rimLightColor: '#c084fc',
    rimLightIntensity: 0.75,
    vignetteStrength: 0.4,
    description: 'Retro 80s vaporwave aesthetic with deep violet shadows and laser magenta'
  },
  {
    id: 'clean_daylight',
    nameEn: 'Bright Morning Daylight',
    nameAr: 'ضوء النهار الطبيعي المشرق',
    keyLightColor: '#f8fafc',
    keyLightIntensity: 0.95,
    fillLightColor: '#e0f2fe',
    fillLightIntensity: 0.5,
    rimLightColor: '#ffffff',
    rimLightIntensity: 0.3,
    vignetteStrength: 0.1,
    description: 'Clear energizing natural morning light for optimistic tutorials'
  }
];
