import Link from "next/link";
import type { SiteInfo } from "../lib/content";

export function Footer({ site }: { site: SiteInfo }) {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div className="footer-brand">
          <img src="/images/logo/logo-header.png" alt="Capitán Gringo Transporte Marítimo" width="400" height="55" />
          <p>
            Excursiones con grupos reducidos desde Bayahibe hacia los paisajes más especiales de la República Dominicana.
          </p>
        </div>

        <div>
          <p className="footer-title">Explora</p>
          <Link href="/excursiones">Excursiones</Link>
          <Link href="/destinos">Destinos</Link>
          <Link href="/galeria">Galería</Link>
          <Link href="/nosotros">Quiénes somos</Link>
        </div>

        <div>
          <p className="footer-title">Contacto</p>
          <a href={`tel:${site.phoneHref}`}>{site.phoneDisplay}</a>
          <a href={`mailto:${site.email}`}>{site.email}</a>
          <span>{site.officeHours}</span>
        </div>

        <div>
          <p className="footer-title">Síguenos</p>
          <a href={site.facebook} target="_blank" rel="noreferrer">
            Facebook
          </a>
          <a href={site.tripadvisor} target="_blank" rel="noreferrer">
            Opiniones en Tripadvisor
          </a>
          <Link href="/reservar">Reserva por WhatsApp</Link>
        </div>
      </div>
      <div className="shell footer-bottom">
        <span>© {new Date().getFullYear()} Capitán Gringo · {site.legalName}</span>
        <span>Playa de los Embarcadero de Bayahibe</span>
      </div>
    </footer>
  );
}
