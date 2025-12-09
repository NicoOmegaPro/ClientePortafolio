export default function Contacto() {
    return (
        <section id="contacte">
            <h2>Contacte</h2>

            <form id="contact-form">
                <div>
                    <label for="nom">Nom complet</label>
                    <input type="text" id="nom" name="nom" placeholder="Escriu el teu nom" required />
                </div>

                <div>
                    <label for="email">Correu electrònic</label>
                    <input type="email" id="email" name="email" placeholder="tu@exemple.com" required />
                </div>

                <div>
                    <label for="missatge">Missatge</label>
                    <textarea id="missatge" name="missatge" placeholder="Explica’m com et puc ajudar" required></textarea>
                </div>

                <button type="submit" className="btn btn-primary">Enviar missatge</button>
            </form>
        </section>
    )
}