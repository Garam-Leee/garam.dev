# garam.dev

안녕하세요, 프론트엔드 개발자 이가람입니다. 웹툰과 헬스케어 서비스를 만들며 고민했던 구조, 성능, 안정성 문제와 그 해결 과정을 정리했습니다.

**[사이트 보기](https://garam-dev.vercel.app)** · **[기술 사례](https://garam-dev.vercel.app/#projects)** · **[블로그](https://garam-dev.vercel.app/posts)**

## 둘러보기

- **기술 사례** — 직접 겪고 해결한 8가지 기술 과제를 모았습니다. 분야별로 골라 보거나 각 사례의 해결 과정을 읽을 수 있습니다.
- **핵심 역량과 경력** — 어떤 기준으로 기술을 선택하고 서비스를 개선해 왔는지 소개합니다. 회사별 자세한 업무는 `/experience`에 정리했습니다.
- **블로그** — 개발하며 배운 점을 기록했습니다. 검색어나 태그로 글을 찾을 수 있습니다.
- **Components** — `/components`에서 만든 UI 컴포넌트의 유형과 상태를 살펴볼 수 있습니다.
- **이력서** — PDF 파일로 내려받을 수 있습니다.

메인 화면에서는 경력과 작업에 관해 질문해 볼 수도 있습니다. 답변은 경력기술서와 기술 사례를 바탕으로 미리 준비했습니다.

## 기술

Next.js 15 · React 19 · TypeScript · Tailwind CSS 4 · Radix UI · Markdown/remark

## 로컬 실행

Node.js 22를 사용합니다. 저장소를 받은 뒤 아래 명령어로 실행해 주세요.

```bash
npm ci
npm run dev
```

`http://localhost:3000`에서 사이트를 볼 수 있습니다. 배포용 빌드는 `npm run build`, 빌드한 사이트 실행은 `npm run start`를 사용합니다.

## 콘텐츠 수정

| 콘텐츠 | 위치 |
| --- | --- |
| 프로필·연락처·이력서 링크 | `src/data/profile.ts` |
| 기술 사례 | `src/data/projects.ts` |
| 경력 | `src/data/experience.ts`, `src/data/experience-projects.ts` |
| 블로그 글 | `src/content/posts/<slug>/index.md` |
| UI 컴포넌트 | `src/components/ui/` |

블로그 글을 추가할 때는 `src/content/posts/<slug>/index.md`를 만들고 아래처럼 시작하면 됩니다. `title`, `description`, `date`는 필수이고 `tags`, `thumbnail`은 필요할 때 추가할 수 있습니다.

```md
---
title: "글 제목"
description: "글 설명"
date: "2026-10-22"
tags: ["React", "회고"]
---

본문을 작성합니다.
```

## 검증

```bash
npm run lint
npm run type-check
npm test
npm run build
```

push나 pull request를 올리면 GitHub Actions에서도 같은 항목을 검사합니다. 사이트 주소를 바꾸려면 `NEXT_PUBLIC_SITE_URL`을 설정해 주세요. 모바일 성능을 측정한 방법은 [성능 기록](docs/performance.md)에 남겨 두었습니다.
