import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import Rejilla from "./Rejilla.jsx";
import { FlechaDiagonal } from "./Iconos.jsx";
import { correo, enlaces, nombreCompleto, usuarioGithub } from "../datos/perfil.js";
import { menosMovimiento } from "../utilidades.js";

// Bloque final de todas las páginas: correo, redes y pie
export default function Contacto() {
  const { pathname } = useLocation();
  const [copiado, setCopiado] = useState(false);
  const temporizador = useRef(0);
  const anio = new Date().getFullYear();
  const [usuario, dominio] = correo.split("@");

  useEffect(() => () => clearTimeout(temporizador.current), []);

  const copiarCorreo = async () => {
    try {
      await navigator.clipboard.writeText(correo);
      setCopiado(true);
      clearTimeout(temporizador.current);
      temporizador.current = setTimeout(() => setCopiado(false), 2000);
    } catch {
      // Si el navegador no deja copiar, abrimos el correo directamente
      window.location.href = `mailto:${correo}`;
    }
  };

  const volverArriba = () => {
    window.scrollTo({ top: 0, behavior: menosMovimiento.matches ? "instant" : "smooth" });
    document.querySelector(".marca")?.focus({ preventScroll: true });
  };

  return (
    <footer className="contacto" id="contacto">
      <Rejilla />
      <div className="fila sec-cabecera">
        {/* El número solo tiene sentido en la portada, donde van las secciones 01 a 03 */}
        {pathname === "/" && <p className="mono sec-cabecera__num">04</p>}
        <p className="mono sec-cabecera__nota">Contacto</p>
      </div>

      <div className="fila">
        <h2 className="contacto__grande">¿Hablamos?</h2>
      </div>

      <div className="fila contacto__cuerpo">
        <div className="contacto__correo">
          <p className="mono">Escríbeme a</p>
          <a href={`mailto:${correo}`}>
            {usuario}
            <wbr />@{dominio}
          </a>
          <button type="button" className="copiar mono" onClick={copiarCorreo}>
            {copiado ? "Copiado" : "Copiar correo"}
          </button>
          <span className="visualmente-oculto" role="status">
            {copiado ? "Correo copiado" : ""}
          </span>
        </div>

        <ul className="redes">
          <li>
            <a href={enlaces.linkedin} target="_blank" rel="noreferrer">
              <strong>LinkedIn</strong>
              <span className="mono">{nombreCompleto}</span>
              <span className="visualmente-oculto"> (se abre en otra pestaña)</span>
              <FlechaDiagonal />
            </a>
          </li>
          <li>
            <a href={enlaces.github} target="_blank" rel="noreferrer">
              <strong>GitHub</strong>
              <span className="mono">@{usuarioGithub}</span>
              <span className="visualmente-oculto"> (se abre en otra pestaña)</span>
              <FlechaDiagonal />
            </a>
          </li>
        </ul>
      </div>

      <div className="fila pie mono">
        <p>
          © {anio} {nombreCompleto}
        </p>
        <p>Hecho con React y Vite</p>
        <p>
          <button type="button" className="pie__arriba mono" onClick={volverArriba}>
            Volver arriba
          </button>
        </p>
      </div>
    </footer>
  );
}
