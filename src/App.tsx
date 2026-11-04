import "./App.css";
import { useState } from "react";
import type { Usuario } from "./model";
import "./styles/index.css";
import { Route, Routes } from "react-router-dom";
import PublicLayout from "./Layout/publicLayout";
import Inicio from "./pages/Inicio";
import { Ingresar } from "./pages/Ingresar";

const App = () => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  return (
    
    <Routes>
      <Route
       element={<PublicLayout
        usuario={usuario} 
        iniciarSesion={() => setUsuario({ nombre: "Jhon DDoe" })} 
        cerrarSesion={() => setUsuario(null)} 
        />
      }>
      </Route>
        <Route index element={<Inicio />} />
        <Route path="about" element={<Acerca />} />
        <Route path="sign-in" element={<Ingresar />} />
    </Routes>
    
  );
};

export default App;
