import React, { useState } from 'react';
import { usePlanner } from '../../context/PlannerContext';
import { haptics } from '../../utils/haptics';

interface AuthSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthSheet: React.FC<AuthSheetProps> = ({ isOpen, onClose }) => {
  const { showIsland } = usePlanner();
  const [tab, setTab] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    haptics.medium();

    if (!email || !password) {
      showIsland('Enter email & password');
      return;
    }

    setLoading(true);
    try {
      const endpoint = tab === 'login' ? '/api/auth/login' : '/api/auth/register';
      const payload = tab === 'login' ? { email, password } : { email, password, name };

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error || 'Authentication failed');
      }

      haptics.triumph();
      showIsland(`✅ ${tab === 'login' ? 'Signed in' : 'Account created'} successfully!`);
      onClose();
    } catch (err: any) {
      haptics.delete();
      showIsland(err.message || 'Auth error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="sheet-backdrop active" onClick={onClose} style={{ zIndex: 3500 }} />
      <div
        className="bottom-sheet active"
        style={{
          zIndex: 3600,
          borderRadius: '32px 32px 0 0',
          padding: '24px 22px 35px',
          background: 'var(--surface-solid)',
          boxShadow: '0 -15px 50px rgba(0,0,0,0.4)',
          borderTop: '1px solid var(--border-glass)'
        }}
      >
        <div className="sheet-drag-handle" style={{ marginBottom: '16px' }} />

        {/* Apple Style Icon Header */}
        <div style={{ textAlign: 'center', marginBottom: '18px' }}>
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, var(--primary) 0%, #5AC8FA 100%)',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.7rem',
              margin: '0 auto 10px',
              boxShadow: '0 8px 20px var(--primary-dim)'
            }}
          >
            👤
          </div>
          <h3 style={{ margin: 0, fontSize: '1.3rem', fontWeight: 900, letterSpacing: '-0.3px' }}>
            HealthyHabits Cloud
          </h3>
          <p style={{ margin: '4px 0 0 0', fontSize: '0.8rem', color: 'var(--text-2)' }}>
            Sync your 15-day diet, workouts & streaks seamlessly across all your devices.
          </p>
        </div>

        {/* iOS Segmented Control */}
        <div
          style={{
            display: 'flex',
            background: 'var(--border)',
            padding: '3px',
            borderRadius: '14px',
            marginBottom: '18px'
          }}
        >
          <button
            type="button"
            onClick={() => {
              haptics.tap();
              setTab('login');
            }}
            style={{
              flex: 1,
              padding: '8px',
              border: 'none',
              borderRadius: '12px',
              fontSize: '0.85rem',
              fontWeight: 800,
              cursor: 'pointer',
              background: tab === 'login' ? 'var(--surface)' : 'transparent',
              color: tab === 'login' ? 'var(--text-1)' : 'var(--text-2)',
              boxShadow: tab === 'login' ? '0 2px 8px rgba(0,0,0,0.12)' : 'none',
              transition: 'all 0.2s ease'
            }}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              haptics.tap();
              setTab('register');
            }}
            style={{
              flex: 1,
              padding: '8px',
              border: 'none',
              borderRadius: '12px',
              fontSize: '0.85rem',
              fontWeight: 800,
              cursor: 'pointer',
              background: tab === 'register' ? 'var(--surface)' : 'transparent',
              color: tab === 'register' ? 'var(--text-1)' : 'var(--text-2)',
              boxShadow: tab === 'register' ? '0 2px 8px rgba(0,0,0,0.12)' : 'none',
              transition: 'all 0.2s ease'
            }}
          >
            Create Account
          </button>
        </div>

        {/* iOS Inset Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {tab === 'register' && (
            <div className="ios-input-box">
              <span className="ios-input-label">Your Name</span>
              <input
                type="text"
                className="ios-input-control"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}

          <div className="ios-input-box">
            <span className="ios-input-label">Email Address</span>
            <input
              type="email"
              className="ios-input-control"
              placeholder="name@icloud.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </div>

          <div className="ios-input-box">
            <span className="ios-input-label">Password</span>
            <input
              type="password"
              className="ios-input-control"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary"
            style={{ marginTop: '12px', borderRadius: '18px', padding: '15px' }}
          >
            {loading ? 'Connecting...' : tab === 'login' ? 'Sign In to Cloud' : 'Create Cloud Account'}
          </button>

          <button
            type="button"
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-2)',
              fontSize: '0.85rem',
              fontWeight: 700,
              cursor: 'pointer',
              marginTop: '4px'
            }}
          >
            Continue as Local Guest
          </button>
        </form>
      </div>
    </>
  );
};
