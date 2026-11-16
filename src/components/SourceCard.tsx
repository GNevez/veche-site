"use client";

import { useState, type ComponentType } from "react";
import { sourceLink, type CatalogSource } from "@/lib/source-catalog";
import { CalendarIcon, CheckIcon, CopyIcon, DownloadIcon, GamepadIcon } from "./icons";

type IconComponent = ComponentType<{ size?: number; className?: string }>;

const compact = new Intl.NumberFormat("pt-BR", { notation: "compact", maximumFractionDigits: 1 });
const full = new Intl.NumberFormat("pt-BR");
const day = new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "short", year: "numeric" });

function Stat({ icon: Icon, value, label }: { icon: IconComponent; value: number; label: string }) {
  return <li title={`${full.format(value)} ${label}`} className="flex items-center gap-1.5">
    <Icon size={14} className="text-subtle" />
    <span className="font-semibold text-body tabular-nums">{compact.format(value)}</span>
    <span className="sr-only">{label}</span>
  </li>;
}

export function SourceCard({ source, onCopy }: { source: CatalogSource; onCopy: (source: CatalogSource) => Promise<boolean> }) {
  const [copied, setCopied] = useState(false);
  const link = sourceLink(source);

  async function copy() {
    if (!await onCopy(source)) return;
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  return <article className="flex min-w-0 flex-col rounded-xl border border-card-line bg-card p-5 transition-colors hover:border-[#f25f1c55]">
    <div className="flex items-start justify-between gap-3">
      <h2 className="min-w-0 truncate font-display text-lg font-bold tracking-[-.02em]">{source.name}</h2>
      {source.classics && <span className="shrink-0 rounded-full border border-[#f25f1c30] bg-[#f25f1c12] px-2.5 py-1 text-[11px] font-semibold text-brand-hover">Clássicos</span>}
    </div>
    <p className="mt-2 line-clamp-2 text-[13px] leading-[1.6] text-muted">{source.description}</p>
    <div className="mt-auto flex flex-wrap items-center justify-between gap-x-4 gap-y-2 pt-5 text-[12px]">
      <ul className="flex items-center gap-4">
        <Stat icon={GamepadIcon} value={source.entries} label="jogos" />
        <Stat icon={CopyIcon} value={Number(source.copies)} label="cópias" />
        <Stat icon={DownloadIcon} value={Number(source.downloads)} label="downloads" />
      </ul>
      <span className="flex items-center gap-1.5 text-subtle"><CalendarIcon size={13} />{day.format(new Date(source.createdAt))}</span>
    </div>
    <div className="mt-5 flex items-center gap-2 border-t border-card-line pt-4">
      <input readOnly value={link} aria-label={`Link de ${source.name}`} onFocus={event => event.target.select()} className="h-10 min-w-0 flex-1 truncate rounded-lg border border-card-line bg-night px-3 font-mono text-[11px] text-muted outline-none focus-visible:border-brand" />
      <button type="button" onClick={() => void copy()} aria-label={`Copiar link de ${source.name}`} className={`flex h-10 shrink-0 items-center gap-2 rounded-lg px-4 text-[12px] font-bold transition-colors ${copied ? "bg-[#3dd68c1a] text-online" : "bg-brand text-brand-ink hover:bg-brand-hover"}`}>
        {copied ? <CheckIcon size={14} /> : <CopyIcon size={14} />}{copied ? "Copiado" : "Copiar"}
      </button>
    </div>
  </article>;
}
