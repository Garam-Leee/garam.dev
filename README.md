# Garam Lee Portfolio

프론트엔드 구조 설계, 성능과 데이터 흐름, 운영 안정성을 중심으로 경력을 정리한 Frontend Engineer 이가람의 포트폴리오입니다.

웹툰 플랫폼, 헬스케어 서비스, ERP 시스템 등 다양한 도메인에서 프론트엔드 개발과 서비스 개선을 경험했습니다.

메인 화면은 경력기술서에 기반한 7개 기술 사례를 표시합니다. 경력의 주요 성과와 담당 업무를 구분하고, 개별 사례의 기간은 회사 재직 기간임을 명시합니다. 이전에 공유한 상세 주소는 보관 데이터로 유지하며 메인 목록에는 노출하지 않습니다. PDF 이력서는 별도 파일입니다.

## Live

| Link      | URL                           |
| --------- | ----------------------------- |
| Portfolio | https://garam-dev.vercel.app  |
| GitHub    | https://github.com/Garam-Leee |

## About

이 포트폴리오는 다음 내용을 중심으로 구성했습니다.

- 경력 및 프로젝트 경험
- 서비스 개선 사례 및 성과
- 데이터 기반 의사결정 경험
- 기술 스택 및 개발 문화
- 기술 블로그 및 이력서

## Tech Stack

| Category         | Stack                      |
| ---------------- | -------------------------- |
| Frontend         | React, Next.js, TypeScript |
| Styling          | Tailwind CSS               |
| State Management | Zustand, SWR, React Query  |
| Animation        | Framer Motion              |
| Analytics        | GA4, Datadog, Elastic      |
| Deployment       | Vercel                     |

## Features

- 반응형 웹 지원
- 프로젝트 상세 모달
- 경력 타임라인
- 기술 스택 필터링
- 인터랙티브 애니메이션
- PDF 이력서 제공
- 기술 블로그 연동

## Local Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run start
```

## 블로그 글 작성

`src/content/posts/<slug>/index.md`에 글을 작성합니다. 메타데이터 형식은 다음과 같습니다.

```yaml
---
title: "글 제목"
description: "글 설명"
date: "2026-10-22"
tags: ["React", "회고"]
---
```

- `title`, `description`은 비어 있지 않은 문자열이 필수입니다.
- `date`는 따옴표로 감싼 유효한 `YYYY-MM-DD` 날짜가 필수입니다.
- `tags`는 생략할 수 있으며, 지정 시 비어 있지 않은 문자열 배열이어야 합니다. 앞뒤 공백과 중복은 제거합니다.
- `thumbnail`은 선택 항목이며, 지정 시 비어 있지 않은 문자열이어야 합니다.
- 잘못된 메타데이터는 파일 경로와 항목을 포함한 오류를 발생시킵니다. `index.md`가 없는 폴더는 목록에서 제외됩니다.
- 본문은 Markdown으로 작성합니다. 원시 HTML은 렌더링하지 않으며, HTML 예제는 코드 블록에 작성합니다.
- 글 목록은 제목·설명·태그를 검색하며, 태그 필터와 함께 사용할 수 있습니다. 검색어는 공백으로 나눈 모든 단어를 포함해야 합니다.
- 글 목록은 페이지당 6개를 표시합니다. 검색어와 태그는 URL에 유지되며, 검색 폼을 제출하면 첫 페이지부터 표시합니다.

## 프로젝트 관리

`src/data/projects.ts`에서 프로젝트를 관리하며 `src/types/project.ts`의 공통 타입으로 검사합니다.

- `slug`는 `/projects/<slug>` 상세 페이지 주소입니다. 공유된 주소가 유지되도록 고유한 값을 지정합니다.
- `domain`과 `tools`는 메인 페이지의 도메인·기술 필터에 사용합니다. 두 필터는 함께 적용됩니다.
- `featured: true`인 프로젝트는 필터 결과에서 먼저 표시합니다.
- 모달과 상세 페이지는 같은 프로젝트 데이터와 상세 컴포넌트를 사용합니다.

## 검증

```bash
npm run lint
npm run type-check
npm test
npm run build
```

GitHub Actions는 push와 pull request마다 Node.js 22에서 의존성을 설치하고 위 검증을 실행합니다.

사이트 주소는 `NEXT_PUBLIC_SITE_URL`로 지정합니다. canonical, 공유 이미지 URL, sitemap과 robots가 같은 주소를 사용합니다. 미설정 시 `https://garam-dev.vercel.app`을 사용합니다.

모바일 성능 반복 측정은 `npm run audit:performance -- http://localhost:3107 candidate 3`으로 실행합니다. Chrome과 Node.js 22.19 이상이 필요하며, 측정 조건과 한계는 [성능 기록](docs/performance.md)에 정리했습니다.
