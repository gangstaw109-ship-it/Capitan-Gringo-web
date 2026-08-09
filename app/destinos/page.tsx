import type { Metadata } from "next";
import Link from "next/link";
import { BookingBand } from "../components/BookingBand";
import { destinations, tours } from "../content/site";

export const metadata: Metadata = {
  title: "Destinos",
  description: "Descubre Isla Saona, Isla Catalina, Río Chavón, Bayahibe, Punta Cana y Santo Domingo con Capitán Gringo.",
  alternates: { canonical: "/destinos" },
};

export default function DestinationsPage() {
  return (
    <main>
      <section className="page-hero destinations-hero">
        <div className="shell narrow-page-hero">
          <span className="eyebrow eyebrow-navy">República Dominicana</span>
          <h1>Del río a la isla. Del pueblo al mar.</h1>
          <p>Una guía visual de los lugares presentes en los recorridos publicados por Capitán Gringo.</p>
        </div>
      </section>

      <section className="section shell destination-list">
        {destinations.map((destination, index) => {
          const related = tours.filter((tour) => tour.destination.includes(destination.name) || tour.shortDescription.includes(destination.name));
          return (
            <article className="destination-row" key={destination.name}>
              <div className="destination-row-image">
                <img src={destination.image} alt={`Paisaje de ${destination.name}`} width="1024" height="720" loading={index < 2 ? "eager" : "lazy"} />
                <span>0{index + 1}</span>
              </div>
              <div className="destination-row-copy">
                <span className="eyebrow">Destino</span>
                <h2>{destination.name}</h2>
                <p>{destination.description}</p>
                {related.length > 0 && (
                  <div>
                    <small>Excursiones relacionadas</small>
                    {related.slice(0, 3).map((tour) => <Link key={tour.slug} href={`/excursiones/${tour.slug}`}>{tour.name} <span>→</span></Link>)}
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </section>

      <BookingBand />
    </main>
  );
}

