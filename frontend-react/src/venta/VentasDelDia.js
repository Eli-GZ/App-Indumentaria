import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NumericFormat } from 'react-number-format';

export default function VentasDelDia() {
  //URL del back-end
  const urlBase = "http://localhost:8080/app-venta/ventas";

  //hook de estado, crea una variable clientes y una funcion para modificarla setClientes
  const [ventas, setVentas] = useState([]);
  const [fechaSeleccionada, setFechaSeleccionada] = useState("");

  //Se llama a la funcion cargarClientes, obtiene los datos del back-end(array al final, provoca que se ejecute solo una vez)
  useEffect(() => {
    cargarVentas();
  }, []);

  //get con axios. carga los datos del back-end(resultado.data) y lo guarda en productos
  const cargarVentas = async () => {
    const resultado = await axios.get(urlBase);
    const data = resultado.data;

    // Ordenar fechas de más reciente a más antigua
    const fechasOrdenadas = [...new Set(data.map(v => v.fechaVenta))].sort((a, b) => new Date(b) - new Date(a));

    setVentas(data);
    setFechaSeleccionada(fechasOrdenadas[0]); // Selecciona la fecha más reciente por defecto
  };

  const formatearFecha = (fechaOriginal) => {
    const fecha = new Date(fechaOriginal);
    const dia = String(fecha.getDate() + 1).padStart(2, '0');
    const mes = String(fecha.getMonth() + 1).padStart(2, '0'); // enero = 0
    const anio = fecha.getFullYear();
    return `${dia}-${mes}-${anio}`;
  };

  const fechasUnicas = [...new Set(ventas.map(v => v.fechaVenta))].sort((a, b) => new Date(b) - new Date(a));
  const ventasFiltradas = ventas.filter(v => v.fechaVenta === fechaSeleccionada);


  return (
    <div className="container contenido-principal">
      <div className="container text-center">
        <h4 className="text-dark fs-3">Ventas del Día</h4>
        {/* Dropdown de fechas */}
        <div className="">
          <label htmlFor="filtroFecha" className="form-label fw-bold">Seleccionar fecha:</label>
          <select
            id="filtroFecha"
            className="form-select fw-bold border-light mb-4 bg-dark text-light"          
            value={fechaSeleccionada}
            onChange={(e) => setFechaSeleccionada(e.target.value)}>
            {fechasUnicas.map((fecha, i) => {
              const [yyyy, mm, dd] = fecha.split("-");
              const fechaFormateada = `${dd}-${mm}-${yyyy}`;
              return (
                <option key={i} value={fecha}>
                  {fechaFormateada}
                </option>
              );
            })}
          </select>
        </div>
      </div>

      {/* Tabla */}
      <div className="table-responsive" style={{ maxHeight: "68vh", overflowY: "auto" }}>
        <table className="table table-striped table-hover align-middle">
          <thead className="table-dark fs-5" style={{ position: "sticky", top: "0", zIndex: "10" }}>
            <tr>
              <th scope="col">Código de venta</th>
              <th scope="col">Cliente</th>
              <th scope="col">Fecha</th>
              <td></td>
              <th scope="col">Lista de productos</th>
              <td></td>
              <th scope="col">Total</th>
            </tr>
          </thead>
          <tbody className="fs-5 fw-bolder">
            {ventasFiltradas.map((venta, indice) => (
              <tr key={indice}>
                <th scope="row">{venta.codigo_venta}</th>
                <td>{venta.unCliente.nombre} {venta.unCliente.apellido}</td>
                <td>{formatearFecha(venta.fechaVenta)}</td>
                <td></td>
                <td>
                  <div className="dropdown">
                    <button className="btn btn-outline-dark dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                      Ver productos
                    </button>
                    <ul className="dropdown-menu">
                      {venta.listaProductos.map((producto, i) => (
                        <li key={i} className="dropdown-item">
                          {producto.nombre} - ${producto.costo}
                        </li>
                      ))}
                    </ul>
                  </div>
                </td>
                <td></td>
                <td>
                  <NumericFormat
                    value={venta.total}
                    displayType="text"
                    thousandSeparator="."
                    decimalSeparator=","
                    prefix="$"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer fijo */}
      <div
        className="d-flex align-items-center px-4 fs-5 fw-bold"
        style={{
          position: "sticky",
          bottom: "0",
          backgroundColor: "#f8f9fa",
          zIndex: "10",
          height: "6vh",
          borderTop: "2px solid #dee2e6"
        }}
      >
        <span style={{ marginRight: "2vh"}} className=''>Total de ventas del día:</span>
        <NumericFormat
          value={ventasFiltradas.reduce((acc, v) => acc + v.total, 0)}
          displayType="text"
          thousandSeparator="."
          decimalSeparator=","
          prefix="$"
        />
      </div>
    </div>
  );
}