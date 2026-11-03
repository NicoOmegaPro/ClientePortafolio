// Fondo de la portada: un campo de celdas cuadradas alineado con la rejilla
// (cuatro celdas por columna en escritorio y tres en móvil).
// Con ratón, las celdas que pisa el puntero se rellenan del color de señal y se
// apagan encogiendo a saltos, como una trama de imprenta. Al cargar, un pequeño
// recorrido cruza el campo solo para enseñar que está ahí. En táctil, un toque
// enciende una cruz de celdas. Con movimiento reducido no se anima nada.
import { menosMovimiento } from "../utilidades.js";

// Por debajo de este ancho las celdas son más grandes (tres por columna)
const ANCHO_MOVIL = 700;

const usaRaton = () => window.matchMedia("(hover: hover) and (pointer: fine)").matches;

export class CampoCeldas {
  constructor(zona, capa, columna, { color, colorTrama, vida = 1000 }) {
    this.zona = zona; // donde se escucha el ratón
    this.capa = capa; // contenedor de los dos lienzos
    this.columna = columna; // una columna de la rejilla, para medir las celdas
    this.trama = capa.querySelector(".campo__trama");
    this.estela = capa.querySelector(".campo__estela");
    this.ctx = this.estela.getContext("2d");
    this.color = color;
    this.colorTrama = colorTrama;
    this.vida = vida;
    this.quieto = menosMovimiento.matches;
    this.destruido = false;

    this.encendidas = new Map(); // índice de celda -> intensidad de 1 a 0
    this.puntero = null;
    this.dentro = false;
    this.visible = true;
    this.raf = 0;
    this.espera = 0;
    this.ultimoFotograma = 0;
    this.paseo = null;
    this.paseosPendientes = 1; // solo uno: no queremos movimiento que no pare nunca
    this.siguientePaseo = performance.now() + 1800;
    this.eventos = new AbortController();

    this.tamano = new ResizeObserver(() => this.medir());
    this.tamano.observe(this.capa);
    // Fuera de pantalla no se pinta nada
    this.vista = new IntersectionObserver(([entrada]) => {
      this.visible = entrada.isIntersecting;
      if (this.visible) this.arrancar();
    });
    this.vista.observe(this.capa);

    if (this.quieto) return;
    const { signal } = this.eventos;
    if (usaRaton()) {
      zona.addEventListener("pointermove", (e) => this.alMover(e), { signal });
      zona.addEventListener(
        "pointerleave",
        () => {
          this.dentro = false;
          this.puntero = null;
          this.arrancar(); // para que se apague la última celda
        },
        { signal }
      );
    } else {
      zona.addEventListener(
        "pointerdown",
        (e) => {
          const p = this.local(e);
          const c = this.celdaEn(p.x, p.y);
          [[0, 0], [1, 0], [-1, 0], [0, 1], [0, -1]].forEach(([dc, df]) => this.encender(c.col + dc, c.fil + df, 1));
          this.arrancar();
        },
        { signal }
      );
    }
  }

  destruir() {
    this.destruido = true;
    this.eventos.abort();
    this.tamano.disconnect();
    this.vista.disconnect();
    cancelAnimationFrame(this.raf);
    clearTimeout(this.espera);
  }

  medir() {
    const caja = this.capa.getBoundingClientRect();
    const columna = this.columna.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    this.ancho = caja.width;
    this.alto = caja.height;
    this.lado = columna.width / (this.ancho < ANCHO_MOVIL ? 3 : 4) || 24;
    // Empezamos una celda antes del margen para cubrirlo también
    this.origenX = ((columna.left - caja.left) % this.lado) - this.lado;
    this.columnas = Math.ceil((this.ancho - this.origenX) / this.lado);
    this.filas = Math.ceil(this.alto / this.lado);

    for (const lienzo of [this.trama, this.estela]) {
      lienzo.width = Math.round(this.ancho * dpr);
      lienzo.height = Math.round(this.alto * dpr);
      lienzo.getContext("2d").setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    this.encendidas.clear();
    this.pintarTrama();
    if (this.quieto) this.estelaFija();
    else this.arrancar();
  }

  // Un punto cuadrado en cada esquina de celda, como papel milimetrado
  pintarTrama() {
    const ctx = this.trama.getContext("2d");
    ctx.clearRect(0, 0, this.ancho, this.alto);
    ctx.fillStyle = this.colorTrama;
    for (let c = 0; c <= this.columnas; c++) {
      const x = Math.round(this.origenX + c * this.lado);
      for (let f = 0; f <= this.filas; f++) ctx.fillRect(x - 1, Math.round(f * this.lado) - 1, 2, 2);
    }
  }

  local(e) {
    const caja = this.capa.getBoundingClientRect();
    return { x: e.clientX - caja.left, y: e.clientY - caja.top };
  }

  celdaEn(x, y) {
    return { col: Math.floor((x - this.origenX) / this.lado), fil: Math.floor(y / this.lado) };
  }

  encender(col, fil, intensidad) {
    if (col < 0 || fil < 0 || col >= this.columnas || fil >= this.filas) return;
    const indice = fil * this.columnas + col;
    if ((this.encendidas.get(indice) || 0) < intensidad) this.encendidas.set(indice, intensidad);
  }

  alMover(e) {
    const p = this.local(e);
    // Si el ratón va rápido, rellenamos el hueco entre dos lecturas para que la estela no salte
    if (this.puntero) {
      const dx = p.x - this.puntero.x;
      const dy = p.y - this.puntero.y;
      const pasos = Math.ceil(Math.hypot(dx, dy) / (this.lado * 0.5));
      for (let i = 1; i <= pasos; i++) {
        const c = this.celdaEn(this.puntero.x + (dx * i) / pasos, this.puntero.y + (dy * i) / pasos);
        this.encender(c.col, c.fil, 1);
      }
    }
    this.puntero = p;
    this.dentro = true;
    this.paseo = null; // el recorrido automático le cede el sitio al ratón
    this.paseosPendientes = 0;
    this.arrancar();
  }

  arrancar() {
    clearTimeout(this.espera);
    if (this.raf || !this.visible || this.quieto || this.destruido) return;
    this.ultimoFotograma = performance.now();
    this.raf = requestAnimationFrame((t) => this.fotograma(t));
  }

  fotograma(t) {
    const dt = Math.min(t - this.ultimoFotograma, 64);
    this.ultimoFotograma = t;

    if (this.dentro && this.puntero) {
      const c = this.celdaEn(this.puntero.x, this.puntero.y);
      this.encender(c.col, c.fil, 1);
    } else {
      this.pasear(t);
    }

    for (const [indice, valor] of this.encendidas) {
      const resto = valor - dt / this.vida;
      if (resto <= 0) this.encendidas.delete(indice);
      else this.encendidas.set(indice, resto);
    }
    this.pintarEstela();

    this.raf = 0;
    if (!this.visible || this.destruido) return;
    // Con el ratón quieto solo queda encendida la celda de debajo: no hace falta repintar
    const soloLaDelCursor = this.dentro && this.encendidas.size <= 1;
    if (this.paseo || (this.encendidas.size > 0 && !soloLaDelCursor)) {
      this.raf = requestAnimationFrame((n) => this.fotograma(n));
    } else if (!this.dentro && this.paseosPendientes > 0) {
      // Esperamos al recorrido de presentación sin gastar fotogramas
      this.espera = setTimeout(() => this.arrancar(), Math.max(this.siguientePaseo - performance.now(), 0));
    }
  }

  pasear(t) {
    if (!this.paseo) {
      if (this.paseosPendientes <= 0 || t < this.siguientePaseo) return;
      this.paseosPendientes--;
      const direcciones = [[1, 0], [0, 1], [-1, 0], [0, -1]];
      this.paseo = {
        col: Math.floor(Math.random() * this.columnas),
        fil: Math.floor(Math.random() * this.filas),
        dir: direcciones[Math.floor(Math.random() * 4)],
        pasos: 6 + Math.floor(Math.random() * 4),
        ultimo: 0,
      };
    }
    if (t - this.paseo.ultimo < 90) return;
    const p = this.paseo;
    this.encender(p.col, p.fil, 0.7);
    p.ultimo = t;
    p.col += p.dir[0];
    p.fil += p.dir[1];
    if (Math.random() < 0.3) p.dir = [p.dir[1], p.dir[0]]; // gira de vez en cuando
    if (--p.pasos <= 0) this.paseo = null;
  }

  pintarEstela() {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.ancho, this.alto);
    ctx.fillStyle = this.color;
    for (const [indice, valor] of this.encendidas) {
      const col = indice % this.columnas;
      const fil = Math.floor(indice / this.columnas);
      // Al apagarse, el cuadrado encoge en cuatro saltos (100, 75, 50 y 25 %)
      // sin perder la tinta llena, así nunca salen tonos rosados
      const escala = Math.ceil(valor * 4) / 4;
      const x0 = Math.round(this.origenX + col * this.lado);
      const x1 = Math.round(this.origenX + (col + 1) * this.lado);
      const y0 = Math.round(fil * this.lado);
      const y1 = Math.round((fil + 1) * this.lado);
      const ancho = Math.round((x1 - x0 - 1) * escala);
      const alto = Math.round((y1 - y0 - 1) * escala);
      ctx.fillRect(x0 + 1 + Math.round((x1 - x0 - 1 - ancho) / 2), y0 + 1 + Math.round((y1 - y0 - 1 - alto) / 2), ancho, alto);
    }
  }

  // Con movimiento reducido dejamos una estela quieta en un hueco sin texto
  estelaFija() {
    const movil = this.ancho < ANCHO_MOVIL;
    const base = movil ? 1 : Math.floor(this.columnas * 0.55);
    const fila = movil ? this.filas - 5 : Math.floor(this.filas * 0.42);
    const forma = movil
      ? [[0, 0, 1], [0, -1, 1], [1, -1, 0.75], [1, -2, 0.75], [1, -3, 0.5], [0, -3, 0.5], [0, -4, 0.25], [0, -5, 0.25]]
      : [[0, 0, 1], [1, 0, 1], [1, -1, 0.75], [2, -1, 0.75], [3, -1, 0.5], [3, -2, 0.5], [4, -2, 0.25], [5, -2, 0.25]];
    forma.forEach(([dc, df, v]) => this.encender(base + dc, fila + df, v));
    this.pintarEstela();
  }
}
