---
title: nlp-intro
description: 자연어 처리의 기본 개념을 배워봅시다!
slug: nlp-intro
img: not-yet-generated.png
datetime: 2021. 10. 01.
category: NLP
author: 정 찬

---



이번 주에는 스크래피와 봄에 배운 딥러닝과 자연어 처리를 갈무리했습니다. 다시 보아도 탁 와닿는 설명이 아니더군요. 그래서 먼저 **자연어 처리**가 무엇이다! 하고 말할 수 있도록 최대한 쉽게 설명한 글을 써야겠다고 마음을 먹었습니다.



## 1. 그래서 자연어 처리Natural Language Processing가 뭔가요?



우리는 **언어**를 사용해 생각이나 느낌을 전달합니다. 생각이 전해진다니 놀라운 일이죠. 언어 덕분에 우리는 서로 감정을 나누고, 지식을 전달하기도 합니다. 오늘은 우리가 자연스레 사용하는 언어를 컴퓨터는 어떻게 인식하는지, 어떻게 하면 데이터로 만들어 분석할 수 있을지 가볍게 개론 공부를 해보려고 합니다.

기억이 잘 나지는 않으시겠지만 언어 공부를 처음 할 때를 떠올려 봅시다. 영어는 알파벳, 한국어는 자음(ㄱㄴㄷㄹ)과 모음(ㅏㅑㅓㅕ) 부터 배우죠. 이러한 **문자열character**들이 모여 **음절syllable**이 되고, 나아가 **단어word**가 됩니다. 음절은 쉽게 말해 어떤 소리 마디라고 생각하시면 됩니다. 발음했을 때 한 글자가 음절이 됩니다.

예를 들어 볼까요? 박준 시인의 '삼월의 나무' 중 일부인데요 

> *불을 피우기 미안한 저녁이 삼월에는 있다* 

라는 **문장**이 있습니다. **단어word**의 집합인 문장을 소리내서 읽으면 

> [부/를/ 피/우/기/ 미/아/난/ 저/녀/기/ 사/뭐/레/는/ 이/따/]

라는 **음절syllable**이 됩니다.

첫 문장은 총 17 음절을 가진 문장이 됩니다. 그 중 ''저녁''이라는 **단어word**는 2개의 음절이고, **문자열character**은 "ㅈ, ㅓ, ㄴ, ㅕ, ㄱ"이 됩니다. 굉장히 복잡한 조합이죠. 초성 19개, 중성 21개, 종성 27(+1)개를 조합해 현대 한글에서 표현할 수 있는 글자는 11,172개입니다. 한 글자, 두 글자, 세 글자 점점 늘어가면서 더 많은 발음이 가능해집니다. 물론 우리가 사용하는 단어는 그 중 일부지만요.



지금까지 말씀 드린 **언어**는 어떠한 처리도 되지 않았다는 의미에서 **자연어Natural Language**라고 부릅니다. 반면, 컴퓨터가 알아들을 수 있도록 처리하는 작업을 **자연어 처리Natural Language Processing**라고 하죠.

- **자연어(natural language)**: 일상 생활에서 사용하는 언어
- **자연어 처리(natural language processng)**: 자연어의 의미를 분석하여 컴퓨터가 처리할 수 있도록 하는 일



그렇다면 컴퓨터는 어떻게 생겨먹었길래 우리의 말과 글을 굳이 처리해 줘야 할까요? 컴퓨터는 기본적으로 **계산기**이기 때문입니다. 중고등학교 때 배웠던 2진수 기억하시나요? 0과 1로 이루어져 숫자를 표현했었습니다. 컴퓨터도 0과 1로 연산해 모든 것을 표현합니다. 지금 보시고 있는 이 글도 unicode와 같이 0과 1로 이루어진 몇번째 숫자에 해당하는 **문자열character**이 조합된 결과랍니다. 이미지도 마찬가지죠. 0과 1로 검다, 희다, 어느 정도 푸르다, 얼마나 붉다 등의 정보를 조합해 픽셀로서 색과 명암을 표시해 고양이 사진이 된답니다.

이렇게 이진법, 0과 1로 계산하는 시스템을 **디지털digit + tal**이라고 합니다.

> 사람과 다르게 컴퓨터는 0과 1, 즉 이진digit의 숫자로 세상을 이해합니다.

여기까지 왜 자연어 처리를 하는지 간단하게 알아 봤습니다.



## 2. 그래서 자연어 처리Natural Language Processing는 어떻게 하나요?

그렇다면 자연어를 어떻게 컴퓨터가 이해할 수 있도록 만들어 줄 수 있을까요? 컴퓨터는 숫자로 작동한다고 했고.. 0과 1로 연산한다고 했으니.. 💡 **단어를 0과 1로 표현**해주면 되지 않을까요?!

그렇다면 가지고 있는 데이터에 따라 단어의 양이 달라지겠군요. 아까의 문장 *"불을 피우기 미안한 저녁이 삼월에는 있다"* 를 다시 가져와 봅시다. 일단 한글의 형태소는 고려하지 않고 **단어word**를 기준으로 구분한다면 다음과 같은 list로 만들 수 있습니다.

`["불을", "피우기", "미안한", "저녁이", "삼월에는", "있다"]`

list는 indexing이 가능하죠? 그렇다면 "불을"은 0, "피우기"는 1. 이런식으로 **정수 인덱싱**이 될겁니다.

**앗, 구분하는거 어디서 다른 말로 들어본 것 같은데.. 토...**

혹시 **토큰** 아닌가요? token은 동전, 즉 어떤 **기준**을 의미합니다. 따라서 자연어처리에서 tokenization은 단어, 단어구, 문자열 등등으로 나누는 기능을 의미합니다. 즉, 벡터화 할 때 우리는 이미 token화 했던거죠! 

그리고 이렇게 모은 단어들을 **vocabulary**라고 합니다.



보통 교재에서는 이 타이밍에 뜬금 없이 **벡터vector**로 표현하려고 합니다.

---

**잠깐! 왜 벡터vector화 하는건가요?**

왜 벡터로 표현할까요? 바로 숫자 계산을 하기에 벡터나 **행렬matrix** 형태가 월등히 빠르기 때문입니다. 컴퓨터의 연산은 크게 cpu와 gpu로 나뉘어 이루어지는데요. 비유하자면 cpu는 직렬, gpu는 병렬 연결 같은 느낌입니다. 둘 다 똑같이 0과 1로 된 연산을 처리하지만 cpu는 어려운 계산을 파바바바박 계산하는 전문가, gpu는 간단한 작업을 여럿이서 수행하는 공장이라고 생각하시면 될 것 같아요. 어려운 문제를 해결할 때는 전문가cpu가 빠르겠죠? 하지만 덧셈 문제 1억개를 전문가가 푸는 것과 일반인 1000명이 푸는데 걸리는 시간은 아무리 천재라도 일반인 1000명이 빠를겁니다. 한 사람당 100개씩만 풀면 되니까요😄

---

**어간stem과 어미ending, 그리고 한국어 자연어 처리의 어려움**

엇! 맨 처음에 토큰화 한 것과 Okt 토큰화가 조금 다르네요! 혹시 왜 그런지 눈치 챈 사람 손!!

네. 제가 앞에서 살짝 '형태소'를 언급했었는데요. 한국어는 의미를 나타내는 **어간stem**에 **어미ending**에 들러붙어서 변형시키기 때문에 딱딱 떨어지게 분리하기 어렵습니다. "사과를 먹다"에서 "먹다"는 먹(어간) + 다(어미)로 규칙적으로 구분됩니다. 하지만 한국어에는 불규칙 활용이라는 무시무시한 존재가 있죠!😈



**불규칙 활용의 예**

1. **어간의 형식이 달라지는 경우**: ‘듣-, 돕-, 곱-, 잇-, 오르-, 노랗-’ 등이 ‘듣/들-, 돕/도우-, 곱/고우-, 잇/이-, 올/올-, 노랗/노라-’
2. **일반적인 어미가 아닌 특수한 어미를 취하는 경우**: ‘오르+ 아/어→올라, 하+아/어→하여, 이르+아/어→이르러, 푸르+아/어→푸르러’

반면 영어는 주욱 늘여서 쓰기 때문에 초성, 중성, 종성, 불규칙 활용으로부터 비교적 자유롭습니다. 마치 영어는 드레싱 없는 샐러드에 무엇이 들었나 보는 상황.. 한국어는 열과 압력으로 찐 호빵에 무엇이 어떻게 들었는지 분석하는 상황과 비슷합니다😭

---

- **벡터화vectorization** to **원-핫 인코딩One-Hot Encoding**

자 다시 돌아와서 아까 정수로 인덱싱 해 준 문장을 벡터화 해볼까요? 먼저 1행 n열짜리 위 아래로 길쭉한 벡터를 **단어word**별로 만들어 봅시다. 각 단어의 인덱스에 1을, 나머지 인덱스에는 0을 부여해 봅시다. 단어가 총 6개였으니까 벡터의 차원n은 6이 되겠군요!

> 1) 각 단어에 고유한 정수 인덱스 부여(정수 인코딩)
> 2) 표현할 단어 '인덱스 위치'에 1값을 부여하고, 나머지 위치에는 0값 부여

`{"불을":0, "피우기":1, "미안한":2, "저녁이":3, "삼월에는":4, "있다":5}`

그럼 간단하게 KoNLPy 패키지 중 Okt 모듈로 **토큰화**를 해볼까요?

`from konlpy.tag import Okt  
okt=Okt()  
token=okt.morphs("불을 피우기 미안한 저녁이 삼월에는 있다.")  
print(token)`

```python
['불', '을', '피우기', '미안한', '저녁', '이', '삼월', '에는', '있다', '.']
```

이번에는 **인덱스**를 부여해 봅시다.

> `word2index={}
> for voca in token:
>     if voca not in word2index.keys():
>         word2index[voca]=len(word2index)
> print(word2index)`

```{'불': 0, '을': 1, '피우기': 2, '미안한': 3, '저녁': 4, '이': 5, '삼월': 6, '에는': 7, '있다': 8, '.': 9}```

**원-핫 벡터를 만드는 함수**를 만든다면 다음과 같겠네요.

> `def one_hot_encoding(word, word2index):
>     one_hot_vector = [0]*(len(word2index))
>     index=word2index[word]
>     one_hot_vector[index]=1
>     return one_hot_vector`
>
> `one_hot_encoding("삼월",word2index)`

​		`[0, 0, 0, 0, 0, 0, 1, 0, 0, 0]`

'불'은 `[1, 0, 0, 0, 0, 0, 0, 0, 0, 0]`,

'을'은 `[0, 1, 0, 0, 0, 0, 0, 0, 0, 0]` 

지금은 행벡터지만 이런 식으로 위 아래로 긴 열벡터가 만들어질겁니다. 행벡터든 열벡터든 모으면..? 

`[[1, 0, 0, 0, 0, 0, 0, 0, 0, 0]`

`[0, 1, 0, 0, 0, 0, 0, 0, 0, 0]`

`[0, 0, 1, 0, 0, 0, 0, 0, 0, 0]`

`[0, 0, 0, 1, 0, 0, 0, 0, 0, 0]`

`[0, 0, 0, 0, 1, 0, 0, 0, 0, 0]`

`[0, 0, 0, 0, 0, 1, 0, 0, 0, 0]`

`[0, 0, 0, 0, 0, 0, 1, 0, 0, 0]`

`[0, 0, 0, 0, 0, 0, 0, 1, 0, 0]`

`[0, 0, 0, 0, 0, 0, 0, 0, 1, 0]`

`[0, 0, 0, 0, 0, 0, 0, 0, 0, 1]]`

이런 느낌의 9행 9열의 단위행렬이 됩니다!!!!





## 3.  통계적 방법론: 빈도frequency 중심

이런 식으로 사용된 단어 모음을 **corpus**라고 합니다. 그리고 통계적 방법론에서는 그 문장, 글 전체에서 많이 반복되는 단어가 중요하고, 덜 나오면 덜 중요하다고 생각합니다. 즉, 빈도=중요도로 인식합니다. 대표적인 방법론으로 **Bag-of-Words(BoW), N-gram, Tf-idf vector**가 있습니다.

- **Bag-of-Words(BoW)**

말 그대로 가방 안에 단어들을 넣고 섞어버렸습니다. 즉, 단어의 순서를 고려하지 않고, **빈도만 고려**합니다. 

1) 각 단어에 고유한 정수 인덱스 부여
2) 각 인덱스 위치에 단어 토큰의 등장 횟수frequency가 기록된 벡터 만들기

아까는 단위행렬이었다면, 이번에는 (0,n)짜리 벡터가 만들어질 겁니다. 값은 단어가 중복되는 만큼 각 단어의 인덱스 위치에 들어가겠죠.



> `from sklearn.feature_extraction.text import CountVectorizer`
> `from nltk.corpus import stopwords`
>
> `sentence = "Slip inside the eye of your mind. Don't you know you might find A better place to play You said that you'd never been But all the things that you've seen Slowly fade away So I start a revolution from my bed 'Cause you said the brains I had went to my head Step outside, summertime's in bloom Stand up beside the fire place Take that look from off your face You ain't ever gonna burn my heart out And so Sally can wait She knows it's too late As we're walking on by Her soul slides away But don't look back in anger I heard you say Take me to the place where you go Where nobody knows If it's night or day But please don't put your life in the hands Of a rock and roll band Who'll throw it all away I'm gonna start a revolution from my bed 'Cause you said the brains I had went to my head Step outside 'cause summertime's in bloom Stand up beside the fireplace Take that look from off your face 'Cause you ain't ever gonna burn my heart out And so Sally can wait She knows it's too late As she's walking on by My soul slides away But don't look back in anger I heard you say So Sally can wait She knows it's too late As we're walking on by Her soul slides away But don't look back in anger I heard you say So Sally can wait She knows it's too late As she's walking on by My soul slides away But don't look back in anger Don't look back in anger I heard you say At least not today"`
>
> `courpus = sentence.lower()`
> `sw = stopwords.words("english")`
> `vect = CountVectorizer(stop_words =sw)`
> `print(vect.fit_transform(corpus).toarray())` 
> `print(vect.vocabulary_)`

```python
[[1 1 1 1 1 1 1 1 1 1 1 1 1]]
{'sally': 7, 'wait': 11, 'knows': 4, 'late': 5, 'walking': 12, 'soul': 10, 'slides': 9, 'away': 1, 'look': 6, 'back': 2, 'anger': 0, 'heard': 3, 'say': 8}
```

이 글에서는 모두 한번씩만 나오나 보군요! 만약 say가 3번 나왔다면 [[1,1,1,1,1,1,1,1,3,1,1,1,1]] 같은 모양이 될겁니다.

- **N-gram**

n-gram은 연속된 n개의 단어 뭉치를 같이 고려합니다. 예를 들어 *"불을 피우기 미안한 저녁이 삼월에는 있다"* 는 문장에 대해 n=2인 bi-gram은 [불을 피우기, 피우기 미안한, 미안한 저녁이, 저녁이 삼월에는, 삼월에는 있다] 이런 식으로 2 단어를 같이 고려합니다. 단어의 순서나 일종의 phrase도 함께 고려할 수 있습니다.

물론 n-gram도 단어 수가 많아지면 vocabulary가 커지는 문제가 발생합니다.

- **Tf-idf vector**

Tf-idf는 단어 간 빈도수에 따라 중요도를 계산해 고려하는 방법입니다. the, a, is, she 같은 관사, 대명사는 글에 자주 나오지만, 주제와는 관련 없(stopword)을 수도 있습니다.

> term frequency(tf): 현재 문서(문장)에서 단어의 빈도수

> document frequency(df): 이 단어가 나오는 문서(문장)의 총 개수

앞서 언급한 관사, 대명사는 tf, df 모두 높겠죠? 하지만 중요한 단어들은 tf가 높을 수는 있지만, df는 상대적으로 낮을 수 있습니다.

tf-idf score 계산 수식은 다음과 같습니다.

![tf-idf_score](./nlp-intro/tf-idf_score.png)

이때 N은 전체 document 개수를 의미합니다. df는 분모에 등장하기 때문에 inverse document frequency(idf)라고 합니다.

로그를 사용하면 몇 천, 몇 만 개의 단어를 양 손, 양 발가락 정도 스케일에서 idf를 계산할 수 있어서 편리합니다:) 오늘은 개론이기 때문에 코드 구현은 건너 띄겠습니다.



여기까지 통계적 방법론으로 자연어 처리하는 방법을 배워봤습니다. 하지만 영 찜찜하시죠? 통계적 방법에는 한계가 있고, 더 좋은 모델들이 계속 나오고 있기 때문입니다.



- **통계적 방법론의 한계**

1. **단어의 개수가 늘어날 수록 벡터의 크기(차원)이 커진다!**

   문장 스케일의 차원이 9정도라면, 단락, 글, 논문, 도서, 댓글 크롤링한 스케일은 훨씬 더 커지겠죠? 물론 중복되는 단어는 제외되겠지만 이렇게 되면 몇 천, 몇 만개의 차원을 갖는 벡터지만, 거의 대부분이 0으로 가득한 데이터를 갖게 될겁니다. 0을 곱하는 무의미한 연산을 반복하는 문제가 생깁니다. 즉, **희소 행렬sparse matrix**이 되는 문제가 생깁니다.

2. **단어 사이의 유사도를 알 수 없다!**

   생물학 시간에 배운 것처럼 개는 늑대와 친척이고, 고양이는 호랑이와 친척입니다. 하지만 통계적 방법론에서는 각각이 따로따로이기 때문에 유사한지 알 방법이 없습니다. 개, 늑대, 고양이, 호랑이는 모두 그냥 각각의 단어일 뿐입니다. 자동차, 차, 전기차, 경유차, 휘발유차, 트럭, 트렉터 등의 유사도도 전혀 알 수 없습니다.

3. **순서가 중요한 문제에는 사용하기 힘들다!**

---



## 4. 그럼 저는 어떻게 해야 할까요?😂

걱정하지 마세요! 이런 한계를 두고 절망하지 않은 사람들이 **딥러닝**을 활용해서 자연어처리 하는 방법을 만들어 놨으니까요! 말로만 듣던 딥러닝, 막상 공부해 보면 그렇게 어렵지 않답니다. (공부를 열심히 한다는 가정 하에..?) 제가 틈틈이 자연어처리, 자연어 처리 기법에 대해서 쉽게 풀어 쓸테니 많은 관심 부탁드립니다.

물론 코드 공부도 소홀히 하진 않을께요😎

그럼 다음에 또 만나요~