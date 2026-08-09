import { ExcursionEditor } from "../../components/ExcursionEditor";

export default async function EditExcursionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <ExcursionEditor slug={slug} />;
}

