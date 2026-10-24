# Local performance check — 2026-10-22

## Method

- Next.js production build, local homepage, Chrome 155 and Lighthouse 13.5.0 on Windows.
- Lighthouse default mobile profile: 412 × 823, simulated mobile network and 4× CPU slowdown.
- Three sequential cold-browser audits before and after the rendering changes; medians below.
- Baseline is commit `9dccb0c`. Candidate removes the Hero entrance animation, bounds decorative paint to the first viewport, and disables animated blurred background layers below 768px.
- Raw reports are stored locally in ignored `.performance/` files.

## Results

| Metric | Before median | After median |
| --- | ---: | ---: |
| Performance score | 69 | 68 |
| LCP | 4,373 ms | 4,300 ms |
| CLS | 0.0230 | 0 |
| TBT | 136 ms | 167 ms |
| Speed Index | 29,192 ms | 28,819 ms |

Layout shift was eliminated in all three candidate runs. LCP changed only slightly, and the score and TBT did not improve. Do not interpret this change as a demonstrated overall speed improvement.

The trace records approximately 19 seconds before the main document finishes while the server response audit reports about 4 ms. A follow-up audit using `127.0.0.1` also showed this delay (score 69, CLS 0). Speed Index and absolute timing results are therefore affected by this local measurement environment. Repeat on the deployed site before drawing conclusions about real-user load time.

INP is not measured by this navigation-only audit. Check field measurements through the existing Vercel Speed Insights integration after deployment. TBT is a lab diagnostic, not an INP substitute.

## Reproduce

Use Node.js 22.19+ and an installed Chrome browser. Build and start the site in separate terminals:

```bash
npm run build
npm run start -- --port 3107
```

Then run:

```bash
npm run audit:performance -- http://localhost:3107 candidate 3
```

Set `CHROME_PATH` to the Chrome executable if automatic discovery fails. The command writes per-run JSON reports and a median summary to `.performance/`. Avoid other browser or build activity during measurement.

## Remaining work

- Recheck the deployed site without the local document delay.
- Investigate the render-blocking stylesheet and initial JavaScript costs shown in the audits.
- Measure mobile interaction latency with real interactions and field INP.
