import React, { useState, useRef } from 'react';
import { Player, PlayerRef } from '@remotion/player';
import { CartoonPresenterVideo } from './CartoonEngine/CartoonPresenterVideo';
import { SAMPLE_STUDIO_SHOTS } from './CartoonEngine/sampleScenes';
import { StudioSceneShot, RoomAngle, ActionId, FacialExpression, VisemeType, HairStyleId } from './CartoonEngine/types';
import {
  Play,
  Pause,
  RotateCcw,
  Film,
  Layers,
  Terminal,
  Copy,
  Check,
  Sparkles,
  Monitor,
  User,
  Shirt,
  Activity,
  Sun,
  Type,
  Camera
} from 'lucide-react';

export default function App() {
  const playerRef = useRef<PlayerRef>(null);
  const [shots, setShots] = useState<StudioSceneShot[]>(SAMPLE_STUDIO_SHOTS);
  const [selectedShotIndex, setSelectedShotIndex] = useState<number | 'all'>('all');
  const [copiedCLI, setCopiedCLI] = useState<boolean>(false);
  const [copiedJSON, setCopiedJSON] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'environment' | 'character' | 'wardrobe' | 'actions' | 'lighting' | 'typography'>('environment');

  const currentShot = selectedShotIndex === 'all' ? shots[0] : shots[selectedShotIndex];
  const totalDuration = selectedShotIndex === 'all'
    ? shots.reduce((acc, s) => acc + s.durationFrames, 0)
    : shots[selectedShotIndex].durationFrames;

  const updateCurrentShot = (updater: (prev: StudioSceneShot) => StudioSceneShot) => {
    const targetIdx = selectedShotIndex === 'all' ? 0 : selectedShotIndex;
    setShots((prev) => {
      const next = [...prev];
      next[targetIdx] = updater(next[targetIdx]);
      return next;
    });
  };

  const remotionCliCommand = `npx remotion render src/Root.tsx ${
    selectedShotIndex === 'all' ? 'CartoonPresenter' : `Shot_${selectedShotIndex + 1}_${shots[selectedShotIndex].id}`
  } out/video.mp4 --gl=angle`;

  const handleCopyCLI = () => {
    navigator.clipboard.writeText(remotionCliCommand);
    setCopiedCLI(true);
    setTimeout(() => setCopiedCLI(false), 2000);
  };

  const handleCopyJSON = () => {
    navigator.clipboard.writeText(JSON.stringify(selectedShotIndex === 'all' ? shots : currentShot, null, 2));
    setCopiedJSON(true);
    setTimeout(() => setCopiedJSON(false), 2000);
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-[#090d16] text-slate-100 font-sans overflow-hidden select-none">
      {/* 1. TOP STATUS BAR */}
      <header className="h-14 bg-[#0f172a] border-b border-slate-800 flex items-center justify-between px-6 z-30 shrink-0">
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center font-black text-sm text-white shadow-lg shadow-cyan-500/20">
            🎬
          </div>
          <div>
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <span className="font-bold text-sm tracking-tight text-white">CartoonEngine Studio</span>
              <span className="text-[10px] font-mono bg-cyan-950 text-cyan-400 border border-cyan-800 px-2 py-0.5 rounded font-semibold uppercase">
                1080x1920 (9:16)
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-mono">Remotion Pure Vector Engine</p>
          </div>
        </div>

        {/* Scene Selector */}
        <div className="flex items-center bg-slate-900/90 p-1 rounded-xl border border-slate-800 text-xs">
          <button
            id="shot-all-btn"
            onClick={() => setSelectedShotIndex('all')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              selectedShotIndex === 'all'
                ? 'bg-cyan-600 text-white font-bold shadow-md shadow-cyan-600/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Full Sequence ({totalDuration}f)
          </button>
          {shots.map((s, idx) => (
            <button
              key={s.id}
              id={`shot-btn-${idx}`}
              onClick={() => setSelectedShotIndex(idx)}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                selectedShotIndex === idx
                  ? 'bg-cyan-600 text-white font-bold shadow-md shadow-cyan-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Shot {idx + 1}: {s.name}
            </button>
          ))}
        </div>

        {/* CLI / Export action */}
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <button
            id="copy-json-btn"
            onClick={handleCopyJSON}
            className="flex items-center space-x-1.5 rtl:space-x-reverse bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium px-3 py-1.5 rounded-lg border border-slate-700 transition"
          >
            {copiedJSON ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedJSON ? 'Copied JSON' : 'Scene JSON'}</span>
          </button>
          <button
            id="copy-cli-btn"
            onClick={handleCopyCLI}
            className="flex items-center space-x-1.5 rtl:space-x-reverse bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-xs font-semibold px-4 py-1.5 rounded-lg shadow-md shadow-cyan-600/20 transition cursor-pointer"
          >
            {copiedCLI ? <Check className="w-4 h-4 text-emerald-300" /> : <Terminal className="w-4 h-4" />}
            <span>{copiedCLI ? 'Copied CLI Command!' : 'Remotion Render CLI'}</span>
          </button>
        </div>
      </header>

      {/* 2. MAIN WORKSPACE */}
      <div className="flex-1 flex overflow-hidden">
        {/* LEFT / CENTER: REMOTION PLAYER (1080x1920) */}
        <div className="flex-1 flex flex-col items-center justify-center p-6 bg-gradient-to-b from-[#0b0f19] to-[#040711] overflow-hidden relative">
          {/* Subtle grid background */}
          <div
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(rgba(56, 189, 248, 0.25) 1px, transparent 1px)',
              backgroundSize: '24px 24px'
            }}
          />

          {/* 1080x1920 Isolated Frame Container */}
          <div
            className="relative rounded-2xl overflow-hidden shadow-[0_20px_70px_rgba(0,0,0,0.8)] border-2 border-slate-800 bg-black flex items-center justify-center"
            style={{
              width: '380px',
              height: '675px', // 9:16 aspect ratio preview
              maxHeight: '82vh'
            }}
          >
            <Player
              ref={playerRef}
              component={CartoonPresenterVideo}
              inputProps={{
                shots: selectedShotIndex === 'all' ? shots : [shots[selectedShotIndex]],
                shot: selectedShotIndex === 'all' ? undefined : shots[selectedShotIndex]
              }}
              durationInFrames={totalDuration}
              compositionWidth={1080}
              compositionHeight={1920}
              fps={30}
              style={{
                width: '100%',
                height: '100%'
              }}
              controls
              autoPlay
              loop
            />
          </div>

          {/* Quick CLI helper banner */}
          <div className="mt-4 px-4 py-2 bg-slate-900/80 border border-slate-800 rounded-xl flex items-center space-x-3 text-xs font-mono text-slate-400">
            <span className="text-cyan-400 font-bold">CLI:</span>
            <code className="text-slate-300">{remotionCliCommand}</code>
          </div>
        </div>

        {/* RIGHT: LIVE INSPECTOR CONTROLS */}
        <div className="w-[380px] bg-[#0f172a] border-l border-slate-800 flex flex-col shrink-0">
          <div className="p-3 border-b border-slate-800 bg-[#0b0f19] flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Director Inspector</h3>
            <span className="text-[10px] font-mono text-cyan-400">
              {selectedShotIndex === 'all' ? 'Editing Shot 1' : `Editing Shot ${selectedShotIndex + 1}`}
            </span>
          </div>

          {/* Tabs */}
          <div className="flex items-center border-b border-slate-800 bg-[#0b0f19] p-1.5 overflow-x-auto space-x-1 rtl:space-x-reverse">
            {[
              { id: 'environment', label: 'البيئة', icon: Monitor },
              { id: 'character', label: 'الشخصية', icon: User },
              { id: 'wardrobe', label: 'اللبس', icon: Shirt },
              { id: 'actions', label: 'الحركات', icon: Activity },
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
                  className={`flex items-center space-x-1 rtl:space-x-reverse px-2.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all border ${
                    isActive
                      ? 'bg-cyan-600 text-white border-cyan-500 shadow-sm'
                      : 'bg-slate-800/80 text-slate-400 border-slate-700 hover:text-white'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Controls Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-5 text-xs text-slate-300">
            {/* 1. ENVIRONMENT */}
            {activeTab === 'environment' && (
              <div className="space-y-4">
                <div>
                  <label className="text-slate-400 font-bold uppercase tracking-wider text-[10px] block mb-2">
                    زاوية الغرفة (5 Angles):
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'front', name: 'أمامية مباشرة (Front)' },
                      { id: 'left_45', name: 'زاوية يسرى 45°' },
                      { id: 'right_45', name: 'زاوية يمنى 45°' },
                      { id: 'top_down', name: 'عمودية من الأعلى' },
                      { id: 'low_angle', name: 'سفلية أرضية (Heroic)' }
                    ].map((ang) => (
                      <button
                        key={ang.id}
                        onClick={() =>
                          updateCurrentShot((s) => ({
                            ...s,
                            environment: { ...s.environment, angle: ang.id as RoomAngle }
                          }))
                        }
                        className={`p-2 rounded-lg border text-right transition ${
                          currentShot.environment.angle === ang.id
                            ? 'bg-cyan-950/80 border-cyan-500 text-cyan-300 font-bold'
                            : 'bg-slate-900 border-slate-800 hover:bg-slate-800'
                        }`}
                      >
                        {ang.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-slate-400 font-bold uppercase tracking-wider text-[10px] block mb-2">
                    الوقت وأجواء النافذة:
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'midnight', name: 'منتصف الليل 🌙' },
                      { id: 'cyberpunk_night', name: 'سايبربانك 🌌' },
                      { id: 'sunset', name: 'غروب 🌇' },
                      { id: 'daylight', name: 'نهار ☀️' }
                    ].map((t) => (
                      <button
                        key={t.id}
                        onClick={() =>
                          updateCurrentShot((s) => ({
                            ...s,
                            environment: { ...s.environment, timeOfDay: t.id as any }
                          }))
                        }
                        className={`p-2 rounded-lg border text-center transition ${
                          currentShot.environment.timeOfDay === t.id
                            ? 'bg-cyan-950/80 border-cyan-500 text-cyan-300 font-bold'
                            : 'bg-slate-900 border-slate-800 hover:bg-slate-800'
                        }`}
                      >
                        {t.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-slate-400 font-bold uppercase tracking-wider text-[10px] block mb-2">
                    ثيم الكود على الشاشات:
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {['matrix', 'synthwave', 'vs_code_dark'].map((thm) => (
                      <button
                        key={thm}
                        onClick={() =>
                          updateCurrentShot((s) => ({
                            ...s,
                            environment: { ...s.environment, codeTheme: thm as any }
                          }))
                        }
                        className={`p-2 rounded-lg border text-center font-mono capitalize transition ${
                          currentShot.environment.codeTheme === thm
                            ? 'bg-cyan-950/80 border-cyan-500 text-cyan-300 font-bold'
                            : 'bg-slate-900 border-slate-800 hover:bg-slate-800'
                        }`}
                      >
                        {thm}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-800">
                  <label className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                    <span>بخار قهوة المطور (Steam)</span>
                    <input
                      type="checkbox"
                      checked={currentShot.environment.ambientSteam}
                      onChange={(e) =>
                        updateCurrentShot((s) => ({
                          ...s,
                          environment: { ...s.environment, ambientSteam: e.target.checked }
                        }))
                      }
                      className="accent-cyan-500 w-4 h-4"
                    />
                  </label>
                  <label className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                    <span>مطر على النافذة (Rain)</span>
                    <input
                      type="checkbox"
                      checked={currentShot.environment.windowRain}
                      onChange={(e) =>
                        updateCurrentShot((s) => ({
                          ...s,
                          environment: { ...s.environment, windowRain: e.target.checked }
                        }))
                      }
                      className="accent-cyan-500 w-4 h-4"
                    />
                  </label>
                </div>
              </div>
            )}

            {/* 2. CHARACTER */}
            {activeTab === 'character' && (
              <div className="space-y-4">
                <div>
                  <label className="text-slate-400 font-bold uppercase tracking-wider text-[10px] block mb-2">
                    قصة الشعر:
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'messy_coder', name: 'شعر مبرمج كيرلي 🌀' },
                      { id: 'cyber_spiky', name: 'سبايكي سايبر ⚡' },
                      { id: 'afro', name: 'أفرو مميز 🦁' },
                      { id: 'slick_fade', name: 'مصفف أنيق 💈' }
                    ].map((h) => (
                      <button
                        key={h.id}
                        onClick={() =>
                          updateCurrentShot((s) => ({
                            ...s,
                            character: {
                              ...s.character,
                              appearance: { ...s.character.appearance, hairStyle: h.id as HairStyleId }
                            }
                          }))
                        }
                        className={`p-2 rounded-lg border text-right transition ${
                          currentShot.character.appearance.hairStyle === h.id
                            ? 'bg-cyan-950/80 border-cyan-500 text-cyan-300 font-bold'
                            : 'bg-slate-900 border-slate-800 hover:bg-slate-800'
                        }`}
                      >
                        {h.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-slate-400 font-bold uppercase tracking-wider text-[10px] block mb-2">
                    النظارات الذكية:
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'thick_square_nerd', name: 'نظارة نيرد 👓' },
                      { id: 'cyber_ar_visor', name: 'قناع AR 🥽' },
                      { id: 'retro_round', name: 'دائرية ريترو 🕶️' },
                      { id: 'none', name: 'بدون نظارة' }
                    ].map((g) => (
                      <button
                        key={g.id}
                        onClick={() =>
                          updateCurrentShot((s) => ({
                            ...s,
                            character: {
                              ...s.character,
                              appearance: { ...s.character.appearance, glasses: g.id as any }
                            }
                          }))
                        }
                        className={`p-2 rounded-lg border text-center transition ${
                          currentShot.character.appearance.glasses === g.id
                            ? 'bg-cyan-950/80 border-cyan-500 text-cyan-300 font-bold'
                            : 'bg-slate-900 border-slate-800 hover:bg-slate-800'
                        }`}
                      >
                        {g.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-slate-400 font-bold uppercase tracking-wider text-[10px] block mb-2">
                    تعابير الوجه (Expression):
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'shocked', name: 'مصدوم 😱' },
                      { id: 'thinking', name: 'تفكير عميق 🤔' },
                      { id: 'happy_smug', name: 'واثق وسعيد 😏' },
                      { id: 'wink', name: 'غمزة 😉' }
                    ].map((exp) => (
                      <button
                        key={exp.id}
                        onClick={() =>
                          updateCurrentShot((s) => ({
                            ...s,
                            character: { ...s.character, expression: exp.id as FacialExpression }
                          }))
                        }
                        className={`p-2 rounded-lg border text-center transition ${
                          currentShot.character.expression === exp.id
                            ? 'bg-cyan-950/80 border-cyan-500 text-cyan-300 font-bold'
                            : 'bg-slate-900 border-slate-800 hover:bg-slate-800'
                        }`}
                      >
                        {exp.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 3. WARDROBE */}
            {activeTab === 'wardrobe' && (
              <div className="space-y-4">
                <div>
                  <label className="text-slate-400 font-bold uppercase tracking-wider text-[10px] block mb-2">
                    طراز اللباس (Wardrobe Preset):
                  </label>
                  <div className="space-y-2">
                    {[
                      { id: 'tech_hoodie', name: 'هودي مطور برمجيات 🧥' },
                      { id: 'cyberpunk_coat', name: 'معطف سايبربانك مستقبلي ⚡' },
                      { id: 'dev_flannel', name: 'قميص كاروهات Flannel 👔' },
                      { id: 'minimalist_tee', name: 'تيشيرت بسيط Minimalist 👕' }
                    ].map((w) => (
                      <button
                        key={w.id}
                        onClick={() =>
                          updateCurrentShot((s) => ({
                            ...s,
                            character: {
                              ...s.character,
                              wardrobe: { ...s.character.wardrobe, preset: w.id as any }
                            }
                          }))
                        }
                        className={`w-full p-2.5 rounded-lg border text-right transition ${
                          currentShot.character.wardrobe.preset === w.id
                            ? 'bg-cyan-950/80 border-cyan-500 text-cyan-300 font-bold'
                            : 'bg-slate-900 border-slate-800 hover:bg-slate-800'
                        }`}
                      >
                        {w.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-slate-400 font-bold uppercase tracking-wider text-[10px] block mb-2">
                    شعار الصدر (Graphic):
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'react_atom', name: 'React ⚛️' },
                      { id: 'terminal_prompt', name: 'Terminal >' },
                      { id: 'coffee_cup', name: 'Coffee ☕' },
                      { id: 'binary_code', name: '0101 AI' }
                    ].map((g) => (
                      <button
                        key={g.id}
                        onClick={() =>
                          updateCurrentShot((s) => ({
                            ...s,
                            character: {
                              ...s.character,
                              wardrobe: { ...s.character.wardrobe, graphicOnShirt: g.id as any }
                            }
                          }))
                        }
                        className={`p-2 rounded-lg border text-center font-medium transition ${
                          currentShot.character.wardrobe.graphicOnShirt === g.id
                            ? 'bg-cyan-950/80 border-cyan-500 text-cyan-300 font-bold'
                            : 'bg-slate-900 border-slate-800 hover:bg-slate-800'
                        }`}
                      >
                        {g.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 4. ACTIONS */}
            {activeTab === 'actions' && (
              <div className="space-y-4">
                <div>
                  <label className="text-slate-400 font-bold uppercase tracking-wider text-[10px] block mb-2">
                    حركة الشخصية (Character Pose & Action):
                  </label>
                  <div className="space-y-2">
                    {[
                      { id: 'coding_furious', name: 'كتابة كود جنونية 💻' },
                      { id: 'debugging_chin_rub', name: 'حك الذقن وتفكير 🤔' },
                      { id: 'explaining_two_hands', name: 'شرح وتلويح باليدين 🗣️' },
                      { id: 'celebration_victory', name: 'احتفال ورفع اليدين 🎉' },
                      { id: 'spin_in_chair', name: 'دوران بالكرسي 🔄' },
                      { id: 'facepalm_error', name: 'صدمة إيرور Facepalm 🤦‍♂️' }
                    ].map((act) => (
                      <button
                        key={act.id}
                        onClick={() =>
                          updateCurrentShot((s) => ({
                            ...s,
                            character: { ...s.character, action: act.id as ActionId }
                          }))
                        }
                        className={`w-full p-2.5 rounded-lg border text-right transition ${
                          currentShot.character.action === act.id
                            ? 'bg-cyan-950/80 border-cyan-500 text-cyan-300 font-bold'
                            : 'bg-slate-900 border-slate-800 hover:bg-slate-800'
                        }`}
                      >
                        {act.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 5. LIGHTING */}
            {activeTab === 'lighting' && (
              <div className="space-y-4">
                <div>
                  <label className="text-slate-400 font-bold uppercase tracking-wider text-[10px] block mb-2">
                    أجواء الإضاءة (Mood):
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'cyberpunk_glow', name: 'Cyberpunk Glow' },
                      { id: 'night_coder_ambient', name: 'Night Ambient' },
                      { id: 'sunset_warmth', name: 'Sunset Warmth' },
                      { id: 'matrix_code_room', name: 'Matrix Green' }
                    ].map((m) => (
                      <button
                        key={m.id}
                        onClick={() =>
                          updateCurrentShot((s) => ({
                            ...s,
                            lighting: { ...s.lighting, mood: m.id as any }
                          }))
                        }
                        className={`p-2 rounded-lg border text-center transition ${
                          currentShot.lighting.mood === m.id
                            ? 'bg-cyan-950/80 border-cyan-500 text-cyan-300 font-bold'
                            : 'bg-slate-900 border-slate-800 hover:bg-slate-800'
                        }`}
                      >
                        {m.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-800">
                  <label className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                    <span>أشعة شمس/سبوت لايت (Volumetric Rays)</span>
                    <input
                      type="checkbox"
                      checked={currentShot.lighting.volumetricRays}
                      onChange={(e) =>
                        updateCurrentShot((s) => ({
                          ...s,
                          lighting: { ...s.lighting, volumetricRays: e.target.checked }
                        }))
                      }
                      className="accent-cyan-500 w-4 h-4"
                    />
                  </label>
                </div>
              </div>
            )}

            {/* 6. TYPOGRAPHY */}
            {activeTab === 'typography' && (
              <div className="space-y-4">
                <div>
                  <label className="text-slate-400 font-bold uppercase tracking-wider text-[10px] block mb-1">
                    نص الهوك الرئيسي (Hook Title):
                  </label>
                  <input
                    type="text"
                    value={currentShot.hook.text}
                    onChange={(e) =>
                      updateCurrentShot((s) => ({
                        ...s,
                        hook: { ...s.hook, text: e.target.value }
                      }))
                    }
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-cyan-500 font-bold"
                  />
                </div>

                <div>
                  <label className="text-slate-400 font-bold uppercase tracking-wider text-[10px] block mb-1">
                    نص الكابشن (Subtitle Caption):
                  </label>
                  <input
                    type="text"
                    value={currentShot.caption.text}
                    onChange={(e) =>
                      updateCurrentShot((s) => ({
                        ...s,
                        caption: { ...s.caption, text: e.target.value }
                      }))
                    }
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="text-slate-400 font-bold uppercase tracking-wider text-[10px] block mb-2">
                    طراز الكابشن:
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'karaoke_highlight', name: 'Karaoke Highlight' },
                      { id: 'bouncy_tiktok_badge', name: 'Bouncy TikTok' },
                      { id: 'cyberpunk_terminal', name: 'Terminal Bar' },
                      { id: 'scattered_orbit', name: 'Scattered Orbit' }
                    ].map((c) => (
                      <button
                        key={c.id}
                        onClick={() =>
                          updateCurrentShot((s) => ({
                            ...s,
                            caption: { ...s.caption, style: c.id as any }
                          }))
                        }
                        className={`p-2 rounded-lg border text-center transition ${
                          currentShot.caption.style === c.id
                            ? 'bg-cyan-950/80 border-cyan-500 text-cyan-300 font-bold'
                            : 'bg-slate-900 border-slate-800 hover:bg-slate-800'
                        }`}
                      >
                        {c.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
