import "./App.css";
import { useState } from "react";
import type { Usuario } from "./model";
import "./styles/index.css";
import { Route, Routes } from "react-router-dom";
import Inicio from "./pages/Inicio";
import PublicLayout from "./layout/PublicLayout"
import { Ingresar } from "./pages/Ingresar";
import Acerca from "./pages/Acerca";

const App = () => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  return (
    
    <Routes>
      <Route
        element={
          <PublicLayout
            usuario={usuario}
            iniciarSesion={() => setUsuario({ nombre: "Jhon Doe" })}
            cerrarSesion={() => setUsuario(null)}
          />
        }
      >
        <Route index element={<Inicio />} />
        <Route path="about" element={<Acerca />} />
        <Route path="sign-in" element={<Ingresar />} />
      </Route>
    </Routes>
    
  );
};

export default App;
