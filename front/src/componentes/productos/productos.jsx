import './productos.css';
import React, { useContext, useState, useEffect } from 'react';
import { CarritoContext } from '../carrito/CarritoContext.jsx';
import axios from 'axios';
import { useAuth } from '../api/AuthContext.jsx';

function Productos() {
  const [productos, setProductos] = useState([]);
  const [detallesVisible, setDetallesVisible] = useState(null);
  const { agregarAlCarrito } = useContext(CarritoContext);
  const { isAuthenticated } = useAuth(); // Obtener estado de autenticación

  const handleClicEnBotonDetalles = (id) => {
    setDetallesVisible(detallesVisible === id ? null : id);
  };


  const handleAgregarAlCarrito = (producto) => {  
    // Validar inicio de sesión antes de agregar
    if (!isAuthenticated) {
      alert('Debes iniciar sesión para agregar productos al carrito');
      return;
    }
    agregarAlCarrito(producto);
  };
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/productos');
        setProductos(response.data);
      } catch (error) {
        console.error('Error al obtener los productos:', error);
      }
    };
    fetchProductos();
  }, []);

  return (
    <section id="productos" className="product-section">
      <div className="container">
        <h1 className="animate__animated animate__rubberBand productosTitulo">Nuestros productos</h1>
        <div className="product-container">
          {productos.map((producto) => (
            <div className="product" key={producto._id}>
              <img src={`http://localhost:5001/uploads/${producto.imagen}`} alt={producto.nombre} />
              <div className="product-info">
                <h3>{producto.nombre}</h3>
                <p>Precio: ${producto.precio}</p>
                <button className="btn" onClick={() => handleClicEnBotonDetalles(producto._id)}>
                  {detallesVisible === producto._id ? 'Ocultar detalles' : 'Ver detalles'}
                </button>
                {detallesVisible === producto._id && (
                  <div className='detallesProductos'>
                    <h2 className='descripcion'> {producto.descripcion} </h2>
                  </div>
                )}
                <button className="btn" onClick={() => handleAgregarAlCarrito(producto)}>Agregar a carrito🛒</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Productos;

