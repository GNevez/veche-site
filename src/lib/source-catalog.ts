import { API_URL } from "./config";

export const SOURCES_API = API_URL;
export const SOURCE_TERMS_VERSION = "2026-11-15";
export type CatalogSource = { id: string; name: string; description: string; entries: number; url: string; classics: boolean; createdAt: string; copies: string; downloads: string };

export const sourceLink = (source: CatalogSource) => new URL(source.url, API_URL).href;

export async function apiError(response: Response) {
  if (response.status === 413) return "O arquivo excede o limite de 20 MB.";
  if (response.status === 429) return "Limite de envios atingido. Tente novamente mais tarde.";
  if (response.status === 401) return "Sua sessão expirou. Entre novamente.";
  const body = await response.json().catch(() => null);
  return body?.message || "Não foi possível concluir a solicitação. Tente novamente.";
}
