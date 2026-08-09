"use client";

import { useEffect, useRef, useState } from "react";
import { uploadAdminImage } from "../../lib/supabase/admin";
import { useAdmin } from "./AdminShell";

export type EditorStatus = "idle" | "saving" | "saved" | "error";
export type EditableImage = { id?: string; src: string; alt: string; storagePath?: string; sortOrder?: number };

export function useUnsavedWarning(dirty: boolean) {
  const dirtyRef = useRef(dirty);

  useEffect(() => {
    dirtyRef.current = dirty;
  }, [dirty]);

  useEffect(() => {
    const beforeUnload = (event: BeforeUnloadEvent) => {
      if (!dirtyRef.current) return;
      event.preventDefault();
      event.returnValue = "";
    };
    const followLink = (event: MouseEvent) => {
      if (!dirtyRef.current || event.defaultPrevented || event.button !== 0) return;
      const target = event.target as Element | null;
      const link = target?.closest<HTMLAnchorElement>("a[href]");
      if (!link || link.target === "_blank" || link.hasAttribute("download")) return;
      const destination = new URL(link.href, window.location.href);
      if (destination.href === window.location.href || destination.hash) return;
      if (!window.confirm("Tienes cambios sin guardar. ¿Seguro que quieres salir?")) event.preventDefault();
    };
    window.addEventListener("beforeunload", beforeUnload);
    document.addEventListener("click", followLink, true);
    return () => {
      window.removeEventListener("beforeunload", beforeUnload);
      document.removeEventListener("click", followLink, true);
    };
  }, []);
}

export function SaveBar({ status, onSave, disabled = false }: { status: EditorStatus; onSave: () => void; disabled?: boolean }) {
  const messages: Record<EditorStatus, string> = {
    idle: "",
    saving: "Guardando…",
    saved: "Cambios guardados.",
    error: "No pudimos guardar los cambios. Inténtalo nuevamente.",
  };
  return (
    <div className="admin-save-bar">
      <div className={`admin-save-message ${status === "error" ? "error" : status === "saved" ? "success" : ""}`} role="status">
        {messages[status]}
      </div>
      <button className="admin-primary-button" type="button" onClick={onSave} disabled={disabled || status === "saving"}>
        {status === "saving" ? "Guardando…" : "Guardar cambios"}
      </button>
    </div>
  );
}

export function StringListEditor({
  label,
  items,
  onChange,
  placeholder = "Nuevo elemento",
}: {
  label: string;
  items: string[];
  onChange: (items: string[]) => void;
  placeholder?: string;
}) {
  return (
    <div className="admin-list-editor">
      <div className="admin-list-heading"><h3>{label}</h3><button type="button" onClick={() => onChange([...items, ""])}>+ Agregar elemento</button></div>
      {items.length === 0 && <p className="admin-empty-note">No hay elementos en esta lista.</p>}
      {items.map((item, index) => (
        <div className="admin-list-row" key={`${label}-${index}`}>
          <span aria-hidden="true">✓</span>
          <input value={item} placeholder={placeholder} onChange={(event) => onChange(items.map((current, itemIndex) => itemIndex === index ? event.target.value : current))} />
          <button className="admin-icon-button danger" type="button" onClick={() => onChange(items.filter((_, itemIndex) => itemIndex !== index))} aria-label={`Eliminar elemento ${index + 1}`}>Eliminar</button>
        </div>
      ))}
    </div>
  );
}

export function PairListEditor({
  label,
  items,
  onChange,
  firstLabel,
  secondLabel,
}: {
  label: string;
  items: Array<{ title: string; text: string }>;
  onChange: (items: Array<{ title: string; text: string }>) => void;
  firstLabel: string;
  secondLabel: string;
}) {
  return (
    <div className="admin-list-editor">
      <div className="admin-list-heading"><h3>{label}</h3><button type="button" onClick={() => onChange([...items, { title: "", text: "" }])}>+ Agregar</button></div>
      {items.map((item, index) => (
        <div className="admin-pair-row" key={`${label}-${index}`}>
          <label>{firstLabel}<input value={item.title} onChange={(event) => onChange(items.map((current, itemIndex) => itemIndex === index ? { ...current, title: event.target.value } : current))} /></label>
          <label>{secondLabel}<textarea rows={2} value={item.text} onChange={(event) => onChange(items.map((current, itemIndex) => itemIndex === index ? { ...current, text: event.target.value } : current))} /></label>
          <button className="admin-icon-button danger" type="button" onClick={() => onChange(items.filter((_, itemIndex) => itemIndex !== index))}>Eliminar</button>
        </div>
      ))}
    </div>
  );
}

export function ImageField({
  label,
  value,
  folder,
  onChange,
  onReplaced,
}: {
  label: string;
  value: EditableImage;
  folder: string;
  onChange: (image: EditableImage) => void;
  onReplaced: (storagePath: string) => void;
}) {
  const { client } = useAdmin();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function replace(file?: File) {
    if (!file) return;
    setBusy(true);
    setError("");
    try {
      const uploaded = await uploadAdminImage(client, file, folder);
      if (value.storagePath) onReplaced(value.storagePath);
      onChange({ ...value, ...uploaded });
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "No pudimos subir la imagen.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="admin-image-field">
      <span className="admin-field-title">{label}</span>
      <div className="admin-image-preview"><img src={value.src} alt={value.alt || label} /></div>
      <label className={`admin-upload-button ${busy ? "disabled" : ""}`}>
        {busy ? "Subiendo…" : "Reemplazar imagen"}
        <input type="file" accept="image/jpeg,image/png,image/webp" disabled={busy} onChange={(event) => replace(event.target.files?.[0])} />
      </label>
      <label>Descripción de la imagen<input value={value.alt} onChange={(event) => onChange({ ...value, alt: event.target.value })} /></label>
      {error && <p className="admin-inline-error" role="alert">{error}</p>}
    </div>
  );
}

export function GalleryEditor({
  title,
  images,
  folder,
  onChange,
  onRemoved,
}: {
  title: string;
  images: EditableImage[];
  folder: string;
  onChange: (images: EditableImage[]) => void;
  onRemoved: (storagePath: string) => void;
}) {
  const { client } = useAdmin();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const draggedIndex = useRef<number | null>(null);

  function move(from: number, to: number) {
    if (to < 0 || to >= images.length || from === to) return;
    const next = [...images];
    const [item] = next.splice(from, 1);
    next.splice(to, 0, item);
    onChange(next.map((image, index) => ({ ...image, sortOrder: index })));
  }

  async function addFiles(files: FileList | null) {
    if (!files?.length) return;
    setBusy(true);
    setError("");
    try {
      const uploaded = [] as EditableImage[];
      for (const file of Array.from(files)) {
        const result = await uploadAdminImage(client, file, folder);
        uploaded.push({ id: crypto.randomUUID(), ...result, alt: file.name.replace(/\.[^.]+$/, ""), sortOrder: images.length + uploaded.length });
      }
      onChange([...images, ...uploaded]);
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "No pudimos subir las imágenes.");
    } finally {
      setBusy(false);
    }
  }

  async function replace(index: number, file?: File) {
    if (!file) return;
    setBusy(true);
    setError("");
    try {
      const uploaded = await uploadAdminImage(client, file, folder);
      const previous = images[index];
      if (previous.storagePath) onRemoved(previous.storagePath);
      onChange(images.map((image, imageIndex) => imageIndex === index ? { ...image, ...uploaded } : image));
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "No pudimos reemplazar la imagen.");
    } finally {
      setBusy(false);
    }
  }

  function remove(index: number) {
    if (!window.confirm("¿Seguro que quieres eliminar esta fotografía?")) return;
    const image = images[index];
    if (image.storagePath) onRemoved(image.storagePath);
    onChange(images.filter((_, imageIndex) => imageIndex !== index).map((item, itemIndex) => ({ ...item, sortOrder: itemIndex })));
  }

  return (
    <div className="admin-gallery-editor">
      <div className="admin-list-heading">
        <div><h3>{title}</h3><p>Arrastra las fotos para ordenar o usa las flechas.</p></div>
        <label className={`admin-upload-button ${busy ? "disabled" : ""}`}>{busy ? "Subiendo…" : "+ Agregar fotografías"}<input type="file" multiple accept="image/jpeg,image/png,image/webp" disabled={busy} onChange={(event) => addFiles(event.target.files)} /></label>
      </div>
      {error && <p className="admin-inline-error" role="alert">{error}</p>}
      <div className="admin-gallery-grid">
        {images.map((image, index) => (
          <article
            className="admin-gallery-card"
            key={image.id ?? `${image.src}-${index}`}
            draggable
            onDragStart={() => { draggedIndex.current = index; }}
            onDragOver={(event) => event.preventDefault()}
            onDrop={() => { if (draggedIndex.current !== null) move(draggedIndex.current, index); draggedIndex.current = null; }}
          >
            <img src={image.src} alt={image.alt} />
            <div className="admin-gallery-card-body">
              <label>Descripción<input value={image.alt} onChange={(event) => onChange(images.map((item, itemIndex) => itemIndex === index ? { ...item, alt: event.target.value } : item))} /></label>
              <div className="admin-gallery-actions">
                <button type="button" onClick={() => move(index, index - 1)} disabled={index === 0} aria-label="Mover a la izquierda">←</button>
                <button type="button" onClick={() => move(index, index + 1)} disabled={index === images.length - 1} aria-label="Mover a la derecha">→</button>
                <label>Reemplazar<input type="file" accept="image/jpeg,image/png,image/webp" onChange={(event) => replace(index, event.target.files?.[0])} /></label>
                <button className="danger" type="button" onClick={() => remove(index)}>Eliminar</button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
