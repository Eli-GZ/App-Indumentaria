import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import LOGO from '../assets/LOGO.png';
import home from '../assets/home-icon.png';
import sell from "../assets/sell-icon.png";
import produ from "../assets/produ-icon.png"
import client from "../assets/client-icon.png"

export default function Navegacion({ logueado, setLogueado }) {
  const navigate = useNavigate();

  const cerrarSesion = () => {
    localStorage.removeItem('autenticado');
    setLogueado(false);
    navigate('/');
  };
  return (
    <div className="d-flex">
      {/* Sidebar lateral fijo */}
      <div
        className="nav-text vh-100 p-3  fs-5 border-dark border border-2"
        style={{ width: '14%', position: 'fixed', left: 0, top: 0 }}
      >
        <div className="text-center mb-3">
          <img src={LOGO} alt="Logo" style={{ width: "100%" }} />
        </div>
        <ul className="nav flex-column">
          {logueado && (
            <><hr className='m-0 mt-4'></hr>
              <div className="text-start d-flex">
                <img src={home} alt="Logo" style={{ width: "10%", height: "10%", margin:"3px"}} />
                <p className='fs-5 m-0'>Inicio</p>            
              </div>
    <hr className='m-0'></hr>
              <li className="nav-item">
                <Link className="nav-link text-dark fs-6 ms-3" to="/inicio">Ventas del dia</Link>
              </li>
     <hr className='m-0 mt-2'></hr>
               <div className="text-start d-flex">
                <img src={sell} alt="Logo" style={{ width: "10%", height: "10%", margin:"3px"}} />
                <p className='fs-5 m-0'>Ventas</p>            
              </div>
                  <hr className='m-0'></hr>
                <li className="nav-item">
                  <Link className="nav-link text-dark fs-6 ms-3" to="/lista/venta">Todas las ventas</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-dark fs-6 ms-3" to="/agregar/venta">Agregar Ventas</Link>
                </li>          
         <hr className='m-0 mt-2'></hr>
               <div className="text-start d-flex">
                <img src={produ} alt="Logo" style={{ width: "10%", height: "10%", margin:"3px"}} />
                <p className='fs-5 m-0'>Productos</p>            
              </div>
                  <hr className='m-0'></hr>
                <li className="nav-item">
                  <Link className="nav-link text-dark fs-6 ms-3" to="/lista/producto">Lista de productos</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-dark fs-6 ms-3" to="/lista/producto/falta_stock">Falta Stock</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-dark fs-6 ms-3" to="/agregar/producto">Agregar Producto</Link>
                </li>
              
            <hr className='m-0 mt-2'></hr>
               <div className="text-start d-flex">
                <img src={client} alt="Logo" style={{ width: "10%", height: "10%", margin:"3px" }} />
                <p className='fs-5 m-0'>Clientes</p>            
              </div>
                <hr className='m-0'></hr>
                <li className="nav-item">
                  <Link className="nav-link text-dark fs-6 ms-3" to="/lista/cliente">Lista de clientes</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-dark fs-6 ms-3" to="/agregar/cliente">Agregar Cliente</Link>
                </li>              


              <li className="nav-item mt-4">
                <button className="btn btn-dark w-100 border-dark" onClick={cerrarSesion}>
                  Cerrar sesión
                </button>
              </li>
            </>
          )}
        </ul>
      </div >
    </div >
  )
}
