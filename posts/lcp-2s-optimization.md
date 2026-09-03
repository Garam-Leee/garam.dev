---
title: "LCP를 4.2s에서 2.1s로 줄인 방법"
description: "번들 분석부터 이미지 최적화, SWR 캐싱까지 — 실무에서 실제로 써먹은 성능 최적화 기법을 정리합니다."
date: "2026-05-20"
tags: ["성능최적화", "Next.js", "Core Web Vitals"]
---

## 왜 LCP가 중요한가

LCP(Largest Contentful Paint)는 Google의 Core Web Vitals 지표 중 하나로, 사용자가 페이지에서 가장 큰 콘텐츠 요소가 렌더링되는 시점을 측정합니다.

- **Good**: 2.5s 이하
- **Needs Improvement**: 2.5s ~ 4.0s
- **Poor**: 4.0s 초과

우리 서비스의 주요 랜딩 페이지는 **4.2s**로 Poor 구간에 머물러 있었습니다. SEO 점수와 이탈률에 직접적인 영향을 주고 있었죠.

---

## 1단계: 원인 파악 — Chrome DevTools + Lighthouse

먼저 원인을 파악해야 합니다. 막연히 최적화를 시작하면 효과가 없어요.

```bash
# Lighthouse CI 설치
npm install -g @lhci/cli

# 실행
lhci autorun
```

분석 결과 주요 원인 3가지가 나왔습니다.

| 원인 | 영향도 |
|------|--------|
| 대형 JS 번들 | 높음 |
| 최적화되지 않은 히어로 이미지 | 매우 높음 |
| 서드파티 스크립트 블로킹 | 중간 |

---

## 2단계: 이미지 최적화

히어로 이미지가 원본 PNG 그대로 2.3MB였습니다. Next.js의 `<Image>` 컴포넌트로 교체하고 WebP 변환을 적용했습니다.

```tsx
// Before — 그냥 img 태그
<img src="/hero.png" alt="히어로" />

// After — Next.js Image
import Image from "next/image";

<Image
  src="/hero.png"
  alt="히어로"
  width={1200}
  height={630}
  priority          // LCP 요소에는 priority 필수
  placeholder="blur"
  blurDataURL={blurUrl}
/>
```

**결과**: 이미지 로드 시간 2.3s → 0.4s

---

## 3단계: 번들 분석 & 코드 스플리팅

`@next/bundle-analyzer`로 번들을 시각화했습니다.

```bash
npm install @next/bundle-analyzer
ANALYZE=true npm run build
```

차트 라이브러리가 초기 번들에 포함되어 있었습니다. `dynamic import`로 분리했습니다.

```tsx
// Before
import { Chart } from "chart-library"; // 200KB

// After
const Chart = dynamic(() => import("chart-library"), {
  ssr: false,
  loading: () => <ChartSkeleton />,
});
```

---

## 4단계: SWR 캐싱으로 API 지연 제거

대시보드 데이터를 매번 fresh하게 fetch하고 있었습니다. SWR로 교체해 캐싱을 적용했습니다.

```tsx
import useSWR from "swr";

const { data, isLoading } = useSWR("/api/dashboard", fetcher, {
  revalidateOnFocus: false,
  dedupingInterval: 60000, // 1분간 중복 요청 방지
});
```

---

## 최종 결과

| 지표 | Before | After | 개선 |
|------|--------|-------|------|
| LCP | 4.2s | 2.1s | **−50%** |
| TBT | 380ms | 90ms | **−76%** |
| Lighthouse | 61점 | 98점 | **+37점** |

---

## 핵심 정리

1. **측정 먼저** — Lighthouse로 원인 파악 후 최적화
2. **이미지가 대부분** — `<Image priority>`와 WebP
3. **번들 쪼개기** — dynamic import + bundle-analyzer
4. **API 캐싱** — SWR `dedupingInterval`

성능 최적화는 '한 번에 다 하려는 욕심'이 가장 위험합니다. 측정 → 원인 → 개선 → 측정의 사이클을 반복하세요.
