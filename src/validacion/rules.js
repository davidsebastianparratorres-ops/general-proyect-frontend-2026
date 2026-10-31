import { z } from "zod";
export const correo = z
    .trim()
    .toLowerCase()
    .string()
    .pipe(z.email("Escribe un correo valido, por ejemplo nombre@dominio.com"))