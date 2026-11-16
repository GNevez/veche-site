import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SourceSubmissionForm } from "@/components/SourceSubmissionForm";
export const metadata: Metadata = { title: "Enviar fonte — Veche", description: "Compartilhe um catálogo JSON com a comunidade Veche." };
export default function SubmitSource() { return <><SiteHeader /><SourceSubmissionForm /></>; }
