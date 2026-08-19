import { Reveal } from './Reveal';
import { skills } from '../data/portfolio';

export default function Skills() {
  return (
    <section id="skills" className="section">
      <div className="wrap">
        <Reveal><span className="lbl">Skills</span></Reveal>

        <div className="skills-hd">
          <Reveal delay={0.06}>
            <h2 className="skills-h2">Technical<br />capabilities.</h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="skills-desc">
              Across the full stack — building responsive UIs, production APIs,
              real-time systems, mobile apps, and cloud deployments. Experienced
              with POS hardware integration and payment services in live
              production environments.
            </p>
          </Reveal>
        </div>

        <div className="skills-grid">
          {skills.map((group, i) => (
            <Reveal key={group.category} delay={0.04 + i * 0.03} className="skill-box">
              <div className="skill-cat">{group.category}</div>
              <div className="skill-list">
                {group.items.map(item => (
                  <span key={item} className="skill-item">{item}</span>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
