import { BrowserRouter, Route, Routes } from "react-router-dom";

import Navegacion from "./plantilla/Navegacion";
import Login from "./login/Login";
import RutaProtegida from "./login/RutaProtegida";
import { useState } from "react";
import AgregarProducto from "./producto/AgregarProducto";
import ListadoProductos from "./producto/ListadoProductos";
import EditarProducto from "./producto/EditarProducto";
import ListadoClientes from "./cliente/ListadoClientes";
import AgregarCliente from "./cliente/AgregarCliente";
import EditarCliente from "./cliente/EditarCliente";
import FaltaStock from "./producto/FaltaStock"
import ListadoVentas from "./venta/ListadoVentas";
import AgregarVenta from "./venta/AgregarVenta";

function App() {
  const [logueado, setLogueado] = useState(localStorage.getItem("autenticado") === "true");
  return (
    <div className="container">
      <BrowserRouter>
        <Navegacion logueado={logueado} setLogueado={setLogueado} />
        <Routes>
          <Route path="/" element={<Login setLogueado={setLogueado} />} />
          <Route
            path="/lista/producto"
            element={
              //<RutaProtegida>
              <ListadoProductos />
              //</RutaProtegida>
            }
          />
          <Route
            path="/agregar/producto"
            element={
              // <RutaProtegida>
              <AgregarProducto />
              // </RutaProtegida>
            }
          />
          <Route
            path="/lista/producto/falta_stock"
            element={
              //<RutaProtegida>
              <FaltaStock />
              //</RutaProtegida>
            }
          />
          <Route
            path="/editar/producto/:codigo_producto"
            element={
              //<RutaProtegida>
              <EditarProducto />
              //</RutaProtegida>
            }
          />
          <Route
            path="/lista/cliente"
            element={
              //<RutaProtegida>
              <ListadoClientes />
              //</RutaProtegida>
            }
          />
          <Route
            path="/agregar/cliente"
            element={
              //<RutaProtegida>
              <AgregarCliente />
              //</RutaProtegida>
            }
          />
          <Route
            path="/editar/cliente/:id_cliente"
            element={
              //<RutaProtegida>
              <EditarCliente />
              //</RutaProtegida>
            }
          />
          <Route
            path="/lista/venta"
            element={
              //<RutaProtegida>
              <ListadoVentas />
              //</RutaProtegida>
            }
          />
          <Route
            path="/agregar/venta"
            element={
              //<RutaProtegida>
              <AgregarVenta />
              //</RutaProtegida>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
