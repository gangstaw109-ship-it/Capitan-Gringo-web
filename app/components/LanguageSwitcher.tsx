"use client";

import { useEffect, useState } from "react";

const languages = [
  { code: "es", label: "Español", short: "ES" },
  { code: "en", label: "English", short: "EN" },
  { code: "pt", label: "Português", short: "PT" },
  { code: "de", label: "Deutsch", short: "DE" },
  { code: "fr", label: "Français", short: "FR" },
  { code: "it", label: "Italiano", short: "IT" },
] as const;

type LanguageCode = (typeof languages)[number]["code"];

declare global {
  interface Window {
    google?: {
      translate?: {
        TranslateElement: new (options: Record<string, unknown>, elementId: string) => void;
      };
    };
    googleTranslateElementInit?: () => void;
  }
}

const STORAGE_KEY = "capitan-gringo-language";

function preferredLanguage(): LanguageCode {
  const saved = window.localStorage.getItem(STORAGE_KEY);
  if (languages.some((language) => language.code === saved)) return saved as LanguageCode;

  const browserLanguage = window.navigator.language.toLowerCase().split("-")[0];
  return languages.some((language) => language.code === browserLanguage)
    ? (browserLanguage as LanguageCode)
    : "es";
}

function triggerTranslation(language: LanguageCode, attempt = 0) {
  const translateSelect = document.querySelector<HTMLSelectElement>(".goog-te-combo");

  if (!translateSelect && attempt < 12) {
    window.setTimeout(() => triggerTranslation(language, attempt + 1), 250);
    return;
  }

  if (!translateSelect) return;
  translateSelect.value = language;
  translateSelect.dispatchEvent(new Event("change", { bubbles: true }));
}

export function LanguageSwitcher() {
  const [language, setLanguage] = useState<LanguageCode>("es");
  const selectedLanguage = languages.find((item) => item.code === language) ?? languages[0];

  useEffect(() => {
    const initialLanguage = preferredLanguage();
    window.setTimeout(() => setLanguage(initialLanguage), 0);

    const initialize = () => {
      if (!window.google?.translate?.TranslateElement) return;
      const container = document.getElementById("google_translate_element");
      if (!container || container.childElementCount > 0) return;

      new window.google.translate.TranslateElement(
        {
          pageLanguage: "es",
          includedLanguages: languages.map((item) => item.code).join(","),
          autoDisplay: false,
        },
        "google_translate_element",
      );

      if (initialLanguage !== "es") triggerTranslation(initialLanguage);
    };

    window.googleTranslateElementInit = initialize;

    if (window.google?.translate?.TranslateElement) {
      initialize();
    } else if (!document.getElementById("google-translate-script")) {
      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  useEffect(() => {
    const handleTranslatedNavigation = (event: MouseEvent) => {
      if (window.localStorage.getItem(STORAGE_KEY) === "es") return;
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const target = event.target as Element | null;
      const anchor = target?.closest<HTMLAnchorElement>("a[href]");
      if (!anchor || anchor.target === "_blank" || anchor.hasAttribute("download")) return;

      const destination = new URL(anchor.href, window.location.href);
      if (destination.origin !== window.location.origin) return;

      event.preventDefault();
      window.location.assign(destination.href);
    };

    document.addEventListener("click", handleTranslatedNavigation, true);
    return () => document.removeEventListener("click", handleTranslatedNavigation, true);
  }, []);

  const changeLanguage = (nextLanguage: LanguageCode) => {
    setLanguage(nextLanguage);
    window.localStorage.setItem(STORAGE_KEY, nextLanguage);
    document.documentElement.lang = nextLanguage;

    if (nextLanguage === "es") {
      document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${window.location.hostname}`;
      window.location.reload();
      return;
    }

    triggerTranslation(nextLanguage);
  };

  return (
    <div className="language-switcher" translate="no">
      <span className="language-globe" aria-hidden="true">◎</span>
      <span className="language-current" aria-hidden="true">{selectedLanguage.short}</span>
      <span className="language-name" aria-hidden="true">{selectedLanguage.label}</span>
      <span className="language-caret" aria-hidden="true">⌄</span>
      <label htmlFor="site-language" className="visually-hidden">Seleccionar idioma</label>
      <select
        id="site-language"
        value={language}
        onChange={(event) => changeLanguage(event.target.value as LanguageCode)}
        aria-label="Seleccionar idioma"
      >
        {languages.map((item) => <option key={item.code} value={item.code}>{item.label}</option>)}
      </select>
      <div id="google_translate_element" aria-hidden="true" />
    </div>
  );
}
