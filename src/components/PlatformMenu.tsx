"use client";

import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import { createPortal } from "react-dom";
import { PLATFORM_DOWNLOADS } from "@/lib/downloads";
import { ChevronDownIcon, DownloadIcon } from "./icons";

const MIN_WIDTH = 220;
const GAP = 6;
const EDGE = 12;
const EASE = "cubic-bezier(0.22, 0.9, 0.24, 1)";
const GLIDE_BACKGROUND = "radial-gradient(130% 160% at 0% 50%, rgba(242,95,28,.14) 0%, rgba(242,95,28,.04) 40%, transparent 65%), #1b1b1f";

type Glide = { top: number; height: number; animated: boolean };

export function PlatformMenu({ className }: { className: string }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [glide, setGlide] = useState<Glide | null>(null);
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLDivElement>(null);
  const items = useRef<(HTMLAnchorElement | null)[]>([]);
  const menuId = useId();

  const place = useCallback(() => {
    const button = trigger.current?.getBoundingClientRect();
    const node = menu.current;
    if (!button || !node) return;
    const width = Math.max(MIN_WIDTH, button.width);
    const height = node.offsetHeight;
    const left = Math.min(Math.max(EDGE, button.left + button.width / 2 - width / 2), window.innerWidth - width - EDGE);
    const below = window.innerHeight - button.bottom - GAP >= height + EDGE || button.top < height + GAP + EDGE;
    node.style.width = `${width}px`;
    node.style.left = `${left}px`;
    node.style.top = `${below ? button.bottom + GAP : button.top - GAP - height}px`;
    node.style.transformOrigin = below ? "top center" : "bottom center";
    node.style.visibility = "visible";
  }, []);

  useLayoutEffect(() => {
    if (open) place();
  }, [open, place]);

  useLayoutEffect(() => {
    const item = open ? items.current[active] : null;
    if (!item) return;
    const next = { top: item.offsetTop, height: item.offsetHeight };
    const frame = requestAnimationFrame(() => setGlide(current => ({ ...next, animated: current !== null })));
    return () => cancelAnimationFrame(frame);
  }, [open, active]);

  useEffect(() => {
    if (!open) return;
    const outside = (event: PointerEvent) => {
      const target = event.target as Node;
      if (!root.current?.contains(target) && !menu.current?.contains(target)) setOpen(false);
    };
    document.addEventListener("pointerdown", outside);
    window.addEventListener("resize", place);
    window.addEventListener("scroll", place, true);
    return () => {
      document.removeEventListener("pointerdown", outside);
      window.removeEventListener("resize", place);
      window.removeEventListener("scroll", place, true);
    };
  }, [open, place]);

  const show = (index: number, focus: boolean) => {
    setGlide(null);
    setActive(index);
    setOpen(true);
    if (focus) requestAnimationFrame(() => items.current[index]?.focus());
  };

  const close = (refocus: boolean) => {
    setOpen(false);
    if (refocus) trigger.current?.focus();
  };

  const move = (index: number) => {
    const next = (index + PLATFORM_DOWNLOADS.length) % PLATFORM_DOWNLOADS.length;
    setActive(next);
    items.current[next]?.focus();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Tab") { setOpen(false); return; }
    if (!open) {
      if (event.target !== trigger.current || !["ArrowDown", "ArrowUp"].includes(event.key)) return;
      event.preventDefault();
      show(event.key === "ArrowDown" ? 0 : PLATFORM_DOWNLOADS.length - 1, true);
      return;
    }
    const actions: Record<string, () => void> = {
      Escape: () => close(true),
      ArrowDown: () => move(active + 1),
      ArrowUp: () => move(active - 1),
      Home: () => move(0),
      End: () => move(PLATFORM_DOWNLOADS.length - 1),
    };
    const action = actions[event.key];
    if (!action) return;
    event.preventDefault();
    action();
  };

  const glideStyle: CSSProperties = glide
    ? { transform: `translateY(${glide.top}px)`, height: glide.height, background: GLIDE_BACKGROUND, transition: glide.animated ? `transform 420ms ${EASE}` : "none" }
    : { opacity: 0 };

  return (
    <div ref={root} className="relative" onKeyDown={onKeyDown}>
      <button
        ref={trigger}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        onClick={() => (open ? close(false) : show(0, false))}
        className={`inline-flex items-center gap-2.5 border font-bold text-ink transition-colors hover:border-brand ${open ? "border-brand" : "border-line"} ${className}`}
      >
        Outras plataformas
        <ChevronDownIcon size={16} className="text-subtle" style={{ transform: open ? "rotate(180deg)" : "none", transition: `transform 250ms ${EASE}` }} />
      </button>
      {open && createPortal(
        <div
          ref={menu}
          id={menuId}
          role="menu"
          aria-label="Baixar para outra plataforma"
          style={{ visibility: "hidden" }}
          className="fixed z-50 animate-menu-in rounded-lg bg-[#222227] p-1 shadow-[0_25px_50px_-12px_rgb(0_0_0/.6)] motion-reduce:animate-none"
        >
          <div className="relative">
            <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 rounded-md" style={glideStyle} />
            {PLATFORM_DOWNLOADS.map((platform, index) => (
              <a
                key={platform.id}
                ref={element => { items.current[index] = element; }}
                role="menuitem"
                href={platform.href}
                tabIndex={index === active ? 0 : -1}
                onMouseEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
                onClick={() => setOpen(false)}
                className={`relative z-[1] flex items-center gap-3 rounded-md px-3 py-2 text-[13px] outline-none transition-colors ${index === active ? "text-ink" : "text-muted"}`}
              >
                <span className="min-w-0 flex-1 truncate">{platform.name}</span>
                <DownloadIcon size={14} className={`shrink-0 text-brand transition-opacity ${index === active ? "opacity-100" : "opacity-0"}`} />
              </a>
            ))}
          </div>
        </div>,
        document.body,
      )}
    </div>
  );
}
