import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

interface LoginProps {
  onLogin: () => void;
  setAuthToken: React.Dispatch<React.SetStateAction<string>>;
  loadCategories: () => Promise<void>;

}

const Login: React.FC<LoginProps> = ({ onLogin, setAuthToken, loadCategories, authToken }) => {
  const navigate = useNavigate();

  const [userOrEmail, setUserOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5176/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Username: userOrEmail,
          Password: password,
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        console.log(result.message);
        console.log(result.token);
        localStorage.setItem('authToken', result.token); 
        setAuthToken(result.token); 
        console.log("Se cambió el token");

        if (onLogin) {
          onLogin(); // Cambiar el estado de login
        }
        loadCategories();
        alert('Inicio de sesión exitoso');
      } else {
        console.error(result.message);
        alert(result.message); // Mostrar mensaje al usuario
      }
    } catch (error) {
      console.error('Error durante el inicio de sesión:', error);
      alert('Ocurrió un error inesperado. Por favor, intenta de nuevo.');
    }
  };



  const goToSignUp = () => {
    navigate('/signup'); // Navega a la página de registro
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
                placeholder="USERNAME"
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
            <button
              type="button"
              className="signup-btn"
              onClick={goToSignUp}
            >
              Sign Up
            </button>

            <button
              type="submit"
              className="login-btn"
            >
              Login
            </button>
          </div>
        </form>
      </div>

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
