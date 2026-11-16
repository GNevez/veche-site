"use client";

import Image from "next/image";
import { useState, type CSSProperties } from "react";
import { CameraIcon, CommentIcon, HeadsetIcon, HeartIcon, MicIcon, RepostIcon } from "./icons";
import { STATUS_DOT } from "./home-classes";

const PEOPLE = [
  { name: "neves", initial: "N", color: "bg-[#734128] text-[#ffb789]" },
  { name: "luna", initial: "L", color: "bg-[#4b3b70] text-[#cabaff]" },
  { name: "rafa", initial: "R", color: "bg-[#355644] text-[#b3e2bf]" },
  { name: "você", initial: "V", color: "bg-[#344e70] text-[#a8c5f7]" },
];

const AVATAR_SIZES = {
  large: "size-[58px] rounded-[20px] text-[23px]",
  small: "size-[33px] rounded-full text-[12px]",
  tiny: "size-[21px] rounded-full text-[8px]",
};

const CHANNEL_LABEL = "mx-2 mt-[14px] mb-[7px] text-[8px] leading-[1.85] tracking-[.07em] text-[#85828a] upto-560:hidden";
const TEXT_CHANNEL = "px-2 py-[7px] text-[10px] text-[#939098] upto-1100:text-[9px] upto-560:hidden";
const CONTROL = "relative grid min-h-10 min-w-10 place-items-center rounded-[11px] border border-[#ffffff0b] transition-[background] duration-200 ease-[ease] hover:bg-[#36343b]";
const TILT = "transition-transform duration-400 ease-[ease] hover:transform-none focus-within:transform-none upto-560:transform-none motion-reduce:transition-none";

export function Avatar({ index, size = "large", className = "" }: { index: number; size?: keyof typeof AVATAR_SIZES; className?: string }) {
  const person = PEOPLE[index];
  return <span aria-hidden="true" className={`relative inline-flex shrink-0 items-center justify-center overflow-hidden font-display font-bold shadow-[inset_0_0_0_1px_#ffffff14] before:absolute before:top-[-23px] before:left-[-22px] before:size-[60px] before:rounded-[50%] before:border-12 before:border-current before:opacity-14 ${person.color} ${AVATAR_SIZES[size]} ${className}`}>
    <span className="relative z-1 transform-[rotate(-8deg)]">{person.initial}</span>
    <i className="absolute right-[-11px] bottom-[-12px] size-[30px] border-7 border-current opacity-18 transform-[rotate(20deg)]" />
  </span>;
}

export function CallDemo() {
  const [muted, setMuted] = useState(false);
  const [camera, setCamera] = useState(false);
  const [channel, setChannel] = useState("A fogueira");
  return (
    <div className={`overflow-hidden rounded-[13px] border border-[#3a302b] bg-[#151517] shadow-[0_35px_90px_#0008] transform-[perspective(1800px)_rotateY(-5deg)_rotateZ(1deg)] ${TILT}`}>
      <div className="flex h-[38px] items-center justify-between border-b border-b-[#ffffff08] bg-[#1c1c1f] px-[15px] text-[9px] text-[#8d8b90]"><span className="flex gap-[5px]">{[0, 1, 2].map(dot => <i key={dot} className="size-1.5 rounded-[50%] bg-[#434146] first:bg-[#f25f1c]" />)}</span><span>seu lugar no Veche</span><HeadsetIcon size={14} /></div>
      <div className="grid grid-cols-[185px_1fr] upto-1100:grid-cols-[155px_1fr] upto-800:grid-cols-[190px_1fr] upto-560:grid-cols-[1fr]">
        <aside className="relative border-r border-r-[#ffffff08] bg-[#111113] px-2.5 py-4 upto-560:flex upto-560:items-center upto-560:gap-2 upto-560:border-r-0 upto-560:border-b upto-560:border-b-[#ffffff0a] upto-560:p-3">
          <div className="flex items-center gap-2 px-[2px] pb-3 text-[11px] font-bold upto-1100:text-[9px] upto-800:text-[11px] upto-560:hidden"><span className="grid size-[25px] place-items-center rounded-lg bg-[#f25f1c] text-[#241109]">F</span> Fora do lobby <span aria-hidden="true" className="ml-auto text-subtle">⌄</span></div>
          <p className={CHANNEL_LABEL}>CANAIS DE TEXTO</p>
          <div className={TEXT_CHANNEL}># &nbsp; geral</div><div className={TEXT_CHANNEL}># &nbsp; as-melhores-jogadas</div>
          <p className={CHANNEL_LABEL}>CANAIS DE VOZ</p>
          {["A fogueira", "Só mais uma"].map((name) => <button key={name} className={`flex min-h-[38px] w-full items-center gap-2 rounded-[5px] px-2 py-[9px] text-left text-[11px] transition-[background] duration-200 ease-[ease] hover:bg-[#ffffff0a] upto-560:min-h-10 upto-560:w-auto upto-560:flex-1 upto-560:justify-center ${channel === name ? "bg-[#f25f1c18] text-[#ff9562]" : "text-[#a4a0a9]"}`} onClick={() => setChannel(name)} aria-pressed={channel === name}><HeadsetIcon size={15} />{name}</button>)}
          <div className="px-3 pt-[7px] pb-[30px] upto-560:hidden">{PEOPLE.slice(0, 3).map((person, i) => <div key={person.name} className="my-[7px] flex items-center gap-2 text-[10px] text-[#c7c2ce]"><Avatar index={i} size="tiny" /><span>{person.name}</span><MicIcon size={11} className="ml-auto text-[#77737d]" /></div>)}</div>
          <div className="absolute bottom-[14px] left-[18px] flex items-center gap-[7px] text-[10px] text-online upto-560:hidden"><span className={STATUS_DOT} /> Voz conectada</div>
        </aside>
        <div className="min-w-0 px-[15px] pb-[15px] upto-1100:px-2.5 upto-560:px-3">
          <div className="flex h-[52px] items-center justify-between gap-2.5 text-[12px] font-semibold upto-1100:text-[10px] upto-800:text-[12px]"><span className="flex items-center gap-2"><HeadsetIcon size={17} className="text-brand" /> {channel}</span><span className="text-[9px] whitespace-nowrap text-subtle">4 na call</span></div>
          <div className="grid grid-cols-[1fr_1fr] gap-2">{PEOPLE.map((person, i) => <div key={person.name} className={`relative grid min-h-[125px] place-items-center overflow-hidden rounded-lg border px-2.5 pt-3 pb-[25px] upto-1100:min-h-[115px] upto-800:min-h-[145px] upto-560:min-h-[120px] ${i === 0 ? "border-[#7ab893] bg-[radial-gradient(ellipse_at_top,#343024,#201f1a)]" : i === 3 && camera ? "border-[#ffffff08] bg-[repeating-linear-gradient(135deg,#213046_0_20px,#283d54_20px_40px)]" : "border-[#ffffff08] bg-[radial-gradient(ellipse_at_top,#29252c,#1d1c21)]"}`}>
            <Avatar index={i} />
            {i === 0 && <div className="absolute top-2.5 right-2.5 flex h-[15px] items-center gap-[2px]" aria-hidden="true">{[0, 1, 2, 3, 4].map(n => <i key={n} className="h-2 w-[2px] animate-sound rounded-[2px] bg-online motion-reduce:animate-none" style={{ "--i": n } as CSSProperties} />)}</div>}
            <span className="absolute right-2.5 bottom-2 left-2.5 flex items-center justify-between text-[9px] text-[#d7d2d9]">{person.name}{i === 3 && muted ? <span aria-label="microfone desligado"> ⊘</span> : <MicIcon size={11} />}</span>
          </div>)}</div>
          <div className="flex items-center gap-2 pt-4">
            <button type="button" className={`${CONTROL} ${muted ? "bg-[#472529] text-[#ff9c9c]" : "bg-[#26252a]"}`} aria-label={muted ? "Ativar microfone da demonstração" : "Silenciar microfone da demonstração"} aria-pressed={muted} onClick={() => setMuted(!muted)}><MicIcon size={18} />{muted && <span className="absolute h-[2px] w-[22px] bg-current transform-[rotate(-45deg)]" />}</button>
            <button type="button" className={`${CONTROL} ${camera ? "bg-[#66341f] text-[#ffc6a9]" : "bg-[#26252a]"}`} aria-label={camera ? "Desativar câmera da demonstração" : "Ativar câmera da demonstração"} aria-pressed={camera} onClick={() => setCamera(!camera)}><CameraIcon size={18} /></button>
            <span className="ml-1 text-[8px] leading-[1.6] text-[#aaa4af]" role="status">{muted ? "Microfone desligado" : camera ? "Câmera ativada na prévia" : "O melhor lobby é a sua galera."}</span>
          </div>
        </div>
      </div>
      <div className="border-t border-t-[#ffffff08] px-[15px] py-2.5 text-right text-[8px] tracking-[.03em] text-[#9c9592] upto-560:text-center">Prévia interativa · experimente os canais e controles</div>
    </div>
  );
}

export function FeedDemo() {
  const [tab, setTab] = useState("Para você");
  const [liked, setLiked] = useState(false);
  const following = tab === "Seguindo";
  return (
    <div className={`overflow-hidden rounded-xl border border-[#3a3541] bg-[#18181c] shadow-[0_30px_80px_#0006] transform-[rotate(-2deg)] ${TILT}`}>
      <div className="flex items-center gap-[25px] border-b border-b-[#ffffff0c] px-[23px] upto-560:px-[15px]" role="group" aria-label="Prévia do feed">
        {["Para você", "Seguindo"].map(label => <button type="button" key={label} aria-pressed={tab === label} className={`relative min-h-[55px] text-[12px] font-bold ${tab === label ? "text-ink after:absolute after:inset-x-0 after:bottom-0 after:h-[3px] after:rounded-t-[4px] after:bg-brand" : "text-subtle"}`} onClick={() => { setTab(label); setLiked(false); }}>{label}</button>)}
        <span aria-hidden="true" className="ml-auto text-[21px] text-brand">✦</span>
      </div>
      <div className="px-[23px] pt-5 upto-560:px-[15px]">
        <div className="flex items-center gap-2.5"><Avatar index={following ? 1 : 0} size="small" /><div className="flex flex-col gap-[2px]"><strong className="text-[11px]">{following ? "luna" : "neves"}</strong><span className="text-[9px] text-subtle">{following ? "@luna" : "@neves"} · agora</span></div><span className="ml-auto rounded-[20px] border border-[#ffffff0c] bg-[#ffffff08] px-2 py-1 text-[9px] text-soft">{following ? "Explorando" : "Elden Ring"}</span></div>
        <p className="my-4 text-[12px] leading-[1.7] text-[#d6d1db]">{following ? "Tem mundo que a gente não quer sair. Qual jogo te fez sentir assim?" : "Depois de 37 tentativas, veio aí. Essa vai para a galeria. 🔥"}</p>
        <div className="relative h-[205px] overflow-hidden rounded-md bg-[#33352d] after:absolute after:inset-0 after:bg-[linear-gradient(transparent_35%,#000a)] upto-560:h-[190px]"><Image src={following ? "/images/home/cyberpunk.jpg" : "/images/home/elden-ring.jpg"} alt={following ? "Arte de personagem de Cyberpunk 2077" : "Paisagem de fantasia de Elden Ring"} fill sizes="(max-width: 600px) 85vw, 470px" className="object-cover" /><span className="absolute bottom-[17px] left-[17px] z-1 max-w-[230px] font-display text-[17px] leading-[1.4] font-bold text-white">{following ? "Só mais um pouco nesse mundo." : "O último try nunca é o último."}</span></div>
        <div className="flex min-h-[54px] items-center gap-5 text-[10px] text-[#a59eab] upto-560:gap-[15px]"><button type="button" aria-label={liked ? "Remover curtida da demonstração" : "Curtir publicação da demonstração"} aria-pressed={liked} className={`flex min-h-11 min-w-11 items-center gap-1.5 ${liked ? "text-[#ff8850]" : ""}`} onClick={() => setLiked(!liked)}><HeartIcon size={17} className={liked ? "fill-current" : "fill-transparent"} />{liked ? 49 : 48}</button><span className="flex items-center gap-1.5"><CommentIcon size={17} />12</span><span className="flex items-center gap-1.5"><RepostIcon size={17} />3</span><span className="ml-auto text-[7px] tracking-[.05em] upto-560:text-[6px] upto-360:hidden">PUBLICAÇÃO ILUSTRATIVA</span></div>
      </div>
      <div className="flex items-center gap-2.5 border-t border-t-[#ffffff0a] px-[23px] py-3.5 upto-560:px-[15px]"><Avatar index={2} size="small" /><p className="text-[10px] leading-[1.6] text-muted"><strong className="mr-[5px] text-[#d8d3dd]">rafa</strong> é por isso que eu nunca saio da call kkkkk</p></div>
    </div>
  );
}

export function ClipDemo() {
  const [saved, setSaved] = useState(false);
  const [duration, setDuration] = useState(30);
  return (
    <div className="relative h-[510px] overflow-hidden rounded-[15px] border border-[#575047] bg-[#35372c] upto-800:h-[520px] upto-560:h-[500px]">
      <Image src="/images/home/gta-vi.jpg" alt="Arte de Grand Theft Auto VI ilustrando a captura de uma jogada" fill sizes="(max-width: 800px) 100vw, 1216px" quality={90} className="object-cover object-center upto-560:object-[74%_center]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,#0f1416b3,#1014160a_70%),linear-gradient(0deg,#090c10e6,transparent_65%)]" />
      <span className="absolute top-7 left-[30px] flex items-center gap-2 rounded-sm border border-[#ffffff30] bg-[#0c1018a8] px-2.5 py-2 text-[8px] tracking-[.12em] backdrop-blur-[8px] upto-560:top-[18px] upto-560:left-4 upto-560:text-[7px]"><i className="size-[5px] rounded-[50%] bg-[#ff795a]" /> REPETIÇÃO INSTANTÂNEA</span>
      <div className="absolute top-[135px] left-[45px] font-display text-[32px] leading-[1.35] font-bold tracking-[-.04em] [text-shadow:0_2px_20px_#0007] upto-800:top-[100px] upto-800:left-[30px] upto-560:left-5 upto-560:text-[24px]">Aquela jogada.<br /><em className="text-[#cfceb7] not-italic">Agora é história.</em></div>
      <div className="absolute right-[30px] bottom-12 left-[30px] flex items-center justify-between gap-[22px] rounded-[11px] border border-[#ffffff26] bg-[#141416ed] p-5 backdrop-blur-[18px] upto-800:flex-col upto-800:items-stretch upto-800:gap-[18px] upto-560:right-3 upto-560:bottom-[42px] upto-560:left-3 upto-560:gap-3.5 upto-560:p-[15px]">
        <div className="flex items-center gap-[13px] upto-560:gap-[9px]"><span className="grid size-[43px] shrink-0 place-items-center rounded-[9px] bg-[#f25f1c16] text-[29px] text-brand upto-560:size-[35px]">↶</span><div><strong className="text-[13px] upto-560:text-[12px]">{saved ? "Momento salvo na prévia" : "Aconteceu. Ficou."}</strong><p role="status" className="mt-[3px] text-[10px] leading-[1.85] text-muted upto-560:text-[9px]">{saved ? `Últimos ${duration} segundos na sua galeria ilustrativa.` : "Escolha a duração e experimente salvar."}</p></div></div>
        <div className="flex items-center gap-[18px] upto-800:justify-between upto-560:flex-wrap upto-560:gap-2.5"><div className="flex rounded-[7px] border border-[#ffffff14] p-[3px] upto-560:flex-1" role="group" aria-label="Duração do clipe de demonstração">{[15, 30, 60].map(seconds => <button key={seconds} type="button" aria-pressed={duration === seconds} onClick={() => { setDuration(seconds); setSaved(false); }} className="min-h-9 min-w-[39px] rounded-sm text-[11px] text-muted aria-pressed:bg-[#ffffff12] aria-pressed:text-white upto-560:min-h-[38px] upto-560:flex-1">{seconds}s</button>)}</div><button type="button" className="min-h-11 rounded-[7px] bg-brand px-[18px] text-[11px] font-extrabold whitespace-nowrap text-[#271107] hover:bg-brand-hover upto-560:flex-1 upto-560:px-[9px] upto-560:text-[10px]" onClick={() => setSaved(!saved)}>{saved ? "✓ Salvo · repetir" : "Salvar momento ↗"}</button></div>
      </div>
      <span className="absolute right-0 bottom-[18px] left-0 text-center text-[8px] tracking-[.05em] text-[#c1bcae] upto-560:text-[7px]">Demonstração de captura · imagem ilustrativa</span>
    </div>
  );
}

const FAQS = [
  { question: "O que é o Veche?", answer: "É um ponto de encontro para quem joga. O Veche reúne comunidades, canais de texto e voz, um feed para compartilhar o que acontece na sua jogatina e ferramentas para guardar seus momentos em clipes." },
  { question: "Onde posso instalar?", answer: "O Veche é um aplicativo para computador, com versões para Windows, macOS e Linux. Em “Outras plataformas”, você encontra os instaladores disponíveis na página de lançamentos. A captura de clipes depende do suporte da plataforma e das configurações do aplicativo." },
  { question: "Como trago meus amigos?", answer: "Crie seu servidor no aplicativo e gere um convite para compartilhar com a galera. Também é possível convidar diretamente para um canal de voz. Com o Veche instalado e sua conta conectada, o link leva você ao app." },
  { question: "Preciso estar jogando para usar?", answer: "Não. A call pode ser para combinar a próxima partida, trocar ideias ou só fazer companhia. O feed, as conversas e as comunidades continuam por lá mesmo quando o jogo está fechado." },
  { question: "Como funcionam os clipes?", answer: "Ative a repetição instantânea nas configurações de captura do app e escolha a duração. Quando acontecer uma boa jogada, use o atalho configurado para salvar os últimos segundos. Depois, você pode revisar, editar e compartilhar o clipe pelo Veche." },
];

export function HomeFaq() {
  const [opened, setOpened] = useState<number | null>(0);
  return <div className="border-t border-t-[#ffffff1a]">{FAQS.map((faq, index) => <div className="border-b border-b-[#ffffff1a]" key={faq.question}>
    <h3><button id={`faq-question-${index}`} type="button" aria-expanded={opened === index} aria-controls={`faq-answer-${index}`} onClick={() => setOpened(opened === index ? null : index)} className="flex w-full items-center justify-between gap-[25px] py-[23px] text-left text-[14px] font-semibold transition-[color] duration-200 ease-[ease] hover:text-brand-hover aria-expanded:text-brand-hover upto-560:py-[19px] upto-560:text-[12px]">{faq.question}<span aria-hidden="true" className="text-[23px] font-normal text-brand">{opened === index ? "−" : "+"}</span></button></h3>
    <div id={`faq-answer-${index}`} role="region" aria-labelledby={`faq-question-${index}`} hidden={opened !== index}><p className="pr-[35px] pb-[22px] text-[12px] leading-[1.85] text-muted upto-560:pr-[18px] upto-560:text-[11px]">{faq.answer}</p></div>
  </div>)}</div>;
}
