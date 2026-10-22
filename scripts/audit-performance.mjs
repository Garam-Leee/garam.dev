import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

const [url = "http://localhost:3107", label = "audit", count = "3"] = process.argv.slice(2);
const runs = Number(count);
if (!/^https?:$/.test(new URL(url).protocol) || !/^[a-z0-9-]+$/i.test(label) || !Number.isInteger(runs) || runs < 1 || runs > 10) {
  throw new Error("Usage: npm run audit:performance -- <url> <label> <runs 1-10>");
}
fs.mkdirSync(".performance", { recursive: true });
const metrics = [];
for (let run = 1; run <= runs; run++) {
  const file = `.performance/${label}-${run}.json`;
  const result = spawnSync(process.execPath, [
    path.resolve("node_modules/lighthouse/cli/index.js"), url,
    "--only-categories=performance", "--output=json", `--output-path=${file}`,
    "--chrome-flags=--headless --no-sandbox", "--quiet",
  ], { stdio: "inherit" });
  if (result.status !== 0) process.exit(result.status || 1);
  const report = JSON.parse(fs.readFileSync(file, "utf8"));
  if (report.runtimeError) throw new Error(report.runtimeError.message);
  const metric = {
    score: Math.round(report.categories.performance.score * 100),
    lcpMs: report.audits["largest-contentful-paint"].numericValue,
    cls: report.audits["cumulative-layout-shift"].numericValue,
    tbtMs: report.audits["total-blocking-time"].numericValue,
    speedIndexMs: report.audits["speed-index"].numericValue,
  };
  metrics.push(metric);
  console.log(`Run ${run}:`, metric);
}
const median = Object.fromEntries(Object.keys(metrics[0]).map((key) => {
  const values = metrics.map((metric) => metric[key]).sort((a, b) => a - b);
  const mid = Math.floor(values.length / 2);
  return [key, values.length % 2 ? values[mid] : (values[mid - 1] + values[mid]) / 2];
}));
fs.writeFileSync(`.performance/${label}-summary.json`, JSON.stringify({ url, runs, metrics, median }, null, 2));
console.log("Median:", median);
