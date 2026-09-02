import { CaptionStyleId, HookStyleId } from '../types';

export interface HookPresetDefinition {
  id: HookStyleId;
  nameEn: string;
  nameAr: string;
  defaultPrimary: string;
  defaultSecondary: string;
  defaultText: string;
  description: string;
}

export const HOOK_PRESETS: HookPresetDefinition[] = [
  {
    id: 'kinetic_3d_block',
    nameEn: '3D Kinetic Extruded Block',
    nameAr: 'نص مجسم ثلاثي الأبعاد 3D',
    defaultPrimary: '#f59e0b',
    defaultSecondary: '#78350f',
    defaultText: '#ffffff',
    description: 'High impact extruded 3D typography with cast drop-shadow'
  },
  {
    id: 'cyberpunk_glitch_tag',
    nameEn: 'Cyberpunk Glitch Hologram',
    nameAr: 'شعار سايبربانك جليتش',
    defaultPrimary: '#ec4899',
    defaultSecondary: '#06b6d4',
    defaultText: '#ffffff',
    description: 'Futuristic glowing cyber badge with RGB chromatic aberration'
  },
  {
    id: 'comic_pop_banner',
    nameEn: 'Comic Boom! Pop Banner',
    nameAr: 'شعار كوميك كرتوني بوب',
    defaultPrimary: '#ef4444',
    defaultSecondary: '#facc15',
    defaultText: '#000000',
    description: 'Explosive comic book burst with thick black outlines and halftone dots'
  },
  {
    id: 'bold_tech_slab',
    nameEn: 'Bold Tech Sans Slab',
    nameAr: 'عنوان تقني عريض وفاخر',
    defaultPrimary: '#3b82f6',
    defaultSecondary: '#1e3a8a',
    defaultText: '#ffffff',
    description: 'Clean modern developer typeface with sleek gradient backdrop'
  },
  {
    id: 'neon_glowing_sign',
    nameEn: 'Neon Nightclub Sign',
    nameAr: 'لافتة نيون مشعة متحركة',
    defaultPrimary: '#10b981',
    defaultSecondary: '#047857',
    defaultText: '#a7f3d0',
    description: 'Electric tube neon sign with soft glowing diffusion'
  },
  {
    id: 'matrix_hacker_badge',
    nameEn: 'Matrix Terminal Prompt',
    nameAr: 'موجه أوامر الماتريكس',
    defaultPrimary: '#052e16',
    defaultSecondary: '#22c55e',
    defaultText: '#4ade80',
    description: 'Dark terminal box with blinking green caret and monospace font'
  },
  {
    id: 'retro_vaporwave',
    nameEn: 'Retro Vaporwave Sunset',
    nameAr: 'نص فيبور ويف الثمانينات',
    defaultPrimary: '#8b5cf6',
    defaultSecondary: '#f43f5e',
    defaultText: '#fde047',
    description: 'Gradient chrome aesthetic with 80s arcade flair'
  },
  {
    id: 'clean_glass_pill',
    nameEn: 'Frosted Glass UI Pill',
    nameAr: 'كبسولة زجاجية انسيابية',
    defaultPrimary: 'rgba(255, 255, 255, 0.15)',
    defaultSecondary: 'rgba(255, 255, 255, 0.3)',
    defaultText: '#ffffff',
    description: 'Apple-like sleek translucent glassmorphic pill with blur'
  }
];

export interface CaptionPresetDefinition {
  id: CaptionStyleId;
  nameEn: string;
  nameAr: string;
  description: string;
  defaultHighlightColor: string;
  defaultTextColor: string;
}

export const CAPTION_PRESETS: CaptionPresetDefinition[] = [
  {
    id: 'karaoke_highlight',
    nameEn: 'Dynamic Word Karaoke',
    nameAr: 'كابشن كاريوكي متزامن كلمة بكلمة',
    description: 'Word-by-word synchronized color fill as the character speaks',
    defaultHighlightColor: '#facc15',
    defaultTextColor: '#ffffff'
  },
  {
    id: 'scattered_orbit',
    nameEn: 'Scattered Orbit Words Around Character',
    nameAr: 'كلمات مبعثرة عائمة حول الشخصية بأوزان وألوان',
    description: 'Dynamic words floating around the presenter with randomized sizes, colors and kinetic pop',
    defaultHighlightColor: '#38bdf8',
    defaultTextColor: '#f43f5e'
  },
  {
    id: 'bouncy_tiktok_badge',
    nameEn: 'Bouncy Viral Video Badge',
    nameAr: 'كابشن ريلز وتيك توك النطاط',
    description: 'High contrast yellow on black pill badge with snappy bounce animation',
    defaultHighlightColor: '#fde047',
    defaultTextColor: '#000000'
  },
  {
    id: 'cyberpunk_terminal',
    nameEn: 'Cyber Matrix Subtitles',
    nameAr: 'ترجمة مصفوفة سايبربانك خضراء',
    description: 'Monospace hacker prompt styled subtitles with blinking brackets',
    defaultHighlightColor: '#22c55e',
    defaultTextColor: '#86efac'
  },
  {
    id: 'minimalist_clean_subtitle',
    nameEn: 'Clean Broadcast Subtitle',
    nameAr: 'ترجمة تلفزيونية كلاسيكية نظيفة',
    description: 'Subtle dark backdrop with crisp sans-serif high readability typography',
    defaultHighlightColor: '#60a5fa',
    defaultTextColor: '#ffffff'
  },
  {
    id: 'comic_sound_bubble',
    nameEn: 'Comic Speech Balloon',
    nameAr: 'فقاعة حوار كوميك كرتونية',
    description: 'White speech bubble with pointer triangle pointing at the character mouth',
    defaultHighlightColor: '#ef4444',
    defaultTextColor: '#0f172a'
  }
];
