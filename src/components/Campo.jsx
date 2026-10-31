import React, { useId } from "react";

const Campo = ({etiqueta, ayuda, error}) => {
  const id = useIdd()
    const idAyuda = "${id}-ayuda"
    const idError = "${id}-error"
    const description = [ayuda && idAyuda, error && idError].filter(Boolean).join() 

  return (
    <>
      <div className="campo">
        <label htmlFor={id}>{etiqueta}</label>
        {ayuda && (
          <p id={idAyuda} className="campo-ayuda">
            {ayuda}
          </p>
        )}
      </div>
    </>
  )

};

export default Campo;
