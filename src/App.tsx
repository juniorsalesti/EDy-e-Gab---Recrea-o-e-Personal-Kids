/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import {
  Users,
  Check,
  Plus,
  Phone,
  Mail,
  MapPin,
  Smile,
  ShieldCheck,
  Activity,
  Sparkles,
  Brain,
  Heart,
  Quote,
  Menu,
  X,
  Trophy,
  Flame,
  ArrowDownCircle,
  ChevronLeft,
  ChevronRight,
  Maximize2
} from 'lucide-react';

// Custom Props Interfaces
interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  key?: React.Key;
}

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  color?: string;
  key?: React.Key;
}

interface CountUpProps {
  end: number;
  duration?: number;
  suffix?: string;
  key?: React.Key;
}

interface FloatingSportsBallProps {
  type: 'futebol' | 'basquete' | 'volei';
  style?: React.CSSProperties;
  mousePos?: { x: number; y: number };
  factor?: number;
  delay?: number;
  key?: React.Key;
}

// Custom Logos & Social Assets
function WhatsAppIcon({ className = "w-5 h-5" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      referrerPolicy="no-referrer"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.703 1.456h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function OfficialLogoCrest({ className = "w-16 h-16" }) {
  return (
    <img
      src="https://i.ibb.co/x8KRjbXq/Chat-GPT-Image-6-de-jul-de-2026-17-22-08.png"
      alt="EDy & Gab Logo"
      className={`${className} object-contain`}
      referrerPolicy="no-referrer"
    />
  );
}

// 1. Custom Cursor Component
function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(true);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(pointer: fine)");
    setIsTouch(!mediaQuery.matches);
    if (!mediaQuery.matches) return;

    const moveMouse = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest('button') ||
        target.closest('a') ||
        target.closest('[role="button"]') ||
        target.closest('.interactive-item')
      ) {
        setHovering(true);
      } else {
        setHovering(false);
      }
    };

    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);
    const handleMouseLeave = () => setVisible(false);
    const handleMouseEnter = () => setVisible(true);

    window.addEventListener('mousemove', moveMouse);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', moveMouse);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  useEffect(() => {
    if (isTouch || !visible) return;
    let reqId: number;
    const updateTrail = () => {
      setTrail(prev => {
        const dx = position.x - prev.x;
        const dy = position.y - prev.y;
        const factor = 0.16; // Lerp easing speed
        return { x: prev.x + dx * factor, y: prev.y + dy * factor };
      });
      reqId = requestAnimationFrame(updateTrail);
    };
    reqId = requestAnimationFrame(updateTrail);
    return () => cancelAnimationFrame(reqId);
  }, [position, isTouch, visible]);

  if (isTouch || !visible) return null;

  return (
    <>
      <div
        className="fixed top-0 left-0 pointer-events-none z-50 rounded-full border-2 border-gold -translate-x-1/2 -translate-y-1/2 transition-all duration-150 ease-out mix-blend-screen"
        style={{
          left: `${trail.x}px`,
          top: `${trail.y}px`,
          width: hovering ? '48px' : '28px',
          height: hovering ? '48px' : '28px',
          backgroundColor: hovering ? 'rgba(217, 164, 65, 0.15)' : 'transparent',
          transform: `translate(-50%, -50%) scale(${clicked ? 0.8 : 1})`,
        }}
      />
      <div
        className="fixed top-0 left-0 pointer-events-none z-50 rounded-full bg-gold -translate-x-1/2 -translate-y-1/2 w-2 h-2"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      />
    </>
  );
}

// 2. Bubbles Canvas Particle Generator
function BubbleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, radius: 110 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = canvas.width = canvas.offsetWidth;
    let height = canvas.height = canvas.offsetHeight;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(canvas);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    class Bubble {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
      alpha: number;
      angle: number;
      waveSpeed: number;
      waveRange: number;

      constructor() {
        this.radius = Math.random() * 8 + 4;
        this.x = Math.random() * width;
        this.y = height + Math.random() * 120;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = -(Math.random() * 0.5 + 0.3);
        this.angle = Math.random() * Math.PI * 2;
        this.waveSpeed = Math.random() * 0.02 + 0.006;
        this.waveRange = Math.random() * 0.7 + 0.3;

        const colors = [
          'rgba(46, 125, 209, ',  // blue
          'rgba(217, 164, 65, ',  // gold
          'rgba(194, 59, 124, ',  // pink/magenta
          'rgba(217, 60, 60, ',   // red
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.alpha = Math.random() * 0.22 + 0.12;
      }

      update() {
        this.y += this.vy;
        this.angle += this.waveSpeed;
        this.x += this.vx + Math.sin(this.angle) * this.waveRange;

        // Mouse repelling
        const dx = this.x - mouseRef.current.x;
        const dy = this.y - mouseRef.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouseRef.current.radius) {
          const force = (mouseRef.current.radius - dist) / mouseRef.current.radius;
          const angle = Math.atan2(dy, dx);
          this.x += Math.cos(angle) * force * 4;
          this.y += Math.sin(angle) * force * 4;
        }

        if (this.y < -50 || this.x < -50 || this.x > width + 50) {
          this.y = height + 30;
          this.x = Math.random() * width;
          this.vy = -(Math.random() * 0.5 + 0.3);
          this.vx = (Math.random() - 0.5) * 0.4;
        }
      }

      draw(c: CanvasRenderingContext2D) {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        c.fillStyle = `${this.color}${this.alpha})`;
        c.fill();
        
        c.beginPath();
        c.arc(this.x - this.radius * 0.3, this.y - this.radius * 0.3, this.radius * 0.22, 0, Math.PI * 2);
        c.fillStyle = `rgba(255, 255, 255, ${this.alpha * 1.6})`;
        c.fill();
      }
    }

    const bubbleCount = Math.min(width < 768 ? 20 : 50, Math.floor((width * height) / 14000));
    const bubbles: Bubble[] = [];
    for (let i = 0; i < bubbleCount; i++) {
      bubbles.push(new Bubble());
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      for (const b of bubbles) {
        b.update();
        b.draw(ctx);
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      if (canvas) {
        canvas.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-80 z-0" />;
}

// 3. Scroll Reveal Entrance Component
function Reveal({ children, className = "", delay = 0 }: RevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, {
      threshold: 0.08,
      rootMargin: '0px 0px -40px 0px'
    });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal-hidden ${isVisible ? 'reveal-visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

// 4. Interactive 3D Tilt Card
function TiltCard({ children, className = "", color = "rgba(217, 164, 65, 0.12)" }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tiltStyle, setTiltStyle] = useState({});

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((centerY - y) / centerY) * 11;
    const rotateY = ((x - centerX) / centerX) * 11;
    
    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.015, 1.015, 1.015)`,
      transition: 'transform 0.1s ease-out',
      boxShadow: `0 20px 40px -15px ${color}`
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      transition: 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
      boxShadow: 'none'
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={tiltStyle}
      className={`rounded-3xl border border-white/5 bg-navy-medium p-8 transition-all duration-300 overflow-hidden relative ${className}`}
    >
      {children}
    </div>
  );
}

// 5. Animated Count-Up Numbers
function CountUp({ end, duration = 1800, suffix = "" }: CountUpProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [hasRun, setHasRun] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasRun) {
        setHasRun(true);
        let startTimestamp: number | null = null;
        const step = (timestamp: number) => {
          if (!startTimestamp) startTimestamp = timestamp;
          const progress = Math.min((timestamp - startTimestamp) / duration, 1);
          const easeProgress = progress * (2 - progress); // outQuad
          setCount(Math.floor(easeProgress * end));
          if (progress < 1) {
            window.requestAnimationFrame(step);
          } else {
            setCount(end);
          }
        };
        window.requestAnimationFrame(step);
      }
    }, { threshold: 0.3 });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [end, duration, hasRun]);

  return <span ref={ref} className="font-display font-extrabold text-gold text-5xl md:text-6xl">{count}{suffix}</span>;
}

// 6. Floating Parallax Sports Balls
function FloatingSportsBall({ type, style = {}, mousePos = { x: 0, y: 0 }, factor = 0.035, delay = 0 }: FloatingSportsBallProps) {
  const translateX = mousePos.x * factor;
  const translateY = mousePos.y * factor;

  const renderSVG = () => {
    if (type === 'futebol') {
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full stroke-gold fill-none stroke-[1.5]" referrerPolicy="no-referrer">
          <circle cx="50" cy="50" r="44" />
          <polygon points="50,38 61,46 57,59 43,59 39,46" className="fill-gold/10" />
          <line x1="50" y1="38" x2="50" y2="6" />
          <line x1="61" y1="46" x2="92" y2="36" />
          <line x1="57" y1="59" x2="76" y2="86" />
          <line x1="43" y1="59" x2="24" y2="86" />
          <line x1="39" y1="46" x2="8" y2="36" />
        </svg>
      );
    }
    if (type === 'basquete') {
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full stroke-blue-vib fill-none stroke-[1.5]" referrerPolicy="no-referrer">
          <circle cx="50" cy="50" r="44" />
          <line x1="50" y1="6" x2="50" y2="94" />
          <line x1="6" y1="50" x2="94" y2="50" />
          <path d="M 18,18 Q 50,38 82,18" />
          <path d="M 18,82 Q 50,62 82,82" />
        </svg>
      );
    }
    if (type === 'volei') {
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full stroke-pink-vib fill-none stroke-[1.5]" referrerPolicy="no-referrer">
          <circle cx="50" cy="50" r="44" />
          <path d="M 16,26 Q 50,46 84,26" />
          <path d="M 16,74 Q 50,54 84,74" />
          <path d="M 26,16 Q 46,50 26,84" />
          <path d="M 74,16 Q 54,50 74,84" />
        </svg>
      );
    }
    return null;
  };

  return (
    <div
      className="hidden md:block absolute pointer-events-none transition-transform duration-300 ease-out animate-float-slow md:opacity-40"
      style={{
        ...style,
        transform: `translate(${translateX}px, ${translateY}px)`,
        animationDelay: `${delay}s`,
      }}
    >
      {renderSVG()}
    </div>
  );
}

// ----------------- CAROUSEL COMPONENT FOR MANIFESTO -----------------
const CAROUSEL_IMAGES = [
  {
    url: "https://i.ibb.co/rK8PV8j7/Whats-App-Image-2026-07-06-at-15-21-38.jpg",
    alt: "Recreação infantil ativa - Tios Edy e Gab brincando com crianças",
    caption: "Fugimos das telas: estimulamos o desenvolvimento motor e criamos vínculos sociais autênticos com brincadeiras ativas e saudáveis."
  },
  {
    url: "https://i.ibb.co/BVY297Qy/Whats-App-Image-2026-07-06-at-15-21-39.jpg",
    alt: "Crianças brincando alegremente - Tios Edy e Gab",
    caption: "Profissionais qualificados de Educação Física entregando diversão inteligente, afeto e segurança integral para o seu evento."
  }
];

function ManifestoCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // Auto-play loop
  useEffect(() => {
    if (isHovered || lightboxOpen) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % CAROUSEL_IMAGES.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [isHovered, lightboxOpen]);

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prevIndex) => (prevIndex - 1 + CAROUSEL_IMAGES.length) % CAROUSEL_IMAGES.length);
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prevIndex) => (prevIndex + 1) % CAROUSEL_IMAGES.length);
  };

  // Touch Swipe Gesture Mechanics
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    const swipeThreshold = 50; // pixels
    if (diff > swipeThreshold) {
      handleNext();
    } else if (diff < -swipeThreshold) {
      handlePrev();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <div 
      className="mt-12 max-w-3xl mx-auto px-4"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        className="relative overflow-hidden rounded-3xl border-2 border-white/10 bg-navy-medium/30 shadow-2xl group cursor-zoom-in"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onClick={() => setLightboxOpen(true)}
      >
        {/* Slider container */}
        <div 
          className="flex transition-transform duration-500 ease-out h-[280px] sm:h-[420px]"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {CAROUSEL_IMAGES.map((img, index) => (
            <div key={index} className="w-full h-full shrink-0 relative">
              <img 
                src={img.url} 
                alt={img.alt} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                referrerPolicy="no-referrer"
              />
              {/* Bottom gradient overlay */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-dark/95 via-navy-dark/40 to-transparent p-6 pt-16 text-left">
                <p className="text-xs font-bold tracking-widest text-gold uppercase mb-1">
                  Recreação em Ação
                </p>
                <p className="text-xs sm:text-sm md:text-base text-offwhite/90 font-medium leading-relaxed">
                  {img.caption}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Zoom Help Overlay */}
        <div className="absolute top-4 right-4 bg-navy-dark/65 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5 pointer-events-none text-xs text-offwhite/85">
          <Maximize2 className="w-3.5 h-3.5 text-gold" />
          <span>Toque para ampliar</span>
        </div>

        {/* Left Arrow */}
        <button
          onClick={handlePrev}
          className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-navy-dark/50 hover:bg-navy-dark/80 text-white border border-white/10 flex items-center justify-center backdrop-blur-sm transition-all opacity-100 md:opacity-0 md:group-hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-gold interactive-item"
          aria-label="Imagem anterior"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Right Arrow */}
        <button
          onClick={handleNext}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-navy-dark/50 hover:bg-navy-dark/80 text-white border border-white/10 flex items-center justify-center backdrop-blur-sm transition-all opacity-100 md:opacity-0 md:group-hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-gold interactive-item"
          aria-label="Próxima imagem"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {CAROUSEL_IMAGES.map((_, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex(index);
              }}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'w-6 bg-gold' : 'w-2 bg-white/40 hover:bg-white/65'
              }`}
              aria-label={`Ir para slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center backdrop-blur-md p-4"
          onClick={() => setLightboxOpen(false)}
        >
          {/* Close Button */}
          <button 
            className="absolute top-4 right-4 md:top-6 md:right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 text-white border border-white/15 flex items-center justify-center transition-colors interactive-item"
            onClick={() => setLightboxOpen(false)}
          >
            <X className="w-6 h-6" />
          </button>

          {/* Lightbox Image Container */}
          <div 
            className="relative max-w-5xl w-full max-h-[75vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={CAROUSEL_IMAGES[currentIndex].url} 
              alt={CAROUSEL_IMAGES[currentIndex].alt} 
              className="max-w-full max-h-[75vh] object-contain rounded-2xl shadow-2xl border border-white/10"
              referrerPolicy="no-referrer"
            />

            {/* Lightbox Left Arrow */}
            <button
              onClick={handlePrev}
              className="absolute left-2 md:-left-16 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 text-white border border-white/15 flex items-center justify-center transition-all focus:outline-none interactive-item"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Lightbox Right Arrow */}
            <button
              onClick={handleNext}
              className="absolute right-2 md:-right-16 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 text-white border border-white/15 flex items-center justify-center transition-all focus:outline-none interactive-item"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Caption in Lightbox */}
          <div className="mt-6 text-center max-w-2xl px-4 pointer-events-none">
            <p className="text-gold text-xs uppercase tracking-widest font-black mb-1.5">
              Fotografia {currentIndex + 1} de {CAROUSEL_IMAGES.length}
            </p>
            <p className="text-offwhite/90 text-sm sm:text-base leading-relaxed">
              {CAROUSEL_IMAGES[currentIndex].caption}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

// Global Config & Lists
const SPORTS = [
  { name: 'Futebol de campo & Futsal', detail: 'Fundamentos, drible e cooperação tática.' },
  { name: 'Vôlei de quadra & praia', detail: 'Toque, manchete e senso de posicionamento.' },
  { name: 'Basquetebol', detail: 'Arremessos, passes e coordenação olho-mão.' },
  { name: 'Tênis (bola vermelha e laranja)', detail: 'Adaptação lúdica para coordenação fina.' },
  { name: 'Futevôlei (14+)', detail: 'Desenvolvimento motor avançado e agilidade.' },
  { name: 'Patinação', detail: 'Equilíbrio dinâmico e controle de postura.' },
  { name: 'Handebol', detail: 'Arremessos precisos e espírito coletivo.' },
];

const GAMES = [
  'Queimada e variações', 'Pique Bandeira', 'Corrida Pedra-Papel-Tesoura',
  'Canibal', 'Caça ao Tesouro', 'Camuflagem', 'Polícia e Ladrão',
  'Desafios com corda', 'Estafetas Criativas', 'Brincadeiras de Roda Clássicas'
];

const METHOD_ASPECTS = [
  { title: "Desenvolvimento Motor", desc: "Aprimoramento da coordenação motora ampla, equilíbrio dinâmico, lateralidade e agilidade com foco no repertório corporal.", color: "text-blue-vib border-blue-vib/30 bg-blue-vib/5" },
  { title: "Habilidades Cognitivas", desc: "Estratégia de jogo, tomada de decisão veloz sob pressão lúdica e resolução criativa de desafios esportivos.", color: "text-red-vib border-red-vib/30 bg-red-vib/5" },
  { title: "Socialização Ativa", desc: "Trabalho em equipe real, respeito mútuo, entendimento de regras coletivas, empatia e o verdadeiro fair-play.", color: "text-gold border-gold/30 bg-gold/5" },
  { title: "Equilíbrio Emocional", desc: "Desenvolvimento de autoconfiança, superação saudável de frustrações e canalização de energia de forma positiva.", color: "text-pink-vib border-pink-vib/30 bg-pink-vib/5" },
];

export default function App() {
  const [navScrolled, setNavScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [durationTab, setDurationTab] = useState<'3h' | '4h'>('3h');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeSection, setActiveSection] = useState('hero');

  // Set page title on mount
  useEffect(() => {
    document.title = "EDy & Gab — Recreação e Personal Kids";
  }, []);

  // Track scroll for glassmorphism nav & active link
  useEffect(() => {
    const handleScroll = () => {
      setNavScrolled(window.scrollY > 40);
      
      const sections = ['quemsomos', 'metodo', 'esportes', 'pacotes', 'contato'];
      const scrollPos = window.scrollY + 120;
      for (const sec of sections) {
        const el = document.getElementById(sec);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sec);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Hero parallax mouse tracker
  const handleHeroMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    setMousePos({
      x: clientX - centerX,
      y: clientY - centerY
    });
  };

  const handleHeroMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  // Nav click smooth scrolling helper
  const scrollToId = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // nav height
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Pre-filled WhatsApp builder
  const getWhatsAppLink = (number: string, message: string) => {
    return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
  };

  // Pre-filled messages
  const baseMessageEdy = "Olá Tio Edy! Vi o site e gostaria de conversar sobre recreação / personal kids.";
  const baseMessageGab = "Olá Tio Gab! Vi o site e gostaria de conversar sobre recreação / personal kids.";

  return (
    <div className="custom-cursor-enabled min-h-screen font-sans bg-navy-dark text-offwhite overflow-x-hidden relative selection:bg-gold selection:text-navy-dark">
      {/* 1. Custom Cursor */}
      <CustomCursor />

      {/* 2. Persistent Floating WhatsApp Button with Continuous Ripple and Notification Badge */}
      <a
        href={getWhatsAppLink("5519987691956", "Olá Tio Edy e Tio Gab! Gostaria de agendar uma recreação infantil para meu evento.")}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-40 w-14 h-14 md:w-16 md:h-16 bg-emerald-500 rounded-full flex items-center justify-center text-white shadow-lg transition-transform hover:scale-110 active:scale-95 group interactive-item"
        title="Fale Conosco"
      >
        {/* Pulsing Ripple Effect */}
        <span className="absolute inset-0 rounded-full bg-emerald-500/40 animate-ripple pointer-events-none" />
        <span className="absolute inset-0 rounded-full bg-emerald-500/20 animate-ripple pointer-events-none" style={{ animationDelay: '0.6s' }} />
        
        <WhatsAppIcon className="w-8 h-8 relative z-10 transition-transform group-hover:rotate-12" />
        
        {/* Unread message indicator badge */}
        <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-vib text-white rounded-full text-[10px] font-bold flex items-center justify-center animate-bounce shadow">
          1
        </span>
      </a>

      {/* 3. Global Navbar with Progressive Glassmorphism */}
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          navScrolled 
            ? 'bg-navy-dark/90 py-4 glass-nav shadow-lg' 
            : 'bg-transparent py-6 border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo Brand Brand */}
          <div 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
            className="flex items-center cursor-pointer group interactive-item"
          >
            <OfficialLogoCrest className="w-36 h-18 sm:w-40 sm:h-20 md:w-48 md:h-24 transition-transform group-hover:scale-105" />
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-8">
            {[
              { id: 'quemsomos', label: 'Quem Somos' },
              { id: 'metodo', label: 'Método' },
              { id: 'esportes', label: 'Esportes' },
              { id: 'pacotes', label: 'Pacotes' },
              { id: 'contato', label: 'Contato' }
            ].map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToId(link.id)}
                className={`text-sm font-semibold tracking-wide hover:text-gold transition-colors interactive-item relative py-1 ${
                  activeSection === link.id ? 'text-gold' : 'text-offwhite/80'
                }`}
              >
                {link.label}
                {activeSection === link.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold rounded-full" />
                )}
              </button>
            ))}
          </div>

          {/* Desktop CTA Button */}
          <div className="hidden lg:block">
            <a
              href={getWhatsAppLink("5519987691956", "Olá Tio Edy e Tio Gab! Gostaria de falar com vocês sobre a recreação infantil para um evento.")}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 rounded-full bg-gold hover:bg-gold-hover text-navy-dark font-extrabold text-sm tracking-wide shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 flex items-center gap-2 interactive-item"
            >
              <WhatsAppIcon className="w-4 h-4" />
              Fale no WhatsApp
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-offwhite p-2 hover:bg-white/5 rounded-full transition-colors focus:outline-none interactive-item"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 animate-pulse" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Slide-down Menu */}
        <div
          className={`lg:hidden absolute inset-x-0 top-full bg-navy-medium border-b border-white/10 shadow-2xl transition-all duration-300 ease-in-out origin-top ${
            mobileMenuOpen ? 'opacity-100 scale-y-100 pointer-events-auto' : 'opacity-0 scale-y-0 pointer-events-none'
          }`}
        >
          <div className="px-6 py-8 flex flex-col gap-6">
            {[
              { id: 'quemsomos', label: 'Quem Somos' },
              { id: 'metodo', label: 'Método' },
              { id: 'esportes', label: 'Esportes e Jogos' },
              { id: 'pacotes', label: 'Pacotes e Valores' },
              { id: 'contato', label: 'Fale Conosco' }
            ].map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToId(link.id)}
                className="text-left text-base font-bold tracking-wide text-offwhite/90 hover:text-gold transition-colors py-3 border-b border-white/5 interactive-item"
              >
                {link.label}
              </button>
            ))}
            <a
              href={getWhatsAppLink("5519987691956", "Olá Tio Edy e Tio Gab! Gostaria de agendar uma recreação infantil.")}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 rounded-2xl bg-gold text-navy-dark font-extrabold text-center tracking-wide flex items-center justify-center gap-2.5 shadow-lg interactive-item"
            >
              <WhatsAppIcon className="w-5 h-5" />
              Chamar no WhatsApp
            </a>
          </div>
        </div>
      </nav>

      {/* 4. HERO SECTION */}
      <section
        id="hero"
        className="relative pt-32 pb-24 md:pt-40 md:pb-36 flex flex-col items-center justify-center min-h-[90vh] overflow-hidden"
        onMouseMove={handleHeroMouseMove}
        onMouseLeave={handleHeroMouseLeave}
      >
        {/* Background Organic SVGs (Blobs Animados) */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-vib/10 rounded-full blur-[80px] animate-blob-1 pointer-events-none" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-vib/10 rounded-full blur-[110px] animate-blob-2 pointer-events-none" />
        
        {/* Canvas de partículas de sabão / bubbles */}
        <BubbleCanvas />

        {/* Floating Parallax Elements (Flat Line-Art Sports Balls) */}
        <FloatingSportsBall type="futebol" style={{ top: '22%', left: '12%', width: '70px', height: '70px' }} mousePos={mousePos} factor={0.04} delay={0} />
        <FloatingSportsBall type="basquete" style={{ bottom: '25%', left: '16%', width: '85px', height: '85px' }} mousePos={mousePos} factor={-0.03} delay={1.5} />
        <FloatingSportsBall type="volei" style={{ top: '28%', right: '14%', width: '75px', height: '75px' }} mousePos={mousePos} factor={0.05} delay={3} />
        <FloatingSportsBall type="futebol" style={{ bottom: '20%', right: '18%', width: '90px', height: '90px' }} mousePos={mousePos} factor={-0.045} delay={4.5} />

        {/* Hero content container */}
        <div className="max-w-5xl mx-auto px-6 md:px-12 text-center relative z-10">
          
          {/* Strong Headline */}
          <Reveal delay={250}>
            <h1 className="font-display font-extrabold text-3xl sm:text-5xl md:text-6xl text-offwhite tracking-tight leading-tight max-w-4xl mx-auto">
              Recreação de verdade, feita por quem <span className="text-gold">entende de criança!</span>
            </h1>
          </Reveal>

          {/* Sincere Subheadline referencing formation */}
          <Reveal delay={400}>
            <p className="text-base sm:text-lg md:text-xl text-offwhite/80 max-w-2xl mx-auto mt-6 leading-relaxed">
              Diversão, esporte e socialização em Campinas e região. Atividades lúdicas conduzidas por <strong className="text-gold">Tio Edy</strong> e <strong className="text-gold">Tio Gab</strong>, professores formados em Educação Física.
            </p>
          </Reveal>

          {/* CTAs */}
          <Reveal delay={550}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
              <button
                onClick={() => scrollToId('pacotes')}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gold hover:bg-gold-hover text-navy-dark font-extrabold text-base shadow-xl hover:-translate-y-0.5 hover:shadow-gold/10 transition-all duration-300 interactive-item"
              >
                Ver Pacotes de Festa
              </button>
              <a
                href={getWhatsAppLink("5519987691956", "Olá Tio Edy e Tio Gab! Vim do site e gostaria de agendar uma recreação infantil.")}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-navy-medium/80 border border-white/10 hover:bg-navy-light text-offwhite font-extrabold text-base shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 interactive-item"
              >
                <WhatsAppIcon className="w-5 h-5 text-emerald-400" />
                Falar no WhatsApp
              </a>
            </div>
          </Reveal>

          {/* Formados badge */}
          <Reveal delay={700} className="mt-12 flex justify-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-vib/10 border border-blue-vib/20 text-blue-vib text-xs font-bold tracking-wide uppercase">
              <ShieldCheck className="w-4 h-4" />
              100% dos Recreadores Formados em Educação Física
            </div>
          </Reveal>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-75 animate-bounce z-10 pointer-events-none">
          <span className="text-[10px] uppercase font-bold tracking-widest text-gold/80">Rolar</span>
          <ArrowDownCircle className="w-5 h-5 text-gold/80" />
        </div>
      </section>

      {/* 5. QUEM SOMOS SECTION */}
      <section id="quemsomos" className="py-24 bg-navy-medium/30 relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold tracking-widest text-gold uppercase px-3.5 py-1.5 rounded-full bg-gold/10 border border-gold/20">
              Professores de Educação Física
            </span>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl text-offwhite mt-4">
              Quem são os Tios?
            </h2>
            <p className="text-sm md:text-base text-offwhite/70 mt-2">
              Profissionais preparados que transformam qualquer espaço em uma quadra mágica de alegria e cooperação.
            </p>
          </div>

          {/* Cards container */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            
            {/* Tio Edy */}
            <Reveal delay={100}>
              <TiltCard color="rgba(46, 125, 209, 0.25)" className="h-full flex flex-col justify-between">
                <div>
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-blue-vib to-cyan-400 flex items-center justify-center shadow-lg mb-6">
                    <span className="font-display font-extrabold text-3xl text-white">TE</span>
                  </div>
                  <h3 className="font-display font-extrabold text-2xl text-offwhite">
                    Tio Edy <span className="text-blue-vib text-lg font-sans font-medium block md:inline md:ml-1">(Edros Filho)</span>
                  </h3>
                  <div className="inline-block mt-1.5 px-3 py-1 rounded-full bg-blue-vib/10 border border-blue-vib/20 text-blue-vib text-xs font-bold uppercase tracking-wider">
                    4 Anos de Experiência
                  </div>
                  <p className="text-sm md:text-base text-offwhite/80 mt-4 leading-relaxed">
                    Formado em Educação Física pela FEF Unicamp, unindo paixão pelo esporte ao universo infantil. Possui uma conexão genuína que faz com que as crianças se sintam seguras, ativas e integradas ao grupo desde o primeiro minuto.
                  </p>
                </div>
                <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-end">
                  <a
                    href={getWhatsAppLink("5519987691956", baseMessageEdy)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-blue-vib hover:bg-blue-vib/80 text-white rounded-xl transition-all hover:scale-105 active:scale-95 flex items-center gap-1.5 text-xs font-bold interactive-item"
                  >
                    <WhatsAppIcon className="w-4 h-4" />
                    Chamar Edy
                  </a>
                </div>
              </TiltCard>
            </Reveal>

            {/* Tio Gab */}
            <Reveal delay={250}>
              <TiltCard color="rgba(194, 59, 124, 0.25)" className="h-full flex flex-col justify-between">
                <div>
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-pink-vib to-rose-400 flex items-center justify-center shadow-lg mb-6">
                    <span className="font-display font-extrabold text-3xl text-white">TG</span>
                  </div>
                  <h3 className="font-display font-extrabold text-2xl text-offwhite">
                    Tio Gab <span className="text-pink-vib text-lg font-sans font-medium block md:inline md:ml-1">(Gabriel Lima)</span>
                  </h3>
                  <div className="inline-block mt-1.5 px-3 py-1 rounded-full bg-pink-vib/10 border border-pink-vib/20 text-pink-vib text-xs font-bold uppercase tracking-wider">
                    2 Anos de Experiência
                  </div>
                  <p className="text-sm md:text-base text-offwhite/80 mt-4 leading-relaxed">
                    Professor de Educação Física dedicado que enxerga o lazer como a ferramenta educativa mais potente. Une ensino esportivo técnico com dinâmicas de acolhimento para garantir que todas as idades joguem em perfeita harmonia.
                  </p>
                </div>
                <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-end">
                  <a
                    href={getWhatsAppLink("5519996571077", baseMessageGab)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-pink-vib hover:bg-pink-vib/80 text-white rounded-xl transition-all hover:scale-105 active:scale-95 flex items-center gap-1.5 text-xs font-bold interactive-item"
                  >
                    <WhatsAppIcon className="w-4 h-4" />
                    Chamar Gab
                  </a>
                </div>
              </TiltCard>
            </Reveal>

          </div>
        </div>
      </section>

      {/* 6. MANIFESTO (NOSSO OBJETIVO) */}
      <section className="py-24 relative overflow-hidden bg-navy-dark">
        {/* Glow behind section */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-gold/5 rounded-full blur-[140px] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center relative z-10">
          <Reveal>
            <div className="inline-flex items-center gap-1 text-gold/95 font-semibold text-sm tracking-wider uppercase mb-6">
              <Smile className="w-5 h-5 text-gold" />
              Nossa Filosofia
            </div>
            <h2 className="font-display font-black text-2xl sm:text-4xl md:text-5xl tracking-tight text-offwhite leading-tight">
              Acreditamos em recreação de qualidade: <span className="text-gold">com movimento, afeto e diversão real!</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-offwhite/75 mt-8 leading-relaxed font-sans max-w-3xl mx-auto">
              Nossa missão é resgatar o valor do <strong className="text-gold font-semibold">brincar coletivo</strong> e levar repertório saudável para festas infantis e aulas de personal. Fugimos do entretenimento passivo de telas: estimulamos o desenvolvimento motor, criamos vínculos sociais autênticos e ensinamos esportes de forma leve, respeitando o ritmo e a individualidade de cada criança.
            </p>
          </Reveal>

          <Reveal delay={400}>
            <ManifestoCarousel />
          </Reveal>
        </div>
      </section>

      {/* 7. MÉTODO (PERSONAL KIDS) */}
      <section id="metodo" className="py-24 bg-navy-medium/20 relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Concept side */}
            <div className="lg:col-span-5">
              <Reveal>
                <span className="text-xs font-bold tracking-widest text-gold uppercase px-3 py-1.5 rounded-full bg-gold/10 border border-gold/20">
                  Ciência e Prática
                </span>
                <h2 className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl text-offwhite mt-4 tracking-tight leading-tight">
                  Conceito Personal Kids & Recreação Ativa
                </h2>
                <p className="text-sm sm:text-base text-offwhite/85 mt-6 leading-relaxed">
                  Trabalhamos fundamentados na consagrada <strong className="text-gold font-medium">metodologia de Gallahue</strong> voltada à educação infantil. Cada jogo proposto tem um objetivo de desenvolvimento que estimula as conexões neurais e o bem-estar motor das crianças de forma natural e sem cobrança excessiva.
                </p>
                
                {/* Methodology details */}
                <div className="mt-8 space-y-4">
                  {[
                    "Escuta ativa para mediar conflitos e gerar harmonia nas brincadeiras",
                    "Exercícios customizados para as necessidades motoras da criança",
                    "Resgate de brincadeiras tradicionais que estimulam o corpo"
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-gold/10 border border-gold/35 flex items-center justify-center text-gold mt-1 shrink-0">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-sm text-offwhite/75">{item}</span>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

            {/* Aspects cards grid */}
            <div className="lg:col-span-7 grid sm:grid-cols-2 gap-6">
              {METHOD_ASPECTS.map((aspect, index) => (
                <Reveal key={index} delay={index * 120} className="h-full">
                  <div className={`p-6 rounded-2xl border ${aspect.color} backdrop-blur-sm h-full flex flex-col justify-between transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg`}>
                    <div>
                      <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-4 text-inherit">
                        {index === 0 && <Activity className="w-6 h-6" />}
                        {index === 1 && <Brain className="w-6 h-6" />}
                        {index === 2 && <Users className="w-6 h-6" />}
                        {index === 3 && <Heart className="w-6 h-6" />}
                      </div>
                      <h3 className="font-display font-bold text-lg text-offwhite">
                        {aspect.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-offwhite/70 mt-2 leading-relaxed">
                        {aspect.desc}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* 8. ESPORTES E MODALIDADES */}
      <section id="esportes" className="py-24 bg-navy-dark relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold tracking-widest text-gold uppercase px-3.5 py-1.5 rounded-full bg-gold/10 border border-gold/20">
              Esportes de Verdade
            </span>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl text-offwhite mt-4">
              Modalidades Praticadas
            </h2>
            <p className="text-sm md:text-base text-offwhite/70 mt-2">
              Liberdade total para estruturar campeonatos e práticas esportivas reais adaptadas para a idade dos participantes.
            </p>
          </div>

          {/* Sports Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {SPORTS.map((sport, index) => (
              <Reveal key={index} delay={index * 80}>
                <div className="p-6 rounded-2xl bg-navy-medium/40 border border-white/5 hover:border-gold/30 hover:bg-navy-medium/60 transition-all duration-300 group interactive-item">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/20 text-gold flex items-center justify-center transition-transform group-hover:scale-110">
                      <Trophy className="w-5 h-5" />
                    </div>
                    <h3 className="font-display font-bold text-base text-offwhite">
                      {sport.name}
                    </h3>
                  </div>
                  <p className="text-xs text-offwhite/60 mt-3 leading-relaxed">
                    {sport.detail}
                  </p>
                </div>
              </Reveal>
            ))}

            {/* Under Demand block */}
            <Reveal delay={300} className="sm:col-span-2 lg:col-span-3 xl:col-span-1">
              <div className="p-6 rounded-2xl bg-gradient-to-br from-navy-medium to-navy-light border border-dashed border-gold/30 h-full flex flex-col justify-center items-center text-center">
                <Sparkles className="w-8 h-8 text-gold animate-pulse mb-3" />
                <h3 className="font-display font-bold text-base text-offwhite">
                  Outras Modalidades?
                </h3>
                <p className="text-xs text-offwhite/60 mt-1 max-w-[200px]">
                  Basta conversar conosco! Adaptamos e criamos novas brincadeiras esportivas personalizadas.
                </p>
              </div>
            </Reveal>
          </div>

          {/* Interactive games cloud (Brincadeiras Clássicas) */}
          <div className="mt-20">
            <Reveal className="text-center max-w-xl mx-auto mb-10">
              <h3 className="font-display font-extrabold text-xl sm:text-2xl text-offwhite">
                Nossas Brincadeiras Clássicas Favoritas
              </h3>
              <p className="text-xs sm:text-sm text-offwhite/60 mt-1">
                Uma seleção nostálgica que resgata a verdadeira infância ativa ao ar livre.
              </p>
            </Reveal>

            {/* Tag Pills */}
            <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
              {GAMES.map((game, index) => (
                <Reveal key={index} delay={index * 50}>
                  <div className="px-4 py-2 rounded-full bg-navy-medium/60 border border-white/5 hover:border-gold/40 hover:bg-gold/10 text-xs sm:text-sm text-offwhite/80 hover:text-gold font-medium transition-all duration-300 cursor-default shadow-sm select-none">
                    ⚽ {game}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 9. DIFERENCIAIS SECTION (with count-up stats) */}
      <section className="py-24 bg-navy-medium/30 relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Big stats card */}
            <div className="lg:col-span-6 grid sm:grid-cols-2 gap-6">
              {[
                { count: 4, suffix: "+ Anos", label: "De experiência lúdica e de ensino" },
                { count: 10, suffix: "+", label: "Modalidades e jogos integrados" }
              ].map((stat, index) => (
                <Reveal key={index} delay={index * 120} className="h-full">
                  <div className="p-6 rounded-2xl bg-navy-medium/75 border border-white/5 backdrop-blur-sm text-center flex flex-col justify-center items-center h-full shadow-lg">
                    <CountUp end={stat.count} suffix={stat.suffix} />
                    <p className="text-xs text-offwhite/70 mt-3 font-medium leading-relaxed">
                      {stat.label}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Sincere text description */}
            <div className="lg:col-span-6">
              <Reveal>
                <span className="text-xs font-bold tracking-widest text-gold uppercase px-3 py-1.5 rounded-full bg-gold/10 border border-gold/20">
                  Diferenciais de Peso
                </span>
                <h2 className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl text-offwhite mt-4 tracking-tight leading-tight">
                  Por que escolher a EDy e Gab?
                </h2>
                <p className="text-sm sm:text-base text-offwhite/85 mt-6 leading-relaxed">
                  Não somos apenas monitores olhando o celular. Nós <strong className="text-gold font-medium">participamos, criamos e jogamos junto</strong>! Nossa formação profissional em Educação Física nos permite planejar atividades que evitam lesões, mantêm a energia em alta o tempo todo e garantem segurança de verdade para a tranquilidade de todos os pais.
                </p>
                <div className="mt-8 grid sm:grid-cols-2 gap-4">
                  {[
                    "Material esportivo completo e limpo",
                    "Acompanhamento focado e empático",
                    "Planejamento sob medida para a faixa etária",
                    "Flexibilidade e pontualidade exemplar"
                  ].map((bullet, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <Flame className="w-4 h-4 text-gold shrink-0" />
                      <span className="text-xs sm:text-sm text-offwhite/80">{bullet}</span>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

          </div>
        </div>
      </section>

      {/* 10. PACOTES E VALORES SECTION */}
      <section id="pacotes" className="py-24 bg-navy-dark relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold tracking-widest text-gold uppercase px-3.5 py-1.5 rounded-full bg-gold/10 border border-gold/20">
              Orçamento Transparente
            </span>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl text-offwhite mt-4">
              Pacotes de Recreação para Festas
            </h2>
            <p className="text-sm md:text-base text-offwhite/70 mt-2">
              Selecione o tempo ideal para sua comemoração e fale conosco para fechar seu dia mágico.
            </p>

            {/* Dynamic duration toggle switch with smooth capsule hover */}
            <div className="inline-flex items-center bg-navy-medium p-1 rounded-2xl border border-white/5 mt-8 shadow-inner relative overflow-hidden">
              <button
                onClick={() => setDurationTab('3h')}
                className={`relative z-10 px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm tracking-wide transition-all duration-300 interactive-item ${
                  durationTab === '3h' ? 'text-navy-dark font-extrabold' : 'text-offwhite/80 hover:text-offwhite'
                }`}
              >
                3 Horas de Festa
              </button>
              <button
                onClick={() => setDurationTab('4h')}
                className={`relative z-10 px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm tracking-wide transition-all duration-300 interactive-item ${
                  durationTab === '4h' ? 'text-navy-dark font-extrabold' : 'text-offwhite/80 hover:text-offwhite'
                }`}
              >
                4 Horas de Festa
              </button>
              {/* Gold sliding capsule */}
              <div
                className="absolute top-1 bottom-1 left-1 bg-gold rounded-xl transition-all duration-300 ease-out shadow"
                style={{
                  width: 'calc(50% - 4px)',
                  transform: durationTab === '3h' ? 'translateX(0)' : 'translateX(100%)',
                }}
              />
            </div>
          </div>

          {/* Pricing cards wrapper */}
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto items-stretch">
            
            {/* Card 1: 10 Crianças */}
            <Reveal delay={100} className="h-full">
              <div className="p-8 rounded-3xl bg-navy-medium/40 border border-white/5 flex flex-col justify-between h-full hover:border-white/10 transition-all duration-300 group">
                <div>
                  <h3 className="font-display font-extrabold text-xl text-offwhite">Até 10 Crianças</h3>
                  <p className="text-xs text-offwhite/60 mt-1">Ideal para reuniões menores e íntimas</p>
                  
                  <div className="mt-6 flex items-baseline gap-1.5">
                    <span className="text-sm font-bold text-gold">R$</span>
                    <span className="text-5xl font-display font-extrabold text-gold tracking-tight">
                      {durationTab === '3h' ? '540' : '665'}
                    </span>
                    <span className="text-xs text-offwhite/40 ml-1">/ festa</span>
                  </div>

                  <ul className="mt-8 space-y-4">
                    <li className="flex items-center gap-2.5 text-xs sm:text-sm text-offwhite/85">
                      <div className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <strong>1 Recreador</strong> qualificado
                    </li>
                    <li className="flex items-center gap-2.5 text-xs sm:text-sm text-offwhite/85">
                      <div className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      Jogos esportivos clássicos
                    </li>
                    <li className="flex items-center gap-2.5 text-xs sm:text-sm text-offwhite/85">
                      <div className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      Material básico incluído
                    </li>
                  </ul>
                </div>

                <div className="mt-10">
                  <a
                    href={getWhatsAppLink("5519987691956", `Olá Tio Edy e Tio Gab! Gostaria de reservar o pacote de Recreação de ${durationTab === '3h' ? '3 horas' : '4 horas'} para até 10 crianças (R$ ${durationTab === '3h' ? '540' : '665'}).`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-gold hover:text-navy-dark text-offwhite font-bold text-center text-sm block transition-all duration-300 interactive-item"
                  >
                    Quero este Pacote
                  </a>
                </div>
              </div>
            </Reveal>

            {/* Card 2: 20 Crianças (Most Popular) */}
            <Reveal delay={200} className="h-full">
              <div className="p-8 rounded-3xl bg-navy-medium/80 border-2 border-gold/80 flex flex-col justify-between h-full relative shadow-xl transform md:scale-102">
                
                {/* Popular Ribbon/Badge */}
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-gold text-navy-dark text-[10px] font-black uppercase tracking-widest shadow">
                  Mais Escolhido
                </span>

                <div>
                  <h3 className="font-display font-extrabold text-xl text-offwhite mt-2">Até 20 Crianças</h3>
                  <p className="text-xs text-gold font-bold mt-1">Ideal para a maioria dos aniversários</p>
                  
                  <div className="mt-6 flex items-baseline gap-1.5">
                    <span className="text-sm font-bold text-gold">R$</span>
                    <span className="text-5xl font-display font-extrabold text-gold tracking-tight">
                      {durationTab === '3h' ? '640' : '765'}
                    </span>
                    <span className="text-xs text-offwhite/40 ml-1">/ festa</span>
                  </div>

                  <ul className="mt-8 space-y-4">
                    <li className="flex items-center gap-2.5 text-xs sm:text-sm text-offwhite/85">
                      <div className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <strong className="text-gold">2 Recreadores</strong> (Edy e Gab!)
                    </li>
                    <li className="flex items-center gap-2.5 text-xs sm:text-sm text-offwhite/85">
                      <div className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      Dinâmica esportiva completa
                    </li>
                    <li className="flex items-center gap-2.5 text-xs sm:text-sm text-offwhite/85">
                      <div className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      Prêmio simbólico participativo
                    </li>
                    <li className="flex items-center gap-2.5 text-xs sm:text-sm text-offwhite/85">
                      <div className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      Kit de materiais esportivos
                    </li>
                  </ul>
                </div>

                <div className="mt-10">
                  <a
                    href={getWhatsAppLink("5519987691956", `Olá Tio Edy e Tio Gab! Gostaria de reservar o pacote MAIS POPULAR de Recreação de ${durationTab === '3h' ? '3 horas' : '4 horas'} para até 20 crianças (R$ ${durationTab === '3h' ? '640' : '765'}).`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 rounded-2xl bg-gold hover:bg-gold-hover text-navy-dark font-black text-center text-sm block transition-all duration-300 shadow-md interactive-item"
                  >
                    Reservar Agora
                  </a>
                </div>
              </div>
            </Reveal>

            {/* Card 3: 30 Crianças */}
            <Reveal delay={300} className="h-full">
              <div className="p-8 rounded-3xl bg-navy-medium/40 border border-white/5 flex flex-col justify-between h-full hover:border-white/10 transition-all duration-300 group">
                <div>
                  <h3 className="font-display font-extrabold text-xl text-offwhite">Até 30 Crianças</h3>
                  <p className="text-xs text-offwhite/60 mt-1">Indicado para grandes turmas ou condomínios</p>
                  
                  <div className="mt-6 flex items-baseline gap-1.5">
                    <span className="text-sm font-bold text-gold">R$</span>
                    <span className="text-5xl font-display font-extrabold text-gold tracking-tight">
                      {durationTab === '3h' ? '740' : '865'}
                    </span>
                    <span className="text-xs text-offwhite/40 ml-1">/ festa</span>
                  </div>

                  <ul className="mt-8 space-y-4">
                    <li className="flex items-center gap-2.5 text-xs sm:text-sm text-offwhite/85">
                      <div className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <strong className="text-gold">3 Recreadores</strong> inclusos
                    </li>
                    <li className="flex items-center gap-2.5 text-xs sm:text-sm text-offwhite/85">
                      <div className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      Atividades divididas em grupos
                    </li>
                    <li className="flex items-center gap-2.5 text-xs sm:text-sm text-offwhite/85">
                      <div className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      Mini torneio esportivo completo
                    </li>
                  </ul>
                </div>

                <div className="mt-10">
                  <a
                    href={getWhatsAppLink("5519987691956", `Olá Tio Edy e Tio Gab! Gostaria de reservar o pacote de Recreação de ${durationTab === '3h' ? '3 horas' : '4 horas'} para até 30 crianças (R$ ${durationTab === '3h' ? '740' : '865'}).`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-gold hover:text-navy-dark text-offwhite font-bold text-center text-sm block transition-all duration-300 interactive-item"
                  >
                    Quero este Pacote
                  </a>
                </div>
              </div>
            </Reveal>

          </div>

          {/* Under comment note */}
          <Reveal className="text-center mt-10">
            <p className="text-xs text-offwhite/40 max-w-xl mx-auto">
              *Os valores apresentados são de referência e podem apresentar pequenas variações conforme a faixa etária exata, estrutura e distância da localização no município de Campinas/SP.
            </p>
          </Reveal>

          {/* EXTRAS (Oficinas Adicionais) */}
          <div className="mt-20">
            <Reveal className="text-center mb-10">
              <span className="text-xs font-bold text-pink-vib uppercase tracking-wider bg-pink-vib/10 px-3 py-1 rounded-full">
                Serviços Adicionais
              </span>
              <h3 className="font-display font-extrabold text-2xl text-offwhite mt-2">
                Oficinas Extras para Completar a Festa
              </h3>
            </Reveal>

            {/* Extras list container */}
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {[
                { title: "Oficina de Slime", price: "155", desc: "Produção de slime artesanal guiada, onde cada criança leva seu potinho decorado personalizado para casa." },
                { title: "Oficina de Bolhas de Sabão", price: "160", desc: "Kit especial com 20 tubos profissionais de bolha gigante, garantindo diversão e fotos inesquecíveis." },
                { title: "Balões de Água", price: "90", desc: "Batalha refrescante de balões de água limpa, ideal para comemorações quentes ao ar livre no verão." }
              ].map((extra, idx) => (
                <Reveal key={idx} delay={idx * 100}>
                  <div className="p-6 rounded-2xl bg-navy-medium/30 border border-white/5 hover:border-gold/30 hover:bg-navy-medium/50 transition-all duration-300 h-full flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between">
                        <h4 className="font-display font-extrabold text-base text-offwhite">{extra.title}</h4>
                        <span className="text-xs bg-gold/10 text-gold font-bold px-2.5 py-1 rounded-lg">+{idx === 1 ? 'R$ 160' : `R$ ${extra.price}`}</span>
                      </div>
                      <p className="text-xs text-offwhite/70 mt-3 leading-relaxed">{extra.desc}</p>
                    </div>
                    <div className="mt-4 pt-4 border-t border-white/5">
                      <a
                        href={getWhatsAppLink("5519987691956", `Olá Tio Edy e Tio Gab! Gostaria de saber mais sobre a ${extra.title} como adicional para meu evento.`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-bold text-gold hover:text-offwhite transition-colors flex items-center gap-1 interactive-item"
                      >
                        <Plus className="w-3 h-3" /> Adicionar ao evento
                      </a>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 11. SINCERE WORK PHILOSOPHY / QUOTE */}
      <section className="py-24 bg-navy-medium/20 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center relative z-10">
          <Reveal>
            <Quote className="w-12 h-12 text-gold/30 mx-auto mb-6" />
            <h3 className="font-display font-extrabold text-lg sm:text-2xl md:text-3xl text-offwhite tracking-tight leading-relaxed italic">
              "A recreação é a parte mais lúdica do nosso trabalho. Praticamos a escuta ativa do feedback de cada criança para gerar harmonia perfeita nas brincadeiras."
            </h3>
            <p className="text-xs sm:text-sm text-gold uppercase tracking-widest font-black mt-6 block">
              — Tio Edy e Tio Gab, Professores de Educação Física
            </p>
          </Reveal>
        </div>
      </section>

      {/* 12. CONTATO / FINAL CTA */}
      <section id="contato" className="py-24 bg-navy-dark relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Info Column */}
            <div className="lg:col-span-5">
              <Reveal>
                <span className="text-xs font-bold tracking-widest text-gold uppercase px-3 py-1.5 rounded-full bg-gold/10 border border-gold/20">
                  Agenda Aberta
                </span>
                <h2 className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl text-offwhite mt-4 tracking-tight leading-tight">
                  Vamos planejar uma comemoração inesquecível?
                </h2>
                <p className="text-sm text-offwhite/80 mt-6 leading-relaxed">
                  Garanta a presença do <strong className="text-gold">Tio Edy</strong> e do <strong className="text-gold">Tio Gab</strong> na sua festa ou inicie as aulas particulares de Personal Kids para o desenvolvimento motor de seu filho.
                </p>

                {/* Direct info list */}
                <div className="mt-8 space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gold/10 text-gold flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold tracking-wider text-offwhite/40">Área de Atendimento</p>
                      <p className="text-sm font-bold text-offwhite">Campinas/SP e Região Metropolitana</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gold/10 text-gold flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold tracking-wider text-offwhite/40">Telefones para Contato</p>
                      <p className="text-sm font-bold text-offwhite">(19) 98769-1956  ·  (19) 99657-1077</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gold/10 text-gold flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold tracking-wider text-offwhite/40">E-mails de Suporte</p>
                      <p className="text-sm font-bold text-offwhite">edrosfilho@gmail.com  ·  limagab78@gmail.com</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Right Interactive Cards */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              <Reveal delay={150}>
                <div className="p-8 rounded-3xl bg-navy-medium border border-white/5 shadow-2xl relative overflow-hidden">
                  {/* Decorative background glow */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full blur-2xl" />
                  
                  <h3 className="font-display font-extrabold text-xl text-offwhite">Entre em contato diretamente</h3>
                  <p className="text-xs text-offwhite/60 mt-1">Clique para iniciar uma conversa no WhatsApp</p>

                  <div className="grid sm:grid-cols-2 gap-4 mt-8">
                    
                    {/* Tio Edy */}
                    <div className="p-5 rounded-2xl bg-navy-dark border border-white/5 hover:border-gold/30 transition-all">
                      <p className="font-display font-bold text-base text-offwhite">Tio Edy</p>
                      <p className="text-xs text-offwhite/50">(19) 98769-1956</p>
                      <a
                        href={getWhatsAppLink("5519987691956", "Olá Tio Edy! Gostaria de fazer um orçamento de recreação infantil.")}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full mt-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors interactive-item"
                      >
                        <WhatsAppIcon className="w-4 h-4" /> Chamar Tio Edy
                      </a>
                    </div>

                    {/* Tio Gab */}
                    <div className="p-5 rounded-2xl bg-navy-dark border border-white/5 hover:border-gold/30 transition-all">
                      <p className="font-display font-bold text-base text-offwhite">Tio Gab</p>
                      <p className="text-xs text-offwhite/50">(19) 99657-1077</p>
                      <a
                        href={getWhatsAppLink("5519996571077", "Olá Tio Gab! Gostaria de fazer um orçamento de recreação infantil.")}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full mt-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors interactive-item"
                      >
                        <WhatsAppIcon className="w-4 h-4" /> Chamar Tio Gab
                      </a>
                    </div>

                  </div>
                </div>
              </Reveal>
            </div>

          </div>
        </div>
      </section>

      {/* 13. FOOTER */}
      <footer className="bg-navy-medium py-16 border-t border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="grid md:grid-cols-4 gap-8 pb-12 border-b border-white/5">
            
            {/* Logo area */}
            <div className="md:col-span-2">
              <div className="flex items-center">
                <OfficialLogoCrest className="w-36 h-18 md:w-52 md:h-26" />
              </div>
              <p className="text-xs text-offwhite/50 mt-4 leading-relaxed max-w-sm">
                Entretenimento esportivo saudável para festas e desenvolvimento motor infantil em Campinas/SP. Realizado por profissionais graduados e apaixonados pelo brincar.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-display font-bold text-offwhite text-sm tracking-wide uppercase mb-4">Links Rápidos</h4>
              <ul className="space-y-2.5">
                {[
                  { id: 'quemsomos', label: 'Quem Somos' },
                  { id: 'metodo', label: 'Nosso Método' },
                  { id: 'esportes', label: 'Esportes' },
                  { id: 'pacotes', label: 'Pacotes' }
                ].map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => scrollToId(item.id)}
                      className="text-xs text-offwhite/60 hover:text-gold font-medium transition-colors text-left interactive-item"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Local info */}
            <div>
              <h4 className="font-display font-bold text-offwhite text-sm tracking-wide uppercase mb-4">Campinas/SP</h4>
              <p className="text-xs text-offwhite/60 leading-relaxed">
                Atendimento domiciliar, em condomínios, clubes, chácaras e escolas em Campinas e região.
              </p>
              <div className="mt-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-widest">Atendimento Ativo</span>
              </div>
            </div>

          </div>

          {/* Copyright signature */}
          <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-offwhite/40 text-center md:text-left">
              &copy; {new Date().getFullYear()} EDy e Gab Recreação e Personal Kids. Todos os direitos reservados.
            </p>
            <p className="text-[10px] text-offwhite/30 text-center md:text-right">
              Desenvolvido com carinho para as crianças de Campinas.
            </p>
          </div>

        </div>
      </footer>
    </div>
  );
}
