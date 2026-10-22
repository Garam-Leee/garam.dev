# Garam Lee Portfolio

사용자 경험과 비즈니스 가치를 함께 고민하는 Product Frontend Engineer 이가람의 포트폴리오입니다.

웹툰 플랫폼, 헬스케어 서비스, ERP 시스템 등 다양한 도메인에서 프론트엔드 개발과 서비스 개선을 경험했습니다.

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
