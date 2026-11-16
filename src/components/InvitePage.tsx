import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { SiteHeader } from "./SiteHeader";
import { DownloadButtons } from "./DownloadButtons";
import { HeadsetIcon } from "./icons";
import { OpenInApp } from "./OpenInApp";
import { assetUrl, deepLink, fetchInvite, type PublicInvite } from "@/lib/invites";

const count = (value: number) => value.toLocaleString("pt-BR");
const initials = (name: string) => name.trim().split(/\s+/).slice(0, 2).map((word) => word[0]).join("").toUpperCase() || "?";

export async function inviteMetadata(code: string): Promise<Metadata> {
  const invite = await fetchInvite(code);
  if (!invite) return { title: "Convite inválido · Veche" };
  const title = invite.kind === "call" && invite.channelName ? `Entrar em ${invite.channelName} · ${invite.serverName}` : `Convite para ${invite.serverName}`;
  const icon = assetUrl(invite.serverIconUrl);
  return {
    title: `${title} · Veche`,
    description: invite.serverDescription ?? `${count(invite.memberCount)} membros no Veche.`,
    openGraph: { title, description: invite.serverDescription ?? undefined, images: icon ? [icon] : undefined },
  };
}

export async function InvitePage({ code }: { code: string }) {
  const invite = await fetchInvite(code);
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div aria-hidden="true" className="dot-grid pointer-events-none absolute inset-0" />
      <SiteHeader />
      <main className="relative mx-auto flex max-w-7xl justify-center px-6 pt-10 pb-20">
        {invite ? <InviteCard code={code} invite={invite} /> : <InvalidInvite />}
      </main>
    </div>
  );
}

function InviteCard({ code, invite }: { code: string; invite: PublicInvite }) {
  const banner = assetUrl(invite.serverBannerUrl);
  const icon = assetUrl(invite.serverIconUrl);
  const call = invite.kind === "call";
  return (
    <section className="w-full max-w-[440px] overflow-hidden rounded-2xl border border-card-line bg-card shadow-[0_30px_80px_rgb(0_0_0/.55)]">
      <div className="relative h-28 bg-linear-to-br from-brand via-brand-deep to-dial">
        {banner && <Image src={banner} alt="" fill unoptimized className="object-cover" />}
      </div>
      <div className="px-7 pb-7">
        <div className="relative -mt-10 grid h-20 w-20 place-items-center overflow-hidden rounded-2xl bg-avatar font-display text-xl font-bold text-soft ring-[6px] ring-card">
          {icon ? <Image src={icon} alt="" width={80} height={80} unoptimized className="h-full w-full object-cover" /> : initials(invite.serverName)}
        </div>
        <p className="mt-5 text-sm font-semibold text-subtle">{call ? "Você foi chamado para uma call em" : "Você foi convidado para"}</p>
        <h1 className="mt-1 font-display text-2xl leading-tight font-bold break-words">{invite.serverName}</h1>
        <p className="mt-3 flex flex-wrap items-center gap-4 text-sm text-muted">
          <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-online" />{count(invite.onlineCount)} online</span>
          <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-subtle" />{count(invite.memberCount)} {invite.memberCount === 1 ? "membro" : "membros"}</span>
        </p>
        {invite.serverDescription && <p className="mt-4 line-clamp-3 text-[15px] leading-relaxed text-body">{invite.serverDescription}</p>}
        {call && invite.channelName && (
          <p className="mt-4 flex items-center gap-2 rounded-xl border border-card-line bg-chip px-4 py-3 text-sm font-semibold text-brand">
            <HeadsetIcon size={16} />
            <span className="truncate">{invite.channelName}</span>
            {!!invite.inCallCount && <span className="ml-auto shrink-0 text-xs font-medium text-muted">{invite.inCallCount} na call</span>}
          </p>
        )}
        <div className="mt-6">
          <OpenInApp href={deepLink(invite.kind, code)} label={call ? "Entrar na chamada" : "Entrar no servidor"} />
        </div>
        <p className="mt-4 text-center text-sm text-subtle">
          Não tem o Veche?{" "}
          <Link href="/download" className="font-bold text-ink underline-offset-4 hover:text-brand hover:underline">Baixe aqui</Link>
        </p>
      </div>
    </section>
  );
}

function InvalidInvite() {
  return (
    <section className="flex max-w-[520px] flex-col items-center gap-6 pt-10 text-center">
      <h1 className="font-display text-3xl font-bold">Convite inválido</h1>
      <p className="text-lg leading-relaxed text-muted">Este convite expirou, atingiu o limite de usos ou nunca existiu. Peça um link novo para quem te chamou.</p>
      <DownloadButtons />
    </section>
  );
}
