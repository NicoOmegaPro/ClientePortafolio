export default function Hero() {
    return (
        <section id="inici">
            <div className="hero">
                <div>
                    <h1>&gt; Nicolau Negre Rodríguez</h1>
                    <p className="hero-subtitle">
                        Desenvolupador web junior a <strong>DigitalEvolution S.A</strong>, especialitzat en front-end i experiència
                        d’usuari. M’agrada convertir idees en interfícies netes, ràpides i accessibles.
                    </p>
                    <p>
                        Actualment estic cursant el CFGS de Desenvolupament d’Aplicacions Web i treball en projectes reals amb un
                        equip de companys amb qui compartesc passió per la tecnologia i la innovació.
                    </p>

                    <div className="tag-list">
                        <span className="tag">HTML5 &amp; CSS3</span>
                        <span className="tag">JavaScript</span>
                        <span className="tag">Lua</span>
                        <span className="tag">React</span>
                        <span className="tag">Php</span>
                    </div>

                    <div className="hero-actions">
                        <a href="#projectes" className="btn btn-primary">Veure projectes</a>
                        <a href="#contacte" className="btn btn-outline">Contacta amb mi</a>
                    </div>
                </div>

                <div>
                    <div className="card">
                        <p className="card-title">Perfil professional</p>
                        <p className="card-meta">Portafoli personal · DigitalEvolution S.A</p>
                        <p>
                            Em defineixen tres paraules: <strong>organització</strong>, <strong>detall</strong> i
                            <strong>curiositat</strong>. M’agrada escriure codi net, documentar bé els projectes i aprendre
                            constantment noves eines per millorar el flux de treball de l’equip.
                        </p>
                        <br />
                        <p className="small">
                            <strong>Objectiu a curt termini:</strong> consolidar una base sòlida en desenvolupament web i començar a
                            participar en projectes per a clients reals.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}