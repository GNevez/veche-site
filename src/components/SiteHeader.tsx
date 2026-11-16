"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import logo from "@/assets/logo.png";
import { WEB_LOGIN_URL } from "@/lib/config";

const NAV_LINKS = [
  { label: "O Veche", href: "/#o-veche" },
  { label: "Comunidade", href: "/#comunidade" },
  { label: "Seus momentos", href: "/#momentos" },
  { label: "Dúvidas", href: "/#duvidas" },
  { label: "Fontes", href: "/fontes" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  return (
    <header className="relative z-20 border-b border-b-[#ffffff08] bg-[#0e0e10ed]" onKeyDown={(event) => {
      if (event.key === "Escape" && open) { setOpen(false); toggle.current?.focus(); }
    }}>
      <div className="m-auto flex max-w-[1280px] items-center justify-between gap-[25px] px-8 py-6 upto-800:px-6 upto-800:py-[18px] upto-560:gap-3 upto-560:px-[22px] upto-560:py-4">
        <Link href="/" aria-label="Veche — início" onClick={() => setOpen(false)}>
          <Image src={logo} alt="Veche" priority className="h-[27px] w-auto upto-560:h-[23px]" />
        </Link>
        <nav aria-label="Principal" className="flex items-center gap-8 text-[12px] font-semibold text-soft upto-800:hidden">
          {NAV_LINKS.map((link) => <a key={link.label} href={link.href} className="py-2.5 transition-[color] duration-200 ease-[ease] hover:text-brand-hover">{link.label}</a>)}
        </nav>
        <div className="flex items-center gap-3 upto-560:gap-2">
          <a href={WEB_LOGIN_URL} className="inline-flex items-center gap-[26px] rounded-[7px] border border-[#47413c] px-[18px] py-3 text-[11px] font-bold transition-[border-color,background] duration-200 ease-[ease] hover:border-brand hover:bg-[#f25f1c0a] upto-560:min-h-11 upto-560:gap-3 upto-560:px-3 upto-560:text-[10px]">
            Entrar no Veche <span aria-hidden="true" className="text-[17px] leading-none text-brand">↗</span>
          </a>
          <button ref={toggle} type="button" className="hidden size-11 rounded-[7px] border border-line text-[22px] upto-800:grid upto-800:place-items-center" aria-label={open ? "Fechar menu" : "Abrir menu"} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}>
            <span aria-hidden="true">{open ? "×" : "☰"}</span>
          </button>
        </div>
      </div>
      {open && <nav id="mobile-navigation" className="border-t border-t-[#ffffff10] px-6 pt-2 pb-5 min-[801px]:hidden" aria-label="Navegação móvel">
        {NAV_LINKS.map((link) => <a key={link.label} href={link.href} onClick={() => setOpen(false)} className="flex items-center justify-between border-b border-b-[#ffffff0a] py-4 text-[14px]">{link.label}<span aria-hidden="true" className="text-brand">↗</span></a>)}
      </nav>}
    </header>
  );
}
