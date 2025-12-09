import { useState } from 'react'
import './App.css'
import Header from "/src/assets/complements/header.jsx"
import Hero from "/src/assets/complements/hero.jsx"
import Contacto from "/src/assets/complements/contacto.jsx"
import Footer from "/src/assets/complements/footer.jsx"
import Newsletter from "/src/assets/complements/newsletter.jsx"
import Proyectos from "/src/assets/complements/proyectos.jsx"
import "/src/assets/CSS/styles.css"

export default function App() {
  const [count, setCount] = useState(0)

  return (
    <body>
      <Header />
      <main>
        <Hero />
        <Proyectos />
        <Contacto />
        <Newsletter />
      </main>
      <Footer />
    </body>
  )
}