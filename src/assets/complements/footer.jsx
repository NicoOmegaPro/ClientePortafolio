export default function footer() {
    const anio = new Date().getFullYear();

    return (
        <footer>
            <div className="container footer-inner">
                <p>© {anio} Nicolau Negre Rodríguez</p>
                <div className="footer-links">
                    <a href="https://github.com/NicoOmegaPro" target="_blank" rel="noreferrer">GitHub</a>
                    <a href="https://www.linkedin.com/in/nicolau-negre-rodr%C3%ADguez-526a2839a/" target="_blank" rel="noreferrer">LinkedIn</a>
                    <a href="mailto:negrenicolau@gmail.com">Email</a>
                </div>
            </div>
        </footer>
    )
}
