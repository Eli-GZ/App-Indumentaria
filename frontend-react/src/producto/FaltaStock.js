import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NumericFormat } from 'react-number-format';
import { Link } from 'react-router-dom';

export default function ListadoProductos() {
  //URL del back-end
  const urlBase = "http://localhost:8080/app-venta/productos/falta_stock";

  //hook de estado, crea una variable productos y una funcion para modificarla setProductos
  const [productos, setProductos] = useState([]);

  //Se llama a la funcion cargarProductos, obtiene los datos del back-end(array al final, provoca que se ejecute solo una vez)
  useEffect(() => {
    cargarProductos();
  }, []);

  const [mensaje, setMensaje] = useState("");
  //get con axios. carga los datos del back-end(resultado.data) y lo guarda en productos
  const cargarProductos = async () => {
    const resultado = await axios.get(urlBase);
    const datos = resultado.data;
    if (!datos || datos.length === 0) {
      setMensaje("No hay artículos con menos de 5 unidades en stock.");
    } else {
      setMensaje(""); // limpia el mensaje si hay productos
    }
    setProductos(datos);
    console.log(datos);
  }

  const eliminarProductos = async (id) => {
    await axios.delete(`${urlBase}/${id}`);
    cargarProductos();
    alert("El producto se eliminó el correctamente")
  }
  return (
    <div className="container contenido-principal">
      <div className="container text-center " style={{ margin: "40px" }}>
        <h4 className="text-dark">Faltante de stock</h4>
      </div>
       <div className="table-responsive" style={{ maxHeight: "750px", overflowY: "auto" }}>
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
                    <Link to={`/editar/producto/falta_stock/${producto.codigo_producto}`}
                      className='btn btn-primary btn-sm
                       me-3 fs-5'>Editar</Link>
                    <button onClick={() => eliminarProductos(producto.codigo_producto)} className='btn btn-dark btn-sm fs-5'>
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
      <div>
        {mensaje && <p style={{ color: "red" }}>{mensaje}</p>}</div>
    </div>
</div>
  )
}
