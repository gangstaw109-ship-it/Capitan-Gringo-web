import type { MetadataRoute } from "next";
import { tours } from "./content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.saona-tours.com";
  const pages = ["", "/excursiones", "/destinos", "/nosotros", "/galeria", "/reservar"];
  return [
    ...pages.map((path) => ({ url: `${baseUrl}${path}`, changeFrequency: "monthly" as const, priority: path === "" ? 1 : 0.8 })),
    ...tours.map((tour) => ({ url: `${baseUrl}/excursiones/${tour.slug}`, changeFrequency: "monthly" as const, priority: 0.9 })),
  ];
}

