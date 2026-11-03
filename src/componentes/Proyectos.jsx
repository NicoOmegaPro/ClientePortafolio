import TarjetaDestacada from "./TarjetaDestacada.jsx";
import TarjetaFormacion from "./TarjetaFormacion.jsx";
import { Lupa } from "./Iconos.jsx";
import { sinTildes } from "../utilidades.js";

export default function Proyectos({ proyectos, cargando, error, busqueda, setBusqueda }) {
  const principales = proyectos.filter((p) => p.destacado);
  const deFormacion = proyectos.filter((p) => !p.destacado);

  // El buscador mira el nombre, la descripción, el tipo, las tecnologías y el grupo, sin tener en cuenta las tildes
  const texto = sinTildes(busqueda.trim());
  const coincide = (p) =>
    sinTildes([p.titulo, p.lema, p.resumen, p.tipo, ...p.tecnologias, p.destacado ? "principal" : "formación"].join(" ")).includes(texto);
  const principalesVisibles = principales.filter(coincide);
  const formacionVisibles = deFormacion.filter(coincide);
  const encontrados = principalesVisibles.length + formacionVisibles.length;

  // El número de cada proyecto no cambia al filtrar
  const numeroDe = (p) => (p.destacado ? principales : deFormacion).indexOf(p) + 1;
  const listo = !cargando && !error;

  return (
    <section className="seccion" id="proyectos">
      <header className="fila sec-cabecera">
        <p className="mono sec-cabecera__num">03</p>
        <h2 className="sec-cabecera__titulo">Proyectos</h2>
        {listo && (
          <p className="mono sec-cabecera__nota suave">
            {principales.length} principales · {deFormacion.length} de formación
          </p>
        )}
      </header>

      {cargando && <p className="fila aviso mono">Cargando proyectos…</p>}
      {error && <p className="fila aviso">No se han podido cargar los proyectos. Prueba a recargar la página.</p>}

      {listo && (
        <div className="fila buscador">
          <label htmlFor="buscador" className="mono buscador__rotulo">
            Buscar
          </label>
          <div className="buscador__campo">
            <Lupa />
            <input
              id="buscador"
              type="search"
              placeholder="Nombre, tecnología o tipo"
              autoComplete="off"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>
          <p className="mono buscador__total suave" aria-live="polite">
            {texto ? `${encontrados} de ${proyectos.length} proyectos` : `${proyectos.length} proyectos`}
          </p>
        </div>
      )}

      {listo && texto && encontrados === 0 && <p className="fila aviso">No hay ningún proyecto que coincida con «{busqueda.trim()}».</p>}

      {principalesVisibles.length > 0 && (
        <div className="grupo">
          <h3 className="grupo__titulo mono">Proyectos principales</h3>
          {principalesVisibles.map((p, i) => (
            <TarjetaDestacada key={p.slug} proyecto={p} numero={numeroDe(p)} invertida={i % 2 === 1} />
          ))}
        </div>
      )}

      {formacionVisibles.length > 0 && (
        <div className="grupo grupo--formacion">
          <div className="fila grupo__cabeza">
            <h3 className="grupo__titulo-grande">
              Proyectos de formación<span className="cuadro" />
            </h3>
            <p className="grupo__nota">
              Ejercicios y prácticas del ciclo con los que aprendí React, PHP y bases de datos, y un juego en Roblox. Cada
              uno tiene su ficha con capturas y lo que hice.
            </p>
          </div>
          <div className="fila rejilla-tarjetas">
            {formacionVisibles.map((p) => (
              <TarjetaFormacion key={p.slug} proyecto={p} numero={numeroDe(p)} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
