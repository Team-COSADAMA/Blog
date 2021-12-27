---

title: 한국어 임베딩 (문장 수준) 
description: 실전NLP_다섯 번째
slug: 2021-practiceNLP-05
category: NLP
author: 이정윤

---

## 🌊 Introduction

이전 스터디에서 진행한 단어기반 임베딩 기법을 활용했을 때 꽤 그럴듯한 유사도 추출이 진행되었다. 그러나 말뭉치 안에 없는 단어의 유사도는 찾지 못하며 동음이의어는 구분하지 못한다는 한계점이 존재한다. 예를들어 '의사' (doctor)와 '의사'(patriot)는 구분할 수 없다는 것이다. 

이런 한계는 <u>문장기반 임베딩</u>를 통해 해결할 수 있다. 문장기반 임베딩은 앞서 설명한 단어기반 임베딩 기법의 한계를 보완할 수 있는 방법으로 최근 많이 연구되고 있다. 그 중에서도 예측 기반인 BERT와 ElMo, 그리고 토픽 기반 임베딩 기법인 LDA를 실습해 볼 예정이다. 임베딩 기법 차이 및 분류에 대한 자세한 설명은 이전 [3주차 포스팅](https://www.blog.cosadama.com/2021-practiceNLP-03)을 참고하길 바란다. 

한편, EMLo와 BERT 같은 경우에는 아직 따끈따끈한 새로운 기법인 만큼 실습 예제가 많지 않다. (또한 pretrain할 때 필요한 데이터의 크기도 가늠할 수 없다)두 기법에 대한 이해가 부족한 상태에서 내가 가진 데이터를 적용하기 쉽지 않아서 이번 실습만큼은 기존의 예시 코드를 활용하여 진행하도록 한다. 

실습에 사용한 모든 코드는 [여기](https://colab.research.google.com/drive/1sb4DXAVQ7X5ICXec-RsGF6AePx4eaBgH)서 확인할 수 있다. 

참고도서: 한국어임베딩(이기창, 2019)     
참고사이트: [위키독스-딥러닝을 이용한 자연어처리 입문](https://wikidocs.net/22644)

## 🌊 Preprocessing & Tokenization
LDA에서 사용한 말뭉치는 '청와대 청원' 크롤링 내용이다. 전체 청원을 크롤링하기에는 시간적, 기계 성능적으로 한계가 있어 최근 3개월 데이터만 수집했다. 

토큰화는 [1주차 스터디](https://www.blog.cosadama.com/2021-practiceNLP-01)에서 가장 높은 성능을 보였던 __Mecab__ 을 사용한다. (불용어를 조금 더 정교하게 제거해 줄 필요가 있다.)     
토큰화 후  일부 불용어를 제거하는 등의 전처리 부분은 이번 스터디의 주 내용이 아니므로 [코랩파일](https://colab.research.google.com/drive/1sb4DXAVQ7X5ICXec-RsGF6AePx4eaBgH#scrollTo=7HZIHs1A--10&line=1&uniqifier=1)에서 진행한 것으로 대체하도록 하겠다. 

##  🌊 Embedding

### 1. LDA
LDA(Latent Dirichlet Allocation)은 주어진 문서에 대하여 각 문서에 어떤 토픽(주제)들이 존재하는지에 대한 확률 모형이며 주제를 추출한다는 점에서 '토픽 모델링'이라고도 한다. (한국어 임베딩, 2019, p190) 이때 특정 토픽으로 분류하고 모을 수는 있지만, 해당 내용이 어떤 토픽, 즉 중심 주제 내용을 뽑아내는 것은 아니다. 

1. 모듈설치
```
!pip install pyLDAvis
!pip install --upgrade gensim
## 시각화 툴
!pip install pyLDAvis
```
```
from gensim import corpora, models
import gensim
import pandas as pd
```
```
#시각화 툴
import pyLDAvis
import pyLDAvis.gensim_models
```
2. 학습하기
```
# 토큰화된 말뭉치는 tokenized_data 변수 사용

## 단어학습하기
dictionary = corpora.Dictionary(tokenized_data)
## 문서-단어 행렬(document-term matrix) 생성
corpus = [dictionary.doc2bow(term) for term in tokenized_data]
model = models.ldamodel.LdaModel(corpus, num_topics=9, id2word = dictionary)
model.show_topics(4, 10)
```
```
NUM_TOPICS = 9 #토픽개수

word_dict = {}
for i in  range(NUM_TOPICS):
	words = model.show_topic(i, topn=20)
	word_dict['Topic #' + '{:02d}'.format(i+1)] = [i[0] for i in words]
	word_df = pd.DataFrame(word_dict)
```
전체 데이터를 총 9개의 주제로 분류한다. (NUM_TOPICS=9)   
분류 결과는 아래와 같다. 
![LDA_1](/practiceNLP/LDA_1.png)
토픽1~9까지 살펴보면 비슷한 카테고리의 단어끼리 뭉쳐있는 것을 볼 수 있다. 그러나 토픽끼리 겹치는 단어도 많고, 정확히 어떤 주제의 토픽으로 분류된 것인지 확인하기 애매한 경우가 있다. 이는 LDA의 한계이기도 하고, 사용한 말뭉치의 주제수가 고르지 않아(이때는 '보건복지' 카테고리의 청원수가 월등히 많았다.) 분류결과가 정확하지 않을 가능성도 있다. 

3. 시각화하기
```
pyLDAvis.enable_notebook()
data = pyLDAvis.gensim_models.prepare(model, corpus, dictionary)
data
```
![LDA_2](/practiceNLP/LDA_2.png)
토픽별로 해당 단어의 등장 빈도 관련성 등을 시각적으로 표현해준다. 

### 2. ELMo
ELMo(Embeddings from Language Model)는 2018년에 미국의 Allen AI 연구기관과 워싱턴대학교 공동 연구팀이 제안한 워드 임베딩 방법으로, 잘 알고 있듯 만화 세서미스트리트의 캐릭터 이름을 따서 만들었다. ELMo 사전 훈련된 언어 모델(Pre-trained language model)을 사용하는데, 이때 사전 훈련된 언어 모델이란 이미 학습된 모델을 다른 딥러닝 모델의 입력값 또는 부분으로 재사용하는 기법을 말하며 '전이 학습'이라고도 한다. 전이학습(pretrain)이후 

ELMo는 세가지 요소로 구성된다.
* Convilutional Neural Network (각 단어 내 문자들 사이의 의미적, 문법적 관계 도출. pretrain에서 학습)
* 양방향 LSTM 레이어 (단어들 사이의 의미적, 문법적 관계 추출. pretrain에서 학습)
* ELMo 레이어(pretrain이후 다운스트림 태스크를 수행할 때, 즉 fine tuning 할 때 학습)   

이 과정은 사실 굉장히 양이 방대하고 전체를 다 이해하기에는 상당한 기본 지식과 시간이 걸릴 것 같다. 전체적인 흐름을 이해하고 넘어가도록 한다. 실습한 코드는[위키독스](https://wikidocs.net/33930)에서 진행한 스팸메일 분류기 코드를 활용하였으므로 이 글에 코드를 추가하진 않도록 하겠다.  

참고도서: 한국어임베딩(이기창, 2019) p203~218   
참고사이트: [The Illustrated BERT, ELMo, and co. (How NLP Cracked Transfer Learning)](https://nlpinkorean.github.io/illustrated-bert/) | [위키독스](https://wikidocs.net/33930) 



### 3. BERT
앞서 ELMo와 같이 애니매이션 세서미스트리트의 캐릭터 이름을 불여 귀여운 느낌을 주는 BERT는 구글이 2018년에 공개하였고 뛰어난 성능을 보여주고 있다. BERT의 기법을 이해하기 위해서는 ['트렌스포머'](https://wikidocs.net/31379) 메커니즘을 우선적으로 이해해야 하는데, 내용이 방대하여 개념에 깊에 들어가지 않고 간단하게만 살펴본다. 

BERT는앞서 발표된 EMLo, GPT와 달리 모든 레이어에서 양방향을 지향한다. 시퀀스를 보는 언어모델같은 경우에는 한 방향만 보는 반면, BERT는 문장 전체를 먼저 보기 때문에 양 방향 모두를 고려할 수 있다는 것이다. 

BERT는 무거운 편이라 TPU를 사용하는 것이 좋다고 한다. Colab에서 런타임 > 런타임 유형 변경 > 하드웨어 가속기에서 'TPU' 로 설정 변경하고 아래 코드를 실행시켜 준다.  (아래 실습같은 경우에는 그냥 기존의 CPU 설정으로도 문제 없이 실행되었다.)      
```
# TPU 초기화
import tensorflow as tf 
import os 
resolver = tf.distribute.cluster_resolver.TPUClusterResolver(tpu='grpc://' + os.environ['COLAB_TPU_ADDR']) 
tf.config.experimental_connect_to_cluster(resolver)   
tf.tpu.experimental.initialize_tpu_system(resolver)

# TPU strategy 설정
strategy = tf.distribute.TPUStrategy(resolver)
```
코드 출처: [위키독스](https://wikidocs.net/119990)

BERT는 이미 학습된 모델을 사용하는 것이므로 우리가 사용하는 모델과 토크나이저는 항상 맵핑 관계여야 한다. 이러한 조건과 높은 성능을 보이기 위해서는 학습 데이터가 많아야 한다는 점 등의 이유로 새로운 데이터로 pretrain에 적용을 시도해보지 못했다. 

**3-1) 중간 단어 예측하기 (Masked Language Model)**
FillMaskPipeline을 사용하여 마스크드 언어 모델의 예측 결과를 확인한다.   
1. 설치하기
```
!pip install transformers
```
```
from transformers import TFBertForMaskedLM
from transformers import AutoTokenizer
```
2. 예제 데이터 다운받기
[KLUE ](https://github.com/KLUE-benchmark/KLUE)에서 2021년 5월 쯤 발표한 논문에 들어있는 한국어 BERT 이다. 
```
model = TFBertForMaskedLM.from_pretrained('klue/bert-base', from_pt=True)
tokenizer = AutoTokenizer.from_pretrained("klue/bert-base")
```
3. 예측하기
```
from transformers import FillMaskPipeline
pip = FillMaskPipeline(model=model, tokenizer=tokenizer)
```
```
pip('NLP는 정말 어려운 [MASK]다.')
```
![BERT_masked](/practiceNLP/BERT_masked.png)
[MASK] 부분에 들어갈 수 있는 단어를 예측해준다. '스포츠'를 제외하고는 거의  문맥에 어울리는 단어를 도출한다. 

코드 출처: [위키독스](https://wikidocs.net/152922)

**3-2) 다음 문장 예측하기 (Next Sentence Prediction)**
앞문장과 뒷 문장이 이어지는 내용일 때는 최종 레이블 [0]이 도출되고 이어지지 않는 내용일 때는 [1]이 도출된다. 

1. 설치하기
```
import tensorflow as tf from transformers import TFBertForNextSentencePrediction from transformers import AutoTokenizer
```
2. 예제 데이터 다운받기
```
model = TFBertForNextSentencePrediction.from_pretrained('klue/bert-base', from_pt=True)
tokenizer = AutoTokenizer.from_pretrained("klue/bert-base")
```
3.  예측하기
```
# 이어지는 두 개의 문장
prompt = "NLP의 임베딩 기법에는 문장기반 임베딩 기법이 있습니다."
next_sentence = "BERT는 NLP의 임베딩 기법 중 하나입니다."
encoding = tokenizer(prompt, next_sentence, return_tensors='tf')

logits = model(encoding['input_ids'], token_type_ids=encoding['token_type_ids'])[0]

softmax = tf.keras.layers.Softmax()
probs = softmax(logits)
print('최종 예측 레이블 :', tf.math.argmax(probs, axis=-1).numpy())
```
```
# 이어지지 않는 두 개의 문장
prompt = "NLP의 임베딩 기법에는 문장기반 임베딩 기법이 있습니다."
next_sentence = "오늘은 날씨가 매우 춥습니다."
encoding = tokenizer(prompt, next_sentence, return_tensors='tf')

logits = model(encoding['input_ids'], token_type_ids=encoding['token_type_ids'])[0]

softmax = tf.keras.layers.Softmax()
probs = softmax(logits)
print('최종 예측 레이블 :', tf.math.argmax(probs, axis=-1).numpy())
```
위 코드의 결과는 [0] (상관 있음)이, 아래 코드의 결과는 [1] (상관 없음)으로 모두 정확하게 도출하였다. 
참고도서: 한국어임베딩 (이기창, 2019, p227~240)
참고사이트: [The Illustrated BERT, ELMo, and co. (How NLP Cracked Transfer Learning)](https://nlpinkorean.github.io/illustrated-bert/)


##  🌊 Future tasks
이번 학습에서는 문장기반 임베딩 기법을 사용한 실습을 진행하긴 했지만, 내부적으로 공부하고 이해해야 할 개념들이 많이 남았고, 이 스터디의 가장 큰 목적인 '내가 가진 데이터로 실습'을 진행하지 못했다. 또한 GPT와 BERT의 기반인 Transformer network에 대한 이해도 필요한만큼, 심화  과정 스터디는 앞으로 계속 진행해보고자 한다.

NLP의 네 단계 중 세 단계에 대한 작업을 진행하고 있다. 모두 마쳤다. 다음 실습에서는 4,5 주차에서 다룬 임베딩 기법들을 파인 튜닝하는 내용을 다루려고 한다. 
* 파인 튜닝 (fine-tuning): pretrain한 모델을 우리가 하고자하는 태스크 (downstream task)에 맞게 업데이트하는 과정 

이후 이를 기반으로 한 활용은 머신러닝, 딥러닝 알고리즘과 관련된 내용이다. 
