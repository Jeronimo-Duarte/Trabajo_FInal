import "./Contacto.css"
import React, { useState } from 'react';
import axios from "axios";
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5001/send-email", formData);
      alert("Correo enviado con éxito.");
      console.log(response.data);

      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      console.error("Error al enviar el correo:", error);
      alert("Hubo un error al enviar el correo.");
    }
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