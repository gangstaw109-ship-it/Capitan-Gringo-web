import type { Metadata } from "next";
import Link from "next/link";
import { BookingBand } from "./components/BookingBand";
import { MobileTourShowcase } from "./components/MobileTourShowcase";
import { TourCard } from "./components/TourCard";
import { destinations, featuredTours, site, tours } from "./content/site";

export const metadata: Metadata = {
  title: { absolute: "Excursiones en Isla Saona y Punta Cana | Capitán Gringo" },
  description:
    "Excursiones en grupos reducidos a Isla Saona, Catalina, Río Chavón, Santo Domingo, Samaná y más desde Punta Cana y Bayahibe.",
  alternates: { canonical: "/" },
};

const faqs = [
  {
    question: "¿Cómo se hace una reserva?",
    answer:
      "Envía el nombre de la reserva, teléfono disponible, hotel, número de adultos y niños, fechas de llegada y salida, y la excursión elegida. Puedes hacerlo desde nuestro formulario, que prepara el mensaje para WhatsApp.",
  },
  {
    question: "¿Las excursiones incluyen traslado?",
    answer:
      "Las excursiones incluyen traslado de ida y vuelta desde el hotel. Cada ficha detalla los puntos o zonas disponibles para ese recorrido.",
  },
  {
    question: "¿Cómo se pagan las excursiones?",
    answer:
      "Los precios publicados corresponden a pago en efectivo. Los pagos con tarjeta tienen un cargo del 10% y los pagos por PayPal, un 6%.",
  },
  {
    question: "¿Hay precios para niños?",
    answer:
      "Depende de la excursión. Saona Completa e Isla Catalina publican entrada gratuita hasta 2 años y mitad de precio de 3 a 11 años. Otras experiencias muestran sus edades y tarifas en la ficha correspondiente.",
  },
];

export default function Home() {
  return (
    <main>
      <section className="home-hero">
        <div className="shell hero-grid">
          <div className="hero-copy">
            <span className="eyebrow eyebrow-navy">Excursiones desde Bayahibe y Punta Cana</span>
            <h1>El Caribe que viniste a vivir.</h1>
            <p>
              Descubre Isla Saona y la República Dominicana con un equipo local, grupos reducidos y una forma más cercana de viajar.
            </p>
            <div className="hero-actions">
              <Link href="/excursiones" className="button button-primary button-large">Ver excursiones</Link>
              <a
                href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent("Hola Capitán Gringo, quiero información para elegir una excursión.")}`}
                target="_blank"
                rel="noreferrer"
                className="button button-secondary button-large"
              >
                Escribir por WhatsApp
              </a>
            </div>
            <div className="hero-proof" aria-label="Datos principales">
              <div><strong>Grupos reducidos</strong><span>Una experiencia más personal</span></div>
              <div><strong>Equipo local</strong><span>Especialistas de Bayahibe</span></div>
            </div>
          </div>

          <MobileTourShowcase tours={featuredTours} />

          <div className="hero-visual" aria-label="Paisajes de las excursiones de Capitán Gringo">
            <figure className="hero-photo hero-photo-main">
              <img src="/images/saona/mano-juan.webp" alt="Palmeras y casas en el pueblo de Mano Juan, Isla Saona" width="1600" height="900" fetchPriority="high" />
            </figure>
            <figure className="hero-photo hero-photo-top">
              <img src="/images/boats/lancha.webp" alt="Lancha rápida de Capitán Gringo navegando en aguas caribeñas" width="1000" height="667" fetchPriority="high" />
            </figure>
            <div className="hero-note">
              <span>Desde</span>
              <strong>Bayahibe</strong>
              <small>República Dominicana</small>
            </div>
          </div>
        </div>
        <div className="hero-wave" aria-hidden="true" />
      </section>

      <section className="quick-book shell" aria-label="Acceso rápido a la reserva">
        <div><span>01</span><p><strong>Elige</strong> tu excursión</p></div>
        <div><span>02</span><p><strong>Envíanos</strong> tus fechas</p></div>
        <div><span>03</span><p><strong>Confirma</strong> por WhatsApp</p></div>
        <Link href="/reservar" className="button button-navy">Comenzar reserva →</Link>
      </section>

      <section className="section shell featured-section">
        <div className="section-heading split-heading">
          <div>
            <span className="eyebrow">Empieza por aquí</span>
            <h2>Tres formas de sentir el Caribe.</h2>
          </div>
          <p>
            Naturaleza, privacidad o mundo submarino. Las experiencias destacadas reúnen los paisajes que definen a Capitán Gringo.
          </p>
        </div>
        <div className="tour-grid featured-grid">
          {featuredTours.map((tour, index) => <TourCard key={tour.slug} tour={tour} priority={index === 0} />)}
        </div>
        <div className="center-action">
          <Link href="/excursiones" className="text-link">Explorar las {tours.length} excursiones <span>→</span></Link>
        </div>
      </section>

      <section className="story-section">
        <div className="shell story-grid">
          <div className="story-collage">
            <img className="story-image-large" src="/images/boats/equipo.webp" alt="Equipo de Capitán Gringo en Bayahibe" width="1000" height="667" loading="lazy" />
            <img className="story-image-small" src="/images/boats/catamaran-capitan-gringo.webp" alt="Embarcación de Capitán Gringo" width="1000" height="750" loading="lazy" />
            <span className="story-stamp">Nacidos<br />en Bayahibe</span>
          </div>
          <div className="story-copy">
            <span className="eyebrow">Una historia local</span>
            <h2>Capitán de nuestro primer bote. Nombre de toda una experiencia.</h2>
            <p>
              Capitán Gringo nació del apodo de su fundador, nativo de Bayahibe y capitán del primer bote de la compañía. Hoy, el equipo de Coligrin Tours sigue compartiendo el parque nacional con atención cercana, embarcaciones seguras y recorridos que llegan más lejos.
            </p>
            <ul className="check-list">
              <li>Especialistas en Isla Saona y su entorno</li>
              <li>Embarcaciones nuevas, seguras y aseguradas</li>
              <li>Trato personalizado: clientes que se sienten como familia</li>
            </ul>
            <Link href="/nosotros" className="button button-secondary-navy">Conoce nuestra historia</Link>
          </div>
        </div>
      </section>

      <section className="section destinations-preview">
        <div className="shell">
          <div className="section-heading split-heading">
            <div>
              <span className="eyebrow">Destinos</span>
              <h2>Un país. Muchos mundos.</h2>
            </div>
            <Link href="/destinos" className="text-link">Ver todos los destinos <span>→</span></Link>
          </div>
          <div className="destination-rail">
            {destinations.slice(0, 4).map((destination, index) => (
              <article className={`destination-tile destination-tile-${index + 1}`} key={destination.name}>
                <img src={destination.image} alt={`Paisaje de ${destination.name}`} width="1024" height="700" loading="lazy" />
                <div><span>0{index + 1}</span><h3>{destination.name}</h3></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="trust-section">
        <div className="shell trust-grid">
          <div className="trust-intro">
            <span className="eyebrow eyebrow-navy">Viaja con confianza</span>
            <h2>Pequeños grupos. Grandes recuerdos.</h2>
            <p>La diferencia está en conocer el mar, cuidar cada recorrido y estar disponible cuando necesitas ayuda.</p>
          </div>
          <div className="trust-card"><span>01</span><h3>Atención directa</h3><p>Reserva con el equipo de Capitán Gringo por teléfono, correo o WhatsApp.</p></div>
          <div className="trust-card"><span>02</span><h3>Traslado incluido</h3><p>La compañía informa traslados de ida y vuelta desde el hotel en sus excursiones.</p></div>
          <div className="trust-card"><span>03</span><h3>Seguros vigentes</h3><p>Pólizas de responsabilidad civil y de embarcaciones contratadas con SURA.</p></div>
        </div>
      </section>

      <section className="section shell home-gallery">
        <div className="section-heading split-heading">
          <div><span className="eyebrow">Momentos reales</span><h2>Así se ve un día con nosotros.</h2></div>
          <Link href="/galeria" className="text-link">Abrir galería <span>→</span></Link>
        </div>
        <div className="home-gallery-grid">
          <img src="/images/saona/piscina-natural.webp" alt="Familia disfrutando la Piscina Natural" width="800" height="583" loading="lazy" />
          <img src="/images/rio-chavon/rio-chavon.webp" alt="Río Chavón rodeado de vegetación" width="990" height="640" loading="lazy" />
          <img src="/images/samana/cayo-levantado.webp" alt="Vista aérea de Cayo Levantado" width="640" height="480" loading="lazy" />
        </div>
      </section>

      <section className="reviews-band">
        <div className="shell reviews-inner">
          <div className="review-mark" aria-hidden="true">“</div>
          <div>
            <span className="eyebrow eyebrow-navy">Opiniones verificables</span>
            <h2>Lee lo que otros viajeros cuentan fuera de esta web.</h2>
            <p>No reproducimos testimonios sin su fuente. Consulta directamente el perfil de Capitán Gringo en Tripadvisor.</p>
          </div>
          <a href={site.tripadvisor} target="_blank" rel="noreferrer" className="button button-navy button-large">Ver opiniones externas</a>
        </div>
      </section>

      <section className="section shell faq-section">
        <div className="faq-heading">
          <span className="eyebrow">Antes de reservar</span>
          <h2>Respuestas claras para viajar tranquilo.</h2>
          <p>¿Te queda alguna duda? Escríbenos directamente y te ayudamos a elegir.</p>
        </div>
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <details key={faq.question} open={index === 0}>
              <summary><span>{faq.question}</span><i aria-hidden="true">+</i></summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <BookingBand />
    </main>
  );
}
