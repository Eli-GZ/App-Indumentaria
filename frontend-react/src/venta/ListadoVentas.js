import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NumericFormat } from 'react-number-format';
import { Link } from 'react-router-dom';

export default function ListadoVentas() {
  //URL del back-end
  const urlBase = "http://localhost:8080/app-venta/ventas";

  //hook de estado, crea una variable clientes y una funcion para modificarla setClientes
  const [ventas, setVentas] = useState([]);

  //Se llama a la funcion cargarClientes, obtiene los datos del back-end(array al final, provoca que se ejecute solo una vez)
  useEffect(() => {
    cargarVentas();
  }, []);

  //get con axios. carga los datos del back-end(resultado.data) y lo guarda en productos
  const cargarVentas = async () => {
    const resultado = await axios.get(urlBase);
    console.log("Resultado cargar ventas");
    console.log(resultado.data);
    setVentas(resultado.data);
  }

  const eliminarClientes = async (id) => {
    await axios.delete(`${urlBase}/${id}`);
    cargarVentas();
    alert("El cliente se eliminó el correctamente")
  }
  return (
    <div className="container">
      <div className="container text-center " style={{ margin: "40px" }}>
        <h4 className="text-dark">Ventas</h4>
      </div>
      <table className="table table-striped table-hover align-middle">
        <thead className="table-dark fs-5">
          <tr>
            <th scope="col">Codigo de venta</th>
            <th scope="col">Cliente</th>
            <th scope="col">Fecha</th>
            <th scope="col">Lista de productos</th>
            <th scope="col">Total</th>
            <th scope="col"></th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody className='fs-5 fw-bolder'>
          {
            //Iteramos el arreglo de empleados
            ventas.map((ventas, indice) => (
              <tr key={indice}>
                <th scope="row">{ventas.codigo_venta}</th>
                <td>{ventas.unCliente.nombre} {ventas.unCliente.apellido}</td>
                <td>{ventas.fechaVenta}</td>
                <td>
                  <div className="dropdown">
                    <button className="btn btn-outline-dark dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                      Ver productos
                    </button>
                    <ul className="dropdown-menu">
                      {ventas.listaProductos.map((producto, i) => (
                        <li key={i} className="dropdown-item">
                          {producto.nombre} - ${producto.costo}
                        </li>
                      ))}
                    </ul>
                  </div>
                </td>
                <td><NumericFormat value={ventas.total}
                  displayType='text'
                  thousandSeparator="`.`" prefix='$'
                  fixedDecimalScale /></td>
                <td></td>
                <td className='text-center'>
                  <div>
                    <Link to={`/editar/venta/${ventas.codigo_venta}`}
                      className='btn btn-primary btn-sm me-3 fs-5'>Editar</Link>
                    <button onClick={() => eliminarClientes(ventas.codigo_venta)} className='btn btn-dark btn-sm fs-5'>
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
