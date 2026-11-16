import { Hero } from "@/components/Hero";
import { HomeSections, HomeFooter } from "@/components/HomeSections";
import { SiteHeader } from "@/components/SiteHeader";

export default function Home() {
  return <>
    <a href="#conteudo" className="fixed top-2.5 left-2.5 z-50 rounded-md bg-brand px-5 py-3.5 text-brand-ink transform-[translateY(-150%)] focus:transform-none">Pular para o conteúdo</a>
    <SiteHeader />
    <main id="conteudo"><Hero /><HomeSections /></main>
    <HomeFooter />
  </>;
}
