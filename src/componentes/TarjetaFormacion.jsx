import { Link } from "react-router-dom";
import { Flecha } from "./Iconos.jsx";
import { dosCifras } from "../utilidades.js";

// Tarjeta pequeña para los proyectos de formación
export default function TarjetaFormacion({ proyecto, numero }) {
  const { portada, slug } = proyecto;
  // Las capturas más altas que anchas se enseñan enteras en lugar de recortarlas
  const vertical = portada && portada.alto > portada.ancho;
  // Algunas portadas se leen mejor recortadas desde una esquina (foco en el JSON)
  const encuadre = portada?.foco ? { objectPosition: portada.foco, transformOrigin: portada.foco } : undefined;

  return (
    <article className="tarjeta">
      {/* El nombre del enlace es el título y la descripción va aparte, así no se lee todo seguido */}
      <Link to={`/proyectos/${slug}`} className="tarjeta__enlace" aria-labelledby={`titulo-${slug}`} aria-describedby={`lema-${slug}`}>
        <span className={vertical ? "tarjeta__imagen tarjeta__imagen--vertical" : "tarjeta__imagen"}>
          {portada && <img src={portada.src} alt="" width={portada.ancho} height={portada.alto} loading="lazy" style={encuadre} />}
        </span>
        <span className="mono tarjeta__meta suave">
          <span>F-{dosCifras(numero)}</span>
          <span>{proyecto.anio || proyecto.tipo}</span>
        </span>
        <h4 className="tarjeta__titulo" id={`titulo-${slug}`}>
          {proyecto.titulo}
        </h4>
        <span className="tarjeta__texto" id={`lema-${slug}`}>
          {proyecto.lema}
        </span>
        <span className="tarjeta__pie">
          <span className="mono">{proyecto.tecnologias.slice(0, 3).join(" · ")}</span>
          <Flecha />
        </span>
      </Link>
    </article>
  );
}
