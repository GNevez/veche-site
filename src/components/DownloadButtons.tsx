import { WINDOWS_DOWNLOAD_URL } from "@/lib/downloads";
import { DownloadIcon } from "./icons";
import { PlatformMenu } from "./PlatformMenu";

const LAYOUTS = {
  page: {
    group: "gap-3.5",
    link: "min-h-14 rounded-xl text-base",
    primary: "px-7",
    secondary: "px-6",
  },
  hero: {
    group: "gap-3 upto-800:justify-center upto-560:flex-col upto-560:items-center",
    link: "min-h-[53px] rounded-[9px] px-[22px] text-[13px] upto-560:w-[260px] upto-560:justify-center",
    primary: "",
    secondary: "",
  },
  section: {
    group: "justify-center gap-3.5 upto-560:flex-col upto-560:items-center",
    link: "min-h-14 rounded-xl text-base upto-560:min-h-[52px] upto-560:w-[260px] upto-560:justify-center upto-560:text-[13px]",
    primary: "px-7",
    secondary: "px-6",
  },
};

export function DownloadButtons({ layout = "page" }: { layout?: keyof typeof LAYOUTS }) {
  const sizes = LAYOUTS[layout];
  return (
    <div className={`flex flex-wrap ${sizes.group}`}>
      <a
        href={WINDOWS_DOWNLOAD_URL}
        className={`inline-flex items-center gap-3 bg-brand font-extrabold text-brand-ink shadow-[0_10px_40px_rgb(242_95_28/.25)] transition-colors hover:bg-brand-hover ${sizes.link} ${sizes.primary}`}
      >
        <DownloadIcon size={20} />
        Baixar para Windows
      </a>
      <PlatformMenu className={`${sizes.link} ${sizes.secondary}`} />
    </div>
  );
}
