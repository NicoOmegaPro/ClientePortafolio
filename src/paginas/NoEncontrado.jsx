import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function NoEncontrado({ texto = "Esta página no existe o ha cambiado de sitio." }) {
  useEffect(() => {
    document.title = "Página no encontrada · Nicolau Negre";
  }, []);

  return (
    <section className="fila no-encontrado">
      <p className="mono suave no-encontrado__codigo">Error 404</p>
      <h1 className="no-encontrado__titulo">
        Aquí no hay nada<span className="cuadro" />
      </h1>
      <p className="no-encontrado__texto">{texto}</p>
      <p>
        <Link className="enlace" to="/">
          Volver al inicio
        </Link>
      </p>
    </section>
  );
}
