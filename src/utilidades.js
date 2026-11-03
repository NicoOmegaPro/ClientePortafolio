// Pequeñas funciones que usan varios componentes

// 1 -> "01"
export const dosCifras = (n) => String(n).padStart(2, "0");

// Para buscar sin que importen las tildes ni las mayúsculas: "Gestión" -> "gestion".
// NFD separa cada letra de su tilde y \p{Mn} quita esas marcas sueltas.
export const sinTildes = (texto) => texto.normalize("NFD").replace(/\p{Mn}/gu, "").toLowerCase();

// Preferencia del sistema de reducir animaciones. Al ser un MediaQueryList, .matches
// siempre da el valor actual aunque la persona lo cambie con la página abierta.
export const menosMovimiento = window.matchMedia("(prefers-reduced-motion: reduce)");

// Espera a que llegue la fuente de los titulares, como mucho un segundo y medio.
// Si Google Fonts falla o tarda, seguimos igual con la fuente de reserva.
export const fuenteLista = () =>
  Promise.race([
    document.fonts.load('800 1em "Archivo"').then(() => document.fonts.ready),
    new Promise((resolver) => setTimeout(resolver, 1500)),
  ]).catch(() => {});

// Lleva el foco a un elemento que normalmente no lo recibe (un título, por ejemplo)
// para que el teclado y los lectores de pantalla sigan a la navegación
export function enfocar(elemento) {
  if (!elemento) return;
  if (!elemento.hasAttribute("tabindex")) elemento.setAttribute("tabindex", "-1");
  elemento.focus({ preventScroll: true });
}

// Posiciones de scroll guardadas por entrada del historial. Van también a
// sessionStorage para que sobrevivan a una recarga de la página.
const CLAVE_SCROLL = "portafolio:scroll";

export function leerPosiciones() {
  try {
    return JSON.parse(sessionStorage.getItem(CLAVE_SCROLL)) || {};
  } catch {
    return {};
  }
}

export function guardarPosiciones(posiciones) {
  try {
    sessionStorage.setItem(CLAVE_SCROLL, JSON.stringify(posiciones));
  } catch {
    // Sin sessionStorage (modo privado estricto) seguimos solo con la memoria
  }
}
