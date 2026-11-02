import { IconoGithub, IconoLinkedin, IconoCorreo, IconoFlecha } from "/src/assets/complements/iconos.jsx";

const tecnologias = ["React", "JavaScript", "Node.js", "Laravel", "PHP", "PostgreSQL", "Docker"];

export default function Hero() {
    return (
        <section id="inici">
            <div className="container hero">
                <div>
                    <p className="status">
                        <span className="status-dot" />
                        Abierto a nuevas oportunidades
                    </p>
                    <h1>Nicolau Negre Rodríguez</h1>
                    <p className="hero-role">Desarrollador Full Stack</p>
                    <p className="hero-text">
                        Técnico Superior en Desarrollo de Aplicaciones Web. Construyo aplicaciones completas: desde la
                        base de datos y la API hasta una interfaz clara y agradable de usar.
                    </p>

                    <ul className="tag-list">
                        {tecnologias.map((tecnologia) => (
                            <li key={tecnologia} className="tag">{tecnologia}</li>
                        ))}
                    </ul>

                    <div className="hero-actions">
                        <a href="#projectes" className="btn btn-primary">
                            Ver proyectos
                            <IconoFlecha />
                        </a>
                        <a href="#contacte" className="btn btn-outline">Contactar</a>
                    </div>

                    <div className="social-links">
                        <a className="icon-link" href="https://github.com/NicoOmegaPro" target="_blank" rel="noreferrer" aria-label="GitHub">
                            <IconoGithub />
                        </a>
                        <a className="icon-link" href="https://www.linkedin.com/in/nicolau-negre-rodr%C3%ADguez-526a2839a/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                            <IconoLinkedin />
                        </a>
                        <a className="icon-link" href="mailto:negrenicolau@gmail.com" aria-label="Correo electrónico">
                            <IconoCorreo />
                        </a>
                    </div>
                </div>

                <div className="terminal" aria-hidden="true">
                    <div className="terminal-bar">
                        <span className="dot dot-red" />
                        <span className="dot dot-yellow" />
                        <span className="dot dot-green" />
                        <span className="terminal-title">perfil.json</span>
                    </div>
                    <div className="terminal-body">
                        <p><span className="t-prompt">~/portafolio</span> <span className="t-muted">$</span> cat perfil.json</p>
                        <p>{"{"}</p>
                        <p className="t-indent"><span className="t-key">{'"rol"'}</span>: <span className="t-str">{'"Desarrollador Full Stack"'}</span>,</p>
                        <p className="t-indent"><span className="t-key">{'"formación"'}</span>: <span className="t-str">{'"CFGS DAW"'}</span>,</p>
                        <p className="t-indent"><span className="t-key">{'"ubicación"'}</span>: <span className="t-str">{'"Mallorca, España"'}</span>,</p>
                        <p className="t-indent"><span className="t-key">{'"stack"'}</span>: [<span className="t-str">{'"React"'}</span>, <span className="t-str">{'"Node.js"'}</span>, <span className="t-str">{'"Laravel"'}</span>],</p>
                        <p className="t-indent"><span className="t-key">{'"disponible"'}</span>: <span className="t-bool">true</span></p>
                        <p>{"}"}</p>
                        <p><span className="t-prompt">~/portafolio</span> <span className="t-muted">$</span> <span className="cursor" /></p>
                    </div>
                </div>
            </div>
        </section>
    )
}
