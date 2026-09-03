# GARAM.DEV — 포트폴리오

> UX를 데이터로 증명하는 5년 차 프론트엔드 엔지니어 이가람의 포트폴리오

## 기술 스택

| 카테고리 | 기술 |
|---|---|
| Framework | Next.js 15 (App Router, Turbopack) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 (CSS-first, `@theme` directive) |
| 3D | React Three Fiber v9 + drei v10 |
| Animation | Framer Motion v11 + View Transition API |
| Scroll | Lenis smooth scroll |
| Data | GitHub REST API (ISR 1h 캐시) |

## 핵심 설계 원칙

- **Invisible Nav**: glassmorphism 제거, 스크롤 시 얇은 border-bottom만 표시
- **Data-driven 3D**: GitHub 커밋 히스토리를 3D scatter plot으로 시각화 (instancedMesh 없이 `THREE.Points` + custom shader)
- **Shared Element Transition**: 프로젝트 카드 → 상세 모달을 Framer Motion `layoutId`로 처리
- **prefers-reduced-motion**: 3D Canvas → 정적 대안으로 자동 전환
- **GPU 최적화**: `AdaptiveDpr`, `AdaptiveEvents`, `Preload`, additive blending, depthWrite: false

## 시작하기

```bash
# 의존성 설치
npm install

# 개발 서버 (Turbopack)
npm run dev

# 빌드
npm run build

# 타입 체크
npm run type-check
```

## 환경 변수

`.env.local` 파일을 생성하고 아래 값을 설정합니다:

```
# GitHub Personal Access Token (없으면 Mock 데이터 사용)
GITHUB_TOKEN=your_token_here
```

GitHub Token은 `Settings > Developer settings > Personal access tokens`에서 발급합니다.
필요 권한: `public_repo`, `read:user`

## 프로젝트 구조

```
src/
 ├─ app/
 │  ├─ layout.tsx          # 루트 레이아웃 + Lenis + Nav
 │  └─ page.tsx            # 메인 페이지 (ISR)
 ├─ components/
 │  ├─ canvas/
 │  │  ├─ DataCosmos.tsx   # R3F Canvas 래퍼 + 카메라 리그
 │  │  └─ ParticleField.tsx # GitHub 데이터 → 3D 파티클
 │  ├─ sections/
 │  │  ├─ Hero.tsx         # 히어로 섹션 + 3D 배경
 │  │  ├─ Projects.tsx     # 프로젝트 카드 + layoutId 모달
 │  │  ├─ DataStory.tsx    # KPI 수치 + 언어 분포
 │  │  └─ Contact.tsx      # 연락처
 │  ├─ ui/
 │  │  ├─ Nav.tsx          # Invisible Nav
 │  │  ├─ MagneticBtn.tsx  # 마그네틱 버튼
 │  │  └─ TextReveal.tsx   # 텍스트 등장 애니메이션
 │  └─ LenisProvider.tsx   # Lenis 전역 설정
 ├─ hooks/
 │  ├─ useMouseParallax.ts
 │  ├─ useScrollProgress.ts
 │  └─ useReducedMotion.ts
 ├─ lib/
 │  ├─ github.ts           # GitHub API + Mock 데이터
 │  └─ utils.ts            # cn, lerp, clamp
 └─ styles/
    └─ globals.css         # Tailwind v4 @theme 설정
```

## TODO (다음 작업)

- [ ] `GITHUB_USERNAME` → 실제 GitHub 유저명으로 변경 (`src/lib/github.ts`)
- [ ] 프로젝트 데이터 실제 내용으로 업데이트 (`src/components/sections/Projects.tsx`)
- [ ] 연락처 이메일/링크 실제 정보로 변경
- [ ] GitHub GraphQL API 연동 → 실제 contribution 데이터
- [ ] About / Resume / Writings 페이지 추가
- [ ] OG 이미지 추가
- [ ] Vercel 배포
