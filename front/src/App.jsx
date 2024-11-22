import { HashRouter as Router, Routes, Route,Navigate } from 'react-router-dom'
import './App.css'
import Navbar1 from './componentes/Navbar/NavBar.jsx'
import Seccion from './componentes/seccion/Seccion.jsx'
import Productos from './componentes/productos/productos.jsx'
import Footer from './componentes/Footer/Footer.jsx'
import ContactForm from './componentes/Contacto/Contacto.jsx'
import Carrito from './componentes/carrito/Carrito.jsx'
import { CarritoPro } from './componentes/carrito/CarritoContext.jsx';
import { AuthProvider } from './componentes/api/AuthContext.jsx'
import Register from './componentes/api/Register.jsx'
import Login from './componentes/api/Login.jsx'

function app(){
  return(
    <AuthProvider>

    <CarritoPro>
  <Router>
    <div className='contenedor'>
      <Navbar1 />
      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/argentum" />} />
          <Route path='/argentum' element={<Seccion />} />  
          <Route path='/productos' element={<Productos />} />
          <Route path='/contacto' element={<ContactForm />} />
          <Route path='/carrito' element={<Carrito />} />
          <Route  path='/register'element={<Register/>} />
          <Route  path='/login'element={<Login/>} />  
        </Routes>
      </main>
      <Footer />
    </div>
  </Router>
</CarritoPro>
</AuthProvider>


  );
}

export default app;