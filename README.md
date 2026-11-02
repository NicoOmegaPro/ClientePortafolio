<div align="center">

# Portafolio · Nicolau Negre

**Mi portafolio personal como desarrollador Full Stack**

Aquí enseño mis proyectos principales, los que he ido haciendo durante la formación y una forma rápida de contactar conmigo.

**[Ver la web](https://clienteportfolio.netlify.app)**

![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![CSS](https://img.shields.io/badge/CSS-663399?style=for-the-badge&logo=css&logoColor=white)
![Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)

</div>

---

## ✨ Qué tiene

- **Proyectos destacados**: Noir y BalearTrek, con enlace a su código.
- **Proyectos de formación**: ejercicios y prácticas del ciclo (React, PHP, Roblox...).
- **Buscador** para filtrar los proyectos por título, tecnología o descripción.
- Los proyectos se cargan desde un **JSON** (`public/data/proyectos.json`), así que para añadir uno no hace falta tocar el código.
- El **título de la pestaña** cambia según el número de proyectos.
- **Formulario de contacto** que abre el correo con el mensaje ya escrito.
- Diseño **adaptado a móvil**.

## 🧱 Estructura

```
ClientePortafolio/
├── public/
│   ├── data/proyectos.json   Lista de proyectos
│   └── imagenes/             Capturas de cada proyecto
└── src/
    ├── App.jsx               Carga los proyectos y gestiona el buscador
    └── assets/
        ├── complements/      Componentes: cabecera, inicio, proyectos, contacto y pie
        └── CSS/styles.css    Estilos
```

## 🚀 Puesta en marcha

Hace falta Node.js 20.19 o superior.

```bash
npm install
npm run dev
```

La web se abre en http://localhost:5173. Para generar la versión de producción:

```bash
npm run build
```

## ➕ Añadir un proyecto

Añade un objeto a `public/data/proyectos.json` y su imagen a `public/imagenes/`:

```json
{
  "id": 9,
  "title": "Nombre del proyecto",
  "tech": "React · Node.js",
  "description": "Qué hace el proyecto.",
  "image": "/imagenes/captura.jpg",
  "alt": "Captura del proyecto",
  "repo": "https://github.com/NicoOmegaPro/...",
  "destacado": false
}
```

Con `"destacado": true` sale arriba, junto a Noir y BalearTrek.

## 📬 Contacto

- Email: [negrenicolau@gmail.com](mailto:negrenicolau@gmail.com)
- LinkedIn: [Nicolau Negre Rodríguez](https://www.linkedin.com/in/nicolau-negre-rodr%C3%ADguez-526a2839a/)
- GitHub: [@NicoOmegaPro](https://github.com/NicoOmegaPro)
