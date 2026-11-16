const RELEASES_URL = "https://github.com/GNevez/veche-releases/releases";

const latestFile = (file: string) => `${RELEASES_URL}/latest/download/${file}`;

export type PlatformDownload = { id: string; name: string; href: string };

export const ALL_DOWNLOADS_URL = `${RELEASES_URL}/latest`;
export const WINDOWS_DOWNLOAD_URL = process.env.NEXT_PUBLIC_WINDOWS_DOWNLOAD_URL || latestFile("VecheSetup.exe");

export const PLATFORM_DOWNLOADS: PlatformDownload[] = [
  { id: "windows", name: "Windows", href: WINDOWS_DOWNLOAD_URL },
  { id: "mac-arm", name: "macOS · Apple Silicon", href: latestFile("Veche-arm64.dmg") },
  { id: "mac-intel", name: "macOS · Intel", href: latestFile("Veche-x64.dmg") },
  { id: "linux", name: "Linux", href: latestFile("Veche.AppImage") },
];
