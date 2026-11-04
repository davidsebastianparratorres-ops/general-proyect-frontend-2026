import { NavLink } from "react-router-dom";
import type { Sesion } from "../../model";

const Navbar = ({
  usuario,
  cerrarSesion,
}: Pick<Sesion, "usuario" | "cerrarSesion">) => {
  return (
    <header className="cabecera">
      <nav aria-label="Navegación principal">
        <strong>Taquilla</strong>
        <NavLink to="/">Inicio</NavLink>
        <NavLink to="/acercade">Acerca de</NavLink>
        {usuario ? (
          <>
           <span>Hola, {usuario.nombre}</span>
           
            <button type="button" onClick={cerrarSesion}>
             Cerrar sesión
            </button>
        
          </>
        ) : (
          <NavLink to="/login">Iniciar sesión</NavLink>
        )}
       



      </nav>
    </header>
  );
};

export default Navbar;
