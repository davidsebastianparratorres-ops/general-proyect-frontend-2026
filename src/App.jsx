import "./App.css";
import Campo from "./components/Campo";

import "./styles/index.css";

const App = () => {
  return (
    <>
      <main className="pagina">
        <header className="pagina-encabezado">
          <h1>Taquilla</h1>
          <p>crea tu cuenta o ingresa para comprar tus boletos</p>
        </header>
        <div className="pagina-formularios">
          <Campo
            etiqueta="Correo"
            type="email"
            ayuda="ingresa tu correo institucional"
          />
        </div>
      </main>
    </>
  );
};

export default App;
