import { useState } from 'react';
import platformBg from '../media assets/platform-sea.png';
import socarLogo from '../media assets/SOCAR logo white.png';

interface Props {
  onLogin: () => void;
}

export function LoginPage({ onLogin }: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    if (username === 'admin' && password === '123') {
      setLoading(true);
      setTimeout(() => onLogin(), 800);
    } else {
      setError('Invalid credentials');
    }
  }

  return (
    <div className="login-page">
      <div className="login-bg">
        <img src={platformBg} alt="" className="login-bg-img" />
        <div className="login-bg-overlay" />
      </div>

      <div className="login-container">
        <div className="login-card">
          <div className="login-logo-area">
            <img src={socarLogo} alt="SOCAR" className="login-logo" />
            <div className="login-divider" />
            <p className="login-subtitle">Azneft Production Dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="login-field">
              <label className="login-label" htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="login-input"
                placeholder="Enter username"
                autoComplete="username"
                autoFocus
              />
            </div>

            <div className="login-field">
              <label className="login-label" htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="login-input"
                placeholder="Enter password"
                autoComplete="current-password"
              />
            </div>

            {error && <p className="login-error">{error}</p>}

            <button
              type="submit"
              className="login-btn"
              disabled={loading}
            >
              {loading ? (
                <span className="login-spinner" />
              ) : (
                'Sign in'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
