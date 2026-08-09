"use client";

import Link from "next/link";
import { LanguageSwitcher } from "./LanguageSwitcher";

const navigation = [
  { href: "/", label: "Inicio" },
  { href: "/excursiones", label: "Excursiones" },
  { href: "/destinos", label: "Destinos" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/galeria", label: "Galería" },
];

export function Header() {
  const closeMobileMenu = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const menu = event.currentTarget.closest("details");
    if (menu) menu.open = false;
  };

  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link href="/" className="brand" aria-label="Capitán Gringo, inicio">
          <img src="/images/logo/logo-header.png" alt="Capitán Gringo Transporte Marítimo" width="400" height="55" />
        </Link>

        <nav className="desktop-nav" aria-label="Navegación principal">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <LanguageSwitcher />

        <Link href="/reservar" className="button button-primary header-cta">
          Reservar ahora
        </Link>

        <details className="mobile-menu">
          <summary aria-label="Abrir menú">
            <span />
            <span />
            <span />
          </summary>
          <nav aria-label="Navegación móvil">
            {navigation.map((item) => (
              <Link key={item.href} href={item.href} onClick={closeMobileMenu}>
                {item.label}
              </Link>
            ))}
            <Link href="/reservar" className="button button-primary" onClick={closeMobileMenu}>
              Reservar ahora
            </Link>
          </nav>
        </details>
      </div>
    </header>
  );
}
