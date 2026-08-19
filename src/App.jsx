import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { useSpotlight } from './hooks/useSpotlight';

export default function App() {
  const spotlight = useSpotlight();

  return (
    <div 
      ref={spotlight.ref} 
      onMouseMove={spotlight.onMouseMove} 
      className="spotlight-wrapper"
    >
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

