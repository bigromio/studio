import { ActionId } from '../types';

export interface ActionMetadata {
  id: ActionId;
  nameEn: string;
  nameAr: string;
  category: 'coding' | 'presenting' | 'emotion' | 'movement';
  description: string;
  defaultViseme: 'silence' | 'A_AH' | 'O_OH' | 'E_EE';
}

export const ACTION_LIBRARY: ActionMetadata[] = [
  {
    id: 'idle_breathing',
    nameEn: 'Idle Breathing & Blinking',
    nameAr: 'وقوف طبيعي مع تنفس',
    category: 'movement',
    description: 'Natural subtle breathing rhythm with occasional eye blinking and head micro-adjustments',
    defaultViseme: 'silence'
  },
  {
    id: 'coding_furious',
    nameEn: 'Furious Hackathon Coding',
    nameAr: 'كتابة كود سريعة وحماسية',
    category: 'coding',
    description: 'Hands rapidly tapping on mechanical keyboard with intense focused head bobbing',
    defaultViseme: 'silence'
  },
  {
    id: 'debugging_chin_rub',
    nameEn: 'Debugging Chin Rub',
    nameAr: 'تفكير وتحليل وحك الذقن',
    category: 'coding',
    description: 'One hand stroking chin thoughtfully while scanning the code monitor for bugs',
    defaultViseme: 'silence'
  },
  {
    id: 'facepalm_error',
    nameEn: 'Facepalm / Syntax Error',
    nameAr: 'صدمة وإمساك الرأس باليد',
    category: 'emotion',
    description: 'Slapping hand to forehead in despair after missing a semicolon or staging bug',
    defaultViseme: 'O_OH'
  },
  {
    id: 'explaining_two_hands',
    nameEn: 'Confident Presenter Hands',
    nameAr: 'شرح احترافي بكلتا اليدين',
    category: 'presenting',
    description: 'Expressive open palms moving rhythmically while explaining technical concepts',
    defaultViseme: 'A_AH'
  },
  {
    id: 'presenting_right_screen',
    nameEn: 'Point & Present Right Monitor',
    nameAr: 'إشارة وشرح للشاشة اليمنى',
    category: 'presenting',
    description: 'Right arm gesturing wide towards the code display to draw viewer attention',
    defaultViseme: 'E_EE'
  },
  {
    id: 'presenting_left_screen',
    nameEn: 'Point & Present Left Monitor',
    nameAr: 'إشارة وشرح للشاشة اليسرى',
    category: 'presenting',
    description: 'Left arm gesturing towards the server rack and left terminal display',
    defaultViseme: 'E_EE'
  },
  {
    id: 'point_up_idea',
    nameEn: 'Eureka / Lightbulb Idea!',
    nameAr: 'إشارة للأعلى (فكرة عبقرية)',
    category: 'emotion',
    description: 'Index finger pointing up sharply as an algorithm solution sparks',
    defaultViseme: 'A_AH'
  },
  {
    id: 'point_down_subscribe',
    nameEn: 'Point Down / Call to Action',
    nameAr: 'إشارة للأسفل (اشترك/رابط)',
    category: 'presenting',
    description: 'Both hands pointing downwards indicating description links and subscribe button',
    defaultViseme: 'silence'
  },
  {
    id: 'sip_coffee',
    nameEn: 'Sipping Programmer Coffee',
    nameAr: 'شرب رشفة قهوة المطور',
    category: 'movement',
    description: 'Lifting coffee mug to mouth, taking a warm energizing sip, then lowering',
    defaultViseme: 'silence'
  },
  {
    id: 'celebration_victory',
    nameEn: 'Code Works! Double Fist Pump',
    nameAr: 'احتفال بنجاح الكود ونشره',
    category: 'emotion',
    description: 'Both arms raised high in triumphant victory as all test suites pass green',
    defaultViseme: 'E_EE'
  },
  {
    id: 'typing_slow_think',
    nameEn: 'Slow Thoughtful Typing',
    nameAr: 'كتابة متمهلة مع تفكير',
    category: 'coding',
    description: 'Careful keystrokes while gazing up at the logic architecture',
    defaultViseme: 'silence'
  },
  {
    id: 'walk_left_to_right',
    nameEn: 'Walking Across Studio Room',
    nameAr: 'مشي عبر الغرفة',
    category: 'movement',
    description: 'Full walking gait moving dynamically across the programmer room',
    defaultViseme: 'silence'
  },
  {
    id: 'spin_in_chair',
    nameEn: 'Spinning in Ergonomic Chair',
    nameAr: 'دوران بالكرسي المتحرك',
    category: 'movement',
    description: 'Spinning 360 degrees on gaming chair in excitement',
    defaultViseme: 'E_EE'
  },
  {
    id: 'shocked_lean_back',
    nameEn: 'Shocked Lean Back',
    nameAr: 'قفز للوراء من هول المفاجأة',
    category: 'emotion',
    description: 'Leaning torso backwards in pure surprise',
    defaultViseme: 'O_OH'
  },
  {
    id: 'shrug_dont_know',
    nameEn: 'Developer Shrug ("It works on my machine")',
    nameAr: 'هز الأكتاف (شغال في جهازي!)',
    category: 'emotion',
    description: 'Both shoulders raised with open palms ("It works on my machine")',
    defaultViseme: 'silence'
  }
];
