import { Reveal } from './Reveal';
import { personal } from '../data/portfolio';

const LINKS = [
  { label: 'Email', value: personal.email, href: `mailto:${personal.email}`, ext: false },
  { label: 'LinkedIn', value: `linkedin.com/in/${personal.linkedinHandle}`, href: personal.linkedin, ext: true },
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
                  <div>
                    <div className="c-lbl">{link.label}</div>
                    <div className="c-val">{link.value}</div>
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
