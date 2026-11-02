import { IconoGithub } from "/src/assets/complements/iconos.jsx";

export default function Header() {
    return (
        <header className="site-header">
            <div className="container header-inner">
                <a href="#inici" className="logo">
                    <span className="logo-mark">NN</span>
                    <span className="logo-name">Nicolau Negre</span>
                </a>
                <nav className="site-nav" aria-label="Principal">
                    <a href="#inici">Inicio</a>
                    <a href="#projectes">Proyectos</a>
                    <a href="#contacte">Contacto</a>
                    <a className="nav-github" href="https://github.com/NicoOmegaPro" target="_blank" rel="noreferrer">
                        <IconoGithub />
                        <span>GitHub</span>
                    </a>
                </nav>
            </div>
        </header>
    )
}
