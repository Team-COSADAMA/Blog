---

title: 한국어 임베딩 (단어 수준) 
description: 실전NLP_네 번째 
slug: 2021-practiceNLP-04
category: NLP
author: 이정윤

---

## 🌊 Introduction

이전 스터디에서는 임베딩의 전반적인 개념과 여러가지 종류들을 가볍게 살펴보았다. 이번에는 임베딩 기법 중 '단어'를 기반으로 만들어진 임베딩 기법에 대해 공부해보려 한다. 

우선 <u>단어기반 임베딩 기법</u>은 각각의 벡터에 해당 단어의 문맥적 의미를 함축한다. 따라서 단어의 형태가 동일하면 같은 단어로 인식하여 동음이의어(발음하기는 같지만 뜻이 다른 단어)나 문맥에 따른 다른 의미를 분간하기 어렵다는 단점이 있다. 

최근 그 한계를 보완할 수 있는 <u>문장기반 임베딩 기법</u>이 등장하였지만, 여전히 단어기반 임베딩 기법은 널리 사용되고 있다. 이번 실습에서는 단어 기반 임베딩 중에서 가장 많이 사용되는 Word2Vec과 GloVe에 대해 알아보고 직접 수집한 말뭉치에 적용해볼 예정이다. 

Word2Vec과 GloVe 실습 코드는 [위키독스](https://wikidocs.net/50739)의 '영어/한국어 Word2Vec실습'를 참고했음을 미리 밝힌다. 실습에 사용한 모든 코드는 [여기](https://colab.research.google.com/drive/1ekT6P9GwUOuAl16qIorbFTvbgfxEzgaF#scrollTo=1914Oy5VSV5C)서 확인할 수 있다. 

참고도서: 한국어임베딩(이기창, 2019)     
참고사이트: [위키독스-딥러닝을 이용한 자연어처리 입문](https://wikidocs.net/22644), [GloVe를 이해해보자!](https://ratsgo.github.io/from%20frequency%20to%20semantics/2017/04/09/glove/), [워드투벡터(Word2Vec)](https://bkshin.tistory.com/entry/NLP-11-Word2Vec)

## 🌊 Preprocessing & Tokenization

사용한 말뭉치는 앞선 실습에서 사용했던 [문화재청](https://www.cha.go.kr/html/HtmlPage.do?pg=/publicinfo/pbinfo3_0202.jsp&mn=NS_04_04_02) 에서 제공하는 API를 통해 다운받은 '문화재검색 상세'데이터 중 '내용' 부분과 더불어 동일한 국보 리스트에 대한 [위키백과]()의 API로 다운받은 데이터, [한국민족대백과사전]()에서 크롤링한 데이터들을 활용하였다. 

토큰화는 [1주차 스터디](https://www.blog.cosadama.com/2021-practiceNLP-01)에서 가장 높은 성능을 보였던 __Mecab__ 을 사용한다. (불용어를 조금 더 정교하게 제거해 줄 필요가 있다.) 

토큰화 후  일부 불용어를 제거하는 등의 전처리 부분은 이번 스터디의 주 내용이 아니므로 [Colab파일](https://colab.research.google.com/drive/1ekT6P9GwUOuAl16qIorbFTvbgfxEzgaF#scrollTo=1914Oy5VSV5C)로 대체하도록 하겠다. 

##  🌊 Embedding

### 1. Word2Vec

Word2Vec은 구글 연구팀이 2013년에 발표한 단어기반 임베딩 기법이며 아래 두가지 방식이 있다. 

* CBOW(Continuous Bag of Words)
	* 주변에 있는 단어(context word)들을 가지고 중심에 있는 단어(target word)를 맞추는 방식
	* '나는__에 간다' 라는 문장이 있을 때 그 사이에 들어갈 단어인 '학교'를 예측하는 것
* Skip-gram
	* 중심에 있는 단어(target word)로 주변 단어(context word)를 예측하는 방법
	* 예시) '__학교__' 라는 문장이 있을 때 그 앞뒤에 들어갈 '나', '는', '에', '간다' 를 예측하는 것
	
동일한 말뭉치(corpus)를 사용해도 Skip-gram이 CBOW보다 더 많은 학습 데이터를 확보해야하며, 예측이 어려운 만큼 일반적으로 임베딩 품질도 더 좋다. 두 방식이 어떻게 예측하는가에 대한 설명은 [이곳](https://wikidocs.net/22660)을 참고하면 좋을 것 같다. 

1. 모듈 설치하기 
```
from gensim.models.word2vec import Word2Vec
```

2. 학습하기
```
model = Word2Vec(sentences = tokenized_data, 
				 size = 100, 
				 window = 5, 
				 min_count = 5, 
				 workers = 4, 
				 iter=100, 
				 sg = 1)
```

Word2Vec을 사용하는 코드는 한 줄이면 끝난다. 파라미터의 의미는 다음과 같다. 
* sentences: 토큰화된 리스트 이름
* size: 몇 차원의 벡터로 바꿀 것인지
* window: 앞 뒤 몇 단어를 볼 것인지
* min_count: 최소 출현빈도 (이하인 것은 삭제하기) 
* workers: 몇 가지 병렬 방식으로 훈련할지 (멀티코어. 동시에 처리할 작업 수) 
* iter: 몇 번 반복학습할 것인지
* sg=1: skip-gram을 사용해라 (sg=0이면 CBOW사용)
```
# 임베딩 매트릭스 크기 
model.wv.vectors.shape
```
결과는 (6573, 100) 이다. 총 6573개의 단어가 있고 100차원이라는 것을 의미한다. 

3. 학습결과 확인하기     
![Word2Vec](/practiceNLP/Word2Vec.png)    
몇 개 단어들을 예시로 넣어보면 위와 같은 결과가 도출된다. 

참고사이트: [Word2Vec을 활용해 문장을 벡터로 변환하기](https://too-march.tistory.com/16), [Word2Vec을 이용한 '깃대종'단어간 유사도 측정](https://blog.daum.net/geoscience/1414)

### 2. GloVe

GloVe는 미국 스탠포드대학 연구팀이 2014년에 발표한 기법으로, Word2Vec과 잠재의미분석(LSA)의 단점을 개선한 기법이다. 이때의 단점은 각각 LSA는 카운트 기반 임베딩 기법으로 전체적인 통계정보를 고려하지만, 유추(예측)성능이 떨어지는 반면, Word2Vec은 유추 성능은 뛰어나지만, 사용자가 지정한 윈도우(window) 즉, 주변 단어 몇개만 볼지에 따라 학습이 이루어져 전체 정보를 고려하지 않았다는 것이다. GloVe의 목표는 '임베딩된 단어 벡터 간 유사도 측정을 수월하게 하면서도 말뭉치 전체의 통계정보를 좀 더 잘 반영하는 것'이다. (한국어 임베딩, p172) 

1. 설치하기
```
!pip install glove_python_binary
```

2. 모듈 설치하기 
```
from glove import Corpus, Glove
corpus = Corpus()
```

3. 학습하기
```
# 훈련 데이터로부터 GloVe에서 사용할 동시 등장 행렬 생성
corpus.fit(tokenized_data, window=8)
glove = Glove(no_components=100, 
			  learning_rate=0.03)

# parameter 설정
glove.fit(corpus.matrix, 
		  epochs=20, 
		  no_threads=5, 
		  verbose=False)
glove.add_dictionary(corpus.dictionary)
```

GloVe를 사용하는 코드 역시 길진 않다. 파라미터의 의미는 다음과 같다. 성능을 높이는 작업에서 이 파라미터들을 잘 조절하는 것이 중요하다. 
* no_components: 몇 차원 백터로 바꿀 것인지
* learning_rate: 너무크면 overshooting, 너무 작으면 실행시간이 너무 오래 걸린다. 최적의 값은 여러번 실행하면서 찾는 것.
* window: 앞 뒤로 몇개의 단어를 볼 것인지 
* epochs: 전체 데이터셋을 몇 번 학습시켜줄 것인지 (학습반복주기) 
* no_threads: 프로세스 내에서 실행되는 흐름단위의 개수(멀트스레드. 병렬실행) 
* verbose: 학습진행상황을 보여줄것인지 (1=True, 0=False)

4. 학습결과 확인하기     
![GloVe](/practiceNLP/GloVe.png)
몇 개 단어들을 예시로 넣어보면 위와 같은 결과가 도출된다. 

두 결과 모두 연관성있는 단어가 잘 도출되기도 하고, 그렇지 않기도 하다. 이는 우선 전처리를 할 때 불용어(stopwords)를 더 잘 제거해줘야 하며, 설정하는 파라미터들을 더 정교하게 처리하면 개선될 수 있다. 

참고사이트: [GloVe Embedding](https://jxnjxn.tistory.com/49), [Learning Rate](https://pythonkim.tistory.com/23), [GloVe, word representation](https://lovit.github.io/nlp/representation/2018/09/05/glove/)
참고도서: 한국어임베딩(이기창, 2019)   

##  🌊 Future tasks
단어 기반 임베딩 기법은 가장 많이 사용되는 Word2Vec, GloVe 외에도 페이스북에서 2017년 발표한 FastText, 구글 연구팀에서 2016 발표한 Swivel 등이 있다. 또한 __단어 임베딩 평가__ 를 하는 방법에는 
1. 단어 유사도 평가
2. 단어 유추 평가 

가 있는데, 한국어 단어 임베딩 평가에 대해서는 추후 언급해보도록 하겠다. 

다음 스터디에서는 단어기반 임베딩에서 더 나아가, __문장기반 임베딩__ 에 대한 실습을 진행해보려 한다. 
* 문장기반 임베딩
	* BERT
	* ELMo
	* LDA
