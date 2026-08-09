import type { Metadata } from "next";
import Link from "next/link";
import { BookingBand } from "./components/BookingBand";
import { MobileTourShowcase } from "./components/MobileTourShowcase";
import { TourCard } from "./components/TourCard";
import { destinations, getHomepageContent, getPublicFaqs, getPublicTours, getSiteSettings } from "./lib/content";

export const metadata: Metadata = {
  title: { absolute: "Excursiones en Isla Saona y Punta Cana | Capitán Gringo" },
  description:
    "Excursiones en grupos reducidos a Isla Saona, Catalina, Río Chavón, Santo Domingo, Samaná y más desde Punta Cana y Bayahibe.",
  alternates: { canonical: "/" },
};

export default async function Home() {
  const [content, faqs, tours, site] = await Promise.all([
    getHomepageContent(),
    getPublicFaqs(),
    getPublicTours(),
    getSiteSettings(),
  ]);
  const featuredTours = tours.filter((tour) => tour.featured);

  return (
    <main>
      <section className="home-hero">
        <div className="shell hero-grid">
          <div className="hero-copy">
            <span className="eyebrow eyebrow-navy">{content.hero.eyebrow}</span>
            <h1>{content.hero.title}</h1>
            <p>{content.hero.description}</p>
            <div className="hero-actions">
              <Link href="/excursiones" className="button button-primary button-large">{content.hero.primaryButton}</Link>
              <a
                href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent("Hola Capitán Gringo, quiero información para elegir una excursión.")}`}
                target="_blank"
                rel="noreferrer"
                className="button button-secondary button-large"
              >
                {content.hero.whatsappButton}
              </a>
            </div>
            <div className="hero-proof" aria-label="Datos principales">
              {content.hero.proof.map((item) => <div key={item.title}><strong>{item.title}</strong><span>{item.text}</span></div>)}
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
        {content.quickBooking.steps.map((step) => <div key={step.number}><span>{step.number}</span><p><strong>{step.title}</strong> {step.text}</p></div>)}
        <Link href="/reservar" className="button button-navy">{content.quickBooking.button}</Link>
      </section>

      <section className="section shell featured-section">
        <div className="section-heading split-heading">
          <div>
            <span className="eyebrow">{content.featured.eyebrow}</span>
            <h2>{content.featured.title}</h2>
          </div>
          <p>
            {content.featured.description}
          </p>
        </div>
        <div className="tour-grid featured-grid">
          {featuredTours.map((tour, index) => <TourCard key={tour.slug} tour={tour} priority={index === 0} />)}
        </div>
        <div className="center-action">
          <Link href="/excursiones" className="text-link">{content.featured.allToursPrefix} {tours.length} {content.featured.allToursSuffix} <span>→</span></Link>
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
            <span className="eyebrow">{content.story.eyebrow}</span>
            <h2>{content.story.title}</h2>
            <p>{content.story.description}</p>
            <ul className="check-list">
              {content.story.points.map((point) => <li key={point}>{point}</li>)}
            </ul>
            <Link href="/nosotros" className="button button-secondary-navy">{content.story.button}</Link>
          </div>
        </div>
      </section>

      <section className="section destinations-preview">
        <div className="shell">
          <div className="section-heading split-heading">
            <div>
              <span className="eyebrow">{content.destinations.eyebrow}</span>
              <h2>{content.destinations.title}</h2>
            </div>
            <Link href="/destinos" className="text-link">{content.destinations.button} <span>→</span></Link>
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
            <span className="eyebrow eyebrow-navy">{content.trust.eyebrow}</span>
            <h2>{content.trust.title}</h2>
            <p>{content.trust.description}</p>
          </div>
          {content.trust.cards.map((card, index) => <div className="trust-card" key={card.title}><span>0{index + 1}</span><h3>{card.title}</h3><p>{card.text}</p></div>)}
        </div>
      </section>

      <section className="section shell home-gallery">
        <div className="section-heading split-heading">
          <div><span className="eyebrow">{content.gallery.eyebrow}</span><h2>{content.gallery.title}</h2></div>
          <Link href="/galeria" className="text-link">{content.gallery.button} <span>→</span></Link>
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
            <span className="eyebrow eyebrow-navy">{content.reviews.eyebrow}</span>
            <h2>{content.reviews.title}</h2>
            <p>{content.reviews.description}</p>
          </div>
          <a href={site.tripadvisor} target="_blank" rel="noreferrer" className="button button-navy button-large">{content.reviews.button}</a>
        </div>
      </section>

      <section className="section shell faq-section">
        <div className="faq-heading">
          <span className="eyebrow">{content.faq.eyebrow}</span>
          <h2>{content.faq.title}</h2>
          <p>{content.faq.description}</p>
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

      <BookingBand site={site} />
    </main>
  );
}
