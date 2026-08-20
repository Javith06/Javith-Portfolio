import { Reveal } from './Reveal';
import { summary, certifications, personal } from '../data/portfolio';

export default function About() {
  return (
    <section id="about" className="section">
      <div className="wrap">
        <Reveal><span className="lbl">About</span></Reveal>

        <div className="about__grid">
          <Reveal delay={0.08} className="about__left">
            <h2 className="about__head">
              Building<br />software<br />with purpose.
            </h2>
            <span className="about__chip">● Open to opportunities</span>
          </Reveal>

          <Reveal delay={0.18} className="about__right">
            <p className="about__body">{summary}</p>
            <div className="about__cert-wrap">
              <div className="about__cert-label">Certification</div>
              {certifications.map(c => (
                <div key={c.title} className="about__cert-item">
                  <span className="cert-check">✓</span>
                  <span>
                    {c.title}{' '}
                    <span style={{ color: 'var(--violet)', fontWeight: 600 }}>
                      — {c.issuer}
                    </span>
                  </span>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '36px' }}>
              <a 
                href={personal.resume} 
                download="Mohammed_Javith_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
                style={{ display: 'inline-flex', padding: '12px 24px', fontSize: '12px' }}
              >
                Download Resume
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
