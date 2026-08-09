import type { SiteInfo } from "../lib/content";

export function WhatsAppFloat({ site }: { site: SiteInfo }) {
  const message = encodeURIComponent("Hola Capitán Gringo, quiero información sobre sus excursiones.");

  return (
    <a
      className="whatsapp-float"
      href={`https://wa.me/${site.whatsapp}?text=${message}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Hablar con Capitán Gringo por WhatsApp"
    >
      <span className="whatsapp-mark" aria-hidden="true">✆</span>
      <span>WhatsApp</span>
    </a>
  );
}
