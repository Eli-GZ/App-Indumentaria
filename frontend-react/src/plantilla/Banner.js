import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Banner({ logueado, setLogueado }) {
  const navigate = useNavigate();

  const cerrarSesion = () => {
    localStorage.removeItem('autenticado');
    setLogueado(false);
    navigate('/');
  };
  return (        
    <div className="d-flex flex-column justify-content-end border-dark border border-2" style={{width:"100%",backgroundColor:"pink",height:"10%",position:"fixed"}}>      
      <h2 className="text-dark mb-4 text-center">Sistema de ventas</h2>
    </div >
  )
}
