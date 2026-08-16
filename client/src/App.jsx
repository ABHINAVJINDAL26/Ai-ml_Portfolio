import React, { useState, useEffect } from 'react';
import { Terminal as TerminalIcon, Layout, Moon, Sun, Shield } from 'lucide-react';
import ThreeCanvas from './components/ThreeCanvas';
import Dashboard from './components/Dashboard';
import Terminal from './components/Terminal';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
  });
  const [mode, setMode] = useState('gui'); // 'gui' or 'cli'
  const [activeAnchor, setActiveAnchor] = useState('about');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  // Simple scroll spy to update active anchor
  useEffect(() => {
    if (mode !== 'gui') return;

    const sections = ['about', 'skills', 'projects', 'experience', 'education', 'contact'];
    
    const handleScroll = () => {
      const scrollPos = window.scrollY + 100;
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveAnchor(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mode]);

  return (
    <>
      {/* 3D Interactive Particle Network wrapped in ErrorBoundary to prevent WebGL crash cascading */}
      <ErrorBoundary fallback={<div className="three-fallback-bg" />}>
        <ThreeCanvas theme={theme} />
      </ErrorBoundary>

      {/* Cybernetic Tech Grid Dots */}
      <div className="tech-grid-bg" />

      {/* Navigation Header */}
      <nav className="header-nav">
        <div className="container nav-wrapper">
          <a href="#" className="nav-logo" onClick={(e) => { e.preventDefault(); setMode('gui'); }}>
            🧬 JINDAL<span>.DS</span>
          </a>

          {/* Render anchor links only in GUI mode */}
          {mode === 'gui' && (
            <ul className="nav-menu">
              <li>
                <a 
                  href="#about" 
                  className={`nav-link ${activeAnchor === 'about' ? 'active' : ''}`}
                  onClick={() => setActiveAnchor('about')}
                >
                  //ABOUT
                </a>
              </li>
              <li>
                <a 
                  href="#skills" 
                  className={`nav-link ${activeAnchor === 'skills' ? 'active' : ''}`}
                  onClick={() => setActiveAnchor('skills')}
                >
                  //SKILLS
                </a>
              </li>
              <li>
                <a 
                  href="#projects" 
                  className={`nav-link ${activeAnchor === 'projects' ? 'active' : ''}`}
                  onClick={() => setActiveAnchor('projects')}
                >
                  //PROJECTS
                </a>
              </li>
              <li>
                <a 
                  href="#experience" 
                  className={`nav-link ${activeAnchor === 'experience' ? 'active' : ''}`}
                  onClick={() => setActiveAnchor('experience')}
                >
                  //WORK
                </a>
              </li>
              <li>
                <a 
                  href="#contact" 
                  className={`nav-link ${activeAnchor === 'contact' ? 'active' : ''}`}
                  onClick={() => setActiveAnchor('contact')}
                >
                  //CONTACT
                </a>
              </li>
            </ul>
          )}

          {/* Control Panel (Theme + Mode Switchers) */}
          <div className="mode-switches">
            <button 
              onClick={toggleTheme} 
              className="tech-button" 
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
              style={{ padding: '8px 12px' }}
            >
              {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
            </button>

            <button 
              onClick={() => setMode(prev => prev === 'gui' ? 'cli' : 'gui')} 
              className="tech-button"
              style={{
                borderColor: mode === 'cli' ? 'var(--accent)' : 'var(--accent-secondary)',
                color: mode === 'cli' ? 'var(--accent)' : 'var(--accent-secondary)'
              }}
            >
              {mode === 'gui' ? (
                <>
                  <TerminalIcon size={14} /> CLI_MODE
                </>
              ) : (
                <>
                  <Layout size={14} /> GUI_MODE
                </>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Cyber Security Banner indicator */}
      <div style={{
        background: 'rgba(var(--accent-secondary-rgb), 0.06)',
        borderBottom: '1px solid rgba(var(--accent-secondary-rgb), 0.15)',
        color: 'var(--text-secondary)',
        fontFamily: 'var(--font-mono)',
        fontSize: 'clamp(0.68rem, 2.2vw, 0.75rem)',
        padding: '6px 12px',
        textAlign: 'center'
      }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
          <Shield size={12} style={{ color: 'var(--accent-secondary)', flexShrink: 0 }} />
          <span>SECURE_COMMS_ACTIVE // 99.99% HIGH AVAILABILITY</span>
        </div>
      </div>

      {/* Primary Application Content with Fault-Tolerance */}
      <main style={{ minHeight: 'calc(100vh - 100px)' }}>
        <ErrorBoundary>
          {mode === 'gui' ? (
            <Dashboard theme={theme} />
          ) : (
            <Terminal setMode={setMode} theme={theme} />
          )}
        </ErrorBoundary>
      </main>
    </>
  );
}

export default App;

