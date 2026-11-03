import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Rejilla from "./Rejilla.jsx";

const SECCIONES = [
  { id: "sobre-mi", texto: "Sobre mí" },
  { id: "experiencia", texto: "Experiencia" },
  { id: "proyectos", texto: "Proyectos" },
  { id: "contacto", texto: "Contacto" },
];

const formatoHora = new Intl.DateTimeFormat("es-ES", { hour: "2-digit", minute: "2-digit", timeZone: "Europe/Madrid" });

export default function Cabecera({ listo }) {
  const { pathname, key } = useLocation();
  const [hora, setHora] = useState(() => formatoHora.format(new Date()));
  const [seccionVista, setSeccionVista] = useState(null);
  const [menuAbierto, setMenuAbierto] = useState(false);
  // Cada navegación (también Atrás y Adelante) trae una key nueva: si cambia,
  // cerramos el menú del móvil en el mismo render, sin esperar a un efecto
  const [keyVista, setKeyVista] = useState(key);
  if (key !== keyVista) {
    setKeyVista(key);
    setMenuAbierto(false);
  }
  const progreso = useRef(null);
  const botonMenu = useRef(null);
  const menuMovil = useRef(null);

  // En la ficha de un proyecto marcamos "Proyectos"; en la portada, la sección que se está leyendo
  const actual = pathname.startsWith("/proyectos/") ? "proyectos" : pathname === "/" ? seccionVista : null;

  // Hora de Mallorca, se actualiza cada medio minuto
  useEffect(() => {
    const reloj = setInterval(() => setHora(formatoHora.format(new Date())), 30000);
    return () => clearInterval(reloj);
  }, []);

  // Barra de lectura: una línea que avanza con el scroll
  useEffect(() => {
    const mover = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      progreso.current.style.transform = `scaleX(${total > 0 ? window.scrollY / total : 0})`;
    };
    mover();
    window.addEventListener("scroll", mover, { passive: true });
    window.addEventListener("resize", mover);
    return () => {
      window.removeEventListener("scroll", mover);
      window.removeEventListener("resize", mover);
    };
  }, [pathname, listo]);

  // La sección actual es la que cruza la franja central de la pantalla
  useEffect(() => {
    if (pathname !== "/" || !listo) return;
    const vigilante = new IntersectionObserver(
      (entradas) => entradas.forEach((e) => e.isIntersecting && setSeccionVista(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    ["inicio", ...SECCIONES.map((s) => s.id)].forEach((id) => {
      const seccion = document.getElementById(id);
      if (seccion) vigilante.observe(seccion);
    });
    return () => vigilante.disconnect();
  }, [pathname, listo]);

  // Escape cierra el menú del móvil; si el foco estaba dentro, vuelve al botón
  useEffect(() => {
    if (!menuAbierto) return;
    const cerrar = (e) => {
      if (e.key !== "Escape") return;
      const estabaDentro = menuMovil.current.contains(document.activeElement);
      setMenuAbierto(false);
      if (estabaDentro) botonMenu.current.focus();
    };
    document.addEventListener("keydown", cerrar);
    return () => document.removeEventListener("keydown", cerrar);
  }, [menuAbierto]);

  // Si el foco del teclado sale de la cabecera, el menú se cierra para no tapar nada
  const alPerderFoco = (e) => {
    if (menuAbierto && e.relatedTarget && !e.currentTarget.contains(e.relatedTarget)) setMenuAbierto(false);
  };

  const enlaces = SECCIONES.map((s, i) => (
    <Link key={s.id} to={`/#${s.id}`} aria-current={actual === s.id ? "true" : undefined}>
      <span aria-hidden="true">0{i + 1}</span>
      {s.texto}
    </Link>
  ));

  return (
    <header className={menuAbierto ? "cabecera menu-abierto" : "cabecera"} onBlur={alPerderFoco}>
      <Rejilla />
      <div className="fila cabecera__fila">
        <Link to="/" className="marca">
          Nicolau Negre
        </Link>
        <nav className="menu mono" aria-label="Principal">
          {enlaces}
        </nav>
        <div className="cabecera__estado mono">
          <span className="reloj">Palma {hora}</span>
          <span className="disponible">Disponible</span>
          <button
            ref={botonMenu}
            type="button"
            className="boton-menu mono"
            aria-expanded={menuAbierto}
            aria-controls="menu-movil"
            onClick={() => setMenuAbierto(!menuAbierto)}
          >
            {menuAbierto ? "Cerrar" : "Menú"}
          </button>
        </div>
      </div>
      <nav id="menu-movil" ref={menuMovil} className="menu-movil" aria-label="Principal en móvil">
        {enlaces}
      </nav>
      <div className="progreso" ref={progreso} />
    </header>
  );
}
