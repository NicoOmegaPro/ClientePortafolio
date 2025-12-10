import Proyectos from "/src/assets/complements/proyectos.jsx";

export default function Articulos({ proyectos, busqueda, setBusqueda }) {
  return (
    <section id="projectes">
      <h2>Proyectos destacados</h2>

      <div className="project-search">
        <input
          type="text"
          id="buscador-proyectos"
          placeholder="Buscar por título, tecnología..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>

      <div className="grid grid-3">
        {proyectos.length === 0 ? (
          <p>No se han encontrado proyectos.</p>
        ) : (
          proyectos.map((proyecto) => (
            <Proyectos
              key={proyecto.id}
              title={proyecto.title}
              tech={proyecto.tech}
              description={proyecto.description}
              image={proyecto.image}
              alt={proyecto.alt}
            />
          ))
        )}
      </div>
    </section>
  );
}