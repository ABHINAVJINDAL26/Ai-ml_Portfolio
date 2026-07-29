import React, { useState } from 'react';
import { Send, Terminal as TerminalIcon, ShieldCheck } from 'lucide-react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [status, setStatus] = useState('IDLE'); // IDLE, TRANSMITTING, SUCCESS, ERROR
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('TRANSMITTING');
    setErrorMsg('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('SUCCESS');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('ERROR');
        setErrorMsg(data.error || 'Transmission failed.');
      }
    } catch (error) {
      console.error('Contact submission error:', error);
      setStatus('ERROR');
      setErrorMsg('Failed to connect to backend server.');
    }
  };

  return (
    <div className="glass-panel border-glow" style={{ padding: '30px', maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
        <TerminalIcon size={20} style={{ color: 'var(--accent)' }} />
        <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '1.1rem', fontWeight: 600, color: 'var(--accent)' }}>
          SECURE_INBOX_COMMS.EXE
        </h3>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
          <div style={{ flex: '1 1 200px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label htmlFor="name" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              IDENTIFIER (NAME)
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="e.g. John Doe"
              style={{
                fontFamily: 'var(--font-sans)',
                background: 'rgba(0,0,0,0.2)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--border-radius-sm)',
                padding: '10px',
                color: 'var(--text-primary)',
                outline: 'none',
                transition: 'border var(--transition-speed)'
              }}
              onFocus={(e) => e.target.style.borderColor = 'var(--accent-secondary)'}
              onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
            />
          </div>

          <div style={{ flex: '1 1 200px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label htmlFor="email" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              RETURN_PATH (EMAIL)
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="e.g. name@domain.com"
              style={{
                fontFamily: 'var(--font-sans)',
                background: 'rgba(0,0,0,0.2)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--border-radius-sm)',
                padding: '10px',
                color: 'var(--text-primary)',
                outline: 'none',
                transition: 'border var(--transition-speed)'
              }}
              onFocus={(e) => e.target.style.borderColor = 'var(--accent-secondary)'}
              onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
            />
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label htmlFor="subject" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            COMMUNICATION_HEADER (SUBJECT)
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            placeholder="e.g. Project Collaboration Opportunity"
            style={{
              fontFamily: 'var(--font-sans)',
              background: 'rgba(0,0,0,0.2)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--border-radius-sm)',
              padding: '10px',
              color: 'var(--text-primary)',
              outline: 'none',
              transition: 'border var(--transition-speed)'
            }}
            onFocus={(e) => e.target.style.borderColor = 'var(--accent-secondary)'}
            onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label htmlFor="message" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            PAYLOAD_BODY (MESSAGE)
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={5}
            placeholder="Write your transmission here..."
            style={{
              fontFamily: 'var(--font-sans)',
              background: 'rgba(0,0,0,0.2)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--border-radius-sm)',
              padding: '12px',
              color: 'var(--text-primary)',
              outline: 'none',
              resize: 'vertical',
              transition: 'border var(--transition-speed)'
            }}
            onFocus={(e) => e.target.style.borderColor = 'var(--accent-secondary)'}
            onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
          />
        </div>

        {/* Status display */}
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', padding: '8px 12px', borderRadius: '4px', background: 'rgba(0,0,0,0.15)', borderLeft: '3px solid var(--border-color)' }}>
          {status === 'IDLE' && (
            <span style={{ color: 'var(--text-muted)' }}>[SYSTEM_STATUS]: Ready to initiate transmission.</span>
          )}
          {status === 'TRANSMITTING' && (
            <span style={{ color: 'var(--accent-secondary)' }}>[TRANSMITTING]: Uploading payload packet...</span>
          )}
          {status === 'SUCCESS' && (
            <span style={{ color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ShieldCheck size={14} /> [SUCCESS]: HTTP_201_CREATED. Transmission delivered to DB.
            </span>
          )}
          {status === 'ERROR' && (
            <span style={{ color: '#ef4444' }}>[ERR_COMM_FAILED]: {errorMsg}</span>
          )}
        </div>

        <button
          type="submit"
          className="tech-button"
          disabled={status === 'TRANSMITTING'}
          style={{ alignSelf: 'flex-start', marginTop: '5px' }}
        >
          <Send size={14} />
          {status === 'TRANSMITTING' ? 'UPLOADING...' : 'SEND_TRANSMISSION'}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
