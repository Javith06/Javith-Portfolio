import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { personal } from '../data/portfolio';

const LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <motion.header
      className={`nav${scrolled ? ' scrolled' : ''}`}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="nav__inner">
        <a href="#hero" className="nav__logo">Javith's Portfolio</a>
        <nav className="nav__links" aria-label="Main navigation">
          {LINKS.map(l => (
            <a key={l.href} href={l.href} className="nav__link">{l.label}</a>
          ))}
        </nav>
        <a href={`mailto:${personal.email}`} className="nav__cta">Get in touch</a>
      </div>
    </motion.header>
  );
}
