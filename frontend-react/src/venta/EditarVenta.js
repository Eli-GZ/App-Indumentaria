import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import back from "../assets/cancelar-icon.png"
import save from "../assets/save-icon.png"

export default function EditarVenta() {
  const navegar = useNavigate();
  const { codigo_venta } = useParams();

  // Estado que contiene los datos de la venta actual
  const [venta, setVenta] = useState({
    fechaVenta: "",
    unCliente: {},
    listaProductos: [],
    total: 0
  });

  // Estado que contiene la lista de clientes disponibles
  const [clientesDisponibles, setClientesDisponibles] = useState([]);

  // Estado que contiene la lista de productos disponibles
  const [productosDisponibles, setProductosDisponibles] = useState([]);

  // Efecto que se ejecuta cuando se carga la venta para mostrarla en consola
  useEffect(() => {
    if (venta.listaProductos) {
      console.log("Venta cargada:", venta);
      console.log("Lista productos:", venta.listaProductos);
    }
  }, [venta]);

  // Efecto que obtiene los datos de la venta a editar al montar el componente
  useEffect(() => {
    axios.get(`http://localhost:8080/app-venta/ventas/${codigo_venta}`)
      .then(response => {
        const ventaOriginal = response.data;
        const listaProductosAgrupada = agruparProductos(ventaOriginal.listaProductos);

        const fechaISO = ventaOriginal.fecha_venta;
        const fechaFormateada = fechaISO ? fechaISO.split('T')[0] : "";

        setVenta({
          fechaVenta: fechaFormateada,
          unCliente: ventaOriginal.unCliente,
          listaProductos: listaProductosAgrupada.map(p => ({
            producto: { ...p.producto },
            cantidad: p.cantidad || 1
          })),
          total: ventaOriginal.total || 0
        });
      })
      .catch(error => console.error("Error al obtener venta:", error));
  }, [codigo_venta]);

  // Agrupa productos repetidos por codigo_producto y suma sus cantidades
  const agruparProductos = (productos) => {
    const mapa = new Map();
    productos.forEach(producto => {
      const key = producto.codigo_producto;
      if (!mapa.has(key)) {
        mapa.set(key, { producto, cantidad: producto.cantidad || 1 });
      } else {
        mapa.get(key).cantidad += producto.cantidad || 1;
      }
    });
    return Array.from(mapa.values());
  };

  // Efecto que carga todos los clientes disponibles desde el back
  useEffect(() => {
    axios.get("http://localhost:8080/app-venta/clientes")
      .then(res => setClientesDisponibles(res.data))
      .catch(err => console.error("Error cargando clientes", err));
  }, []);

  // Efecto que carga todos los productos disponibles desde el back
  useEffect(() => {
    axios.get("http://localhost:8080/app-venta/productos")
      .then(res => setProductosDisponibles(res.data))
      .catch(err => console.error("Error cargando productos", err));
  }, []);

  // Maneja el cambio del cliente seleccionado
  const onClienteChange = (e) => {
    const clienteSeleccionado = clientesDisponibles.find(
      c => c.id_cliente === parseInt(e.target.value)
    );
    setVenta({ ...venta, unCliente: clienteSeleccionado || {} });
  };

  // Maneja el cambio en el input de fecha
  const onInputChange = (e) => {
    setVenta({ ...venta, [e.target.name]: e.target.value });
  };

  // Actualiza la cantidad de un producto en la venta o lo agrega si no está
  const actualizarCantidadProducto = (producto, nuevaCantidad) => {
    const cantidad = parseInt(nuevaCantidad);
    const cantidadFinal = isNaN(cantidad) || cantidad < 0 ? 0 : cantidad;

    const nuevaLista = venta.listaProductos.map(p => {
      if (p.producto.codigo_producto === producto.codigo_producto) {
        return { ...p, cantidad: cantidadFinal };
      }
      return p;
    });

    const yaExiste = venta.listaProductos.some(
      p => p.producto.codigo_producto === producto.codigo_producto
    );
    if (!yaExiste && cantidadFinal > 0) {
      nuevaLista.push({ producto, cantidad: cantidadFinal });
    }

    const totalNuevo = nuevaLista.reduce((acc, item) => {
      const costo = Number(item.producto?.costo || 0);
      const cant = Number(item.cantidad || 0);
      return acc + costo * cant;
    }, 0);

    setVenta({
      ...venta,
      listaProductos: nuevaLista.filter(p => p.cantidad > 0),
      total: totalNuevo
    });
  };

  // Valida el formato de la fecha (yyyy-MM-dd)
  const isFechaValida = (fecha) => /^\d{4}-\d{2}-\d{2}$/.test(fecha);

  // Envía la venta actualizada al backend
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isFechaValida(venta.fechaVenta)) {
      alert("Fecha inválida. Debe tener formato yyyy-MM-dd.");
      return;
    }

    const ventaAEnviar = {
      fecha_venta: venta.fechaVenta,
      id_cliente: venta.unCliente.id_cliente, 
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

  // Render del formulario para editar la venta
  return (
    <div className='container contenido-principal'>
      <div className='text-center' style={{ marginBottom: "30px" }}>
        <h3 className='text-dark fs-3'>Editar Venta</h3>
      </div>

      <div className="row justify-content-center">
        <form className='col-md-6' onSubmit={onSubmit}>

          {/* Campo para seleccionar el cliente */}
          <div className="mb-3 ">
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

          {/* Campo para seleccionar la fecha de venta */}
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

          {/* Selector de productos con sus cantidades */}
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

          {/* Campo que muestra el total de la venta */}
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

          {/* Botones para actualizar o cancelar la edición */}
          <div className='text-center'>
            <button type="submit" className="btn btn-light me-3 border-dark"><img src={save}alt=''></img></button>
            <Link to='/lista/venta' className='btn btn-light border-dark'><img src={back}alt=''></img></Link>
          </div>

        </form>
      </div>
    </div>
  );
}