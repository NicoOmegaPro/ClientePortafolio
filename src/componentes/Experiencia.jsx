import Rejilla from "./Rejilla.jsx";
import { experiencia, estudios } from "../datos/perfil.js";

export default function Experiencia() {
  return (
    <section className="seccion bosque experiencia" id="experiencia">
      <Rejilla />
      <header className="fila sec-cabecera">
        <p className="mono sec-cabecera__num">02</p>
        <h2 className="sec-cabecera__titulo">Experiencia</h2>
        <p className="mono sec-cabecera__nota suave">2025–2026</p>
      </header>

      <ol className="trabajos">
        {experiencia.map((t) => (
          <li className="fila trabajo" key={t.empresa}>
            <p className="mono trabajo__fecha">{t.fechas}</p>
            <h3 className="trabajo__empresa">{t.empresa}</h3>
            <p className="trabajo__puesto">
              {t.puesto}
              <span className="mono suave">{t.detalle}</span>
            </p>
            <p className="trabajo__texto">{t.texto}</p>
          </li>
        ))}
      </ol>

      <div className="fila estudios">
        <h3 className="mono estudios__rotulo suave">Estudios</h3>
        <ul className="estudios__lista">
          {estudios.map((e) => (
            <li key={e.titulo}>
              <span className="mono suave">{e.fechas}</span>
              <strong>{e.titulo}</strong>
              <span>{e.centro}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
