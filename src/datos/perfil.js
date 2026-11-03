// Datos del CV que se usan en la página: presentación, sobre mí, experiencia y
// contacto. Los proyectos van aparte, en public/data/proyectos.json.

export const nombreCompleto = "Nicolau Negre Rodríguez";
export const correo = "negrenicolau@gmail.com";
export const usuarioGithub = "NicoOmegaPro";

export const enlaces = {
  linkedin: "https://www.linkedin.com/in/nicolau-negre-rodr%C3%ADguez-526a2839a/",
  github: `https://github.com/${usuarioGithub}`,
};

// Las tres celdas de la barra de la presentación
export const resumen = [
  { titulo: "Rol", valor: "Desarrollador Full Stack", texto: "React, Node.js, Laravel y PostgreSQL" },
  { titulo: "Prácticas", valor: "RIU Hotels & Resorts", texto: "Departamento de Inteligencia Artificial, 2026" },
  { titulo: "Formación", valor: "Técnico Superior en DAW", texto: "IES Emili Darder, 2024–2026" },
];

export const bio = [
  "Vivo en Palma de Mallorca y en junio de 2026 terminé el ciclo superior de Desarrollo de Aplicaciones Web en el IES Emili Darder. Me gusta hacer aplicaciones completas: pensar la base de datos, montar la API y dejar una interfaz que se entienda sin explicaciones.",
  "Durante las prácticas en RIU trabajé en el departamento de Inteligencia Artificial automatizando procesos internos. En Aditiva Fotografía desarrollé herramientas internas, di soporte técnico y llevé los contenidos de la web y las redes sociales. Ahora busco un equipo en el que seguir aprendiendo de gente con experiencia.",
];

export const datos = [
  { titulo: "Idiomas", valor: "Castellano y catalán nativos", detalle: "Inglés: nivel alto" },
  { titulo: "Ubicación", valor: "Palma de Mallorca", detalle: "Presencial, híbrido o remoto" },
  { titulo: "Disponibilidad", valor: "Incorporación inmediata", detalle: "Carné de conducir y vehículo propio" },
];

export const herramientas = [
  { grupo: "Lenguajes", items: ["JavaScript", "Python", "PHP", "Java", "Lua y Luau"] },
  { grupo: "Frontend", items: ["React", "HTML", "CSS y SCSS", "Bootstrap", "Tailwind CSS"] },
  { grupo: "Backend", items: ["Node.js", "Express", "Laravel", "FastAPI", "Flask"] },
  { grupo: "Datos", items: ["PostgreSQL", "MySQL", "Prisma"] },
  { grupo: "Herramientas", items: ["Docker", "Git", "Jenkins", "Google Cloud", "ServiceNow"] },
];

// Entre el mes y el año va un espacio que no se parte, para que la fecha no se corte mal
export const experiencia = [
  {
    fechas: "Mar 2026 – Jun 2026",
    empresa: "RIU Hotels & Resorts",
    puesto: "Desarrollador Full Stack y Automatizaciones",
    detalle: "Prácticas · Departamento de Inteligencia Artificial",
    texto: "Automaticé procesos de reservas, gestión de reseñas y tratamiento de facturas, y participé en el diseño y desarrollo de aplicaciones con inteligencia artificial para procesos internos, en colaboración con otros departamentos.",
  },
  {
    fechas: "Ago 2025 – 2026",
    empresa: "Aditiva Fotografía",
    puesto: "Desarrollador Full Stack y Soporte IT",
    detalle: "Dos etapas, antes y después de las prácticas",
    texto: "Desarrollé herramientas y automatizaciones para procesos internos, di soporte técnico y resolví las incidencias del día a día, y gestioné los contenidos de la web y las redes sociales.",
  },
];

export const estudios = [
  { fechas: "2024–2026", centro: "IES Emili Darder", titulo: "CFGS Desarrollo de Aplicaciones Web" },
  { fechas: "2022–2024", centro: "Colegio Santa Mónica", titulo: "Bachillerato de Ciencias Sociales" },
];
