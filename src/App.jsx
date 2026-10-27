import { useTextos } from "./hooks/useTextos.js";
import "./App.css";
import Navbar from "./components/Navbar";
import { useEffect, useState } from "react";
import PreferenciasCookies from "./components/PreferenciasCookies.jsx";

function leerSeccion() {
  return window.location.hash.slice(1) || "inicio";
}

function App() {
  // Idioma por defecto español
  const [idioma, setIdioma] = useState("es");
  const [activo, setActivo] = useState(leerSeccion);
  const [consulta, setConsulta] = useState("");
  const [textoGrande, setTextoGrande] = useState(false);
  const datos = useTextos(idioma);
  console.log(datos);

  const ingles = idioma === "en";
  const titulo =
    activo === "favoritos"
      ? datos.textos?.navbar.botones.favoritos
      : datos.textos?.navbar.enlaces[activo];

  //Va a sincronizar el estado del componente con el hash de la URL
  useEffect(() => {
    function actualizar() {
      setActivo(leerSeccion());
      setConsulta("");
    }
    window.addEventListener("hashchange", actualizar);
    return () => window.removeEventListener("hashchange", actualizar);
  }, []);

  useEffect(() => {
    document.documentElement.lang;
  }, [idioma]);

  useEffect(() => {
    document.documentElement.style.fontSize = textoGrande ? "112%" : "";
    return () => {
      document.documentElement.style.fontSize = "";
    };
  }, [textoGrande]);

  function buscar(valor) {
    setConsulta(valor);
    setActivo("heroes");
    //window.history es el que da acceso al historial de la pestaña
    window.history.replaceState(null, "", "#heroes");
  }

  return (
    <div className="sitio">
      <Navbar
        {...datos}
        idioma={idioma}
        cambiarIdioma={setIdioma}
        activo={activo}
        onBuscar={buscar}
        texto={textoGrande}
        alternarTexto={() => setTextoGrande((valor) => !valor)}
      />
      <main className="contenedor demo-contenido">
        <p>{ingles ? "English content" : "Contenido en español"}</p>
        <h1>{titulo ?? (ingles ? "Navigation" : "Navegación")}</h1>
        <p role="status">
          {consulta
            ? `${ingles ? "Search submitted" : "Busqueda enviada"}: ${consulta}`
            : ingles
              ? "Select a link"
              : "Selecciona una enlace"}
        </p>
        <p>
          {ingles
            ? "This example loads navigation labels from the API"
            : "Este ejemplo carga los textos del menu desde la API"}
        </p>
      </main>
      <footer className="pie-pagina">
        <div className="contenedor">
          <PreferenciasCookies />
        </div>
      </footer>
    </div>
  );
}

export default App;
