import { Reveal } from './Reveal';
import { experience, education } from '../data/portfolio';

export default function Experience() {
  return (
    <section id="experience" className="section">
      <div className="wrap">
        <Reveal><span className="lbl">Experience &amp; Education</span></Reveal>
        <Reveal delay={0.04}>
          <h2 className="section-h2">Career<br />&amp; Studies.</h2>
        </Reveal>

        <div className="exp__cols">
          {/* Work */}
          <div>
            <Reveal delay={0.05}>
              <div className="col-head">Work Experience</div>
            </Reveal>
            {experience.map((job, i) => (
              <Reveal key={job.company} delay={0.08 + i * 0.06}>
                <div className="exp__item">
                  <div className="exp__top">
                    <div className="exp__role">{job.role}</div>
                    <div className="exp__period">{job.period}</div>
                  </div>
                  <div className="exp__company-row">
                    <a href={job.url} target="_blank" rel="noopener noreferrer" className="exp__company">
                      {job.company} ↗
                    </a>
                    <span className="exp__loc-sep">·</span>
                    <span className="exp__loc">{job.location}</span>
                  </div>
                  <ul className="exp__points">
                    {job.points.map((pt, j) => <li key={j}>{pt}</li>)}
                  </ul>
                  <div className="exp__tags">
                    {job.tags.map(t => <span key={t} className="tag">{t}</span>)}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Education */}
          <div>
            <Reveal delay={0.05}>
              <div className="col-head">Education</div>
            </Reveal>
            {education.map((edu, i) => (
              <Reveal key={edu.institution} delay={0.08 + i * 0.06}>
                <div className="edu__item">
                  <div className="edu__degree">{edu.degree}</div>
                  <div className="edu__school">{edu.institution}</div>
                  <div className="edu__meta">
                    <span className="edu__period">{edu.period}</span>
                    {edu.grade && <span className="edu__grade">{edu.grade}</span>}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
