import Link from "next/link";
import type { Tour } from "../content/site";

export function TourCard({ tour, priority = false }: { tour: Tour; priority?: boolean }) {
  return (
    <article className="tour-card">
      <Link href={`/excursiones/${tour.slug}`} className="tour-card-image" aria-label={`Ver ${tour.name}`}>
        <img
          src={tour.cardImage}
          alt={tour.cardImageAlt ?? tour.imageAlt}
          width="800"
          height="600"
          loading={priority ? "eager" : "lazy"}
        />
        <span className="tour-card-destination">{tour.destination}</span>
      </Link>
      <div className="tour-card-content">
        <div className="tour-card-meta">
          <span>{tour.duration}</span>
          <span>{tour.schedule}</span>
        </div>
        <h3><Link href={`/excursiones/${tour.slug}`}>{tour.name}</Link></h3>
        <p>{tour.shortDescription}</p>
        <div className="tour-card-footer">
          <div>
            <small>Desde</small>
            <strong>{tour.priceFrom}</strong>
            <small>{tour.priceNote}</small>
          </div>
          <Link href={`/excursiones/${tour.slug}`} className="circle-link" aria-label={`Descubrir ${tour.name}`}>
            →
          </Link>
        </div>
      </div>
    </article>
  );
}
