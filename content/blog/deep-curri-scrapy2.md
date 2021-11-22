---

title: deep-curri-scrapy2
description: scrapy를 통한 웹크롤링을 다시 복습해보아요!
slug: deep-curri-scrapy2
img: not-yet-generated.png
datetime: 2021.11.22
category: scrapy 
author: 김윤진

---



안녕하세요 여러분!
저는 지금까지 배웠던 scrapy를 정리하는 시간을 가져보려고 합니다. 

지금까지 삼 주동안 11번가 웹사이트의 상품들을 크롤링하는 작업을 했습니다.
저는 이 과정을 **네 단계**로 나누어 보려고 합니다. 
## 1. scrapy 설치 및 scrapy shell 사용 익히기

그럼 이번주는 우선 **1. scrapy 설치 및 scrapy shell 사용 익히기**에 대해서 알아보도록 하겠습니다. 
scrapy를 다운 받을 수 있는 웹사이트에서는 scrapy에 대해서 "Scrapy is a fast high-level web crawling and web scraping framework, used to crawl websites and extract structured data from their pages. It can be used for a wide range of purposes, from data mining to monitoring and automated testing."라고 설명하고 있습니다. 단순히 말해 웹 크롤링을 유용하게 할 수 있도록 돕는 프로그램이죠. 크롤링을 쉽게 하기 위해 scrapy를 설치해 봅시다!

***

#### 1) scrapy 설치

scrapy를 설치하는 방법은 여러가지입니다. 

- [scrapy 웹사이트](https://docs.scrapy.org/en/latest/)에서 다운로드 받을 수 있는 방법이 있습니다. 
- 더 쉽고 편리한 방법으로는 terminal을 사용하는 겁니다. 편리하게 터미널에 ```pip install scrapy```를 쳐주시면 됩니다. 

![scrapy 설치하기](/static/deep-curri-scrapy1/1.블로그_1.png)



#### 2) scrapy shell 사용 익히기

scrapy shell이 무엇인지 구글링해보면 "The Scrapy shell is **an interactive shell where you can try and debug your scraping code very quickly**, without having to run the spider"이라고 나옵니다.  즉, 페이지 전체를 크롤링하지 않고 원하는 명령어만 입력해주면 해당 부분에 대한 크롤링 데이터를 출력해줍니다. 때문에 한 페이지에서 여러가지를 한꺼번에 크롤링할 때 scrapy shell을 통해 한 명령씩 입력해보고 오류가 뜨지는 않는지, 제대로 실행되는지 확인해볼 수 있겠죠?

scrapy shell을 여는 방법은 terminal에 **scrapy shell "크롤링할 웹 주소"**를 입력하는 것입니다. 저는 저희가 4주차 과제로 했었던 [지마켓 베스트 상품 주소](http://corners.gmarket.co.kr/Bestsellers)로 예시를 들어보겠습니다. 



![scrapy shell 열기](/deep-curri-scrapy1/1.블로그_2.png)



짜잔! 아주 쉽게 원하는 웹사이트의 scrapy shell 창을 열 수 있습니다!



## 2. scrapy를 실행할 레포지토리 만들기

scrapy가 대략적으로 무엇이며 scrapy shell이 무슨 역할을 하는지 알아보았으니 본격적으로 scrapy 프로젝트를 만들어 봅시다!

예시는 앞에서도 사용한 [지마켓 베스트 주소](http://corners.gmarket.co.kr/Bestsellers)를 하겠습니다. 이 블로그 포스팅의 목적은 유난히 어려웠던 4주차 과제를 다시 톺아보면서 어느 부분에서 주의해야 하며 크롤링하는지 돌아보는 시간입니다. 

#### 1) scrapy 디렉토리 설정하기

프로젝트를 생성하기 위해서는 터미널에 **scrapy startproject 프로젝트 이름**을넣어주어야 합니다. 

이 때 주의할 점은 어느 디렉토리에 프로젝트를 생성할 지 설정하는 것입니다. 우선 자신이 프로젝트를 만들고 싶은 디렉토리 경로를 복사해주세요. 그리고 터미널에 **cd 디렉토리**를 입력해줍니다. 

![프로젝트 디렉토리 설정](/deep-curri-scrapy2/2.블로그_1.png)

저는 programming이라는 경로에 설정해주었답니다. 그럼 세번째 줄 마지막에 노란색으로 칠해진 것처럼 터미널의 디렉토리가 programming으로 바뀐 것을 알 수 있어요



#### 2) scrapy 프로젝트 시작하기

이제 터미널에 **scrapy startproject 프로젝트 이름**을 입력해서 본격적으로 프로젝트를 생성해보아요. 저는 프로젝트 이름을 **gg_best**로 하겠습니다.

![gg_best 프로젝트 생성](/deep-curri-scrapy2/2.블로그_2.png)

터미널에 잘 입력하고 실행하고나면, 앞서 설정했던 디렉토리에 **gg_best**라는 폴더가 생긴 것을 확인할 수 있습니다.

![gg_best 폴더](/deep-curri-scrapy2/2.블로그_3.png)

gg_best폴더 안에는 같은 이름의 소폴더가 또 존재하구요 그 안을 들여다 보면 웹크롤링을 하기 위해 다양한 설정을 할 수 있는 파일들이 존재합니다. 저희가 주로 살펴보아야 할 파일들을 노란색으로 정리해 놓았습니다. 



그럼 지금까지 scrapy project를 시작하는 법까지 배웠네요! 다음 포스팅에서는 웹 크롤링을 하기 위해 어떤 조건들을 살펴보아야 하며 어떻게 설정을 변환해 주어야 하는지 살펴보겠습니다!

## 3. crawling을 위한 각종 설정

## 4. scrapy crawling 결과를 csv로 저장하기



***
