import { createClient } from "@supabase/supabase-js";
import { cache } from "react";
import { faqs as fallbackFaqs, homepageContent as fallbackHomepage, type Faq, type HomepageContent } from "../content/editable";
import {
  destinations,
  galleryImages as fallbackGallery,
  getTour as getFallbackTour,
  paymentNotes,
  site as fallbackSite,
  tours as fallbackTours,
  type Tour,
} from "../content/site";
import { hasSupabaseConfig, supabasePublishableKey, supabaseUrl } from "./supabase/config";

export type SiteInfo = typeof fallbackSite;
export type GalleryImage = {
  id?: string;
  src: string;
  alt: string;
  storagePath?: string;
  sortOrder?: number;
};

function publicClient() {
  if (!hasSupabaseConfig()) return null;
  return createClient(supabaseUrl, supabasePublishableKey, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
  });
}

async function withTimeout<T>(promise: PromiseLike<T>, timeoutMs = 2500): Promise<T> {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;
  const timeout = new Promise<never>((_, reject) => {
    timeoutId = setTimeout(() => reject(new Error("Supabase timeout")), timeoutMs);
  });
  try {
    return await Promise.race([Promise.resolve(promise), timeout]);
  } finally {
    if (timeoutId) clearTimeout(timeoutId);
  }
}

const cmsIsInitialized = cache(async () => {
  const client = publicClient();
  if (!client) return false;
  try {
    const { data, error } = await withTimeout(
      client.from("cms_status").select("initialized").eq("id", "main").maybeSingle(),
    );
    if (error) return false;
    return data?.initialized === true;
  } catch {
    return false;
  }
});

function fallbackVisibleTours() {
  return fallbackTours.map((tour, index) => ({ ...tour, visible: true, sortOrder: index }));
}

export const getSiteSettings = cache(async (): Promise<SiteInfo> => {
  const client = publicClient();
  if (!client || !(await cmsIsInitialized())) return fallbackSite;
  try {
    const { data, error } = await withTimeout(
      client.from("site_settings").select("content").eq("id", "main").maybeSingle(),
    );
    return error || !data?.content ? fallbackSite : ({ ...fallbackSite, ...data.content } as SiteInfo);
  } catch {
    return fallbackSite;
  }
});

export const getHomepageContent = cache(async (): Promise<HomepageContent> => {
  const client = publicClient();
  if (!client || !(await cmsIsInitialized())) return fallbackHomepage;
  try {
    const { data, error } = await withTimeout(
      client.from("homepage_content").select("content").eq("id", "main").maybeSingle(),
    );
    return error || !data?.content ? fallbackHomepage : (data.content as HomepageContent);
  } catch {
    return fallbackHomepage;
  }
});

export const getPublicTours = cache(async (): Promise<Tour[]> => {
  const client = publicClient();
  if (!client || !(await cmsIsInitialized())) return fallbackVisibleTours();
  try {
    const { data, error } = await withTimeout(
      client.from("excursions").select("slug, visible, sort_order, content").eq("visible", true).order("sort_order"),
    );
    if (error) return fallbackVisibleTours();
    return (data ?? []).map((row) => ({
      ...(row.content as Tour),
      slug: row.slug,
      visible: row.visible,
      sortOrder: row.sort_order,
    }));
  } catch {
    return fallbackVisibleTours();
  }
});

export const getPublicTour = cache(async (slug: string): Promise<Tour | undefined> => {
  const client = publicClient();
  if (!client || !(await cmsIsInitialized())) return getFallbackTour(slug);
  try {
    const { data, error } = await withTimeout(
      client.from("excursions").select("slug, visible, sort_order, content").eq("slug", slug).eq("visible", true).maybeSingle(),
    );
    if (error) return getFallbackTour(slug);
    if (!data) return undefined;
    return { ...(data.content as Tour), slug: data.slug, visible: true, sortOrder: data.sort_order };
  } catch {
    return getFallbackTour(slug);
  }
});

export const getPublicGallery = cache(async (): Promise<GalleryImage[]> => {
  const client = publicClient();
  if (!client || !(await cmsIsInitialized())) return fallbackGallery;
  try {
    const { data, error } = await withTimeout(
      client.from("gallery_images").select("id, src, alt, storage_path, sort_order").eq("visible", true).order("sort_order"),
    );
    if (error) return fallbackGallery;
    return (data ?? []).map((image) => ({
      id: image.id,
      src: image.src,
      alt: image.alt,
      storagePath: image.storage_path ?? undefined,
      sortOrder: image.sort_order,
    }));
  } catch {
    return fallbackGallery;
  }
});

export const getPublicFaqs = cache(async (): Promise<Faq[]> => {
  const client = publicClient();
  if (!client || !(await cmsIsInitialized())) return fallbackFaqs;
  try {
    const { data, error } = await withTimeout(
      client.from("faqs").select("id, question, answer, sort_order").eq("visible", true).order("sort_order"),
    );
    if (error) return fallbackFaqs;
    return (data ?? []).map((faq) => ({
      id: faq.id,
      question: faq.question,
      answer: faq.answer,
      sortOrder: faq.sort_order,
    }));
  } catch {
    return fallbackFaqs;
  }
});

export { destinations, paymentNotes };

