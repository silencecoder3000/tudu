// src/pages/SignUp.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';

interface SignUpProps {
  onSignUp?: (
    user: string,
    email: string,
    password: string,
    confirmPassword: string
  ) => void;
}

const SignUp: React.FC<SignUpProps> = ({ onSignUp }) => {
  const navigate = useNavigate();

  // Estados para los campos
  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Control para mostrar/ocultar password y confirm password
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Manejo de envío de formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validación básica de contraseñas
    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    // Crear objeto con datos de registro
    const userData = {
      Username: user,
      Email: email,
      Password: password,
    };

    try {
      // Realizar la solicitud POST para crear el usuario
      const response = await fetch('http://localhost:5176/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const result = await response.json();

      if (response.ok) {
        alert(`Usuario: ${user} creado correctamente`);
        if (onSignUp) {
          onSignUp(user, email, password, confirmPassword);

        }}
        navigate('/');
    
    } catch (error) {
      console.error('Error al registrar el usuario:', error);
      alert('Hubo un problema al intentar crear el usuario');
    }
  };


  // Botón "Cancelar" => regresar al Login
  const handleCancel = () => {
    navigate('/login');
  };

  return (
    <div className="signup-container">
      {/* Círculos blancos de adorno */}
      <div className="white-circle-top"></div>
      <div className="white-circle-bottom"></div>

      {/* Tarjeta Sign Up */}
      <div className="signup-box">
        <h1>Sign up</h1>
        <form onSubmit={handleSubmit}>
          {/* USER */}
          <div className="input-wrapper">
            <div className="input-icon">
              <input
                type="text"
                placeholder="USER"
                value={user}
                onChange={(e) => setUser(e.target.value)}
                required
              />
            </div>
          </div>

          {/* EMAIL */}
          <div className="input-wrapper">
            <div className="input-icon">
              <input
                type="email"
                placeholder="EMAIL"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <span className="icon">👤</span>
            </div>
          </div>

          {/* PASSWORD */}
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
                className="icon"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? '🙈' : '🔒'}
              </span>
            </div>
          </div>

          {/* CONFIRM PASSWORD */}
          <div className="input-wrapper">
            <div className="input-icon">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="CONFIRM PASSWORD"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <span
                className="icon"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? '🙈' : '🔍'}
              </span>
            </div>
          </div>

          {/* Botones */}
          <div className="buttons-row">
            <button
              type="button"
              className="cancel-btn"
              onClick={handleCancel}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="signup-btn"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>

      {/* Semicírculo con info a la derecha */}
      <div className="intro-box-s">
        <div className="intro-content-s">
          <h2 className="tudu-title-s">tu-DU</h2>
          <p>
            Bienvenido a tuDu ✏️💡<br />
            Inicia sesión para organizar tu día como un profesional 🚀🗓<br />
            ¿Nuevo aquí?<br />
            ¡Crea una cuenta en segundos y comienza a ser más productivo! 🌟⏰
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

