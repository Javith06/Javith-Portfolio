import { motion, useMotionValue, useTransform } from 'framer-motion';
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
      style={{ display: 'inline-block', marginRight: '0.18em' }}
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

  // Transform values into actual degree rotations
  const rotateX = useTransform(y, [-300, 300], [10, -10]);
  const rotateY = useTransform(x, [-300, 300], [-10, 10]);

  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = event.clientX - rect.left - width / 2;
    const mouseY = event.clientY - rect.top - height / 2;

    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section 
      id="hero" 
      className="hero"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
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
