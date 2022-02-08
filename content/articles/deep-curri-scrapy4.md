---

title: deep-curri-scrapy4
description: scrapy를 통한 웹크롤링을 다시 복습해보아요!
slug: deep-curri-scrapy4
category: scrapy 
author: 김윤진

---

## 1. scrapy 설치 및 scrapy shell 사용 익히기

## 2. scrapy를 실행할 레포지토리 만들기

## 3. crawling을 위한 각종 설정

## 4. scrapy crawling 결과를 csv로 저장하기

scrapy crawling의 마지막 포스팅이에요!!

지난번 **crawling을 위한 각종 설정** 포스팅이 너무 길어서 힘들었죠? 하지만 핵심은 css경로를 활용하는 점이라는 걸 짚고나서 scrapy crawling의 마지막 포스팅인 **scrapy crawling 결과를 csv로 저장하기**로 넘어가겠습니다.



우선 vs code의 화면을 볼까요? 

<img src="/deep-curri-scrapy4/4.블로그_1.png" style="zoom:50%;" />

저희가 설정해주었던 **pipelines.py, settings.py, items.py, 그리고 gg_best.py**까지 잘 열어 둡시다. 



#### 1) scrapy shell 사용하기

* 잠깐, 저희가 csv파일로 본격적으로 저장하기 전에 해야 할 일이 있어요. 

바로 1주차 때 배웠던 **scrapy shell**을 활용하는 건데요, csv파일로 저장하려면 한꺼번에 많은 데이터를 불러오느라 많은 시간이 소요되고 그만큼 오류가 날 확률도 높습니다. 그렇지만 정확히 어디서 오류가 났는지 확인하기도 매우 어렵습니다. 한꺼번에 많은 데이터를 크롤링하는 거니까요. 그래서 사용하는 것이 scrapy shell입니다. scrapy shell을 통해 하나하나 css문법을 넣어주어서 크롤링이 잘 되고 있는지, 오류가 나는 부분은 없는지 미리 사전에 체크해줍시다! 

혹시 잊으신 분들을 위해,

<img src="/deep-curri-scrapy4/4.블로그_2.png" style="zoom:50%;" />

scrapy shell을 여는 방법은 **terminal**에 **scrapy shell "접속하고자하는 웹사이트주소"**를 입력하면 됐었습니다. 저희는 지마켓베스트 웹사이트니까 "http://corners.gmarket.co.kr/Bestsellers" 이 주소를 넣어주면 되겠죠?

그러면 맨 아래처럼 **In [1] :**이라고 터미널에 뜰거예요. 바로 이 곳에, **gg_best.py**에 있는 아무 크롤링 명령어나 입력시켜주어 봅시다. 

```python
def parse_mainpages(self, response):
        print('parse_mainpages')
        main_category = response.css('div.gbest-cate > ul.by-group > li > a::text').getall()
        main_category_links = response.css('div.gbest-cate > ul.by-group > li > a::attr(href)').getall()
```

여기서 메인카테고리 리스트 타이틀을 뽑아내는 명령어인 

```python
response.css('div.gbest-cate > ul.by-group > li > a::text').getall()
```

이 명령어를 터미널 scrapy shell에 입력해 볼까요?

<img src="/deep-curri-scrapy4/4.블로그_3.png" style="zoom:50%;" />

짜잔! Input으로 명령어를 넣어줬더니 Output으로 지마켓베스트에 있는 메인카테고리 리스트가 그대로 텍스트만 뽑혀서 출력됐어요. 그렇다면 이 명령어는 문제가 없다는 걸 알 수 있겠네요!

다른 명령어들도 오류가 뜨진 않는지, 제대로 크롤링이 잘 되는지 Input에 명령어를 넣어서 확인해 주는 작업을 잊지맙시다. 

그렇지 않는다면,,,,, 훗날 csv로 파일을 저장했을 때 무엇이 문제인지 모른 채 오류를 찾는 늪에 빠져 있는 스스로를 발견하게 될 것입니다.



#### 2) csv로 크롤링 결과 저장하기

제가 이번 포스팅은 쉬울 거라고 했는데, 정말 쉽습니다.

우선, 터미널에서 **spider 디렉토리로 이동**해줍니다.

터미널에서 spider 디렉토리로 이동하는 방법은 여러가지가 있지만 가장 쉽고 빠른 방법은 **spider 디렉토리의 경로를 복사**해준 후, 터미널에 

```python
cd + spider 디렉토리 붙여넣기
```

해주는 것입니다. 

spider 디렉토리로 이동한 후, 터미널에 아래 명령어를 입력해주세요. 

```python
scrapy crawl gg_best -o gg_best.csv -t csv
```

**scrapy crawl + spider이름 + -o + 저장할 파일 이름.csv -t csv** 이 문구에 자신이 진행하는 프로젝트 이름만 쏙 바꿔치기해주면 됩니다. 복붙해서 쓰세요!

입력만 해주면 끝납니다. 

정말이에오,,,,,

심지어 같은 작업하던 같은 디렉토리에 뿅하고 생겨납니다. 제가 한번 해볼게요.

<img src="/static/deep-curri-scrapy4/4.블로그_4.png" style="zoom:50%;" />

그러면 같은 디렉토리에 두구두구

<img src="/deep-curri-scrapy4/4.블로그_5.png" style="zoom:50%;" />

😭😭😭😭😭😭😭😭😭😭😭

드디어 기나긴 여정을 지나 크롤링을 마치고 csv가 결과물로 저장이 되었습니다!!!!!!!

한번 파일을 열어볼까요?

<img src="/deep-curri-scrapy4/4.블로그_6.png" style="zoom:50%;" />

휴~~~~ 잘 크롤링 되어 csv파일까지 저장되었네요!

이렇게 **scrapy crawling 결과를 csv로 저장하기**는 끝이 났습니다. 



길고 지난한 과정을 거쳐서 다시 웹크롤링을 복습해보았는데요, scrapy 공부했던 걸 잊지 않고 혹시 기억이 가물가물해질 때 즈음에 이 포스팅을 보며 다시 코딩력을 길러봅시다! 

지금까지 포스팅을 따라와주신 분들 너무 수고 많으셨어요❤️‍🔥❤️‍🔥❤️‍🔥❤️‍🔥❤️‍🔥❤️‍🔥

***

