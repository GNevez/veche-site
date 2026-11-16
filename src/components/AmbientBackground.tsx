import type { CSSProperties } from "react";

const GLOW = "absolute h-[1100px] w-[1050px] rounded-[50%]";
const ORBIT = "absolute size-[1100px] rounded-[50%] border border-[#f5944920] shadow-[0_0_0_100px_#f25f1c04,0_0_0_101px_#f594490c,0_0_0_220px_#f25f1c03,0_0_0_221px_#f5944909]";

const LAYERS = {
  hero: {
    root: "opacity-80",
    glow: "top-[-250px] left-[-300px] opacity-65",
    glowSecondary: "top-[-200px] right-[-400px]",
    orbit: "hidden",
    orbitSecondary: "hidden",
  },
  journey: {
    root: "opacity-100",
    glow: "top-[80px] left-[-400px] upto-800:left-[-650px]",
    glowSecondary: "top-[1200px] right-[-400px] upto-800:right-[-750px]",
    orbit: "top-[360px] left-[-800px] upto-800:left-[-950px]",
    orbitSecondary: "top-[1900px] right-[-850px] upto-800:right-[-1000px]",
  },
};

export function AmbientBackground({ hero = false }: { hero?: boolean }) {
  const layer = LAYERS[hero ? "hero" : "journey"];
  return <div aria-hidden="true" className={`pointer-events-none absolute inset-0 -z-1 overflow-hidden ${layer.root}`}>
    <div className={`${GLOW} animate-breathe bg-[radial-gradient(ellipse,#f25f1c16,#a3441510_30%,transparent_67%)] motion-reduce:animate-none ${layer.glow}`} />
    <div className={`${GLOW} animate-breathe-late bg-[radial-gradient(ellipse,#c5784820,#673b7710_35%,transparent_68%)] motion-reduce:animate-none ${layer.glowSecondary}`} />
    <div className={`${ORBIT} ${layer.orbit}`} />
    <div className={`${ORBIT} animate-orbit border-dashed motion-reduce:animate-none ${layer.orbitSecondary}`} />
    <div className="absolute inset-0 bg-[radial-gradient(#cfa18425_.7px,transparent_.8px)] bg-size-[42px_42px] mask-[linear-gradient(90deg,#0008,transparent_36%,transparent_65%,#0009)]" />
    {Array.from({ length: hero ? 22 : 100 }, (_, index) => {
      const size = index % 5 === 0 ? 3 : 2;
      return <i key={index} className={`absolute animate-ember rounded-[50%] bg-[#fa9455] opacity-(--alpha) shadow-[0_0_7px_#f25f1c60] motion-reduce:animate-none ${index % 2 ? "upto-800:hidden" : ""}`} style={{
        left: `${(index * 73.37 + 7) % 100}%`,
        top: `${(index * 37.71 + 13) % 100}%`,
        width: size, height: size,
        "--duration": `${18 + (index % 9) * 3}s`,
        "--delay": `${-index * 2.7}s`,
        "--travel": `${30 + (index % 5) * 15}px`,
        "--sway": `${index % 2 ? -35 : 45}px`,
        "--alpha": index % 4 === 0 ? .65 : .32,
      } as CSSProperties} />;
    })}
  </div>;
}
