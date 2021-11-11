---

title: 한국어 형태소 분석 (비지도학습기반) 
description: 실전NLP_두 번째 
slug: 2021-practiceNLP-02
img: not-yet-generated.png
datetime: 2021. 11. 10.
category: NLP
author: 이정윤

---

## 🌊 Introduction

지난번에는 지도학습 기반 한국어 형태소 분석기들을 사용해보고 그 성능을 비교해보았다. 지도학습 기반 형태소 분석기들은 언어 전문가들이 태깅한 형태소 분석 말뭉치로부터 이미 학습된  품사 태깅을 사용하였기 때문에 새롭게 만들어진 미등록 단어들이나 특정 전문 단어들은 잘 인식되지 않은 가능성이 있다. 이때  다른 선택지는 __비지도학습 기반 형태소 분석__ 을 시도하는 것이다.

'비지도학습 기반'은 미리 학습된 모델을 사용하는 것이 아닌 스스로 데이터의 패턴을 학습하여 만든 모델을 기반으로 한다는 것을 의미한다. 즉, 전체 데이터에 자주 등장하는 단어들의 패턴을 파악한 뒤, 그에 따라서 하나의 형태소를 인식한다는 것이다. 

따라서 비지도학습 기반 형태소 분석은 사용하는 말뭉치(corpus)의 크기가 커야하며 내용도 유사한 것들로 구성되어 있어야 한다. 대부분의 Soynlp나 Google sentencepiece 예제에서는 누군가 이미 웹 상에 수집하여 올려놓은 [네이버 영화 리뷰 데이터](https://raw.githubusercontent.com/e9t/nsmc/master/ratings.txt)나, [lovit github](https://github.com/lovit/soynlp)에서 제시하고 있는 뉴스기사 크롤링 데이터를 활용한다.  그러나 해당 스터디의 목표는 '실전nlp' 인만큼, 실제로 형태소 분석 작업이 필요한 말뭉치를 직접 선정하여 실습을 진행해보았다. 따라서 실습 결과 형태소 분석을 완벽하게 구현하지 못할 가능성이 있다.  실습한 전체 코드는 [여기서](https://colab.research.google.com/drive/11OzAFQiXaJvzCq53vkA0ysWyNYRBW62a#scrollTo=ErQw2g0Bcs_K&uniqifier=1) 확인할 수 있다.

참고도서: 한국어임베딩(이기창, 2019) 
참고자료: [미등록단어 문제와 데이터 부족 현상을 해결하기 위한 비지도학습 토크나이저와 추출 기반 문서 요약 기법](https://s-space.snu.ac.kr/handle/10371/161932?mode=full) | [한글 토크나이징 라이브러리 모듈 분석(이재경 외 2명)](https://www.koreascience.or.kr/article/CFKO202121751207238.pdf)

## 🌊사용한 말뭉치

사용한 말뭉치는 지난주와 같이 [문화재청](https://www.cha.go.kr/html/HtmlPage.do?pg=/publicinfo/pbinfo3_0202.jsp&mn=NS_04_04_02) 에서 제공하는 API를 통해 다운받은 '문화재검색 상세'데이터 중 '내용' 부분과 더불어 동일한 국보 리스트에 대한 [위키백과]()의 API로 다운받은 데이터, [한국민족대백과사전]()에서 크롤링한 데이터들을 활용하였다. 

학습용 말뭉치는 라인 하나가 문서가 되도록 처리해주는 것이 좋으므로 해당 데이터들 역시 동일한 방법으로 처리한 뒤, txt 파일로 저장하였다. 이 과정에 대한 설명은 아래의 코드로 대체한다. 
```
import pandas as pd

#data import
df1=pd.read_excel('heritage-spec.xlsx')
df2=pd.read_excel('5차수정-위키피디아 - 1102.xlsx')
df3=pd.read_excel('5차수정-한국민족문화대백과사전_크롤링.xlsx')

#필요 컬럼만
df1=df1['내용']
df2=df2['내용_위키']
df3=df3['내용_한국민족문화대백과사전']

#데이터 합치기
df=pd.concat([df1, df2, df3])
df=pd.DataFrame(df)
df.reset_index(inplace=True, drop=True)

#단락구분 등 공백 제거
contents=[]
for i in df[0]:
	i=' '.join(i.split())
	contents.append(i)
	df=pd.DataFrame(contents)
```
```
#txt로 한 문서를 한 줄씩 저장하기 
f = open("df.txt", 'w')
for i in  range(0, 1059):
	data = df[0].loc[i]
	f.write(data+'\n')
f.close()
```

## 🌊 비지도학습 기반 형태소 분석
비지도학습 기반 형태소 분석기인 Soynlp와 Google sentencepiece를 활용해 해당 말뭉치를 하나씩 분석해보도록 하겠다. 

### 1) Soynlp
soynlp는 형태소 분석, 품사 판별 등을 파이썬에서 지원하는 비지도학습 기반 한국어 자연어 처리 패키지이다. (한국어 임베딩, p102) soynlp의 형태소 분석기는 데이터의 통계량을 확인해 만든 단어 점수표로 작동하는데, 이때의 점수는 __응집확률__ 과 __브랜칭 엔트로피__ 를 활용하여 계산한다. 

<u>응집확률(Cohesion probability)</u>란 특정 문자열이 얼마나 같이(응집하여) 등장하는 지를 판단하는 것인데, 각 문자열을 문자 단위로 분리한 뒤 왼쪽부터 순서대로 문자를 추가하면서 각 문자열이 주어졌을 때 그 다음 문자가 나올 확률을 계산하여 누적곱을 한 값이다. 따라서 그 결과값이 높을 수록 전체 말뭉치에서 하나의 단어로 등장할 확률이 높아지는 것이다. 
<u>브랜칭 엔트로피(Branching Entrophy)</u>란 주어진 문자열에서 다음 문자가 얼마나 등장할 수 있는지를 판단하는 척도이다. 이때 엔트로피값은 불확실성의 정도로 예측할 수 있는 그 다음의 글자를 예측할 수 있는 가능성이 높아질 수록 값은 커진다. 예를 들어, '샌드위치'라는 단어에서 '샌드위' 뒤에는 항상 '치'가 나온다. 따라서 이때의 엔트로피는 0에 가까운 값이 나온다. 반면, '샌드위치' 이라는 단어에서 뒤에 나올 단어는 문맥에 따라 다른 조사가 사용될 수 있으므로 예측 확률이 낮아 엔트로피의 값도 높아진다. 

즉, soynlp에서는 각각의 응집활률과 브랜칭 엔트로피를 곱한 값을 단어의 점수로 부여한다. 이를 계산하는 수식도 있지만, 해당 스터디에서는 개념만 이해하고 넘어가도록 하겠다. 이미 그렇게 계산하여 만든 툴을 사용하기만 하면 되므로! 

추가로, soynlp는 띄어쓰기에 민감하다. 따라서 비교적 띄어쓰기를 부정확하게 하는 한국어 말뭉치를 활용할 때는 PyKoSpacing이나 Py-Hanspell로 올바른 띄어쓰기를 먼저하고 학습과정을 진행하는 것이 좋다. 

참고사이트:  [DS school-Soynlp 소개](https://datascienceschool.net/03%20machine%20learning/03.01.04%20soynlp.html) | [딥러닝을 이용한 자연어처리 입문: 2-10한국어 전처리 패키지](https://wikidocs.net/92961) | [lovit github -soynlp](https://github.com/lovit/soynlp#%ED%95%A8%EA%BB%98-%EC%9D%B4%EC%9A%A9%ED%95%98%EB%A9%B4-%EC%A2%8B%EC%9D%80-%EB%9D%BC%EC%9D%B4%EB%B8%8C%EB%9F%AC%EB%A6%AC%EB%93%A4)

1. 설치하기 
```
!pip install soynlp
```

2. 모듈 (형태소분석기) 설치하기
```
import urllib.request
from soynlp import DoublespaceLineCorpus
from soynlp.word import WordExtractor
```

3. 데이터를 문서로 분리&단어 추출

한 라인을 하나의 문서로 분리하는 작업이다. corpus(말뭉치)의 총 길이는 1059개이다. 
```
corpus = DoublespaceLineCorpus('df.txt')
len(corpus)
```
이후 word_extractor를 사용해서 말뭉치(corpus)를 학습시킨다. 해당 결과는 아래의 사진과 같다. 
```
word_extractor = WordExtractor()
word_extractor.train(corpus)
word_score_table = word_extractor.extract()
```
![wordextrctor](/practiceNLP/wordextrctor.png)

4. 토큰화 
전체 말뭉치를 통해 학습시킨 모델에 토큰화를 하고 싶은 문장을 넣어 제대로 결과를 도출하는지 확인한다. 토큰화를 하는 방법은 __L tokenizer__ 와 __MaxScoreTokenizer__ 등이 있다. 

4.1 L tokenizer
 L tokenizer는 여러 가지 길이의 L 토큰의 점수를 비교하여 가장 점수 가 높은 L단어를 찾는 것을 말한다. 예를 들어 '샌드위치를'은 '샌드위치'인 L 토큰과 '를'인 R토큰으로 나눌 수 있다. 즉, L tokenizer는 L(체언, 용언 등)+R(조사, 용언 등)토큰으로 나두고 분리 기준을 점수가 가장 높은 L 토큰을 찾아내는 원리를 가진다는 것이다. [(출처)](https://wikidocs.net/92961)
 
```
from soynlp.tokenizer import LTokenizer

scores = {word:score.cohesion_forward for word, score in word_score_table.items()}
l_tokenizer = LTokenizer(scores=scores)
l_tokenizer.tokenize("조선시대 한양도성의 정문으로 남쪽에 있다고 해서 남대문이라고도 불렀다.", flatten=False)
```

![l-tokenizer](/practiceNLP/l-tokenizer.png)     


4.2 MaxScoreTokenizer (최대 점수 토크나이저) 
최대 점수 토크나이저는 띄어쓰기가 되지 않는 문장에서 점수가 높은 글자 시퀀스를 순차적으로 찾아내는 토크나이저이다. 따라서 토큰화를 진행할 문장은 띄어쓰기가 되어 있지 않아야 한다. 
```
from soynlp.tokenizer import MaxScoreTokenizer

maxscore_tokenizer = MaxScoreTokenizer(scores=scores)
maxscore_tokenizer.tokenize("조선시대한양도성의정문으로남쪽에있다고해서남대문이라고도 불렀다.")
```
![maxscore-tokenizer](/practiceNLP/maxscore-tokenizer.png)


L tokenizer와 MaxScoreTokenizer는 조금 다른 결과값을 도출하지만, 둘다 완벽한 토큰화를 하진 못한다. 이는 앞서 언급했듯 학습한 말뭉치의 단어수, 문서수가 적었기 때문인 것 같다. [예제](https://wikidocs.net/92961)에서는 약 36만 이상의 단어를 학습했다. 문서의 양이 많지 않은 한, 정확한 학습을 하지 못하니 해당 분석기를 사용하기는 어려울 것 같다. 

만약 문서 혹은 단어의 양이 많아서 정확한 학습이 진행된 단어 사전을 구축했다면 품사 판별기를 만들 수도 있다. 그러나 해당 스터디에서는 단어 사전을 구축하지 못했으므로 이 과정에 대한 실습은 넘어가도록 하겠다. 이와 관련한 추가적인 설명은 [여기](https://github.com/lovit/soynlp)에서 확인할 수 있다. 


### 2) Google sentencepiece
구글 센텐스피스는 구글에서 만든 비지도학습 기반 형태소 분석기이다. 센텐스피스는 Subword 분절 방식을 적용한 BPE기법을 활용하며, 파라미터들을 어떻게 설정하는 지에 따라 결과가 달라진다. 이때 __Subword 분절방식__ 이란 한 단어를 다시 작은 의미 단위로 또갠다는 것인데 예를들어, '학습'은 '배우고(학)', '익힌다(습)'라는 두가지의 의미로 나누어 인식한다. 이 원리를 적용한 것이 바로 __BPE (Byte Pair Encoding)__ 이다. BPE는 쉽게 말해, 신조어나 처음 보는 단어들이 많아도 다른 단어의 subword를 활용해 해석할 수 있도록 하는 기법인데 최근 Transformer, BERT등에서 사용된다고 한다. 이보다 더 깊은 개념적 부분은 [이 사이트](https://wikidocs.net/22592)를 참고해서 학습하도록 하고 넘어가겠다. 

구글 센텐스피스에 대한 한국어 자료나 예제가 적어 참고할 자료가 많지 않았지만, 공식 사이트와 블로그를 참고해서 실습을 진행해보았다. 

참고사이트 및 블로그: [Google Sentencepiece GitHub](https://github.com/google/sentencepiece) | [Reinforce NLP](https://paul-hyun.github.io/vocab-with-sentencepiece/) | [구글 센텐스피스 사용법](https://choice-life.tistory.com/12) | [Subword분절법](https://lsjsj92.tistory.com/600) | [위키독스-subword tokenizer](https://wikidocs.net/86657)

1. 설치하기 
```
! pip install sentencepiece
```
2. 모듈 설치하기 
```
import sentencepiece as spm
```

3. Vocab 만들기 
코드및 설명은 [이 블로그](https://paul-hyun.github.io/vocab-with-sentencepiece/)에서 참고하였다.
```
corpus = "df.txt"
prefix = "heritage" #저장할 모델 이름
vocab_size = 80000

#학습하기 
spm.SentencePieceTrainer.train(
    f"--input={corpus} --model_prefix={prefix} --vocab_size={vocab_size + 7}" + 
    " --model_type=bpe" +
    " --max_sentence_length=999999" + # 문장 최대 길이
    " --pad_id=0 --pad_piece=[PAD]" + # pad id값(0)
    " --unk_id=1 --unk_piece=[UNK]" + # unknown id값(1)
    " --bos_id=2 --bos_piece=[BOS]" + # begin of sequence token id값(2)
    " --eos_id=3 --eos_piece=[EOS]" + # end of sequence id값(3)
    " --user_defined_symbols=[SEP],[CLS],[MASK]") # 사용자 정의 토큰
```
vocab_size는 커질수록 성능이 좋아진다고 한다. 이 코드를 실행하면 'heritage.model'과 'heritage.vocab' 두 파일이 만들어진다. 

5. 테스트 해보기 
```
vocab_file = "heritage.model"
vocab = spm.SentencePieceProcessor()
vocab.load(vocab_file)
  
lines = [
"조선시대 한양도성의 정문으로 남쪽에 있다고 해서 남대문이라고도 불렀다.",
"원각사는 지금의 탑골공원 자리에 있었던 절로, 조선 세조 11년(1465)에 세웠다.",
"신라 진흥왕(재위 540∼576)이 세운 순수척경비(巡狩拓境碑) 가운데 하나로, 한강유역을 영토로 편입한 뒤 왕이 이 지역을 방문한 것을 기념하기 위하여 세운 것이다."
]

for line in lines:
pieces = vocab.encode_as_pieces(line)
ids = vocab.encode_as_ids(line)
print(line)
print(pieces)
print(ids
print()
```
![google-sentencepiece](/practiceNLP/google-sentencepiece.png)

soynlp와 같이, 구글 센텐스피스로 학습한 모델고 정교한 형태소 분석을 하지 못한다. 한국어(교착어이며 띄어쓰기가 어려움)라는 한계도 존재하고, 학습에 사용된 말뭉치 양도 문제가 될 수 있다. 


## 🌊 Future tasks

이번 실습에서는 임베딩 이전 작업인 전처리 단계 중 
* 데이터 전처리 (말뭉치)
* 비지도 학습 기반 형태소 분석 
	* Soynlp
	* Google sentencepiece

에 대해서 진행하였다. 이후 키워드 추출과 관련해서 KR-wordrank나 
soykeyword를 추가로 더 학습해볼 예정이다. 

이것으로 한국어 임베딩을 시작할 준비는 모두 마쳤다. 다음 시간부터는 앞서 전처리한 데이터들을 바탕으로 본격적으로 __임베딩__ 에 대해서 하나씩 알아보려 한다. 
