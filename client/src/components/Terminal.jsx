import React, { useState, useEffect, useRef } from 'react';
import { cvData } from '../data/cvData';

const Terminal = ({ setMode, theme }) => {
  const { personal, skills, internships, projects, education, certificates } = cvData;
  
  const [history, setHistory] = useState([
    { text: '====================================================================', type: 'system' },
    { text: '  🧬 ABHINAV JINDAL - DATA SCIENCE ENGINEER PORTFOLIO SHELL v1.0.4 🧬', type: 'welcome' },
    { text: '  Type "help" to display available terminal commands.', type: 'help-cmd' },
    { text: '  Type "gui" to exit CLI and launch the Visual Dashboard.', type: 'help-cmd' },
    { text: '====================================================================', type: 'system' },
  ]);

  const [inputVal, setInputVal] = useState('');
  const [cmdHistory, setCmdHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const terminalEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll on new entries
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  // Focus terminal input on load and click
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdHistory.length === 0) return;
      const newIndex = historyIndex + 1;
      if (newIndex < cmdHistory.length) {
        setHistoryIndex(newIndex);
        setInputVal(cmdHistory[cmdHistory.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const newIndex = historyIndex - 1;
      if (newIndex >= 0) {
        setHistoryIndex(newIndex);
        setInputVal(cmdHistory[cmdHistory.length - 1 - newIndex]);
      } else {
        setHistoryIndex(-1);
        setInputVal('');
      }
    }
  };

  const processCommand = (cmdStr) => {
    const trimmed = cmdStr.trim().toLowerCase();
    const args = trimmed.split(' ');
    const primaryCmd = args[0];

    const output = [];
    output.push({ text: `visitor@abhinav-jindal-ds:~$ ${cmdStr}`, type: 'input' });

    if (!primaryCmd) {
      setHistory(prev => [...prev, ...output]);
      return;
    }

    switch (primaryCmd) {
      case 'help':
        output.push(
          { text: 'AVAILABLE COMMANDS & INSTRUCTIONS:', type: 'system-heading' },
          { text: '  help          - Display this instruction panel', type: 'help-cmd' },
          { text: '  about / bio   - Read professional summary & bio', type: 'help-cmd' },
          { text: '  skills        - Print hierarchical technical skills tree', type: 'help-cmd' },
          { text: '  projects / ls - List machine learning engineering projects', type: 'help-cmd' },
          { text: '  project <num> - Inspect specific project details (e.g. project 1)', type: 'help-cmd' },
          { text: '  experience    - Read AI & Cloud internship records', type: 'help-cmd' },
          { text: '  education     - Print academic profile', type: 'help-cmd' },
          { text: '  certs         - Display certification credentials', type: 'help-cmd' },
          { text: '  contact       - Print direct secure comm channels', type: 'help-cmd' },
          { text: '  gui           - Switch to the graphical dashboard mode', type: 'help-cmd' },
          { text: '  clear / cls   - Wipe the terminal display buffer', type: 'help-cmd' }
        );
        break;

      case 'about':
      case 'bio':
        output.push(
          { text: `[Identity]:    ${personal.name}`, type: 'success' },
          { text: `[Designation]: ${personal.title}`, type: 'accent' },
          { text: `[Locality]:    ${personal.location}`, type: 'info' },
          { text: `[Phone]:       ${personal.phone}`, type: 'info' },
          { text: `[Email]:       ${personal.email}`, type: 'accent' },
          { text: '', type: 'info' },
          { text: `[Summary]:\n${personal.summary}`, type: 'info' }
        );
        break;

      case 'skills':
        output.push(
          { text: '🧬 ABHINAV_SKILL_TREE_COMPILER 🧬', type: 'welcome' },
          { text: '├── Languages', type: 'tree' },
          ...skills.languages.map(s => ({ text: `│   ├── ${s}`, type: 'tree-leaf' })),
          { text: '├── Machine Learning & Modeling', type: 'tree' },
          ...skills.machineLearning.map(s => ({ text: `│   ├── ${s}`, type: 'tree-leaf' })),
          { text: '├── Data Analysis & Visualizations', type: 'tree' },
          ...skills.dataAnalysis.map(s => ({ text: `│   ├── ${s}`, type: 'tree-leaf' })),
          { text: '├── Backend & Databases', type: 'tree' },
          ...skills.backendDatabases.map(s => ({ text: `│   ├── ${s}`, type: 'tree-leaf' })),
          { text: '├── Developer Tools', type: 'tree' },
          ...skills.developerTools.map(s => ({ text: `│   ├── ${s}`, type: 'tree-leaf' })),
          { text: '└── Core Computer Science Concepts', type: 'tree' },
          ...skills.coreConcepts.map(s => ({ text: `    ├── ${s}`, type: 'tree-leaf' }))
        );
        break;

      case 'projects':
      case 'ls':
        output.push({ text: 'Active Project Repositories:', type: 'system-heading' });
        projects.forEach((p, idx) => {
          output.push({ 
            text: `  [Project ${idx + 1}] : ${p.title} - ${p.subtitle} (${p.period})`, 
            type: 'info' 
          });
        });
        output.push({ text: 'Type "project <num>" (e.g. project 1) to inspect full project specs.', type: 'system' });
        break;

      case 'project': {
        const num = parseInt(args[1]);
        if (isNaN(num) || num < 1 || num > projects.length) {
          output.push({ text: 'Error: Invalid project index. Usage: "project 1", "project 2", etc.', type: 'error' });
        } else {
          const p = projects[num - 1];
          output.push(
            { text: `[DATABASE_RETRIEVAL] PROJECT_0${num} DETAILS:`, type: 'success' },
            { text: `Title:      ${p.title}`, type: 'accent' },
            { text: `Subtitle:   ${p.subtitle}`, type: 'accent' },
            { text: `Period:     ${p.period}`, type: 'info' },
            { text: `Repo:       ${p.github}`, type: 'info' },
            { text: `Summary:    ${p.description}`, type: 'info' },
            { text: 'Metrics:', type: 'success' },
            ...Object.entries(p.metrics).map(([k, v]) => ({ text: `  - ${k}: ${v}`, type: 'info' })),
            { text: 'Execution logs:', type: 'success' },
            ...p.details.map(d => ({ text: `  * ${d}`, type: 'info' })),
            { text: 'Tech Stack:', type: 'success' },
            { text: `  ${p.techStack.join(' | ')}`, type: 'accent' }
          );
        }
        break;
      }

      case 'experience':
        output.push({ text: 'Work Experience Log:', type: 'system-heading' });
        internships.forEach(job => {
          output.push(
            { text: `\n[Role]:     ${job.role}`, type: 'accent' },
            { text: `[Employer]: ${job.company} (${job.period})`, type: 'info' },
            { text: 'Highlights:', type: 'success' },
            ...job.highlights.map(h => ({ text: `  * ${h}`, type: 'info' }))
          );
        });
        break;

      case 'education':
        output.push({ text: 'Academic Profile Log:', type: 'system-heading' });
        education.forEach(edu => {
          output.push(
            { text: `\nInstitution: ${edu.institution}`, type: 'accent' },
            { text: `Degree:      ${edu.degree}`, type: 'info' },
            { text: `Score:       ${edu.score}`, type: 'accent' },
            { text: `Period:      ${edu.period} (${edu.location})`, type: 'info' }
          );
        });
        break;

      case 'certs':
        output.push({ text: 'Certification Keys:', type: 'system-heading' });
        certificates.forEach(c => {
          output.push({ text: `  - ${c.title} [Issuer: ${c.issuer}] (${c.date})`, type: 'info' });
        });
        break;

      case 'contact':
        output.push(
          { text: 'Secure Comms Gateway Channels:', type: 'system-heading' },
          { text: `  Email:    ${personal.email}`, type: 'accent' },
          { text: `  Phone:    ${personal.phone}`, type: 'info' },
          { text: `  LinkedIn: ${personal.linkedin}`, type: 'info' },
          { text: `  GitHub:   ${personal.github}`, type: 'info' },
          { text: '\nTo transmit a direct secure message, switch to visual mode (type "gui") and use the Secure Mail Gateway.', type: 'system' }
        );
        break;

      case 'gui':
        setMode('gui');
        return;

      case 'clear':
      case 'cls':
        setHistory([]);
        return;

      default:
        output.push({ text: `Command not recognized: "${primaryCmd}". Type "help" to view list of valid instructions.`, type: 'error' });
        break;
    }

    setHistory(prev => [...prev, ...output]);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    processCommand(inputVal);
    setCmdHistory(prev => [...prev, inputVal]);
    setInputVal('');
    setHistoryIndex(-1);
  };

  // High-contrast color palette guaranteed across light and dark modes
  const getLineColor = (type) => {
    switch (type) {
      case 'error':
        return '#f87171'; // Vibrant Red
      case 'success':
        return '#4ade80'; // Bright Green
      case 'welcome':
        return '#00ff88'; // Matrix Neon Green
      case 'accent':
        return '#38bdf8'; // Electric Cyan
      case 'help-cmd':
        return '#7dd3fc'; // High-contrast readable Cyan/Sky
      case 'system-heading':
        return '#facc15'; // Amber/Gold header
      case 'system':
        return '#94a3b8'; // Cool Gray
      case 'tree':
        return '#00ff88'; // Matrix Green
      case 'tree-leaf':
        return '#cbd5e1'; // Light Silver Slate
      case 'input':
        return '#ffffff'; // Pure White
      case 'info':
      default:
        return '#e2e8f0'; // Crisp Off-White (Never blends into dark console)
    }
  };

  return (
    <div className="container" style={{ paddingBottom: '40px', paddingTop: '30px' }}>
      <div 
        onClick={handleTerminalClick}
        className="crt-screen"
        style={{
          background: '#070d18',
          border: '1px solid var(--border-color)',
          boxShadow: '0 10px 40px rgba(0,0,0,0.6)',
          borderRadius: 'var(--border-radius-md)',
          padding: '24px',
          minHeight: '75vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          cursor: 'text',
          position: 'relative'
        }}
      >
        {/* Terminal Header Bar */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          background: '#0e1726',
          padding: '10px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          borderTopLeftRadius: 'var(--border-radius-md)',
          borderTopRightRadius: 'var(--border-radius-md)',
          zIndex: 5
        }}>
          <div style={{ display: 'flex', gap: '8px' }}>
            <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ef4444', display: 'inline-block' }}></span>
            <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#f59e0b', display: 'inline-block' }}></span>
            <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#10b981', display: 'inline-block' }}></span>
          </div>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: '#94a3b8', letterSpacing: '0.5px' }}>
            visitor@abhinav-jindal-ds: ~ (BASH SHELL)
          </span>
          <button
            onClick={(e) => { e.stopPropagation(); setMode('gui'); }}
            className="tech-button"
            style={{ fontSize: '0.7rem', padding: '4px 8px', height: 'auto', border: '1px solid rgba(56, 189, 248, 0.3)', color: '#38bdf8' }}
          >
            LAUNCH_GUI
          </button>
        </div>

        {/* Console Outputs */}
        <div style={{ 
          marginTop: '35px', 
          flexGrow: 1, 
          overflowY: 'auto', 
          fontFamily: 'var(--font-mono)', 
          fontSize: 'clamp(0.82rem, 2.2vw, 0.92rem)', 
          lineHeight: '1.65',
          paddingBottom: '20px'
        }}>
          {history.map((line, idx) => {
            const color = getLineColor(line.type);
            return (
              <div 
                key={idx} 
                style={{ 
                  color, 
                  whiteSpace: 'pre-wrap', 
                  textShadow: '0 0 2px rgba(0,0,0,0.5)',
                  marginBottom: line.text === '' ? '8px' : '2px'
                }}
              >
                {line.text}
              </div>
            );
          })}
          <div ref={terminalEndRef} />
        </div>

        {/* Input Form Prompt */}
        <form 
          onSubmit={handleFormSubmit}
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            fontFamily: 'var(--font-mono)', 
            fontSize: 'clamp(0.85rem, 2.2vw, 0.95rem)',
            borderTop: '1px solid rgba(255,255,255,0.08)',
            paddingTop: '14px'
          }}
        >
          <span style={{ color: '#00ff88', marginRight: '8px', whiteSpace: 'nowrap', fontWeight: 600 }}>
            visitor@abhinav-jindal-ds:~$
          </span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            autoComplete="off"
            spellCheck="false"
            placeholder="Type 'help' for commands..."
            style={{
              flexGrow: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: '#ffffff',
              fontFamily: 'var(--font-mono)',
              fontSize: 'inherit',
              caretColor: '#00ff88'
            }}
          />
        </form>
      </div>
    </div>
  );
};

export default Terminal;
