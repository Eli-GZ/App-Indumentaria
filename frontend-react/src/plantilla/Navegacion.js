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
    <div className="d-flex">
      {/* Sidebar lateral fijo */}
      <div
        className="bg-dark text-white vh-100 p-3"
        style={{ width: '250px', position: 'fixed', left: 0, top: 0 }}
      >
        <h4 className="text-white mb-4">Control de stock Indumentaria Suzy </h4>
        <ul className="nav flex-column fs-5">
          {logueado && (
            <>
              <hr></hr>
              <ul>Productos
                <li className="nav-item">
                  <Link className="nav-link text-white fs-6" to="/lista/producto">Lista de productos</Link>
                </li>               
                <li className="nav-item">
                  <Link className="nav-link text-white fs-6" to="/lista/producto/falta_stock">Falta Stock</Link>
                </li>
                 <li className="nav-item">
                  <Link className="nav-link text-white fs-6" to="/agregar/producto">Agregar Producto</Link>
                </li>
              </ul>
              <hr></hr>
              <ul>Clientes
                <li className="nav-item">
                  <Link className="nav-link text-white fs-6" to="/lista/cliente">Lista de clientes</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white fs-6" to="/agregar/cliente">Agregar Cliente</Link>
                </li>
              </ul>
              <hr></hr>
              <ul>Ventas
                <li className="nav-item">
                  <Link className="nav-link text-white fs-6" to="/lista/venta">Lista de ventas</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white fs-6" to="/agregar/venta">Agregar Ventas</Link>
                </li>
              </ul>

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
