import type { Metadata } from "next";
import { BookingBand } from "../components/BookingBand";
import { getPublicGallery, getSiteSettings } from "../lib/content";

export const metadata: Metadata = {
  title: "Galería",
  description: "Fotografías de las excursiones, embarcaciones y destinos de Capitán Gringo en República Dominicana.",
  alternates: { canonical: "/galeria" },
};

export default async function GalleryPage() {
  const [galleryImages, site] = await Promise.all([getPublicGallery(), getSiteSettings()]);
  return (
    <main>
      <section className="page-hero gallery-hero">
        <div className="shell narrow-page-hero">
          <span className="eyebrow eyebrow-navy">Momentos de nuestras excursiones</span>
          <h1>Recuerdos con sal, sol y arena.</h1>
          <p>Una selección de imágenes reales publicadas por Capitán Gringo a lo largo de sus excursiones.</p>
        </div>
      </section>

      <section className="section shell gallery-grid">
        {galleryImages.map((image, index) => (
          <figure key={image.src} className={`gallery-item gallery-item-${(index % 6) + 1}`}>
            <img src={image.src} alt={image.alt} width="1000" height="720" loading={index < 3 ? "eager" : "lazy"} />
            <figcaption>{image.alt}</figcaption>
          </figure>
        ))}
      </section>

      <BookingBand site={site} />
    </main>
  );
}
