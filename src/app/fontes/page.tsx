import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SourcesCatalog } from "@/components/SourcesCatalog";

export const metadata: Metadata = {
  title: "Fontes de jogos — Veche",
  description: "Explore os catálogos de jogos e copie a URL de referência de cada fonte.",
};

export default function SourcesPage() {
  return <><SiteHeader /><SourcesCatalog /></>;
}
