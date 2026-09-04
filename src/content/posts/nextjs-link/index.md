---
title: "Next.js Link 변경으로 깨진 HTML 구조를 고친 기록"
description: "Next.js 버전 업 이후 발생했던 Hydration Error의 원인을 추적하며 HTML 구조와 Link 컴포넌트의 변화를 이해하게 된 경험을 정리했습니다."
date: "2023-06-21"
tags: ["Next.js", "React", "HTML", "트러블슈팅"]
---

# Next.js Link 변경으로 깨진 HTML 구조를 고친 기록

예전에 Next.js 버전을 올린 뒤 예상하지 못한 에러를 만난 적이 있었다.

페이지는 정상적으로 보였지만 개발자 도구에는 계속 경고가 찍혔다.

처음에는 흔한 Hydration Error라고 생각했다.

SSR과 CSR이 다르게 렌더링되는 문제인가 싶어 데이터를 확인하고 상태 관리 코드를 살펴봤지만 원인은 다른 곳에 있었다.

결국 문제는 생각보다 단순했다.

`next/link`의 사용 방식이 바뀌었는데 기존 코드를 그대로 사용하고 있었던 것이다.

## 당시에는 Emotion을 사용하고 있었다

당시 프로젝트에서는 Emotion을 사용하고 있었다.

카드 형태의 UI를 만들 때 아래와 같은 패턴을 자주 사용했다.

```tsx
import Link from "next/link";
import styled from "@emotion/styled";

const CardLink = styled.a`
  display: block;
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 12px;
`;

export default function PostCard() {
  return (
    <Link href="/posts/example">
      <CardLink>
        <h2>포스트 제목</h2>
        <p>포스트 설명</p>
      </CardLink>
    </Link>
  );
}
```

예전 Next.js에서는 문제가 없었다.

오히려 공식 문서에서도 Link 내부에 `a` 태그를 사용하는 방식을 권장하던 시절이 있었다.

그래서 나도 자연스럽게 사용하고 있었다.

## Next.js 13 이후 Link가 바뀌었다

Next.js 13부터는 `Link` 컴포넌트 자체가 `a` 태그 역할을 하게 되었다.

이전처럼 내부에 `a` 태그를 넣으면 실제 HTML 구조는 아래처럼 생성된다.

```html
<a href="/posts/example">
  <a class="emotion-xxx">
    <h2>포스트 제목</h2>
    <p>포스트 설명</p>
  </a>
</a>
```

문제는 HTML 규격상 `a` 태그 안에 또 다른 `a` 태그를 넣을 수 없다는 점이다.

브라우저는 이런 구조를 발견하면 내부적으로 DOM을 수정해서 해석한다.

그리고 이 과정에서 React가 예상한 DOM과 실제 DOM이 달라지게 된다.

## 왜 Hydration Error가 발생할까

React는 서버에서 생성한 HTML과 클라이언트에서 생성한 HTML이 동일하다고 가정한다.

하지만 브라우저가 HTML을 자동 수정하면 상황이 달라진다.

React가 기대한 구조

```html
<a>
  <a>
    <h2>제목</h2>
  </a>
</a>
```

실제 브라우저가 만든 구조

```html
<a></a>
<a>
  <h2>제목</h2>
</a>
```

이렇게 차이가 발생하면 Hydration 과정에서 경고가 출력된다.

당시에는 React 문제라고 생각했지만 실제로는 HTML 구조 문제였다.

## 해결 방법

가장 쉬운 방법은 `a` 태그를 제거하는 것이다.

Emotion을 사용한다면 기존 `styled.a` 대신 `styled(Link)`로 변경할 수 있다.

```tsx
import Link from "next/link";
import styled from "@emotion/styled";

const CardLink = styled(Link)`
  display: block;
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 12px;
`;

export default function PostCard() {
  return (
    <CardLink href="/posts/example">
      <h2>포스트 제목</h2>
      <p>포스트 설명</p>
    </CardLink>
  );
}
```

혹은 Emotion의 `css` prop을 사용할 수도 있다.

```tsx
<Link
  href="/posts/example"
  css={{
    display: "block",
    padding: "16px",
    border: "1px solid #ddd",
    borderRadius: "12px",
  }}
>
  <h2>포스트 제목</h2>
  <p>포스트 설명</p>
</Link>
```

실제 HTML도 아래처럼 정상적으로 렌더링된다.

```html
<a href="/posts/example" class="emotion-xxx">
  <h2>포스트 제목</h2>
  <p>포스트 설명</p>
</a>
```

## 이 문제를 겪고 생긴 습관

그 이후로 Hydration Error를 만나면 React 코드부터 보지 않게 됐다.

먼저 실제 DOM 구조를 확인한다.

개발자 도구의 Elements 탭을 열어 브라우저가 최종적으로 어떤 HTML을 만들었는지 확인하는 것이다.

생각보다 많은 문제가 여기서 발견된다.

예를 들어 아래와 같은 구조들도 문제가 될 수 있다.

```tsx
<p>
  <div>설명</div>
</p>
```

```tsx
<button>
  <button>삭제</button>
</button>
```

```tsx
<a href="/profile">
  <button>프로필 보기</button>
</a>
```

JSX만 보면 자연스러워 보이지만 HTML 규칙에서는 올바르지 않은 구조다.

브라우저는 이를 수정하려고 하고 React는 예상과 다른 DOM을 만나게 된다.

## HTML은 여전히 중요하다

React와 Next.js를 오래 사용하다 보면 HTML을 직접 다룰 일이 줄어든다.

그래서 가끔은 JSX가 곧 HTML이라고 착각하게 된다.

하지만 브라우저가 이해하는 것은 결국 HTML이다.

프레임워크가 많은 것을 추상화해주지만 HTML 규칙까지 사라지는 것은 아니다.

이번 일을 겪고 나서 느낀 점은 단순했다.

Hydration Error는 React 문제일 수도 있지만 HTML 문제일 가능성도 꽤 높다.

특히 Next.js 버전 업 이후 갑자기 발생한 문제라면 Link 컴포넌트 사용 방식을 한 번쯤 확인해보는 것을 추천한다.

생각보다 원인은 가까운 곳에 있을 수 있다.
