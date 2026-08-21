import { Reveal } from './Reveal';
import { projects } from '../data/portfolio';

/* ── Smart-POS UI mockup ─────────────────────────────────────────── */
function POSMock() {
  return (
    <div className="pos-wrap-outer">
      <div className="pos-screen">
        <div className="pos-bar">
          <div className="pos-bar-dot" />
          <div className="pos-bar-line" />
          <div className="pos-bar-tag" />
        </div>
        <div className="pos-body">
          <div className="pos-nav">
            {['Orders','Menu','Bills','Reports','Settings'].map(n => (
              <div key={n} className={`pos-nav-item${n==='Orders'?' on':''}`}>
                <div className="pos-nav-icon" />{n}
              </div>
            ))}
          </div>
          <div className="pos-main">
            <div className="pos-tables">
              {['T1','T2','T3','T4','T5','T6'].map((t,i) => (
                <div key={t} className={`pos-tbl${i===1?' occ':i===3?' bsy':''}`}>
                  <div className="pos-tbl-n">{t}</div>
                  <div className="pos-tbl-s">{i===1?'3 items':i===3?'Billing':'Free'}</div>
                </div>
              ))}
            </div>
            <div className="pos-right">
              <div className="pos-rh">Current Order</div>
              {[['Nasi Lemak','S$4.50'],['Teh Tarik','S$1.80'],['Roti Prata','S$2.20']].map(([n,p])=>(
                <div key={n} className="pos-row"><span>{n}</span><span className="pos-p">{p}</span></div>
              ))}
              <div className="pos-tot"><span>Total</span><span className="pos-tot-v">S$8.50</span></div>
              <div className="pos-btn">Pay via QR</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Hawker POS mockup ───────────────────────────────────────────── */
function HawkerMock() {
  return (
    <div className="hawk-outer">
      <div className="hawk-card">
        <div className="hawk-hd">
          <div className="hawk-logo" />
          <div className="hawk-badge">POS</div>
        </div>
        <div className="hawk-rows">
          {[['Chicken Rice','S$3.50'],['Mee Goreng','S$4.00'],['Laksa','S$5.50']].map(([n,p])=>(
            <div key={n} className="hawk-row">
              <div className="hawk-img" />
              <div><div className="hawk-name">{n}</div><div className="hawk-price">{p}</div></div>
              <div className="hawk-plus">+</div>
            </div>
          ))}
        </div>
        <div className="hawk-ft">
          <div className="hawk-cart">3 items · S$13.00</div>
          <div className="hawk-ck">Checkout</div>
        </div>
      </div>
    </div>
  );
}

/* ── Freelance mockup ─────────────────────────────────────────────── */
function FreelanceMock() {
  return (
    <div className="free-outer">
      <div className="free-card">
        <div className="free-nav">
          <div className="free-logo" />
          <div className="free-links">
            {['About','Work','Contact'].map(l=><div key={l} className="free-lnk">{l}</div>)}
          </div>
        </div>
        <div className="free-body">
          <div className="free-t1" />
          <div className="free-t2" />
          <div className="free-t3" />
          <div className="free-btn" />
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const featured = projects.find(p => p.featured);
  const rest = projects.filter(p => !p.featured);

  return (
    <section id="projects" className="section">
      <div className="wrap">
        <Reveal><span className="lbl">Projects</span></Reveal>
        <Reveal delay={0.04}>
          <h2 className="section-h2">Selected<br />Work.</h2>
        </Reveal>

        {featured && (
          <Reveal delay={0.06}>
            <div className="proj-feat">
              <div className="proj-feat__info">
                <div className="proj-type-badge">
                  <span className="proj-dot" /> {featured.type}
                </div>
                <h2 className="proj-feat__title">{featured.title}</h2>
                <p className="proj-feat__sub">{featured.subtitle}</p>
                <p className="proj-feat__desc">{featured.description}</p>
                <ul className="proj-feat__points">
                  {featured.points.map((pt,i) => <li key={i}>{pt}</li>)}
                </ul>
                <div className="proj-feat__tags">
                  {featured.tags.map(t => <span key={t} className="tag">{t}</span>)}
                </div>
              </div>
              <div className="proj-feat__vis" style={{ padding: 0, minHeight: 'auto' }}>
                <img 
                  src={`${import.meta.env.BASE_URL}smart-pos.jpg`} 
                  alt="Smart-POS restaurant Point of Sale preview" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} 
                />
              </div>
            </div>
          </Reveal>
        )}

        <div className="proj-grid">
          {rest.map((proj, i) => (
            <Reveal key={proj.id} delay={0.06 + i * 0.06}>
              <div className="proj-card">
                <div className="proj-card__prev">
                  {proj.id === 'hawker-pos' && (
                    <img 
                      src={`${import.meta.env.BASE_URL}hawker-pos.png`} 
                      alt="Hawker POS preview" 
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} 
                    />
                  )}
                  {proj.id === 'freelance' && <FreelanceMock />}
                </div>
                <div className="proj-card__body">
                  <div className="proj-card__title">
                    {proj.title}
                    <span className="proj-card__arrow">↗</span>
                  </div>
                  <p className="proj-card__desc">{proj.description}</p>
                  <div className="proj-card__tags">
                    {proj.tags.map(t => <span key={t} className="tag">{t}</span>)}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
