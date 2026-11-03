// Las doce líneas verticales que se ven de lado a lado de la página.
// En pantallas pequeñas el CSS deja solo cuatro.
export default function Rejilla() {
  return (
    <div className="rejilla" aria-hidden="true">
      {Array.from({ length: 12 }, (_, i) => (
        <span key={i} />
      ))}
    </div>
  );
}
