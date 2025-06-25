import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export default function ListadoClientes() {
  //URL del back-end
  const urlBase = "http://localhost:8080/app-venta/clientes";

  //hook de estado, crea una variable clientes y una funcion para modificarla setClientes
  const [clientes, setClientes] = useState([]);

  //Se llama a la funcion cargarClientes, obtiene los datos del back-end(array al final, provoca que se ejecute solo una vez)
  useEffect(() => {
    cargarClientes();
  }, []);

  //get con axios. carga los datos del back-end(resultado.data) y lo guarda en productos
  const cargarClientes = async () => {
    const resultado = await axios.get(urlBase);
    console.log("Resultado cargar clientes");
    console.log(resultado.data);
    setClientes(resultado.data);
  }
  const eliminarClientes = async (id) => {
    await axios.delete(`${urlBase}/${id}`);
    cargarClientes();
    alert("El cliente se eliminó el correctamente")
  }
  return (
    <div className="container">
      <div className="container text-center " style={{ margin: "40px" }}>
        <h4 className="text-dark">Listado de productos en stock</h4>
      </div>
      <table className="table table-striped table-hover align-middle">
        <thead className="table-dark fs-5">
          <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Apellido</th>
            <th scope="col">D.N.I</th>
            <th scope="col"></th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody className='fs-5 fw-bolder'>
          {
            //Iteramos el arreglo de empleados
            clientes.map((clientes, indice) => (
              <tr key={indice}>
                <th scope="row">{clientes.nombre}</th>
                <td>{clientes.apellido}</td>
                <td>{clientes.dni}</td>
                <td></td>
                <td className='text-center'>
                  <div>
                    <Link to={`/editar/cliente/${clientes.id_cliente}`}
                      className='btn btn-primary btn-sm me-3 fs-5'>Editar</Link>
                    <button onClick={() => eliminarClientes(clientes.id_cliente)} className='btn btn-dark btn-sm fs-5'>
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))
          }

        </tbody>
      </table>
    </div>

  )
}
