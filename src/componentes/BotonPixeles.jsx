import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Flecha } from "./Iconos.jsx";

// Lado de cada cuadrado del barrido, en píxeles
const LADO = 8;

// El botón principal de la web. Al pasar el ratón se parte en cuadrados de 8 px
// que se rellenan de tinta de izquierda a derecha, y al pulsarlo se hunde como
// una tecla. Sirve como enlace interno (to) o externo (href).
export default function BotonPixeles({ to, href, icono = <Flecha />, children, ...resto }) {
  const boton = useRef(null);
  const [malla, setMalla] = useState({ columnas: 0, filas: 0 });

  // El número de cuadrados depende del tamaño real del botón. Leemos el elemento
  // del propio aviso y no del ref, que ya vale null si el botón acaba de desmontarse.
  useEffect(() => {
    const observador = new ResizeObserver(([entrada]) => {
      const { offsetWidth, offsetHeight } = entrada.target;
      setMalla({ columnas: Math.ceil(offsetWidth / LADO), filas: Math.ceil(offsetHeight / LADO) });
    });
    observador.observe(boton.current);
    return () => observador.disconnect();
  }, []);

  // Cada cuadrado entra con un retraso según su columna, más un poco de variación
  // para que el borde del barrido salga dentado y no como una línea recta
  const cuadrados = useMemo(() => {
    const lista = [];
    for (let f = 0; f < malla.filas; f++) {
      for (let c = 0; c < malla.columnas; c++) {
        const variacion = ((c * 73 + f * 151) % 97) / 97;
        lista.push({
          entrada: Math.round((c / malla.columnas) * 220 + variacion * 90),
          salida: Math.round(((malla.columnas - c) / malla.columnas) * 160 + variacion * 60),
        });
      }
    }
    return lista;
  }, [malla]);

  const contenido = (
    <>
      <span
        className="boton__pixeles"
        aria-hidden="true"
        style={{ gridTemplateColumns: `repeat(${malla.columnas}, 1fr)`, gridTemplateRows: `repeat(${malla.filas}, 1fr)` }}
      >
        {cuadrados.map((c, i) => (
          <i key={i} style={{ "--entrada": `${c.entrada}ms`, "--salida": `${c.salida}ms` }} />
        ))}
      </span>
      <span className="boton__texto">{children}</span>
      {icono}
    </>
  );

  if (to) {
    return (
      <Link ref={boton} to={to} className="boton" {...resto}>
        {contenido}
      </Link>
    );
  }
  return (
    <a ref={boton} href={href} className="boton" {...resto}>
      {contenido}
    </a>
  );
}
