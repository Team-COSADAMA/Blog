---

title: 왜 Typescript를 써야할까?
description: 프론트엔드 스터디 타입스크립트 기초편
slug: 2021-fw-frontend-05
category: Frontend
author: 신윤진
---



### 2. 왜 타입스크립트를 써야할까?

---

> [[타입스크립트 핸드북] Why TypeScript?](https://joshua1988.github.io/ts/why-ts.html#%ED%83%80%EC%9E%85%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%EB%9E%80)

#### 1) 타입스크립트란?

- 자바스크립트에 타입을 부여한 언어; 자바스크립트의 확장된 언어
- 컴파일(compile) 과정(브라우저에서 실행하기 위해 파일은 변환하는 것)이 필요

<br>

#### 2) 왜 타입스크립트를 써야할까요?

- 아래 2가지 관점에서 <u>자바스크립트 코드의 품질과 개발 생산성</u>을 높일 수 있기 때문에!

##### (1) 에러의 사전 방지

- 의도하지 않은 코드의 동작을 예방할 수 있다.

```javascript
// math.js
function sum(a, b) {
  return a + b;
}

// 올바른 작업
sum(11, 11);       // 22

// 잘못된 작업
sum('11', '11');   // 1111
```

```typescript
// math.ts
function sum(a: number, b: number) {
  return a + b;

// 올바른 작업
sum(11, 11);       // 22

// 잘못된 작업
sum('11', '11');   // Error: '11'은 number에 할당될 수 없습니다.
```

<br>

##### (2) 코드 자동 완성과 가이드

- 코드 작성 시, 개발 툴의 기능을 최대로 활용할 수 있다.

  - VS Code: 툴의 내부가 타입스크립트로 작성되어 있어, 타입스크립트 개발에 최적화

  <br>

- **자바스크립트 코드의 경우**

  - 코드 작성 시, `total` 변수의 타입(`number`)을 자바스크립트가 인지하지 못함
  - 즉, 개발자가 `sum()`함수의 결과를 예상해, `number`의 API인 `toLocaleString()`을 일.일.이. 코딩 ← 오타 발생 가능성

  ```javascript
  // math.js
  function sum(a, b) {
    return a + b;
  }
  var total = sum(10, 20);
  total.toLocaleString();
  ```

  <br>

- **타입스크립트 코드의 경우**

  - `total` 변수의 타입이 지정되어, 해당 타입의 API를 빠르고 정확하게 코딩 가능

  ```typescript
  function sum(a: number, b: number): number {
    return a + b;
  }
  var total = sum(10, 20);
  total.toLocaleString();

<br>
