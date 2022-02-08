---

title: deep-curri-scrapy2
description: scrapy를 통한 웹크롤링을 다시 복습해보아요!
slug: deep-curri-scrapy2
img: not-yet-generated.png
datetime: 2021. 11. 22.
category: scrapy 
author: 김윤진

---



## 1. scrapy 설치 및 scrapy shell 사용 익히기

## 2. scrapy를 실행할 레포지토리 만들기

scrapy가 대략적으로 무엇이며 scrapy shell이 무슨 역할을 하는지 알아보았으니 본격적으로 scrapy 프로젝트를 만들어 봅시다!

예시는 앞에서도 사용한 [지마켓 베스트 주소](http://corners.gmarket.co.kr/Bestsellers)를 하겠습니다. 이 블로그 포스팅의 목적은 유난히 어려웠던 4주차 과제를 다시 톺아보면서 어느 부분에서 주의해야 하며 크롤링하는지 돌아보는 시간입니다. 

#### 1) scrapy 디렉토리 설정하기

프로젝트를 생성하기 위해서는 터미널에 **scrapy startproject 프로젝트 이름**을넣어주어야 합니다. 

이 때 주의할 점은 어느 디렉토리에 프로젝트를 생성할 지 설정하는 것입니다. 우선 자신이 프로젝트를 만들고 싶은 디렉토리 경로를 복사해주세요. 그리고 터미널에 **cd 디렉토리**를 입력해줍니다. 

![프로젝트 디렉토리 설정](/deep-curri-scrapy2/2.블로그_1.png)

저는 programming이라는 경로에 설정해주었답니다. 그럼 세번째 줄 마지막에 노란색으로 칠해진 것처럼 터미널의 디렉토리가 programming으로 바뀐 것을 알 수 있어요



#### 2) scrapy 프로젝트 시작하기

이제 터미널에 **scrapy startproject 프로젝트 이름**을 입력해서 본격적으로 프로젝트를 생성해보아요. 저는 프로젝트 이름을 **gg**로 하겠습니다.

![gg 프로젝트 생성](/deep-curri-scrapy2/2.블로그_2.png)

터미널에 잘 입력하고 실행하고나면, 앞서 설정했던 디렉토리에 **gg**라는 폴더가 생긴 것을 확인할 수 있습니다.

![gg 폴더](/deep-curri-scrapy2/2.블로그_3.png)

gg폴더 안에는 같은 이름의 소폴더가 또 존재하구요 그 안을 들여다 보면 웹크롤링을 하기 위해 다양한 설정을 할 수 있는 파일들이 존재합니다. 저희가 주로 살펴보아야 할 파일들을 노란색으로 정리해 놓았습니다. 

#### 3) 프로젝트에 사이트 연결하기

그럼 지금까지 scrapy project를 시작하는 법까지 배웠네요! 이제 본격적으로 **gg** 프로젝트 안에 [지마켓 베스트 주소](http://corners.gmarket.co.kr/Bestsellers)를 연결해서 크롤링할 웹사이트와 프로젝트를 연결해줍시다! 

우선 터미널에 **cd 프로젝트 디렉토리**를 입력해줍니다. 해당 디렉토리로 이동이 되었다면 터미널 창에 **scrapy genspider 프로젝트이름 "웹사이트주소"**를 입력해주세요. 저는 프로젝트 이름을 **gg_best**라고 했습니다. 그러니까 저 같은 경우는 아래 사진과 같이 **scrapy genspider gg_best "http://corners.gmarket.co.kr/Bestsellers"**가 되겠죠?

<img src="/deep-curri-scrapy2/2.블로그_4.png" alt="gg_best 만들기" style="zoom:50%;" />

그럼 다시 gg 디렉토리로 돌아가봅시다. 새롭게 gg_best.py가 생성되었어요!

<img src="/deep-curri-scrapy2/2.블로그_5.png" alt="gg_best.py 디렉토리" style="zoom:50%;" />

비쥬얼코드에서 gg_best.py를 열어서 확인해보겠습니다. 

<img src="/deep-curri-scrapy2/2.블로그_6.png" alt="gg_best.py" style="zoom:50%;" />

이전 scrapy genspider gg_best"http://corners.gmarket.co.kr/Bestsellers"을 입력하기 전에는 지마켓 베스트 웹사이트와 연결이 되어있지 않았지만 gg_best.py라는 항목을 실행시키고 생성해줌으로써 해당 웹사이트와 우리가 만든 프로젝트 레포지토리들이 연결되었습니다!

다음 포스팅에서는 웹 크롤링을 하기 위해 어떤 조건들을 살펴보아야 하며 어떻게 설정을 변환해 주어야 하는지 살펴보겠습니다!

## 3. crawling을 위한 각종 설정

## 4. scrapy crawling 결과를 csv로 저장하기



***
