import Link from "next/link";
import type { SiteInfo } from "../lib/content";

export function MobileActionBar({ site }: { site: SiteInfo }) {
  const message = encodeURIComponent("Hola Capitán Gringo, quiero información sobre sus excursiones.");

  return (
    <nav className="mobile-action-bar" aria-label="Acciones de reserva">
      <Link href="/reservar" className="mobile-action-reserve">Reservar</Link>
      <a href={`https://wa.me/${site.whatsapp}?text=${message}`} target="_blank" rel="noreferrer">
        WhatsApp
      </a>
    </nav>
  );
}
