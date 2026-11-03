import { bio, datos, herramientas } from "../datos/perfil.js";

export default function SobreMi() {
  return (
    <section className="seccion" id="sobre-mi">
      <header className="fila sec-cabecera">
        <p className="mono sec-cabecera__num">01</p>
        <h2 className="sec-cabecera__titulo">Sobre mí</h2>
        <p className="mono sec-cabecera__nota suave">Perfil, formación y herramientas</p>
      </header>

      <div className="fila sobre">
        <p className="mono sobre__rotulo suave">Perfil</p>
        <p className="sobre__lema">
          Desarrollador de software con especial interés en <em>aplicaciones web</em>, <em>inteligencia artificial</em> y
          automatización de procesos<span className="cuadro" />
        </p>

        <div className="sobre__texto">
          {bio.map((parrafo) => (
            <p key={parrafo.slice(0, 20)}>{parrafo}</p>
          ))}
        </div>

        <dl className="datos">
          {datos.map((d) => (
            <div key={d.titulo}>
              <dt className="mono suave">{d.titulo}</dt>
              <dd>{d.valor}</dd>
              <dd>{d.detalle}</dd>
            </div>
          ))}
        </dl>

        <div className="herramientas">
          <p className="mono herramientas__rotulo suave">Con qué trabajo</p>
          {herramientas.map((g, i) => (
            <div className="herramientas__grupo" key={g.grupo}>
              <h3 className="mono">
                <span>{g.grupo}</span>
                <span className="suave" aria-hidden="true">
                  0{i + 1}
                </span>
              </h3>
              <ul>
                {g.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
