"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const FALLBACK_MS = 2500;

export function OpenInApp({ href, label }: { href: string; label: string }) {
  const router = useRouter();

  useEffect(() => {
    let left = false;
    const leave = () => { left = true; };
    window.addEventListener("blur", leave);
    window.addEventListener("pagehide", leave);
    document.addEventListener("visibilitychange", leave);
    window.location.href = href;
    const timer = window.setTimeout(() => { if (!left && document.visibilityState === "visible") router.replace("/download"); }, FALLBACK_MS);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("blur", leave);
      window.removeEventListener("pagehide", leave);
      document.removeEventListener("visibilitychange", leave);
    };
  }, [href, router]);

  return (
    <a
      href={href}
      className="inline-flex min-h-13 w-full items-center justify-center rounded-xl bg-brand px-6 text-base font-extrabold text-brand-ink shadow-[0_10px_40px_rgb(242_95_28/.25)] transition-colors hover:bg-brand-hover"
    >
      {label}
    </a>
  );
}
