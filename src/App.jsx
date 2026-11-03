import { useEffect, useRef, useState } from "react";
import { Routes, Route, useLocation, useNavigationType } from "react-router-dom";
import Cabecera from "./componentes/Cabecera.jsx";
import Rejilla from "./componentes/Rejilla.jsx";
import Contacto from "./componentes/Contacto.jsx";
import Inicio from "./paginas/Inicio.jsx";
import Proyecto from "./paginas/Proyecto.jsx";
import NoEncontrado from "./paginas/NoEncontrado.jsx";
import { enfocar, fuenteLista, guardarPosiciones, leerPosiciones, menosMovimiento } from "./utilidades.js";

// ¿El elemento está en la sección de proyectos o después? Esa parte de la
// portada cambia de altura cuando llega el JSON, así que hay que esperarlo.
function dependeDeLosProyectos(elemento) {
  const proyectos = document.getElementById("proyectos");
  if (!elemento || !proyectos) return false;
  return elemento === proyectos || Boolean(proyectos.compareDocumentPosition(elemento) & Node.DOCUMENT_POSITION_FOLLOWING);
}

export default function App() {
  const [proyectos, setProyectos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(false);
  const [busqueda, setBusqueda] = useState("");
  const { pathname, hash, key } = useLocation();
  const tipoNavegacion = useNavigationType();

  const paginaAnterior = useRef(pathname);
  const primeraVez = useRef(true);
  const ultimaGestionada = useRef(null);
  const posiciones = useRef({}); // scroll guardado por cada entrada del historial

  // Los proyectos están en un JSON aparte: para añadir uno no hace falta tocar el código
  useEffect(() => {
    const cargarProyectos = async () => {
      try {
        const res = await fetch("/data/proyectos.json");
        if (!res.ok) throw new Error("No se han podido cargar los proyectos");
        setProyectos(await res.json());
      } catch (e) {
        console.error(e);
        setError(true);
      } finally {
        setCargando(false);
      }
    };
    cargarProyectos();
  }, []);

  // El navegador no sabe restaurar el scroll de una web hecha con React Router,
  // así que lo apuntamos nosotros para que Atrás (y recargar) vuelva al mismo sitio
  useEffect(() => {
    window.history.scrollRestoration = "manual";
    posiciones.current = leerPosiciones();
    let espera = 0;
    const guardar = () => {
      posiciones.current[window.history.state?.key ?? "default"] = window.scrollY;
      clearTimeout(espera);
      espera = setTimeout(() => guardarPosiciones(posiciones.current), 200);
    };
    window.addEventListener("scroll", guardar, { passive: true });
    return () => {
      clearTimeout(espera);
      window.removeEventListener("scroll", guardar);
    };
  }, []);

  // Qué hacer con el scroll y el foco después de cada navegación.
  // key cambia en cada clic aunque la dirección sea la misma, así un segundo
  // clic en "Proyectos" vuelve a bajar a la sección.
  useEffect(() => {
    if (ultimaGestionada.current === key) return;

    const guardada = posiciones.current[key];
    const volviendo = tipoNavegacion === "POP" && guardada != null;
    const destino = hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null;
    // Para volver a una posición guardada o bajar a Proyectos (o más abajo) esperamos al JSON
    if (cargando && (volviendo || dependeDeLosProyectos(destino))) return;
    ultimaGestionada.current = key;

    const mismaPagina = paginaAnterior.current === pathname;
    const primeraCarga = primeraVez.current;
    paginaAnterior.current = pathname;
    primeraVez.current = false;
    const suave = mismaPagina && !primeraCarga && !menosMovimiento.matches;

    if (volviendo) {
      window.scrollTo({ top: guardada, behavior: "instant" });
      return;
    }

    if (destino) {
      const bajar = () => {
        destino.scrollIntoView({ behavior: suave ? "smooth" : "instant" });
        enfocar(destino.querySelector("h1, h2") || destino);
      };
      if (primeraCarga) {
        // Al entrar con #seccion esperamos a la fuente: con la de reserva el nombre
        // ocupa más y el salto se quedaría corto. Si la fuente llega más tarde,
        // repetimos el salto siempre que la persona no se haya movido.
        fuenteLista().then(() => {
          bajar();
          const y = window.scrollY;
          document.fonts.ready.then(() => {
            if (Math.abs(window.scrollY - y) < 2) destino.scrollIntoView({ behavior: "instant" });
          });
        });
      } else {
        bajar();
      }
      return;
    }

    // Cambio de página, o un enlace a la misma página sin #seccion (el logo estando en la portada)
    if (!mismaPagina || tipoNavegacion !== "POP") {
      window.scrollTo({ top: 0, behavior: suave ? "smooth" : "instant" });
      enfocar(document.querySelector("main h1"));
    }
  }, [pathname, hash, key, cargando, tipoNavegacion]);

  // El salto al contenido se hace a mano para no meter una entrada en el historial
  const saltarAlContenido = (e) => {
    e.preventDefault();
    const principal = document.getElementById("contenido");
    principal.scrollIntoView({ behavior: "instant" });
    enfocar(principal);
  };

  return (
    <>
      <a className="saltar" href="#contenido" onClick={saltarAlContenido}>
        Saltar al contenido
      </a>
      <Cabecera listo={!cargando} />
      <main id="contenido" className="pagina">
        <Rejilla />
        <Routes>
          <Route
            path="/"
            element={<Inicio proyectos={proyectos} cargando={cargando} error={error} busqueda={busqueda} setBusqueda={setBusqueda} />}
          />
          <Route path="/proyectos/:slug" element={<Proyecto proyectos={proyectos} cargando={cargando} error={error} />} />
          <Route path="*" element={<NoEncontrado />} />
        </Routes>
      </main>
      <Contacto />
    </>
  );
}
