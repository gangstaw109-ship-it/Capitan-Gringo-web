"use client";

import type { SupabaseClient, User } from "@supabase/supabase-js";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { createContext, FormEvent, useContext, useEffect, useMemo, useState } from "react";
import { seedInitialContent, verifyAdmin } from "../../lib/supabase/admin";
import { getBrowserSupabase } from "../../lib/supabase/browser";

type AdminContextValue = {
  client: SupabaseClient;
  user: User;
  signOut: () => Promise<void>;
};

const AdminContext = createContext<AdminContextValue | null>(null);

export function useAdmin() {
  const value = useContext(AdminContext);
  if (!value) throw new Error("El editor necesita una sesión administrativa.");
  return value;
}

function LoginScreen({
  client,
  initialMessage = "",
}: {
  client: SupabaseClient;
  initialMessage?: string;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(initialMessage);
  const [submitting, setSubmitting] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setMessage("");
    const { error } = await client.auth.signInWithPassword({ email: email.trim(), password });
    if (error) {
      setMessage("El correo o la contraseña no son correctos.");
      setSubmitting(false);
    }
  }

  return (
    <main className="admin-login-page">
      <section className="admin-login-card" aria-labelledby="admin-login-title">
        <img src="/images/logo/capitan-gringo.png" alt="Capitán Gringo" width="110" height="110" />
        <span>Área privada</span>
        <h1 id="admin-login-title">Panel de administración</h1>
        <p>Inicia sesión para actualizar el contenido de la página.</p>
        <form onSubmit={submit}>
          <label htmlFor="admin-email">Correo electrónico</label>
          <input
            id="admin-email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="username"
            required
          />
          <label htmlFor="admin-password">Contraseña</label>
          <input
            id="admin-password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
            required
          />
          <button className="admin-primary-button" type="submit" disabled={submitting}>
            {submitting ? "Iniciando sesión…" : "Iniciar sesión"}
          </button>
          {message && <div className="admin-message admin-message-error" role="alert">{message}</div>}
        </form>
      </section>
    </main>
  );
}

const navigation = [
  { href: "/admin", label: "Inicio", icon: "⌂" },
  { href: "/admin/inicio", label: "Editar inicio", icon: "✎" },
  { href: "/admin/excursiones", label: "Excursiones", icon: "☼" },
  { href: "/admin/galerias", label: "Galerías", icon: "▦" },
  { href: "/admin/contacto", label: "Contacto", icon: "☎" },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const client = useMemo(() => getBrowserSupabase(), []);
  const pathname = usePathname();
  const [phase, setPhase] = useState<"loading" | "login" | "ready" | "config">(client ? "loading" : "config");
  const [user, setUser] = useState<User | null>(null);
  const [loginMessage, setLoginMessage] = useState("");

  useEffect(() => {
    if (!client) return;
    let active = true;

    async function acceptUser(nextUser: User | null) {
      if (!active) return;
      if (!nextUser) {
        setUser(null);
        setPhase("login");
        return;
      }
      try {
        const allowed = await verifyAdmin(client!, nextUser.id);
        if (!allowed) {
          await client!.auth.signOut();
          if (active) {
            setLoginMessage("Esta cuenta no tiene permiso para entrar al panel.");
            setPhase("login");
          }
          return;
        }
        await seedInitialContent(client!);
        if (active) {
          setUser(nextUser);
          setPhase("ready");
        }
      } catch (error) {
        console.error("No se pudo preparar el panel.", error instanceof Error ? error.message : JSON.stringify(error));
        if (active) setPhase("config");
      }
    }

    client.auth.getUser().then(({ data }) => acceptUser(data.user));
    const { data: listener } = client.auth.onAuthStateChange((_event, session) => {
      window.setTimeout(() => acceptUser(session?.user ?? null), 0);
    });
    return () => {
      active = false;
      listener.subscription.unsubscribe();
    };
  }, [client]);

  if (phase === "loading") {
    return <main className="admin-loading"><span className="admin-spinner" />Preparando tu panel…</main>;
  }

  if (!client || phase === "config") {
    return (
      <main className="admin-login-page">
        <section className="admin-login-card admin-setup-card">
          <img src="/images/logo/capitan-gringo.png" alt="Capitán Gringo" width="100" height="100" />
          <span>Configuración pendiente</span>
          <h1>El panel está preparado.</h1>
          <p>Completa los pasos de <strong>CONFIGURAR_PANEL_ADMIN.txt</strong> para activar el acceso.</p>
          <a className="admin-secondary-button" href="/" target="_blank" rel="noreferrer">Ver página pública</a>
        </section>
      </main>
    );
  }

  if (phase === "login" || !user) return <LoginScreen client={client} initialMessage={loginMessage} />;

  async function signOut() {
    await client!.auth.signOut();
    setUser(null);
    setPhase("login");
  }

  return (
    <AdminContext.Provider value={{ client, user, signOut }}>
      <div className="admin-app" translate="no">
        <aside className="admin-sidebar">
          <Link className="admin-brand" href="/admin">
            <img src="/images/logo/capitan-gringo.png" alt="" width="58" height="58" />
            <span><strong>Capitán Gringo</strong><small>Administración</small></span>
          </Link>
          <nav aria-label="Secciones del panel">
            {navigation.map((item) => (
              <Link key={item.href} href={item.href} className={pathname === item.href ? "active" : ""}>
                <span aria-hidden="true">{item.icon}</span>{item.label}
              </Link>
            ))}
          </nav>
          <div className="admin-sidebar-footer">
            <a href="/" target="_blank" rel="noreferrer"><span aria-hidden="true">↗</span> Ver página</a>
            <button type="button" onClick={signOut}><span aria-hidden="true">↪</span> Cerrar sesión</button>
            <small>{user.email}</small>
          </div>
        </aside>
        <header className="admin-mobile-header">
          <Link href="/admin"><img src="/images/logo/capitan-gringo.png" alt="Capitán Gringo" width="42" height="42" /></Link>
          <details>
            <summary aria-label="Abrir menú">Menú</summary>
            <nav>
              {navigation.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
              <a href="/" target="_blank" rel="noreferrer">Ver página</a>
              <button type="button" onClick={signOut}>Cerrar sesión</button>
            </nav>
          </details>
        </header>
        <main className="admin-main">{children}</main>
      </div>
    </AdminContext.Provider>
  );
}
