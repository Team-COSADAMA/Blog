---

title: 바닐라 JS 챌린지 (Login, Clock, Quotes and Background)
description: 프론트엔트 스터디 TIL
slug: 2021-fw-frontend-02
img: not-yet-generated.png
datetime: 2021. 11. 10.
category: Frontend
author: 신혜린

---



### Login

---

#### 4.0 Input Values
- ##### 모든 코드는 html로부터 시작된다
html을 작성 후 html 내의 element들을 js로 불러오는 방식

- ##### `querySelector` 와 `getElementById`의 차이
`querySelector`로 id태그를 쓸 때에는 #을 사용하지만 `getElementById`는 #를 따로 사용하지 않아도 됨.

ex) 
```
const loginForm =document.getElementById("login-form");
const loginFrom =document.querySelector("#login-form");
```

둘의 코드는 동일함.

---
#### 4.1 Form Submission
- ##### form
<form></form>의 기본동작은 submit이기 때문에

``` html
<form class="login-form">
    <input>
    <button>Log In</button>
</form>
```

위 코드에서는 enter를 누를 때마다 form이 자동적으로 submit 되어 매번 페이지가 새로고침 된다.
우리는 여기서 페이지가 매번 새로고침 되지 않도록 username을 저장할 것임!


---
#### 4.2 & 4.3 Events
- ##### `preventDefault()`
`preventDefault()`의 역할은 event의 기본동작이 샐행되지 않게 막아주는 것.
특정 function에 대한 브라우저의 기본적인 동작을 막아주는 것이다. 이를 활용하여 enter를 누를 때마다 form이 자동적으로 submit되는 동작을 막아줄 수 있음.

```js
function submitButton(evnet) {
    event.preventDefault();
}
```

---
#### 4.4 Getting Username
```
"Hi " + userName === `Hi ${userName}`
```
- 둘 중 편한 방식으로 택해서 코딩하면 된다.
- 후자 방식으로 한다면 시작과 끝에 ` `` ` 백틱기호를 사용해주어야 하며, `${변수명}` 이어야 한다. 
- 개인적으로 `""` 안의 띄어쓰기까지 신경 써야 하는 전자보다 후자가 더 간편하다고 느꼈음


---
#### 4.5 Saving Username
- ##### localStorage.setItem()
()안에 저장될 값의 이름 `key`, 저장할 `value` 순으로 입력한다.
-> local storage 안에 key와 value 값이 저장된 것을 확인할 수 있음.


---
#### 4.6 Loading Username
- ##### 저장된 값에 대한 변수(savedUsername) 설정하기
 form에 `class="hidden"` 을 추가해서 숨길 요소와 표시할 요소를 택할 수 있게 해준다.
if-else를 활용하여 `hidden` 클래스를 숨기거나 나타나도록 조건을 생성한다.

---

### Clock

---
#### 5.0 Intervals
- ##### `setInterval()`
()안에는 실행하고자 하는 functionName과 호출되는 function 간격을 몇 miliseconds로 할지 입력한다.
-> 설정해준 milisecond마다 한 번씩 functionName의 function이 실행됨.

---
#### 5.1 Timeouts and Dates
- ##### `setTimeout()`
()안에는 실행하고자 하는 functionName과 실행된 function이 얼마나 기다릴지를 miliseconds로 입력한다.
-> 처음에 한 번만 일어날 function을 설정하는 것.

- ##### 시계 구현
```html
<h2 class="clock">00:00:00</h2>
```

입력 후 h2를 JS로 불러와서 `innerText` 값을 설정해준다

```js
function getclock() {
    const date = new Date();
    clock.innerText = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}
getClock();
setInterval(getClock, 1000);
```
화면에 시간이 가고 있는 시계를 "바로" 불러와주기 위해서 `getClock();` 값을 `SetInterval();` 값보다 먼저 입력하기!

---
#### 5.2 PadStart
- ##### 시계가 00:00:00 처럼 두 자리수를 유지하게 해주는 `padStart()`
() 안에 **string**에 요구되는 길이와 대체할 문자를 차례로 넣어준다.
`padStart()`는 **string**의 앞쪽에 글자수를 채워주는 function이기 때문에 **string**값으로 변경해줘야 정상적으로 작동함.
-> String()으로 값을 감싸줌으로써 **number**를 **string** 값으로 바꿔준다.

```js
function getClock() {
    const date = new Date();
    const Hours = String(date.getHours()).padStart(2,0);
}
```
이런 식으로 이어서 `Minutes`와 `Seconds` 변수도 설정해준 후에 `innerText` 까지 추가해서 function을 완성해주면 된다!



### Qutoes and Background

---
#### 6.0 Quotes
html에 다음과 같이 quote용 span과 author용 span을 `"quote"`라는 class 하나로 묶어준 후, js로 불러와서 사용할 것임.
```html
<div class="quote">
    <span></span>
    <span></span>
</div>
```

```js
const htmlQuote = document.querySelector(".quote span:first-child");
const htmlAuthor = document.querySelector(".quote span:second-child");
```

- `Math.random() * 숫자`: 입력한 '숫자'까지의 범위 내에서 랜덤한 숫자를 출력
- `Math.round()`: 숫자를 반올림해서 출력
- `Math.ceil()`: 숫자를 무조건 올림해서 출력 (ex. 4.1->5.0)
- `Math.floor()`: 숫자를 무조건 내림해서 출력(ex. 4.8->4.0)

위의 난수 생성용 함수를 활용하여 랜덤하게 격언이 출력되도록 새로운 변수명 `"todayQuotes"`를 생성
```js
const todayQuotes = quotes[Math.floor(Math.random() * quotes.length)]
```


---
#### 6.1 Background
- ##### img 출력
js에 `img` 변수를 생성하여 불러오고자 하는 이미지 파일명을 array로 배열해준다.
```js
const imgs = ["0.jpeg", "1.jpeg", "2.jpeg", "3.jpeg", "4.jpeg", "5.jpeg"] 
# 이미지 파일명과 동일해야 함
```
Quotes을 랜덤하게 불러오게 한 방식과 동일하게 사진도 랜덤하게 출력되도록 난수 함수를 활용해준다.
```js
const randomImg = imgs[Math.floor(Math.random() * imgs.length)];
```
