"use client";

import { useEffect, useMemo, useState } from "react";
import { site as fallbackSite } from "../../content/site";
import type { SiteInfo } from "../../lib/content";
import { SaveBar, type EditorStatus, useUnsavedWarning } from "../components/EditorKit";
import { useAdmin } from "../components/AdminShell";

export default function ContactEditorPage() {
  const { client } = useAdmin();
  const [content, setContent] = useState<SiteInfo>({ ...fallbackSite });
  const [baseline, setBaseline] = useState("");
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<EditorStatus>("idle");

  useEffect(() => {
    let active = true;
    client.from("site_settings").select("content").eq("id", "main").maybeSingle().then(({ data, error }) => {
      if (!active) return;
      if (error) {
        console.error("No se pudo cargar el contacto.", error);
        setStatus("error");
      }
      const next = data?.content ? ({ ...fallbackSite, ...data.content } as SiteInfo) : { ...fallbackSite };
      setContent(next);
      setBaseline(JSON.stringify(next));
      setLoading(false);
    });
    return () => { active = false; };
  }, [client]);

  const snapshot = useMemo(() => JSON.stringify(content), [content]);
  const dirty = Boolean(baseline) && baseline !== snapshot;
  useUnsavedWarning(dirty);

  function update<K extends keyof SiteInfo>(field: K, value: SiteInfo[K]) {
    setContent((current) => ({ ...current, [field]: value }));
    setStatus("idle");
  }

  async function save() {
    setStatus("saving");
    try {
      const phoneHref = `+${content.phoneDisplay.replace(/\D/g, "")}`;
      const next = { ...content, phoneHref };
      const { error } = await client.from("site_settings").upsert({ id: "main", content: next });
      if (error) throw error;
      setContent(next);
      setBaseline(JSON.stringify(next));
      setStatus("saved");
    } catch (error) {
      console.error("No se pudo guardar el contacto.", error);
      setStatus("error");
    }
  }

  if (loading) return <div className="admin-page"><div className="admin-panel-loading">Cargando datos de contacto…</div></div>;

  return (
    <div className="admin-page admin-editor-page">
      <header className="admin-page-heading"><div><span>Información centralizada</span><h1>Contacto</h1><p>Un cambio aquí se refleja en todos los botones y secciones correspondientes.</p></div><a className="admin-secondary-button" href="/reservar" target="_blank" rel="noreferrer">Ver contacto ↗</a></header>
      <section className="admin-form-card">
        <div className="admin-form-card-heading"><span>01</span><div><h2>Teléfono y WhatsApp</h2><p>Escribe los números con código de país.</p></div></div>
        <div className="admin-form-grid">
          <label>Teléfono visible<input type="tel" value={content.phoneDisplay} onChange={(event) => update("phoneDisplay", event.target.value)} /></label>
          <label>Número de WhatsApp<input type="tel" inputMode="numeric" value={content.whatsapp} onChange={(event) => update("whatsapp", event.target.value.replace(/\D/g, ""))} /><small>Solo números. Ejemplo: 18097539469</small></label>
          <label>Correo electrónico<input type="email" value={content.email} onChange={(event) => update("email", event.target.value)} /></label>
          <label>Horario de atención<input value={content.officeHours} onChange={(event) => update("officeHours", event.target.value)} /></label>
        </div>
      </section>
      <section className="admin-form-card">
        <div className="admin-form-card-heading"><span>02</span><div><h2>Ubicación y empresa</h2><p>Datos generales mostrados en la página.</p></div></div>
        <div className="admin-form-grid">
          <label>Nombre comercial<input value={content.name} onChange={(event) => update("name", event.target.value)} /></label>
          <label>Nombre legal<input value={content.legalName} onChange={(event) => update("legalName", event.target.value)} /></label>
          <label className="wide">Dirección<textarea rows={3} value={content.address} onChange={(event) => update("address", event.target.value)} /></label>
        </div>
      </section>
      <section className="admin-form-card">
        <div className="admin-form-card-heading"><span>03</span><div><h2>Redes y opiniones</h2><p>Conserva enlaces completos que comiencen con https://</p></div></div>
        <div className="admin-form-grid">
          <label className="wide">Facebook<input type="url" value={content.facebook} onChange={(event) => update("facebook", event.target.value)} /></label>
          <label className="wide">Tripadvisor<input type="url" value={content.tripadvisor} onChange={(event) => update("tripadvisor", event.target.value)} /></label>
        </div>
      </section>
      <SaveBar status={status} onSave={save} disabled={!dirty && status !== "error"} />
    </div>
  );
}

