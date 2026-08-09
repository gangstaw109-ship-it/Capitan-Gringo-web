import assert from "node:assert/strict";
import test from "node:test";

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("renderiza la portada de Capitán Gringo", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /Excursiones en Isla Saona y Punta Cana/);
  assert.match(html, /El Caribe que viniste a vivir/);
  assert.match(html, /18097539469/);
  assert.doesNotMatch(html, /Lorem ipsum|codex-preview|Your site is taking shape/i);
});

test("renderiza una ficha individual de excursión", async () => {
  const response = await render("/excursiones/saona-completa-4-playas");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Saona Completa 4 Playas/);
  assert.match(html, /Canto de la Playa/);
  assert.match(html, /US\$60/);
});

test("mantiene disponibles las rutas públicas principales", async () => {
  for (const path of ["/excursiones", "/destinos", "/nosotros", "/galeria", "/reservar"]) {
    const response = await render(path);
    assert.equal(response.status, 200, path);
    assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i, path);
  }
});

test("expone el acceso administrativo sin mezclar la navegación pública", async () => {
  const response = await render("/admin");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Panel de administración|El panel está preparado/);
  assert.doesNotMatch(html, /Navegación principal/);
});
