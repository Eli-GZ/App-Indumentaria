import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NumericFormat } from 'react-number-format';
import { Link } from 'react-router-dom';
import edit from "../assets/edit-icon.png"
import borrar from "../assets/borrar-icon.png"

export default function ListadoProductos() {
  //URL del back-end
  const urlBase = "http://localhost:8080/app-venta/productos";

  //hook de estado, crea una variable productos y una funcion para modificarla setProductos
  const [productos, setProductos] = useState([]);

  //Se llama a la funcion cargarProductos, obtiene los datos del back-end(array al final, provoca que se ejecute solo una vez)
  useEffect(() => {
    cargarProductos();
  }, []);

  //get con axios. carga los datos del back-end(resultado.data) y lo guarda en productos
  const cargarProductos = async () => {
    const resultado = await axios.get(urlBase);
    console.log("Resultado cargar productos");
    console.log(resultado.data);
    setProductos(resultado.data);
  }
  const eliminarProductos = async (id) => {
    const confirmacion = window.confirm("¿Estás seguro de eliminar este producto?");   
    if (confirmacion) {
      try {
        await axios.delete(`${urlBase}/${id}`);
        cargarProductos();
       alert("El producto se eliminó el correctamente")
      } catch (error) {
        console.error("Error al eliminar el producto:", error);
        alert("No se pudo eliminar el producto. Posiblemente tiene ventas asociadas.");
      }
    }
  }
  return (
    <div className="container contenido-principal">
      <div className="container text-center" style={{ marginBottom: "30px" }}>
        <h4 className="text-dark fs-3">Listado de productos en stock</h4>
      </div>
      <div className="table-responsive" style={{  maxHeight: "80vh", overflowY: "auto" }}>
        <table className="table table-striped table-hover align-middle" style={{ minWidth: "1000px" }}>
          <thead className="table-dark fs-5" style={{ position: "sticky", top: "0", zIndex: "10" }}>
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
                    thousandSeparator="."
                    decimalSeparator=","
                    prefix="$" />
                  </td>
                  <td>{producto.cantidad_disponible}</td>
                  <td className='text-center'>
                    <div>
                      <Link to={`/editar/producto/${producto.codigo_producto}`}
                        className='btn btn-light btn-sm me-3 fs-5 border-dark'><img src={edit}alt=''></img></Link>
                      <button onClick={() => eliminarProductos(producto.codigo_producto)} className='btn btn-light btn-sm fs-5 border-dark'>                         
                        <img src={borrar}alt=''></img>
                      </button>
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
