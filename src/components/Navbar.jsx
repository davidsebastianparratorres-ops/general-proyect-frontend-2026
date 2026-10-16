import { useEffect, useRef, useState } from "react";
import "./Navbar.css";
import Icono from "./Icono";
const DESTINOS = {
  inicio: "#inicio",
  heroes: "#heroes",
  marvel: "#marvel",
  dc: "#dc",
  equipos: "#equipos",
};

const Navbar = ({ textos, cargando, cambiarIdioma, activo, error, idioma, onBuscar, textoGrande, alternarTexto }) => {
  const [abierto, setAbierto] = useState(false); //Saber si el toogle de mobile esta abierto
  const [busqueda, setBusqueda] = useState(""); //sin valor a buscar
  const botonMenu = useRef(null);
  const campoBusqueda = useRef(null);
  const nav = textos?.navbar;
  const ingles = idioma === "en"; //Toma el valor de la variable idioma solo si es ingles

  const abrir =
    textos?.menuMovil.abrir ?? (ingles ? "Open menu" : "Abrir menu");
  const cerrar =
    textos?.menuMovil.cerrar ?? (ingles ? "Close menu" : "Cerrar menu");
  const enlaces = Object.entries(nav?.enlaces ?? {}).filter(
    ([clave]) => DESTINOS[clave],
  );
  //convierte objeto en un arreglo de pares

  useEffect(() => {
    function cerrarConEscape(evento) {
      if (!abierto) return;
      if (evento.key === "Escape" && abierto) {
        setAbierto(false);
        botonMenu.current?.focus();
      }
    }
    document.addEventListener("keydown", cerrarConEscape); //Escucha las teclas en todo el documento
    return () => document.removeEventListener("keydown", cerrarConEscape);
  }, [abierto]);

  function abrirBusqueda(evento) {
    setAbierto(true);
    requestAnimationFrame(() => campoBusqueda.current?.focus());
  }

  function buscar(evento) {
    evento.preventDefault(); // cancelar la accion que el navegador haria por defecto antes ese evento
    const consulta = busqueda.trim();
    if (!consulta) return;
    onBuscar(consulta);
    setAbierto(false);
  }

  return (
    <header className="navbar">
      <nav
        className="navbar-interior"
        aria-label={nav?.aria.menu ?? "Navegación Principal"}
      >
        <a
          href="#inicio"
          className="navbar-marca"
          aria-label={nav?.logo.aria ?? "Inicio"}
          onClick={() => setAbierto(false)}
        >
          <span className="navbar-simbolo" aria-hidden="true">
            R
          </span>
          <span>{nav?.logo.texto ?? "Heroes"} </span>
        </a>

        <div className="navbar-movil-acciones">
          <button
            type="button"
            className="navbar-icono"
            aria-label={nav?.buscador.aria ?? "Buscar"}
            onClick={abrirBusqueda}
          >
            <Icono nombre="buscar" />
          </button>

          {nav && (
            <a
              className="navbar-icono"
              href="#favoritos"
              aria-label={nav.botones.favoritos}
              onClick={() => setAbierto(false)}
            >
              <Icono nombre="favoritos" />
            </a>
          )}
          <button
            type="button"
            ref={botonMenu}
            className="navbar-icono"
            aria-label={abierto ? cerrar : abrir}
            aria-expanded={abierto}
            aria-controls="navar-panel"
            onClick={() => setAbierto((valor) => !valor)}
          >
            <Icono nombre={abierto ? "cerrar" : "menu"} />
          </button>
        </div>
        <div id="navbar-panel" className={`navbar-panel${abierto ? " is-abierto" : ""}`} aria-busy={cargando}>
          {cargando && <p className="navbar-estado" role="status">{ingles ? "Loading navigation…" : "Cargando navegación…"}</p>}
          {error && <div className="navbar-estado" role="alert"><p>{ingles ? "Navigation could not be loaded." : "No pudimos cargar el menú."}</p><button type="button" onClick={recargar}>{ingles ? "Try again" : "Reintentar"}</button></div>}
          {nav && <>
            <ul className="navbar-enlaces">
              {enlaces.map(([clave, etiqueta]) => <li key={clave}><a href={DESTINOS[clave]} aria-current={activo === clave ? "page" : undefined} onClick={() => setAbierto(false)}>{etiqueta}</a></li>)}
            </ul>
            <form className="navbar-buscador" role="search" aria-label={nav.buscador.aria} onSubmit={buscar}>
              <button type="submit" aria-label={nav.buscador.boton}><Icono nombre="buscar" /></button>
              <input ref={campoBusqueda} type="search" value={busqueda} onChange={(evento) => setBusqueda(evento.target.value)} placeholder={nav.buscador.placeholder} aria-label={nav.buscador.aria} required />
            </form>
          </>}
          <div className="navbar-utilidades">
            <label className="navbar-idioma"><Icono nombre="idioma" /><select value={idioma} onChange={(evento) => cambiarIdioma(evento.target.value)} aria-label={nav?.aria.idioma ?? "Cambiar idioma"}><option value="es">ES</option><option value="en">EN</option></select></label>
            <button className="navbar-icono navbar-accesibilidad" type="button" aria-label={ingles ? "Enlarge text" : "Aumentar texto"} aria-pressed={textoGrande} onClick={alternarTexto}><Icono nombre="accesibilidad" /></button>
            {nav && <a className="navbar-accion" href="#favoritos" onClick={() => setAbierto(false)}>{nav.botones.favoritos}</a>}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
