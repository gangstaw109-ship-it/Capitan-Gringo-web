import type { Metadata } from "next";
import { SiteShell } from "./components/SiteShell";
import { getSiteSettings } from "./lib/content";
import "./globals.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.saona-tours.com"),
  title: {
    default: "Capitán Gringo | Excursiones desde Bayahibe y Punta Cana",
    template: "%s | Capitán Gringo",
  },
  description:
    "Excursiones con grupos reducidos a Isla Saona, Isla Catalina, Río Chavón y otros destinos de República Dominicana.",
  keywords: ["Capitán Gringo", "excursiones Isla Saona", "excursiones Bayahibe", "excursiones Punta Cana"],
  openGraph: {
    type: "website",
    locale: "es_DO",
    siteName: "Capitán Gringo",
    title: "Capitán Gringo | El Caribe que viniste a vivir",
    description: "Excursiones locales con grupos reducidos desde Bayahibe y Punta Cana.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Capitán Gringo — El Caribe que viniste a vivir" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Capitán Gringo | El Caribe que viniste a vivir",
    description: "Excursiones locales con grupos reducidos desde Bayahibe y Punta Cana.",
    images: ["/og.png"],
  },
  icons: {
    icon: "/images/logo/capitan-gringo.png",
    shortcut: "/images/logo/capitan-gringo.png",
  },
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const site = await getSiteSettings();
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TouristInformationCenter",
    name: site.name,
    legalName: site.legalName,
    url: "https://www.saona-tours.com",
    telephone: site.phoneDisplay,
    email: site.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Playa de los Embarcadero de Bayahibe",
      addressRegion: "La Altagracia",
      addressCountry: "DO",
    },
    sameAs: [site.facebook, site.tripadvisor],
  };

  return (
    <html lang="es">
      <body>
        <SiteShell site={site} structuredData={structuredData}>{children}</SiteShell>
      </body>
    </html>
  );
}
