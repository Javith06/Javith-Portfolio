import { Reveal } from './Reveal';
import { personal } from '../data/portfolio';

const EmailIcon = () => (
  <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1.3em" width="1.3em" style={{ color: 'var(--violet)' }}>
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
    <polyline points="22,6 12,13 2,6"></polyline>
  </svg>
);

const LinkedInIcon = () => (
  <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1.3em" width="1.3em" style={{ color: 'var(--violet)' }}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const GitHubIcon = () => (
  <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1.3em" width="1.3em" style={{ color: 'var(--violet)' }}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

const PhoneIcon = () => (
  <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1.3em" width="1.3em" style={{ color: 'var(--violet)' }}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
  </svg>
);

const LINKS = [
  { label: 'Email', value: personal.email, href: `mailto:${personal.email}`, ext: false },
  { label: 'LinkedIn', value: `linkedin.com/in/${personal.linkedinHandle}`, href: personal.linkedin, ext: true },
  { label: 'GitHub', value: `github.com/${personal.githubHandle}`, href: personal.github, ext: true },
  { label: 'Phone', value: personal.phone, href: `tel:${personal.phone.replace(/\s/g,'')}`, ext: false },
];

export default function Contact() {
  return (
    <section id="contact" className="section">
      <div className="wrap">
        <Reveal><span className="lbl">Contact</span></Reveal>

        <div className="contact-grid">
          <Reveal delay={0.06} className="contact-left">
            <h2 className="contact-h2">
              Let's build<br />something<br /><em>useful</em>.
            </h2>
            <p className="contact-sub">
              Open to full-time roles, freelance projects,<br />
              contract work &amp; interesting problems.
            </p>
          </Reveal>

          <Reveal delay={0.14} className="contact-right">
            <p className="contact-body">
              I'm open to opportunities where I can work across the full
              stack — frontend, backend, mobile, or production systems.
              If you have a freelance project or opportunity to build, I'd like to hear about it.
              I respond quickly.
            </p>
            <div className="contact-rows">
              {LINKS.map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.ext ? '_blank' : undefined}
                  rel={link.ext ? 'noopener noreferrer' : undefined}
                  className="contact-row"
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div 
                      className="contact-icon-wrapper" 
                      style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        width: '38px', 
                        height: '38px', 
                        borderRadius: '50%', 
                        background: 'rgba(255, 255, 255, 0.02)', 
                        border: '1px solid var(--border)',
                        flexShrink: 0
                      }}
                    >
                      {link.label === 'Email' && <EmailIcon />}
                      {link.label === 'LinkedIn' && <LinkedInIcon />}
                      {link.label === 'GitHub' && <GitHubIcon />}
                      {link.label === 'Phone' && <PhoneIcon />}
                    </div>
                    <div>
                      <div className="c-lbl">{link.label}</div>
                      <div className="c-val">{link.value}</div>
                    </div>
                  </div>
                  <span className="c-arrow">↗</span>
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
