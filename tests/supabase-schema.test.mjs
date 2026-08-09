import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const schemaUrl = new URL("../supabase/SETUP_SUPABASE.sql", import.meta.url);
const envUrl = new URL("../.env.example", import.meta.url);

test("el esquema limita las escrituras a administradores", async () => {
  const sql = await readFile(schemaUrl, "utf8");
  assert.match(sql, /alter table public\.excursions enable row level security/i);
  assert.match(sql, /Public can read visible excursions[\s\S]*visible = true or public\.is_admin\(\)/i);
  assert.match(sql, /Admins manage excursions[\s\S]*public\.is_admin\(\)/i);
  assert.doesNotMatch(sql, /for (insert|update|delete) to anon/i);
});

test("Storage acepta solo imágenes y restringe cambios a administradores", async () => {
  const sql = await readFile(schemaUrl, "utf8");
  assert.match(sql, /allowed_mime_types[\s\S]*image\/jpeg[\s\S]*image\/png[\s\S]*image\/webp/i);
  assert.match(sql, /file_size_limit[\s\S]*8388608/i);
  assert.match(sql, /Admins can upload site media[\s\S]*public\.is_admin\(\)/i);
  assert.match(sql, /Admins can delete site media[\s\S]*public\.is_admin\(\)/i);
});

test("el ejemplo de entorno no contiene credenciales", async () => {
  const env = await readFile(envUrl, "utf8");
  assert.match(env, /^NEXT_PUBLIC_SUPABASE_URL=\s*$/m);
  assert.match(env, /^NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=\s*$/m);
  assert.doesNotMatch(env, /service_role|sb_secret_|eyJ[A-Za-z0-9_-]+\./i);
});

