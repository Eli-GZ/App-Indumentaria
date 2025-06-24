import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

export default function AgregarProducto() {
  let navegacion = useNavigate();

  const [producto, setProducto] = useState({
    nombre: "",
    talle: "",
    costo: "",
    cantidad_disponible: ""
  });

  const { nombre, talle, costo, cantidad_disponible } = producto

  const onInputChange = (e) => {
    //spread operator ... (expandir los atributos)
    setProducto({ ...producto, [e.target.name]: e.target.value })
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    const urlBase = "http://localhost:8080/app-venta/productos";
    await axios.post(urlBase, producto);
    //Redirigimos a la pagina de inicio
    navegacion("/lista/producto")
  }

  return (
    <div className='container'>
      <div className='containeer text-center' style={{ margin: "40px" }}>
        <h3 className='text-dark'>Agregar Producto</h3>
      </div>
      <div className="row justify-content-center">
        <form className='col-md-6' onSubmit={(e) => onSubmit(e)}>
          <div className="mb-3">
            <label htmlFor="nombre" className="form-label text-dark fs-5">Nombre del producto</label>
            <input type="text" className="form-control border-dark " id="nombre" name="nombre"
              required={true} value={nombre} onChange={(e) => onInputChange(e)} />
          </div>

          <div className="mb-3">
            <label htmlFor="talle" className="form-label text-dark fs-5">Talles</label>
            <input type="text" className="form-control border-dark" id="talle" name="talle"
              required={true} value={talle} onChange={(e) => onInputChange(e)} />
          </div>
          <div className="mb-3">
            <label htmlFor="costo" className="form-label text-dark fs-5">Precio</label>
            <input type="number" step="any" className="form-control border-dark" id="costo" name="costo"
              required={true} value={costo} onChange={(e) => onInputChange(e)} />
          </div>
          <div className="mb-3">
            <label htmlFor="cantidad_disponible" className="form-label text-dark fs-5">Cantidad disponible</label>
            <input type="number" step="any" className="form-control border-dark" id="cantidad_disponible" name="cantidad_disponible"
              required={true} value={cantidad_disponible} onChange={(e) => onInputChange(e)} />
          </div>
          <div className='text-center'>
            <button type="submit" className="btn btn-primary me-3 fs-4">Agregar</button>
            <Link to='/lista/producto' className='btn btn-dark'>Regresar</Link>
          </div>
        </form>
      </div>
    </div>
  )
}
