import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { DownloadButtons } from "@/components/DownloadButtons";

export const metadata: Metadata = {
  title: "Baixar o Veche",
  description: "Baixe o Veche e entre na call com o squad.",
};

export default function Download() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div aria-hidden="true" className="dot-grid pointer-events-none absolute inset-0" />
      <SiteHeader />
      <main className="relative mx-auto flex max-w-3xl flex-col items-center gap-7 px-6 pt-16 pb-20 text-center">
        <h1 className="m-0 font-display text-[clamp(36px,5vw,64px)] leading-[1] font-extrabold tracking-[-0.02em] uppercase">
          Baixe o <span className="text-brand">Veche</span>
        </h1>
        <p className="m-0 max-w-[480px] text-lg leading-[1.6] text-muted">
          Instale, entre na sua conta e clique de novo no convite: ele abre direto no app.
        </p>
        <DownloadButtons />
      </main>
    </div>
  );
}
