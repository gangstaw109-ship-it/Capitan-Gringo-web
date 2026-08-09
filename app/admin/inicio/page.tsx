"use client";

import { useEffect, useMemo, useState } from "react";
import { faqs as fallbackFaqs, homepageContent as fallbackContent, type Faq, type HomepageContent } from "../../content/editable";
import { PairListEditor, SaveBar, StringListEditor, type EditorStatus, useUnsavedWarning } from "../components/EditorKit";
import { useAdmin } from "../components/AdminShell";

function cloneContent<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

export default function HomepageEditorPage() {
  const { client } = useAdmin();
  const [content, setContent] = useState<HomepageContent>(() => cloneContent(fallbackContent));
  const [faqs, setFaqs] = useState<Faq[]>(() => cloneContent(fallbackFaqs));
  const [baseline, setBaseline] = useState("");
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<EditorStatus>("idle");

  useEffect(() => {
    let active = true;
    Promise.all([
      client.from("homepage_content").select("content").eq("id", "main").maybeSingle(),
      client.from("faqs").select("id, question, answer, sort_order").order("sort_order"),
    ]).then(([homeResult, faqResult]) => {
      if (!active) return;
      const nextContent = (homeResult.data?.content as HomepageContent | undefined) ?? cloneContent(fallbackContent);
      const nextFaqs = faqResult.data?.map((faq) => ({ id: faq.id, question: faq.question, answer: faq.answer, sortOrder: faq.sort_order })) ?? cloneContent(fallbackFaqs);
      setContent(nextContent);
      setFaqs(nextFaqs);
      setBaseline(JSON.stringify({ content: nextContent, faqs: nextFaqs }));
      setLoading(false);
    }).catch((error) => {
      console.error("No se pudo cargar la portada.", error);
      setStatus("error");
      setLoading(false);
    });
    return () => { active = false; };
  }, [client]);

  const currentSnapshot = useMemo(() => JSON.stringify({ content, faqs }), [content, faqs]);
  const dirty = Boolean(baseline) && baseline !== currentSnapshot;
  useUnsavedWarning(dirty);

  function updateSection<K extends keyof HomepageContent>(section: K, patch: Partial<HomepageContent[K]>) {
    setContent((current) => ({ ...current, [section]: { ...current[section], ...patch } }));
    setStatus("idle");
  }

  async function save() {
    if (status === "saving") return;
    setStatus("saving");
    try {
      const { data: existingFaqs, error: existingError } = await client.from("faqs").select("id");
      if (existingError) throw existingError;
      const normalizedFaqs = faqs.map((faq, index) => ({ ...faq, id: faq.id ?? crypto.randomUUID(), sortOrder: index }));
      const activeIds = new Set(normalizedFaqs.map((faq) => faq.id));
      const removedIds = (existingFaqs ?? []).map((faq) => faq.id).filter((id) => !activeIds.has(id));

      const homeResult = await client.from("homepage_content").upsert({ id: "main", content });
      if (homeResult.error) throw homeResult.error;
      if (normalizedFaqs.length) {
        const faqResult = await client.from("faqs").upsert(normalizedFaqs.map((faq) => ({
          id: faq.id,
          question: faq.question,
          answer: faq.answer,
          sort_order: faq.sortOrder,
          visible: true,
        })));
        if (faqResult.error) throw faqResult.error;
      }
      if (removedIds.length) {
        const removeResult = await client.from("faqs").delete().in("id", removedIds);
        if (removeResult.error) throw removeResult.error;
      }
      setFaqs(normalizedFaqs);
      const nextBaseline = JSON.stringify({ content, faqs: normalizedFaqs });
      setBaseline(nextBaseline);
      setStatus("saved");
    } catch (error) {
      console.error("No se pudo guardar la portada.", error);
      setStatus("error");
    }
  }

  if (loading) return <div className="admin-page"><div className="admin-panel-loading">Cargando el contenido del inicio…</div></div>;

  return (
    <div className="admin-page admin-editor-page">
      <header className="admin-page-heading"><div><span>Página pública</span><h1>Editar inicio</h1><p>Cambia los textos sin modificar el diseño.</p></div><a className="admin-secondary-button" href="/" target="_blank" rel="noreferrer">Ver inicio ↗</a></header>

      <section className="admin-form-card">
        <div className="admin-form-card-heading"><span>01</span><div><h2>Presentación principal</h2><p>Es lo primero que ven tus visitantes.</p></div></div>
        <div className="admin-form-grid">
          <label>Texto pequeño<input value={content.hero.eyebrow} onChange={(event) => updateSection("hero", { eyebrow: event.target.value })} /></label>
          <label className="wide">Título principal<input value={content.hero.title} onChange={(event) => updateSection("hero", { title: event.target.value })} /></label>
          <label className="wide">Descripción<textarea rows={4} value={content.hero.description} onChange={(event) => updateSection("hero", { description: event.target.value })} /></label>
          <label>Botón de excursiones<input value={content.hero.primaryButton} onChange={(event) => updateSection("hero", { primaryButton: event.target.value })} /></label>
          <label>Botón de WhatsApp<input value={content.hero.whatsappButton} onChange={(event) => updateSection("hero", { whatsappButton: event.target.value })} /></label>
        </div>
        <PairListEditor label="Mensajes destacados" items={content.hero.proof} firstLabel="Título" secondLabel="Texto" onChange={(proof) => updateSection("hero", { proof })} />
      </section>

      <section className="admin-form-card">
        <div className="admin-form-card-heading"><span>02</span><div><h2>Excursiones destacadas</h2><p>Textos que acompañan las primeras excursiones.</p></div></div>
        <div className="admin-form-grid">
          <label>Texto pequeño<input value={content.featured.eyebrow} onChange={(event) => updateSection("featured", { eyebrow: event.target.value })} /></label>
          <label className="wide">Título<input value={content.featured.title} onChange={(event) => updateSection("featured", { title: event.target.value })} /></label>
          <label className="wide">Descripción<textarea rows={3} value={content.featured.description} onChange={(event) => updateSection("featured", { description: event.target.value })} /></label>
        </div>
      </section>

      <section className="admin-form-card">
        <div className="admin-form-card-heading"><span>03</span><div><h2>Historia</h2><p>Presentación de Capitán Gringo y sus valores.</p></div></div>
        <div className="admin-form-grid">
          <label>Texto pequeño<input value={content.story.eyebrow} onChange={(event) => updateSection("story", { eyebrow: event.target.value })} /></label>
          <label className="wide">Título<input value={content.story.title} onChange={(event) => updateSection("story", { title: event.target.value })} /></label>
          <label className="wide">Descripción<textarea rows={5} value={content.story.description} onChange={(event) => updateSection("story", { description: event.target.value })} /></label>
          <label>Texto del botón<input value={content.story.button} onChange={(event) => updateSection("story", { button: event.target.value })} /></label>
        </div>
        <StringListEditor label="Puntos destacados" items={content.story.points} onChange={(points) => updateSection("story", { points })} />
      </section>

      <section className="admin-form-card">
        <div className="admin-form-card-heading"><span>04</span><div><h2>Confianza y opiniones</h2><p>Mensajes que ayudan al visitante a decidir.</p></div></div>
        <div className="admin-form-grid">
          <label>Texto pequeño<input value={content.trust.eyebrow} onChange={(event) => updateSection("trust", { eyebrow: event.target.value })} /></label>
          <label className="wide">Título<input value={content.trust.title} onChange={(event) => updateSection("trust", { title: event.target.value })} /></label>
          <label className="wide">Descripción<textarea rows={3} value={content.trust.description} onChange={(event) => updateSection("trust", { description: event.target.value })} /></label>
        </div>
        <PairListEditor label="Tarjetas de confianza" items={content.trust.cards} firstLabel="Título" secondLabel="Texto" onChange={(cards) => updateSection("trust", { cards })} />
        <div className="admin-form-grid admin-subsection">
          <label className="wide">Título de opiniones<input value={content.reviews.title} onChange={(event) => updateSection("reviews", { title: event.target.value })} /></label>
          <label className="wide">Texto de opiniones<textarea rows={3} value={content.reviews.description} onChange={(event) => updateSection("reviews", { description: event.target.value })} /></label>
          <label>Texto del botón<input value={content.reviews.button} onChange={(event) => updateSection("reviews", { button: event.target.value })} /></label>
        </div>
      </section>

      <section className="admin-form-card">
        <div className="admin-form-card-heading"><span>05</span><div><h2>Otros textos y preguntas</h2><p>Actualiza títulos, botones y preguntas frecuentes.</p></div></div>
        <div className="admin-form-grid admin-subsection admin-subsection-first">
          <label className="wide">Título de destinos<input value={content.destinations.title} onChange={(event) => updateSection("destinations", { title: event.target.value })} /></label>
          <label>Botón de destinos<input value={content.destinations.button} onChange={(event) => updateSection("destinations", { button: event.target.value })} /></label>
          <label className="wide">Título de la galería<input value={content.gallery.title} onChange={(event) => updateSection("gallery", { title: event.target.value })} /></label>
          <label>Botón de la galería<input value={content.gallery.button} onChange={(event) => updateSection("gallery", { button: event.target.value })} /></label>
          <label className="wide">Título de preguntas frecuentes<input value={content.faq.title} onChange={(event) => updateSection("faq", { title: event.target.value })} /></label>
          <label className="wide">Texto de preguntas frecuentes<textarea rows={2} value={content.faq.description} onChange={(event) => updateSection("faq", { description: event.target.value })} /></label>
          <label>Botón de reserva rápida<input value={content.quickBooking.button} onChange={(event) => updateSection("quickBooking", { button: event.target.value })} /></label>
        </div>
        <div className="admin-list-heading"><h3>Preguntas publicadas</h3><button type="button" onClick={() => { setFaqs([...faqs, { question: "", answer: "" }]); setStatus("idle"); }}>+ Agregar pregunta</button></div>
        <div className="admin-faq-editor">
          {faqs.map((faq, index) => (
            <article key={faq.id ?? `new-${index}`}>
              <label>Pregunta<input value={faq.question} onChange={(event) => { setFaqs(faqs.map((item, itemIndex) => itemIndex === index ? { ...item, question: event.target.value } : item)); setStatus("idle"); }} /></label>
              <label>Respuesta<textarea rows={4} value={faq.answer} onChange={(event) => { setFaqs(faqs.map((item, itemIndex) => itemIndex === index ? { ...item, answer: event.target.value } : item)); setStatus("idle"); }} /></label>
              <button className="admin-icon-button danger" type="button" onClick={() => { setFaqs(faqs.filter((_, itemIndex) => itemIndex !== index)); setStatus("idle"); }}>Eliminar pregunta</button>
            </article>
          ))}
        </div>
      </section>

      <SaveBar status={status} onSave={save} disabled={!dirty && status !== "error"} />
    </div>
  );
}
