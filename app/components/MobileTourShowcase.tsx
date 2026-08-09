"use client";

import Link from "next/link";
import { useRef } from "react";
import type { Tour } from "../content/site";

type MobileTour = Pick<Tour, "slug" | "name" | "destination" | "cardImage" | "imageAlt" | "cardImageAlt" | "priceFrom">;

export function MobileTourShowcase({ tours }: { tours: MobileTour[] }) {
  const railRef = useRef<HTMLDivElement>(null);

  const move = (direction: -1 | 1) => {
    const rail = railRef.current;
    if (!rail) return;
    rail.scrollBy({ left: direction * rail.clientWidth * 0.78, behavior: "smooth" });
  };

  return (
    <div className="mobile-tour-showcase" aria-label="Excursiones imprescindibles">
      <span className="mobile-tour-kicker">Tours imprescindibles</span>
      <div className="mobile-tour-rail" ref={railRef}>
        {tours.map((tour) => (
          <Link className="mobile-tour-card" href={`/excursiones/${tour.slug}`} key={tour.slug}>
            <img src={tour.cardImage} alt={tour.cardImageAlt ?? tour.imageAlt} width="900" height="1100" />
            <span className="mobile-tour-card-copy">
              <small>{tour.destination}</small>
              <strong>{tour.name}</strong>
              <em>Desde {tour.priceFrom}</em>
            </span>
          </Link>
        ))}
      </div>
      <div className="mobile-tour-controls">
        <button type="button" onClick={() => move(-1)} aria-label="Excursión anterior">←</button>
        <button type="button" onClick={() => move(1)} aria-label="Excursión siguiente">→</button>
        <Link href="/excursiones">Ver todas</Link>
      </div>
    </div>
  );
}
