"use client";

import { usePathname } from "next/navigation";
import type { SiteInfo } from "../lib/content";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { MobileActionBar } from "./MobileActionBar";
import { WhatsAppFloat } from "./WhatsAppFloat";

export function SiteShell({
  children,
  site,
  structuredData,
}: {
  children: React.ReactNode;
  site: SiteInfo;
  structuredData: Record<string, unknown>;
}) {
  const pathname = usePathname();

  if (pathname?.startsWith("/admin")) return <>{children}</>;

  return (
    <>
      <a className="skip-link" href="#contenido">Saltar al contenido</a>
      <Header />
      <div id="contenido">{children}</div>
      <Footer site={site} />
      <WhatsAppFloat site={site} />
      <MobileActionBar site={site} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    </>
  );
}

