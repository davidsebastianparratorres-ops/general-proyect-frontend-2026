import React, { useId } from "react";
import "./Campo.css"

const Campo = ({ etiqueta, ayuda, error, ...atributos }) => {
  const id = useId();
  const idAyuda = "${id}-ayuda";
  const idError = "${id}-error";
  const description = [ayuda && idAyuda, error && idError]
    .filter(Boolean)
    .join();

  return (
    <>
      <div className="campo">
        <label htmlFor={id}>{etiqueta}</label>
        {ayuda && (
          <p id={idAyuda} className="campo-ayuda">
            {ayuda}
          </p>
        )}
        <input
          id={id}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={description || undefined}
          {...atributos}
        />
        {error && (
          <p id={idError} className="campo-error">
            {error}
          </p>
        )}
      </div>
    </>
  );
};

export default Campo;
