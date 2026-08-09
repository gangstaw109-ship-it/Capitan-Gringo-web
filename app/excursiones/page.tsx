import type { Metadata } from "next";
import { BookingBand } from "../components/BookingBand";
import { TourCard } from "../components/TourCard";
import { getPublicTours, getSiteSettings } from "../lib/content";

export const metadata: Metadata = {
  title: "Excursiones",
  description:
    "Catálogo de excursiones de Capitán Gringo: Isla Saona, Catalina y Río Chavón, Santo Domingo, Buggies, Safari y Samaná.",
  alternates: { canonical: "/excursiones" },
};

export default async function ExcursionsPage() {
  const [site, tours] = await Promise.all([getSiteSettings(), getPublicTours()]);
  return (
    <main>
      <section className="page-hero catalog-hero">
        <div className="shell page-hero-grid">
          <div>
            <span className="eyebrow eyebrow-navy">Catálogo completo</span>
            <h1>Tu próxima excursión empieza aquí.</h1>
            <p>
              Compara destinos, duración y precios. En cada ficha encontrarás el recorrido completo y sus condiciones.
            </p>
          </div>
          <div className="catalog-hero-card">
            <span>¿No sabes cuál elegir?</span>
            <h2>Cuéntanos cómo viajas.</h2>
            <p>Te ayudamos por WhatsApp a encontrar el recorrido que mejor encaja con tu grupo.</p>
            <a
              href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent("Hola Capitán Gringo, necesito ayuda para elegir una excursión.")}`}
              target="_blank"
              rel="noreferrer"
              className="button button-primary"
            >
              Pedir recomendación
            </a>
          </div>
        </div>
      </section>

      <section className="section shell">
        <div className="catalog-toolbar">
          <div><strong>{tours.length}</strong><span>experiencias publicadas</span></div>
          <p>Precios mostrados en dólares estadounidenses.</p>
        </div>
        <div className="tour-grid catalog-grid">
          {tours.map((tour, index) => <TourCard key={tour.slug} tour={tour} priority={index < 2} />)}
        </div>
      </section>

      <section className="info-ribbon">
        <div className="shell info-ribbon-grid">
          <div><span>01</span><h3>Revisa la ficha</h3><p>Itinerario, horario, inclusiones y recomendaciones.</p></div>
          <div><span>02</span><h3>Confirma tu zona</h3><p>Los precios pueden variar según el punto de recogida.</p></div>
          <div><span>03</span><h3>Reserva directamente</h3><p>Envía los datos solicitados al equipo por WhatsApp.</p></div>
        </div>
      </section>

      <BookingBand site={site} />
    </main>
  );
}
