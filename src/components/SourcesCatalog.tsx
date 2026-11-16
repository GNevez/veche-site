"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import symbol from "@/assets/symbol.png";
import { SOURCES_API, apiError, sourceLink, type CatalogSource } from "@/lib/source-catalog";
import { BACK_LINK, CATALOG_INPUT, KICKER, PAGE } from "./source-classes";
import { SourceCard } from "./SourceCard";

type Source = CatalogSource;
const LINK_BUTTON = "p-3.5 text-brand-hover";
const EMPTY = "rounded-xl border border-dashed border-line px-5 py-[60px] text-center";
const EMPTY_TEXT = "my-3 text-muted";
const TOOLBAR_LABEL = "flex flex-col gap-[9px] text-[11px] text-muted";
const GUIDE_STEP = "flex gap-[22px]";
const GUIDE_NUMBER = "text-brand [font:14px_var(--font-display)]";
const GUIDE_TITLE = "text-[14px]";
const GUIDE_TEXT = "mt-1.5 text-[12px] leading-[1.8] text-muted";

export function SourcesCatalog() {
  const [sources, setSources] = useState<Source[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [retry, setRetry] = useState(0);
  const [query, setQuery] = useState("");
  const [order, setOrder] = useState("name");
  const [message, setMessage] = useState("");
  const [manual, setManual] = useState("");
  const counted = useRef(new Set<string>());
  const visible = sources;
  useEffect(() => {
    const controller = new AbortController();
    const timer = setTimeout(async () => {
      setLoading(true); setError("");
      try {
        const response = await fetch(`${SOURCES_API}/api/source-catalog?${new URLSearchParams({ search: query, sort: order, page: String(page) })}`, { signal: controller.signal });
        if (!response.ok) throw new Error(await apiError(response));
        const data = await response.json();
        if (!controller.signal.aborted) { setSources(data.items); setTotal(data.total); setPages(data.pages); }
      } catch (reason) {
        if (!controller.signal.aborted) { setSources([]); setError(reason instanceof Error ? reason.message : "Não foi possível carregar as fontes."); }
      } finally { if (!controller.signal.aborted) setLoading(false); }
    }, 250);
    return () => { clearTimeout(timer); controller.abort(); };
  }, [query, order, page, retry]);

  async function copy(source: Source) {
    const url = sourceLink(source);
    setManual("");
    try {
      await navigator.clipboard.writeText(url);
      setMessage(`Link de ${source.name} copiado.`);
      void recordCopy(source);
      return true;
    } catch {
      setManual(url);
      setMessage("Não foi possível copiar automaticamente. Selecione o endereço abaixo e copie.");
      return false;
    }
  }

  async function recordCopy(source: Source) {
    if (counted.current.has(source.id)) return;
    counted.current.add(source.id);
    const response = await fetch(`${SOURCES_API}/api/source-catalog/${source.id}/copies`, { method: "POST" }).catch(() => null);
    if (!response?.ok) return;
    const { copies } = await response.json();
    setSources(current => current.map(item => item.id === source.id ? { ...item, copies } : item));
  }

  return <main className={PAGE}>
    <div className="relative">
      <Link href="/" className={BACK_LINK}>← Voltar ao Veche</Link>
      <div className="grid grid-cols-[1.4fr_1fr] items-center gap-[50px] pt-[65px] pb-[50px] upto-600:grid-cols-[1fr] upto-600:py-10"><div><p className={KICKER}>EXPLORE. ESCOLHA. CONECTE.</p><h1 className="font-display text-[clamp(36px,4.5vw,64px)] leading-[1.15] font-extrabold tracking-[-.045em]">Novos jogos.<br /><span className="text-brand">Novas fontes.</span></h1><p className="mt-[25px] max-w-[520px] text-[15px] leading-[1.9] text-muted">Um ponto de partida para seus catálogos. Encontre uma fonte e copie o endereço do JSON para usar em um aplicativo compatível.</p></div><div className="relative m-auto flex size-[300px] flex-col items-center justify-center gap-[25px] rounded-[50%] border border-[#f25f1c25] bg-[radial-gradient(circle,#f25f1c18,transparent_70%)] shadow-[0_0_0_35px_#f25f1c04,0_0_0_36px_#f25f1c0b] upto-1000:size-[230px] upto-600:hidden" aria-hidden="true"><Image src={symbol} alt="" className="h-auto w-[95px]" /><span className="text-[8px] tracking-[.2em] text-subtle">CATÁLOGOS / JSON</span></div></div>
      <div className="flex items-center gap-[45px] border-y border-y-[#ffffff12] py-[25px] text-[12px] text-muted upto-600:flex-wrap upto-600:gap-5 upto-600:text-[10px]"><span><strong className="mr-2.5 font-display text-[25px] text-ink upto-600:text-[21px]">{loading || error ? "—" : total.toString().padStart(2, "0")}</strong> fontes encontradas</span><span>Formato <b className="ml-2 text-brand">JSON</b></span><Link href="/fontes/enviar">Enviar uma fonte ↗</Link></div>
    </div>
    <section aria-label="Catálogos disponíveis" className="pt-[45px]">
      <div className="flex justify-between gap-5 upto-600:flex-col"><label className={`${TOOLBAR_LABEL} max-w-[480px] flex-1 upto-600:max-w-none`}><span>Buscar fonte</span><input type="search" maxLength={100} value={query} onChange={event => { setQuery(event.target.value); setPage(1); }} placeholder="Digite o nome da fonte…" className={CATALOG_INPUT} /></label><label className={TOOLBAR_LABEL}><span>Ordenar por</span><select value={order} onChange={event => { setOrder(event.target.value); setPage(1); }} className={CATALOG_INPUT}><option value="name">Nome: A–Z</option><option value="entries">Mais jogos</option></select></label></div>
      <div className="mt-6 mb-[18px] text-[11px] text-subtle" role="status">{loading ? "Carregando catálogos…" : error ? "Catálogo indisponível" : `${total} fontes encontradas`}</div>
      {error && <div role="alert" className={EMPTY}><p className={EMPTY_TEXT}>{error}</p><button onClick={() => setRetry(retry + 1)} className={LINK_BUTTON}>Tentar novamente</button></div>}
      <div className="grid grid-cols-[repeat(3,1fr)] gap-5 upto-1000:grid-cols-[repeat(2,1fr)] upto-600:grid-cols-[1fr]">{visible.map(source => <SourceCard key={source.id} source={source} onCopy={copy} />)}</div>
      {!loading && !error && visible.length === 0 && <div className={EMPTY}><h2>Nenhuma fonte por aqui.</h2><p className={EMPTY_TEXT}>{query ? "Tente outro nome." : "Seja a primeira pessoa a enviar um catálogo."}</p>{query ? <button type="button" onClick={() => { setQuery(""); setPage(1); }} className={LINK_BUTTON}>Limpar busca</button> : <Link href="/fontes/enviar">Enviar fonte ↗</Link>}</div>}
      {pages > 1 && <div className="mt-[25px] flex items-center justify-center gap-[25px] text-[12px]"><button disabled={page === 1 || loading} onClick={() => setPage(page - 1)} className={`${LINK_BUTTON} disabled:cursor-default disabled:opacity-35`}>← Anterior</button><span>Página {page} de {pages}</span><button disabled={page >= pages || loading} onClick={() => setPage(page + 1)} className={`${LINK_BUTTON} disabled:cursor-default disabled:opacity-35`}>Próxima →</button></div>}
      <div className={manual ? "min-h-7 pt-[15px] text-[12px] text-brand-hover" : "sr-only"} role="status" aria-live="polite">{message}</div>
      {manual && <label className="grid gap-2.5 text-[12px]">URL para copiar<input readOnly value={manual} onFocus={event => event.target.select()} className={CATALOG_INPUT} /></label>}
    </section>
    <section className="grid grid-cols-[1fr_1fr] gap-[60px] py-[75px] upto-600:grid-cols-[1fr] upto-600:gap-[30px] upto-600:py-[55px]" aria-labelledby="how-to"><div><p className={KICKER}>DA FONTE PARA O SEU APP</p><h2 id="how-to" className="font-display text-[30px] leading-[1.4] tracking-[-.04em] upto-600:text-[26px]">Um link.<br />Seu próximo catálogo.</h2></div><ol className="grid gap-[26px]"><li className={GUIDE_STEP}><span className={GUIDE_NUMBER}>01</span><div><strong className={GUIDE_TITLE}>Escolha uma fonte</strong><p className={GUIDE_TEXT}>Confira o nome e as informações do catálogo.</p></div></li><li className={GUIDE_STEP}><span className={GUIDE_NUMBER}>02</span><div><strong className={GUIDE_TITLE}>Copie a URL</strong><p className={GUIDE_TEXT}>Use “Copiar link” para obter o endereço completo do JSON.</p></div></li><li className={GUIDE_STEP}><span className={GUIDE_NUMBER}>03</span><div><strong className={GUIDE_TITLE}>Adicione no aplicativo</strong><p className={GUIDE_TEXT}>Cole a URL na área de fontes de um aplicativo compatível. A disponibilidade desse recurso depende da versão utilizada.</p></div></li></ol></section>
    <aside className="max-w-[950px] border-l-2 border-l-[#f25f1c70] py-2 pl-[22px]"><strong className="text-[12px]">Sobre os catálogos</strong><p className="mt-2 text-[11px] leading-[1.9] text-subtle">Fontes enviadas pela comunidade e hospedadas na infraestrutura do Veche. A validação confere a estrutura do JSON; não certifica direitos de distribuição ou segurança dos downloads. Os totais representam entradas, não necessariamente jogos únicos. <Link href="/fontes/enviar#regras">Leia as regras de envio.</Link></p></aside>
    <footer className="mt-[60px] flex justify-between gap-5 border-t border-t-card-line pt-[25px] text-[12px]"><Link href="/">Veche <span className="ml-3.5 text-[10px] text-subtle upto-600:mx-0 upto-600:mt-2 upto-600:block">Há mais do outro lado.</span></Link><a className="upto-600:text-[10px]" href="#top" onClick={event => { event.preventDefault(); window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" }); }}>Voltar ao topo ↑</a></footer>
  </main>;
}
