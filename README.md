# Portafolio · Nicolau Negre

Mi portafolio personal como desarrollador Full Stack: quién soy, mi experiencia y los proyectos que he hecho, cada uno con su propia ficha y capturas reales.

**[Ver la web](https://clienteportfolio.netlify.app)**

![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![React Router](https://img.shields.io/badge/React_Router_7-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![CSS](https://img.shields.io/badge/CSS-663399?style=for-the-badge&logo=css&logoColor=white)
![Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)

## Qué tiene

- **Portada** con mi foto y un fondo de celdas que se encienden al pasar el ratón (un `canvas`, en `src/efectos/campoCeldas.js`).
- **Sobre mí, experiencia y estudios**, con los datos en `src/datos/perfil.js`.
- **Proyectos principales y proyectos de formación**, cargados con `fetch` desde un JSON.
- **Una ficha por proyecto** (`/proyectos/noir`, `/proyectos/baleartrek`...) con cifras, qué hace, cómo está hecho, retos, lo que aprendí y capturas.
- **Buscador** que filtra por nombre, tecnología o tipo, sin tener en cuenta las tildes.
- El **título de la pestaña** cambia según la página y el número de proyectos.
- Diseño propio en CSS sin librerías: rejilla de 12 columnas, adaptado a móvil y tableta, y sin animaciones si el sistema pide reducir el movimiento.

## Estructura

```
Portafolio/
├── index.html
├── public/
│   ├── _redirects              Para que Netlify sirva las rutas de React Router
│   ├── data/proyectos.json     Los proyectos y sus fichas
│   └── imagenes/
│       ├── nicolau.webp / .jpg  Mi foto
│       └── proyectos/<slug>/    Capturas de cada proyecto
└── src/
    ├── main.jsx                Arranque y router
    ├── App.jsx                 Carga de proyectos, rutas, scroll y foco al navegar
    ├── utilidades.js           Funciones pequeñas que se usan en varios sitios
    ├── datos/perfil.js         Datos del CV
    ├── efectos/campoCeldas.js  Fondo animado de la portada
    ├── componentes/            Cabecera, presentación, secciones, tarjetas, contacto...
    ├── paginas/                Inicio, ficha de proyecto y 404
    └── estilos/                base.css, inicio.css y proyecto.css
```

## Puesta en marcha

Hace falta Node.js 20.19 o superior.

```bash
npm install
npm run dev
```

La web se abre en http://localhost:5173. Para generar la versión de producción:

```bash
npm run build
```

## Añadir un proyecto

Añade un objeto a `public/data/proyectos.json` y sus imágenes a `public/imagenes/proyectos/<slug>/`. Lo mínimo:

```json
{
  "slug": "mi-proyecto",
  "titulo": "Mi proyecto",
  "destacado": false,
  "lema": "Una frase que diga qué es",
  "anio": "2026",
  "tipo": "Ejercicio de clase",
  "papel": "Individual: todo el proyecto",
  "tecnologias": ["React", "Node.js"],
  "resumen": "Dos o tres frases para la cabecera de la ficha.",
  "contexto": "",
  "funciones": [{ "titulo": "Lo que hace", "texto": "Cómo lo hace." }],
  "construccion": [],
  "retos": [],
  "aprendizaje": "",
  "cifras": [{ "etiqueta": "Endpoints de la API", "valor": "23", "nota": "en routes/api.php" }],
  "repo": "https://github.com/NicoOmegaPro/...",
  "demo": "",
  "portada": { "src": "/imagenes/proyectos/mi-proyecto/portada.webp", "ancho": 900, "alto": 563 },
  "galeria": [
    {
      "src": "/imagenes/proyectos/mi-proyecto/01-inicio.webp",
      "src960": "/imagenes/proyectos/mi-proyecto/01-inicio-960.webp",
      "pie": "Qué se ve en la captura.",
      "movil": false,
      "ancho": 1600,
      "alto": 1000
    }
  ]
}
```

- Con `"destacado": true` sale arriba, junto a Noir y BalearTrek, con la tarjeta grande.
- Las secciones vacías (`contexto`, `construccion`, `retos`, `cifras`...) no se muestran en la ficha.
- `ancho` y `alto` son los píxeles reales de cada imagen; sirven para reservar su hueco mientras carga.
- La primera captura con `"movil": false` es la imagen grande de la ficha. Las demás se reparten entre las secciones y las de `"movil": true` van al final, en «En el móvil».
- `src960` es opcional: una copia de 960 px de ancho para que los móviles descarguen menos.
- En `portada` se puede añadir `"foco": "left top"` si la captura se lee mejor recortada desde una esquina.

## Contacto

- Email: [negrenicolau@gmail.com](mailto:negrenicolau@gmail.com)
- LinkedIn: [Nicolau Negre Rodríguez](https://www.linkedin.com/in/nicolau-negre-rodr%C3%ADguez-526a2839a/)
- GitHub: [@NicoOmegaPro](https://github.com/NicoOmegaPro)
