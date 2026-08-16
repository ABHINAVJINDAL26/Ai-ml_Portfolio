import React, { useState } from 'react';
import { 
  Mail, Phone, MapPin, Github, Linkedin, Cpu, LineChart, 
  Calendar, Award, BookOpen, ExternalLink, GitBranch, ArrowRight, Server, Terminal, ShieldCheck, Download, Send
} from 'lucide-react';
import { cvData } from '../data/cvData';
import ContactForm from './ContactForm';

const Dashboard = ({ theme }) => {
  const { personal, skills, internships, projects, education, certificates } = cvData;
  const [activeProjectTab, setActiveProjectTab] = useState(0);

  // Parse skill groups for display
  const skillCategories = [
    { title: "Languages", list: skills.languages, color: "var(--accent)" },
    { title: "Machine Learning", list: skills.machineLearning, color: "var(--accent-secondary)" },
    { title: "Analysis & Visuals", list: skills.dataAnalysis, color: "var(--accent)" },
    { title: "Backend & Databases", list: skills.backendDatabases, color: "var(--accent-secondary)" },
    { title: "Developer Tools", list: skills.developerTools, color: "var(--accent)" },
    { title: "Core Concepts", list: skills.coreConcepts, color: "var(--accent-secondary)" }
  ];

  return (
    <div className="container" style={{ paddingBottom: '80px', paddingTop: '40px' }}>
      
      {/* 1. Hero / Identity Section */}
      <section id="about" className="glass-panel border-glow hero-card" style={{ position: 'relative', overflow: 'hidden' }}>
        {/* Decorative Grid Line */}
        <div style={{
          position: 'absolute', top: 0, right: 0, width: '120px', height: '120px',
          background: 'radial-gradient(circle, rgba(var(--accent-rgb), 0.15) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div>
            <span className="system-badge">
              SYSTEM_INIT: SUCCESS // DATA_SCIENCE_ENG
            </span>
            <h1 className="hero-name">
              {personal.name}
            </h1>
            <p className="glow-cyan hero-title">
              &gt; {personal.title}
            </p>
          </div>

          <p className="hero-summary">
            {personal.summary}
          </p>

          {/* Action CTAs: Download CV & Contact */}
          <div className="hero-actions">
            <a
              href="/Abhinav_Jindal_Resume.pdf"
              download="Abhinav_Jindal_Resume.pdf"
              className="tech-button"
              style={{
                background: 'rgba(56, 189, 248, 0.15)',
                borderColor: 'var(--accent)',
                color: 'var(--accent)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 18px',
                fontWeight: 600
              }}
            >
              <Download size={16} /> DOWNLOAD_CV.PDF
            </a>

            <a
              href="#contact"
              className="tech-button"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 18px'
              }}
            >
              <Send size={15} /> INITIALIZE_CONTACT
            </a>
          </div>

          <div className="hero-contacts">
            <a href={`mailto:${personal.email}`} className="hero-contact-item">
              <Mail size={15} style={{ flexShrink: 0 }} /> <span>{personal.email}</span>
            </a>
            <a href={`tel:${personal.phone.replace(/[\s-]/g, '')}`} className="hero-contact-item">
              <Phone size={15} style={{ flexShrink: 0 }} /> <span>{personal.phone}</span>
            </a>
            <span className="hero-contact-item">
              <MapPin size={15} style={{ flexShrink: 0 }} /> <span>{personal.location}</span>
            </span>
            <a href={personal.github} target="_blank" rel="noopener noreferrer" className="hero-contact-item">
              <Github size={15} style={{ flexShrink: 0 }} /> <span>GitHub</span>
            </a>
            <a href={personal.linkedin} target="_blank" rel="noopener noreferrer" className="hero-contact-item">
              <Linkedin size={15} style={{ flexShrink: 0 }} /> <span>LinkedIn</span>
            </a>
          </div>
        </div>
      </section>


      {/* 2. Skills Engine (Interactive Layout) */}
      <section id="skills" style={{ marginBottom: '60px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '30px' }}>
          <Cpu size={24} style={{ color: 'var(--accent)' }} />
          <h2 style={{ fontSize: '1.75rem', fontWeight: 700 }}>TECHNICAL_SKILL_TREE</h2>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
          gap: '24px' 
        }}>
          {skillCategories.map((cat, idx) => (
            <div key={idx} className="glass-panel border-glow" style={{ padding: '24px', transition: 'all 0.3s ease' }}>
              <h3 style={{ 
                fontFamily: 'var(--font-mono)', 
                fontSize: '1rem', 
                color: cat.color, 
                marginBottom: '16px',
                borderBottom: '1px solid var(--glass-border)',
                paddingBottom: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <span>{`[0${idx + 1}] ${cat.title}`}</span>
                <span style={{ fontSize: '0.75rem', opacity: 0.6 }}>ACTIVE</span>
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {cat.list.map((skill, sIdx) => (
                  <span 
                    key={sIdx} 
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.85rem',
                      background: 'rgba(0,0,0,0.15)',
                      border: '1px solid var(--glass-border)',
                      padding: '6px 12px',
                      borderRadius: 'var(--border-radius-sm)',
                      color: 'var(--text-primary)',
                      transition: 'all 0.3s',
                      cursor: 'default'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.borderColor = cat.color;
                      e.target.style.boxShadow = `0 0 8px ${cat.color}`;
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.borderColor = 'var(--glass-border)';
                      e.target.style.boxShadow = 'none';
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Project Matrix */}
      <section id="projects" style={{ marginBottom: '60px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '30px' }}>
          <LineChart size={24} style={{ color: 'var(--accent-secondary)' }} />
          <h2 style={{ fontSize: '1.75rem', fontWeight: 700 }}>ML_PROJECT_MATRIX</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '30px' }}>
          {/* Project Tabs Selector */}
          <div style={{ display: 'flex', borderBottom: '1px solid var(--glass-border)', gap: '10px', overflowX: 'auto', paddingBottom: '10px' }}>
            {projects.map((proj, idx) => (
              <button
                key={idx}
                onClick={() => setActiveProjectTab(idx)}
                style={{
                  fontFamily: 'var(--font-mono)',
                  padding: '8px 16px',
                  background: activeProjectTab === idx ? 'rgba(var(--accent-secondary-rgb), 0.1)' : 'transparent',
                  color: activeProjectTab === idx ? 'var(--accent-secondary)' : 'var(--text-secondary)',
                  border: '1px solid',
                  borderColor: activeProjectTab === idx ? 'var(--accent-secondary)' : 'transparent',
                  borderRadius: 'var(--border-radius-sm)',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.3s'
                }}
              >
                {proj.title}
              </button>
            ))}
          </div>

          {/* Active Project Details */}
          <div className="glass-panel border-glow" style={{ padding: '32px', position: 'relative' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '15px', marginBottom: '16px' }}>
              <div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {projects[activeProjectTab].title}
                </h3>
                <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.95rem', color: 'var(--accent)', marginTop: '2px' }}>
                  {projects[activeProjectTab].subtitle}
                </h4>
              </div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                {projects[activeProjectTab].period}
              </span>
            </div>

            <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', marginBottom: '20px', lineHeight: '1.6' }}>
              {projects[activeProjectTab].description}
            </p>

            {/* Metrics Widget */}
            <div style={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              gap: '15px', 
              marginBottom: '24px',
              padding: '16px',
              background: 'rgba(0,0,0,0.15)',
              borderRadius: 'var(--border-radius-md)',
              borderLeft: '3px solid var(--accent-secondary)'
            }}>
              {Object.entries(projects[activeProjectTab].metrics).map(([key, val], idx) => (
                <div key={idx} style={{ flex: '1 1 180px' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    {key.toUpperCase()}
                  </div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--accent-secondary)', marginTop: '4px' }}>
                    {val}
                  </div>
                </div>
              ))}
            </div>

            {/* Implementation Highlights */}
            <div style={{ marginBottom: '24px' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
                COMPILATION_LOG / ACTIONS:
              </div>
              <ul style={{ listStyleType: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {projects[activeProjectTab].details.map((detail, idx) => (
                  <li key={idx} style={{ display: 'flex', gap: '8px', color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.5' }}>
                    <span style={{ color: 'var(--accent)' }}>▶</span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Footer Stack & Link */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px', borderTop: '1px solid var(--glass-border)', paddingTop: '20px' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {projects[activeProjectTab].techStack.map((tech, idx) => (
                  <span key={idx} style={{ 
                    fontFamily: 'var(--font-mono)', fontSize: '0.75rem', 
                    background: 'rgba(var(--accent-rgb), 0.05)', color: 'var(--accent)', 
                    border: '1px solid rgba(var(--accent-rgb), 0.15)', padding: '2px 8px', borderRadius: '4px' 
                  }}>
                    {tech}
                  </span>
                ))}
              </div>

              <a 
                href={projects[activeProjectTab].github} 
                target="_blank" 
                rel="noopener noreferrer"
                className="tech-button"
              >
                <Github size={14} /> VIEW_SOURCE <ExternalLink size={12} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Experience Timeline */}
      <section id="experience" style={{ marginBottom: '60px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '30px' }}>
          <GitBranch size={24} style={{ color: 'var(--accent)' }} />
          <h2 style={{ fontSize: '1.75rem', fontWeight: 700 }}>WORK_TIMELINE_LOG</h2>
        </div>

        <div className="glass-panel border-glow" style={{ padding: '32px' }}>
          {internships.map((job, idx) => (
            <div key={idx} style={{ position: 'relative' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px', marginBottom: '10px' }}>
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>{job.role}</h3>
                  <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: 'var(--accent-secondary)', marginTop: '2px' }}>
                    {job.company}
                  </h4>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    {job.period}
                  </span>
                </div>
              </div>

              <div style={{ marginTop: '15px' }}>
                <ul style={{ listStyleType: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {job.highlights.map((highlight, hIdx) => (
                    <li key={hIdx} style={{ display: 'flex', gap: '8px', color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.5' }}>
                      <span style={{ color: 'var(--accent-secondary)' }}>&gt;</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Education & Certifications (Server blades grid) */}
      <section id="education" style={{ marginBottom: '60px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}>
          
          {/* Education Module */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <BookOpen size={20} style={{ color: 'var(--accent-secondary)' }} />
              <h3 style={{ fontSize: '1.3rem', fontWeight: 700 }}>ACADEMIC_RECORD</h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {education.map((edu, idx) => (
                <div key={idx} className="glass-panel border-glow" style={{ padding: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', marginBottom: '8px' }}>
                    <span>{edu.period}</span>
                    <span>{edu.location}</span>
                  </div>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    {edu.institution}
                  </h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '2px' }}>
                    {edu.degree}
                  </p>
                  <div style={{ 
                    fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--accent)', 
                    marginTop: '8px', background: 'rgba(var(--accent-rgb), 0.05)', 
                    display: 'inline-block', padding: '2px 8px', borderRadius: '4px' 
                  }}>
                    {edu.score}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications Module */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <Award size={20} style={{ color: 'var(--accent)' }} />
              <h3 style={{ fontSize: '1.3rem', fontWeight: 700 }}>QUALIFICATION_KEYS</h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {certificates.map((cert, idx) => (
                <div key={idx} className="glass-panel border-glow" style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '15px' }}>
                  <div>
                    <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', lineHeight: '1.4' }}>
                      {cert.title}
                    </h4>
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--accent-secondary)', marginTop: '4px' }}>
                      {cert.issuer}
                    </p>
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
                    {cert.date}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 6. Secure Contact Section */}
      <section id="contact" style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '30px' }}>
          <Server size={24} style={{ color: 'var(--accent)' }} />
          <h2 style={{ fontSize: '1.75rem', fontWeight: 700 }}>SECURE_MAIL_GATEWAY</h2>
        </div>
        <ContactForm />
      </section>

      {/* Bottom Footer Credits */}
      <footer style={{ 
        marginTop: '60px', 
        borderTop: '1px solid var(--glass-border)', 
        paddingTop: '20px', 
        textAlign: 'center', 
        fontFamily: 'var(--font-mono)', 
        fontSize: '0.8rem', 
        color: 'var(--text-muted)' 
      }}>
        <span>&copy; {new Date().getFullYear()} Abhinav Jindal. Built using MERN & Three.js. Standard Encryption Enabled.</span>
      </footer>

    </div>
  );
};

export default Dashboard;
