import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found shell">
      <span className="eyebrow">404</span>
      <h1>Esta playa no está en el recorrido.</h1>
      <p>La página que buscas no existe o cambió de dirección.</p>
      <Link className="button button-primary button-large" href="/">Volver al inicio</Link>
    </main>
  );
}

