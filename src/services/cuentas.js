const CLAVE_ALMACEN = "taquilla-cuentas";
const DEMORA_MS = 800;

const CUENTAS_INICIALES = [
  { nombre: "Laura", correo: "laura@taquilla.test", clave: "taquilla123" },
  {
    nombre: "Usuario nuevo",
    correo: "nuevo@taquilla.test",
    clave: "taquilla123",
  },
];

export class ErrorCuenta extends Error {
  constructor(codigo, mensaje) {
    super(mensaje);
    this.codigo = codigo;
  }
}

function leerCuentas() {
  try {
    const guardadas = JSON.parse(localStorage.getItem(CLAVE_ALMACEN));
    return Array.isArray(guardadas) ? guardadas : CUENTAS_INICIALES;
  } catch {
    return CUENTAS_INICIALES;
  }
}

let cuentas = leerCuentas();

function guardarCuentas() {
  try {
    localStorage.setItem(CLAVE_ALMACEN, JSON.stringify(cuentas));
  } catch {
    // Sin localStorage (modo privado) las cuentas nuevas duran hasta recargar.
  }
}

function esperar(milisegundos) {
  return new Promise((resolver) => setTimeout(resolver, milisegundos));
}

export async function registrarCuenta({ nombre, correo, clave }) {
  await esperar(DEMORA_MS);
  if (cuentas.some((cuenta) => cuenta.correo === correo)) {
    throw new ErrorCuenta(
      "correo_en_uso",
      "Ya existe una cuenta con ese correo.",
    );
  }
  cuentas = [...cuentas, { nombre, correo, clave }];
  guardarCuentas();
  return { nombre, correo };
}

export async function ingresar({ correo, clave }) {
  await esperar(DEMORA_MS);
  const cuenta = cuentas.find(
    (item) => item.correo === correo && item.clave === clave,
  );
  if (!cuenta) {
    throw new ErrorCuenta(
      "credenciales_invalidas",
      "Correo o contraseña incorrectos.",
    );
  }
  return { nombre: cuenta.nombre, correo: cuenta.correo };
}