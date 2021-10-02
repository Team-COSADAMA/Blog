---

title: [커리큘럼 심화] 쪼코 1차 블로그 포스팅

description: 쪼코 1차 블로그 포스팅, 1. scrapy 설치 및 scrapy shell 사용 익히기

slug: 1_deep_curriculumn

datetime: 2021. 10. 01.

category: Scrapy

author: 김윤진

---

안녕하세요 여러분!
저는 지금까지 배웠던 scrapy를 정리하는 시간을 가져보려고 합니다. 

지금까지 삼 주동안 11번가 웹사이트의 상품들을 크롤링하는 작업을 했습니다.
저는 이 과정을 **네 단계**로 나누어 보려고 합니다. 
***
### 1. scrapy 설치 및 scrapy shell 사용 익히기
### 2. scrapy를 실행할 레포지토리 만들기
### 3. crawling을 위한 각종 설정
### 4. scrapy crawling 결과를 csv로 저장하기
***
## scrapy 설치 및 scrapy shell 사용 익히기

그럼 이번주는 우선 **1. scrapy 설치 및 scrapy shell 사용 익히기**에 대해서 알아보도록 하겠습니다. 
scrapy를 다운 받을 수 있는 웹사이트에서는 scrapy에 대해서 "Scrapy is a fast high-level web crawling and web scraping framework, used to crawl websites and extract structured data from their pages. It can be used for a wide range of purposes, from data mining to monitoring and automated testing."라고 설명하고 있습니다. 단순히 말해, 웹 크롤링을 유용하게 할 수 있도록 돕는 프로그램이죠. 크롤링을 쉽게 하기 위해 scrapy를 설치해 봅시다!
***
#### 1) scrapy 설치
scrapy를 설치하는 방법은 여러가지입니다. 
- [scrapy 웹사이트](https://docs.scrapy.org/en/latest/)에서 다운로드 받을 수 있는 방법이 있습니다. 
- 더 쉽고 편리한 방법으로는 terminal을 사용하는 겁니다. 편리하게 터미널에 ```pip install scrapy```를 쳐주시면 됩니다. 
*** 
#### 2) scrapy shell 사용 익히기
scrapy 웹사이트에서는 scrapy shell에 대해서 "The Scrapy shell is an interactive shell where you can try and debug your scraping code very quickly, without having to run the spider. It’s meant to be used for testing data extraction code, but you can actually use it for testing any kind of code as it is also a regular Python shell. The shell is used for testing XPath or CSS expressions and see how they work and what data they extract from the web pages you’re trying to scrape. It allows you to interactively test your expressions while you’re writing your spider, without having to run the spider to test every change. Once you get familiarized with the Scrapy shell, you’ll see that it’s an invaluable tool for developing and debugging your spiders."이라고 말하고 있습니다. 쉽게 말해, 한 단위 단위의 크롤링이 잘 되고 있는지 확인할 수 있는 **빠른 경로**입니다. 
scrapy shell을 여는 방법은 간단합니다. 바로 터미널 창에 ```scrapy shell```이라고 입력하면 바로 scrapy shell이 실행됩니다!
다만 특정 웹사이트를 crawling하기 위해서는 ```scrapy shell "웹사이트 주소"```를 입력해주어야만 합니다. 
***
#### 3) 다양한 문법 
scrapy shell에는 css 혹은 xpath를 이용한 다양한 문법이 있습니다. 가장 많이 쓰이는 것은 text를 가져오는 것입니다. 
css같은 경우 ```response.css"css selector::text"```라고 입력하면 해당하는 값의 텍스트만 출력됩니다. 

---
이상으로 오늘은 간단히 scrapy의 기초 설명에 초점을 맞추어 설명해봤습니다. 
모두들 scrapy 왕이 되시길 바라요~~
