import React, { useContext } from 'react';
import { CarritoContext } from './CarritoContext';
import './carrito.css';

function Carrito() {
  const { carrito, eliminarDelCarrito, limpiarCarrito, precioTotal } = useContext(CarritoContext);

  return (
    <div className="carrito-container">
      <h1>Carrito</h1>
      {carrito.length === 0 ? (
        <p>El carrito está vacío</p>
      ) : (
        <>
          <ul>
            {carrito.map((producto) => (
              <li key={producto._id} className="productoCarrito">
                <img src={`http://localhost:5001/uploads/${producto.imagen}`} alt="" />
                <span>{producto.nombre}</span> - ${producto.precio.toFixed(2)} x {producto.cantidad}
                <button className='botonEliminar' onClick={() => eliminarDelCarrito(producto._id)}>Eliminar 🗑</button>
              </li>
            ))}
          </ul>
          <div className='CarritoTotal'>
            <p>Total de productos: {carrito.reduce((acc, item) => acc + item.cantidad, 0)}</p>
            <p>Precio Total: ${precioTotal.toFixed(2)}</p>
            <button className="btn-limpiar" onClick={limpiarCarrito}>
              Limpiar carrito
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Carrito;


 