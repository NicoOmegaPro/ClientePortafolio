import { useState, useEffect } from "react";
import Header from "./assets/complements/header.jsx";
import Hero from "./assets/complements/hero.jsx";
import Contacto from "./assets/complements/contacto.jsx";
import Footer from "./assets/complements/footer.jsx";
import Newsletter from "./assets/complements/newsletter.jsx";
import Articulos from "./assets/complements/articulos.jsx";
import "./assets/CSS/styles.css";
import { proyectosJs as proyectosData } from "./assets/data/proyectos.js";

export default function App() {
  const [proyectos] = useState(proyectosData);
  const [busqueda, setBusqueda] = useState("");

  const proyectosFiltrados = proyectos.filter((proyecto) => {
    const texto = (
      proyecto.title +
      " " +
      proyecto.tech +
      " " +
      proyecto.description
    ).toLowerCase();

    return texto.includes(busqueda.toLowerCase());
  });

  useEffect(() => {
    document.title = `DigitalEvolution · ${proyectos.length} projectes`;
  }, [proyectos.length]);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Articulos
          proyectos={proyectosFiltrados}
          busqueda={busqueda}
          setBusqueda={setBusqueda}
        />
        <Contacto />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}