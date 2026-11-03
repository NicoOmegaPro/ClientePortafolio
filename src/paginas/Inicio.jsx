import { useEffect } from "react";
import Presentacion from "../componentes/Presentacion.jsx";
import SobreMi from "../componentes/SobreMi.jsx";
import Experiencia from "../componentes/Experiencia.jsx";
import Proyectos from "../componentes/Proyectos.jsx";

export default function Inicio({ proyectos, cargando, error, busqueda, setBusqueda }) {
  // El título de la pestaña dice cuántos proyectos hay en el JSON
  useEffect(() => {
    document.title = proyectos.length
      ? `Nicolau Negre · Desarrollador Full Stack · ${proyectos.length} proyectos`
      : "Nicolau Negre · Desarrollador Full Stack";
  }, [proyectos.length]);

  return (
    <>
      <Presentacion />
      <SobreMi />
      <Experiencia />
      <Proyectos proyectos={proyectos} cargando={cargando} error={error} busqueda={busqueda} setBusqueda={setBusqueda} />
    </>
  );
}
