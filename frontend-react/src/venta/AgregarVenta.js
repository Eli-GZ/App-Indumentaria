import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function AgregarVenta() {
  const navegar = useNavigate();

  // Estado principal de la venta
  const [venta, setVenta] = useState({
    fechaVenta: "",
    unCliente: {},
    listaProductos: [],
    total: 0
  });

  const [clientesDisponibles, setClientesDisponibles] = useState([]);
  const [productosDisponibles, setProductosDisponibles] = useState([]);

  // Cargar clientes disponibles al inicio
  useEffect(() => {
    const cargarClientes = async () => {
      const res = await axios.get("http://localhost:8080/app-venta/clientes");
      setClientesDisponibles(res.data);
    };
    cargarClientes();
  }, []);

  // Cargar productos disponibles al inicio
  useEffect(() => {
    const cargarProductos = async () => {
      const res = await axios.get("http://localhost:8080/app-venta/productos");
      setProductosDisponibles(res.data);
    };
    cargarProductos();
  }, []);

  // Selección de cliente desde el select
  const onClienteChange = (e) => {
    const clienteSeleccionado = clientesDisponibles.find(
      c => c.id_cliente === parseInt(e.target.value)
    );
    setVenta({ ...venta, unCliente: clienteSeleccionado });
  };

  // Manejo de fecha u otros campos
  const onInputChange = (e) => {
    setVenta({ ...venta, [e.target.name]: e.target.value });
  };

  // Actualiza o elimina productos de la venta según cantidad
  const actualizarCantidadProducto = (producto, cantidadStr) => {
    let cantidad = parseInt(cantidadStr);
    if (isNaN(cantidad) || cantidad < 0) cantidad = 0;

    let nuevaLista;

    const index = venta.listaProductos.findIndex(
      p => p.producto.codigo_producto === producto.codigo_producto
    );

    if (cantidad === 0) {
      // Eliminar producto si cantidad es 0
      nuevaLista = venta.listaProductos.filter(
        p => p.producto.codigo_producto !== producto.codigo_producto
      );
    } else if (index !== -1) {
      // Actualizar cantidad producto existente
      nuevaLista = [...venta.listaProductos];
      nuevaLista[index].cantidad = cantidad;
    } else {
      // Agregar nuevo producto
      nuevaLista = [...venta.listaProductos, { producto, cantidad }];
    }

    setVenta({
      ...venta,
      listaProductos: nuevaLista
    });

    console.log("listaProductos (debug): ", nuevaLista);
  };

  // Calcula el total cada vez que cambia la lista de productos
  useEffect(() => {
    const totalCalculado = venta.listaProductos.reduce((acc, item) => {
      const cant = Number(item.cantidad);
      const costo = Number(item.producto.costo);
      return acc + (isNaN(cant) || isNaN(costo) ? 0 : cant * costo);
    }, 0);
    setVenta(prev => ({ ...prev, total: totalCalculado }));
  }, [venta.listaProductos]);

  // Validación de formato de fecha
  const isFechaValida = (fecha) => /^\d{4}-\d{2}-\d{2}$/.test(fecha);

  // Envío del formulario
  const onSubmit = async (e) => {
    e.preventDefault();

    if (!isFechaValida(venta.fechaVenta)) {
      alert("Fecha inválida. Debe tener formato yyyy-MM-dd.");
      return;
    }

    const ventaAEnviar = {
      fecha_venta: venta.fechaVenta,
      clienteId: venta.unCliente.id_cliente,
      listaProductos: venta.listaProductos.map(p => ({
        codigo_producto: p.producto.codigo_producto,
        cantidad: p.cantidad
      })),
      total: venta.total
    };

    try {
      await axios.post("http://localhost:8080/app-venta/ventas", ventaAEnviar);
      navegar("/lista/venta");
    } catch (error) {
      alert("No se pudo concretar la venta "+ error.response?.data);
      console.error("Error al guardar la venta:", error.response?.data || error.message);
    }
  };
  // Renderizado
  return (
    <div className='container'>
      <div className='text-center' style={{ margin: "40px" }}>
        <h3 className='text-dark'>Agregar Nueva Venta</h3>
      </div>

      <div className="row justify-content-center">
        <form className='col-md-6' onSubmit={onSubmit}>
          {/* Select cliente */}
          <div className="mb-3">
            <label className="form-label text-dark fs-5">Cliente</label>
            <select className="form-select border-dark" required onChange={onClienteChange}>
              <option value="">Seleccione un cliente</option>
              {clientesDisponibles.map(cliente => (
                <option key={cliente.id_cliente} value={cliente.id_cliente}>
                  {cliente.nombre} {cliente.apellido}
                </option>
              ))}
            </select>
          </div>

          {/* Input fecha */}
          <div className="mb-3">
            <label className="form-label text-dark fs-5">Fecha</label>
            <input
              type="date"
              className="form-control border-dark"
              name="fechaVenta"
              required
              value={venta.fechaVenta}
              onChange={onInputChange}
            />
          </div>

          {/* Lista de productos con input de cantidad */}
          <div className="mb-3">
            <label className="form-label text-dark fs-5">Seleccionar Productos</label>
            <div className="border p-3 rounded" style={{ maxHeight: "200px", overflowY: "scroll" }}>
              {productosDisponibles.map(producto => {
                const productoEnVenta = venta.listaProductos.find(
                  p => p.producto.codigo_producto === producto.codigo_producto
                );
                const cantidad = productoEnVenta ? productoEnVenta.cantidad : 0;

                return (
                  <div key={producto.codigo_producto} className="d-flex align-items-center mb-2">
                    <div style={{ flexGrow: 1 }}>
                      {producto.nombre} - ${producto.costo}
                    </div>
                    <input
                      type="number"
                      min={0}
                      value={cantidad.toString()}
                      onChange={(e) => actualizarCantidadProducto(producto, e.target.value)}
                      style={{ width: "60px", marginLeft: "10px" }}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Total */}
          <div className="mb-3">
            <label className="form-label text-dark fs-5">Total</label>
            <input
              type="text"
              className="form-control border-dark"
              name="total"
              readOnly
              value={venta.total}
            />
          </div>

          {/* Botones */}
          <div className='text-center'>
            <button type="submit" className="btn btn-primary me-3 fs-4">Agregar</button>
            <Link to='/lista/venta' className='btn btn-dark fs-4'>Regresar</Link>
          </div>
        </form>
      </div>
    </div>
  );
}