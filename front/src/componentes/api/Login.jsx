import React, { useState } from 'react';
import api from './api';    
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from './AuthContext';
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const {login} = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/users/login', { username, password });
      login();
      navigate('/argentum')
    } catch (error) {
      alert('Error al iniciar sesion: ' + error.response.data);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Iniciar Sesion</h2>
      <input
        type="text"
        placeholder="Nombre de usuario"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Iniciar Sesion</button>
      <Link to="/register" >Registrate si todavia no lo hiciste</Link>
    </form>
  );
};

export default Login;