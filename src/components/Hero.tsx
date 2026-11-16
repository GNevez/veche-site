import { DownloadButtons } from "./DownloadButtons";
import { HeroPortal } from "./HeroPortal";
import { AmbientBackground } from "./AmbientBackground";
import { EYEBROW, STATUS_DOT } from "./home-classes";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden" aria-labelledby="hero-title">
      <AmbientBackground hero />
      <div aria-hidden="true" className="dot-grid pointer-events-none absolute inset-0" />

      <div className="m-auto grid min-h-[690px] max-w-[1280px] grid-cols-[1fr_1fr] items-center gap-[30px] px-8 pt-16 pb-[76px] min-[1450px]:pt-[90px] min-[1450px]:pb-[105px] upto-1100:min-h-[630px] upto-1100:grid-cols-[1fr_.95fr] upto-1100:gap-2.5 upto-1100:pt-[60px] upto-1100:pb-[60px] upto-800:grid-cols-[1fr] upto-800:gap-[65px] upto-800:pt-[50px] upto-800:pb-[35px] upto-800:text-center upto-560:gap-[60px] upto-560:px-[22px] upto-360:px-[18px]">
        <div className="relative z-2">
          <p className={`${EYEBROW} text-[11px] tracking-[.13em] text-brand-hover upto-800:justify-center upto-560:text-[9px] upto-560:tracking-[.09em]`}><span className={STATUS_DOT} /> Seu próximo ponto de encontro</p>
          <h1 id="hero-title" className="my-[27px] max-w-[620px] font-display text-[clamp(52px,5.4vw,76px)] leading-[1.08] font-extrabold tracking-[-.055em] uppercase upto-1100:text-[60px] upto-800:mx-auto upto-800:my-[23px] upto-800:text-[clamp(44px,8vw,66px)] upto-560:text-[clamp(38px,10.5vw,58px)] upto-560:tracking-[-.06em] upto-360:text-[37px]">Há mais do <span className="text-brand">outro lado.</span></h1>
          <p className="mb-[31px] max-w-[445px] text-[17px] leading-[1.85] text-soft upto-800:mx-auto upto-800:text-[15px] upto-560:text-[14px] upto-560:leading-[1.8]">A partida acaba. A resenha continua. Reúna seu squad, compartilhe suas jogadas e encontre quem vive o jogo como você.</p>
          <DownloadButtons layout="hero" />
          <p className="mt-5 text-[11px] text-subtle upto-560:text-[10px]">Sua galera. Seus jogos. Um lugar para ficar.</p>
        </div>
        <div className="relative min-w-0 upto-1100:origin-center upto-1100:transform-[scale(.85)] upto-800:m-auto upto-800:w-full upto-800:max-w-[550px] upto-800:transform-none">
          <span className="absolute top-[-29px] left-1/2 text-[9px] tracking-[.22em] whitespace-nowrap text-subtle transform-[translateX(-50%)] upto-560:top-[-25px] upto-560:text-[8px]">CONEXÕES REAIS. NOVAS HISTÓRIAS.</span>
          <HeroPortal />
          <span className="relative mt-[25px] block text-center text-[10px] tracking-[.03em] text-subtle upto-560:mt-3 upto-560:text-[9px]">Toque na chama. Veja o que acontece.</span>
        </div>
      </div>
      <div className="relative mx-auto flex max-w-[1216px] items-center justify-between border-t border-t-[#ffffff0f] pt-[23px] pb-[25px] upto-1100:mx-8 upto-560:mx-[22px] upto-560:pt-5 upto-560:pb-5">
        <a href="#o-veche" className="flex gap-7 text-[12px] text-soft upto-560:text-[10px]">Explore o outro lado <span aria-hidden="true" className="text-brand">↓</span></a>
        <span className="text-[9px] tracking-[.14em] text-subtle upto-800:text-[8px] upto-560:hidden">FEITO PARA QUEM JOGA JUNTO</span>
      </div>
    </section>
  );
}
