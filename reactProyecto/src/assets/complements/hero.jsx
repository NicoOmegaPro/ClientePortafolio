export default function Hero() {
    return (
        <section id="inici">
            <div className="hero">
                <div>
                    <h1>&gt; Nicolau Negre Rodríguez</h1>
                    <p className="hero-subtitle">
                        Desenvolupador web junior en <strong>DigitalEvolution S.A</strong>, especializado en front-end y experiencia
                        de usuario. Me gusta convertir ideas en interficies atractivas y funcionales
                    </p>
                    <p>
                        Actualmente estoy cursando el CFGS de Desarrollo de Aplicaciones Web y trabajo en proyectos reales con un
                        equipo de compañeros con quienes comparto pasión por la tecnología e innovación.
                    </p>

                    <div className="tag-list">
                        <span className="tag">HTML5 &amp; CSS3</span>
                        <span className="tag">JavaScript</span>
                        <span className="tag">Lua</span>
                        <span className="tag">React</span>
                        <span className="tag">Php</span>
                    </div>

                    <div className="hero-actions">
                        <a href="#projectes" className="btn btn-primary">Ver proyectos</a>
                        <a href="#contacte" className="btn btn-outline">Contactame</a>
                    </div>
                </div>
            </div>
        </section>
    )
}