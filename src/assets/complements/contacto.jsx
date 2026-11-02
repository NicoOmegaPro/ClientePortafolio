import { useState } from "react";
import { IconoCorreo, IconoLinkedin, IconoGithub, IconoUbicacion, IconoEnviar } from "/src/assets/complements/iconos.jsx";

const CORREO = "negrenicolau@gmail.com";

export default function Contacto() {
    const [enviado, setEnviado] = useState(false);

    // Sin servidor: abre el correo del visitante con el mensaje ya preparado.
    const handleSubmit = (e) => {
        e.preventDefault();
        const datos = new FormData(e.target);
        const asunto = `Contacto desde el portafolio · ${datos.get("nom")}`;
        const cuerpo = `${datos.get("missatge")}\n\n${datos.get("nom")} · ${datos.get("email")}`;
        window.location.href = `mailto:${CORREO}?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(cuerpo)}`;
        setEnviado(true);
    };

    return (
        <section id="contacte">
            <div className="container contact">
                <div>
                    <div className="section-header">
                        <p className="eyebrow">Contacto</p>
                        <h2 className="section-title">Hablemos</h2>
                        <p className="section-subtitle">
                            ¿Tienes una oferta, un proyecto o una pregunta? Escríbeme y te responderé lo antes posible.
                        </p>
                    </div>

                    <ul className="contact-list">
                        <li>
                            <a className="contact-item" href={`mailto:${CORREO}`}>
                                <span className="contact-icon"><IconoCorreo /></span>
                                <span>
                                    <span className="contact-label">Email</span>
                                    <span className="contact-value">{CORREO}</span>
                                </span>
                            </a>
                        </li>
                        <li>
                            <a className="contact-item" href="https://www.linkedin.com/in/nicolau-negre-rodr%C3%ADguez-526a2839a/" target="_blank" rel="noreferrer">
                                <span className="contact-icon"><IconoLinkedin /></span>
                                <span>
                                    <span className="contact-label">LinkedIn</span>
                                    <span className="contact-value">Nicolau Negre Rodríguez</span>
                                </span>
                            </a>
                        </li>
                        <li>
                            <a className="contact-item" href="https://github.com/NicoOmegaPro" target="_blank" rel="noreferrer">
                                <span className="contact-icon"><IconoGithub /></span>
                                <span>
                                    <span className="contact-label">GitHub</span>
                                    <span className="contact-value">@NicoOmegaPro</span>
                                </span>
                            </a>
                        </li>
                        <li>
                            <div className="contact-item">
                                <span className="contact-icon"><IconoUbicacion /></span>
                                <span>
                                    <span className="contact-label">Ubicación</span>
                                    <span className="contact-value">Mallorca, España</span>
                                </span>
                            </div>
                        </li>
                    </ul>
                </div>

                <form id="contact-form" className="form-card" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="nom">Nombre completo</label>
                        <input type="text" id="nom" name="nom" placeholder="Escribe tu nombre" required />
                    </div>

                    <div>
                        <label htmlFor="email">Correo electrónico</label>
                        <input type="email" id="email" name="email" placeholder="tu@ejemplo.com" required />
                    </div>

                    <div>
                        <label htmlFor="missatge">Mensaje</label>
                        <textarea id="missatge" name="missatge" placeholder="¿En qué puedo ayudarte?" required></textarea>
                    </div>

                    <button type="submit" className="btn btn-primary">
                        Enviar mensaje
                        <IconoEnviar />
                    </button>

                    {enviado && (
                        <p className="form-note" role="status">
                            Se ha abierto tu aplicación de correo con el mensaje preparado. Solo tienes que enviarlo.
                        </p>
                    )}
                </form>
            </div>
        </section>
    );
}
