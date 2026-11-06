"use client";

import { createContext, useContext } from "react";
import type { ReactNode } from "react";

export const GallerySelectionContext = createContext<readonly string[]>(["Color"]);

export function GallerySample({ title, note, children }: { title: string; note?: string; children: ReactNode }) {
  const active = useContext(GallerySelectionContext);
  if (!active.includes(title)) return null;
  return <div className="gallery-sample"><div className="gallery-sample-head"><h3>{title}</h3>{note && <span>{note}</span>}</div><div className="gallery-sample-body">{children}</div></div>;
}
