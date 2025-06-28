import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import back from "../assets/cancelar-icon.png"
import save from "../assets/save-icon.png"

export default function EditarProducto() {

  const urlBase = "http://localhost:8080/app-venta/productos";

  // let navegacion = useNavigate(); 

  const { codigo_producto } = useParams();

  const [producto, setProducto] = useState({
    nombre: "",
    talle: "",
    costo: "",
    cantidad_disponible: ""
  });

  const { nombre, talle, costo, cantidad_disponible } = producto

  const cargarProducto = useCallback(async () => {
    const resultado = await axios.get(`${urlBase}/${codigo_producto}`)
    setProducto(resultado.data)
  }, [codigo_producto, urlBase]);

  useEffect(() => {
    cargarProducto();
  }, [cargarProducto]);



  const onInputChange = (e) => {
    //spread operator ... (expandir los atributos)
    setProducto({ ...producto, [e.target.name]: e.target.value })
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`${urlBase}/${codigo_producto}`, producto);
    //Redirigimos a la pagina de inicio
    alert("El producto se modifico correctamente")
  }

  return (

    <div className='container contenido-principal'>
      <div className='containeer text-center' style={{ margin: "30px" }}>
        <h3>Editar Producto</h3>
      </div>
      <div className="row justify-content-center">
        <form className='col-md-6' onSubmit={(e) => onSubmit(e)}>
          <div className="mb-3">
            <label htmlFor="nombre" className="form-label">Nombre del producto</label>
            <input type="text" className="form-control border-dark" id="nombre" name="nombre"
              required={true} value={nombre} onChange={(e) => onInputChange(e)} />
          </div>
          <div className="mb-3">
            <label htmlFor="talle" className="form-label text-dark fs-5">Talles</label>
            <input type="text" className="form-control border-dark" id="talle" name="talle"
              required={true} value={talle} onChange={(e) => onInputChange(e)} />
          </div>
          <div className="mb-3">
            <label htmlFor="costo" className="form-label text-dark fs-5">Precio</label>
            <input type="number" step="any" className="form-control border-dark" id="costo" name="costo"
              required={true} value={costo} onChange={(e) => onInputChange(e)} />
          </div>
          <div className="mb-3">
            <label htmlFor="cantidad_disponible" className="form-label text-dark fs-5">Cantidad disponible</label>
            <input type="number" step="any" className="form-control border-dark" id="cantidad_disponible" name="cantidad_disponible"
              required={true} value={cantidad_disponible} onChange={(e) => onInputChange(e)} />
          </div>
          <div className='text-center'>
            <button type="submit" className="btn btn-light me-3 border-dark"><img src={save}alt=''></img></button>
            <Link to='/lista/producto' className='btn btn-light border-dark'><img src={back}alt=''></img></Link>
          </div>
        </form>
      </div>
    </div>
  )
}
