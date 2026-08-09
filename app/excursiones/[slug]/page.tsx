import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BookingBand } from "../../components/BookingBand";
import { tours as fallbackTours } from "../../content/site";
import { getPublicTour, getSiteSettings, paymentNotes } from "../../lib/content";

export function generateStaticParams() {
  return fallbackTours.map((tour) => ({ slug: tour.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const tour = await getPublicTour(slug);
  if (!tour) return {};

  return {
    title: tour.name,
    description: tour.shortDescription,
    alternates: { canonical: `/excursiones/${tour.slug}` },
    openGraph: {
      title: `${tour.name} | Capitán Gringo`,
      description: tour.shortDescription,
    },
  };
}

export default async function TourPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [tour, site] = await Promise.all([getPublicTour(slug), getSiteSettings()]);
  if (!tour) notFound();

  const message = encodeURIComponent(`Hola Capitán Gringo, quiero información para reservar ${tour.name}.`);

  return (
    <main>
      <section className="tour-hero">
        <img className="tour-hero-bg" src={tour.heroImage} alt={tour.imageAlt} width="1600" height="700" fetchPriority="high" />
        <div className="tour-hero-shade" />
        <div className="shell tour-hero-content">
          <Link className="back-link" href="/excursiones">← Todas las excursiones</Link>
          <span className="eyebrow eyebrow-light">{tour.eyebrow}</span>
          <h1>{tour.name}</h1>
          <p>{tour.shortDescription}</p>
          <div className="tour-hero-actions">
            <Link href={`/reservar?tour=${encodeURIComponent(tour.name)}`} className="button button-primary button-large">{tour.bookingButtonText ?? "Reservar excursión"}</Link>
            <a href={`https://wa.me/${site.whatsapp}?text=${message}`} target="_blank" rel="noreferrer" className="button button-glass button-large">{tour.whatsappButtonText ?? "Consultar por WhatsApp"}</a>
          </div>
        </div>
      </section>

      <section className="tour-facts-wrap">
        <div className="shell tour-facts">
          <div><span>Destino</span><strong>{tour.destination}</strong></div>
          <div><span>Duración</span><strong>{tour.duration}</strong></div>
          <div><span>Salidas</span><strong>{tour.schedule}</strong></div>
          <div><span>Precio desde</span><strong>{tour.priceFrom}</strong><small>{tour.priceNote}</small></div>
        </div>
      </section>

      <section className="section shell tour-intro-grid">
        <div>
          <span className="eyebrow">La experiencia</span>
          <h2>Un día para recordar.</h2>
        </div>
        <div className="tour-intro-copy">
          <p className="lead">{tour.intro}</p>
          <div className="tag-row">{tour.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
        </div>
      </section>

      <section className="itinerary-section">
        <div className="shell itinerary-grid">
          <div className="itinerary-sticky">
            <span className="eyebrow">Paso a paso</span>
            <h2>Itinerario de la excursión</h2>
            {(tour.pickup || tour.returnTime) && (
              <div className="schedule-bubble">
                <strong>Horario publicado</strong>
                {tour.pickup && <span>{tour.pickup}</span>}
                {tour.returnTime && <span>{tour.returnTime}</span>}
              </div>
            )}
          </div>
          <ol className="itinerary-list">
            {tour.itinerary.map((stop, index) => (
              <li key={stop.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div><h3>{stop.title}</h3><p>{stop.description}</p></div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section shell tour-details-grid">
        <div className="includes-panel">
          <span className="eyebrow">Todo preparado</span>
          <h2>Qué incluye</h2>
          <ul className="check-list large-check-list">
            {tour.includes.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
        <aside className="price-panel">
          <span className="eyebrow eyebrow-navy">Tarifas publicadas</span>
          <h2>Precios</h2>
          <div className="price-list">
            {tour.prices.map((price) => (
              <div key={price.label}><span>{price.label}</span><strong>{price.value}</strong></div>
            ))}
          </div>
          {tour.bookingNote && <p className="price-note">{tour.bookingNote}</p>}
          {tour.slug !== "isla-saona-privado" && (
            <details className="payment-details">
              <summary>Formas de pago publicadas</summary>
              <ul>{paymentNotes.map((note) => <li key={note}>{note}</li>)}</ul>
            </details>
          )}
          <Link href={`/reservar?tour=${encodeURIComponent(tour.name)}`} className="button button-primary button-large full-button">{tour.requestButtonText ?? "Solicitar reserva"}</Link>
        </aside>
      </section>

      <section className="recommendations-section">
        <div className="shell recommendations-grid">
          <div>
            <span className="eyebrow">Antes de salir</span>
            <h2>Recomendaciones</h2>
            <ul>{tour.recommendations.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
          {tour.restrictions && (
            <div className="restrictions-card">
              <span>Importante</span>
              <h3>Ten en cuenta</h3>
              <ul>{tour.restrictions.map((item) => <li key={item}>{item}</li>)}</ul>
            </div>
          )}
        </div>
      </section>

      <section className="section shell tour-gallery-section">
        <div className="section-heading split-heading">
          <div><span className="eyebrow">Una mirada al recorrido</span><h2>Imágenes de la experiencia.</h2></div>
          <Link className="text-link" href="/galeria">Ver galería completa <span>→</span></Link>
        </div>
        <div className={`tour-gallery tour-gallery-${tour.gallery.length}`}>
          {tour.gallery.map((image) => <img key={image.src} src={image.src} alt={image.alt} width="1000" height="700" loading="lazy" />)}
        </div>
      </section>

      <BookingBand tourName={tour.name} site={site} />
    </main>
  );
}
