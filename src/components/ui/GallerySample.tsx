import type { ReactNode } from "react";

export function GallerySample({ title, note, children }: { title: string; note?: string; children: ReactNode }) {
  return <div className="gallery-sample"><div className="gallery-sample-head"><h3>{title}</h3>{note && <span>{note}</span>}</div><div className="gallery-sample-body">{children}</div></div>;
}
