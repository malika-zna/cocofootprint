import type { ReactNode } from "react";
import type { IconName } from "./shared";

export function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, ReactNode> = {
    bolt: <path d="M13 2 4.5 13.2h6.7L10 22l8.5-11.2h-6.7L13 2Z" />,
    leaf: <path d="M20.2 3.8C12.5 3.5 5 6.7 4.3 13.5c-.3 2.6 1.4 4.8 4 5.1 5.8.7 9.9-6.7 11.9-14.8ZM4 21c2.2-5.6 5.8-9.2 11-11.8" />,
    wallet: <path d="M3 6.5h15.5A2.5 2.5 0 0 1 21 9v8.5a2.5 2.5 0 0 1-2.5 2.5h-15V5A2 2 0 0 1 5.5 3H17v3.5M16 13h5" />,
    plus: <path d="M12 5v14M5 12h14" />,
    sun: <path d="M12 3V1m0 22v-2m9-9h2M1 12h2m15.4-6.4 1.4-1.4M4.2 19.8l1.4-1.4m0-12.8L4.2 4.2m15.6 15.6-1.4-1.4M17 12a5 5 0 1 1-10 0 5 5 0 0 1 10 0Z" />,
    moon: <path d="M20.5 15.2A8.5 8.5 0 0 1 8.8 3.5 9 9 0 1 0 20.5 15.2Z" />,
    info: <path d="M12 17v-6m0-4h.01M22 12A10 10 0 1 1 2 12a10 10 0 0 1 20 0Z" />,
    trash: <path d="M4 7h16m-10 4v6m4-6v6M9 7l1-3h4l1 3m3 0-1 14H7L6 7" />,
    chevron: <path d="m9 18 6-6-6-6" />,
    bulb: <path d="M9 18h6m-5 3h4m3.7-9.4A6 6 0 1 0 7 15.3c.7.6 1 1.3 1 2.2h8c0-.9.3-1.6 1-2.2a6 6 0 0 0 .7-3.7Z" />,
    laptop: <path d="M5 5h14v11H5V5Zm-2 14h18" />,
    fan: <path d="M12 12c-4-1-5.5-4.7-3.2-6.3 1.9-1.3 3.6.7 3.2 6.3Zm0 0c1-4 4.7-5.5 6.3-3.2 1.3 1.9-.7 3.6-6.3 3.2Zm0 0c4 1 5.5 4.7 3.2 6.3-1.9 1.3-3.6-.7-3.2-6.3Zm0 0c-1 4-4.7 5.5-6.3 3.2C4.4 16.4 6.4 11.6 12 12Z" />,
    ac: <path d="M4 5h16v8H4V5Zm3 5h10M8 16c0 2-2 2-2 4m6-4c0 2-2 2-2 4m6-4c0 2-2 2-2 4" />,
    tv: <path d="M3 6h18v12H3V6Zm6 15h6" />,
    fridge: <path d="M7 2h10v20H7V2Zm0 8h10M10 6v1m0 6v2" />,
    sparkles: <path d="m12 3 1.1 3.4L16.5 7l-3.4 1.1L12 11.5l-1.1-3.4L7.5 7l3.4-.6L12 3Zm6 9 1 2.5 2.5 1-2.5 1L18 19l-1-2.5-2.5-1 2.5-1L18 12ZM5 13l.8 2.2L8 16l-2.2.8L5 19l-.8-2.2L2 16l2.2-.8L5 13Z" />,
    check: <path d="m5 12 4 4L19 6" />,
  };

  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}