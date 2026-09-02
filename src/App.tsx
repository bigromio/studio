import React, { useState, useEffect, useRef } from 'react';
import { 
  StudioSceneShot, 
  RoomAngle, 
  TimeOfDay, 
  CharacterDirection, 
  FacialExpression, 
  VisemeType, 
  HairStyleId, 
  SkinToneId, 
  OutfitPresetId, 
  ActionId, 
  CameraShotType, 
  CameraTransitionType, 
  LightingPresetId, 
  HookLayer, 
  HookStyleId, 
  CaptionStyleId 
} from './CartoonEngine/types';
import { INITIAL_STUDIO_SHOTS } from './CartoonEngine/defaultProject';
import { CartoonPresenterVideo } from './CartoonEngine/CartoonPresenterVideo';
import { ACTION_LIBRARY } from './CartoonEngine/Actions/actionDefinitions';
import { WARDROBE_PRESETS } from './CartoonEngine/Wardrobe/presets';
import { CAMERA_PRESETS, CAMERA_TRANSITIONS } from './CartoonEngine/Camera/cameraPresets';
import { LIGHTING_PRESETS } from './CartoonEngine/Lighting/lightingPresets';
import { HOOK_PRESETS, CAPTION_PRESETS } from './CartoonEngine/Typography/presets';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Repeat, 
  Video, 
  Monitor, 
  User, 
  Shirt, 
  Activity, 
  Camera, 
  Sun, 
  Type, 
  Layers, 
  Plus, 
  Trash2, 
  Copy, 
  Download, 
  Check, 
  Sparkles, 
  Volume2, 
  Code, 
  Smartphone, 
  Tv, 
  Square,
  Wand2,
  RefreshCw
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function App() {
  // Studio Timeline State
  const [shots, setShots] = useState<StudioSceneShot[]>(INITIAL_STUDIO_SHOTS);
  const [activeShotIndex, setActiveShotIndex] = useState<number>(0);
  const [currentFrame, setCurrentFrame] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [fps, setFps] = useState<number>(30);
  const [aspectRatio, setAspectRatio] = useState<'16:9' | '9:16' | '1:1'>('16:9');
  const [playSequenceMode, setPlaySequenceMode] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'environment' | 'character' | 'wardrobe' | 'actions' | 'camera' | 'lighting' | 'typography'>('environment');
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [showExportModal, setShowExportModal] = useState<boolean>(false);

  const activeShot = shots[activeShotIndex] || shots[0];
  const totalShotFrames = activeShot?.durationInFrames || 90;

  // Animation Loop / Remotion Frame Driver
  useEffect(() => {
    let animationFrameId: number;
    let lastTime = performance.now();
    const frameInterval = 1000 / fps;

    const tick = (now: number) => {
      if (isPlaying) {
        const elapsed = now - lastTime;
        if (elapsed >= frameInterval) {
          lastTime = now - (elapsed % frameInterval);

          setCurrentFrame((prev) => {
            if (prev + 1 >= totalShotFrames) {
              if (playSequenceMode && activeShotIndex + 1 < shots.length) {
                setActiveShotIndex((idx) => idx + 1);
                return 0;
              }
              return 0; // loop
            }
            return prev + 1;
          });
        }
      }
      animationFrameId = requestAnimationFrame(tick);
    };

    animationFrameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPlaying, fps, totalShotFrames, playSequenceMode, activeShotIndex, shots.length]);

  // Helper to update current active shot
  const updateActiveShot = (updater: (prev: StudioSceneShot) => StudioSceneShot) => {
    setShots((prevShots) => {
      const updated = [...prevShots];
      updated[activeShotIndex] = updater(updated[activeShotIndex]);
      return updated;
    });
  };

  // Trigger celebration confetti when celebration action chosen
  const triggerCelebration = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  // Keyboard shortcut listener (Spacebar for Play/Pause)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' && (e.target as HTMLElement).tagName !== 'INPUT' && (e.target as HTMLElement).tagName !== 'TEXTAREA') {
        e.preventDefault();
        setIsPlaying((p) => !p);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Aspect Ratio Dimensions calculation
  const getAspectRatioClasses = () => {
    if (aspectRatio === '9:16') {
      return 'w-[360px] h-[640px] max-h-[75vh]';
    }
    if (aspectRatio === '1:1') {
      return 'w-[520px] h-[520px] max-h-[75vh]';
    }
    // 16:9 Landscape
    return 'w-full max-w-[860px] aspect-video max-h-[75vh]';
  };

  // Remotion project code generator
  const generateRemotionCode = () => {
    return `import { Composition, useCurrentFrame, useVideoConfig } from 'remotion';
import { CartoonPresenterVideo } from './CartoonEngine/CartoonPresenterVideo';
import { StudioSceneShot } from './CartoonEngine/types';

// Exported Active Scene Configuration from Cartoon Studio
export const mySceneConfig: StudioSceneShot = ${JSON.stringify(activeShot, null, 2)};

export const CartoonScene = () => {
  const frame = useCurrentFrame();
  return <CartoonPresenterVideo shot={mySceneConfig} frame={frame} />;
};

export const RemotionRoot = () => {
  return (
    <Composition
      id="CartoonPresenterScene"
      component={CartoonScene}
      durationInFrames={${activeShot.durationInFrames}}
      fps={${fps}}
      width={${aspectRatio === '16:9' ? 1920 : aspectRatio === '9:16' ? 1080 : 1080}}
      height={${aspectRatio === '16:9' ? 1080 : aspectRatio === '9:16' ? 1920 : 1080}}
    />
  );
};`;
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(generateRemotionCode());
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-[#0F0F12] text-white font-sans overflow-hidden select-none">
      
      {/* 1. TOP STUDIO HEADER */}
      <header className="h-14 bg-[#16161D] border-b border-[#2D2D33] flex items-center justify-between px-6 z-50 shrink-0">
        <div className="flex items-center space-x-3.5 rtl:space-x-reverse">
          <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center font-black text-sm italic text-white shadow-md shadow-orange-600/30">
            RE
          </div>
          <div>
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <h1 className="text-sm font-bold tracking-tight text-white">
                CartoonEngine <span className="text-gray-500 font-normal">/ src / Studio</span>
              </h1>
              <span className="text-[9px] font-mono bg-orange-950/60 text-orange-400 border border-orange-800/80 px-2 py-0.5 rounded uppercase tracking-wider font-semibold">
                Remotion v4.0
              </span>
            </div>
            <p className="text-[10px] text-gray-500 uppercase tracking-widest font-medium">Professional Animator Workspace</p>
          </div>
        </div>

        {/* Center Controls: Aspect Ratio & FPS */}
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          {/* Aspect Ratio selector */}
          <div className="flex items-center bg-[#1F1F26] p-1 rounded-lg border border-[#2D2D33] text-xs">
            <button
              id="ratio-16-9-btn"
              onClick={() => setAspectRatio('16:9')}
              className={`flex items-center space-x-1.5 rtl:space-x-reverse px-3 py-1 rounded-md transition-all ${aspectRatio === '16:9' ? 'bg-orange-600 text-white font-bold shadow-sm' : 'text-gray-400 hover:text-white'}`}
              title="16:9 YouTube Landscape"
            >
              <Tv className="w-3.5 h-3.5" />
              <span>16:9</span>
            </button>
            <button
              id="ratio-9-16-btn"
              onClick={() => setAspectRatio('9:16')}
              className={`flex items-center space-x-1.5 rtl:space-x-reverse px-3 py-1 rounded-md transition-all ${aspectRatio === '9:16' ? 'bg-orange-600 text-white font-bold shadow-sm' : 'text-gray-400 hover:text-white'}`}
              title="9:16 TikTok / Reels Vertical"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>9:16</span>
            </button>
            <button
              id="ratio-1-1-btn"
              onClick={() => setAspectRatio('1:1')}
              className={`flex items-center space-x-1.5 rtl:space-x-reverse px-3 py-1 rounded-md transition-all ${aspectRatio === '1:1' ? 'bg-orange-600 text-white font-bold shadow-sm' : 'text-gray-400 hover:text-white'}`}
              title="1:1 Square"
            >
              <Square className="w-3.5 h-3.5" />
              <span>1:1</span>
            </button>
          </div>

          {/* FPS Selector */}
          <div className="flex items-center space-x-1 rtl:space-x-reverse bg-[#1F1F26] px-2 py-1 rounded-lg border border-[#2D2D33] text-xs">
            <span className="text-gray-500 text-[10px] uppercase font-mono tracking-wider">FPS:</span>
            {[24, 30, 60].map((f) => (
              <button
                key={f}
                onClick={() => setFps(f)}
                className={`px-2 py-0.5 rounded text-[11px] font-mono transition-colors ${fps === f ? 'bg-orange-600 text-white font-bold' : 'text-gray-400 hover:text-white'}`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Right Actions: Export / Remotion Code */}
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <div className="hidden lg:flex items-center space-x-2 bg-[#1F1F26] p-1 rounded-md border border-[#2D2D33] text-xs">
            <button className="px-3 py-1 text-xs bg-[#2D2D33] text-white rounded shadow-sm">Studio</button>
            <button className="px-3 py-1 text-xs text-gray-400 hover:text-white transition-colors">Timeline</button>
            <button className="px-3 py-1 text-xs text-gray-400 hover:text-white transition-colors">Inspector</button>
          </div>
          <button
            id="export-code-btn"
            onClick={() => setShowExportModal(true)}
            className="flex items-center space-x-1.5 rtl:space-x-reverse bg-orange-600 hover:bg-orange-500 text-white text-xs font-semibold px-4 py-1.5 rounded-md shadow-md shadow-orange-600/20 transition-all cursor-pointer"
          >
            <Code className="w-4 h-4" />
            <span>كود ريموشن (Export)</span>
          </button>
        </div>
      </header>

      {/* 2. MAIN WORKSPACE (STAGE + DIRECTOR CONTROLS) */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* LEFT / CENTER: REMOTION PREVIEW STAGE & TIMELINE */}
        <div className="flex-1 flex flex-col bg-[#0A0A0E] border-r border-[#2D2D33] overflow-hidden">
          
          {/* Video Preview Canvas Stage */}
          <div className="flex-1 flex items-center justify-center p-5 overflow-hidden relative bg-gradient-to-br from-[#1A1A24] to-[#0A0A0E]">
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
            
            {/* Stage Frame */}
            <div className={`relative shadow-[0_25px_60px_rgba(0,0,0,0.9)] rounded-xl overflow-hidden border border-[#2D2D33] bg-[#121218] flex items-center justify-center transition-all ${getAspectRatioClasses()}`}>
              {/* Studio Recording Status Badge */}
              <div className="absolute top-3 left-3 z-30 flex items-center space-x-2 rtl:space-x-reverse bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 text-[10px] font-mono">
                <span className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-red-500 animate-pulse' : 'bg-orange-500'}`}></span>
                <span className="text-gray-300 font-semibold">{isPlaying ? 'PLAY' : 'PAUSED'} • {String(Math.floor(currentFrame / fps)).padStart(2, '0')}:{String(currentFrame % fps).padStart(2, '0')}</span>
              </div>
              
              {activeShot && <CartoonPresenterVideo shot={activeShot} frame={currentFrame} />}
            </div>
          </div>

          {/* Scrubbable Remotion Timeline Player Bar */}
          <div className="h-32 bg-[#121218] border-t border-[#2D2D33] flex flex-col shrink-0">
            {/* Timeline Header bar */}
            <div className="flex items-center justify-between px-4 py-1.5 bg-[#16161D] border-b border-[#2D2D33]">
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <button className="text-xs text-orange-500 font-bold border-b-2 border-orange-500 pb-0.5">Timeline Tracks</button>
                <button className="text-xs text-gray-500 hover:text-gray-300 transition-colors">Motion Curves</button>
                <button className="text-xs text-gray-500 hover:text-gray-300 transition-colors">Remotion Visemes</button>
              </div>
              
              <div className="flex items-center space-x-3 rtl:space-x-reverse text-[11px] font-mono">
                <span className="text-orange-400 font-bold">{String(currentFrame).padStart(3, '0')}f</span>
                <span className="text-gray-500">/</span>
                <span className="text-gray-400">{String(totalShotFrames).padStart(3, '0')}f ({ (totalShotFrames / fps).toFixed(1) }s)</span>
              </div>
            </div>

            {/* Timeline Multi-Layer Visual Tracks Preview */}
            <div className="px-4 py-2 flex flex-col space-y-1.5 flex-1 justify-center bg-[#0F0F12]">
              {/* Scrubber slider line */}
              <div className="relative flex items-center mb-1">
                <input
                  id="timeline-scrubber"
                  type="range"
                  min="0"
                  max={totalShotFrames - 1}
                  value={currentFrame}
                  onChange={(e) => {
                    setCurrentFrame(Number(e.target.value));
                    setIsPlaying(false);
                  }}
                  className="w-full h-1.5 bg-[#1F1F26] rounded-lg appearance-none cursor-pointer accent-orange-500 focus:outline-none"
                />
              </div>

              {/* Layer Tracks */}
              <div className="grid grid-cols-12 gap-1.5 items-center">
                <div className="col-span-2 text-[10px] text-gray-400 font-mono truncate">Character Rig</div>
                <div className="col-span-10 h-3.5 bg-[#1F1F26] rounded border border-[#2D2D33] relative overflow-hidden">
                  <div className="absolute left-0 top-0 h-full bg-orange-600/30 border-r-2 border-orange-500" style={{ width: `${Math.min(100, (currentFrame / totalShotFrames) * 100)}%` }} />
                </div>

                <div className="col-span-2 text-[10px] text-gray-400 font-mono truncate">Environment 3D</div>
                <div className="col-span-10 h-3.5 bg-[#1F1F26] rounded border border-[#2D2D33] relative overflow-hidden">
                  <div className="absolute left-0 top-0 h-full w-full bg-blue-600/20 border-r-2 border-blue-500" />
                </div>
              </div>
            </div>

            {/* Playback Controls & Storyboard Shot Switcher Footer */}
            <div className="flex items-center justify-between px-4 py-1.5 bg-[#16161D] border-t border-[#2D2D33]">
              {/* Storyboard Shot Tabs */}
              <div className="flex items-center space-x-1.5 rtl:space-x-reverse overflow-x-auto py-0.5 max-w-lg">
                {shots.map((shot, idx) => (
                  <button
                    key={shot.id}
                    id={`shot-tab-${idx}`}
                    onClick={() => {
                      setActiveShotIndex(idx);
                      setCurrentFrame(0);
                    }}
                    className={`px-3 py-1 rounded text-xs transition-all whitespace-nowrap flex items-center space-x-1.5 rtl:space-x-reverse border ${activeShotIndex === idx ? 'bg-orange-600 text-white font-bold border-orange-500 shadow-sm' : 'bg-[#1F1F26] text-gray-300 border-[#2D2D33] hover:bg-[#2A2A33]'}`}
                  >
                    <span>{shot.title}</span>
                  </button>
                ))}
              </div>

              {/* Center Playback Buttons */}
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <button
                  id="prev-frame-btn"
                  onClick={() => setCurrentFrame((f) => Math.max(0, f - 1))}
                  className="p-1.5 bg-[#1F1F26] hover:bg-[#2A2A33] border border-[#2D2D33] rounded text-gray-300 transition"
                  title="Previous Frame"
                >
                  <SkipBack className="w-3.5 h-3.5" />
                </button>
                <button
                  id="play-pause-btn"
                  onClick={() => setIsPlaying((p) => !p)}
                  className="p-1.5 px-3 bg-orange-600 hover:bg-orange-500 text-white rounded font-bold shadow-md shadow-orange-600/30 transition transform hover:scale-105 flex items-center space-x-1"
                  title="Spacebar to Play/Pause"
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 translate-x-0.5" />}
                  <span className="text-xs">{isPlaying ? 'إيقاف' : 'تشغيل'}</span>
                </button>
                <button
                  id="next-frame-btn"
                  onClick={() => setCurrentFrame((f) => Math.min(totalShotFrames - 1, f + 1))}
                  className="p-1.5 bg-[#1F1F26] hover:bg-[#2A2A33] border border-[#2D2D33] rounded text-gray-300 transition"
                  title="Next Frame"
                >
                  <SkipForward className="w-3.5 h-3.5" />
                </button>
                <button
                  id="sequence-mode-btn"
                  onClick={() => setPlaySequenceMode((s) => !s)}
                  className={`p-1.5 px-2 rounded text-xs transition flex items-center space-x-1 rtl:space-x-reverse border ${playSequenceMode ? 'bg-orange-600/20 text-orange-300 border-orange-500/60' : 'bg-[#1F1F26] border-[#2D2D33] text-gray-400'}`}
                  title="تشغيل المشاهد بالتتابع (Continuous Sequence)"
                >
                  <Repeat className="w-3 h-3" />
                  <span className="text-[10px]">{playSequenceMode ? 'سلسلة متتابعة' : 'تكرار المشهد'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: STUDIO DIRECTOR CONTROL DECK (INSPECTOR) */}
        <div className="w-[420px] bg-[#121218] flex flex-col border-l border-[#2D2D33] shrink-0">
          
          {/* Inspector Header */}
          <div className="p-3 border-b border-[#2D2D33] bg-[#16161D] flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400">Asset & Director Inspector</h3>
            <span className="text-[10px] text-orange-400 font-mono">SHOT #{activeShotIndex + 1}</span>
          </div>

          {/* Inspector Navigation Tabs */}
          <div className="flex items-center border-b border-[#2D2D33] bg-[#16161D]/80 p-1.5 overflow-x-auto space-x-1 rtl:space-x-reverse">
            {[
              { id: 'environment', label: 'البيئة', icon: Monitor },
              { id: 'character', label: 'الشخصية', icon: User },
              { id: 'wardrobe', label: 'اللبس', icon: Shirt },
              { id: 'actions', label: 'الحركات', icon: Activity },
              { id: 'camera', label: 'الكاميرا', icon: Camera },
              { id: 'lighting', label: 'الإضاءة', icon: Sun },
              { id: 'typography', label: 'النصوص', icon: Type }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  id={`tab-${tab.id}`}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-1 rtl:space-x-reverse px-2.5 py-1.5 rounded text-xs font-semibold whitespace-nowrap transition-all border ${isActive ? 'bg-orange-600 text-white border-orange-500 shadow-sm' : 'bg-[#1F1F26] text-gray-400 border-[#2D2D33] hover:text-white hover:bg-[#2A2A33]'}`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Inspector Content Panel */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6 text-xs custom-scrollbar bg-[#121218]">
            
            {/* 1. ENVIRONMENT TAB */}
            {activeTab === 'environment' && (
              <div className="space-y-4">
                <div className="border-b border-[#2D2D33] pb-2">
                  <h3 className="font-bold text-white text-sm flex items-center space-x-2 rtl:space-x-reverse">
                    <Monitor className="w-4 h-4 text-orange-400" />
                    <span>زوايا الغرفة وبيئة المبرمج (5 Perspectives)</span>
                  </h3>
                  <p className="text-gray-400 text-[11px] mt-0.5">اختر زاوية تصوير الغرفة والوقت ومحتوى الشاشات</p>
                </div>

                {/* 5 Angles Selector */}
                <div>
                  <label className="text-gray-400 text-[10px] uppercase tracking-wider font-bold block mb-2">زاوية الغرفة (Room Angle):</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'front', name: 'أمامية مباشرة (Front)', desc: 'المكتب والشاشات الكبيرة' },
                      { id: 'right_45', name: 'زاوية يمنى 45°', desc: 'بروفايل المكتب واللوحات' },
                      { id: 'left_45', name: 'زاوية يسرى 45°', desc: 'برج السيرفر والنافذة' },
                      { id: 'top_down', name: 'عمودية من الأعلى', desc: 'كيبورد ميكانيكي وماوس باد' },
                      { id: 'low_angle', name: 'سفلية أرضية (Hero)', desc: 'من الأرض باتجاه الشاشات' }
                    ].map((ang) => (
                      <button
                        key={ang.id}
                        id={`angle-btn-${ang.id}`}
                        onClick={() => updateActiveShot(s => ({
                          ...s,
                          environment: { ...s.environment, angle: ang.id as RoomAngle }
                        }))}
                        className={`p-2.5 rounded border text-right transition-all ${activeShot.environment.angle === ang.id ? 'bg-orange-600/20 border-orange-500 text-orange-300 font-bold shadow-sm' : 'bg-[#1F1F26] border-[#2D2D33] text-gray-300 hover:bg-[#2A2A33]'}`}
                      >
                        <div className="font-bold text-xs">{ang.name}</div>
                        <div className="text-[10px] opacity-70 mt-0.5">{ang.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Time of Day */}
                <div>
                  <label className="text-gray-400 text-[10px] uppercase tracking-wider font-bold block mb-2">الوقت وأجواء النافذة:</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'cyberpunk_night', name: 'ليلة سايبربانك 🌌' },
                      { id: 'midnight', name: 'منتصف الليل 🌙' },
                      { id: 'sunset', name: 'وقت الغروب 🌇' },
                      { id: 'daylight', name: 'ضوء النهار ☀️' }
                    ].map((time) => (
                      <button
                        key={time.id}
                        onClick={() => updateActiveShot(s => ({
                          ...s,
                          environment: { ...s.environment, timeOfDay: time.id as TimeOfDay }
                        }))}
                        className={`p-2 rounded border text-center font-medium transition-colors ${activeShot.environment.timeOfDay === time.id ? 'bg-orange-600/20 border-orange-500 text-orange-300 font-bold' : 'bg-[#1F1F26] border-[#2D2D33] text-gray-300 hover:bg-[#2A2A33]'}`}
                      >
                        {time.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Monitors Code Theme */}
                <div>
                  <label className="text-gray-400 text-[10px] uppercase tracking-wider font-bold block mb-2">ثيم الكود على الشاشات:</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'vs_code_dark', name: 'VS Code Dark' },
                      { id: 'matrix', name: 'Matrix Terminal' },
                      { id: 'synthwave', name: 'Synthwave 80s' }
                    ].map((theme) => (
                      <button
                        key={theme.id}
                        onClick={() => updateActiveShot(s => ({
                          ...s,
                          environment: { ...s.environment, codeTheme: theme.id as any }
                        }))}
                        className={`p-2 rounded border text-center transition-colors ${activeShot.environment.codeTheme === theme.id ? 'bg-orange-600/20 border-orange-500 text-orange-300 font-bold' : 'bg-[#1F1F26] border-[#2D2D33] text-gray-300 hover:bg-[#2A2A33]'}`}
                      >
                        {theme.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* RGB Wall Strip Color */}
                <div>
                  <label className="text-gray-400 text-[10px] uppercase tracking-wider font-bold block mb-1.5">شريط إضاءة RGB على الجدار:</label>
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    {['#ea580c', '#ec4899', '#06b6d4', '#10b981', '#f59e0b', '#8b5cf6'].map((color) => (
                      <button
                        key={color}
                        onClick={() => updateActiveShot(s => ({
                          ...s,
                          environment: { ...s.environment, rgbStripColor: color }
                        }))}
                        className={`w-7 h-7 rounded-full border-2 transition-transform ${activeShot.environment.rgbStripColor === color ? 'scale-125 border-white shadow-lg' : 'border-[#2D2D33]'}`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>

                {/* Room Toggles */}
                <div className="space-y-2 pt-2 border-t border-[#2D2D33]">
                  <label className="flex items-center justify-between p-2.5 rounded bg-[#1F1F26] border border-[#2D2D33] cursor-pointer">
                    <span className="text-gray-300">بخار قهوة المطور (Steam)</span>
                    <input
                      type="checkbox"
                      checked={activeShot.environment.ambientSteam}
                      onChange={(e) => updateActiveShot(s => ({
                        ...s,
                        environment: { ...s.environment, ambientSteam: e.target.checked }
                      }))}
                      className="accent-orange-500 w-4 h-4"
                    />
                  </label>
                  <label className="flex items-center justify-between p-2.5 rounded bg-[#1F1F26] border border-[#2D2D33] cursor-pointer">
                    <span className="text-gray-300">أمطار على النافذة (Rain)</span>
                    <input
                      type="checkbox"
                      checked={activeShot.environment.windowRain}
                      onChange={(e) => updateActiveShot(s => ({
                        ...s,
                        environment: { ...s.environment, windowRain: e.target.checked }
                      }))}
                      className="accent-orange-500 w-4 h-4"
                    />
                  </label>
                </div>
              </div>
            )}

            {/* 2. CHARACTER TAB */}
            {activeTab === 'character' && (
              <div className="space-y-4">
                <div className="border-b border-[#2D2D33] pb-2">
                  <h3 className="font-bold text-white text-sm flex items-center space-x-2 rtl:space-x-reverse">
                    <User className="w-4 h-4 text-orange-400" />
                    <span>مكتبة ملامح واتجاهات الشخصية الكرتونية</span>
                  </h3>
                  <p className="text-gray-400 text-[11px] mt-0.5">تحكم في اتجاه الوجه، الشعر، العيون، والنظارات</p>
                </div>

                {/* Direction */}
                <div>
                  <label className="text-gray-400 text-[10px] uppercase tracking-wider font-bold block mb-2">اتجاه الشخصية (Direction):</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'front', name: 'أمام مباشر' },
                      { id: 'three_quarter_left', name: '3/4 يسار' },
                      { id: 'three_quarter_right', name: '3/4 يمين' },
                      { id: 'side_left', name: 'جانبي يسار' },
                      { id: 'side_right', name: 'جانبي يمين' },
                      { id: 'back', name: 'من الخلف' }
                    ].map((dir) => (
                      <button
                        key={dir.id}
                        onClick={() => updateActiveShot(s => ({
                          ...s,
                          character: { ...s.character, direction: dir.id as CharacterDirection }
                        }))}
                        className={`p-2 rounded border text-center text-xs transition-colors ${activeShot.character.direction === dir.id ? 'bg-orange-600/20 border-orange-500 text-orange-300 font-bold' : 'bg-[#1F1F26] border-[#2D2D33] text-gray-300 hover:bg-[#2A2A33]'}`}
                      >
                        {dir.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Hair Style */}
                <div>
                  <label className="text-gray-400 text-[10px] uppercase tracking-wider font-bold block mb-2">قصة ولون الشعر (Hair):</label>
                  <div className="grid grid-cols-2 gap-2 mb-2">
                    {[
                      { id: 'cyber_spiky', name: 'سبايكي سايبر ⚡' },
                      { id: 'messy_curly', name: 'كيرلي مبرمج فنان 🌀' },
                      { id: 'slick_fade', name: 'مصفف Fade أنيق 💈' },
                      { id: 'afro', name: 'أفرو مميز 🦁' },
                      { id: 'ponytail', name: 'ذيل حصان Ponytail 🎀' },
                      { id: 'bald_beard', name: 'أصلع مع لحية 🧔' }
                    ].map((hair) => (
                      <button
                        key={hair.id}
                        onClick={() => updateActiveShot(s => ({
                          ...s,
                          character: {
                            ...s.character,
                            appearance: { ...s.character.appearance, hairStyle: hair.id as HairStyleId }
                          }
                        }))}
                        className={`p-2 rounded border text-center transition-colors ${activeShot.character.appearance.hairStyle === hair.id ? 'bg-orange-600/20 border-orange-500 text-orange-300 font-bold' : 'bg-[#1F1F26] border-[#2D2D33] text-gray-300 hover:bg-[#2A2A33]'}`}
                      >
                        {hair.name}
                      </button>
                    ))}
                  </div>

                  {/* Hair Colors */}
                  <div className="flex items-center space-x-2 rtl:space-x-reverse pt-1">
                    <span className="text-gray-400 text-[11px]">لون الشعر:</span>
                    {['#1e293b', '#78350f', '#ea580c', '#d97706', '#06b6d4', '#f8fafc'].map((color) => (
                      <button
                        key={color}
                        onClick={() => updateActiveShot(s => ({
                          ...s,
                          character: {
                            ...s.character,
                            appearance: { ...s.character.appearance, hairColorHex: color }
                          }
                        }))}
                        className={`w-6 h-6 rounded-full border-2 ${activeShot.character.appearance.hairColorHex === color ? 'scale-125 border-white shadow' : 'border-[#2D2D33]'}`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>

                {/* Glasses / AR Goggles */}
                <div>
                  <label className="text-gray-400 text-[10px] uppercase tracking-wider font-bold block mb-2">النظارات والأقنعة الذكية:</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'none', name: 'بدون نظارة' },
                      { id: 'cyber_ar_visor', name: 'قناع AR مستقبلي 🥽' },
                      { id: 'thick_square_nerd', name: 'نظارة نيرد مربعة 👓' },
                      { id: 'retro_round', name: 'نظارة دائرية ريترو 🕶️' }
                    ].map((g) => (
                      <button
                        key={g.id}
                        onClick={() => updateActiveShot(s => ({
                          ...s,
                          character: {
                            ...s.character,
                            appearance: { ...s.character.appearance, glasses: g.id as any }
                          }
                        }))}
                        className={`p-2 rounded border text-center transition-colors ${activeShot.character.appearance.glasses === g.id ? 'bg-orange-600/20 border-orange-500 text-orange-300 font-bold' : 'bg-[#1F1F26] border-[#2D2D33] text-gray-300 hover:bg-[#2A2A33]'}`}
                      >
                        {g.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Headset & Accessories */}
                <div>
                  <label className="text-gray-400 text-[10px] uppercase tracking-wider font-bold block mb-2">سماعات الرأس (Headset):</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'over_ear_rgb', name: 'سماعة RGB 🎧' },
                      { id: 'airbuds', name: 'إيربودز لاسلكية' },
                      { id: 'none', name: 'بدون سماعة' }
                    ].map((h) => (
                      <button
                        key={h.id}
                        onClick={() => updateActiveShot(s => ({
                          ...s,
                          character: {
                            ...s.character,
                            appearance: { ...s.character.appearance, headset: h.id as any }
                          }
                        }))}
                        className={`p-2 rounded border text-center text-[11px] transition-colors ${activeShot.character.appearance.headset === h.id ? 'bg-orange-600/20 border-orange-500 text-orange-300 font-bold' : 'bg-[#1F1F26] border-[#2D2D33] text-gray-300 hover:bg-[#2A2A33]'}`}
                      >
                        {h.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 3. WARDROBE TAB */}
            {activeTab === 'wardrobe' && (
              <div className="space-y-4">
                <div className="border-b border-[#2D2D33] pb-2">
                  <h3 className="font-bold text-white text-sm flex items-center space-x-2 rtl:space-x-reverse">
                    <Shirt className="w-4 h-4 text-orange-400" />
                    <span>مكتبة اللبس والأزياء المتغيرة (Wardrobe)</span>
                  </h3>
                  <p className="text-gray-400 text-[11px] mt-0.5">مكتبة من هوديز ومعاطف وتيشيرتات المطورين</p>
                </div>

                {/* Outfit Presets */}
                <div>
                  <label className="text-gray-400 text-[10px] uppercase tracking-wider font-bold block mb-2">طراز اللباس (Outfit Preset):</label>
                  <div className="space-y-2">
                    {WARDROBE_PRESETS.map((outfit) => (
                      <button
                        key={outfit.id}
                        id={`outfit-btn-${outfit.id}`}
                        onClick={() => updateActiveShot(s => ({
                          ...s,
                          character: {
                            ...s.character,
                            wardrobe: {
                              ...s.character.wardrobe,
                              preset: outfit.id,
                              primaryColor: outfit.primaryColorDefault,
                              secondaryColor: outfit.secondaryColorDefault,
                              accentColor: outfit.accentColorDefault
                            }
                          }
                        }))}
                        className={`w-full p-2.5 rounded border text-right transition-all flex items-center justify-between ${activeShot.character.wardrobe.preset === outfit.id ? 'bg-orange-600/20 border-orange-500 text-orange-300 font-bold shadow-sm' : 'bg-[#1F1F26] border-[#2D2D33] text-gray-300 hover:bg-[#2A2A33]'}`}
                      >
                        <div>
                          <div className="font-bold text-xs">{outfit.nameAr}</div>
                          <div className="text-[10px] opacity-75 font-mono text-gray-400">{outfit.nameEn}</div>
                        </div>
                        <div className="flex space-x-1 rtl:space-x-reverse">
                          <span className="w-4 h-4 rounded-full border border-black/40" style={{ backgroundColor: outfit.primaryColorDefault }} />
                          <span className="w-4 h-4 rounded-full border border-black/40" style={{ backgroundColor: outfit.secondaryColorDefault }} />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Graphic on Shirt */}
                <div>
                  <label className="text-gray-400 text-[10px] uppercase tracking-wider font-bold block mb-2">شعار التيشيرت (Chest Graphic):</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'react_atom', name: 'شعار React ⚛️' },
                      { id: 'terminal_prompt', name: 'موجه الأوامر dev$' },
                      { id: 'coffee_cup', name: 'كوب قهوة ☕' },
                      { id: 'none', name: 'بدون رسمة' }
                    ].map((g) => (
                      <button
                        key={g.id}
                        onClick={() => updateActiveShot(s => ({
                          ...s,
                          character: {
                            ...s.character,
                            wardrobe: { ...s.character.wardrobe, graphicOnShirt: g.id as any }
                          }
                        }))}
                        className={`p-2 rounded border text-center transition-colors ${activeShot.character.wardrobe.graphicOnShirt === g.id ? 'bg-orange-600/20 border-orange-500 text-orange-300 font-bold' : 'bg-[#1F1F26] border-[#2D2D33] text-gray-300 hover:bg-[#2A2A33]'}`}
                      >
                        {g.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Lanyard Badge toggle */}
                <div className="pt-2 border-t border-[#2D2D33]">
                  <label className="flex items-center justify-between p-2.5 rounded bg-[#1F1F26] border border-[#2D2D33] cursor-pointer">
                    <span className="text-gray-300">بطاقة المؤتمر VIP Badge</span>
                    <input
                      type="checkbox"
                      checked={activeShot.character.wardrobe.lanyardBadge}
                      onChange={(e) => updateActiveShot(s => ({
                        ...s,
                        character: {
                          ...s.character,
                          wardrobe: { ...s.character.wardrobe, lanyardBadge: e.target.checked }
                        }
                      }))}
                      className="accent-orange-500 w-4 h-4"
                    />
                  </label>
                </div>
              </div>
            )}

            {/* 4. ACTIONS TAB */}
            {activeTab === 'actions' && (
              <div className="space-y-4">
                <div className="border-b border-[#2D2D33] pb-2">
                  <h3 className="font-bold text-white text-sm flex items-center space-x-2 rtl:space-x-reverse">
                    <Activity className="w-4 h-4 text-orange-400" />
                    <span>مكتبة الحركات والتعابير الوجهية (Actions & Visemes)</span>
                  </h3>
                  <p className="text-gray-400 text-[11px] mt-0.5">مكتبة ضخمة لحركات البرمجة، الشرح، والانفعالات</p>
                </div>

                {/* Actions Selector */}
                <div>
                  <label className="text-gray-400 text-[10px] uppercase tracking-wider font-bold block mb-2">الحركة (Character Action):</label>
                  <div className="space-y-2">
                    {ACTION_LIBRARY.map((action) => (
                      <button
                        key={action.id}
                        id={`action-btn-${action.id}`}
                        onClick={() => {
                          updateActiveShot(s => ({
                            ...s,
                            character: { ...s.character, action: action.id }
                          }));
                          if (action.id === 'celebration_victory') {
                            triggerCelebration();
                          }
                        }}
                        className={`w-full p-2.5 rounded border text-right transition-all ${activeShot.character.action === action.id ? 'bg-orange-600/20 border-orange-500 text-orange-300 font-bold shadow-sm' : 'bg-[#1F1F26] border-[#2D2D33] text-gray-300 hover:bg-[#2A2A33]'}`}
                      >
                        <div className="font-bold text-xs">{action.nameAr}</div>
                        <div className="text-[10px] opacity-75 font-mono text-gray-400">{action.nameEn}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Facial Expressions */}
                <div className="pt-2 border-t border-[#2D2D33]">
                  <label className="text-gray-400 text-[10px] uppercase tracking-wider font-bold block mb-2">التعابير الوجهية (Expression):</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'happy', name: 'سعيد ومبتسم 😊' },
                      { id: 'focused_coding', name: 'تركيز عميق 💻' },
                      { id: 'shocked_bug', name: 'صدمة خطأ برمجية 😱' },
                      { id: 'smug_genius', name: 'عبقري واثق 😏' },
                      { id: 'confused_debugging', name: 'حيرة في الديباجينج 🤔' },
                      { id: 'excited_idea', name: 'فكرة ملهمة 💡' },
                      { id: 'angry_syntax_error', name: 'غضب Syntax Error 😡' },
                      { id: 'wink', name: 'غمزة احترافية 😉' }
                    ].map((exp) => (
                      <button
                        key={exp.id}
                        onClick={() => updateActiveShot(s => ({
                          ...s,
                          character: { ...s.character, expression: exp.id as FacialExpression }
                        }))}
                        className={`p-2 rounded border text-center transition-colors ${activeShot.character.expression === exp.id ? 'bg-orange-600/20 border-orange-500 text-orange-300 font-bold' : 'bg-[#1F1F26] border-[#2D2D33] text-gray-300 hover:bg-[#2A2A33]'}`}
                      >
                        {exp.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Lip-Sync Visemes */}
                <div className="pt-2 border-t border-[#2D2D33]">
                  <label className="text-gray-400 text-[10px] uppercase tracking-wider font-bold block mb-2">حركة الفم والنطق (Lip-Sync Viseme):</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'silence', name: 'صمت (Silence)' },
                      { id: 'A_AH', name: 'A / AH (مفتوح)' },
                      { id: 'O_OH', name: 'O / OH (دائري)' },
                      { id: 'E_EE', name: 'E / EE (ابتسام)' },
                      { id: 'M_B_P', name: 'M / B / P (مغلق)' },
                      { id: 'F_V', name: 'F / V (أسنان)' }
                    ].map((vis) => (
                      <button
                        key={vis.id}
                        onClick={() => updateActiveShot(s => ({
                          ...s,
                          character: { ...s.character, viseme: vis.id as VisemeType }
                        }))}
                        className={`p-2 rounded border text-center text-[11px] transition-colors ${activeShot.character.viseme === vis.id ? 'bg-orange-600/20 border-orange-500 text-orange-300 font-bold' : 'bg-[#1F1F26] border-[#2D2D33] text-gray-300 hover:bg-[#2A2A33]'}`}
                      >
                        {vis.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 5. CAMERA TAB */}
            {activeTab === 'camera' && (
              <div className="space-y-4">
                <div className="border-b border-[#2D2D33] pb-2">
                  <h3 className="font-bold text-white text-sm flex items-center space-x-2 rtl:space-x-reverse">
                    <Camera className="w-4 h-4 text-orange-400" />
                    <span>محرك الكاميرا وزوايا التصوير والترانزشن</span>
                  </h3>
                  <p className="text-gray-400 text-[11px] mt-0.5">لقطات سينمائية مع اهتزاز درامي وزووم تفاعلي</p>
                </div>

                {/* Camera Shot Presets */}
                <div>
                  <label className="text-gray-400 text-[10px] uppercase tracking-wider font-bold block mb-2">لقطات الكاميرا الجاهزة (Shot Presets):</label>
                  <div className="space-y-2">
                    {CAMERA_PRESETS.map((preset) => (
                      <button
                        key={preset.id}
                        id={`camera-btn-${preset.id}`}
                        onClick={() => updateActiveShot(s => ({
                          ...s,
                          camera: {
                            ...s.camera,
                            shot: preset.id,
                            zoom: preset.zoom,
                            panX: preset.panX,
                            panY: preset.panY,
                            rotation: preset.rotation,
                            depthOfFieldBlur: preset.depthOfFieldBlur
                          }
                        }))}
                        className={`w-full p-2.5 rounded border text-right transition-all ${activeShot.camera.shot === preset.id ? 'bg-orange-600/20 border-orange-500 text-orange-300 font-bold shadow-sm' : 'bg-[#1F1F26] border-[#2D2D33] text-gray-300 hover:bg-[#2A2A33]'}`}
                      >
                        <div className="font-bold text-xs">{preset.nameAr}</div>
                        <div className="text-[10px] opacity-75 font-mono text-gray-400">{preset.nameEn}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Transitions */}
                <div className="pt-2 border-t border-[#2D2D33]">
                  <label className="text-gray-400 text-[10px] uppercase tracking-wider font-bold block mb-2">الانتقال السينمائي (Transitions Library):</label>
                  <div className="grid grid-cols-2 gap-2">
                    {CAMERA_TRANSITIONS.map((trans) => (
                      <button
                        key={trans.id}
                        onClick={() => updateActiveShot(s => ({
                          ...s,
                          camera: { ...s.camera, transition: trans.id }
                        }))}
                        className={`p-2 rounded border text-center transition-colors ${activeShot.camera.transition === trans.id ? 'bg-orange-600/20 border-orange-500 text-orange-300 font-bold' : 'bg-[#1F1F26] border-[#2D2D33] text-gray-300 hover:bg-[#2A2A33]'}`}
                      >
                        {trans.nameAr}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Camera Sliders (Zoom & Shake) */}
                <div className="space-y-3 pt-2 border-t border-[#2D2D33]">
                  <div>
                    <div className="flex justify-between text-gray-300 mb-1">
                      <span>تكبير الكاميرا (Zoom):</span>
                      <span className="font-mono text-orange-400">{activeShot.camera.zoom.toFixed(2)}x</span>
                    </div>
                    <input
                      type="range"
                      min="0.8"
                      max="3.0"
                      step="0.05"
                      value={activeShot.camera.zoom}
                      onChange={(e) => updateActiveShot(s => ({
                        ...s,
                        camera: { ...s.camera, zoom: Number(e.target.value) }
                      }))}
                      className="w-full accent-orange-500"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-gray-300 mb-1">
                      <span>اهتزاز الكاميرا (Shake Intensity):</span>
                      <span className="font-mono text-orange-400">{activeShot.camera.shakeIntensity}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="8"
                      step="0.5"
                      value={activeShot.camera.shakeIntensity}
                      onChange={(e) => updateActiveShot(s => ({
                        ...s,
                        camera: { ...s.camera, shakeIntensity: Number(e.target.value) }
                      }))}
                      className="w-full accent-orange-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* 6. LIGHTING TAB */}
            {activeTab === 'lighting' && (
              <div className="space-y-4">
                <div className="border-b border-[#2D2D33] pb-2">
                  <h3 className="font-bold text-white text-sm flex items-center space-x-2 rtl:space-x-reverse">
                    <Sun className="w-4 h-4 text-orange-400" />
                    <span>مكتبة الإضاءة الخاصة بالغرفة (Lighting Engine)</span>
                  </h3>
                  <p className="text-gray-400 text-[11px] mt-0.5">إضاءة نيون سايبربانك، إضاءة استديو، ووهج الحواف</p>
                </div>

                {/* Lighting Presets */}
                <div>
                  <label className="text-gray-400 text-[10px] uppercase tracking-wider font-bold block mb-2">قوالب الإضاءة الجاهزة (Lighting Presets):</label>
                  <div className="space-y-2">
                    {LIGHTING_PRESETS.map((light) => (
                      <button
                        key={light.id}
                        id={`lighting-btn-${light.id}`}
                        onClick={() => updateActiveShot(s => ({
                          ...s,
                          lighting: {
                            ...s.lighting,
                            preset: light.id,
                            keyLightColor: light.keyLightColor,
                            keyLightIntensity: light.keyLightIntensity,
                            fillLightColor: light.fillLightColor,
                            fillLightIntensity: light.fillLightIntensity,
                            rimLightColor: light.rimLightColor,
                            rimLightIntensity: light.rimLightIntensity,
                            vignetteStrength: light.vignetteStrength
                          }
                        }))}
                        className={`w-full p-2.5 rounded border text-right transition-all flex items-center justify-between ${activeShot.lighting.preset === light.id ? 'bg-orange-600/20 border-orange-500 text-orange-300 font-bold shadow-sm' : 'bg-[#1F1F26] border-[#2D2D33] text-gray-300 hover:bg-[#2A2A33]'}`}
                      >
                        <div>
                          <div className="font-bold text-xs">{light.nameAr}</div>
                          <div className="text-[10px] opacity-75 font-mono text-gray-400">{light.nameEn}</div>
                        </div>
                        <div className="flex space-x-1 rtl:space-x-reverse">
                          <span className="w-3.5 h-3.5 rounded-full shadow" style={{ backgroundColor: light.keyLightColor }} />
                          <span className="w-3.5 h-3.5 rounded-full shadow" style={{ backgroundColor: light.fillLightColor }} />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Vignette Slider */}
                <div className="pt-2 border-t border-[#2D2D33]">
                  <div className="flex justify-between text-gray-300 mb-1">
                    <span>تأثير التعتيم السينمائي (Vignette):</span>
                    <span className="font-mono text-orange-400">{(activeShot.lighting.vignetteStrength * 100).toFixed(0)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="0.8"
                    step="0.05"
                    value={activeShot.lighting.vignetteStrength}
                    onChange={(e) => updateActiveShot(s => ({
                      ...s,
                      lighting: { ...s.lighting, vignetteStrength: Number(e.target.value) }
                    }))}
                    className="w-full accent-orange-500"
                  />
                </div>
              </div>
            )}

            {/* 7. TYPOGRAPHY TAB (HOOKS & CAPTIONS) */}
            {activeTab === 'typography' && (
              <div className="space-y-6">
                
                {/* SECTION A: HOOK ENGINE */}
                <div className="space-y-3 bg-[#1F1F26]/60 p-3.5 rounded-lg border border-[#2D2D33]">
                  <div className="flex items-center justify-between border-b border-[#2D2D33] pb-2">
                    <div>
                      <h4 className="font-bold text-white text-xs flex items-center space-x-1.5 rtl:space-x-reverse">
                        <Type className="w-4 h-4 text-orange-400" />
                        <span>نصوص الهوك (Hook Text Engine)</span>
                      </h4>
                      <p className="text-[10px] text-gray-400">طبقة ثلاثية الأبعاد خلف أو أمام الشخصية</p>
                    </div>
                    <label className="flex items-center space-x-2 rtl:space-x-reverse cursor-pointer">
                      <input
                        type="checkbox"
                        checked={activeShot.hook.enabled}
                        onChange={(e) => updateActiveShot(s => ({
                          ...s,
                          hook: { ...s.hook, enabled: e.target.checked }
                        }))}
                        className="accent-orange-500 w-4 h-4"
                      />
                      <span className="text-[11px] font-semibold text-orange-400">تفعيل الهوك</span>
                    </label>
                  </div>

                  {/* Hook Text Input */}
                  <div>
                    <label className="text-gray-300 block mb-1 text-[11px]">نص الهوك الرئيسي:</label>
                    <input
                      type="text"
                      value={activeShot.hook.text}
                      onChange={(e) => updateActiveShot(s => ({
                        ...s,
                        hook: { ...s.hook, text: e.target.value }
                      }))}
                      className="w-full bg-[#121218] border border-[#2D2D33] rounded px-3 py-1.5 text-xs text-white focus:outline-none focus:border-orange-500"
                    />
                  </div>

                  {/* Hook Layer: Behind vs In Front */}
                  <div>
                    <label className="text-gray-300 block mb-1.5 text-[11px] font-bold">طبقة النص (3D Depth Layer):</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => updateActiveShot(s => ({
                          ...s,
                          hook: { ...s.hook, layer: 'behind_character' }
                        }))}
                        className={`p-2 rounded border text-center font-bold text-xs transition-colors ${activeShot.hook.layer === 'behind_character' ? 'bg-orange-600/20 border-orange-500 text-orange-300 shadow-sm' : 'bg-[#1F1F26] border-[#2D2D33] text-gray-300 hover:bg-[#2A2A33]'}`}
                      >
                        خلف الشخصية (3D Depth)
                      </button>
                      <button
                        onClick={() => updateActiveShot(s => ({
                          ...s,
                          hook: { ...s.hook, layer: 'in_front_of_character' }
                        }))}
                        className={`p-2 rounded border text-center font-bold text-xs transition-colors ${activeShot.hook.layer === 'in_front_of_character' ? 'bg-orange-600/20 border-orange-500 text-orange-300 shadow-sm' : 'bg-[#1F1F26] border-[#2D2D33] text-gray-300 hover:bg-[#2A2A33]'}`}
                      >
                        أمام الشخصية (Foreground)
                      </button>
                    </div>
                  </div>

                  {/* Hook Styles */}
                  <div>
                    <label className="text-gray-300 block mb-1.5 text-[11px] font-bold">ستايل الهوك (Hook Style):</label>
                    <div className="grid grid-cols-2 gap-2">
                      {HOOK_PRESETS.map((hStyle) => (
                        <button
                          key={hStyle.id}
                          onClick={() => updateActiveShot(s => ({
                            ...s,
                            hook: {
                              ...s.hook,
                              style: hStyle.id,
                              primaryColor: hStyle.defaultPrimary,
                              secondaryColor: hStyle.defaultSecondary,
                              textColor: hStyle.defaultText
                            }
                          }))}
                          className={`p-2 rounded border text-center text-xs transition-colors ${activeShot.hook.style === hStyle.id ? 'bg-orange-600/20 border-orange-500 text-orange-300 font-bold' : 'bg-[#1F1F26] border-[#2D2D33] text-gray-300 hover:bg-[#2A2A33]'}`}
                        >
                          {hStyle.nameAr}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* SECTION B: CAPTION ENGINE */}
                <div className="space-y-3 bg-[#1F1F26]/60 p-3.5 rounded-lg border border-[#2D2D33]">
                  <div className="flex items-center justify-between border-b border-[#2D2D33] pb-2">
                    <div>
                      <h4 className="font-bold text-white text-xs flex items-center space-x-1.5 rtl:space-x-reverse">
                        <Type className="w-4 h-4 text-orange-400" />
                        <span>نصوص الكابشن والترجمة (Dynamic Captions)</span>
                      </h4>
                      <p className="text-[10px] text-gray-400">كاريوكي ملون أو كلمات مبعثرة حول الشخصية</p>
                    </div>
                    <label className="flex items-center space-x-2 rtl:space-x-reverse cursor-pointer">
                      <input
                        type="checkbox"
                        checked={activeShot.caption.enabled}
                        onChange={(e) => updateActiveShot(s => ({
                          ...s,
                          caption: { ...s.caption, enabled: e.target.checked }
                        }))}
                        className="accent-orange-500 w-4 h-4"
                      />
                      <span className="text-[11px] font-semibold text-orange-400">تفعيل الكابشن</span>
                    </label>
                  </div>

                  {/* Caption Styles */}
                  <div>
                    <label className="text-gray-300 block mb-1.5 text-[11px] font-bold">ستايل الكابشن (Caption Style):</label>
                    <div className="space-y-2">
                      {CAPTION_PRESETS.map((cStyle) => (
                        <button
                          key={cStyle.id}
                          id={`caption-style-${cStyle.id}`}
                          onClick={() => updateActiveShot(s => ({
                            ...s,
                            caption: {
                              ...s.caption,
                              style: cStyle.id,
                              highlightColor: cStyle.defaultHighlightColor,
                              textColor: cStyle.defaultTextColor
                            }
                          }))}
                          className={`w-full p-2.5 rounded border text-right transition-all ${activeShot.caption.style === cStyle.id ? 'bg-orange-600/20 border-orange-500 text-orange-300 font-bold shadow-sm' : 'bg-[#1F1F26] border-[#2D2D33] text-gray-300 hover:bg-[#2A2A33]'}`}
                        >
                          <div className="font-bold text-xs">{cStyle.nameAr}</div>
                          <div className="text-[10px] opacity-75 text-gray-400">{cStyle.description}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Caption Text Input */}
                  <div>
                    <label className="text-gray-300 block mb-1 text-[11px]">نص الكابشن (الكلام المنطوق):</label>
                    <textarea
                      rows={2}
                      value={activeShot.caption.text}
                      onChange={(e) => {
                        const newText = e.target.value;
                        const wordsArr = newText.split(' ').filter(Boolean).map((w, idx) => ({
                          word: w,
                          startFrame: idx * 12,
                          endFrame: (idx + 1) * 12,
                          color: '#ffffff'
                        }));
                        updateActiveShot(s => ({
                          ...s,
                          caption: { ...s.caption, text: newText, words: wordsArr }
                        }));
                      }}
                      className="w-full bg-[#121218] border border-[#2D2D33] rounded p-2 text-xs text-white focus:outline-none focus:border-orange-500"
                    />
                  </div>
                </div>

              </div>
            )}

          </div>

        </div>

      </div>

      {/* 3. EXPORT / REMOTION CODE MODAL */}
      {showExportModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6">
          <div className="bg-[#121218] border border-[#2D2D33] rounded-xl w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="p-4 border-b border-[#2D2D33] bg-[#16161D] flex items-center justify-between">
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <Code className="w-5 h-5 text-orange-400" />
                <h3 className="font-bold text-white text-sm">تصدير مشروع ريموشن (Remotion Composition)</h3>
              </div>
              <button
                onClick={() => setShowExportModal(false)}
                className="text-gray-400 hover:text-white text-lg font-mono px-2"
              >
                ✕
              </button>
            </div>
            
            <div className="p-4 overflow-y-auto flex-1 font-mono text-xs bg-[#0A0A0E] text-orange-300 p-4 border-y border-[#2D2D33] select-text">
              <pre className="whitespace-pre-wrap">{generateRemotionCode()}</pre>
            </div>

            <div className="p-4 bg-[#16161D] flex justify-between items-center">
              <span className="text-[11px] text-gray-400">يمكنك نسخ هذا الكود مباشرة داخل مشروع Remotion الخاص بك</span>
              <button
                id="copy-code-modal-btn"
                onClick={handleCopyCode}
                className="flex items-center space-x-1.5 rtl:space-x-reverse bg-orange-600 hover:bg-orange-500 text-white font-bold px-4 py-2 rounded transition cursor-pointer shadow-md shadow-orange-600/20"
              >
                {copiedCode ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copiedCode ? 'تم النسخ للحافظة!' : 'نسخ كود المشروع'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
