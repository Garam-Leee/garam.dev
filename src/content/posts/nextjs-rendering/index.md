---

title: "Next.js는 어떻게 페이지를 그릴까: CSR, SSR, SSG를 처음 이해한 방식"
description: "처음에는 어려웠던 CSR, SSR, SSG. 결국은 HTML을 누가 언제 만드는지의 차이였다."
date: "2023-04-18"
tags: ["Next.js", "CSR", "SSR", "SSG", "개념정리"]

---

# Next.js는 어떻게 페이지를 그릴까: CSR, SSR, SSG를 처음 이해한 방식

프론트엔드를 처음 공부할 때 가장 헷갈렸던 개념 중 하나가 CSR, SSR, SSG였다.

용어 자체는 어렵지 않았다.

- CSR(Client Side Rendering)
- SSR(Server Side Rendering)
- SSG(Static Site Generation)

그런데 설명을 읽어도 항상 같은 생각이 들었다.

> 그래서 결국 뭐가 다른 건데?

시간이 지나고 나서야 생각보다 단순한 질문 하나로 이해할 수 있었다.

## 결국 HTML을 누가 만드는가

웹사이트에 접속하면 브라우저는 HTML을 받아 화면을 그린다.

CSR, SSR, SSG의 차이는 사실 하나다.

> HTML을 누가, 언제 만드는가?

## CSR: 브라우저가 만든다

React SPA를 만들면 대부분 CSR로 동작한다.

서버는 거의 비어 있는 HTML만 전달한다.

```html
<body>
  <div id="root"></div>
</body>
```

이후 브라우저가 JavaScript를 실행해 화면을 만든다.

```text
서버 → 빈 HTML 전달
브라우저 → JS 실행
브라우저 → 화면 생성
```

초기 로딩은 느릴 수 있지만 한 번 실행되면 페이지 전환이 매우 빠르다.

## SSR: 서버가 만든다

SSR은 요청이 들어올 때마다 서버가 HTML을 생성한다.

```text
사용자 요청
→ 서버에서 HTML 생성
→ 브라우저 전달
```

이미 완성된 HTML이 내려오기 때문에 첫 화면이 빠르게 보인다.

SEO가 중요한 페이지에서 많이 사용된다.

```tsx
export async function getServerSideProps() {
  const data = await fetchData();

  return {
    props: { data },
  };
}
```

## SSG: 미리 만들어 둔다

SSG는 빌드 시점에 HTML을 미리 생성한다.

```text
빌드 시점
→ HTML 생성

사용자 요청
→ 만들어진 파일 반환
```

서버가 계산할 필요가 없어서 가장 빠르다.

블로그나 회사 소개 페이지처럼 자주 바뀌지 않는 화면에 적합하다.

```tsx
export async function getStaticProps() {
  const posts = await getPosts();

  return {
    props: { posts },
  };
}
```

## 내가 이해했던 방식

당시에는 음식점 비유가 가장 이해하기 쉬웠다.

- CSR → 손님이 직접 요리
- SSR → 주문이 들어오면 주방에서 즉시 조리
- SSG → 미리 만들어둔 도시락 제공

결국 차이는 누가 요리하고 언제 준비하느냐의 문제였다.

## 그래서 Next.js가 좋은 이유

실제 서비스는 하나의 방식만 사용하지 않는다.

- 블로그 → SSG
- 상품 상세 → SSR
- 관리자 페이지 → CSR

페이지 특성에 따라 가장 적합한 렌더링 방식을 선택할 수 있다.

Next.js가 많은 사랑을 받는 이유도 여기에 있다고 생각한다.

## 마무리

CSR, SSR, SSG를 이해하기 위해 많은 글을 읽었지만 가장 기억에 남는 문장은 이것이었다.

> HTML을 누가, 언제 만드는가?

CSR은 브라우저가 만들고,

SSR은 서버가 요청 시점에 만들고,

SSG는 빌드 시점에 미리 만든다.

이 관점으로 이해하고 나니 복잡하게 느껴졌던 렌더링 방식들이 훨씬 쉽게 정리됐다.
