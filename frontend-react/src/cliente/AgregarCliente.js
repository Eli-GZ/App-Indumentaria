import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import back from "../assets/cancelar-icon.png"
import save from "../assets/save-icon.png"

export default function AgregarCliente() {
  let navegacion = useNavigate();

  const [cliente, setCliente] = useState({
    nombre: "",
    apellido: "",
    dni: ""    
  });

  const { nombre, apellido, dni } = cliente

  const onInputChange = (e) => {
    //spread operator ... (expandir los atributos)
    setCliente({ ...cliente, [e.target.name]: e.target.value })
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    const urlBase = "http://localhost:8080/app-venta/clientes";
    await axios.post(urlBase, cliente);
    //Redirigimos a la pagina de inicio
    navegacion("/lista/cliente")
  }

  return (
    <div className='container contenido-principal'>
      <div className='containeer text-center' style={{ marginBottom: "30px" }}>
        <h3 className='text-dark fs-3'>Agregar Cliente</h3>
      </div>
      <div className="row justify-content-center">
        <form className='col-md-6' onSubmit={(e) => onSubmit(e)}>
          <div className="mb-3">
            <label htmlFor="nombre" className="form-label text-dark fs-5">Nombre</label>
            <input type="text" className="form-control border-dark " id="nombre" name="nombre"
              required={true} value={nombre} onChange={(e) => onInputChange(e)} />
          </div>

          <div className="mb-3">
            <label htmlFor="talle" className="form-label text-dark fs-5">Apellido</label>
            <input type="text" className="form-control border-dark" id="apellido" name="apellido"
              required={true} value={apellido} onChange={(e) => onInputChange(e)} />
          </div>
          <div className="mb-3">
            <label htmlFor="talle" className="form-label text-dark fs-5">DNI</label>
            <input type="text" className="form-control border-dark" id="dni" name="dni"
              required={true} value={dni} onChange={(e) => onInputChange(e)} />
          </div>
          <div className='text-center'>
            <button type="submit" className="btn btn-light me-3 border-dark"><img src={save}alt=''></img></button>
            <Link to='/lista/cliente' className='btn btn-light border-dark'><img src={back}alt=''></img></Link>
          </div>
        </form>
      </div>
    </div>
  )
}
