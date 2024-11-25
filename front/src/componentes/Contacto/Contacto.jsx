import "./Contacto.css"
import React, { useState } from 'react';

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Datos del formulario:', formData);
    setFormData({
      name: '',
      email: '',
      message: '',
    });
    alert("Email enviado")
  };

  return ( 
    <form onSubmit={handleSubmit} id="contact-form">
      <div className="contactoNombre">
        <label className="labelNombre" htmlFor="name">Nombre:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="inputNombre"
          />
      </div>
      <div className="contactoEmail">
        <label className="labelEmail" htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="inputEmail"
          />
      </div>
      <div className="contactoMensaje">
        <label className="labelMensaje" htmlFor="message">Mensaje:</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          className="inputMensaje"
          />
      </div>
      <button className="botonEnviar" type="submit">Enviar</button>
    </form>
  );
}

export default ContactForm