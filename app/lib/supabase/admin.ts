import type { SupabaseClient } from "@supabase/supabase-js";
import { faqs, homepageContent } from "../../content/editable";
import { galleryImages, site, tours } from "../../content/site";

export async function verifyAdmin(client: SupabaseClient, userId: string) {
  const { data, error } = await client
    .from("admin_users")
    .select("role")
    .eq("user_id", userId)
    .eq("active", true)
    .maybeSingle();
  if (error) throw error;
  return data?.role === "owner" || data?.role === "editor";
}

function requireSuccess(error: { message: string } | null) {
  if (error) throw new Error(error.message);
}

export async function seedInitialContent(client: SupabaseClient) {
  const { data: status, error: statusError } = await client
    .from("cms_status")
    .select("initialized")
    .eq("id", "main")
    .maybeSingle();
  requireSuccess(statusError);
  if (status?.initialized) return;

  requireSuccess((await client.from("site_settings").upsert({ id: "main", content: site })).error);
  requireSuccess((await client.from("homepage_content").upsert({ id: "main", content: homepageContent })).error);
  requireSuccess((await client.from("excursions").upsert(
    tours.map((tour, index) => ({
      slug: tour.slug,
      visible: true,
      sort_order: index,
      content: tour,
    })),
  )).error);
  requireSuccess((await client.from("gallery_images").upsert(
    galleryImages.map((image, index) => ({
      id: `gallery-${String(index + 1).padStart(2, "0")}`,
      src: image.src,
      alt: image.alt,
      storage_path: null,
      sort_order: index,
      visible: true,
    })),
  )).error);
  requireSuccess((await client.from("faqs").upsert(
    faqs.map((faq, index) => ({
      id: `faq-${String(index + 1).padStart(2, "0")}`,
      question: faq.question,
      answer: faq.answer,
      sort_order: index,
      visible: true,
    })),
  )).error);
  requireSuccess((await client.from("cms_status").upsert({ id: "main", initialized: true })).error);
}

const allowedImageTypes: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

export async function uploadAdminImage(client: SupabaseClient, file: File, folder: string) {
  const extension = allowedImageTypes[file.type];
  if (!extension) throw new Error("Selecciona una imagen JPG, PNG o WebP.");
  if (file.size > 8 * 1024 * 1024) throw new Error("La imagen no puede superar 8 MB.");

  const safeFolder = folder.toLowerCase().replace(/[^a-z0-9/-]/g, "-").replace(/\/{2,}/g, "/");
  const storagePath = `${safeFolder}/${Date.now()}-${crypto.randomUUID()}.${extension}`;
  const { error } = await client.storage.from("site-media").upload(storagePath, file, {
    cacheControl: "31536000",
    contentType: file.type,
    upsert: false,
  });
  if (error) throw error;
  const { data } = client.storage.from("site-media").getPublicUrl(storagePath);
  return { src: data.publicUrl, storagePath };
}

export async function removeAdminImages(client: SupabaseClient, paths: string[]) {
  const uniquePaths = [...new Set(paths.filter(Boolean))];
  if (uniquePaths.length === 0) return;
  const { error } = await client.storage.from("site-media").remove(uniquePaths);
  if (error) console.error("No se pudieron retirar algunos archivos antiguos.", error.message);
}

