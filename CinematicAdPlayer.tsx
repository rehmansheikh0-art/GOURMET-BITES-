import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  Sparkles,
  Film,
  Camera,
  Layers,
  ChevronRight
} from 'lucide-react';
import { adAudio } from '../utils/adAudio';

// Image assets for the 5-second cinematic progression
const SCENE_1_IMG = '/src/assets/images/wafer_macro_pristine_1787379539410.jpg';
const SCENE_2_IMG = '/src/assets/images/wafer_break_macro_1787379515233.jpg';
const SCENE_3_IMG = '/src/assets/images/wafer_centered_hero_1787379526555.jpg';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rotation: number;
  vRot: number;
  opacity: number;
  color: string;
  type: 'crumb' | 'flake' | 'sparkle';
  life: number;
  maxLife: number;
}

interface CinematicAdPlayerProps {
  onShopClick?: () => void;
  embedded?: boolean;
  isOpenModal?: boolean;
  onCloseModal?: () => void;
}

export const CinematicAdPlayer: React.FC<CinematicAdPlayerProps> = ({
  onShopClick,
  embedded = true,
  isOpenModal = false,
  onCloseModal,
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [currentTime, setCurrentTime] = useState<number>(0); // 0.0 to 5.0 seconds
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0); // 1.0x, 0.5x
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [aspectRatio, setAspectRatio] = useState<'16:9' | '21:9' | '4:3'>('16:9');
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [showTechOverlay, setShowTechOverlay] = useState<boolean>(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const lastSnapTriggerRef = useRef<boolean>(false);
  const lastChimeTriggerRef = useRef<boolean>(false);
  const animFrameRef = useRef<number | null>(null);
  const lastTimestampRef = useRef<number | null>(null);

  const DURATION = 5.0; // 5 seconds exact

  // Sound Mute Synchronization
  useEffect(() => {
    adAudio.setMuted(isMuted);
  }, [isMuted]);

  // Particle Emitter when wafer snaps (between t=1.35s and t=2.0s)
  const emitCrumbs = useCallback((count: number = 30) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const centerX = canvas.width * 0.5;
    const centerY = canvas.height * 0.48;

    const colors = [
      '#D4AF37', // Gold
      '#C5A059', // Antique Gold
      '#D4A373', // Golden Wafer crumb
      '#E9D8A6', // Crispy Flake
      '#7F4F24', // Chocolate crumb
      '#582F0E', // Dark cocoa crumb
      '#FFF3B0', // Light crisp
    ];

    for (let i = 0; i < count; i++) {
      const angle = (Math.random() * Math.PI * 2);
      const speed = Math.random() * 2.8 + 0.8;
      const type = Math.random() > 0.4 ? 'crumb' : (Math.random() > 0.5 ? 'flake' : 'sparkle');
      
      particlesRef.current.push({
        x: centerX + (Math.random() - 0.5) * 40,
        y: centerY + (Math.random() - 0.5) * 30,
        vx: Math.cos(angle) * speed * (Math.random() > 0.5 ? 1 : -1) * 1.2,
        vy: Math.sin(angle) * speed * 0.5 - Math.random() * 1.5, // slight upward pop then gravity
        size: type === 'sparkle' ? Math.random() * 2.5 + 1 : Math.random() * 5 + 1.5,
        rotation: Math.random() * Math.PI * 2,
        vRot: (Math.random() - 0.5) * 0.1,
        opacity: Math.random() * 0.4 + 0.6,
        color: colors[Math.floor(Math.random() * colors.length)],
        type,
        life: 0,
        maxLife: Math.random() * 120 + 80,
      });
    }
  }, []);

  // Reset particles
  const resetPlayback = useCallback(() => {
    setCurrentTime(0);
    setIsPlaying(true);
    particlesRef.current = [];
    lastSnapTriggerRef.current = false;
    lastChimeTriggerRef.current = false;
    adAudio.playCinematicWhoosh();
  }, []);

  // Main animation loop & time updater
  useEffect(() => {
    const updateFrame = (timestamp: number) => {
      if (lastTimestampRef.current === null) {
        lastTimestampRef.current = timestamp;
      }
      const delta = (timestamp - lastTimestampRef.current) / 1000;
      lastTimestampRef.current = timestamp;

      if (isPlaying) {
        setCurrentTime((prev) => {
          const next = prev + delta * playbackSpeed;
          
          // Trigger crisp wafer snap at 1.4 seconds
          if (prev < 1.4 && next >= 1.4 && !lastSnapTriggerRef.current) {
            lastSnapTriggerRef.current = true;
            adAudio.playWaferSnap();
            adAudio.playChocolateStretchTone();
            emitCrumbs(45);
          }

          // Trigger continuous slow micro-crumble from 1.4s to 2.8s
          if (next >= 1.4 && next <= 2.8 && Math.random() < 0.25) {
            emitCrumbs(2);
          }

          // Trigger ending chime chord at 3.5s
          if (prev < 3.5 && next >= 3.5 && !lastChimeTriggerRef.current) {
            lastChimeTriggerRef.current = true;
            adAudio.playEndChime();
          }

          if (next >= DURATION) {
            return DURATION;
          }
          return next;
        });
      }

      // Render falling crumbs on Canvas
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          // Update & draw particles
          const gravity = 0.045;
          const airDrag = 0.99;

          particlesRef.current = particlesRef.current.filter((p) => {
            p.life++;
            p.vy += gravity;
            p.vx *= airDrag;
            p.vy *= airDrag;
            p.x += p.vx;
            p.y += p.vy;
            p.rotation += p.vRot;

            const progress = p.life / p.maxLife;
            const currentOpacity = (1 - progress) * p.opacity;

            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.rotation);
            ctx.fillStyle = p.color;
            ctx.globalAlpha = Math.max(0, currentOpacity);

            if (p.type === 'sparkle') {
              ctx.shadowBlur = 8;
              ctx.shadowColor = '#D4AF37';
              ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
            } else if (p.type === 'flake') {
              // Irregular crunchy flake
              ctx.beginPath();
              ctx.moveTo(-p.size, -p.size * 0.5);
              ctx.lineTo(p.size * 0.8, -p.size * 0.3);
              ctx.lineTo(p.size * 0.4, p.size * 0.6);
              ctx.lineTo(-p.size * 0.6, p.size * 0.4);
              ctx.closePath();
              ctx.fill();
            } else {
              // Rounded micro crumb
              ctx.beginPath();
              ctx.arc(0, 0, p.size * 0.6, 0, Math.PI * 2);
              ctx.fill();
            }

            ctx.restore();
            return p.life < p.maxLife;
          });
        }
      }

      animFrameRef.current = requestAnimationFrame(updateFrame);
    };

    animFrameRef.current = requestAnimationFrame(updateFrame);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isPlaying, playbackSpeed, emitCrumbs]);

  // Adjust canvas size to parent resolution
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      const container = containerRef.current;
      if (canvas && container) {
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Determine current active visual stage
  // Scene 1: 0.0s - 1.3s (Macro pristine golden wafer lattice)
  // Scene 2: 1.3s - 3.4s (Breaking open, melted chocolate ooze & stretch, crumbs)
  // Scene 3: 3.4s - 5.0s (Centered broken wafer bite, gold branding & tagline)
  const isScene1 = currentTime < 1.3;
  const isScene2 = currentTime >= 1.3 && currentTime < 3.4;
  const isScene3 = currentTime >= 3.4;

  // Scene transition progress
  const scene1Progress = Math.min(1, currentTime / 1.3);
  const scene2Progress = Math.max(0, Math.min(1, (currentTime - 1.3) / 2.1));
  const scene3Progress = Math.max(0, Math.min(1, (currentTime - 3.4) / 1.6));

  const togglePlay = () => {
    if (currentTime >= DURATION) {
      resetPlayback();
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const handleScrub = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (newTime >= 1.4 && !lastSnapTriggerRef.current) {
      lastSnapTriggerRef.current = true;
      emitCrumbs(30);
    }
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  const adPlayerContent = (
    <div
      ref={containerRef}
      id="cinematic-ad-player-container"
      className={`relative overflow-hidden bg-[#0A0503] border border-[#D4AF37]/40 shadow-2xl transition-all select-none group ${
        isFullscreen ? 'w-screen h-screen flex flex-col justify-center items-center' : 'w-full'
      }`}
      style={{
        aspectRatio: isFullscreen ? 'auto' : (aspectRatio === '16:9' ? '16/9' : aspectRatio === '21:9' ? '21/9' : '4/3'),
      }}
    >
      {/* 4K Ultra-Realistic Macro Visual Layers */}
      <div className="absolute inset-0 w-full h-full overflow-hidden bg-[#120704]">
        
        {/* Layer 1: Pristine Golden Wafer Macro (0.0s - 1.3s) */}
        <motion.div
          className="absolute inset-0 w-full h-full"
          initial={{ opacity: 1 }}
          animate={{
            opacity: isScene1 ? 1 : 0,
            scale: 1 + scene1Progress * 0.08,
            x: -scene1Progress * 15,
          }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <img
            src={SCENE_1_IMG}
            alt="Macro pristine wafer lattice"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center filter brightness-105 contrast-110"
          />
          {/* Dynamic Macro Key-Light Sweep across the wafer ridges */}
          <div
            className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-[#D4AF37]/25 to-transparent mix-blend-screen transition-transform duration-300"
            style={{
              transform: `translateX(${(scene1Progress * 140) - 40}%)`,
              opacity: isScene1 ? 0.8 : 0,
            }}
          />
        </motion.div>

        {/* Layer 2: Slow-Motion Wafer Break & Rich Chocolate Reveal (1.3s - 3.4s) */}
        <motion.div
          className="absolute inset-0 w-full h-full"
          initial={{ opacity: 0 }}
          animate={{
            opacity: isScene2 ? 1 : 0,
            scale: 1.04 + scene2Progress * 0.05,
          }}
          transition={{ duration: 0.35, ease: 'easeInOut' }}
        >
          <img
            src={SCENE_2_IMG}
            alt="Slow-motion wafer breaking revealing molten chocolate"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center filter brightness-105 contrast-115"
          />
          {/* Specular Warm Highlights on molten chocolate core */}
          <div
            className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-[#FFD166]/20 to-transparent mix-blend-overlay"
            style={{
              opacity: isScene2 ? 0.9 : 0,
              transform: `scale(${1 + scene2Progress * 0.2})`,
            }}
          />
        </motion.div>

        {/* Layer 3: Centered Broken Wafer Bite Hero & Final Packshot (3.4s - 5.0s) */}
        <motion.div
          className="absolute inset-0 w-full h-full"
          initial={{ opacity: 0 }}
          animate={{
            opacity: isScene3 ? 1 : 0,
            scale: 1 + (1 - scene3Progress) * 0.04,
          }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          <img
            src={SCENE_3_IMG}
            alt="Centered gourmet chocolate wafer bite hero"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center filter brightness-105 contrast-110"
          />
          {/* Soft Golden Studio Rim Light */}
          <div className="absolute inset-0 pointer-events-none bg-radial from-[#D4AF37]/15 via-transparent to-[#120704]/80 mix-blend-screen" />
        </motion.div>

        {/* Vignette & Cinematic Letterbox Warmth */}
        <div className="absolute inset-0 pointer-events-none bg-radial-[circle_at_center,transparent_45%,#0A0402_100%] opacity-75" />
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#100603] via-transparent to-[#100603]/80 opacity-60" />
      </div>

      {/* HTML5 Canvas Slow-Motion Crumb & Flake Particle Simulation */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
      />

      {/* Cinematic Ad Final Typography Lockup (Appears between 3.5s - 5.0s) */}
      <AnimatePresence>
        {isScene3 && (
          <motion.div
            initial={{ opacity: 0, y: 25, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 z-20 flex flex-col items-center justify-end pb-12 sm:pb-16 px-6 text-center pointer-events-none bg-gradient-to-t from-[#0F0704]/90 via-[#0F0704]/40 to-transparent"
          >
            {/* Gold emblem divider */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '80px' }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="h-[1.5px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mb-3"
            />

            {/* BRAND HEADLINE */}
            <motion.h1
              initial={{ letterSpacing: '0.1em', opacity: 0 }}
              animate={{ letterSpacing: '0.22em', opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="font-serif-luxury text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold uppercase text-transparent bg-clip-text bg-gradient-to-b from-[#FFF5E6] via-[#D4AF37] to-[#997926] drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]"
            >
              “GOURMET BITES”
            </motion.h1>

            {/* OFFICIAL SLOGAN */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="font-serif-sub text-sm sm:text-xl md:text-2xl italic font-semibold text-[#F5E6D3] tracking-wide mt-1 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
            >
              “Crispy Outside. Rich Chocolate Inside.”
            </motion.p>

            {/* Final CTA Buttons */}
            {onShopClick && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.45 }}
                className="mt-5 pointer-events-auto flex items-center gap-3"
              >
                <button
                  onClick={onShopClick}
                  className="gold-button px-6 py-2.5 text-xs font-bold uppercase tracking-widest flex items-center gap-2 cursor-pointer shadow-2xl shadow-[#D4AF37]/30"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Taste The Crisp</span>
                </button>
                <button
                  onClick={resetPlayback}
                  className="px-4 py-2.5 bg-[#1A0F0A]/90 border border-[#C5A059]/40 text-[#F5E6D3] text-xs font-bold uppercase tracking-wider hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors cursor-pointer flex items-center gap-1.5 backdrop-blur-md"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Replay Commercial</span>
                </button>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Production Telemetry / Director Overlay */}
      {showTechOverlay && (
        <div className="absolute top-4 left-4 z-20 pointer-events-none flex flex-col gap-1.5">
          <div className="flex items-center gap-2 px-2.5 py-1 bg-[#1A0F0A]/80 border border-[#C5A059]/30 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#D4AF37] font-bold">
              4K ULTRA CINEMATOGRAPHY
            </span>
          </div>

          <div className="text-[10px] font-mono text-[#F5E6D3]/70 bg-[#1A0F0A]/70 px-2 py-0.5 border border-[#C5A059]/20 w-fit backdrop-blur-sm">
            {currentTime < 1.3 && 'SCENE 01 / GOLDEN WAFER PROBE (1000 FPS)'}
            {currentTime >= 1.3 && currentTime < 3.4 && 'SCENE 02 / AUDIBLE SNAP & MOLTEN CORE'}
            {currentTime >= 3.4 && 'SCENE 03 / SIGNATURE HERO TITLE LOCKUP'}
          </div>
        </div>
      )}

      {/* Floating 5-Second Indicator Gauge */}
      <div className="absolute top-4 right-4 z-20 pointer-events-none flex items-center gap-2 bg-[#1A0F0A]/80 border border-[#C5A059]/30 px-3 py-1 backdrop-blur-md">
        <span className="font-mono text-xs font-bold text-[#D4AF37]">
          {currentTime.toFixed(2)}s
        </span>
        <span className="text-[10px] text-[#F5E6D3]/50 font-mono">/ 05.00s</span>
      </div>

      {/* Controls Bar (Hover / Interactive) */}
      <div className="absolute bottom-0 inset-x-0 z-30 p-3 sm:p-4 bg-gradient-to-t from-[#0A0402] via-[#0A0402]/80 to-transparent transition-opacity duration-300">
        
        {/* Timeline Scrubber */}
        <div className="flex items-center gap-3 mb-2.5">
          <div className="relative flex-1 flex items-center group/scrubber">
            <input
              type="range"
              min="0"
              max={DURATION}
              step="0.01"
              value={currentTime}
              onChange={handleScrub}
              className="w-full h-1.5 bg-[#26140D] rounded-none appearance-none cursor-pointer accent-[#D4AF37] focus:outline-none border border-[#C5A059]/30"
            />
            {/* Visual Markers for Snap (1.4s) and Climax (3.5s) */}
            <div
              className="absolute top-1/2 -translate-y-1/2 w-1.5 h-3 bg-[#D4AF37] pointer-events-none"
              style={{ left: `${(1.4 / DURATION) * 100}%` }}
              title="Wafer Snap (1.4s)"
            />
            <div
              className="absolute top-1/2 -translate-y-1/2 w-1.5 h-3 bg-[#D4AF37] pointer-events-none"
              style={{ left: `${(3.5 / DURATION) * 100}%` }}
              title="Hero Lockup (3.5s)"
            />
          </div>
        </div>

        {/* Buttons & Quality Switchers */}
        <div className="flex items-center justify-between text-xs text-[#F5E6D3]">
          
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Play / Pause */}
            <button
              onClick={togglePlay}
              className="p-1.5 bg-[#1A0F0A] border border-[#C5A059]/40 hover:border-[#D4AF37] text-[#D4AF37] hover:text-[#FFF] transition-colors cursor-pointer"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {currentTime >= DURATION ? (
                <RotateCcw className="w-4 h-4" />
              ) : isPlaying ? (
                <Pause className="w-4 h-4" />
              ) : (
                <Play className="w-4 h-4 fill-current" />
              )}
            </button>

            {/* Replay */}
            <button
              onClick={resetPlayback}
              className="p-1.5 bg-[#1A0F0A] border border-[#C5A059]/30 hover:border-[#D4AF37] text-[#F5E6D3]/80 hover:text-[#D4AF37] transition-colors cursor-pointer hidden sm:block"
              title="Replay from 0.0s"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {/* Sound Mute Toggle */}
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-1.5 bg-[#1A0F0A] border border-[#C5A059]/30 hover:border-[#D4AF37] text-[#F5E6D3]/80 hover:text-[#D4AF37] transition-colors cursor-pointer flex items-center gap-1"
              title={isMuted ? 'Unmute commercial sound FX' : 'Mute audio'}
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-[#F5E6D3]/40" /> : <Volume2 className="w-4 h-4 text-[#D4AF37]" />}
              <span className="text-[10px] uppercase font-mono hidden md:inline">{isMuted ? 'Muted' : 'Audio ON'}</span>
            </button>

            {/* Speed Control (Slow-Mo 0.5x) */}
            <div className="flex items-center border border-[#C5A059]/30 bg-[#1A0F0A]">
              <button
                onClick={() => setPlaybackSpeed(0.5)}
                className={`px-2 py-0.5 text-[10px] font-mono cursor-pointer transition-colors ${
                  playbackSpeed === 0.5 ? 'bg-[#D4AF37] text-[#1A0F0A] font-bold' : 'text-[#F5E6D3]/70 hover:text-[#D4AF37]'
                }`}
              >
                0.5x Slow
              </button>
              <button
                onClick={() => setPlaybackSpeed(1.0)}
                className={`px-2 py-0.5 text-[10px] font-mono cursor-pointer transition-colors ${
                  playbackSpeed === 1.0 ? 'bg-[#D4AF37] text-[#1A0F0A] font-bold' : 'text-[#F5E6D3]/70 hover:text-[#D4AF37]'
                }`}
              >
                1.0x Real
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Aspect Ratio Selector (Cinema 21:9 / Standard 16:9) */}
            <div className="hidden lg:flex items-center border border-[#C5A059]/30 bg-[#1A0F0A]">
              <button
                onClick={() => setAspectRatio('16:9')}
                className={`px-2 py-0.5 text-[10px] font-mono cursor-pointer ${
                  aspectRatio === '16:9' ? 'bg-[#D4AF37] text-[#1A0F0A] font-bold' : 'text-[#F5E6D3]/70'
                }`}
              >
                16:9
              </button>
              <button
                onClick={() => setAspectRatio('21:9')}
                className={`px-2 py-0.5 text-[10px] font-mono cursor-pointer ${
                  aspectRatio === '21:9' ? 'bg-[#D4AF37] text-[#1A0F0A] font-bold' : 'text-[#F5E6D3]/70'
                }`}
              >
                21:9 Anamorphic
              </button>
            </div>

            {/* Toggle Telemetry */}
            <button
              onClick={() => setShowTechOverlay(!showTechOverlay)}
              className="p-1.5 bg-[#1A0F0A] border border-[#C5A059]/30 hover:border-[#D4AF37] text-[#F5E6D3]/70 hover:text-[#D4AF37] transition-colors cursor-pointer hidden md:flex items-center gap-1"
              title="Toggle production telemetry"
            >
              <Layers className="w-3.5 h-3.5" />
              <span className="text-[10px] font-mono uppercase">Info</span>
            </button>

            {/* Fullscreen */}
            <button
              onClick={toggleFullscreen}
              className="p-1.5 bg-[#1A0F0A] border border-[#C5A059]/30 hover:border-[#D4AF37] text-[#F5E6D3]/80 hover:text-[#D4AF37] transition-colors cursor-pointer"
              title={isFullscreen ? 'Exit full screen' : 'Expand full screen'}
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  if (isOpenModal) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A0402]/95 backdrop-blur-xl">
        <div className="relative w-full max-w-5xl">
          <button
            onClick={onCloseModal}
            className="absolute -top-10 right-0 text-[#F5E6D3]/70 hover:text-[#D4AF37] text-xs font-bold uppercase tracking-widest flex items-center gap-1 cursor-pointer"
          >
            <span>Close Cinema</span>
            <span className="text-base">✕</span>
          </button>
          {adPlayerContent}
        </div>
      </div>
    );
  }

  return adPlayerContent;
};

// Full Featured Showcase Section for Landing Page
export const CinematicAdSection: React.FC<{ onShopClick: () => void }> = ({ onShopClick }) => {
  const [activeStoryCard, setActiveStoryCard] = useState<number>(0);

  const keyMoments = [
    {
      time: '0.0s – 1.2s',
      title: 'Macro Waffle Lattice',
      desc: 'Golden-brown micro ridges lit by warm studio key lights highlighting individual wafer cells.',
      badge: 'Probe Lens 1000 FPS',
    },
    {
      time: '1.2s – 3.2s',
      title: 'The Audible Break & Molten Flow',
      desc: 'Slow-motion wafer fracture with falling golden flakes and glossy liquid chocolate stretching in mid-air.',
      badge: 'Audible Crisp Snap',
    },
    {
      time: '3.2s – 5.0s',
      title: 'Signature “GOURMET BITES”',
      desc: 'Centered hero shot with gold typography: “Crispy Outside. Rich Chocolate Inside.”',
      badge: '4K Commercial Hero',
    },
  ];

  return (
    <section id="cinematic-ad" className="py-20 sm:py-24 bg-[#140C08] relative overflow-hidden border-y border-[#C5A059]/25">
      {/* Subtle gold ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D4AF37]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#26140D] border border-[#C5A059]/30 mb-4">
            <Film className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-bold">
              Official 5-Second 4K Commercial
            </span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-bold text-[#F5E6D3] tracking-tight">
            Cinematic Food Commercial
          </h2>
          <p className="text-xs sm:text-sm text-[#F5E6D3]/70 mt-3 max-w-2xl mx-auto leading-relaxed">
            Experience the sensory harmony of extreme macro food cinematography. High-speed 1000 FPS capture reveals the precise fracture of our golden waffle crust and the slow-motion cascade of molten chocolate.
          </p>
        </div>

        {/* The 5-Second Video / Commercial Player */}
        <div className="max-w-4xl mx-auto mb-12">
          <CinematicAdPlayer onShopClick={onShopClick} />
        </div>

        {/* 3-Point Shot Breakdown Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {keyMoments.map((moment, idx) => (
            <div
              key={idx}
              className="p-5 bg-[#1A0F0A] border border-[#C5A059]/25 hover:border-[#D4AF37] transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-xs font-bold text-[#D4AF37] bg-[#26140D] px-2 py-0.5 border border-[#C5A059]/30">
                    {moment.time}
                  </span>
                  <span className="text-[10px] font-mono text-[#F5E6D3]/50 uppercase">
                    {moment.badge}
                  </span>
                </div>
                <h3 className="font-serif-luxury text-lg font-bold text-[#F5E6D3] group-hover:text-[#D4AF37] transition-colors">
                  {moment.title}
                </h3>
                <p className="text-xs text-[#F5E6D3]/70 mt-2 leading-relaxed">
                  {moment.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#C5A059]/20 flex items-center justify-between text-[11px] text-[#D4AF37]">
                <span className="font-medium">4K Macro Capture</span>
                <Sparkles className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
