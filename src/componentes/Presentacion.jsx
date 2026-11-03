import { useEffect, useRef } from "react";
import Rejilla from "./Rejilla.jsx";
import BotonPixeles from "./BotonPixeles.jsx";
import { CampoCeldas } from "../efectos/campoCeldas.js";
import { correo, resumen } from "../datos/perfil.js";

// Primera pantalla: nombre, foto, tres datos rápidos y el botón a los proyectos
export default function Presentacion() {
  const zona = useRef(null);
  const lienzos = useRef(null);

  useEffect(() => {
    const columna = zona.current.querySelector(".rejilla span");
    const campo = new CampoCeldas(zona.current, lienzos.current, columna, {
      color: "#f03c0a",
      colorTrama: "rgba(20, 20, 18, 0.16)",
      vida: 1300,
    });
    return () => campo.destruir();
  }, []);

  return (
    <section className="presentacion" id="inicio" aria-label="Presentación">
      <div className="presentacion__escenario" ref={zona}>
        <Rejilla />
        <div className="campo" ref={lienzos} aria-hidden="true">
          <canvas className="campo__trama" />
          <canvas className="campo__estela" />
        </div>

        <div className="fila presentacion__contenido">
          <p className="mono presentacion__etiqueta">Portafolio · 2026</p>
          <p className="mono presentacion__lugar">Palma de Mallorca</p>
          <h1 className="presentacion__nombre">
            <span>Nicolau</span>
            <span>Negre</span>
            <span>
              Rodríguez<span className="cuadro" />
            </span>
          </h1>
          <figure className="presentacion__foto">
            <picture>
              <source srcSet="/imagenes/nicolau.webp" type="image/webp" />
              <img src="/imagenes/nicolau.jpg" alt="Retrato de Nicolau Negre" width="410" height="615" fetchPriority="high" />
            </picture>
            <figcaption className="mono">
              <span>Nicolau Negre</span>
              <span>Desarrollador</span>
            </figcaption>
          </figure>
        </div>
      </div>

      <div className="presentacion__barra">
        <Rejilla />
        <div className="fila">
          {resumen.map((dato) => (
            <div className="celda" key={dato.titulo}>
              <p className="mono suave">{dato.titulo}</p>
              <p className="dato-grande">{dato.valor}</p>
              <p className="dato-texto">{dato.texto}</p>
            </div>
          ))}
          <div className="celda presentacion__acciones">
            <BotonPixeles to="/#proyectos">Ver proyectos</BotonPixeles>
            <a className="enlace" href={`mailto:${correo}`}>
              Escríbeme
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
