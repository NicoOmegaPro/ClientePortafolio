export default function Contacto() {

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("¡Mensaje enviado correctamente!");
    };

    return (
        <section id="contacte">
            <h1>Contacto</h1>

            <form id="contact-form" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="nom">Nombre Completo</label>
                    <input type="text" id="nom" name="nom" placeholder="Escribe tu nombre" required />
                </div>

                <div>
                    <label htmlFor="email">Correo electrónico</label>
                    <input type="email" id="email" name="email" placeholder="tu@ejemplo.com" required />
                </div>

                <div>
                    <label htmlFor="missatge">Mensaje</label>
                    <textarea id="missatge" name="missatge" placeholder="¿Cómo puedo ayudarte?" required></textarea>
                </div>

                <button type="submit" className="btn btn-primary">Enviar mensaje</button>
            </form>
        </section>
    );
}