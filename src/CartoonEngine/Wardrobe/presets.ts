import { OutfitPresetId } from '../types';

export interface WardrobePresetDefinition {
  id: OutfitPresetId;
  nameEn: string;
  nameAr: string;
  primaryColorDefault: string;
  secondaryColorDefault: string;
  accentColorDefault: string;
  description: string;
}

export const WARDROBE_PRESETS: WardrobePresetDefinition[] = [
  {
    id: 'tech_hoodie',
    nameEn: 'Tech Oversized Hoodie',
    nameAr: 'هودي المطور الكلاسيكي',
    primaryColorDefault: '#1e293b',
    secondaryColorDefault: '#0f172a',
    accentColorDefault: '#38bdf8',
    description: 'Classic comfortable oversized developer hoodie with kangaroo pouch and drawstrings'
  },
  {
    id: 'cyberpunk_coat',
    nameEn: 'Cyberpunk Neon Trench',
    nameAr: 'معطف سايبربانك المستقبلي',
    primaryColorDefault: '#0f172a',
    secondaryColorDefault: '#2dd4bf',
    accentColorDefault: '#f43f5e',
    description: 'High-collar neon-trimmed high tech hacker coat with glowing circuits'
  },
  {
    id: 'dev_flannel',
    nameEn: 'Plaid Dev Flannel',
    nameAr: 'قميص الفلانيل المقلم',
    primaryColorDefault: '#b91c1c',
    secondaryColorDefault: '#1e293b',
    accentColorDefault: '#f59e0b',
    description: 'Rustic checkered button-down flannel over a white inner graphic tee'
  },
  {
    id: 'minimalist_tee',
    nameEn: 'Minimalist Clean Tee',
    nameAr: 'تيشيرت المطور البسيط',
    primaryColorDefault: '#0284c7',
    secondaryColorDefault: '#0369a1',
    accentColorDefault: '#ffffff',
    description: 'Crisp crew-neck t-shirt with developer logo badge on chest'
  },
  {
    id: 'silicon_valley_vest',
    nameEn: 'Startup Puffer Vest',
    nameAr: 'سترة ستارت اب فالي',
    primaryColorDefault: '#334155',
    secondaryColorDefault: '#64748b',
    accentColorDefault: '#10b981',
    description: 'Iconic tech founder fleece vest over long sleeve tee'
  },
  {
    id: 'retro_pixel_sweater',
    nameEn: 'Retro 8-Bit Knit',
    nameAr: 'كنزة البكسل الكلاسيكية',
    primaryColorDefault: '#7c3aed',
    secondaryColorDefault: '#ec4899',
    accentColorDefault: '#fbbf24',
    description: '1980s retro arcade pixel art knitted sweater'
  },
  {
    id: 'robotics_lab_suit',
    nameEn: 'AI & Robotics Lab Coat',
    nameAr: 'بالطو مختبر الذكاء الاصطناعي',
    primaryColorDefault: '#f8fafc',
    secondaryColorDefault: '#e2e8f0',
    accentColorDefault: '#3b82f6',
    description: 'Futuristic cleanroom laboratory coat with ID card clip'
  },
  {
    id: 'indie_hacker_jacket',
    nameEn: 'Bomber Jacket with Patches',
    nameAr: 'جاكيت بومبر الشارات',
    primaryColorDefault: '#15803d',
    secondaryColorDefault: '#166534',
    accentColorDefault: '#eab308',
    description: 'Flight bomber jacket loaded with open source framework badges'
  }
];
