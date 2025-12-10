import { useState, useEffect } from "react";
import Header from "/src/assets/complements/header.jsx";
import Hero from "/src/assets/complements/hero.jsx";
import Contacto from "/src/assets/complements/contacto.jsx";
import Footer from "/src/assets/complements/footer.jsx";
import Newsletter from "/src/assets/complements/newsletter.jsx";
import Articulos from "/src/assets/complements/articulos.jsx";
import "/src/assets/CSS/styles.css";
import { proyectosJs as proyectosData } from "/src/assets/data/proyectos.js";

export default function App() {
  const [proyectos] = useState(proyectosData); 
  const [busqueda, setBusqueda] = useState("");   //Uso de State para filtrar los proyectos según lo que el usuario escriba.

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
    document.title = `DigitalEvolution · ${proyectos.length} projectes`;  //Uso de effect para actualizar el titulo de la pagina segun la cantidad de proyectos en data.
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