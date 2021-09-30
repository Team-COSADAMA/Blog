---

title: 바닐라 JS 기초 스터디
description: 프론트엔트 스터디 첫번째 포스팅
slug: 2021-fw-frontend-01
img: not-yet-generated.png
datetime: 2021. 09. 30.
category: Frontend
author: 신윤진

---



### 🍌 Introduction

---

#### 1.1 What Are We Building

---

> [클론코딩: Momentum Dash](https://momentumdash.com/)

- 로그인 > 사용자를 기억하는 법
- 시계
- Geolocation > 사용자 위치 + 날씨
- 무작위 배경사진 / 명언
- To do list > 체크리스트 등  



#### 1.2 Requirements

---

- HTML/CSS 기본 지식
  - HTML > head, body, form, input, button...
  - CSS > id/class 차이점, selector...  



#### 1.3 Software Requirement

---

- 브라우저 > **Do not use Internet explorer**

  - chrome, brave, safari, 네이버 웨일 등

  - 크로미움 기반 브라우저 추천 > 최신 기능들이 적용되기 때문

    - **크로미움(Chromium)이란?**

      크로미움이라는 오픈소스 프로젝트에서 만든 브라우저 이름

      크로미움 소스 코드 기반 브라우저: chrome, brave, opera, 네이버 웨일 등

      - [[위키백과] 크로미엄 (웹 브라우저)](https://ko.wikipedia.org/wiki/%ED%81%AC%EB%A1%9C%EB%AF%B8%EC%97%84_(%EC%9B%B9_%EB%B8%8C%EB%9D%BC%EC%9A%B0%EC%A0%80))
- [[모두의 근삼이] 크로미움? 크롬? 무슨차이일까](https://ykarma1996.tistory.com/72)  



- 텍스트 에디터
  - VS code 추천  



#### 1.4 Why JS

---

- 짱짱한 미래 보장 > 웹 전체를 아우르는 유일한 프로그래밍 언어
- 브라우저에 내장되어 나옴 > 설치할 필요 X
- 어떤 사람에게는 불행이다 > **프론트엔드에서 쓸 수 있는 유일한 언어** > 다른 선택지  X  



- 1995년 12월 Brendan Eich가 10일만에 개발
  - 넷스케이프 사이트를 more interactive하게 만들기 위해 탄생
- 인터넷 붐 > 새로운 프로그래밍 언어를 개발해 웹 사이트를 망가뜨리기 보다는 계속 JS를 사용
  - 프랑켄슈타인 같은 언어가 됨 > 고치고 패치하고 반복  



- [three.js](https://threejs.org/) > 3D 구현

- [React Native](https://reactnative.dev/) > JS로 안드로이드, iOS 앱 개발 가능
- [Electron](https://www.electronjs.org/) > 데스크탑 앱
- [socket.io](https://socket.io/) > 실시간 기능
- [ml5.js](https://ml5js.org/) > 머신러닝 모델 생성 및 훈련  



- 3D/실시간으로 무언가를 하고 싶다면 👍
- 프론트/백엔드 모두 가능 👍👍  



### 🍌 WELCOME TO JAVASCRIPT

---

#### 2.0 Your First JS Project

---

**[개요]**

- JS 프로젝트 입문
- HMTL - JS 연결하는 법  



**[요약]**

- 마우스 우클릭 > 검사(inspect) > console 창

- HTML은 CSS와 JS를 연결하는 접착제

  - 브라우저에서 여는 것은 HTML 파일

  - HTML 파일은 CSS와 JS를 불러온다.

    ```html
    <head>
        <link rel="stylesheet" href="style.css">
    </head>
    
    <!-- JS는 보통 끝에서 불러옴 -->
    <body>
        <script src="app.js"></script>
    </body>
    ```

  

#### 2.1 Basic Data Types

---

- 프로그래밍에 있어 가장 기본적인 데이터 타입

  - **숫자형(integer)**

    ```javascript
    // 정수형
    2+2
    
    // 실수형
    2.5 + 2.5
    ```

  - **문자형(string)**

    ```javascript
    "welcome"
    ```


  

#### 2.2 Variables

---

```javascript
// 입력받은 값은 콘솔 창에 log or print
console.log(20210921);
console.log('hahaha');
```

- 변수명 작성법
  - camelCase
    - JS에서의 작성법
    - 띄어쓰기 대신 대문자
  - snake_case
    - python에서의 작성법
    - 띄어쓰기 대신 _(언더바)

  

#### 2.3 const and let

---

- 코더의 의도를 알 수 있다.

  - `const`: 바뀌지 않는 값 > 변경하지 않을거야!

    ```javascript
    const a = 1;
    const b = 3;
    ```

  - `let`: 새로운 것을 생성할 때 사용 > 추후 변경(업데이트)할 가능성이 있어!

    ```javascript
    let myName = 'jini'
    
    myName = 'jinyyy'     // let을 쓰지 않아도 됨
    console.log('my name is ' + myName)
    ```


  

- 코더의 의도를 알 수 있음

  - always `const`
  - sometimes `let`
  - never `var` > 의도를 알 수 없고, 언어의 보호를 받지 못함  



#### 2.4 Booleans

---

- `true` / `false`

  ```javascript
  const amIHungry = true;     // 소문자 주의
  const amIHungry = false;
  ```

- `null`

  - 변수에 아무것도 없음

  - '비어있음'을 의도적으로 표현

    ```javascript
    const amIHungry = null;
    ```

- `undefined`

  - 메모리에 변수가 생성됐지만, <u>값이 존재하지 않음</u>

    ```javascript
    let something;
    let something = undefined;
    console.log(something)     // undefined
    ```


  

#### 2.5 Arrays

---

- 기본적인 데이터 구조 > 데이터를 나열할때 사용

- 하나의 변수에 **리스트**를 할당 > 모든 값이 같은 의미를 갖는다.

  ```javascript
  const daysOfWeek = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
  
  // Get Item from Array
  console.log(daysOfWeek[0]);     // 0부터 계산
  
  // Add one more day to the array > push
  daysOfWeek.push('sun');
  console.log(daysOfWeek); 
  ```


  

#### 2.6 Objects

---

- 하나의 변수에 **속성(property)**를 가진 데이터를 저장

- 속성을 변경하는 것은 가능, but 객체 자체를 바꾸는 것을 불가능하다.

  ```javascript
  // 만들기
  const player = {
      name: 'jini',
      points: 20210921,
      nice: true,
  };
  
  // 불러오기
  console.log(player.name);
  console.log(player['name']);
  
  // 업데이트
  player.nice = false
  player.points = player.points + 13
  console.log(player.nice)
  
  // 추가
  player.nickname = 'apple'
  console.log(player);     // nickname 속성 추가됨
  ```

  

#### 2.7 Functions

---

- **Function(함수)**

  - 반복해서 사용할 수 있는 코드 조각

  - 어떤 코드를 캡슐화 > 여러 번 실행하는 것이 가능

    ```javascript
    // 함수 생성
    function 함수이름(){
        console.log("Hello, I am function!");
    }
    
    // 함수 실행
    함수이름();
    ```

- **argument(매개변수)**

  - 함수를 실행하는 동안, 함수에 정보(값/데이터)를 보내는 방법

  - 매개변수는 함수 내에서만 존재한다.

  - 이름은 중요하지 않다. 중요한 것은 <u>매개변수의 순서</u>이다! 

    ```javascript
    // 함수가 정보를 받는 방법
    function 함수이름(매개변수1, 매개변수2){
        console.log();
    }
                    
    // 함수 실행
    함수이름(매개변수1, 매개변수2);
    ```


  

- **예1**: 계산기 만들기

  ```javascript
  function plus(a, b){
      console.log(a + b);
  }
  
  plus();        // NaN(Not a Number)
  plus(9, 24);   // 33
  ```

  ```javascript
  function divide(a, b){
      console.log(a / b)
  }
  
  divide(24, 3);   // 8
  ```

  

- **예2**: 객체 내 함수 생성

  ```javascript
  const player = {
      name : 'jini',
      niceToMeetYou: function(nickname) {
          console.log('Nice to meet you ' + nickname);
      },
  };
  
  player.niceToMeetYou('jini');   // Nice to meet you jini
  ```

  - `Uncaught SyntaxError: Invalid shorthand property initializer`

    : 변수 생성 시, `:`대신 `=`을 사용한 경우 발생하는 오류


  

#### 2.11 Returns 

---

- 함수가 작업한 결과(반환값)를 호출하고 싶을 때 사용

- 함수의 작업은 `return`까지만 수행된다. 즉, 함수는 `return`에서 종료된다.

  ```javascript
  const age = 925
  
  function calculateKrAge(age){
      return age + 2;
  }
  
  const KrAge = calculateKrAge(age)
  console.log(KrAge)   // 927
  ```


  

#### 2.13 Conditionals

---

- type 변경하는 법

  ```javascript
  const age = prompt("How old are you?");
  
  // string > number
  console.log(age, parseInt(age));   // string number
  ```


  

- **Conditional(조건문)** 

  - 조건문은 boolean(true/false)로 판별 가능해야 된다.

    ```javascript
    if(condition){
        // condition === true
    } else if {
        // condition === false
    } else {
        // else는 선택사항
    }
    ```

    ```javascript
    const age = prompt("How old are you?");
    
    // isNaN: 변수가 NaN인지 판별(boolean)
    if(isNaN(age)){
        console.log('Plz write a number');
    } else {
        console.log('Well done');
    }
    ```

  
    
  
  - `&&`: AND 연산자(조건 2개가 <u>모두 true</u>)
  
    |       조건       |   결과   |
    | :--------------: | :------: |
    | **true && true** | **true** |
    |  true && false   |  false   |
    |  false && true   |  false   |
    |  false && false  |  false   |
  
  - `||`: OR 연산자(조건 1개만 true)
  
    |       조건       | 결과  |
    | :--------------: | :---: |
    |  true \|\| true  | true  |
    | true \|\| false  | true  |
    | false \|\| true  | true  |
    | false \|\| false | false |
  
    - **예:** 연산자 사용 조건문
  
      ```javascript
      const age = prompt("How old are you?");
      
      if(isNaN(age) || age < 0){
      console.log('Plz write a real positive number');
      } else if(age < 18) {
      console.log('You are minors');
      } else if(age >= 18 && age <= 50) {
      console.log('You can go')
      } else {
      console.log("You'd be better to go back");
      }
      ```

  

##### +) 동등 연산자와 일치 연산자

- [[TCP School] 비교 연산자](http://tcpschool.com/javascript/js_operator_comparison)
  - **동등 연산자**(`==`, equal)
    - 오직 value만 비교
  - **일치 연산자**( `===`, strict equal)
    - value + data type 비교
    - JS에서만 사용

  

### 🍌 JAVASCRIPT ON THE BROWSER

---

#### 3.0 The Document Object

---

- **document**

  - 브라우저에 이미 존재하는 객체(object) 

  - 모든 것의 시작점; web site를 의미

      

  - 우리가 접근할 수 있는 HTML을 JS의 관점으로 보여준다.

    즉, <u>HTML과 JS가 이미 연결되어 있다</u>는 것을 알 수 있음!

    - JS에서 HTML 읽기, 변경 모두 가능

  

#### 3.1 HTML in Javascript

---

- `getElementById('id 명')`: id를 통해 HTML에서 element를 찾아준다.

  ```javascript
  document.getElementById('title');
  ```

  

- HTML에서 항목을 가져와 JS를 통해 항목을 변경 > 어떤 HTML element든 가져와 변경 가능
  - 이유: server - client 통신은 HTML이 아닌, JS를 통해 이루어지기 때문

  

#### 3.2 Searching For Elements

---

- `getElementByClassName('class 명')`: class를 통해 HTML에서 element를 검색 
- `getElementsByClassName('class 명')`: class를 통해 HTML에서 element들을 검색 > array로 반환
- `getElementByTagName('tag 명')`

  

- `querySelector()`: css 방식으로 element를 검색

  ```javascript
  // <h1 class='title'></h1>
  document.querySelector('.title h1')
  ```

- `querySelectorAll()`: css 방식으로 element들을 검색 > array로 반환

  ```javascript
  // <h1 class='title'></h1>
  document.querySelectoAll('.title h1')
  ```

  

#### 3.3 Events

---

- JS는 모든 event를 listen할 수 있다.
- event 찾는 법
  - Web APIs: JS 관점의 HTML Element
  - `console.dir(element)` 중 on이 붙은 속성 > event listener

  

1. **click event**

   ```javascript
   // element 찾기
   const title = document.querySelector('.title h1')
   
   // event 발생 시, 동작하기 원하는 함수
   function handleTitleClick() {
       console.log('Title was clicked!');
   }
   
   // event(click) 발생 시, JS에게 함수 실행을 요청
   title.addEventListener('click', handleTitleClick);
   ```

     

2. **mouse enter / leave**

   ```javascript
   // mouse enter
   function handleMouseEnter() {
       title.innerText = 'Mouse is here!';
   }
   
   // mouse leave
   function handleMouseLeave() {
       title.innerText = 'Mouse is gone!';
   }
   
   // JS에 함수 실행 지시
   title.addEventListener('mouseenter', handleMouseEnter);
   title.onmouseleave = handleMouseLeave;   // () 붙여서 실행하지 않도록 주의!
   ```

     

3. **window event**

   - `window`는 JS가 기본적으로 제공한다.

   ```javascript
   // window size
   function handleWindowResize() {
       document.body.style.backgroundColor = 'tomato';
   }
   
   window.addEventListener('resize', handleWindowResize)
   
   // window copy
   function handleWindowCopy() {
       alert('Do not copy');
   }
   
   window.addEventListener('copy', handleWindowCopy);
   ```

   - [[TCP School] Window 객체 - 브라우저 객체 모델(BOM)](http://tcpschool.com/javascript/js_bom_window)
   - [[TCP School] DOM의 개념 - 문서 객체 모델(DOM)](http://tcpschool.com/javascript/js_dom_concept)

  

- document의 body/head/title은 중요하기 때문에 아래 처럼 가져오는 것이 가능

  예) `documnet.body`

- div, h1 등의 element의 경우에는 `querySelector` 혹은 `getElementById`으로 호출

  

#### 3.6 CSS in Javascript

---

**[방식 1]**

```javascript
function handleTitleClick() {
    if (h1.style.color === 'blue') {
        h1.style.color = 'tomato';
    } else {
        h1.style.color = 'blue';
    }
}
```

  

**[방식 2]**

```javascript
function handleTitleClick() {
    const firstColor = h1.style.color;
    let lastColor;
    if (firstColor === 'blue') {
        lastColor = 'tomato';
    } else {
        lastColor = 'blue';
    }
    h1.style.color = lastColor;
}
```

  

#### 3.7 CSS in Javascript part Two

---

- style 작업에 적합한 도구 > css
- animation 작업에 적합한 도구 > JS

  

**[css 파일]**

```css
h1 {
    color: blue;
}

.active {
    color: tomato;
}
```

  

**[JS 파일]**

- **1단계**

  ```javascript
  function handleTitleClick() {
      if(h1.className === 'active') {
          h1.className ='';
      } else {
          h1.className = 'active';
      }
  }
  
  h1.addEventListener('click', handleTitleClick);
  ```

- **2단계 **

  - 코드 개선 > error 발생 가능성 감소

  ```javascript
  function handleTitleClick() {
      const activeClass = 'active';
      if(h1.className === activeClass) {
          h1.className ='';
      } else {
          h1.className = activeClass;
      }
  }
  
  h1.addEventListener('click', handleTitleClick);
  ```

  

- **3단계**

  - `classList`

    - class들의 목록으로 작업하는 것이 가능

    ```javascript
    function handleTitleClick() {
        const activeClass = 'active';
        if(h1.classList.contains(activeClass)) {
            h1.classList.remove(activeClass);
        } else {
            h1.classList.add(activeClass);
        }
    }
    
    h1.addEventListener('click', handleTitleClick);
    ```

  

- **4단계**

  - `toggle()`

    - classList에 해당 class가 있는지 확인
      - 있다 > 제거
      - 없다 > 추가

    ```javascript
    function handleTitleClick() {
        h1.classList.toggle('active');
    }
    
    h1.addEventListener('click', handleTitleClick);
    ```

  

