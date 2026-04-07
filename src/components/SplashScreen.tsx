import React, { useState, useEffect } from 'react';
import splashVideo from '@/assets/splash-cinematic.mp4.asset.json';

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [phase, setPhase] = useState<'logo' | 'text' | 'fadeOut'>('logo');

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('text'), 1200);
    const t2 = setTimeout(() => setPhase('fadeOut'), 3000);
    const t3 = setTimeout(onComplete, 3600);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center transition-opacity duration-700 ${
        phase === 'fadeOut' ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Cinematic video background */}
      <video
        autoPlay
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        src={splashVideo.url}
      />

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Subtle radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--accent)/0.1),transparent_70%)]" />

      {/* The "O" letter */}
      <div
        className={`relative z-10 transition-all duration-700 ease-out ${
          phase === 'logo'
            ? 'scale-100 opacity-100'
            : 'scale-90 opacity-100 -translate-y-4'
        }`}
      >
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-accent/20 blur-2xl scale-150 animate-pulse" />
          <span
            className="font-heading text-[120px] sm:text-[160px] md:text-[200px] font-bold leading-none text-accent drop-shadow-[0_0_40px_hsl(var(--accent)/0.4)]"
            style={{ letterSpacing: '-0.02em' }}
          >
            O
          </span>
        </div>
      </div>

      {/* Welcome text */}
      <div
        className={`relative z-10 mt-6 text-center transition-all duration-700 ease-out ${
          phase === 'text' || phase === 'fadeOut'
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-6'
        }`}
      >
        <p className="font-body text-sm sm:text-base tracking-[0.3em] uppercase text-primary-foreground/60 mb-2">
          Welcome to
        </p>
        <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-primary-foreground tracking-wide">
          Uni<span className="text-accent">C</span>ore
        </h1>
        <div className="mt-4 mx-auto w-16 h-0.5 bg-accent/50 rounded-full" />
        <p className="mt-3 font-body text-xs sm:text-sm text-primary-foreground/40 tracking-widest uppercase">
          Professional Alliance
        </p>
      </div>

      {/* Bottom shimmer line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
    </div>
  );
}
