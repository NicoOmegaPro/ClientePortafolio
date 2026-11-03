import { Link } from "react-router-dom";
import { Flecha } from "./Iconos.jsx";
import { dosCifras } from "../utilidades.js";

// Tarjeta grande para los proyectos principales. Toda la tarjeta es un enlace a la ficha.
export default function TarjetaDestacada({ proyecto, numero, invertida }) {
  const { portada } = proyecto;

  return (
    <article className={invertida ? "fila destacado destacado--invertido" : "fila destacado"}>
      <div className="destacado__media">
        <img src={portada.src} alt="" width={portada.ancho} height={portada.alto} loading="lazy" />
      </div>

      <div className="destacado__texto">
        <p className="mono destacado__meta suave">
          <span>P-{dosCifras(numero)}</span>
          <span>{proyecto.anio}</span>
        </p>
        <h4 className="destacado__titulo">
          <Link to={`/proyectos/${proyecto.slug}`}>
            {proyecto.titulo}
            <span className="cuadro" />
          </Link>
        </h4>
        <p className="destacado__lema">{proyecto.lema}</p>
        <ul className="incluye">
          {proyecto.funciones.slice(0, 4).map((f) => (
            <li key={f.titulo}>{f.titulo}</li>
          ))}
        </ul>
        <ul className="etiquetas">
          {proyecto.tecnologias.slice(0, 6).map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
        <p className="destacado__abrir" aria-hidden="true">
          Ver proyecto
          <Flecha />
        </p>
      </div>
    </article>
  );
}
