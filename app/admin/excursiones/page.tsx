"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Tour } from "../../content/site";
import { useAdmin } from "../components/AdminShell";

type ExcursionRow = { slug: string; visible: boolean; sort_order: number; content: Tour };

export default function ExcursionsAdminPage() {
  const { client } = useAdmin();
  const [rows, setRows] = useState<ExcursionRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    let active = true;
    client.from("excursions").select("slug, visible, sort_order, content").order("sort_order").then(({ data, error }) => {
      if (!active) return;
      if (error) {
        console.error("No se pudieron cargar las excursiones.", error);
        setMessage("No pudimos cargar las excursiones. Inténtalo nuevamente.");
      } else {
        setRows((data ?? []) as ExcursionRow[]);
      }
      setLoading(false);
    });
    return () => { active = false; };
  }, [client]);

  async function toggleVisibility(row: ExcursionRow) {
    const nextVisible = !row.visible;
    if (!nextVisible && !window.confirm(`¿Quieres ocultar “${row.content.name}” de la página pública?`)) return;
    setMessage("Guardando…");
    const { error } = await client.from("excursions").update({ visible: nextVisible }).eq("slug", row.slug);
    if (error) {
      console.error("No se pudo cambiar la visibilidad.", error);
      setMessage("No pudimos guardar el cambio. Inténtalo nuevamente.");
      return;
    }
    setRows((current) => current.map((item) => item.slug === row.slug ? { ...item, visible: nextVisible } : item));
    setMessage(nextVisible ? "La excursión vuelve a estar visible." : "La excursión quedó oculta sin perder información.");
  }

  return (
    <div className="admin-page">
      <header className="admin-page-heading"><div><span>Catálogo</span><h1>Excursiones</h1><p>Edita la información y decide qué excursiones aparecen en la web.</p></div><a className="admin-secondary-button" href="/excursiones" target="_blank" rel="noreferrer">Ver excursiones ↗</a></header>
      {message && <div className="admin-message" role="status">{message}</div>}
      {loading ? <div className="admin-panel-loading">Cargando excursiones…</div> : (
        <section className="admin-excursion-grid">
          {rows.map((row) => (
            <article className="admin-excursion-card" key={row.slug}>
              <div className="admin-excursion-image"><img src={row.content.cardImage} alt={row.content.cardImageAlt ?? row.content.imageAlt} /><span className={row.visible ? "visible" : "hidden"}>{row.visible ? "Visible" : "Oculta"}</span></div>
              <div className="admin-excursion-body">
                <small>{row.content.destination}</small>
                <h2>{row.content.name}</h2>
                <p>{row.content.shortDescription}</p>
                <div className="admin-excursion-actions">
                  <Link className="admin-primary-button" href={`/admin/excursiones/${row.slug}`}>Editar</Link>
                  <button className="admin-secondary-button" type="button" onClick={() => toggleVisibility(row)}>{row.visible ? "Ocultar" : "Mostrar"}</button>
                </div>
              </div>
            </article>
          ))}
        </section>
      )}
    </div>
  );
}

