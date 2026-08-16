import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('[ErrorBoundary caught error]:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div style={{
          padding: '30px',
          margin: '20px auto',
          maxWidth: '600px',
          background: 'rgba(239, 68, 68, 0.08)',
          border: '1px solid rgba(239, 68, 68, 0.3)',
          borderRadius: '8px',
          fontFamily: 'var(--font-mono, monospace)',
          color: '#ef4444',
          textAlign: 'center'
        }}>
          <AlertTriangle size={36} style={{ marginBottom: '12px', color: '#ef4444' }} />
          <h3 style={{ fontSize: '1.1rem', marginBottom: '8px', color: '#f87171' }}>
            [SYSTEM_WARNING]: COMPONENT_SUBSYSTEM_FAILED
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary, #94a3b8)', marginBottom: '16px' }}>
            A rendering exception occurred in this module, but the core portfolio system remains operational.
          </p>
          <button
            onClick={this.handleReset}
            className="tech-button"
            style={{ borderColor: '#ef4444', color: '#fca5a5' }}
          >
            <RefreshCw size={14} style={{ marginRight: '6px' }} /> REBOOT_COMPONENT
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
