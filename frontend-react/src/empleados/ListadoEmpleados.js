import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NumericFormat } from 'react-number-format';
import { Link } from 'react-router-dom';

export default function ListadoProductos() {
  //URL del back-end
  const urlBase = "http://localhost:8080/app-venta/productos";

  //hook de estado, crea una variable empleados y una funcion para modificarla setEmpleados
  const [productos, setProductos] = useState([]);

  //Se llama a la funcion cargarEmpleados, obtiene los datos del back-end(array al final, provoca que se ejecute solo una vez)
  useEffect(() => {
    cargarEmpleados();
  }, []);

  //get con axios. carga los datos del back-end(resultado.data) y lo guarda en empleados
  const cargarEmpleados = async () => {
    const resultado = await axios.get(urlBase);
    console.log("Resultado cargar productos");
    console.log(resultado.data);
    setProductos(resultado.data);
  }
const eliminarEmpleado = async(id) =>{
  await axios.delete(`${urlBase}/${id}`);
  cargarEmpleados();
}
  return (
    <div className="container">
      <div className="container text-center">
        <h4 className="text-light">Listado de productos en stock</h4>
      </div>

      <table className="table table-striped table-hover align-middle">
        <thead className="table-dark fs-5">
          <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Talles</th>
            <th scope="col">Precio</th>
            <th scope="col">Cantidad</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody className='fs-5 fw-bolder'>
          {
            //Iteramos el arreglo de empleados
            productos.map((producto, indice) => (
              <tr key={indice}>
                <th scope="row">{producto.nombre}</th>
                <td>{producto.talle}</td>               
                <td><NumericFormat value={producto.costo}
                  displayType='text'
                  thousandSeparator="," prefix='$'
                  decimalScale={2} fixedDecimalScale />
                </td>
                 <td>{producto.cantidad_disponible}</td>
                <td className='text-center'>
                  <div>
                    <Link to={`/editar/${producto.id}`}
                    className='btn btn-primary btn-sm me-3 fs-5'>Editar</Link>
                    <button onClick={()=> eliminarEmpleado(producto.id)}  className='btn btn-dark btn-sm fs-5'>
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
