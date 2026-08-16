import React, { useState } from 'react';
import { 
  ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip 
} from 'recharts';
import { 
  Code2, BrainCircuit, LineChart as LineChartIcon, Database, Wrench, Binary, 
  Sparkles, Layers, Activity, CheckCircle2 
} from 'lucide-react';

const radarData = [
  { subject: 'Machine Learning', score: 92, fullMark: 100 },
  { subject: 'Time-Series Forecast', score: 90, fullMark: 100 },
  { subject: 'Data Analysis', score: 94, fullMark: 100 },
  { subject: 'Backend & APIs', score: 86, fullMark: 100 },
  { subject: 'Cloud & Docker', score: 80, fullMark: 100 },
  { subject: 'Algorithms & OOP', score: 88, fullMark: 100 },
];

const SkillVisualizer = ({ skills, theme }) => {
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'radar'
  const [activeCategory, setActiveCategory] = useState(null);

  const categories = [
    {
      id: 'languages',
      title: 'Languages',
      icon: Code2,
      proficiency: 90,
      color: '#38bdf8', // Electric Cyan
      list: skills.languages,
      description: 'Core programming languages used for ML pipelines, algorithms & fullstack APIs.'
    },
    {
      id: 'ml',
      title: 'Machine Learning & Time-Series',
      icon: BrainCircuit,
      proficiency: 92,
      color: '#00ff88', // Matrix Green
      list: skills.machineLearning,
      description: 'Predictive modeling, regression, classification, ARIMA/SARIMA & XGBoost.'
    },
    {
      id: 'analytics',
      title: 'Data Analysis & Visuals',
      icon: LineChartIcon,
      proficiency: 94,
      color: '#f59e0b', // Amber Gold
      list: skills.dataAnalysis,
      description: 'Exploratory data analysis, feature engineering, statistical summaries & visual plotting.'
    },
    {
      id: 'backend',
      title: 'Backend & Databases',
      icon: Database,
      proficiency: 86,
      color: '#818cf8', // Indigo / Purple
      list: skills.backendDatabases,
      description: 'High-throughput REST APIs, database schemas, PostgreSQL & MongoDB storage.'
    },
    {
      id: 'tools',
      title: 'Developer Tools & Cloud',
      icon: Wrench,
      proficiency: 82,
      color: '#06b6d4', // Teal Cyan
      list: skills.developerTools,
      description: 'Containerization, IBM Watson Cloud Studio, version control & interactive dashboards.'
    },
    {
      id: 'core',
      title: 'Core Concepts',
      icon: Binary,
      proficiency: 88,
      color: '#ec4899', // Pink / Rose
      list: skills.coreConcepts,
      description: 'Object-oriented programming, probability, statistics & algorithmic problem solving.'
    }
  ];

  const chartFill = theme === 'dark' ? '#00ff88' : '#0284c7';
  const chartStroke = theme === 'dark' ? '#00e5ff' : '#0369a1';
  const gridColor = theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(15,23,42,0.1)';
  const textColor = theme === 'dark' ? '#94a3b8' : '#475569';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Top Controls & Matrix Header */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        flexWrap: 'wrap', 
        gap: '12px',
        padding: '12px 18px',
        background: 'rgba(var(--accent-rgb), 0.04)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--border-radius-md)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Activity size={16} style={{ color: 'var(--accent)' }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
            CAPABILITY_METRICS: <strong style={{ color: 'var(--accent)' }}>6 DOMAINS // 28+ PROFICIENCIES</strong>
          </span>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            type="button"
            onClick={() => setViewMode('grid')}
            className={`tech-button ${viewMode === 'grid' ? 'active' : ''}`}
            style={{ fontSize: '0.75rem', padding: '6px 12px' }}
          >
            <Layers size={13} /> GRID_VIEW
          </button>
          <button
            type="button"
            onClick={() => setViewMode('radar')}
            className={`tech-button ${viewMode === 'radar' ? 'active' : ''}`}
            style={{ fontSize: '0.75rem', padding: '6px 12px' }}
          >
            <Sparkles size={13} /> RADAR_ANALYTICS
          </button>
        </div>
      </div>

      {/* View Mode 1: Interactive Radar Visualizer */}
      {viewMode === 'radar' && (
        <div className="glass-panel border-glow" style={{ padding: '24px', textAlign: 'center' }}>
          <div style={{ marginBottom: '16px' }}>
            <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '1.1rem', color: 'var(--accent)' }}>
              CORE_COMPETENCY_RADAR.VIZ
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
              Multi-dimensional proficiency mapping across Machine Learning, Analytics, and Engineering
            </p>
          </div>

          <div style={{ width: '100%', height: '360px', minHeight: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
                <PolarGrid stroke={gridColor} />
                <PolarAngleAxis 
                  dataKey="subject" 
                  tick={{ fill: textColor, fontSize: 11, fontFamily: 'var(--font-mono)' }} 
                />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke={gridColor} tick={{ fill: textColor, fontSize: 9 }} />
                <Radar 
                  name="Abhinav's Proficiency" 
                  dataKey="score" 
                  stroke={chartStroke} 
                  fill={chartFill} 
                  fillOpacity={0.4} 
                />
                <Tooltip 
                  contentStyle={{
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '6px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.8rem',
                    color: 'var(--text-primary)'
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* View Mode 2: Modern Interactive Skill Cards Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
        gap: '20px' 
      }}>
        {categories.map((cat, idx) => {
          const IconComp = cat.icon;
          const isHovered = activeCategory === cat.id;

          return (
            <div 
              key={idx} 
              className="glass-panel border-glow skill-card-modern" 
              onMouseEnter={() => setActiveCategory(cat.id)}
              onMouseLeave={() => setActiveCategory(null)}
              style={{ 
                padding: '24px', 
                transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: isHovered ? 'translateY(-4px)' : 'none',
                borderColor: isHovered ? cat.color : undefined,
                boxShadow: isHovered ? `0 12px 30px rgba(0,0,0,0.15), 0 0 15px ${cat.color}33` : undefined,
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* Top Card Bar with Icon & Status */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    background: `${cat.color}18`,
                    border: `1px solid ${cat.color}44`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: cat.color
                  }}>
                    <IconComp size={18} />
                  </div>
                  <div>
                    <h3 style={{ 
                      fontSize: '1rem', 
                      fontWeight: 700, 
                      color: 'var(--text-primary)',
                      lineHeight: 1.2
                    }}>
                      {cat.title}
                    </h3>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                      MODULE [0{idx + 1}]
                    </span>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <span style={{ 
                    fontFamily: 'var(--font-mono)', 
                    fontSize: '0.85rem', 
                    fontWeight: 700, 
                    color: cat.color 
                  }}>
                    {cat.proficiency}%
                  </span>
                </div>
              </div>

              {/* Dynamic Animated Meter */}
              <div style={{ 
                width: '100%', 
                height: '6px', 
                background: 'rgba(0,0,0,0.12)', 
                borderRadius: '10px', 
                overflow: 'hidden', 
                marginBottom: '16px' 
              }}>
                <div style={{ 
                  width: `${cat.proficiency}%`, 
                  height: '100%', 
                  background: `linear-gradient(90deg, ${cat.color}88, ${cat.color})`, 
                  borderRadius: '10px',
                  boxShadow: `0 0 8px ${cat.color}aa`,
                  transition: 'width 0.8s ease'
                }} />
              </div>

              {/* Category Subtitle */}
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '16px', lineHeight: '1.4' }}>
                {cat.description}
              </p>

              {/* Skill Tags with Modern Interactive Badges */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {cat.list.map((skill, sIdx) => (
                  <span 
                    key={sIdx} 
                    className="skill-badge-item"
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.8rem',
                      background: 'rgba(var(--accent-rgb), 0.04)',
                      border: '1px solid var(--border-color)',
                      padding: '5px 11px',
                      borderRadius: '6px',
                      color: 'var(--text-primary)',
                      transition: 'all 0.25s ease',
                      cursor: 'default',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = cat.color;
                      e.currentTarget.style.color = cat.color;
                      e.currentTarget.style.background = `${cat.color}15`;
                      e.currentTarget.style.transform = 'scale(1.04)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'var(--border-color)';
                      e.currentTarget.style.color = 'var(--text-primary)';
                      e.currentTarget.style.background = 'rgba(var(--accent-rgb), 0.04)';
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                  >
                    <CheckCircle2 size={11} style={{ color: cat.color, opacity: 0.8 }} />
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SkillVisualizer;
