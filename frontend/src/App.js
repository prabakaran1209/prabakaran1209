import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Lenis from "lenis";
import { ArrowUpRight, ChevronDown, Github, Linkedin, Menu, X } from "lucide-react";
import "@/App.css";

const profileImage = "https://images.unsplash.com/photo-1633766306924-90e6eccb8cde?auto=format&fit=crop&w=1200&q=85";

const projects = [
  {
    number: "01",
    name: "PASS//CHECK",
    kind: "Security utility / 2024",
    description: "A frontend web app that evaluates password strength in real time with instant visual feedback.",
    tags: ["HTML", "CSS", "JAVASCRIPT"],
    status: "LIVE BUILD",
  },
];

const skills = [
  ["01", "CYBERSECURITY", "Threat awareness · Web security · Secure habits"],
  ["02", "INFORMATION SECURITY", "Risk thinking · Privacy · Defensive practice"],
  ["03", "FRONTEND CRAFT", "HTML · CSS · JavaScript · Responsive UI"],
  ["04", "AI EXPLORATION", "Curiosity · Prototyping · Emerging systems"],
];

function Reveal({ children, className = "", delay = 0 }) {
  return (
    <motion.div className={className} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10%" }} transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
}

function Mark({ compact = false }) {
  return <span className={compact ? "mark mark-compact" : "mark"} aria-label="PS monogram"><span>P</span><span>S</span></span>;
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const heroRef = useRef(null);
  const { scrollY } = useScroll();
  const portraitY = useTransform(scrollY, [0, 800], [0, 110]);

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.08, smoothWheel: true });
    let rafId;
    const raf = (time) => { lenis.raf(time); rafId = requestAnimationFrame(raf); };
    rafId = requestAnimationFrame(raf);
    return () => { cancelAnimationFrame(rafId); lenis.destroy(); };
  }, []);

  const closeMenu = () => setMenuOpen(false);
  return (
    <main className="site-shell">
      <header className="topbar" data-testid="site-header">
        <a className="brand" href="#top" data-testid="brand-home"><Mark /><span>PRABAKARAN<span className="brand-dot">.</span></span></a>
        <div className="topbar-meta"><span className="status-dot" /> <span data-testid="availability-status">OPEN TO LEARNING / BUILDING</span></div>
        <nav className={menuOpen ? "nav-links nav-open" : "nav-links"} data-testid="main-navigation">
          <a href="#work" onClick={closeMenu} data-testid="nav-work">Work</a>
          <a href="#skills" onClick={closeMenu} data-testid="nav-skills">Skills</a>
          <a href="#contact" onClick={closeMenu} data-testid="nav-contact">Contact</a>
          <button className="menu-close" onClick={closeMenu} aria-label="Close menu" data-testid="close-menu"><X size={20} /></button>
        </nav>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Open menu" data-testid="open-menu">{menuOpen ? <X /> : <Menu />}</button>
      </header>

      <section className="hero" id="top" ref={heroRef} data-testid="hero-section">
        <div className="hero-grid" />
        <div className="hero-copy">
          <p className="eyebrow reveal-line" data-testid="hero-eyebrow"><span>01</span> / PROFILE INITIALIZED</p>
          <h1 data-testid="hero-title"><span className="line-mask"><span className="line">PRABAKARAN</span></span><span className="line-mask accent-line"><span className="line">S<span className="outline">.</span></span></span></h1>
          <div className="hero-bottom">
            <p className="hero-statement" data-testid="hero-statement">Expanding expertise in<br /><em>cybersecurity &amp; information security.</em></p>
            <a className="circle-cta" href="#work" data-testid="hero-work-link"><span>EXPLORE<br />THE WORK</span><ArrowUpRight size={22} /></a>
          </div>
        </div>
        <motion.div className="portrait-wrap" style={{ y: portraitY }} data-testid="hero-portrait">
          <div className="portrait-orbit orbit-one" /><div className="portrait-orbit orbit-two" />
          <div className="portrait-frame"><img src={profileImage} alt="Cybersecurity and technology portrait" /></div>
          <div className="portrait-label"><span>FIELD NOTE / 001</span><span>SECURE THE FUTURE</span></div>
        </motion.div>
        <div className="hero-index"><span>SCROLL TO DISCOVER</span><ChevronDown size={16} /></div>
        <div className="hero-side-note">BASED IN INDIA<br />BUILDING WITH INTENT</div>
      </section>

      <div className="marquee" aria-label="Areas of interest" data-testid="editorial-marquee"><div className="marquee-track"><span>SECURITY MINDED</span><i>✳</i><span>ALWAYS LEARNING</span><i>✳</i><span>BUILD WHAT SHIPS</span><i>✳</i><span>SECURITY MINDED</span><i>✳</i><span>ALWAYS LEARNING</span><i>✳</i></div></div>

      <section className="content-section work-section" id="work" data-testid="work-section">
        <Reveal className="section-heading"><p className="eyebrow"><span>02</span> / SELECTED OUTPUT</p><h2>WORK THAT<br /><span>SHIPS<span className="outline">.</span></span></h2><p className="section-intro">Small, intentional builds with a bias toward clarity, usefulness, and learning in public.</p></Reveal>
        <div className="project-list">
          {projects.map((project, index) => <Reveal className="project-card" delay={index * 0.1} key={project.number}>
            <div className="project-top"><span className="project-number">{project.number}</span><span className="project-kind">{project.kind}</span><span className="project-status"><i /> {project.status}</span></div>
            <div className="project-body"><div><h3 data-testid={`project-title-${project.number}`}>{project.name}</h3><p data-testid={`project-description-${project.number}`}>{project.description}</p></div><div className="project-visual"><div className="visual-window"><div className="window-bar"><i /><i /><i /><span>strength_protocol.js</span></div><div className="password-meter"><span>ENTER PASSWORD</span><strong>••••••••••••</strong><div className="meter"><b /><b /><b /><b /><b /></div><small>VERY STRONG <em>100%</em></small></div></div></div></div>
            <div className="project-bottom"><div className="tag-list">{project.tags.map(tag => <span key={tag} data-testid={`project-tech-${tag.toLowerCase()}`}>{tag}</span>)}</div><a href="https://github.com/prabakaran1209" target="_blank" rel="noreferrer" className="project-link" data-testid="project-live-link">VIEW PROJECT <ArrowUpRight size={18} /></a></div>
          </Reveal>)}
        </div>
        <p className="coming-soon" data-testid="projects-coming-soon"><span>02—</span> MORE EXPERIMENTS LOADING / STAY CURIOUS</p>
      </section>

      <section className="content-section skills-section" id="skills" data-testid="skills-section"><Reveal className="skills-header"><p className="eyebrow"><span>03</span> / THE TOOLKIT</p><h2>SKILL<br /><span>MATRIX<span className="outline">.</span></span></h2><p className="section-intro">A growing map of the things I use to think, make, and protect.</p></Reveal><div className="skill-grid">{skills.map(([num, title, copy], index) => <Reveal className="skill-cell" delay={index * 0.08} key={num}><span className="skill-num">{num}</span><h3>{title}</h3><p>{copy}</p><span className="skill-arrow">↗</span></Reveal>)}</div></section>

      <section className="contact-section" id="contact" data-testid="contact-section"><div className="contact-glow" /><Reveal><p className="eyebrow"><span>04</span> / CONNECT</p><h2>LET’S BUILD<br /><span>SOMETHING REAL<span className="outline">.</span></span></h2><p className="contact-copy">Have a problem worth solving or a skill worth sharing? Find me in the open.</p><div className="contact-links"><a href="https://www.linkedin.com/in/prabakaran-s-74a69137a/" target="_blank" rel="noreferrer" data-testid="linkedin-link"><Linkedin size={18} /> LinkedIn <ArrowUpRight size={18} /></a><a href="https://github.com/prabakaran1209" target="_blank" rel="noreferrer" data-testid="github-link"><Github size={18} /> GitHub <ArrowUpRight size={18} /></a></div></Reveal><footer><a className="brand" href="#top" data-testid="footer-brand"><Mark compact /><span>PRABAKARAN<span className="brand-dot">.</span></span></a><span>© 2025 / MADE WITH CURIOSITY</span><span>END OF TRANSMISSION //</span></footer></section>
    </main>
  );
}

export default App;
