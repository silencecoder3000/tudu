import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

interface LoginProps {
  onLogin?: (userOrEmail: string, password: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const navigate = useNavigate();

  const [userOrEmail, setUserOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onLogin) {
      onLogin(userOrEmail, password);
    }
    // Lógica de login real (llamar API, etc.)
  };

  const goToSignUp = () => {
    // Navega a /signup
    navigate('/signup');
  };

  return (
    <div className="login-container">
      {/* Círculos blancos de adorno */}
      <div className="white-circle-top"></div>
      <div className="white-circle-bottom"></div>

      {/* Caja de Login */}
      <div className="login-box">
        <h1>Login</h1>

        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <div className="input-icon">
              <input
                type="text"
                placeholder="EMAIL"
                value={userOrEmail}
                onChange={(e) => setUserOrEmail(e.target.value)}
                required
              />
              <span className="icon">👤</span>
            </div>
          </div>

          <div className="input-wrapper">
            <div className="input-icon">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="PASSWORD"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                className="icon toggle-eye"
                onClick={() => setShowPassword(prev => !prev)}
              >
                {showPassword ? '🙈' : '👁'}
              </span>
            </div>
          </div>

          <div className="buttons-row">
            {/* Botón que navega a la página de Sign Up */}
            <button
              type="button"
              className="signup-btn"
              onClick={goToSignUp}
            >
              Sign Up
            </button>

            {/* Botón que envía el formulario de Login */}
            <button
              type="submit"
              className="login-btn"
            >
              Login
            </button>
          </div>
        </form>
      </div>

      {/* Semicírculo con info a la derecha */}
      <div className="intro-box">
        <div className="intro-content">
          <h2 className="tudu-title">tu-DU</h2>
          <p>
            Bienvenido a tuDu ✏️💡<br />
            Inicia sesión para organizar tu día como un profesional 🚀🗓<br />
            ¿Nuevo aquí?<br />
            ¡Crea una cuenta en segundos y comienza a ser más productivo! 🌟⏰
          </p>
          <button className="learn-more-btn">LEARN MORE</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
