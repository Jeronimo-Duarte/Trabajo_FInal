import React, { useState } from 'react';
import api from './api';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth()
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/users/register', { username, password });
      await api.post('/users/login', { username, password });

      // Actualizar el estado de autenticación
      login();

      // Redirigir al usuario a la página principal
      navigate('/argentum');
      alert('Usuario registrado e iniciado sesión con éxito');
    } catch (error) {
      alert('Error al registrar: ' + error.response.data);
    }
  };

  return (
    <form className='FormLogin' onSubmit={handleSubmit}>
      <h2>Registro</h2>
      <input
        type="text"
        placeholder="Nombre de usuario"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        className='inputLogin'
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className='inputLogin'
      />
      <button className='botonLogin' type="submit">Registrar</button>
    </form>
  );
};

export default Register;