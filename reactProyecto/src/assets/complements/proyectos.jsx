export default function proyecto({title, tech, description, image, alt}) {
  return (
    <article className="card">
      <h3 className="card-title">{title}</h3>
      <p className="card-meta">{tech}</p>
      <p>
        {description}
      </p>
      <img
        src={image}
        alt={alt}
        className="project-media"

      />
    </article>
  );
}
