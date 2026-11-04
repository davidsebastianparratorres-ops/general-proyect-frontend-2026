import React from "react";
import Navbar from "../components/Navbar/Navbar";
import { Sesion } from "../model";
import { Outlet } from "react-router-dom";
import { Footer } from "../components/footer/Fotter";

const PublicLayout = ({ usuario, iniciarSesion, cerrarSesion }: Sesion) => {
  return (
    <div className="sitio">
      <Navbar usuario={usuario} cerrarSesion={cerrarSesion} />
      <main id="contenido" className="contenido">
        <p>
          {usuario
            ? `sesion activa: ${usuario.nombre}`
            : "Visitante sin sesión"}
        </p>

        <Outlet
          context={{ usuario, iniciarSesion, cerrarSesion } satisfies Sesion}
        ></Outlet>
      </main>
      <Footer/>
    </div>
  );
};

export default PublicLayout;
