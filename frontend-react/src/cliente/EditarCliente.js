import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";


export default function EditarCliente() {

  const urlBase = "http://localhost:8080/app-venta/clientes";

  // let navegacion = useNavigate(); 

  const { id_cliente } = useParams();

  const [cliente, setCliente] = useState({
    nombre: "",
    apellido: "",
    dni: ""    
  });

  const { nombre, apellido, dni} = cliente

  const cargarCliente = useCallback(async () => {
    const resultado = await axios.get(`${urlBase}/${id_cliente}`)
    setCliente(resultado.data)
  }, [id_cliente, urlBase]);

  useEffect(() => {
    cargarCliente();
  }, [cargarCliente]);



  const onInputChange = (e) => {
    //spread operator ... (expandir los atributos)
    setCliente({ ...cliente, [e.target.name]: e.target.value })
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`${urlBase}/${id_cliente}`, cliente);
    //Redirigimos a la pagina de inicio
    alert("El producto se modifico correctamente")
  }

  return (

    <div className='container contenido-principal'>
      <div className='containeer text-center' style={{ margin: "30px" }}>
        <h3>Editar Empleado</h3>
      </div>
      <div className="row justify-content-center">
        <form className='col-md-6' onSubmit={(e) => onSubmit(e)}>
          <div className="mb-3">
            <label htmlFor="nombre" className="form-label">Nombre</label>
            <input type="text" className="form-control border-dark" id="nombre" name="nombre"
              required={true} value={nombre} onChange={(e) => onInputChange(e)} />
          </div>
          <div className="mb-3">
            <label htmlFor="apellido" className="form-label text-dark fs-5">Apellido</label>
            <input type="text" className="form-control border-dark" id="apellido" name="apellido"
              required={true} value={apellido} onChange={(e) => onInputChange(e)} />
          </div>
           <div className="mb-3">
            <label htmlFor="dni" className="form-label text-dark fs-5">D.N.I</label>
            <input type="text" className="form-control border-dark" id="dni" name="dni"
              required={true} value={dni} onChange={(e) => onInputChange(e)} />
          </div>
        
        
          <div className='text-center'>
            <button type="submit" className="btn btn-primary me-3">Guardar</button>
            <Link to='/lista/cliente' className='btn btn-dark'>Regresar</Link>
          </div>
        </form>
      </div>
    </div>
  )
}
