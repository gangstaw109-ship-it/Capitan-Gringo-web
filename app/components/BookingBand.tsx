import Link from "next/link";
import { site } from "../content/site";

export function BookingBand({ tourName }: { tourName?: string }) {
  const message = encodeURIComponent(
    tourName
      ? `Hola Capitán Gringo, quiero reservar ${tourName}.`
      : "Hola Capitán Gringo, quiero reservar una excursión.",
  );

  return (
    <section className="booking-band">
      <div className="shell booking-band-inner">
        <div>
          <span className="eyebrow">Reserva directa</span>
          <h2>Tu próxima historia empieza en Bayahibe.</h2>
          <p>Cuéntanos las fechas de tu viaje y te ayudamos a organizar la excursión.</p>
        </div>
        <div className="booking-actions">
          <Link href={tourName ? `/reservar?tour=${encodeURIComponent(tourName)}` : "/reservar"} className="button button-primary button-large">
            Reservar ahora
          </Link>
          <a href={`https://wa.me/${site.whatsapp}?text=${message}`} target="_blank" rel="noreferrer" className="button button-secondary button-large">
            Hablar por WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
