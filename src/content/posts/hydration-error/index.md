---
title: "Hydration Error를 만났을 때 가장 먼저 확인해야 할 것"
description: "Next.js에서 Hydration Error를 만났을 때 원인을 이해하고, 실제로 자주 확인했던 코드 패턴들을 정리했습니다."
date: "2023-05-09"
tags: ["Next.js", "React", "Hydration", "트러블슈팅"]
---

# Hydration Error를 만났을 때 가장 먼저 확인해야 할 것

Next.js를 사용하다 보면 한 번쯤 이런 에러를 만나게 된다.

```bash
Hydration failed because the initial UI does not match what was rendered on the server.
```

처음 이 에러를 봤을 때는 꽤 당황했다.

페이지는 정상적으로 보이는데 콘솔에는 에러가 찍히고 있었다.

검색을 해보면 원인도 다양하다.

`window` 사용 문제,
날짜 포맷,
랜덤 값,
잘못된 HTML 구조,
브라우저 확장 프로그램까지.

처음에는 어디서부터 봐야 할지 몰랐다.

하지만 몇 번 겪고 나니 결국 하나의 질문으로 돌아오게 됐다.

> 서버가 만든 HTML과 브라우저가 처음 렌더링한 결과가 같은가?

Hydration Error는 여기서 시작한다.

## Hydration은 무엇일까

SSR 페이지가 요청되면 Next.js는 서버에서 먼저 HTML을 생성한다.

브라우저는 이 HTML을 받아 화면에 먼저 보여준다.

하지만 이 상태는 아직 완전히 동작하는 React 앱은 아니다.

이후 React가 브라우저에서 실행되면서 기존 HTML에 이벤트를 연결하고 상태를 붙인다.

이 과정을 Hydration이라고 부른다.

간단히 말하면

```txt
서버가 HTML을 먼저 그림
브라우저가 HTML을 보여줌
React가 그 위에 이벤트와 상태를 연결함
```

이 흐름이다.

이 과정에서 React는 중요한 전제를 갖고 있다.

> 서버에서 만든 HTML과 클라이언트의 첫 렌더링 결과는 같아야 한다.

그래야 기존 DOM을 안전하게 재사용할 수 있다.

## 가장 먼저 확인하는 것

Hydration Error가 발생하면 나는 먼저 렌더링 중에 값이 달라질 수 있는 코드가 있는지 확인한다.

예를 들어 이런 코드다.

```tsx
export default function Page() {
  const now = new Date();

  return <p>{now.toISOString()}</p>;
}
```

서버에서 렌더링한 시간과 브라우저에서 렌더링한 시간이 다를 수 있다.

서버는 이렇게 만들었는데

```html
<p>2023-05-09T10:00:00.000Z</p>
```

브라우저에서는 이렇게 렌더링할 수 있다.

```html
<p>2023-05-09T10:00:01.000Z</p>
```

1초 차이지만 React 입장에서는 다른 HTML이다.

## 문제 패턴 1. 날짜와 시간

가장 자주 만나는 패턴 중 하나가 날짜다.

```tsx
export default function TimeText() {
  return <span>{new Date().toLocaleString()}</span>;
}
```

이 코드는 간단하지만 서버와 클라이언트의 결과가 달라질 수 있다.

이럴 때는 클라이언트에서만 값을 계산하도록 분리할 수 있다.

```tsx
"use client";

import { useEffect, useState } from "react";

export default function TimeText() {
  const [time, setTime] = useState("");

  useEffect(() => {
    setTime(new Date().toLocaleString());
  }, []);

  if (!time) return null;

  return <span>{time}</span>;
}
```

이렇게 하면 첫 렌더링에서는 서버와 클라이언트가 동일하게 빈 값을 렌더링하고,
클라이언트에서 마운트된 뒤에만 시간을 표시한다.

## 문제 패턴 2. 랜덤 값

`Math.random()`도 자주 문제를 만든다.

```tsx
export default function Badge() {
  const id = Math.random();

  return <div data-id={id}>New</div>;
}
```

서버에서 생성된 랜덤 값과 브라우저에서 생성된 랜덤 값은 당연히 다르다.

```txt
server: 0.1234
client: 0.9876
```

이런 값이 렌더링 결과에 들어가면 Hydration Error가 발생할 수 있다.

가능하면 렌더링 중에 랜덤 값을 만들지 않는 것이 좋다.

필요하다면 서버에서 생성한 값을 props로 넘기거나,
클라이언트 마운트 이후에 생성하는 방식으로 분리한다.

```tsx
"use client";

import { useEffect, useState } from "react";

export default function Badge() {
  const [id, setId] = useState<number | null>(null);

  useEffect(() => {
    setId(Math.random());
  }, []);

  if (id === null) return <div>New</div>;

  return <div data-id={id}>New</div>;
}
```

## 문제 패턴 3. 브라우저 API

서버에는 `window`, `localStorage`, `navigator` 같은 브라우저 API가 없다.

아래 코드는 서버 렌더링 시점에 문제가 될 수 있다.

```tsx
export default function ThemeLabel() {
  const theme = localStorage.getItem("theme");

  return <p>{theme}</p>;
}
```

이런 값은 클라이언트에서만 읽어야 한다.

```tsx
"use client";

import { useEffect, useState } from "react";

export default function ThemeLabel() {
  const [theme, setTheme] = useState<string | null>(null);

  useEffect(() => {
    setTheme(localStorage.getItem("theme"));
  }, []);

  return <p>{theme ?? "default"}</p>;
}
```

렌더링 시점에 브라우저 API를 바로 사용하는 습관은 Hydration Error뿐 아니라 서버 컴포넌트 환경에서도 문제를 만들기 쉽다.

## 문제 패턴 4. 조건부 렌더링

서버와 클라이언트에서 조건이 다르게 평가되는 경우도 있다.

```tsx
export default function ResponsiveText() {
  const isMobile = window.innerWidth < 768;

  return <p>{isMobile ? "모바일" : "데스크톱"}</p>;
}
```

이 코드는 서버에서는 실행할 수 없고,
클라이언트 환경에 따라 결과도 달라진다.

가능하다면 이런 UI는 CSS로 해결하는 편이 더 안정적이다.

```tsx
export default function ResponsiveText() {
  return (
    <>
      <p className="block md:hidden">모바일</p>
      <p className="hidden md:block">데스크톱</p>
    </>
  );
}
```

화면 크기에 따른 단순 노출 여부라면 JavaScript보다 CSS가 더 적합한 경우가 많다.

## 문제 패턴 5. 잘못된 HTML 구조

의외로 많이 놓치는 원인이 HTML 구조다.

```tsx
export default function Article() {
  return (
    <p>
      설명입니다.
      <div>자세히 보기</div>
    </p>
  );
}
```

`p` 태그 안에 `div`를 넣는 것은 올바른 HTML 구조가 아니다.

브라우저는 이런 구조를 자동으로 수정한다.

React가 예상한 DOM과 브라우저가 실제로 만든 DOM이 달라질 수 있다.

이럴 때는 구조를 올바르게 바꾸어야 한다.

```tsx
export default function Article() {
  return (
    <div>
      <p>설명입니다.</p>
      <div>자세히 보기</div>
    </div>
  );
}
```

Next.js의 `Link` 변경으로 `a` 태그 안에 또 다른 `a` 태그가 생겼던 문제도 비슷한 맥락이었다.

JSX는 멀쩡해 보여도 브라우저가 실제로 만든 HTML은 다를 수 있다.

그래서 Hydration Error가 발생하면 React 코드만 보지 말고 개발자 도구에서 실제 DOM을 확인하는 것이 도움이 된다.

## 내가 확인하는 순서

지금은 Hydration Error를 만나면 보통 아래 순서로 확인한다.

```txt
1. 렌더링 중에 new Date()를 사용했는가
2. 렌더링 중에 Math.random()을 사용했는가
3. window, localStorage, navigator를 바로 사용했는가
4. 서버와 클라이언트에서 조건부 렌더링 결과가 달라지는가
5. HTML 구조가 올바른가
```

대부분의 문제는 이 안에서 발견됐다.

## 마무리

Hydration Error는 처음 보면 어렵게 느껴진다.

하지만 원리는 생각보다 단순하다.

서버가 만든 HTML과 브라우저가 처음 렌더링한 결과가 다르면 문제가 생긴다.

그래서 에러를 만났을 때는 복잡하게 생각하기보다 먼저 질문해보는 편이 좋다.

> 서버와 브라우저가 정말 같은 화면을 그리고 있는가?
