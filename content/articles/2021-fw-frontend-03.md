---

title: 바닐라 JS 챌린지 (ToDo list, Weather)
description: 프론트엔트 스터디 TIL
slug: 2021-fw-frontend-03
img: not-yet-generated.png
datetime: 2021. 11. 10.
category: Frontend
author: 신혜린

---



### To Do List

---
#### 7.0 Setup
- ##### html에 class 추가해주기
```html
<form class="todo-form">
    <input type="text" placeholder="blablabla">
</form>

<ul class="todo-list"></ul>
```

---
#### 7.1 Adding ToDos
- ##### `function submitToDoForm(event)`
submit의 기본동작인 새로고침을 방지하기 위해 `.preventDefault()` 적용할 것.

form에 입력한 값`(toDoInput.value)`을 `newToDo` 변수명으로 지정해준다.

그 후 입력창을 다시 공란으로 만들기 위해 `input.value="";`을 적용해준다.

`paintToDo` function은 ToDo 리스트를 만들어주는 함수명이며, 이를 실행시키는 트리거는 `newToDo`로 지정해준다.

```js
function submitToDoForm(event) {
    event.preventDefault();
    const newToDo = toDoInput.value;
    paintToDo(newToDo);
}
toDoForm.addEventListener("submit", submitToDoForm)
```

- ##### `function paintToDo(newToDo)`
앞서 html에 생성해준 `ul class="todo-list` 안에 `li`, `span`, `button` 태그를 생성해준다.

```js
const tagLi = document.createElement("li");
```

```js
const tagSpan = document.createElement("span");
tagSpan.innerText = newToDo;
# span의 innerText에 입력값인 newToDo를 넣어준다.
```

```js
const tagBtn = documnet.createElement("button");
tagBtn.innerText = "X";
# span의 innerText에 "X"를 넣어준다.
tagBtn.addEventListener("click", deleteToDo);
```

---
#### 7.2 Deleting ToDos
- ##### `function deleteToDo(event)`
`console.log(event)`를 출력하면 clock event의 다양한 property를 확인해볼 수 있다.
그 중 `target`을 보면 click event의 target은 `button`이라는 것을 알 수 있다.
또한 부모요소가 `li`라는 것도 확인할 수 있다.

```js
function deleteToDo(event) {
    const tagLi = event.target.parentElement;
    #버튼(=target)의 부모요소, 즉 Li를 뜻함
    tagLi.remove();
}
```

---
#### 7.3 Saving ToDos
- ##### `function submitToDoForm()`

새로고침 할 때마다 ToDo list가 초기화되는 문제 개선하기

toDo 리스트를 저장해줄 array 생성
```js
const toDos = [];
```
그 후, **localStorage**로 저장해 줄 toDos array 값을 저장해준다.
```js
function saveToDos() {
    localStorage.setItem("To-Do", toDos);
    #localStorage에 toDos array를 저장해주는 역할
}
```


---
#### 7.4~7.5 Loading ToDos
- ##### `JSON.parse()`
괄호 안의 string을 자바스크립트가 이해할 수 있는 array의 형태로 바꿔준다.

- ##### `let toDos = [];`
`let toDos = [];`를 생성함으로써 새로운 입력값을 추가해주더라도 기존의 값을 보존할 수 있도록 해준다.



---
#### 7.6~7.8 Deleting ToDos
- ##### `Date.now()`
object 형태의 `newToDo` 변수 생성
```js
const newToDo0jt = {
    text: newToDo,
    id: Date.now(),
}
toDos.push(newToDo0jt);
```
위의 함수를 활용하여 특정 id를 가진 항목을 localStorage에 저장해줄 수 있음.
여기서 id는 `Date.now()` 함수를 통해 생성됨.

- ##### `filter()`
() 안에 들어가는 function은 항상 true만을 return해준다.
만약 false에 해당되는 item이 있다면 그 item은 제외된다.
-> 이를 활용하여 특정 item을 제외한 새로운 array를 생성할 수 있다.

ex.
```js
const fruit = ["사과","수박","바나나"]
fruit.filter(item => item !== "바나나")
```
위의 결과는 `item !== "바나나"` 조건으로 인해 false가 된 `"바나나"`를 제외한 array가 새로 출력된다.
```js
['사과','수박']
```




### Weather

---
#### 8.0 Geolocation
- ##### `navigator.geolocation.getCurrentPosition()`

성공시 `functionName: onGeoOK()`
실패시 `functionName: onGeoError()`

-> 위치 정보를 허용해주면 console창에서 경도와 위도 정보를 불러올 수도 있다.

```js
function onGeoOk(position) {
    const lag = position.coords.latitude;
    const lng = position.coords.longitude;
    console.log("you live in", lat, lng);
}
```

---
#### 8.1 Weather API
> [날씨 API 사이트](https://openweathermap.org/)

위 사이트에 들어가 "Current Weather Data"의 "API doc"을 클릭 후 나타나는 링크를 복사해서 코드창에 붙여넣기.

```
api.poenweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API Key}
```

`{lag}`, `{lon}`, `{API Key}` 에 해당되는 변수명을 각각 넣어준다.
그 후 해당되는 url를 `function onGeoOk(position)`에 추가해준다.

```js
const url = 'https://api.openweathermap~~~';
```

- ##### `fetch()`
`fetch(url)`을 해줌으로써 data를 받아와 network창을 가져와준다.

```js
fetch(url).then(response => response.json());
```
받아온 data를 화면에 표시하기 위해서는 html과 innerText를 활용해주면 됨!