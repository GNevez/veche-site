"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import symbol from "@/assets/symbol.png";
import { ClipCard, FeedCard, SquadCard } from "./PortalCards";

type CSSVars = CSSProperties & Record<`--${string}`, string>;

const EASE = "cubic-bezier(.2,.8,.2,1)";
const AUTO_OPEN_DELAY = 1100;

const MOTES = (() => {
  let seed = 7;
  const random = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
  return Array.from({ length: 22 }, () => {
    const angle = random() * Math.PI * 2;
    const radius = 200 + random() * 460;
    const size = 2 + Math.round(random() * 2);
    const glow = random();
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius * 0.8,
      size,
      openOpacity: 0.35 + glow * 0.5,
      closedOpacity: 0.08 + glow * 0.12,
      dx: `${(random() * 90 - 45).toFixed(0)}px`,
      dy: `${(-35 - random() * 65).toFixed(0)}px`,
      duration: `${(16 + random() * 14).toFixed(1)}s`,
    };
  });
})();

const TICKS = Array.from({ length: 12 }, (_, index) => index);

const HALOS = [
  { size: 760, className: "border border-brand/10", open: "scale(1)", closed: "scale(.82)", transition: `transform 1600ms ${EASE}, opacity 1200ms ease` },
  { size: 1080, className: "border border-brand/[.07]", open: "scale(1)", closed: "scale(.8)", transition: `transform 1900ms ${EASE} 100ms, opacity 1400ms ease` },
  { size: 1440, className: "border border-dashed border-brand/[.06]", open: "scale(1) rotate(30deg)", closed: "scale(.78) rotate(0deg)", transition: `transform 2200ms ${EASE} 200ms, opacity 1600ms ease` },
];

function centered(size: number): CSSProperties {
  return { left: -size / 2, top: -size / 2, width: size, height: size };
}

export function HeroPortal() {
  const [opened, setOpened] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    timer.current = setTimeout(() => setOpened(true), AUTO_OPEN_DELAY);
    return () => clearTimeout(timer.current);
  }, []);

  const toggle = () => {
    clearTimeout(timer.current);
    setOpened((value) => !value);
  };

  const cardTransition = (duration: number, delay: number) => `transform ${duration}ms ${EASE} ${delay}ms, opacity 600ms ease ${delay}ms`;

  return (
    <div className="flex flex-col items-center gap-[18px]">
      <div className="relative size-[520px] shrink-0 max-[560px]:-my-20 max-[560px]:scale-[.68]">
        <div aria-hidden="true" className="pointer-events-none absolute top-1/2 left-1/2 z-0 size-0">
          {HALOS.map((halo) => (
            <div
              key={halo.size}
              className={`absolute rounded-full ${halo.className}`}
              style={{ ...centered(halo.size), transform: opened ? halo.open : halo.closed, opacity: opened ? 1 : 0.45, transition: halo.transition }}
            />
          ))}
          <div
            className="absolute rounded-full bg-[radial-gradient(circle,rgb(242_95_28/.09)_0%,rgb(242_95_28/.03)_22%,rgb(242_95_28/0)_45%)]"
            style={{ ...centered(1800), opacity: opened ? 1 : 0, transition: "opacity 1400ms ease" }}
          />
          {opened &&
            [0, 1500, 3000].map((delay) => (
              <div
                key={delay}
                className="absolute animate-ring-pulse rounded-full border border-brand/35 motion-reduce:animate-none"
                style={{ ...centered(520), animationDelay: `${delay}ms` }}
              />
            ))}
          {MOTES.map((mote, index) => {
            const spread = opened ? 1.12 : 0.9;
            const style: CSSVars = {
              left: Math.round(mote.x * spread),
              top: Math.round(mote.y * spread),
              width: mote.size,
              height: mote.size,
              opacity: opened ? mote.openOpacity : mote.closedOpacity,
              transition: `left 1800ms ${EASE}, top 1800ms ${EASE}, opacity 1200ms ease`,
              "--dx": mote.dx,
              "--dy": mote.dy,
              "--dur": mote.duration,
            };
            return (
              <div
                key={index}
                className="absolute animate-drift rounded-full bg-brand shadow-[0_0_8px_rgb(242_95_28/.6)] motion-reduce:animate-none"
                style={style}
              />
            );
          })}
        </div>

        <div
          aria-hidden="true"
          className="absolute top-1/2 left-1/2 -mt-[250px] -ml-[250px] size-[500px] rounded-full border border-dashed border-brand/[.22]"
          style={{ transform: opened ? "rotate(60deg)" : "rotate(0deg)", transition: `transform 1400ms ${EASE}` }}
        />
        <div
          aria-hidden="true"
          className="absolute top-1/2 left-1/2 -mt-[195px] -ml-[195px] size-[390px] rounded-full border border-white/[.07]"
          style={{
            background: opened ? "radial-gradient(circle, rgba(242,95,28,.10) 0%, rgba(242,95,28,0) 70%)" : "transparent",
            transition: "background 900ms ease",
          }}
        />
        <div
          aria-hidden="true"
          className="absolute top-1/2 left-1/2 -mt-[145px] -ml-[145px] size-[290px] rounded-full border border-brand/[.38]"
          style={{ transform: opened ? "rotate(-120deg)" : "rotate(0deg)", transition: `transform 1400ms ${EASE}` }}
        >
          {TICKS.map((index) => {
            const major = index % 3 === 0;
            return (
              <div
                key={index}
                className={`absolute top-1/2 left-1/2 -ml-px origin-[50%_0] rounded-sm ${major ? "h-3 w-[3px] bg-brand" : "h-1.5 w-0.5 bg-brand/45"}`}
                style={{ transform: `rotate(${index * 30}deg) translateY(-145px)` }}
              />
            );
          })}
        </div>

        <button
          type="button"
          onClick={toggle}
          aria-label={opened ? "Fechar o portal" : "Abrir o portal"}
          aria-pressed={opened}
          className="absolute top-1/2 left-1/2 z-[2] -mt-[98px] -ml-[98px] flex size-[196px] cursor-pointer items-center justify-center rounded-full border border-dial-line bg-dial p-0 focus-visible:outline-2 focus-visible:outline-offset-[6px] focus-visible:outline-brand"
          style={{
            boxShadow: opened ? "0 0 0 10px rgba(242,95,28,.06), 0 0 80px rgba(242,95,28,.28)" : "0 0 0 10px rgba(255,255,255,.02)",
            transform: opened ? "scale(.9)" : "scale(1)",
            transition: `box-shadow 900ms ease, transform 900ms ${EASE}`,
          }}
        >
          <Image
            src={symbol}
            alt=""
            priority
            className="block h-[118px] w-auto"
            style={{ transform: opened ? "scale(1.12)" : "scale(1)", transition: "transform 1200ms cubic-bezier(.3,1.4,.4,1)" }}
          />
        </button>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-[34px] left-0 z-[3] w-[228px]"
          style={{
            transform: opened ? "translate(0,0) rotate(-4deg) scale(1)" : "translate(150px,150px) rotate(0deg) scale(.4)",
            opacity: opened ? 1 : 0,
            transition: cardTransition(900, 0),
          }}
        >
          <SquadCard />
        </div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-[196px] -right-2 z-[3] w-[248px]"
          style={{
            transform: opened ? "translate(0,0) rotate(3deg) scale(1)" : "translate(-140px,20px) rotate(0deg) scale(.4)",
            opacity: opened ? 1 : 0,
            transition: cardTransition(1000, 80),
          }}
        >
          <FeedCard />
        </div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-1.5 left-10 z-[3] w-[236px]"
          style={{
            transform: opened ? "translate(0,0) rotate(-2deg) scale(1)" : "translate(100px,-170px) rotate(0deg) scale(.4)",
            opacity: opened ? 1 : 0,
            transition: cardTransition(1100, 160),
          }}
        >
          <ClipCard progress={opened ? "92%" : "0%"} />
        </div>
      </div>
    </div>
  );
}
