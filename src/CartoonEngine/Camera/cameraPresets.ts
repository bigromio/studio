import { CameraShotType, CameraTransitionType } from '../types';

export interface CameraPresetDefinition {
  id: CameraShotType;
  nameEn: string;
  nameAr: string;
  zoom: number;
  panX: number;
  panY: number;
  rotation: number;
  depthOfFieldBlur: number;
  description: string;
}

export const CAMERA_PRESETS: CameraPresetDefinition[] = [
  {
    id: 'wide_room',
    nameEn: 'Wide Establishing Shot',
    nameAr: 'لقطة عامة واسعة للغرفة',
    zoom: 1.0,
    panX: 0,
    panY: 0,
    rotation: 0,
    depthOfFieldBlur: 0,
    description: 'Full overview showing the entire programmer setup, wall art, and ambient lights'
  },
  {
    id: 'medium_presenter',
    nameEn: 'Medium Presenter / Youtuber',
    nameAr: 'لقطة متوسطة (المقدم)',
    zoom: 1.45,
    panX: 0,
    panY: 30,
    rotation: 0,
    depthOfFieldBlur: 1,
    description: 'Standard presentation frame focusing on character chest gestures and face'
  },
  {
    id: 'close_up_face',
    nameEn: 'Close Up / Expressive Face',
    nameAr: 'لقطة قريبة للوجه والتعابير',
    zoom: 2.1,
    panX: 0,
    panY: 85,
    rotation: 0,
    depthOfFieldBlur: 3,
    description: 'High impact close-up showing lip sync visemes and eye emotions'
  },
  {
    id: 'extreme_close_up_eyes',
    nameEn: 'Extreme Close Up / Intense Eye Focus',
    nameAr: 'لقطة فائقة القرب للعينين (دراما)',
    zoom: 3.0,
    panX: 0,
    panY: 155,
    rotation: 0,
    depthOfFieldBlur: 5,
    description: 'Anime style dramatic zoom into character eyes during critical bug discoveries'
  },
  {
    id: 'over_shoulder_screen',
    nameEn: 'Over The Shoulder (OTS Code Screen)',
    nameAr: 'لقطة من خلف الكتف على الشاشة',
    zoom: 1.7,
    panX: 45,
    panY: 40,
    rotation: -4,
    depthOfFieldBlur: 2,
    description: 'Cinematic angle looking past character at active code scrolling on monitor'
  },
  {
    id: 'dutch_angle_dynamic',
    nameEn: 'Dutch Angle / Kinetic Tilt',
    nameAr: 'زاوية مائلة حماسية (Dutch Angle)',
    zoom: 1.3,
    panX: -20,
    panY: 20,
    rotation: 12,
    depthOfFieldBlur: 1,
    description: 'Tilted dynamic camera angle for high energy hooks and fast-paced tech intros'
  },
  {
    id: 'top_down_desk',
    nameEn: 'Top-Down Blueprint Focus',
    nameAr: 'لقطة عمودية من الأعلى للمكتب',
    zoom: 1.2,
    panX: 0,
    panY: 0,
    rotation: 0,
    depthOfFieldBlur: 0,
    description: 'Bird-eye top down framing centered on keyboard and desk hardware'
  },
  {
    id: 'low_angle_heroic',
    nameEn: 'Low Angle / Heroic Developer',
    nameAr: 'لقطة سفلية مهيبة (Heroic View)',
    zoom: 1.5,
    panX: 0,
    panY: -40,
    rotation: -6,
    depthOfFieldBlur: 2,
    description: 'Cinematic ground-up angle making the developer look monumental'
  }
];

export const CAMERA_TRANSITIONS: { id: CameraTransitionType; nameEn: string; nameAr: string }[] = [
  { id: 'cut', nameEn: 'Direct Hard Cut', nameAr: 'قطع مباشر (Cut)' },
  { id: 'smooth_zoom', nameEn: 'Smooth Gliding Zoom', nameAr: 'زووم ناعم تدريجي' },
  { id: 'whip_pan', nameEn: 'Fast Whip Pan', nameAr: 'حركة سريعة جانبية (Whip Pan)' },
  { id: 'blur_dissolve', nameEn: 'Cinematic Blur Dissolve', nameAr: 'تلاشي سينمائي مع ضبابية' },
  { id: 'cyber_glitch', nameEn: 'Cyber Matrix Glitch', nameAr: 'انتقال جليتش سايبر' },
  { id: 'flash_white', nameEn: 'Impact White Flash', nameAr: 'وميض ضوئي أبيض' },
  { id: 'slide_horizontal', nameEn: 'Smooth Push Slide', nameAr: 'انزلاق أفقي للأمام' }
];
