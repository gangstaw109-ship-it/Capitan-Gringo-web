"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { getTour as getFallbackTour, type Tour } from "../../content/site";
import { removeAdminImages } from "../../lib/supabase/admin";
import { useAdmin } from "./AdminShell";
import {
  GalleryEditor,
  ImageField,
  PairListEditor,
  SaveBar,
  StringListEditor,
  type EditableImage,
  type EditorStatus,
  useUnsavedWarning,
} from "./EditorKit";

function cloneTour(tour: Tour): Tour {
  return JSON.parse(JSON.stringify(tour)) as Tour;
}

export function ExcursionEditor({ slug }: { slug: string }) {
  const { client } = useAdmin();
  const [tour, setTour] = useState<Tour | null>(null);
  const [visible, setVisible] = useState(true);
  const [baseline, setBaseline] = useState("");
  const [status, setStatus] = useState<EditorStatus>("idle");
  const [loading, setLoading] = useState(true);
  const [removedPaths, setRemovedPaths] = useState<string[]>([]);

  useEffect(() => {
    let active = true;
    client.from("excursions").select("slug, visible, content").eq("slug", slug).maybeSingle().then(({ data, error }) => {
      if (!active) return;
      if (error) console.error("No se pudo cargar la excursión.", error);
      const fallback = getFallbackTour(slug);
      const nextTour = data?.content ? ({ ...(data.content as Tour), slug: data.slug }) : fallback ? cloneTour(fallback) : null;
      const nextVisible = data?.visible ?? true;
      setTour(nextTour);
      setVisible(nextVisible);
      if (nextTour) setBaseline(JSON.stringify({ tour: nextTour, visible: nextVisible }));
      setLoading(false);
    });
    return () => { active = false; };
  }, [client, slug]);

  const snapshot = useMemo(() => JSON.stringify({ tour, visible }), [tour, visible]);
  const dirty = Boolean(baseline) && baseline !== snapshot;
  useUnsavedWarning(dirty);

  function change<K extends keyof Tour>(field: K, value: Tour[K]) {
    setTour((current) => current ? { ...current, [field]: value } : current);
    setStatus("idle");
  }

  function rememberRemoved(path: string) {
    setRemovedPaths((current) => current.includes(path) ? current : [...current, path]);
  }

  function changeVisibility(nextVisible: boolean) {
    if (!nextVisible && !window.confirm("¿Quieres ocultar esta excursión? No se borrará su información.")) return;
    setVisible(nextVisible);
    setStatus("idle");
  }

  async function save() {
    if (!tour) return;
    setStatus("saving");
    try {
      const cleanTour = {
        ...tour,
        slug,
        bookingButtonText: tour.bookingButtonText || "Reservar excursión",
        whatsappButtonText: tour.whatsappButtonText || "Consultar por WhatsApp",
        requestButtonText: tour.requestButtonText || "Solicitar reserva",
      };
      const { error } = await client.from("excursions").update({ content: cleanTour, visible }).eq("slug", slug);
      if (error) throw error;
      await removeAdminImages(client, removedPaths);
      setRemovedPaths([]);
      setTour(cleanTour);
      setBaseline(JSON.stringify({ tour: cleanTour, visible }));
      setStatus("saved");
    } catch (error) {
      console.error("No se pudo guardar la excursión.", error);
      setStatus("error");
    }
  }

  if (loading) return <div className="admin-page"><div className="admin-panel-loading">Cargando excursión…</div></div>;
  if (!tour) return <div className="admin-page"><div className="admin-message admin-message-error">No encontramos esta excursión.</div><Link href="/admin/excursiones">Volver a excursiones</Link></div>;

  const heroImage: EditableImage = { src: tour.heroImage, alt: tour.imageAlt, storagePath: tour.heroStoragePath };
  const cardImage: EditableImage = { src: tour.cardImage, alt: tour.cardImageAlt ?? tour.imageAlt, storagePath: tour.cardStoragePath };

  return (
    <div className="admin-page admin-editor-page">
      <header className="admin-page-heading admin-excursion-heading">
        <div><Link className="admin-back-link" href="/admin/excursiones">← Todas las excursiones</Link><span>Editar excursión</span><h1>{tour.name}</h1><p>Los cambios conservan el diseño actual de la ficha.</p></div>
        <a className="admin-secondary-button" href={`/excursiones/${slug}`} target="_blank" rel="noreferrer">Ver excursión ↗</a>
      </header>

      <section className="admin-visibility-card">
        <div><strong>Visible en la web</strong><p>Al desactivarla, la excursión se oculta sin perder información ni fotografías.</p></div>
        <label className="admin-switch"><input type="checkbox" checked={visible} onChange={(event) => changeVisibility(event.target.checked)} /><span /><em>{visible ? "ON" : "OFF"}</em></label>
      </section>

      <section className="admin-form-card">
        <div className="admin-form-card-heading"><span>01</span><div><h2>Información principal</h2><p>Nombre, presentación y destino.</p></div></div>
        <div className="admin-form-grid">
          <label>Nombre de la excursión<input value={tour.name} onChange={(event) => change("name", event.target.value)} /></label>
          <label>Texto pequeño<input value={tour.eyebrow} onChange={(event) => change("eyebrow", event.target.value)} /></label>
          <label>Destino<input value={tour.destination} onChange={(event) => change("destination", event.target.value)} /></label>
          <label className="wide">Descripción corta<textarea rows={3} value={tour.shortDescription} onChange={(event) => change("shortDescription", event.target.value)} /></label>
          <label className="wide">Descripción completa<textarea rows={6} value={tour.intro} onChange={(event) => change("intro", event.target.value)} /></label>
        </div>
        <StringListEditor label="Etiquetas destacadas" items={tour.tags} onChange={(items) => change("tags", items)} />
      </section>

      <section className="admin-form-card">
        <div className="admin-form-card-heading"><span>02</span><div><h2>Horario y precio</h2><p>Información práctica publicada para el cliente.</p></div></div>
        <div className="admin-form-grid">
          <label>Duración<input value={tour.duration} onChange={(event) => change("duration", event.target.value)} /></label>
          <label>Días u horario<input value={tour.schedule} onChange={(event) => change("schedule", event.target.value)} /></label>
          <label className="wide">Punto o horario de recogida<input value={tour.pickup ?? ""} onChange={(event) => change("pickup", event.target.value || undefined)} /></label>
          <label className="wide">Hora aproximada de regreso<input value={tour.returnTime ?? ""} onChange={(event) => change("returnTime", event.target.value || undefined)} /></label>
          <label>Precio mostrado desde<input value={tour.priceFrom} onChange={(event) => change("priceFrom", event.target.value)} /></label>
          <label>Nota junto al precio<input value={tour.priceNote} onChange={(event) => change("priceNote", event.target.value)} /></label>
          <label className="wide">Nota de reserva<textarea rows={3} value={tour.bookingNote ?? ""} onChange={(event) => change("bookingNote", event.target.value || undefined)} /></label>
        </div>
        <PairListEditor label="Tarifas" items={tour.prices.map((price) => ({ title: price.label, text: price.value }))} firstLabel="Nombre de la tarifa" secondLabel="Precio" onChange={(items) => change("prices", items.map((item) => ({ label: item.title, value: item.text })))} />
      </section>

      <section className="admin-form-card">
        <div className="admin-form-card-heading"><span>03</span><div><h2>Itinerario y listas</h2><p>Edita cada punto de forma visual.</p></div></div>
        <PairListEditor label="Itinerario" items={tour.itinerary.map((stop) => ({ title: stop.title, text: stop.description }))} firstLabel="Parada" secondLabel="Descripción" onChange={(items) => change("itinerary", items.map((item) => ({ title: item.title, description: item.text })))} />
        <StringListEditor label="Qué incluye" items={tour.includes} onChange={(items) => change("includes", items)} />
        <StringListEditor label="Qué llevar y recomendaciones" items={tour.recommendations} onChange={(items) => change("recommendations", items)} />
        <StringListEditor label="Información importante" items={tour.restrictions ?? []} onChange={(items) => change("restrictions", items.length ? items : undefined)} />
      </section>

      <section className="admin-form-card">
        <div className="admin-form-card-heading"><span>04</span><div><h2>Textos de botones</h2><p>Usa frases cortas y claras.</p></div></div>
        <div className="admin-form-grid">
          <label>Botón principal<input value={tour.bookingButtonText ?? "Reservar excursión"} onChange={(event) => change("bookingButtonText", event.target.value)} /></label>
          <label>Botón de WhatsApp<input value={tour.whatsappButtonText ?? "Consultar por WhatsApp"} onChange={(event) => change("whatsappButtonText", event.target.value)} /></label>
          <label>Botón junto a precios<input value={tour.requestButtonText ?? "Solicitar reserva"} onChange={(event) => change("requestButtonText", event.target.value)} /></label>
        </div>
      </section>

      <section className="admin-form-card">
        <div className="admin-form-card-heading"><span>05</span><div><h2>Fotografías principales</h2><p>La imagen nueva se sube antes de reemplazar la anterior.</p></div></div>
        <div className="admin-image-fields">
          <ImageField label="Imagen grande de la ficha" value={heroImage} folder={`excursiones/${slug}/principal`} onReplaced={rememberRemoved} onChange={(image) => setTour({ ...tour, heroImage: image.src, imageAlt: image.alt, heroStoragePath: image.storagePath })} />
          <ImageField label="Imagen de la tarjeta" value={cardImage} folder={`excursiones/${slug}/tarjeta`} onReplaced={rememberRemoved} onChange={(image) => setTour({ ...tour, cardImage: image.src, cardImageAlt: image.alt, cardStoragePath: image.storagePath })} />
        </div>
      </section>

      <section className="admin-form-card">
        <div className="admin-form-card-heading"><span>06</span><div><h2>Galería de la excursión</h2><p>Agrega, reemplaza, elimina o cambia el orden.</p></div></div>
        <GalleryEditor title={`Galería ${tour.name}`} images={tour.gallery} folder={`excursiones/${slug}/galeria`} onRemoved={rememberRemoved} onChange={(gallery) => { change("gallery", gallery.map(({ src, alt, storagePath }) => ({ src, alt, storagePath }))); }} />
      </section>

      <SaveBar status={status} onSave={save} disabled={!dirty && status !== "error"} />
    </div>
  );
}

