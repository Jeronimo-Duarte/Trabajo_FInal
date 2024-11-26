import React, { createContext, useState, useEffect, useContext } from 'react';
import { useAuth } from '../api/AuthContext';

export const CarritoContext = createContext();

export const CarritoPro = ({ children }) => {
  const { isAuthenticated, user } = useAuth();
  const [carrito, setCarrito] = useState([]);
  // Guardar carrito cuando cambia


  const agregarAlCarrito = (producto) => {
    // Validar inicio de sesión
    if (!isAuthenticated) {
      alert('Necesitas iniciar sesión para agregar productos al carrito');
      return;
    }

    setCarrito((prevCarrito) => {
      const productoExistente = prevCarrito.find((item) => item._id === producto._id);      
      if (productoExistente) {
        return prevCarrito.map((item) =>
          item._id === producto._id 
            ? { ...item, cantidad: item.cantidad + 1 } 
            : item
        );
      } else {
        return [...prevCarrito, { ...producto, cantidad: 1 }];
      }
    });
  };

  const eliminarDelCarrito = (id) => {
    setCarrito((prevCarrito) => 
      prevCarrito.filter((producto) => producto._id !== id)
    );
  };

  const limpiarCarrito = () => {
    setCarrito([]);
  };

  const precioTotal = carrito.reduce(
    (total, producto) => total + producto.precio * producto.cantidad, 
    0
  );

  const cantidadTotalProductos = carrito.reduce(
    (total, producto) => total + producto.cantidad, 
    0
  );

  return (
    <CarritoContext.Provider
      value={{
        carrito,
        agregarAlCarrito,
        eliminarDelCarrito,
        limpiarCarrito,
        precioTotal,
        cantidadTotalProductos,
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
};