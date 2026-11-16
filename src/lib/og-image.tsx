import { ImageResponse } from "next/og";
import fs from "node:fs";
import path from "node:path";

export function renderOgImage(title: string, category: string) {
  const font = fs.readFileSync(path.join(process.cwd(), "src/assets/Pretendard-Regular.otf"));
  return new ImageResponse(
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%", height: "100%", padding: 72, background: "#F8F9FA", color: "#131415", fontFamily: "Pretendard" }}>
      <div style={{ display: "flex", fontSize: 24, color: "#005CCC" }}>{category}</div>
      <div style={{ display: "flex", fontSize: title.length > 45 ? 48 : 60, lineHeight: 1.3, wordBreak: "keep-all" }}>{title}</div>
      <div style={{ display: "flex", fontSize: 24, color: "#4A4C50" }}>Garam Lee · Frontend Engineer</div>
    </div>,
    { width: 1200, height: 630, fonts: [{ name: "Pretendard", data: new Uint8Array(font).buffer, weight: 400, style: "normal" }] }
  );
}
