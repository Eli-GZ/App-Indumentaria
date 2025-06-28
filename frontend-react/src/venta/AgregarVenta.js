import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import back from "../assets/cancelar-icon.png"
import save from "../assets/save-icon.png"

export default function AgregarVenta() {
  const navegar = useNavigate();


  const [clientesDisponibles, setClientesDisponibles] = useState([]);
  const [productosDisponibles, setProductosDisponibles] = useState([]);
  
  const obtenerFechaActual = () => {
    const hoy = new Date();
    const yyyy = hoy.getFullYear();
    const mm = String(hoy.getMonth() + 1).padStart(2, '0');
    const dd = String(hoy.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  const [venta, setVenta] = useState({
    fechaVenta: obtenerFechaActual(),
    unCliente: {},
    listaProductos: [],
    total: 0
  });

  // Cargar clientes disponibles al montar
  useEffect(() => {
    axios.get("http://localhost:8080/app-venta/clientes")
      .then(res => setClientesDisponibles(res.data))
      .catch(err => console.error("Error cargando clientes", err));
  }, []);

  // Cargar productos disponibles al montar
  useEffect(() => {
    axios.get("http://localhost:8080/app-venta/productos")
      .then(res => setProductosDisponibles(res.data))
      .catch(err => console.error("Error cargando productos", err));
  }, []);

  // Cambio cliente seleccionado
  const onClienteChange = (e) => {
    const clienteSeleccionado = clientesDisponibles.find(
      c => c.id_cliente === parseInt(e.target.value)
    );
    setVenta({ ...venta, unCliente: clienteSeleccionado || {} });
  };

  // Cambio input fecha u otros campos
  const onInputChange = (e) => {
    setVenta({ ...venta, [e.target.name]: e.target.value });
  };

  // Actualizar o agregar producto con cantidad
  const actualizarCantidadProducto = (producto, nuevaCantidad) => {
    const cantidad = parseInt(nuevaCantidad);
    const cantidadFinal = isNaN(cantidad) || cantidad < 0 ? 0 : cantidad;

    const listaActualizada = venta.listaProductos.map(p => {
      if (p.producto.codigo_producto === producto.codigo_producto) {
        return { ...p, cantidad: cantidadFinal };
      }
      return p;
    });

    const yaExiste = venta.listaProductos.some(
      p => p.producto.codigo_producto === producto.codigo_producto
    );
    if (!yaExiste && cantidadFinal > 0) {
      listaActualizada.push({ producto, cantidad: cantidadFinal });
    }

    // Filtrar productos con cantidad > 0
    const listaFiltrada = listaActualizada.filter(p => p.cantidad > 0);

    // Calcular total
    const totalNuevo = listaFiltrada.reduce((acc, item) => {
      const costo = Number(item.producto?.costo || 0);
      const cant = Number(item.cantidad || 0);
      return acc + costo * cant;
    }, 0);

    setVenta({
      ...venta,
      listaProductos: listaFiltrada,
      total: totalNuevo
    });
  };

  // Validar fecha yyyy-MM-dd
  const isFechaValida = (fecha) => /^\d{4}-\d{2}-\d{2}$/.test(fecha);

  // Enviar formulario POST para agregar
  const onSubmit = async (e) => {
    e.preventDefault();

    if (!isFechaValida(venta.fechaVenta)) {
      alert("Fecha inválida. Debe tener formato yyyy-MM-dd.");
      return;
    }

    if (!venta.unCliente?.id_cliente) {
      alert("Debe seleccionar un cliente.");
      return;
    }

    const listaProductosParaEnviar = venta.listaProductos
      .filter(p => p && p.producto && p.producto.codigo_producto != null && p.cantidad > 0)
      .map(p => ({
        codigo_producto: p.producto.codigo_producto,
        cantidad: p.cantidad
      }));

    if (listaProductosParaEnviar.length === 0) {
      alert("Debe seleccionar al menos un producto válido con cantidad mayor a 0.");
      return;
    }

    const ventaAEnviar = {
      fecha_venta: venta.fechaVenta,
      unCliente: { id_cliente: venta.unCliente.id_cliente },
      listaProductos: venta.listaProductos.map(p => ({
        codigo_producto: p.producto.codigo_producto,
        cantidad: p.cantidad
      })),
      total: venta.total
    };
    console.log("Venta final:", JSON.stringify(ventaAEnviar, null, 2));
    console.log("Venta a enviar:", ventaAEnviar);
    try {
      await axios.post("http://localhost:8080/app-venta/ventas", ventaAEnviar);
      navegar("/lista/venta");
    } catch (error) {
      alert("No se pudo crear la venta: " + (error.response?.data || error.message));
      console.error("Error:", error.response?.data || error.message);
    }
  };

  return (
    <div className='container contenido-principal'>
      <div className='text-center' style={{ marginBottom: "30px" }}>
        <h3 className='text-dark fs-3'>Agregar Nueva Venta</h3>
      </div>

      <div className="row justify-content-center">
        <form className='col-md-6' onSubmit={onSubmit}>

          {/* Cliente */}
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

          {/* Fecha */}
          <div className="mb-3">
            <label className="form-label text-dark fs-5">Fecha</label>
            <input
              type="date"
              className="form-control border-dark"
              name="fechaVenta"
              placeholder=''
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
                      value={cantidad === 0 ? "" : cantidad}
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
            <button type="submit" className="btn btn-light me-3 border-dark"><img src={save}alt=''></img></button>
            <Link to='/lista/venta' className='btn btn-light border-dark'><img src={back}alt=''></img></Link>
          </div>
        </form>
      </div>
    </div>
  );
}