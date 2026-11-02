import Proyectos from "/src/assets/complements/proyectos.jsx";
import { IconoBuscar } from "/src/assets/complements/iconos.jsx";

export default function Articulos({ proyectos, busqueda, setBusqueda }) {
  const destacados = proyectos.filter((proyecto) => proyecto.destacado);
  const otros = proyectos.filter((proyecto) => !proyecto.destacado);

  const pintarProyecto = (proyecto) => (
    <Proyectos
      key={proyecto.id}
      title={proyecto.title}
      tech={proyecto.tech}
      description={proyecto.description}
      image={proyecto.image}
      alt={proyecto.alt}
      repo={proyecto.repo}
      destacado={proyecto.destacado}
    />
  );

  return (
    <section id="projectes">
      <div className="container">
        <div className="projects-toolbar">
          <div className="section-header">
            <p className="eyebrow">Portafolio</p>
            <h2 className="section-title">Proyectos</h2>
            <p className="section-subtitle">
              Aplicaciones completas y proyectos con los que he ido aprendiendo. Puedes buscar por nombre,
              tecnología o descripción.
            </p>
          </div>

          <div className="project-search">
            <IconoBuscar />
            <input
              type="text"
              id="buscador-proyectos"
              placeholder="Buscar por título, tecnología..."
              aria-label="Buscar proyectos"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>
        </div>

        {proyectos.length === 0 ? (
          <p className="empty-state">No se han encontrado proyectos.</p>
        ) : (
          <>
            {destacados.length > 0 && (
              <div className="projects-group">
                <h3 className="group-title">Proyectos destacados</h3>
                <div className="grid grid-2">{destacados.map(pintarProyecto)}</div>
              </div>
            )}

            {otros.length > 0 && (
              <div className="projects-group">
                <h3 className="group-title">Proyectos de formación</h3>
                <div className="grid grid-3">{otros.map(pintarProyecto)}</div>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
