import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NumericFormat } from 'react-number-format';
import { Link } from 'react-router-dom';
import edit from "../assets/edit-icon.png"
import borrar from "../assets/borrar-icon.png"

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
    const confirmacion = window.confirm("¿Estás seguro de eliminar este cliente?");
    if (confirmacion) {
      try {
        await axios.delete(`${urlBase}/${id}`);
        cargarClientes();
        alert("El cliente se eliminó correctamente");
      } catch (error) {
        console.error("Error al eliminar cliente:", error);
        alert("No se pudo eliminar el cliente. Posiblemente tiene ventas asociadas.");
      }
    }
  };

  return (
    <div className="container contenido-principal">
      <div className="container text-center " style={{ margin: "40px" }}>
        <h4 className="text-dark">Todos nuestros clientes</h4>
      </div>
      <div className="table-responsive" style={{ maxHeight: "80vh", overflowY: "auto" }}>
        <table className="table table-striped table-hover align-middle" style={{ minWidth: "1000px" }}>
          <thead className="table-dark fs-5" style={{ position: "sticky", top: "0", zIndex: "10" }}>
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
                  <td> <NumericFormat
                    value={clientes.dni}
                    displayType="text"
                    thousandSeparator="."
                    decimalSeparator=","
                  /></td>
                  <td></td>
                  <td className='text-center'>
                    <div>
                      {
                        clientes.id_cliente !== 1 && (
                          <Link to={`/editar/cliente/${clientes.id_cliente}`} className='btn btn-light btn-sm me-3 fs-5 border-dark'><img src={edit}alt=''></img></Link>
                        )}
                      {clientes.id_cliente !== 1 && (
                        <button onClick={() => eliminarClientes(clientes.id_cliente)} className='btn btn-light btn-sm fs-5 border-dark'>
                          <img src={borrar}alt=''></img>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            }

          </tbody>
        </table>
      </div>
    </div>

  )
}
