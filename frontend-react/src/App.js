import { BrowserRouter, Route, Routes } from "react-router-dom";

import Navegacion from "./plantilla/Navegacion";
import Login from "./login/Login";
import RutaProtegida from "./login/RutaProtegida";
import { useState } from "react";
import AgregarProducto from "./producto/AgregarProducto";
import ListadoProductos from "./producto/ListadoProductos";
import EditarProducto from "./producto/EditarProducto";

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
            path="/editar/producto/:codigo_producto"
            element={
              //<RutaProtegida>
              <EditarProducto />
              //</RutaProtegida>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
