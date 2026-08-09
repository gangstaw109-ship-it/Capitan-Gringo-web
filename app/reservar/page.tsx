import type { Metadata } from "next";
import { ReservationForm } from "../components/ReservationForm";
import { site } from "../content/site";

export const metadata: Metadata = {
  title: "Reservar excursión",
  description: "Prepara tu solicitud de reserva y envíala directamente al WhatsApp de Capitán Gringo.",
  alternates: { canonical: "/reservar" },
};

export default async function BookingPage({ searchParams }: { searchParams: Promise<{ tour?: string }> }) {
  const { tour = "" } = await searchParams;

  return (
    <main className="booking-page">
      <section className="page-hero booking-hero">
        <div className="shell booking-hero-grid">
          <div>
            <span className="eyebrow eyebrow-navy">Reserva directa</span>
            <h1>Un mensaje. Todo listo para comenzar.</h1>
            <p>
              Completa tus datos de viaje. Prepararemos el mensaje y lo abrirás directamente en WhatsApp para confirmar.
            </p>
          </div>
          <div className="contact-mini-card">
            <span>También puedes contactar</span>
            <a href={`tel:${site.phoneHref}`}>{site.phoneDisplay}</a>
            <a href={`mailto:${site.email}`}>{site.email}</a>
            <small>{site.officeHours}</small>
          </div>
        </div>
      </section>

      <section className="section shell booking-content-grid">
        <div className="booking-form-wrap">
          <div className="section-heading">
            <span className="eyebrow">Datos de la solicitud</span>
            <h2>Cuéntanos sobre tu viaje.</h2>
          </div>
          <ReservationForm defaultTour={tour} />
        </div>
        <aside className="booking-aside">
          <div className="booking-aside-image">
            <img src="/images/saona/piscina-natural.webp" alt="Familia disfrutando la piscina natural de Isla Saona" width="800" height="583" />
          </div>
          <div className="booking-aside-copy">
            <span>Qué ocurre después</span>
            <ol>
              <li><strong>Revisamos</strong> la excursión, fecha y zona de hotel.</li>
              <li><strong>Confirmamos</strong> disponibilidad y detalles directamente contigo.</li>
              <li><strong>Coordinamos</strong> la reserva según las condiciones publicadas para el tour.</li>
            </ol>
            <p>La solicitud no confirma automáticamente una plaza.</p>
          </div>
        </aside>
      </section>
    </main>
  );
}
