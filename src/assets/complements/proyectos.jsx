import { IconoGithub } from "/src/assets/complements/iconos.jsx";

export default function proyecto({ title, tech, description, image, alt, repo, destacado }) {
  const tecnologias = tech.split("·").map((tecnologia) => tecnologia.trim());

  return (
    <article className={destacado ? "card card--destacado" : "card"}>
      <div className="card-media">
        <img src={image} alt={alt} className="project-media" loading="lazy" />
        {destacado && <span className="card-badge">Destacado</span>}
      </div>

      <div className="card-body">
        <h4 className="card-title">{title}</h4>
        <p className="card-description">{description}</p>

        <ul className="card-tech">
          {tecnologias.map((tecnologia) => (
            <li key={tecnologia}>{tecnologia}</li>
          ))}
        </ul>

        {repo && (
          <div className="card-links">
            <a className="card-link" href={repo} target="_blank" rel="noreferrer">
              <IconoGithub />
              Ver código
            </a>
          </div>
        )}
      </div>
    </article>
  );
}
