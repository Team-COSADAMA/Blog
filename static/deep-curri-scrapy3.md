



---

title: deep-curri-scrapy3
description: scrapy를 통한 웹크롤링을 다시 복습해보아요!
slug: deep-curri-scrapy3
category: scrapy 
author: 김윤진

---

## 1. scrapy 설치 및 scrapy shell 사용 익히기

## 2. scrapy를 실행할 레포지토리 만들기

## 3. crawling을 위한 각종 설정

저희는 지마켓 베스트 사이트를 크롤링 하기로 했죠! 크롤링을 하기 위해선 다양한 사전 설정들이 필요합니다. 또 설정을 어떻게 하냐에 따라서 다양한 주제와 방식으로 크롤링할 수도 있습니다. 

#### 1) robots.txt 확인하고 설정하기

**robots.txt**는 자신이 크롤링하고자 하는 웹사이트에서 크롤링을 허용하는지, 허용하지 않는지를 의미합니다. 

웹 창에 **"사이트 주소 + /robots.txt"**를 입력해보면 웹 크롤링 허용 여부 및 범위를 알 수 있습니다. 

```
# 예 1)
User-agent: *    # 모든 크롤러 대상
Disallow: /      # /로 시작하는 모든 페이지의 크롤링을 허가하지 않음(즉, 사이트 전체)
```

```
# 예 2)
User-agent: *    # 모든 크롤러 대상
Disallow:        # 공백: 모든 페이지의 크롤링을 허가함
```

```
# 예 3)
User-agent: *    # 모든 크롤러 대상
Allow: /page     # /page 하위 경로는 허가 
Disallow: /      # 그 외는 크롤링을 허가하지 않음
```

```
# 예 4)
User-agent: *            # 모든 크롤러 대상
Disallow: /              # 사이트 전체 크롤링 금지

User-agent: Googlebot    # Googlebot 대상
Allow: *                 # 사이트 전체 크롤링 허가
Disallow: /private       # /private 하위 경로는 허가하지 않음
```

[출처: Advanced WebCrawling WEEK2](https://www.notion.so/cosadama/Advanced-WebCrawling-WEEK2-f3f44d1c18d94d1dba68166144326e53)

robots.txt에는 강제성이 없습니다. 즉, 권고사항일 뿐 사이트에서 크롤링을 하지 말라고 했더라도 크롤링이 가능하다는 이야기 입니다. **그러나** 안일한 마음으로 크롤링을 하지 말라고 표기해 놓은 사이트를 무작정 크롤링하지 마시고 꼭 해당 사이트 관계자에게 크롤링 가능 여부를 확인하시고 크롤링을 실행해주시기 바랍니다!!

**settings.py** 디렉토리를 열어봅시다.

<img src="/deep-curri-scrapy3/3.블로그_1.png" alt="settings.py" style="zoom:50%;" />

사진에서 **ROBOTSTXT_OBEY = TRUE**가 보이시나요? 다행히 저희가 크롤링 할 지마켓 베스트 사이트는 크롤링을 허용해 놓았네요! 만약 ROBOTSTXT_OBEY = FALSE라면 크롤링을 하지 못하게 설정해 둔 것으로, ROBOTSTXT_OBEY = TRUE라고 설정을 바꾸어야 웹 크롤링이 가능해진답니다. 

#### 2) 크롤링할 Item Field 설정해주기

이제 본격적으로 무엇을 크롤링할지 설정하기 위해 **item.py**에 들어가서 하나씩 설정해 봅시다. 

Advanced WebCrawling 4주차 과제에서 요구하는 것은 

```
1. 메인 카테고리명
2. 서브 카테고리명 
3. 상품 순위
4. 상품명
5. 기존 가격
6. 할인 가격
7. 할인율
```

이었습니다. 

<img src="/deep-curri-scrapy3/3.블로그_2.png" style="zoom:50%;" />

현재 item.py에는 class안에 아무 것도 들어가 있지 않습니다. 그러면 필드 안에 저장할 것이 아무 것도 없다는 뜻입니다. 그래서 우리가 직접 어떤 것들을 스크래핑 할 것인지 하나씩 하나씩 item을 넣어주어야 합니다. 무엇을 저장할지 위의 조건들을 다 넣어주면 나중에 스크래핑 결과물에 7개의 항목이 예쁜 필드로 나오겠죠?

``` python
class GgBestItem(scrapy.Item):
  pass
```

그럼 아이템을 하나하나 예쁘게 넣어보겠습니다.

<img src="/deep-curri-scrapy3/3.블로그_3.png" alt="items.py 수정 후" style="zoom:50%;" />

주석에 달아놓았듯이 각각 1번부터 7번까지 요구하는 필드를 작성했습니다. 

#### 3) item별로 scrapying하기

* 잠시 번외로 css와 XPath 문법에 대해서 미리 알아두고 가야해요! **.get() / .getall() / ::text** 정도만 사용할 거지만 미리 알아두면 좋으니까요 :)

![](/deep-curri-scrapy3/CSS_Selector_vs._xpath.pdf)

​																				[출처:AdvancedWebCrawlingWEEK1](https://www.notion.so/cosadama/Advanced-WebCrawling-WEEK1-903c0c6c93c340a6b63a9ff608b9b1cf)



우선 저희는 지마켓 베스트 상품들을 크롤링할 거였기 때문에 지난 시간에 터미널에 'gg_best'라는 이름으로 파이썬 파일을 만들었었어요.	# scrapy genspider gg_best "지마켓베스트 주소"



**gg_best.py**로 옮겨가봅시다!

```python
import scrapy
from gg.items import GgItem

class GgBestSpider(scrapy.Spider):
    name = 'gg_best'

    # 크롤링 시작
    def start_requests(self):
        yield scrapy.Request(url="http://corners.gmarket.co.kr/Bestsellers",
                             callback=self.parse_mainpages)

    # 메인카테고리
    def parse_mainpages(self, response):
        print('parse_mainpages')
        main_category = response.css('div.gbest-cate > ul.by-group > li > a::text').getall()
        main_category_links = response.css('div.gbest-cate > ul.by-group > li > a::attr(href)').getall()

        for idx, link in enumerate(main_category_links):
            yield scrapy.Request(url="http://corners.gmarket.co.kr" + link, 
                                callback=self.parse_items, 
                                meta={'main_category':main_category[idx], 'sub_category':'ALL'})
        
        for idx, link  in enumerate(main_category_links):
            yield scrapy.Request(url="http://corners.gmarket.co.kr" + link, 
                                callback=self.parse_subcategory, 
                                meta={'main_category':main_category[idx]})
                
    # 서브카테고리
    def parse_subcategory(self, response):
        print('parse_subcategory', response.meta['main_category'])
        sub_category = response.css('div.cate-l > div > ul > li > a::text').getall() 
        sub_category_links = response.css('div.cate-l > div > ul > li > a::attr(href)').getall()
        if sub_category == None:
            yield scrapy.Request(url="http://corners.gmarket.co.kr/Bestsellers",
                                callback=self.parse_items,
                                meta={'main_category':response.meta['main_category']})

        else: 
            for idx, sub_link in enumerate(sub_category_links):
                if idx != 0:
                    yield scrapy.Request(url="http://corners.gmarket.co.kr" + sub_link, 
                                        callback=self.parse_items, 
                                        meta={'main_category':response.meta['main_category'],'sub_category':sub_category[idx]})

    # 상품정보
    def parse_items(self, response):
        print('parse_items', response.meta['main_category'], response.meta['sub_category'])

        best_items = response.css('div.gbest-top > div > div.best-list')
        
        for idx, item in enumerate(best_items[1].css('li')):
            # 왜 best_item[1]이어야 하는지 이해 못함
            doc = GgItem()
            
            ranking = idx +1
            title = item.css('a::text').get()
            ori_price = item.css('div > div.o-price > span > span::text').get()
            dis_price = item.css('div > div.s-price > strong > span > span::text').get()
            dis_rate = item.css('div > div.s-price > span > em::text').get()
            

            if ori_price == None:
                ori_price == dis_price
            
            if dis_rate == None:
                dis_rate = '0'
            else:
                dis_rate = dis_rate.replace('%','')
           

            ori_price = ori_price.replace(',','').replace('원','냥')
            dis_price = dis_price.replace(',','').replace('원','냥')
            

            doc['main_category'] = response.meta['main_category']
            doc['sub_category'] = response.meta['sub_category']
            doc['ranking'] = ranking
            doc['title'] = title
            doc['ori_price'] = ori_price
            doc['dis_price'] = dis_price
            doc['dis_rate'] = dis_rate

            print(ranking, title, ori_price, dis_price, dis_rate)

            yield doc

```

자, 정답을 위해서는 이렇게 긴 코드가 필요합니다. 왜 그런지 하나하나 뜯어볼까요?

##### 4-1) class GgBestSpider(scrapy.spider)

##### 4-2) start_requests() function

```python
class GgBestSpider(scrapy.Spider):
    name = 'gg_best'

    # 크롤링 시작
    def start_requests(self):
        yield scrapy.Request(url="http://corners.gmarket.co.kr/Bestsellers",
                             callback=self.parse_mainpages)

    # 메인카테고리
    def parse_mainpages(self, response):
        print('parse_mainpages')
        main_category = response.css('div.gbest-cate > ul.by-group > li > a::text').getall()
        main_category_links = response.css('div.gbest-cate > ul.by-group > li > a::attr(href)').getall()

        for idx, link in enumerate(main_category_links):
            yield scrapy.Request(url="http://corners.gmarket.co.kr" + link, 
                                callback=self.parse_items, 
                                meta={'main_category':main_category[idx], 'sub_category':'ALL'})
        
        for idx, link  in enumerate(main_category_links):
            yield scrapy.Request(url="http://corners.gmarket.co.kr" + link, 
                                callback=self.parse_subcategory, 
                                meta={'main_category':main_category[idx]})
                
    # 서브카테고리
    def parse_subcategory(self, response):
        print('parse_subcategory', response.meta['main_category'])
        sub_category = response.css('div.cate-l > div > ul > li > a::text').getall() 
        sub_category_links = response.css('div.cate-l > div > ul > li > a::attr(href)').getall()
        if sub_category == None:
            yield scrapy.Request(url="http://corners.gmarket.co.kr/Bestsellers",
                                callback=self.parse_items,
                                meta={'main_category':response.meta['main_category']})

        else: 
            for idx, sub_link in enumerate(sub_category_links):
                if idx != 0:
                    yield scrapy.Request(url="http://corners.gmarket.co.kr" + sub_link, 
                                        callback=self.parse_items, 
                                        meta={'main_category':response.meta['main_category'],'sub_category':sub_category[idx]})

```

gg_best.py 파일은 크게 보면 하나의 class와 item 수에 따른 다양한 하위 function들로 이루어져 있습니다. 

먼저 class를 보고, 그 안에 있는 function은 간단한 것부터 쪼개어서 보도록 하겠습니다. 

```python
class GgBestSpider(scrapy.Spider):
    name = 'gg_best'
    # 크롤링 시작
    def start_requests(self):
        yield scrapy.Request(url="http://corners.gmarket.co.kr/Bestsellers",
                             callback=self.parse_mainpages)
```

class 이름은 우리가 설정한대로 'gg_best'를 반영해 **'GgBestSpider'**가 잘 되었다는 것을 확인할 수 있습니다. name = 'gg_best'로 역시 잘 설정 되었네요. 

첫번째 function은 **start_requests**입니다. **start_requests**의 기능은 이름 그대로 스크래피를 실행할 때 어느 웹사이트에서 실행할지를 요청하는 기능입니다. 괄호 속 url을 보면 "httpL//corners.gmarket.co.kr/Bestsellers"로 지마켓 베스트 상품 웹사이트인 것을 잘 확인할 수 있습니다. 



##### 4-3) parse_mainpages()	/	parse_subcategory() function들

```python
    # 메인카테고리
    def parse_mainpages(self, response):
        print('parse_mainpages')
        main_category = response.css('div.gbest-cate > ul.by-group > li > a::text').getall()
        main_category_links = response.css('div.gbest-cate > ul.by-group > li > a::attr(href)').getall()

        for idx, link in enumerate(main_category_links):
            yield scrapy.Request(url="http://corners.gmarket.co.kr" + link, 
                                callback=self.parse_items, 
                                meta={'main_category':main_category[idx], 'sub_category':'ALL'})

        for idx, link  in enumerate(main_category_links):
            yield scrapy.Request(url="http://corners.gmarket.co.kr" + link, 
                                callback=self.parse_subcategory, 
                                meta={'main_category':main_category[idx]})

    # 서브카테고리
    def parse_subcategory(self, response):
        print('parse_subcategory', response.meta['main_category'])
        sub_category = response.css('div.cate-l > div > ul > li > a::text').getall() 
        sub_category_links = response.css('div.cate-l > div > ul > li > a::attr(href)').getall()
        if sub_category == None:
            yield scrapy.Request(url="http://corners.gmarket.co.kr/Bestsellers",
                                callback=self.parse_items,
                                meta={'main_category':response.meta['main_category']})

        else: 
            for idx, sub_link in enumerate(sub_category_links):
                if idx != 0:
                    yield scrapy.Request(url="http://corners.gmarket.co.kr" + sub_link, 
                                        callback=self.parse_items, 
                                        meta={'main_category':response.meta['main_category'],'sub_category':sub_category[idx]})
```

다음으로 넘어가 본격적으로 크롤링하는 내용인 **parse_mainpages**와 **parse_subcategory** function을 봅시다. 

- **parse_mainpages**는 메인카테고리와 각 카테고리에 해당하는 웹링크를 얻는 function을 만드는 것이었습니다. 

메인카테고리, 메인카테고리 웹링크를 얻기 위해서는 공통css 정보를 얻어와야 합니다. 어떻게 얻을 수 있는지 사진으로 볼까요?

<img src="/deep-curri-scrapy3/3.블로그_4.png" style="zoom:50%;" />

구글 크롬창에서 **control + f12**를 누르면 위의 사진처럼 오른쪽에 개발자의 복잡하고 이해할 수 없는 페이지가 뜹니다. 굳이 이해하지 않으셔도 돼요. 어떻게 페이지를 디자인했고 어떤 방식으로 페이지가 구성되었는지를 코드로 구현해 놓은 복잡한 식이라고 생각하시면 됩니다. 

우선 노란색으로 표시된 **1**번을 글릭한 뒤, **2**번에 마우스 커서를 가져다대면, 노란색으로 하이라이트해놓은 박스부분이 오른쪽 창에 뜹니다.

이때!!를 놓치지 않고 저희는 저 **박스부분**이 가지고 있는 css정보를 가져와야 합니다. 방법은 간단해요!

<img src="/deep-curri-scrapy3/3.블로그_5.png" style="zoom:50%;" />

박스 위에 마우스 커서를 둔 채로 **우클릭 -> copy -> copy selector**를 하시면 해당 메인카테고리(패션의류)에 대한 css 정보가 복사된 것입니다! 

css보다 XPath가 편하신 분들은 XPath를 사용하셔도 돼요!

실제로 css를 복사해서 가져와보니 **#categoryTabG > li.group1 > a ** 이렇게 나오네요.

제가 직접 입력한 위의 python 코드의 **main_category = response.css('div.gbest-cate > ul.by-group > li > a::text').getall()**와는 조금 다르죠? 제가 입력한 코드는 **div.gbest-cate > ul.by-group > li > a**인데 무엇이 다른 걸까요?

![](/deep-curri-scrapy3/3.블로그_6.png)

오른쪽 창에 노란색으로 양 옆에 표시된 동그라미 세개 '...'가 각각 보이시나요? 저 동그라미들 안에 일자 배열로 css경로가 쭉 나열되어 있답니다. 동그라미 버튼을 가장 왼쪽으로 옮겨서 **진한 파란색**으로만 표시된 것들을 가져와 줄게요.

**html > body > div > div > div > div > ul > li > a**이렇게 되어 있네요! div나 ul, li 뒤에 붙은 #과. 뒤의 수식어는 붙여도 되고 안 붙여도 된답니다.

-> 그러니까 정리하자면, **파란색으로 된 css 경로**만 가져와도 된다는 거예요! 또 그 중 뒤에 일부분만 짤라내서 가져와도 괜찮습니다. html부터 가져오면 너무 길어지잖아요, 그럼 귀찮고,,,,, 어쨌든 이런 방법을 통해 공통css경로를 가져올 수 있답니다.

* 다만 수식어나 복사해온 경로에 숫자와 child가 들어가있을 경우 **공통**경로가 아니라 해당 마우스 커서가 가리키는 곳만을 의미하는 경로이니, 그럴 경우 숫자와 child는 제거해서 경로를 가져와야 합니다. 



python 코드의 **main_category = response.css('div.gbest-cate > ul.by-group > li > a::text').getall()**을 조금만 더 뜯어볼까요? 얼마 안남았어요!

잘 보면 css경로 뒤에 **::text**라고 되어있는 걸 볼 수 있습니다. 아까 위에 **3)의 번외**에서 보았듯이 ::text는 css 정보 중 **글자만**을 가져온다는 명령어입니다. 또 괄호 밖에 **.getall()**이 있어요. .getall()은 **데이터 전체를 리스트**로 가져오라고 지시하는 명령어입니다. 

그럼 결과적으로 **메인카테고리의 타이틀 리스트**가 크롤링되는 거겠죠?



메인카테고리 타이틀의 링크를 가져오는 방법도 같은 css경로를 사용하면 됩니다. 다만 글자를 가져오는 명령어가 아니라 **웹링크 정보를 담고있는 href**를 가져오라고 명령해야 해요. 그럴 때 사용하는 것이 **'css경로+::attr(href)'**입니다.

서브카테고리도 메인카테고리와 같은 원리로 타이틀과 링크를 가져오시면 됩니다!



##### 4-4) parse_items() function

진짜 진짜 마지막이에요! 이번 포스팅은 참 긴데요, 하나의 원리를 이해하면 되는 것이기 때문에 그 하나를 이해하고야 말겠다라는 마음가짐으로 마지막까지만 정신줄을 잡아보아요!

마지막은 **parse_items** function입니다. 

parse_items function은 위의 function들보다 조금 더 길어요. 그 이유는 parse_items 안에 저희가 크롤링할 **아이템 랭킹, 제목, 원래가격, 할인가격, 할인율**이 모두 포함되어있기 때문이에요. 길어서 어려워보이지만 사실 css 경로만 붙여 넣어주면 되는 일이기 때문에 어렵지 않습니다!

```python
    # 상품정보
    def parse_items(self, response):
        print('parse_items', response.meta['main_category'], response.meta['sub_category'])

        best_items = response.css('div.gbest-top > div > div.best-list')
        
        for idx, item in enumerate(best_items[1].css('li')):
            # 왜 best_item[1]이어야 하는지 이해 못함
            doc = GgItem()
            
            ranking = idx +1
            title = item.css('a::text').get()
            ori_price = item.css('div > div.o-price > span > span::text').get()
            dis_price = item.css('div > div.s-price > strong > span > span::text').get()
            dis_rate = item.css('div > div.s-price > span > em::text').get()
            

            if ori_price == None:
                ori_price == dis_price
            
            if dis_rate == None:
                dis_rate = '0'
            else:
                dis_rate = dis_rate.replace('%','')
           

            ori_price = ori_price.replace(',','').replace('원','냥')
            dis_price = dis_price.replace(',','').replace('원','냥')
            

            doc['main_category'] = response.meta['main_category']
            doc['sub_category'] = response.meta['sub_category']
            doc['ranking'] = ranking
            doc['title'] = title
            doc['ori_price'] = ori_price
            doc['dis_price'] = dis_price
            doc['dis_rate'] = dis_rate

            print(ranking, title, ori_price, dis_price, dis_rate)

            yield doc


```

**1. ranking** 

ranking은 css경로를 복사해서 붙여넣기하는 방식으로 가져와도 되지만, css경로를 이용하는 것은 오류가 날 확률이 높으니 더 쉬운 방법인 

```python
ranking = idx +1
```

을 사용해주도록 합시다.



**2. title	/	ori_price	/	dis_price	/	dis_rate**

**타이틀, 원래가격, 할인가격, 할인율** 모두 따로 계산해줄 필요 없이 웹사이트에서 css경로만 복사해서 text만 뽑아내면 되니 참 쉽네요!

그런데 전에는 괄호 뒤에 .getall()을 사용했었는데 지금은 **.get()**을 사용하고 있습니다. 그 이유는 .getall()은 여러개의 리스트를 뽑아낼 때 사용하는 명령어인 반면, parse_item() function에서는 for문을 사용하여 아이템 하나하나에 접속하고 있습니다. **.get()**은 값이 하나일 때, 하나씩 아이템의 정보를 수집하는 명령어입니다. **여러개일 땐 .getall(), 하나일 땐 .get()** 잊지맙시다!



**3. if 조건문**

지마켓 베스트 웹사이트에보면 난감한 경우가 있습니다. 바로 **원래가격과 할인율이 없는 경우**인데요, 이럴 경우에는 공통css경로를 붙여주었는데 반해 해당 값이 존재하지 않는 상황이라 오류가 납니다. 

그런 오류를 막기 위해서 if문을 사용해야 합니다. 

```python
 if ori_price == None:
                ori_price == dis_price
            
            if dis_rate == None:
                dis_rate = '0'
            else:
                dis_rate = dis_rate.replace('%','')
```

이렇게 ori_price에 해당하는 값이 웹사이트에 없을 경우, ori_price는 dis_price와 같은 값으로 처리하라고 명령해줍니다. 당연히 dis_rate도 0가 되어야겠죠?

마지막에 else절은 **%** 문구를 없애는 명령입니다. 



**4. 과제 조건) 원->냥**

4주차의 과제 조건 중 하나가 바로 **"pipelines.py 설정을 통해 가격에서 쉼표(,)를 없애고, '원'은 '냥'으로 바꿔줄 것"**이었습니다. 저는 pipelines.py가 아니라 gg_best.py에서 코드를 추가하는 방식으로 원을 냥으로 바꾸어줘 보겠습니다. 

4주차의 정답은 모두 알고 계실테니 '이런 방법도 있구나' 하고 짚고 넘어가는 파트로 생각해주세요. 



저희는 여전히 **parse_items** function 안에 있고 그 중에서도 

```python
        for idx, item in enumerate(best_items[1].css('li')):
```

이렇게 생긴 for문 안에서 하나씩 아이템에 접근하고 있는 방법을 사용중입니다. 

for문 안에

```python
ori_price = ori_price.replace(',','').replace('원','냥')
dis_price = dis_price.replace(',','').replace('원','냥')
```

이 코드를 넣어주면 과제의 조건을 바로 해결할 수 있습니다. **replace** 함수를 사용해서 **원 -> 냥**으로 바꾸기 너무 간단하죠?



세번째 포스팅은 이렇게 긴~ 포스팅이 되어버렸네요. 하지만 핵심은 **공통css경로** 가져오기라는 것. 그리고 **css문법기초** 정도만 알아두는 것. 결국 이 두 가지가 핵심입니다. 길고 거추장스러워보이지만 이 두 가지만 잘 기억하시면 당신은 크롤링을 다 한 것과 마찬가지입니다. 이제 버튼만 누르면 되겠죠?

다음 포스팅에서 그 버튼을 누르는 법을 배워보겠습니다. (짱 쉬워요 :))

## 4. scrapy crawling 결과를 csv로 저장하기



***

