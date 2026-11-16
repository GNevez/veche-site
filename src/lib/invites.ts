import { API_URL } from "./config";

export type InviteKind = "server" | "call";

export interface PublicInvite {
  code: string;
  kind: InviteKind;
  serverName: string;
  serverIconUrl: string | null;
  serverBannerUrl: string | null;
  serverDescription: string | null;
  memberCount: number;
  onlineCount: number;
  channelName: string | null;
  inCallCount: number | null;
}

const CODE = /^[a-z2-9]{9}$/i;

export const isInviteCode = (value: string) => CODE.test(value);

export const deepLink = (kind: InviteKind, code: string) => `veche://${kind === "call" ? "call" : "invite"}/${code.toLowerCase()}`;

export const assetUrl = (path: string | null) => (!path ? null : /^https?:\/\//.test(path) ? path : `${API_URL}${path.startsWith("/") ? path : `/${path}`}`);

export async function fetchInvite(code: string): Promise<PublicInvite | null> {
  if (!isInviteCode(code)) return null;
  try {
    const response = await fetch(`${API_URL}/api/Invites/${code.toLowerCase()}/public`, { next: { revalidate: 30 } });
    return response.ok ? ((await response.json()) as PublicInvite) : null;
  } catch {
    return null;
  }
}
