"use client";

import { useEffect, useMemo, useState } from "react";
import { galleryImages as fallbackGallery } from "../../content/site";
import { removeAdminImages } from "../../lib/supabase/admin";
import { GalleryEditor, SaveBar, type EditableImage, type EditorStatus, useUnsavedWarning } from "../components/EditorKit";
import { useAdmin } from "../components/AdminShell";

export default function GalleriesAdminPage() {
  const { client } = useAdmin();
  const [images, setImages] = useState<EditableImage[]>([]);
  const [baseline, setBaseline] = useState("");
  const [originalIds, setOriginalIds] = useState<string[]>([]);
  const [removedPaths, setRemovedPaths] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<EditorStatus>("idle");

  useEffect(() => {
    let active = true;
    client.from("gallery_images").select("id, src, alt, storage_path, sort_order").order("sort_order").then(({ data, error }) => {
      if (!active) return;
      if (error) console.error("No se pudo cargar la galería.", error);
      const next = data?.length
        ? data.map((image) => ({ id: image.id, src: image.src, alt: image.alt, storagePath: image.storage_path ?? undefined, sortOrder: image.sort_order }))
        : fallbackGallery.map((image, index) => ({ id: `gallery-${String(index + 1).padStart(2, "0")}`, ...image, sortOrder: index }));
      setImages(next);
      setOriginalIds(next.map((image) => image.id!).filter(Boolean));
      setBaseline(JSON.stringify(next));
      setLoading(false);
    });
    return () => { active = false; };
  }, [client]);

  const snapshot = useMemo(() => JSON.stringify(images), [images]);
  const dirty = Boolean(baseline) && baseline !== snapshot;
  useUnsavedWarning(dirty);

  function rememberRemoved(path: string) {
    setRemovedPaths((current) => current.includes(path) ? current : [...current, path]);
  }

  async function save() {
    setStatus("saving");
    try {
      const normalized = images.map((image, index) => ({ ...image, id: image.id ?? crypto.randomUUID(), sortOrder: index }));
      const currentIds = new Set(normalized.map((image) => image.id));
      const deletedIds = originalIds.filter((id) => !currentIds.has(id));
      if (normalized.length) {
        const { error } = await client.from("gallery_images").upsert(normalized.map((image) => ({
          id: image.id,
          src: image.src,
          alt: image.alt,
          storage_path: image.storagePath ?? null,
          sort_order: image.sortOrder,
          visible: true,
        })));
        if (error) throw error;
      }
      if (deletedIds.length) {
        const { error } = await client.from("gallery_images").delete().in("id", deletedIds);
        if (error) throw error;
      }
      await removeAdminImages(client, removedPaths);
      setImages(normalized);
      setOriginalIds(normalized.map((image) => image.id!));
      setRemovedPaths([]);
      setBaseline(JSON.stringify(normalized));
      setStatus("saved");
    } catch (error) {
      console.error("No se pudo guardar la galería.", error);
      setStatus("error");
    }
  }

  if (loading) return <div className="admin-page"><div className="admin-panel-loading">Cargando fotografías…</div></div>;

  return (
    <div className="admin-page admin-editor-page">
      <header className="admin-page-heading"><div><span>Fotografías públicas</span><h1>Galerías</h1><p>Administra la galería general. Las fotos de cada excursión se editan dentro de su ficha.</p></div><a className="admin-secondary-button" href="/galeria" target="_blank" rel="noreferrer">Ver galería ↗</a></header>
      <section className="admin-form-card">
        <div className="admin-form-card-heading"><span>01</span><div><h2>Galería general</h2><p>JPG, PNG o WebP, hasta 8 MB por fotografía.</p></div></div>
        <GalleryEditor title="Fotografías de la web" images={images} folder="galeria/general" onRemoved={rememberRemoved} onChange={(next) => { setImages(next); setStatus("idle"); }} />
      </section>
      <aside className="admin-help-card"><span aria-hidden="true">i</span><div><strong>Galerías de excursiones</strong><p>Entra en “Excursiones”, elige una y baja hasta su sección de fotografías.</p></div></aside>
      <SaveBar status={status} onSave={save} disabled={!dirty && status !== "error"} />
    </div>
  );
}

