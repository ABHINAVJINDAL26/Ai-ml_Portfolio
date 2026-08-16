import React, { useState } from 'react';
import { 
  ResponsiveContainer, AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend 
} from 'recharts';
import { TrendingUp, BarChart3, PieChart as PieChartIcon, Zap } from 'lucide-react';

// 1. AgriPrice AI Forecast Simulation Data
const agriForecastData = [
  { day: 'Day 1', historical: 24, forecast: 24, upper: 25, lower: 23 },
  { day: 'Day 5', historical: 26, forecast: 26.5, upper: 28, lower: 25 },
  { day: 'Day 10', historical: 28, forecast: 29, upper: 31, lower: 27 },
  { day: 'Day 15', forecast: 31.5, upper: 34, lower: 29 },
  { day: 'Day 20', forecast: 34.0, upper: 37, lower: 31 },
  { day: 'Day 25', forecast: 36.5, upper: 40, lower: 33 },
  { day: 'Day 30', forecast: 38.0, upper: 42, lower: 34 }
];

// 2. Customer Segmentation Cluster Distribution Data
const customerClusterData = [
  { segment: 'Champions', count: 420, avgSpend: '₹8,450', color: '#00ff88' },
  { segment: 'Loyal Customers', count: 780, avgSpend: '₹5,200', color: '#38bdf8' },
  { segment: 'Potential Loyalists', count: 640, avgSpend: '₹3,100', color: '#818cf8' },
  { segment: 'At Risk', count: 310, avgSpend: '₹1,400', color: '#f59e0b' },
  { segment: 'Dormant', count: 190, avgSpend: '₹650', color: '#ef4444' }
];

// 3. AI Resume Screening Match Evaluation Data
const resumeMatchData = [
  { criteria: 'Technical Skills Alignment', match: 88, benchmark: 70 },
  { criteria: 'Experience & Projects', match: 82, benchmark: 65 },
  { criteria: 'Domain Knowledge (AI/ML)', match: 90, benchmark: 75 },
  { criteria: 'Education & Certifications', match: 85, benchmark: 60 },
  { criteria: 'Role Specific Q&A Fit', match: 76, benchmark: 70 }
];

const ProjectChart = ({ projectId, theme }) => {
  const isDark = theme === 'dark';
  const gridStroke = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(15,23,42,0.08)';
  const textColor = isDark ? '#94a3b8' : '#64748b';

  return (
    <div style={{
      marginTop: '20px',
      padding: '20px',
      background: isDark ? 'rgba(0,0,0,0.25)' : 'rgba(241,245,249,0.7)',
      borderRadius: 'var(--border-radius-md)',
      border: '1px solid var(--border-color)'
    }}>
      {/* Simulation Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Zap size={16} style={{ color: 'var(--accent)' }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', fontWeight: 600, color: 'var(--accent)' }}>
            LIVE_MODEL_SIMULATION // TELEMETRY_VISUALIZER
          </span>
        </div>
        <span style={{ 
          fontFamily: 'var(--font-mono)', 
          fontSize: '0.72rem', 
          padding: '2px 8px', 
          borderRadius: '4px', 
          background: 'rgba(34, 197, 94, 0.1)', 
          color: '#22c55e', 
          border: '1px solid rgba(34, 197, 94, 0.3)' 
        }}>
          ● REAL-TIME METRICS
        </span>
      </div>

      {/* Chart 1: AgriPrice AI */}
      {projectId === 0 && (
        <div>
          <div style={{ marginBottom: '12px', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
            <strong>Commodity Price Forecast Curve (XGBoost + SARIMA):</strong> 30-Day projection with Confidence Horizon
          </div>
          <div style={{ width: '100%', height: '220px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={agriForecastData}>
                <defs>
                  <linearGradient id="forecastGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#38bdf8" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
                <XAxis dataKey="day" stroke={textColor} fontSize={11} fontFamily="var(--font-mono)" />
                <YAxis stroke={textColor} fontSize={11} fontFamily="var(--font-mono)" domain={['dataMin - 2', 'dataMax + 4']} unit=" ₹" />
                <Tooltip 
                  contentStyle={{
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '6px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.78rem'
                  }}
                />
                <Area type="monotone" dataKey="forecast" stroke="#38bdf8" strokeWidth={2} fillOpacity={1} fill="url(#forecastGrad)" name="Forecast Price (₹/kg)" />
                <Area type="monotone" dataKey="historical" stroke="#00ff88" strokeWidth={2} fill="#00ff88" fillOpacity={0.2} name="Historical Price" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Chart 2: Customer Segmentation */}
      {projectId === 1 && (
        <div>
          <div style={{ marginBottom: '12px', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
            <strong>RFM Behavioral Clusters (K-Means & SVD):</strong> User volume distribution across segments
          </div>
          <div style={{ width: '100%', height: '220px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={customerClusterData}>
                <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
                <XAxis dataKey="segment" stroke={textColor} fontSize={10} fontFamily="var(--font-mono)" />
                <YAxis stroke={textColor} fontSize={11} fontFamily="var(--font-mono)" />
                <Tooltip 
                  contentStyle={{
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '6px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.78rem'
                  }}
                />
                <Bar dataKey="count" fill="#818cf8" radius={[4, 4, 0, 0]} name="Users Count" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Chart 3: Resume Screening */}
      {projectId === 2 && (
        <div>
          <div style={{ marginBottom: '12px', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
            <strong>Candidate vs Job Description Relevance Matching Engine (% Score):</strong>
          </div>
          <div style={{ width: '100%', height: '220px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={resumeMatchData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
                <XAxis type="number" domain={[0, 100]} stroke={textColor} fontSize={10} fontFamily="var(--font-mono)" unit="%" />
                <YAxis dataKey="criteria" type="category" width={140} stroke={textColor} fontSize={9} fontFamily="var(--font-mono)" />
                <Tooltip 
                  contentStyle={{
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '6px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.78rem'
                  }}
                />
                <Bar dataKey="match" fill="#00ff88" radius={[0, 4, 4, 0]} name="Candidate Alignment (%)" />
                <Bar dataKey="benchmark" fill="#94a3b8" radius={[0, 4, 4, 0]} name="Threshold Benchmark (%)" opacity={0.5} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectChart;
