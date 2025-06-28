import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ setLogueado }) => {
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Usuario hardcodeado de prueba
    const usuarioValido = 'admin';
    const contrasenaValida = '1234';

    if (usuario === usuarioValido && contrasena === contrasenaValida) {
      localStorage.setItem('autenticado', 'true');
      setLogueado(true); // <-- actualiza la vista del menú
      navigate('/inicio');
      navigate('/inicio');
    } else {
      setError('Usuario o contraseña incorrectos');
    }
  };

  return (
    <div className='contenido-principal d-flex row justify-content-center'>
       <div className='text-center' style={{ marginBottom: "20px",marginTop:"30px" }}>
        <h3 className='text-dark fs-3'>Inicio de Sesión</h3>
      </div>

      <form onSubmit={handleLogin}  className='col-md-3 '>
        <div className="mb-3 text-center">
          <label htmlFor="usuario" className="form-label text-dark fs-5">Usuario:</label>
          <input
            type="text"
            className="form-control border-dark"
            id="usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            required
          />
        </div>

        <div className="mb-3 text-center">
          <label htmlFor="contrasena" className="form-label text-dark fs-5">Contraseña:</label>
          <input
            type="password"
            className="form-control border-dark"
            id="contrasena"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            required
          />
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <button type="submit" className='btn btn-dark fs-4 w-100'>Ingresar</button>
      </form>
    </div>
  );
};

export default Login;