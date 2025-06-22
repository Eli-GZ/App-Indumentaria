import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Navegacion({ logueado, setLogueado }) {
  const navigate = useNavigate();

  const cerrarSesion = () => {
    localStorage.removeItem('autenticado');
    setLogueado(false);
    navigate('/');
  };
  return (       
       <div className="d-flex justify-content-center">
      {/* Sidebar lateral fijo */}
      <div
        className="bg-dark text-white vh-100 p-3"
        style={{ width: '250px', position: 'fixed', left: 0, top: 0 }}
      >
        <h5 className="text-white mb-4">Control de stock Indumentaria Suzy </h5>
        <ul className="nav flex-column fs-5">
          {logueado && (
            <>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/inicio">Inicio</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/agregar">Ventas</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/agregar">Agregar Producto</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/agregar">Agregar Cliente</Link>
              </li>
              <li className="nav-item mt-4">
                <button className="btn btn-light w-100" onClick={cerrarSesion}>
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
