"use client";
import { useState, type FormEvent } from "react";
import Link from "next/link";
import { SOURCES_API, SOURCE_TERMS_VERSION, apiError, sourceLink, type CatalogSource } from "@/lib/source-catalog";
import { BACK_LINK, CHECKBOX, CHECKBOX_LABEL, FIELD_HINT, FIELD_INPUT, FIELD_LABEL, FILE_INPUT, FORM, FORM_NOTE, FORM_PANEL, KICKER, PANEL_TITLE, PAGE, PRIMARY_BUTTON } from "./source-classes";

const RULE = "pl-[5px] text-[13px] marker:font-extrabold marker:text-brand";
const RULE_TEXT = "mt-1.5 text-[12px] leading-[1.9] text-muted";

export function SourceSubmissionForm() {
  const [session, setSession] = useState<{ token: string; username: string } | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [accepted, setAccepted] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<CatalogSource | null>(null);
  const [copied, setCopied] = useState(false);

  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setError("");
    const form = event.currentTarget;
    const data = new FormData(form);
    try {
      const response = await fetch(`${SOURCES_API}/api/Auth/login`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ username: data.get("username"), password: data.get("password"), remember: false }) });
      if (!response.ok) throw new Error(await apiError(response));
      setSession(await response.json()); form.reset();
    } catch (reason) { setError(reason instanceof Error ? reason.message : "Não foi possível entrar."); }
    finally { setBusy(false); }
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!session || !file || !accepted || busy) return;
    setError(""); setBusy(true);
    const data = new FormData(event.currentTarget);
    data.set("AcceptedTerms", "true"); data.set("TermsVersion", SOURCE_TERMS_VERSION);
    try {
      const response = await fetch(`${SOURCES_API}/api/source-catalog`, { method: "POST", headers: { Authorization: `Bearer ${session.token}` }, body: data });
      if (!response.ok) { if (response.status === 401) setSession(null); throw new Error(await apiError(response)); }
      setResult(await response.json());
    } catch (reason) { setError(reason instanceof Error ? reason.message : "Falha no envio. Confira sua conexão e tente novamente."); }
    finally { setBusy(false); }
  }

  async function remove() {
    if (!result || !session) return;
    setBusy(true); setError("");
    try {
      const response = await fetch(`${SOURCES_API}/api/source-catalog/${result.id}`, { method: "DELETE", headers: { Authorization: `Bearer ${session.token}` } });
      if (!response.ok) throw new Error(await apiError(response));
      setResult(null); setFile(null); setAccepted(false); setCopied(false);
    } catch (reason) { setError(reason instanceof Error ? reason.message : "Falha ao remover fonte."); }
    finally { setBusy(false); }
  }

  return <main className={PAGE}><Link href="/fontes" className={BACK_LINK}>← Todas as fontes</Link><header className="py-[45px]"><p className={KICKER}>FEITO PELA COMUNIDADE</p><h1 className="tracking-[-.04em] [font:700_clamp(30px,4vw,48px)/1.3_var(--font-display)]">Compartilhe uma<br /><span className="text-brand">nova fonte.</span></h1><p className="mt-5 text-[14px] leading-[1.8] text-muted">Envie seu catálogo. O sistema valida o arquivo e publica uma URL para compartilhar.</p></header>
    <div className="grid grid-cols-[1fr_1fr] items-start gap-10 pb-[60px] upto-800:grid-cols-[1fr] upto-800:gap-6">
      <section id="regras" className={FORM_PANEL} aria-labelledby="rules-title"><h2 id="rules-title" className={PANEL_TITLE}>Regras de envio</h2><ol className="grid list-decimal gap-[22px] pl-5">
        <li className={RULE}><strong>Envie um arquivo JSON.</strong><p className={RULE_TEXT}>Arquivo .json de até 20 MB. O catálogo publicado ficará acessível por um link público.</p></li>
        <li className={RULE}><strong>Estrutura completa, em todos os itens.</strong><p className={RULE_TEXT}>O documento deve conter name e downloads. Cada entrada precisa de title, uris, uploadDate e fileSize. Endereços HTTPS ou magnet.</p></li>
        <li className={RULE}><strong>De 30 a 50.000 entradas.</strong><p className={RULE_TEXT}>Os limites ajudam a manter os catálogos úteis e o processamento previsível.</p></li>
        <li className={RULE}><strong>Publique apenas o que pode compartilhar.</strong><p className={RULE_TEXT}>Ao enviar, você declara ter os direitos e autorizações necessários para publicar e permitir a hospedagem do catálogo. Não envie conteúdo ilícito, dados pessoais, senhas ou links com credenciais.</p></li>
        <li className={RULE}><strong>A validação é técnica.</strong><p className={RULE_TEXT}>A aprovação automática verifica formato e limites. Não verifica a segurança dos downloads ou direitos autorais. Fontes podem ser removidas por violação das regras ou reclamações de titulares.</p></li>
      </ol><p className="mt-[25px] border-t border-t-line pt-5 text-[10px] leading-[1.9] text-muted">Regras de envio · versão {SOURCE_TERMS_VERSION}. Seu aceite fica registrado junto à sua conta e à data do envio. A hospedagem não transfere a propriedade do conteúdo para o Veche.</p></section>
      <section className={FORM_PANEL} aria-labelledby="submit-title"><h2 id="submit-title" className={PANEL_TITLE}>Enviar fonte</h2>
        {!session ? <form onSubmit={login} className={FORM}><p className={FORM_NOTE}>Entre com sua conta Veche para identificar e gerenciar este envio.</p><label className={FIELD_LABEL}>Usuário ou e-mail<input className={FIELD_INPUT} name="username" required autoComplete="username" maxLength={100} /></label><label className={FIELD_LABEL}>Senha<input className={FIELD_INPUT} type="password" name="password" required autoComplete="current-password" maxLength={128} /></label><button className={PRIMARY_BUTTON} disabled={busy}>{busy ? "Entrando…" : "Entrar com Veche"}</button><p className={FORM_NOTE}>Você pode criar sua conta no aplicativo Veche.</p></form>
        : result ? <div className={FORM}><p role="status" className={FORM_NOTE}><strong>Fonte publicada!</strong> {result.entries.toLocaleString("pt-BR")} entradas passaram pela validação de estrutura.</p><label className={FIELD_LABEL}>URL pública<input className={FIELD_INPUT} readOnly value={sourceLink(result)} onFocus={event => event.target.select()} /></label><button className={PRIMARY_BUTTON} onClick={async () => { try { await navigator.clipboard.writeText(sourceLink(result)); setCopied(true); } catch { setError("Selecione a URL acima e copie manualmente."); } }}>{copied ? "Link copiado ✓" : "Copiar link"}</button><Link href="/fontes">Ver catálogo ↗</Link><button disabled={busy} onClick={() => void remove()}>Remover esta fonte</button></div>
        : <form onSubmit={submit} className={FORM}><div className="flex items-center justify-between gap-3 text-[11px] text-muted"><span>Conectado como <strong>{session.username}</strong></span><button type="button" className="p-2.5 text-brand-hover" disabled={busy} onClick={() => setSession(null)}>Sair</button></div>
          <label className={FIELD_LABEL}>Nome<input className={FIELD_INPUT} name="Name" value={name} onChange={event => setName(event.target.value)} required minLength={2} maxLength={24} placeholder="Nome da fonte" /><small className={FIELD_HINT}>{name.length}/24 caracteres</small></label>
          <label className={FIELD_LABEL}>Descrição<textarea className={`${FIELD_INPUT} resize-y`} name="Description" value={description} onChange={event => setDescription(event.target.value.replace(/\s*[\r\n]+\s*/g, " "))} required minLength={10} maxLength={100} placeholder="Conte o que há neste catálogo" rows={3} /><small className={FIELD_HINT}>{description.length}/100 caracteres</small></label>
          <label className={FIELD_LABEL}>Arquivo JSON<input className={FILE_INPUT} type="file" name="File" required accept=".json,application/json" onChange={event => { const selected = event.target.files?.[0] ?? null; if (selected && (!selected.name.toLowerCase().endsWith(".json") || selected.size > 20 * 1024 * 1024)) { setError("Escolha um arquivo .json de até 20 MB."); event.target.value = ""; setFile(null); } else { setFile(selected); setError(""); } }} /><small className={FIELD_HINT}>{file ? `${file.name} · ${(file.size / 1024 / 1024).toFixed(1)} MB` : "Até 20 MB. A validação completa acontece no servidor."}</small></label>
          <label className={CHECKBOX_LABEL}><input className={CHECKBOX} type="checkbox" name="Classics" value="true" />Esta fonte contém jogos clássicos</label>
          <label className={CHECKBOX_LABEL}><input className={CHECKBOX} type="checkbox" checked={accepted} onChange={event => setAccepted(event.target.checked)} required />Li e aceito as regras de envio. Declaro ter autorização para publicar este catálogo e permitir sua hospedagem pelo Veche.</label>
          <button className={PRIMARY_BUTTON} disabled={!accepted || !file || busy || name.trim().length < 2 || description.trim().length < 10}>{busy ? "Validando e publicando…" : "Enviar fonte ↗"}</button>
        </form>}
        {error && <p className="mt-5 text-[12px] leading-[1.8] text-[#ffad97]" role="alert">{error}</p>}
      </section>
    </div>
  </main>;
}
