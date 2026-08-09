import Link from "next/link";

const cards = [
  { href: "/admin/inicio", icon: "✎", title: "Editar inicio", text: "Cambia títulos, descripciones, botones y preguntas frecuentes." },
  { href: "/admin/excursiones", icon: "☼", title: "Editar excursiones", text: "Actualiza información, precios, visibilidad y fotografías." },
  { href: "/admin/galerias", icon: "▦", title: "Galerías", text: "Agrega, reemplaza, ordena o elimina fotografías." },
  { href: "/admin/contacto", icon: "☎", title: "Contacto", text: "Cambia WhatsApp, teléfono, correo, dirección y redes." },
];

export default function AdminDashboard() {
  return (
    <div className="admin-page">
      <header className="admin-page-heading">
        <div><span>Contenido de la web</span><h1>Panel de administración</h1><p>¿Qué quieres actualizar hoy?</p></div>
        <a className="admin-secondary-button" href="/" target="_blank" rel="noreferrer">Ver página ↗</a>
      </header>
      <section className="admin-dashboard-grid" aria-label="Accesos de edición">
        {cards.map((card) => (
          <Link href={card.href} className="admin-dashboard-card" key={card.href}>
            <span className="admin-dashboard-icon" aria-hidden="true">{card.icon}</span>
            <h2>{card.title}</h2>
            <p>{card.text}</p>
            <strong>Abrir <span>→</span></strong>
          </Link>
        ))}
      </section>
      <aside className="admin-help-card"><span aria-hidden="true">✓</span><div><strong>Tus cambios se publican al guardar.</strong><p>Usa “Ver página” para comprobarlos en una pestaña nueva.</p></div></aside>
    </div>
  );
}

