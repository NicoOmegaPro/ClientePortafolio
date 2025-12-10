export default function Newsletter() {

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("¡Newsletter activado!");
  };

  return (
    <section id="newsletter">
      <h1>Newsletter mensual</h1>
      <p>
        Suscribete al newsletter de <strong>DigitalEvolution S.A</strong> para recibir notificaciones.
      </p>

      <ul
        style={{
          margin: "0.75rem 0 1.5rem 1.25rem",
          fontSize: "0.9rem",
          color: "var(--text-muted)",
        }}
      >
        <li>Resumenes de proyectos del equipo.</li>
        <li>Trucos y recursos sobre desenvolupamiento web</li>
        <li>Noticias y tendencias del sector tecnológico</li>
      </ul>

      <form id="newsletter-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="newsletter-email">Correo electrónico</label>
          <input
            type="email"
            id="newsletter-email"
            name="newsletter-email"
            placeholder="tu@ejemplo.com"
            required
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          style={{ marginTop: "1rem" }}
        >
          Suscribirse
        </button>
      </form>
    </section>
  );
}