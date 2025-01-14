import "./Login.css";
import React, { useState } from 'react';
import { login } from './api';
import type { SetJwts } from './auth';
import { useLocation, useNavigate } from 'react-router-dom';

const Login: React.FC<{ setJwts: SetJwts }> = ({ setJwts }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const location = useLocation();
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            setJwts(await login({ email, password, competencia: true }));
            if (location.pathname == "/login") {
                navigate('/', { replace: true });
            }
        } catch (err) {
            setError('Login failed. Please check your credentials and try again.');
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-form">
                <div className="login-title"><span className="cct-90">A</span>qui-oh Login</div>
                <div className="form-group">
                    <label className="form-label">Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="form-input"
                    />
                </div>
                {error && <p className="error-message" style={{ color: 'red' }}>{error}</p>}
                <div className="form-buttons">
                    <button type="submit" className="login-button">Entrar</button>
                </div>
            </form>
        </div>
    );
};

export default Login;