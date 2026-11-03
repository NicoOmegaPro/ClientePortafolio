import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Rejilla from "../componentes/Rejilla.jsx";
import BotonPixeles from "../componentes/BotonPixeles.jsx";
import { Flecha, FlechaDiagonal, FlechaIzquierda } from "../componentes/Iconos.jsx";
import NoEncontrado from "./NoEncontrado.jsx";
import { dosCifras } from "../utilidades.js";

// Las secciones de texto entre las que se intercalan capturas
const SECCIONES_CON_CAPTURAS = ["funciones", "construccion", "retos"];

// Reparte la galería: la primera captura de escritorio hace de imagen principal,
// el resto va de dos en dos detrás de las secciones que existan y las de móvil al
// final. Las figuras se numeran en el orden en que aparecen.
function repartirCapturas(galeria, secciones) {
  const escritorio = galeria.filter((g) => !g.movil);
  const moviles = galeria.filter((g) => g.movil);
  const huecos = secciones.filter((id) => SECCIONES_CON_CAPTURAS.includes(id));

  const porSeccion = Object.fromEntries(huecos.map((id) => [id, []]));
  const sueltas = [];
  escritorio.slice(1).forEach((img, i) => {
    const destino = huecos[Math.min(Math.floor(i / 2), huecos.length - 1)];
    (destino ? porSeccion[destino] : sueltas).push(img);
  });

  let numero = 0;
  const numerar = (img) => ({ ...img, numero: ++numero });
  const principal = escritorio[0] ? numerar(escritorio[0]) : null;
  for (const id of huecos) porSeccion[id] = porSeccion[id].map(numerar);
  return { principal, porSeccion, sueltas: sueltas.map(numerar), moviles: moviles.map(numerar) };
}

// Una captura con su pie. Al pulsarla se abre a tamaño completo en otra pestaña.
function Figura({ imagen, sizes = "(max-width: 1023px) 100vw, 75vw" }) {
  const vertical = !imagen.movil && imagen.alto > imagen.ancho;
  const clases = ["figura", imagen.movil && "figura--movil", vertical && "figura--vertical"].filter(Boolean).join(" ");

  return (
    <figure className={clases}>
      {/* El marco nunca es más ancho que la propia captura, para no ampliarla */}
      <a
        className="figura__marco"
        href={imagen.src}
        target="_blank"
        rel="noreferrer"
        style={{ maxWidth: imagen.ancho }}
        aria-label={`Ampliar la figura ${dosCifras(imagen.numero)} (se abre en otra pestaña)`}
      >
        <img
          src={imagen.src}
          srcSet={imagen.src960 ? `${imagen.src960} 960w, ${imagen.src} ${imagen.ancho}w` : undefined}
          sizes={imagen.src960 ? sizes : undefined}
          alt=""
          width={imagen.ancho}
          height={imagen.alto}
          loading={imagen.numero === 1 ? "eager" : "lazy"}
        />
      </a>
      <figcaption>
        <span className="mono">Fig. {dosCifras(imagen.numero)}</span>
        <span>{imagen.pie}</span>
      </figcaption>
    </figure>
  );
}

export default function Proyecto({ proyectos, cargando, error }) {
  const { slug } = useParams();
  const p = proyectos.find((proyecto) => proyecto.slug === slug);

  useEffect(() => {
    if (p) document.title = `${p.titulo} · Nicolau Negre`;
  }, [p]);

  if (cargando) return <p className="fila aviso mono">Cargando proyecto…</p>;
  if (error) return <p className="fila aviso">No se han podido cargar los proyectos. Prueba a recargar la página.</p>;
  if (!p) return <NoEncontrado texto="Ese proyecto no existe o ha cambiado de nombre." />;

  // Posición dentro de su grupo, con el mismo código que en las tarjetas (P-01, F-03...)
  const grupo = proyectos.filter((x) => x.destacado === p.destacado);
  const posicion = grupo.indexOf(p) + 1;
  const codigo = `${p.destacado ? "P" : "F"}-${dosCifras(posicion)}`;
  const siguiente = proyectos[(proyectos.indexOf(p) + 1) % proyectos.length];
  // Los nombres de más de once letras no caben enormes en una línea y pasan a ocupar todo el ancho
  const tituloLargo = p.titulo.length > 11;

  const secciones = [
    p.contexto && {
      id: "contexto",
      titulo: "El proyecto",
      cuerpo: <p className="texto-largo">{p.contexto}</p>,
    },
    p.funciones.length > 0 && {
      id: "funciones",
      titulo: "Qué hace",
      cuerpo: (
        <ol className="funciones">
          {p.funciones.map((f, i) => (
            <li key={f.titulo}>
              <span className="mono suave">{dosCifras(i + 1)}</span>
              <h3>{f.titulo}</h3>
              <p>{f.texto}</p>
            </li>
          ))}
        </ol>
      ),
    },
    p.construccion.length > 0 && {
      id: "construccion",
      titulo: "Cómo está hecho",
      cuerpo: (
        <div className="texto-largo">
          {p.construccion.map((parrafo) => (
            <p key={parrafo.slice(0, 30)}>{parrafo}</p>
          ))}
        </div>
      ),
    },
    p.retos.length > 0 && {
      id: "retos",
      titulo: "Retos",
      cuerpo: (
        <ol className="retos">
          {p.retos.map((r, i) => (
            <li key={r.titulo}>
              <span className="mono suave">Reto {dosCifras(i + 1)}</span>
              <h3>{r.titulo}</h3>
              <p>{r.texto}</p>
            </li>
          ))}
        </ol>
      ),
    },
    p.aprendizaje && {
      id: "aprendizaje",
      titulo: "Lo que aprendí",
      cuerpo: <p className="texto-largo texto-largo--destacado">{p.aprendizaje}</p>,
    },
  ].filter(Boolean);

  const capturas = repartirCapturas(
    p.galeria,
    secciones.map((s) => s.id)
  );

  const ficha = [
    { titulo: "Año", valor: p.anio },
    { titulo: "Tipo", valor: p.tipo },
    { titulo: "Mi papel", valor: p.papel },
    { titulo: "Tecnologías", valor: p.tecnologias.join(", ") },
  ].filter((f) => f.valor);

  const filaDeCapturas = (lista) => (
    <div className="capturas">
      {lista.map((img, i) => (
        <div className={i % 2 ? "fila captura captura--derecha" : "fila captura"} key={img.src}>
          <Figura imagen={img} />
        </div>
      ))}
    </div>
  );

  return (
    <article className="detalle">
      <nav className="fila migas mono" aria-label="Navegación entre proyectos">
        <Link to="/#proyectos" className="migas__volver">
          <FlechaIzquierda />
          <span>
            <span className="solo-ancho">Todos los </span>proyectos
          </span>
        </Link>
        <p className="suave">
          {p.destacado ? "Proyectos principales" : "Proyectos de formación"} · {posicion} de {grupo.length}
        </p>
        <Link to={`/proyectos/${siguiente.slug}`} className="migas__siguiente">
          <span>
            <span className="solo-ancho">Siguiente: </span>
            {siguiente.titulo}
          </span>
          <Flecha />
        </Link>
      </nav>

      <header className={tituloLargo ? "fila detalle__cabeza detalle__cabeza--largo" : "fila detalle__cabeza"}>
        <h1 className="detalle__titulo" style={{ "--letras": p.titulo.length }}>
          {p.titulo}
          <span className="cuadro" />
        </h1>
        <div className="detalle__intro">
          <p className="mono suave">{[codigo, p.anio].filter(Boolean).join(" · ")}</p>
          {p.lema && <p className="detalle__lema">{p.lema}</p>}
          {p.resumen && <p className="detalle__parrafo">{p.resumen}</p>}
          <div className="detalle__acciones">
            {p.repo && (
              <BotonPixeles href={p.repo} target="_blank" rel="noreferrer" icono={<FlechaDiagonal />}>
                Ver el código
                <span className="visualmente-oculto"> (se abre en otra pestaña)</span>
              </BotonPixeles>
            )}
            {p.demo && (
              <a className="enlace" href={p.demo} target="_blank" rel="noreferrer">
                Ver la web<span className="visualmente-oculto"> (se abre en otra pestaña)</span>
              </a>
            )}
            <Link className="enlace" to="/#proyectos">
              Volver a proyectos
            </Link>
          </div>
        </div>
      </header>

      {p.cifras.length > 0 && (
        <dl className={`fila cifras cifras--${p.cifras.length}`}>
          {p.cifras.map((c) => (
            <div key={c.etiqueta}>
              <dt className="mono suave">{c.etiqueta}</dt>
              {/* Los valores de un solo dígito llevan un cero delante (09, no 9), como el resto de la numeración */}
              <dd className="cifras__valor">{/^\d$/.test(c.valor) ? dosCifras(c.valor) : c.valor}</dd>
              {c.nota && <dd className="cifras__nota">{c.nota}</dd>}
            </div>
          ))}
        </dl>
      )}

      <dl className={`fila ficha ficha--${ficha.length}`}>
        {ficha.map((f) => (
          <div key={f.titulo}>
            <dt className="mono suave">{f.titulo}</dt>
            <dd>{f.valor}</dd>
          </div>
        ))}
      </dl>

      {capturas.principal && (
        <div className="fila detalle__portada">
          {/* La principal ocupa casi todo el ancho: así el navegador no elige la versión pequeña */}
          <Figura imagen={capturas.principal} sizes="(max-width: 1023px) 100vw, (min-width: 1800px) 78vw, 94vw" />
        </div>
      )}

      {secciones.map((s, i) => (
        <section className="bloque" key={s.id} aria-labelledby={`titulo-${s.id}`}>
          <div className="fila bloque__fila">
            <header className="bloque__cabeza">
              <p className="mono suave">{dosCifras(i + 1)}</p>
              <h2 id={`titulo-${s.id}`}>{s.titulo}</h2>
            </header>
            <div className="bloque__cuerpo">{s.cuerpo}</div>
          </div>
          {capturas.porSeccion[s.id]?.length > 0 && filaDeCapturas(capturas.porSeccion[s.id])}
        </section>
      ))}

      {capturas.sueltas.length > 0 && filaDeCapturas(capturas.sueltas)}

      {capturas.moviles.length > 0 && (
        <section className="bloque" aria-labelledby="titulo-movil">
          <div className="fila bloque__fila">
            <header className="bloque__cabeza">
              <p className="mono suave">{dosCifras(secciones.length + 1)}</p>
              <h2 id="titulo-movil">En el móvil</h2>
            </header>
            <div className="bloque__cuerpo capturas-movil">
              {capturas.moviles.map((img) => (
                <Figura key={img.src} imagen={img} />
              ))}
            </div>
          </div>
        </section>
      )}

      <Link to={`/proyectos/${siguiente.slug}`} className="siguiente">
        <Rejilla />
        <span className="fila">
          <span className="mono siguiente__rotulo">Siguiente proyecto</span>
          <span className="siguiente__titulo">{siguiente.titulo}</span>
          <Flecha />
        </span>
      </Link>
    </article>
  );
}
