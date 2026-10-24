import { ImageResponse } from "next/og";
import fs from "node:fs";
import path from "node:path";

export function renderOgImage(title: string, category: string) {
  const font = fs.readFileSync(path.join(process.cwd(), "src/assets/Pretendard-Regular.otf"));
  return new ImageResponse(
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%", height: "100%", padding: 72, background: "linear-gradient(135deg, #f8fbff, #e8f3ff)", color: "#191f28", fontFamily: "Pretendard" }}>
      <div style={{ display: "flex", fontSize: 26, color: "#2272eb" }}>{category}</div>
      <div style={{ display: "flex", fontSize: title.length > 45 ? 48 : 60, lineHeight: 1.3, wordBreak: "keep-all" }}>{title}</div>
      <div style={{ display: "flex", fontSize: 24, color: "#4e5968" }}>Garam Lee · Frontend Engineer</div>
    </div>,
    { width: 1200, height: 630, fonts: [{ name: "Pretendard", data: new Uint8Array(font).buffer, weight: 400, style: "normal" }] }
  );
}
