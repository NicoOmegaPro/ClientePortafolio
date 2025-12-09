export default function proyecto() {
    return (
        <section id="projectes">
            <h2>Projectes destacats</h2>

            <div className="grid grid-3">
                <article className="card">
                    <h3 className="card-title">Roblox Game</h3>
                    <p className="card-meta">Lua</p>
                    <p>
                        Juego desarrollado dentro de la plataforma Roblox utilizando el lenguaje Lua. Combina mecánicas de The Floor
                        is Lava con elementos de carreras. El proyecto se creo con finalidades de aprendizaje y la posibilidad de
                        obtener ingresos.
                    </p>
                    <img src="ImagenRoblox.png" alt="Captura del juego Roblox" className="project-media" />
                </article>
            </div>
        </section>
    )
}