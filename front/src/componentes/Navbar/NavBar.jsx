import './Navbar.css';
 import 'bootstrap/dist/css/bootstrap.min.css';
 import logo from '../../assets/imagenes/logo.png';
 import { Link ,useNavigate} from 'react-router-dom';
 import React, { useContext } from 'react';
 import { CarritoContext } from '../carrito/CarritoContext';
 import Container from 'react-bootstrap/Container';
 import Nav from 'react-bootstrap/Nav';
 import Navbar from 'react-bootstrap/Navbar';
 import {useAuth} from "../api/AuthContext"

  function Navbar1() {
    const { isAuthenticated, logout } = useAuth()
    const navigate = useNavigate()
    const handleSesion = () => {
      if (isAuthenticated) {
        logout();
        alert('Sesión cerrada');
      } else {
        navigate('/login'); // Redirigir a la página de inicio de sesión
      }
    };
   const { cantidadTotalProductos } = useContext(CarritoContext);
   return (
     <Navbar expand="lg" sticky="top" className="bg-celeste fs-3">
       <Container>
         <Navbar.Brand as={Link} to="/argentum">
           <img className='logo' src={logo} alt="Argentum Sports" />
         </Navbar.Brand>
         <Navbar.Toggle aria-controls="basic-navbar-nav" />
         <Navbar.Collapse id="basic-navbar-nav">
           <Nav className="mx-auto">
             <Nav.Link as={Link} to="/productos">Productos</Nav.Link>
             <Nav.Link as={Link} to="/contacto">Contacto</Nav.Link>
             <Nav.Link as={Link} to="/carrito">🛒 ({cantidadTotalProductos})</Nav.Link>
             <button onClick={handleSesion} className="btn btn-outline-light">
              {isAuthenticated ? 'Cerrar Sesión' : 'Iniciar Sesión'}
            </button>
          </Nav>
         </Navbar.Collapse>
       </Container>
     </Navbar>
   );
 }

 export default Navbar1;



