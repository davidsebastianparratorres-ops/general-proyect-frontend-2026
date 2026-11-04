import React from 'react'
import { Sesion } from '../model';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';

export const Ingresar = () => {
    const { usuario, iniciarSesion } = useOutletContext<Sesion>();

    const navegar = useNavigate();

    function ingresar() {
        iniciarSesion();
        navegar("/")
    }

  return (
    <section>
      <h1>Iniciar Sesión</h1>
      <p>demostracion</p>
      {usuario ? <Link to="/">Volver al inicio</Link> : <button type="button" onClick={ingresar}>Iniciar sesión</button>}
    </section>
  );
}