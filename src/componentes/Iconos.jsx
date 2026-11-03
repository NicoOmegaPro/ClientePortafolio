// Iconos de línea con las puntas cuadradas, a juego con el resto de la página

function Icono({ children }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" aria-hidden="true">
      {children}
    </svg>
  );
}

export function Flecha() {
  return (
    <Icono>
      <path d="M4 12h15M13 6l6 6-6 6" />
    </Icono>
  );
}

export function FlechaIzquierda() {
  return (
    <Icono>
      <path d="M20 12H5M11 6l-6 6 6 6" />
    </Icono>
  );
}

export function FlechaDiagonal() {
  return (
    <Icono>
      <path d="M7 17L17 7M8 7h9v9" />
    </Icono>
  );
}

export function Lupa() {
  return (
    <Icono>
      <path d="M10.5 17a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13zM15.5 15.5L21 21" />
    </Icono>
  );
}
