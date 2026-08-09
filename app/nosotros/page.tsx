import type { Metadata } from "next";
import { BookingBand } from "../components/BookingBand";
import { site } from "../content/site";

export const metadata: Metadata = {
  title: "Quiénes somos",
  description: "Conoce la historia de Capitán Gringo y Coligrin Tours, empresa local de excursiones nacida en Bayahibe.",
  alternates: { canonical: "/nosotros" },
};

export default function AboutPage() {
  return (
    <main>
      <section className="about-hero">
        <div className="shell about-hero-grid">
          <div>
            <span className="eyebrow eyebrow-navy">Nuestra historia</span>
            <h1>Un capitán de Bayahibe. Una marca conocida en todo el Caribe.</h1>
            <p>
              Capitán Gringo es el nombre con el que viajeros de distintos países llegaron a conocer a una pequeña compañía local dedicada a explorar Isla Saona.
            </p>
          </div>
          <img src="/images/boats/equipo.webp" alt="Equipo de Capitán Gringo junto a sus embarcaciones" width="1000" height="667" fetchPriority="high" />
        </div>
      </section>

      <section className="section shell about-story-grid">
        <div>
          <span className="eyebrow">De dónde viene el nombre</span>
          <h2>Primero fue el apodo. Después, la confianza.</h2>
        </div>
        <div className="about-story-copy">
          <p className="lead">
            El fundador, nativo de Bayahibe, era conocido por el apodo de “Gringo”. Cuando comenzó el negocio, era el capitán del primer bote. Así nació el nombre Capitán Gringo.
          </p>
          <p>
            Con el tiempo, el nombre se hizo conocido entre viajeros españoles y se convirtió en la marca de las excursiones a Isla Saona. La compañía legalmente constituida se llama Coligrin Tours.
          </p>
          <p>
            El equipo se define como una compañía pequeña, especializada en excursiones con grupos reducidos por Isla Saona y el entorno del Parque Nacional del Este. También ayuda a sus clientes a coordinar otras excursiones cuando lo necesitan.
          </p>
        </div>
      </section>

      <section className="values-section">
        <div className="shell values-grid">
          <article><span>01</span><h3>Conocimiento local</h3><p>El negocio nace en Bayahibe, punto de salida hacia Isla Saona.</p></article>
          <article><span>02</span><h3>Grupos reducidos</h3><p>Recorridos diseñados para ofrecer una atención más personal.</p></article>
          <article><span>03</span><h3>Más lugares</h3><p>La compañía destaca que visita zonas a las que otros recorridos no llegan.</p></article>
          <article><span>04</span><h3>Embarcaciones seguras</h3><p>Lanchas y catamarán forman parte central de nuestra infraestructura.</p></article>
        </div>
      </section>

      <section className="section shell boats-section">
        <div className="section-heading split-heading">
          <div><span className="eyebrow">Nuestra base</span><h2>El mar es nuestra oficina.</h2></div>
          <p>Desde Playa de los Embarcadero de Bayahibe, el equipo coordina traslados y salidas hacia el parque nacional.</p>
        </div>
        <div className="boats-grid">
          <img src="/images/boats/lancha.webp" alt="Lancha rápida de Capitán Gringo" width="1000" height="667" loading="lazy" />
          <img src="/images/boats/catamaran-capitan-gringo.webp" alt="Embarcación de Capitán Gringo en la costa" width="1000" height="750" loading="lazy" />
        </div>
      </section>

      <section className="insurance-band">
        <div className="shell insurance-grid">
          <div><span className="eyebrow eyebrow-navy">Información publicada</span><h2>Seguros y ubicación</h2></div>
          <div className="insurance-card"><span>Responsabilidad civil</span><strong>SURA · Póliza 39755</strong></div>
          <div className="insurance-card"><span>Embarcaciones</span><strong>Póliza yate-390</strong></div>
          <div className="insurance-card"><span>Oficina central</span><strong>{site.address}</strong></div>
        </div>
      </section>

      <BookingBand />
    </main>
  );
}
