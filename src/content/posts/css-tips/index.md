---
title: "한 줄로 좋아지는 CSS: aspect-ratio, text-wrap, scroll-margin"
description: "예전에는 직접 계산하거나 JavaScript로 해결했던 것들이 이제는 CSS 한 줄로 가능해졌다. 최근 자주 사용하는 CSS 속성들을 정리했다."
date: "2024-02-20"
tags: ["CSS", "Frontend", "UI", "Web"]
---

# 한 줄로 좋아지는 CSS: aspect-ratio, text-wrap, scroll-margin

CSS는 꽤 빠르게 발전하고 있다.

몇 년 전만 해도 JavaScript로 해결하던 문제들이 이제는 CSS만으로 해결되는 경우가 많다.

최근 프로젝트를 진행하면서 자주 사용했던 CSS 속성들을 정리해보려고 한다.

화려한 기능은 아니지만 한 번 익혀두면 생각보다 자주 쓰게 된다.

## 1. aspect-ratio

예전에는 이미지 비율을 유지하기 위해 꽤 번거로운 방법을 사용했다.

```css
.thumbnail {
  position: relative;
  padding-top: 56.25%;
}
```

16:9 비율을 만들기 위해 계산해야 했고 내부 요소도 절대 위치로 배치해야 했다.

지금은 훨씬 간단하다.

```css
.thumbnail {
  aspect-ratio: 16 / 9;
}
```

끝이다.

이미지 카드나 썸네일을 만들 때 거의 필수적으로 사용하고 있다.

특히 이미지 로딩 전에도 공간을 미리 확보할 수 있어서 Layout Shift를 줄이는 데도 도움이 된다.

```css
img {
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
}
```

프로필 이미지 같은 경우에도 자주 사용한다.

---

## 2. text-wrap: balance

생각보다 만족도가 높았던 속성이다.

제목이 두 줄로 떨어질 때 가끔 어색한 경우가 있다.

```text
좋은 인터랙션은 설명하기 어렵지만
느껴진다
```

혹은

```text
좋은 인터랙션은 설명하기
어렵지만 느껴진다
```

두 번째가 훨씬 자연스럽다.

최근 브라우저들은 이를 자동으로 처리해주는 기능을 제공한다.

```css
h1 {
  text-wrap: balance;
}
```

특히 블로그 제목이나 카드 타이틀에 적용하면 꽤 보기 좋아진다.

요즘 개인적으로 가장 만족하는 CSS 속성 중 하나다.

---

## 3. scroll-margin

앵커 링크를 사용할 때 자주 만나는 문제다.

```html
<a href="#section">이동</a>
```

```html
<section id="section"></section>
```

헤더가 fixed 상태라면 이동 후 제목이 가려진다.

예전에는 JavaScript로 위치를 계산했다.

지금은 CSS 한 줄이면 된다.

```css
section {
  scroll-margin-top: 80px;
}
```

고정 헤더가 있는 블로그나 문서 사이트에서 특히 유용하다.

생각보다 많이 알려지지 않았는데 만족도가 높다.

---

## 4. :has()

최근 CSS에서 가장 혁신적인 기능 중 하나라고 생각한다.

부모 요소를 선택할 수 있게 됐다.

예전에는 이런 작업을 하려면 JavaScript가 필요했다.

```html
<div class="card">
  <img />
</div>
```

```css
.card:has(img) {
  padding: 0;
}
```

특정 자식 요소 존재 여부에 따라 스타일을 변경할 수 있다.

예를 들어 에러 메시지가 존재할 때만 스타일을 변경하는 것도 가능하다.

```css
.form-group:has(.error) {
  border-color: red;
}
```

처음 나왔을 때는 브라우저 지원 때문에 조심스러웠는데 이제는 실무에서도 사용할 수 있는 수준이 됐다.

---

## 5. content-visibility

성능 최적화를 할 때 가끔 사용한다.

긴 페이지에서는 화면 밖의 요소까지 모두 렌더링된다.

```css
.section {
  content-visibility: auto;
}
```

브라우저가 화면에 보이는 시점에 렌더링하도록 최적화한다.

특히 문서 페이지나 콘텐츠가 많은 화면에서 효과가 있었다.

다만 모든 곳에 적용하기보다는 실제로 성능 문제가 있는 경우에만 사용하는 편이다.

---

## 6. container query

반응형 디자인에서 가장 기대했던 기능이다.

기존 미디어 쿼리는 화면 크기를 기준으로 동작했다.

```css
@media (max-width: 768px) {
}
```

하지만 컴포넌트 입장에서는 화면보다 부모의 크기가 더 중요할 때가 많다.

```css
.card-container {
  container-type: inline-size;
}
```

```css
@container (max-width: 400px) {
  .card {
    flex-direction: column;
  }
}
```

이제 컴포넌트 스스로 반응형 동작을 결정할 수 있다.

디자인 시스템을 운영할수록 더욱 유용하게 느껴진다.

---

## CSS가 좋아지는 방향

최근 CSS를 보면 공통적인 흐름이 보인다.

예전에는

- JavaScript로 계산하고
- 이벤트를 등록하고
- DOM을 직접 수정하던

문제들이 점점 CSS 영역으로 이동하고 있다.

aspect-ratio,
:has(),
container query 같은 기능들이 대표적이다.

덕분에 코드도 단순해지고 브라우저가 더 많은 일을 대신 처리하게 됐다.

---

## 마무리

프론트엔드 개발을 하다 보면 새로운 프레임워크나 라이브러리에 관심이 많이 간다.

하지만 의외로 생산성을 가장 많이 올려주는 것은 CSS의 작은 변화인 경우가 많다.

최근 몇 년 동안 CSS는 정말 빠르게 발전하고 있다.

가끔 MDN이나 CSS 업데이트 내용을 살펴보면

"이게 이제 CSS로 된다고?"

싶은 기능을 발견하게 된다.

생각보다 많은 문제는 새로운 라이브러리가 아니라 이미 브라우저가 제공하는 기능으로 해결할 수 있다.
