import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function EditarVenta() {
  const navegar = useNavigate();
  const { codigo_venta } = useParams();

  const [venta, setVenta] = useState({
    fechaVenta: "",
    unCliente: {},
    listaProductos: [],
    total: 0
  });

  const [clientesDisponibles, setClientesDisponibles] = useState([]);
  const [productosDisponibles, setProductosDisponibles] = useState([]);

  // Cargar venta existente
  useEffect(() => {
    const cargarVentaExistente = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/app-venta/ventas/${codigo_venta}`);
        console.log("Venta cargada:", res.data);

        if (res.data) {
          setVenta({
            fechaVenta: res.data.fechaVenta || "", // <- OJO: con V mayúscula
            unCliente: res.data.unCliente || {},
            listaProductos: res.data.listaProductos.map(p => ({
              producto: p,  // sin "producto" anidado, ya está plano
              cantidad: 1   // si no tenés la cantidad guardada, asumimos 1
            })),
            total: res.data.total || 0
          });
        }
      } catch (error) {
        console.error("Error al cargar la venta:", error);
      }
    };
    cargarVentaExistente();
  }, [codigo_venta]);
  // Cargar clientes
  useEffect(() => {
    axios.get("http://localhost:8080/app-venta/clientes")
      .then(res => setClientesDisponibles(res.data))
      .catch(err => console.error("Error cargando clientes", err));
  }, []);

  // Cargar productos
  useEffect(() => {
    axios.get("http://localhost:8080/app-venta/productos")
      .then(res => setProductosDisponibles(res.data))
      .catch(err => console.error("Error cargando productos", err));
  }, []);

  const onClienteChange = (e) => {
    const clienteSeleccionado = clientesDisponibles.find(
      c => c.id_cliente === parseInt(e.target.value)
    );
    setVenta({ ...venta, unCliente: clienteSeleccionado || {} });
  };

  const onInputChange = (e) => {
    setVenta({ ...venta, [e.target.name]: e.target.value });
  };

  const actualizarCantidadProducto = (producto, cantidadStr) => {
    let cantidad = parseInt(cantidadStr);
    if (isNaN(cantidad) || cantidad < 0) cantidad = 0;

    let nuevaLista;
    const index = venta.listaProductos.findIndex(
      p => p.producto?.codigo_producto === producto.codigo_producto
    );

    if (cantidad === 0) {
      nuevaLista = venta.listaProductos.filter(
        p => p.producto?.codigo_producto !== producto.codigo_producto
      );
    } else if (index !== -1) {
      nuevaLista = [...venta.listaProductos];
      nuevaLista[index].cantidad = cantidad;
    } else {
      nuevaLista = [...venta.listaProductos, { producto, cantidad }];
    }

    setVenta({ ...venta, listaProductos: nuevaLista });
  };

  useEffect(() => {
    const totalCalculado = venta.listaProductos.reduce((acc, item) => {
      const cant = Number(item.cantidad);
      const costo = Number(item.producto?.costo);
      return acc + (isNaN(cant) || isNaN(costo) ? 0 : cant * costo);
    }, 0);
    setVenta(prev => ({ ...prev, total: totalCalculado }));
  }, [venta.listaProductos]);

  const isFechaValida = (fecha) => /^\d{4}-\d{2}-\d{2}$/.test(fecha);

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
        codigo_producto: p.producto?.codigo_producto,
        cantidad: p.cantidad
      })),
      total: venta.total
    };

    try {
      await axios.put(`http://localhost:8080/app-venta/ventas/${codigo_venta}`, ventaAEnviar);
      navegar("/lista/venta");
    } catch (error) {
      alert("No se pudo actualizar la venta " + error.response?.data);
      console.error("Error:", error.response?.data || error.message);
    }
  };

  return (
    <div className='container'>
      <div className='text-center' style={{ margin: "40px" }}>
        <h3 className='text-dark'>Editar Venta</h3>
      </div>

      <div className="row justify-content-center">
        <form className='col-md-6' onSubmit={onSubmit}>
          {/* Select cliente */}
          <div className="mb-3">
            <label className="form-label text-dark fs-5">Cliente</label>
            <select
              className="form-select border-dark"
              required
              value={venta.unCliente?.id_cliente || ""}
              onChange={onClienteChange}
            >
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
              value={venta.fechaVenta || ""}
              onChange={onInputChange}
            />
          </div>

          {/* Productos */}
          <div className="mb-3">
            <label className="form-label text-dark fs-5">Seleccionar Productos</label>
            <div className="border p-3 rounded" style={{ maxHeight: "200px", overflowY: "scroll" }}>
              {productosDisponibles.map(producto => {
                const productoEnVenta = venta.listaProductos.find(
                  p => p.codigo_producto === producto.codigo_producto
                );
                const cantidad = productoEnVenta ? 1 : 0; // Suponemos 1 si está en la venta

                return (
                  <div key={producto.codigo_producto} className="d-flex align-items-center mb-2">
                    <div style={{ flexGrow: 1 }}>
                      {producto.nombre} - ${producto.costo}
                    </div>
                    <input
                      type="number"
                      min={0}
                      value={cantidad}
                      onChange={(e) =>
                        actualizarCantidadProducto(producto, parseInt(e.target.value, 10) || 0)
                      }
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
            <button type="submit" className="btn btn-primary me-3 fs-4">Actualizar</button>
            <Link to='/lista/venta' className='btn btn-dark fs-4'>Cancelar</Link>
          </div>
        </form>
      </div>
    </div>
  );
}