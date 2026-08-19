import { personal } from '../data/portfolio';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <span className="footer-copy">
          © {new Date().getFullYear()} Mohammed Javith J — Software Developer
        </span>
        <div className="footer-links">
          <a href={`mailto:${personal.email}`} className="footer-link">Email</a>
          <a href={personal.linkedin} target="_blank" rel="noopener noreferrer" className="footer-link">LinkedIn</a>
          <a href={`tel:${personal.phone.replace(/\s/g,'')}`} className="footer-link">Phone</a>
        </div>
      </div>
    </footer>
  );
}
