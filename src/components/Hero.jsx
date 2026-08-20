import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { personal } from '../data/portfolio';

/* ─── Word-by-word stagger ─────────────────────────────────────────── */
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.055, delayChildren: 0.1 } },
};
const wordAnim = {
  hidden: { opacity: 0, y: 48 },
  show: {
    opacity: 1, y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};
function Word({ text }) {
  return (
    <motion.span
      variants={wordAnim}
      style={{ 
        display: 'inline-block', 
        marginRight: '0.18em',
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word'
      }}
    >
      {text}
    </motion.span>
  );
}

const up = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
});

/* ─── Hero ─────────────────────────────────────────────────────────── */
export default function Hero() {
  // Motion values for smooth 3D tilt interaction
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for premium fluid motion
  const springX = useSpring(x, { stiffness: 100, damping: 20 });
  const springY = useSpring(y, { stiffness: 100, damping: 20 });

  // Transform spring values into rotation degrees
  const rotateX = useTransform(springY, [-300, 300], [12, -12]);
  const rotateY = useTransform(springX, [-300, 300], [-12, 12]);

  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [motionSupported, setMotionSupported] = useState(false);
  const [motionActive, setMotionActive] = useState(false);
  const [permissionPromptNeeded, setPermissionPromptNeeded] = useState(false);

  const initialBetaRef = useRef(null);
  const initialGammaRef = useRef(null);

  const handleOrientation = (event) => {
    const { beta, gamma } = event;
    if (beta === null || gamma === null) return;

    if (initialBetaRef.current === null) {
      initialBetaRef.current = beta;
      initialGammaRef.current = gamma;
      return;
    }

    // Relative tilt from the baseline posture
    let diffBeta = beta - initialBetaRef.current;
    let diffGamma = gamma - initialGammaRef.current;

    // Clamp tilt angles to +/- 30 degrees
    diffBeta = Math.max(-30, Math.min(30, diffBeta));
    diffGamma = Math.max(-30, Math.min(30, diffGamma));

    // Scale to match the motion value range (-300 to 300)
    x.set(diffGamma * 10);
    y.set(diffBeta * 10);
  };

  useEffect(() => {
    const touch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    setIsTouchDevice(touch);

    if (touch && typeof window !== 'undefined') {
      if (window.DeviceOrientationEvent) {
        setMotionSupported(true);
        if (typeof DeviceOrientationEvent.requestPermission === 'function') {
          setPermissionPromptNeeded(true);
        } else {
          // Android / standard mobile browsers auto-grant permission
          window.addEventListener('deviceorientation', handleOrientation);
          setMotionActive(true);
        }
      }
    }

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
    };
  }, []);

  const requestMotionPermission = async () => {
    if (
      typeof DeviceOrientationEvent !== 'undefined' &&
      typeof DeviceOrientationEvent.requestPermission === 'function'
    ) {
      try {
        const state = await DeviceOrientationEvent.requestPermission();
        if (state === 'granted') {
          window.addEventListener('deviceorientation', handleOrientation);
          setMotionActive(true);
          setPermissionPromptNeeded(false);
        }
      } catch (err) {
        console.error('Error requesting orientation permission:', err);
      }
    }
  };

  const handleHeroTouch = () => {
    initialBetaRef.current = null;
    initialGammaRef.current = null;
  };

  const handleMouseMove = (event) => {
    if (isTouchDevice) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = event.clientX - rect.left - width / 2;
    const mouseY = event.clientY - rect.top - height / 2;

    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseLeave = () => {
    if (isTouchDevice) return;
    x.set(0);
    y.set(0);
  };

  return (
    <section 
      id="hero" 
      className="hero"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleHeroTouch}
      style={{ perspective: 1000 }}
    >

      {/* 5-blob mesh gradient — matches the purple/cream/olive image */}
      <div className="hero-mesh" aria-hidden="true">
        <div className="mesh-blob blob-cream" />
        <div className="mesh-blob blob-purple-l" />
        <div className="mesh-blob blob-purple-r" />
        <div className="mesh-blob blob-olive-l" />
        <div className="mesh-blob blob-olive-r" />
      </div>

      <motion.div 
        className="hero__wrap"
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
          transition: 'all 0.1s ease-out',
        }}
      >
        {/* eyebrow */}
        <motion.div className="hero__eyebrow" {...up(0.05)} style={{ transform: 'translateZ(20px)' }}>
          <span className="status-dot" />
          <span>{personal.location}</span>
          <span className="hero__eyebrow-sep">·</span>
          <span style={{ color: '#b8a8f0' }}>{personal.status}</span>
          {isTouchDevice && permissionPromptNeeded && !motionActive && (
            <>
              <span className="hero__eyebrow-sep">·</span>
              <button 
                onClick={(e) => { e.stopPropagation(); requestMotionPermission(); }} 
                className="hero__motion-enable-btn"
              >
                ✨ 3D Tilt
              </button>
            </>
          )}
        </motion.div>

        {/* name — word-by-word stagger, wrapped for left accent bar */}
        <div className="hero__name-wrap" style={{ transform: 'translateZ(40px)' }}>
          <motion.h1
            className="hero__name"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {personal.name.split(' ').map((w, i) => (
              <Word key={i} text={w} />
            ))}
          </motion.h1>
        </div>

        {/* role */}
        <motion.p className="hero__role" {...up(0.42)} style={{ transform: 'translateZ(30px)' }}>
          <strong>Software Developer</strong>
          <span style={{ color: 'var(--beige)', fontWeight: 400 }}> — Full-Stack &amp; Mobile</span>
        </motion.p>

        {/* animated rule */}
        <motion.div
          className="hero__rule"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.75, delay: 0.52, ease: [0.22, 1, 0.36, 1] }}
          style={{ transform: 'translateZ(25px)' }}
        />

        {/* description */}
        <motion.p className="hero__desc" {...up(0.58)} style={{ transform: 'translateZ(20px)' }}>
          Professional experience building and maintaining production web and
          mobile applications — React, React Native, Node.js, REST APIs, SQL,
          real-time communication, and cloud deployment.
        </motion.p>

        {/* CTAs */}
        <motion.div className="hero__ctas" {...up(0.68)} style={{ transform: 'translateZ(15px)' }}>
          <a
            href="#projects"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              fontFamily: 'var(--display)', fontSize: 13, fontWeight: 800,
              letterSpacing: '0.08em', textTransform: 'uppercase',
              padding: '15px 32px', borderRadius: 3, cursor: 'pointer',
              background: 'linear-gradient(135deg, #6b4fcc 0%, #8b60f0 100%)',
              color: '#fff',
              border: '2px solid transparent',
              boxShadow: '0 0 0 0 rgba(164,138,245,0)',
              transition: 'box-shadow 0.25s, transform 0.25s',
              position: 'relative', overflow: 'hidden',
            }}
          >
            View work <span className="arrow" style={{ display: 'inline-block', transition: 'transform 0.25s' }}>→</span>
          </a>
          <a
            href={`mailto:${personal.email}`}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              fontFamily: 'var(--display)', fontSize: 13, fontWeight: 800,
              letterSpacing: '0.08em', textTransform: 'uppercase',
              padding: '15px 32px', borderRadius: 3, cursor: 'pointer',
              background: 'transparent',
              color: 'rgba(201, 178, 138, 0.85)',
              border: '2px solid rgba(201, 178, 138, 0.28)',
              transition: 'border-color 0.25s, color 0.25s, background 0.25s, transform 0.25s',
            }}
          >
            Get in touch
          </a>
        </motion.div>

        {/* meta links */}
        <motion.div className="hero__meta" {...up(0.78)} style={{ transform: 'translateZ(10px)' }}>
          <a href={personal.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn ↗
          </a>
          <span className="hero__meta-sep">·</span>
          <a href={personal.github} target="_blank" rel="noopener noreferrer">
            GitHub ↗
          </a>
          <span className="hero__meta-sep">·</span>
          <a href={personal.resume} target="_blank" rel="noopener noreferrer">
            Resume ↗
          </a>
          <span className="hero__meta-sep">·</span>
          <span>{personal.email}</span>
          <span className="hero__meta-sep">·</span>
          <span>{personal.phone}</span>
        </motion.div>
      </motion.div>

      {/* scroll indicator */}
      <div className="hero__scroll" aria-hidden="true">
        <div className="scroll-line" />
        <span>scroll</span>
      </div>
    </section>
  );
}
