---

title: 교통·문화·통신 빅데이터 플랫폼 융합 분석 경진대회 내용
description: DACON에서 주관하는 교통·문화·통신 빅데이터 플랫폼 융합 분석 경진대회에 참가하였을 때 제출한 내용을 바탕으로 작성하였습니다.
slug: bigdata-2nd
img: not-yet-generated.png
datetime: 2021. 11. 27.
category: Data Analysis
author: 코코넛 팀

---

# 목차

## 1. 문제의식

### - 짙어져가는 여행에 대한 갈증

### - 위드코로나 시대의 여행은 어떤 키워드를 가질까?

## 2. 정책 제안 : 꽃싱이를 활용해 전주시의 관광을 다시 일으켜세우자

### (자전거대여소 위치선정하기)

### - 수요

### - 접근성

### - 최종 입지 선정 및 제언

## 3. 기대효과 : 지역경제 활성화



# 전주시 유동인구 전처리

본격적인 분석에 들어가기 앞서, 분석에 사용된 데이터를 전처리하였습니다.
코로나 전후 전주시의 유동인구가 어떻게 변화했는지 알아보기 위해 전주역과 전주시 근처 톨게이트 교통량 데이터를 사용했습니다.

```import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
%matplotlib inline
import seaborn as sns
from matplotlib import rcPa

rams!pip install googlemaps
import googlemaps
import folium
from tqdm import tqdm_notebook
gmaps_key = "*******************************"
gmaps = googlemaps.Client(key=gmaps_key)
```

```
import platform
from matplotlib import font_manager, rc
path = "C:/Windows/Fonts/malgun.ttf"
if platform.system() == 'Darwin':
    rc('font', family='AppleGothic')
elif platform.system() == 'Windows':
    font_name = font_manager.FontProperties(fname=path).get_name()
    rc('font', family=font_name)
else:
    print('Unknown system... sorry~~~~')
```

```#19년,20년 역별 승하차 실적 csv파일 불러오기
station19 = pd.read_csv('역별 승하차실적_2019.csv', encoding='utf-8',thousands=',')
station20 = pd.read_csv('역별 승하차실적_2020.csv', encoding='utf-8',thousands=',')
#'정착역'칼럼이 '전주'값만 가져오기 
station19_jeonju = station19[station19['정차역']=='전주']
station20_jeonju = station20[station20['정차역']=='전주']
#필요한 칼럼만 남기기
station19_jeonju_off = station19_jeonju.drop(['운행영업일단계','주운행선','상행하행구분','역무열차종','메트릭','승차인원수'],1)
station20_jeonju_off = station20_jeonju.drop(['운행영업일단계','주운행선','상행하행구분','역무열차종','메트릭','승차인원수'],1)
station19_jeonju_off.groupby('운행일자').sum().head()
station20_jeonju_off.groupby('운행일자').sum().head()
station19_jeonju_off['운행일자'] = station19_jeonju_off['운행일자'].str.replace('년', '-')
station19_jeonju_off['운행일자'] = station19_jeonju_off['운행일자'].str.replace('월 ', '-')
station19_jeonju_off['운행일자'] = station19_jeonju_off['운행일자'].str.replace('일', '')
station20_jeonju_off['운행일자'] = station20_jeonju_off['운행일자'].str.replace('년', '-')
station20_jeonju_off['운행일자'] = station20_jeonju_off['운행일자'].str.replace('월 ', '-')
station20_jeonju_off['운행일자'] = station20_jeonju_off['운행일자'].str.replace('일', '')

#'운행일자'칼럼 datetime으로 바꾼 뒤 '월'칼럼 추가하기 
station19_jeonju_off['운행일자'] = pd.to_datetime(station19_jeonju_off['운행일자'])
station19_jeonju_off['월'] = station19_jeonju_off['운행일자'].dt.strftime('%m')
station20_jeonju_off['운행일자'] = pd.to_datetime(station20_jeonju_off['운행일자'])
station20_jeonju_off['월'] = station20_jeonju_off['운행일자'].dt.strftime('%m')
#19년,20년 월별 전주역에 하차한 인원수
station19_jeonju_off_month = station19_jeonju_off.groupby('월').sum()
station19_jeonju_off_month.rename(columns = {'하차인원수': '19년'}, inplace=True)
station20_jeonju_off_month = station20_jeonju_off.groupby('월').sum()
station20_jeonju_off_month.rename(columns = {'하차인원수': '20년'}, inplace=True)
station19_jeonju_off_month_re = station19_jeonju_off_month.reset_index()
station20_jeonju_off_month_re = station20_jeonju_off_month.reset_index()

#19년 1분기(1~3월) 톨게이트데이터 불러오기
tollgate19_1 = pd.read_csv('19년1분기톨게이트교통량.csv', encoding='cp949',thousands=',')
#'집계일자'칼럼 int에서 datetime으로 변경
tollgate19_1['집계일자'] = tollgate19_1['집계일자'].astype(str)
tollgate19_1['집계일자'] = pd.to_datetime(tollgate19_1['집계일자'])
tollgate19_1['집계일자'] = tollgate19_1['집계일자'].dt.tz_localize('UTC')
tollgate19_1['월'] = tollgate19_1['집계일자'].dt.month
tollgate19_1 = tollgate19_1.drop(['집계일자'],1) #'일자'칼럼 제거
#필요하지 않은 칼럼 제거
tollgate19_1 = tollgate19_1.drop(['영업소코드','입출구구분코드','TCS하이패스구분코드',
                                  '고속도로운영기관구분코드','고속도로운영기관명',
                                  '영업형태구분코드','영업형태명','1종교통량',
                                  '2종교통량','3종교통량','4종교통량','5종교통량','6종교통량'],1)
#입출구명칼럼에서 입구(들어온차량)만 뽑고, 영업소명에서도 전주,동전주,서전주,완주 값만 뽑기
condition = ((tollgate19_1.영업소명 == '전주') | (tollgate19_1.영업소명 == '동전주') | (tollgate19_1.영업소명 == '서전주') | (tollgate19_1.영업소명 == '완주')) & (tollgate19_1.입출구명 == '입구')
tollgate19_1_jeonju = tollgate19_1[condition]
#1~3월 전주근처톨게이트 교통량
tollgate19_1_jeonju_month = tollgate19_1_jeonju.groupby('월').sum()
#이하 위 19년 1분기 코드와 동일한 과정
tollgate19_2 = pd.read_csv('19년2분기톨게이트교통량.csv', encoding='cp949',thousands=',')
tollgate19_2['집계일자'] = tollgate19_2['집계일자'].astype(str)
tollgate19_2['집계일자'] = pd.to_datetime(tollgate19_2['집계일자'])
tollgate19_2['집계일자'] = tollgate19_2['집계일자'].dt.tz_localize('UTC')
tollgate19_2['월'] = tollgate19_2['집계일자'].dt.month
tollgate19_2 = tollgate19_2.drop(['집계일자'],1) #'일자'칼럼 제거
tollgate19_2 = tollgate19_2.drop(['영업소코드','입출구구분코드','TCS하이패스구분코드',
                                  '고속도로운영기관구분코드','고속도로운영기관명',
                                  '영업형태구분코드','영업형태명','1종교통량',
                                  '2종교통량','3종교통량','4종교통량','5종교통량','6종교통량'],1)
condition = ((tollgate19_2.영업소명 == '전주') | (tollgate19_2.영업소명 == '동전주') | (tollgate19_2.영업소명 == '서전주') | (tollgate19_2.영업소명 == '완주')) & (tollgate19_2.입출구명 == '입구')
tollgate19_2_jeonju = tollgate19_2[condition]
#4~6월 전주근처톨게이트 교통량
tollgate19_2_jeonju_month = tollgate19_2_jeonju.groupby('월').sum()
tollgate19_3 = pd.read_csv('19년3분기톨게이트교통량.csv', encoding='cp949',thousands=',')
tollgate19_3['집계일자'] = tollgate19_3['집계일자'].astype(str)
tollgate19_3['집계일자'] = pd.to_datetime(tollgate19_3['집계일자'])
tollgate19_3['집계일자'] = tollgate19_3['집계일자'].dt.tz_localize('UTC')
tollgate19_3['월'] = tollgate19_3['집계일자'].dt.month
tollgate19_3 = tollgate19_3.drop(['집계일자'],1) #'일자'칼럼 제거
tollgate19_3 = tollgate19_3.drop(['영업소코드','입출구구분코드','TCS하이패스구분코드',
                                  '고속도로운영기관구분코드','고속도로운영기관명',
                                  '영업형태구분코드','영업형태명','1종교통량',
                                  '2종교통량','3종교통량','4종교통량','5종교통량','6종교통량'],1)
condition = ((tollgate19_3.영업소명 == '전주') | (tollgate19_3.영업소명 == '동전주') | (tollgate19_3.영업소명 == '서전주') | (tollgate19_3.영업소명 == '완주')) & (tollgate19_3.입출구명 == '입구')
tollgate19_3_jeonju = tollgate19_3[condition]
#7~9월 전주근처톨게이트 교통량
tollgate19_3_jeonju_month = tollgate19_3_jeonju.groupby('월').sum()
tollgate19_4 = pd.read_csv('19년4분기톨게이트교통량.csv', encoding='cp949',thousands=',')
tollgate19_4['집계일자'] = tollgate19_4['집계일자'].astype(str)
tollgate19_4['집계일자'] = pd.to_datetime(tollgate19_4['집계일자'])
tollgate19_4['집계일자'] = tollgate19_4['집계일자'].dt.tz_localize('UTC')
tollgate19_4['월'] = tollgate19_4['집계일자'].dt.month
tollgate19_4 = tollgate19_4.drop(['집계일자'],1) #'일자'칼럼 제거
tollgate19_4 = tollgate19_4.drop(['영업소코드','입출구구분코드','TCS하이패스구분코드',
                                  '고속도로운영기관구분코드','고속도로운영기관명',
                                  '영업형태구분코드','영업형태명','1종교통량',
                                  '2종교통량','3종교통량','4종교통량','5종교통량','6종교통량'],1)
condition = ((tollgate19_4.영업소명 == '전주') | (tollgate19_4.영업소명 == '동전주') | (tollgate19_4.영업소명 == '서전주') | (tollgate19_4.영업소명 == '완주')) & (tollgate19_4.입출구명 == '입구')
tollgate19_4_jeonju = tollgate19_4[condition]
#10~12월 전주근처톨게이트 교통량
tollgate19_4_jeonju_month = tollgate19_4_jeonju.groupby('월').sum()

#19년 1~12월 전주 근처 톨게이트 교통량
tollgate19_jeonju_month  = pd.concat([tollgate19_1_jeonju_month, tollgate19_2_jeonju_month,
           tollgate19_3_jeonju_month,tollgate19_4_jeonju_month], axis = 0)
tollgate19_jeonju_month.rename(columns = {'총교통량': '19년교통량'}, inplace=True)

#20년 1분기(1~3월) 톨게이트데이터 불러오기
tollgate20_1 = pd.read_csv('20년1분기톨게이트교통량.csv', encoding='cp949',thousands=',')

#'집계일자'칼럼 int에서 datetime으로 변경
tollgate20_1['집계일자'] = tollgate20_1['집계일자'].astype(str)
tollgate20_1['집계일자'] = pd.to_datetime(tollgate20_1['집계일자'])
tollgate20_1['집계일자'] = tollgate20_1['집계일자'].dt.tz_localize('UTC')
tollgate20_1['월'] = tollgate20_1['집계일자'].dt.month
tollgate20_1 = tollgate20_1.drop(['집계일자'],1) #'일자'칼럼 제거

#필요하지 않은 칼럼 제거
tollgate20_1 = tollgate20_1.drop(['영업소코드','입출구구분코드','TCS하이패스구분코드',
                                  '고속도로운영기관구분코드','고속도로운영기관명',
                                  '영업형태구분코드','영업형태명','1종교통량',
                                  '2종교통량','3종교통량','4종교통량','5종교통량','6종교통량'],1)

#입출구명칼럼에서 입구(들어온차량)만 뽑고, 영업소명에서도 전주,동전주,서전주,완주 값만 뽑기
condition = ((tollgate20_1.영업소명 == '전주') | (tollgate20_1.영업소명 == '동전주') | (tollgate20_1.영업소명 == '서전주') | (tollgate20_1.영업소명 == '완주')) & (tollgate20_1.입출구명 == '입구')
tollgate20_1_jeonju = tollgate20_1[condition]
#1~3월 전주근처톨게이트 교통량
tollgate20_1_jeonju_month = tollgate20_1_jeonju.groupby('월').sum()

#이하 위 20년 1분기 코드와 동일한 과정
tollgate20_2 = pd.read_csv('20년2분기톨게이트교통량.csv', encoding='cp949',thousands=',')
tollgate20_2['집계일자'] = tollgate20_2['집계일자'].astype(str)
tollgate20_2['집계일자'] = pd.to_datetime(tollgate20_2['집계일자'])
tollgate20_2['집계일자'] = tollgate20_2['집계일자'].dt.tz_localize('UTC')
tollgate20_2['월'] = tollgate20_2['집계일자'].dt.month
tollgate20_2 = tollgate20_2.drop(['집계일자'],1) #'일자'칼럼 제거
tollgate20_2 = tollgate20_2.drop(['영업소코드','입출구구분코드','TCS하이패스구분코드',
                                  '고속도로운영기관구분코드','고속도로운영기관명',
                                  '영업형태구분코드','영업형태명','1종교통량',
                                  '2종교통량','3종교통량','4종교통량','5종교통량','6종교통량'],1)
condition = ((tollgate20_2.영업소명 == '전주') | (tollgate20_2.영업소명 == '동전주') | (tollgate20_2.영업소명 == '서전주') | (tollgate20_2.영업소명 == '완주')) & (tollgate20_2.입출구명 == '입구')
tollgate20_2_jeonju = tollgate20_2[condition]
#4~6월 전주근처톨게이트 교통량
tollgate20_2_jeonju_month = tollgate20_2_jeonju.groupby('월').sum()

tollgate20_3 = pd.read_csv('20년3분기톨게이트교통량.csv', encoding='cp949',thousands=',')
tollgate20_3['집계일자'] = tollgate20_3['집계일자'].astype(str)
tollgate20_3['집계일자'] = pd.to_datetime(tollgate20_3['집계일자'])
tollgate20_3['집계일자'] = tollgate20_3['집계일자'].dt.tz_localize('UTC')
tollgate20_3['월'] = tollgate20_3['집계일자'].dt.month
tollgate20_3 = tollgate20_3.drop(['집계일자'],1) #'일자'칼럼 제거
tollgate20_3 = tollgate20_3.drop(['영업소코드','입출구구분코드','TCS하이패스구분코드',
                                  '고속도로운영기관구분코드','고속도로운영기관명',
                                  '영업형태구분코드','영업형태명','1종교통량',
                                  '2종교통량','3종교통량','4종교통량','5종교통량','6종교통량'],1)
condition = ((tollgate20_3.영업소명 == '전주') | (tollgate20_3.영업소명 == '동전주') | (tollgate20_3.영업소명 == '서전주') | (tollgate20_3.영업소명 == '완주')) & (tollgate20_3.입출구명 == '입구')
tollgate20_3_jeonju = tollgate20_3[condition]
#7~9월 전주근처톨게이트 교통량
tollgate20_3_jeonju_month = tollgate20_3_jeonju.groupby('월').sum()

tollgate20_4 = pd.read_csv('20년4분기톨게이트교통량.csv', encoding='cp949',thousands=',')
tollgate20_4['집계일자'] = tollgate20_4['집계일자'].astype(str)
tollgate20_4['집계일자'] = pd.to_datetime(tollgate20_4['집계일자'])
tollgate20_4['집계일자'] = tollgate20_4['집계일자'].dt.tz_localize('UTC')
tollgate20_4['월'] = tollgate20_4['집계일자'].dt.month
tollgate20_4 = tollgate20_4.drop(['집계일자'],1) #'일자'칼럼 제거
tollgate20_4 = tollgate20_4.drop(['영업소코드','입출구구분코드','TCS하이패스구분코드',
                                  '고속도로운영기관구분코드','고속도로운영기관명',
                                  '영업형태구분코드','영업형태명','1종교통량',
                                  '2종교통량','3종교통량','4종교통량','5종교통량','6종교통량'],1)
condition = ((tollgate20_4.영업소명 == '전주') | (tollgate20_4.영업소명 == '동전주') | (tollgate20_4.영업소명 == '서전주') | (tollgate20_4.영업소명 == '완주')) & (tollgate20_4.입출구명 == '입구')
tollgate20_4_jeonju = tollgate20_4[condition]
#10~12월 전주근처톨게이트 교통량
tollgate20_4_jeonju_month = tollgate20_4_jeonju.groupby('월').sum()

#20년 1~12월 전주 근처 톨게이트 교통량
tollgate20_jeonju_month  = pd.concat([tollgate20_1_jeonju_month, tollgate20_2_jeonju_month,
           tollgate20_3_jeonju_month,tollgate20_4_jeonju_month], axis = 0)
tollgate20_jeonju_month.rename(columns = {'총교통량': '20년교통량'}, inplace=True)
```



# 문제의식

**코로나19**는 우리의 삶에 다양한 변화를 불러왔습니다.
거리두기의 시행과 10시 이후의 활동 제한 등의 정책 등은 우리의 삶에서 **‘여행’**이라는 두 글자를 지우려 하였습니다.

```#<19vs20년 전주역 하차 인원 수>
station19_20_jeonju_off_month = pd.concat([station19_jeonju_off_month, station20_jeonju_off_month], axis = 1)
station19_20_jeonju_off_month.plot(kind='bar',title="19년,20년 월별 전주역에 하차한 인원 수", rot=0)
plt.legend(loc='center left', bbox_to_anchor=(1, 0.5))
plt.show() 
```

![월별 전주역 이용자수](C:\Users\PJY\Documents\GitHub\Blog\static\coco-nut\(1)monthly_station_usage.png)

2019년과 2020년에 전주역에서 하차한 인원 수를 비교 분석한 결과,
코로나19 확산이 시작된 1월을 제외하면, 2020년의 모든 기간에서 **전년도에 비하여 전주역 이용률이 감소**하였다는 것을 확인할 수 있었습니다.

```#<19 vs 20년 월별 전주지역 근처 톨게이트 교통량>
tollgate19_20_jeonju_month = pd.concat([tollgate19_jeonju_month, tollgate20_jeonju_month], axis = 1)
rcParams['figure.figsize'] = (12,7)
tollgate19_20_jeonju_month.plot(kind='bar',title="19년,20년 월별 전주지역 근처 톨게이트 교통량", rot=0)
plt.legend(loc='center left', bbox_to_anchor=(1, 0.5))
plt.show()
```

 ![월별 전주역 이용자수](C:\Users\PJY\Documents\GitHub\Blog\static\coco-nut\(2)monthly_tollgate_traffic_volume.png)

또한 2019년과 2020년의 전주지역 근처 톨게이트 교통량의 변화를 월별로 분석한 결과 역시, 2020년 1월을 제외한 모든 달에서 2019년도에 비해 전주지역 근처 톨게이트 이용률이 **감소**하였다는 것을 확인할 수 있었습니다.
여기서 전주시 근처 톨게이트는 '전주', '동전주', '서전주', '완주' 4군데로 정의했습니다.
위의 그래프는 코로나19로 인하여 **전주를 찾는 여행객들의 발길이 급감**하였음을 방증하고 있습니다.

![여행 수요 관련 버즈량 및 평균 좋아요 수](https://image.newsis.com/2021/01/13/NISI20210113_0000672840_web.jpg?rnd=20210113103608)

[출처 : 2021년 관광은 'B.E.T.W.E.E.N’..."친밀한 사람과 단기 치유 여행"]: !여행 수요 관련 버즈량 및 평균 좋아요 수(https://image.newsis.com/2021/01/13/NISI20210113_0000672840_web.jpg?rnd=20210113103608)

하지만 **여행에 대한 갈증**은 잠재적 수요로 존재하고 있습니다.

유튜브에 게재된 온라인 여행, 대리만족, 방구석 여행 등과 관련된 영상 수와 해당 영상의 평균 ‘좋아요’ 수를 측정한 결과 해당 **핵심어 언급량**은 전년 대비 21%, 평균 **‘좋아요'** 수는 57% **상승**한 것을 확인할 수 있었습니다.

위드코로나 시대의 여행과 관련하여 충청남도의 이우성 문화체육부지사는 “코로나19가 길어지고 백신 접종률이 높아지면서 대두되고 있는 ‘위드 코로나’, ‘포스트 코로나’ 시대의 관광·여행에 한발 앞서 준비해야 할 때”라고 언급한 바 있습니다.



## 위드코로나 시대의 여행은 어떤 키워드를 가질까?

황해국 UNWTO 아시아태평양지역국장은 위드코로나 시대의 여행에 대하여 이렇게 언급한 바 있습니다.

"**코로나 시대 속 여행자들**은 가까운 곳 여행 선호, 건강 안전 수칙에 대한 새로운 관심 증가, 자연, 농촌관광, 도로여행 등 야외활동 선호, 변동성과 여행 제한으로 막바지 예약 증가, 지역 사회에 긍정적인 영향을 주는 것에 더 많은 중요성을 부여하고 진정성을 찾는 사람들이 증가하고 있다”

이에 따라 저희는 **국내의 뚜벅이 여행자들**을 타겟으로 하는 여행을 고려해보았습니다.
그리고, 뚜벅이 여행자들의 가장 큰 특징인 **‘교통수단’**에 주목하였습니다.

자가용을 이용하지 못하는 뚜벅이 여행자들은 이동수단으로써 대중교통을 이용해야만 합니다. 하지만 사람들은 **대중교통의 이용**과 **코로나 감염의 위험성**을 연관지어 인식하고 있으며, 이 때문에 대중교통을 꺼리는 경향이 있습니다.

![교통카드 빅데이터 분석 결과](https://www.korea.kr/newsWeb/resources/attaches/2021.03/23/1118.jpg)

 출처 : [대한민국 정책브리핑](https://dacon.io/competitions/official/235794/codeshare/www.korea.kr)

[코로나19로 지난해 버스·지하철 등 대중교통 이용 27% 감소](https://www.korea.kr/news/policyNewsView.do?newsId=148885347)
[경기도민 10명 중 2명 코로나19 상황따라 출근 교통수단 변경](https://search.naver.com/p/cr/rd?m=1&px=603.8099975585937&py=292.3800048828125&sx=603.8099975585937&sy=292.3800048828125&p=hSNDKsprvmZssFh2ZzCssssstVG-408101&q=대중교통+코로나&ie=utf8&rev=1&ssc=tab.news.all&f=news&w=news&s=%2BvktV7PGIaxTzihEzn52kg%3D%3D&time=1633101122590&a=nws*a.tit&r=1&i=88000127_000000000000000010741770&g=003.0010741770&u=http%3A%2F%2Fwww.newsis.com%2Fview%2F%3Fid%3DNISX20210929_0001596771%26cID%3D10803%26pID%3D14000)
[다가올 위드코로나, 경기도민이 원하는 건 '대중교통 혼잡율 완화'](http://www.kyeongin.com/main/view.php?key=20210929010004682)

위 기사들에 따르면 지난해인 2020년, **하루 평균 교통카드 이용 건수**는 전국 평균 27.0% **감소**했으며, 코로나19 확산의 주요 시점에 따라 변동이 발생한 것으로 나타났습니다.

또한 경기도에서 31개 시⋅군의 인구분포 및 성별, 연령대별 비율을 고려해 2150명을 대상으로 시행한 설문조사에 따르면 코로나19 발생 전과 후 포스트 코로나로 이어지는 변화에 따라 **출근 교통수단을 변경**하겠다는 응답자는 전체 18%에 달하였습니다. 이어, 응답자들은 **‘혼잡률 완화’**와 **‘차량 내부 방역’**을 통하여 대중교통 이용 수요에 대비해야 한다고 생각하는 것으로 나타났습니다.

이러한 **대중교통을 통한 코로나19 감염의 우려**는 **뚜벅이 여행자**로 하여금 **여행을 재고**하게 되는 결과를 낳을 수 있다는 결론에 이르렀습니다.

따라서 **대중교통의 이용을 최소화**할 수 있는 방안을 생각하고자 하였으며, 그 과정에서 코로나19로 인해 그 어느때보다 뜨거운 관심을 받고 있는 **자전거와 여행을 결합**하고자 하였습니다.

![자전거 매출액 변화](https://img.newspim.com/news/2021/05/24/2105240858254630.jpg)출처 : [[뉴스핌 라씨로\] 자전거株 어닝서프라이즈..."코로나 이후 공유·전기자전거 성장 관건"](https://www.newspim.com/news/view/20210524000060)

현재 거리두기가 가능한 **자전거에 대한 열기**는 그 어느때보다 뜨겁습니다. 지난 해 1년동안 약 10배의 영업이익을 챙긴 자전거 업계는 올해 1분기에도 어닝서프라이즈를 기록하였습니다. 자전거를 향한 인기의 흐름을 타고자 전라북도 전주시 또한 기존에 운영중이던 공영자전거에 "꽃싱이"라는 이름을 붙이는 등 활성화를 위해 노력하고 있는 상황입니다.

따라서 전라북도 전주시의 공용자전거 **‘꽃싱이’**를 활용하여, **자전거만으로도 충분히 여행이 가능하도록** 한다면 코로나19로 쇠퇴한 전주의 관광산업에 긍정적인 효과를 얻을 수 있을 것이라고 생각하였습니다.

```#자전거대여소 위치파악하기
mapping = folium.Map(location=[35.8242238, 127.1479532], zoom_start=12.3)
for n in bike_j.index:
    folium.Marker([bike_j['x'][n], bike_j['y'][n]], popup=bike_j['대여소명'][n], icon=folium.Icon(color='blue')).add_to(mapping)

#현재 운영되고 있는 대여소와 제공 데이터가 달라 추가함
folium.Marker(location=[35.79086955560211, 127.112825460723], popup='삼천대여소', icon=folium.Icon(color='blue')).add_to(mapping)
folium.Marker(location=[35.86018772317944, 127.11530733739441], popup='송천대여소', icon=folium.Icon(color='blue')).add_to(mapping)
folium.Marker(location=[35.8355017190649, 127.17462332831731], popup='아중대여소', icon=folium.Icon(color='blue')).add_to(mapping)

mapping
```

![전주시 자전거 대여소](C:\Users\PJY\Documents\GitHub\Blog\static\coco-nut\(3)map_1.PNG)

전주시 내 자전거 대여소는 총 **7개**이며, 전주한옥마을과 번화가 등이 위치한 풍남동 일대에 **밀집**되어 있습니다.
하지만 그 외의 지역, 특히 전주의 서쪽 지역은 자전거 대여소가 한 곳도 없는 것을 볼 수 있습니다.
현재 상황으로는 자전거 여행객이 전주 전역을 여행하기가 어려운 상황입니다.



# 관광데이터 전처리

정책 제안에 필요한 데이터를 전처리하고, 다음 파트로 넘어가겠습니다.

```#주요관광지점 입장객 전처리
tour19 = pd.read_excel('주요관광지점 입장객(2004.07 이후)_211006102834.xls')
tour19 = tour19[['관광지', '내/외국인', '총계']]
tour19 = tour19[tour19['내/외국인']=='내국인']
tour19 = tour19.reset_index()
tour19 = tour19.drop(['index'], 1)
tour19 = tour19.sort_values(by='총계', ascending=False)

tour20 = pd.read_excel('주요관광지점 입장객(2004.07 이후)_211006102818.xls')
tour20 = tour20[['관광지', '내/외국인', '총계']]
tour20 = tour20[tour20['내/외국인']=='내국인']
tour20 = tour20.reset_index()
tour20 = tour20.drop(['index'], 1)
tour20 = tour20.sort_values(by='총계', ascending=False)

tour21 = pd.read_excel('주요관광지점 입장객(2004.07 이후)_210928122000.xls')
tour21 = tour21[['관광지', '내/외국인', '총계']]
tour21 = tour21[tour21['내/외국인']=='내국인']
tour21 = tour21.reset_index()
tour21 = tour21.drop(['index'], 1)
tour21 = tour21.sort_values(by='총계', ascending=False)


#자전거대여소 전처리
bike_raw = pd.read_csv('전국 자전거 대여소 데이터(시군구 행정동 100미터격자코드 포함).csv', encoding='utf-8')
#필요한 컬럼만 남기기
bike = bike_raw.drop(['id', 'legaldong_cd', 'adstrd_cd', 'rdnmaddr_cd', 'lclas', 'mlsfc', 'zip_cd', 'minstt_telno', 'data_stdde', 'prvd_agnc_cd', 
                  'prvd_agnc_nm', 'lst_updt_dt', 'data_orgn', 'FILE_NAME', 'base_ymd', 'minstt_nm', 'air_suply_typ', 'grid_cd', 'rdnm_addr', 'opn_tm', 
                  'cls_tm', 'rstde', 'legalemd_nm', 'adstrd_nm'], axis=1)
bike = bike.fillna(0)   #NaN값 모두 0으로
#컬럼명 바꾸기
bike.rename(columns = {'ctprvn_nm' : '시도', 'sgnr_nm' : '시군구', 'x_cd' : 'x', 'y_cd' : 'y', 'bycc_lend_div' : '자전거대여소구분', 'fee_div' : '요금구분', 
                       'bycc_use_fee' : '자전거이용요금', 'bycc_pos_cnt' : '자전거보유대수', 'frnsh_cnt' : '거치대수', 
                       'air_suply_frnsh_yn' : '공기주입기비치여부', 'repr_bnch_instl_yn' : '수리대설치여부', 'fclt_name':'대여소명'}, inplace = True)
bike_j = bike[bike['시군구'].str.contains('전주', na=False)]
#현재 운영되지 않는 곳 삭제하기
bike_j = bike_j.drop([475, 476],0)


#숙박시설 전처리
hotel_raw = pd.read_csv('국내 지역별 문화체육관광시설 인근 숙박시설 데이터.csv', encoding='utf-8')
#전처리
#필요한 컬럼만 남기기
hotel = hotel_raw.drop(['id', 'lclas', 'mlsfc', 'id_poi', 
       'mcate_cd', 'pnu', 'beonji', 'badm_cd', 'hadm_cd', 'rd_cd', 'rd_nm', 'bld_num',
       'grid_cd', 'lst_updt_dt', 'data_orgn', 'FILE_NAME', 'base_ymd'], axis=1)
hotel = hotel.fillna(0)   #NaN값 모두 0으로
#컬럼명 바꾸기
hotel.rename(columns = {'poi_nm':'POI명', 'branch_nm':'지점명', 'sub_nm':'보조명', 'mcate_nm':'분류명', 'sido_nm':'시도명칭', 'sgg_nm':'시군구명칭', 
                       'bemd_nm':'법청읍면동명칭', 'ri_nm':'리명칭', 'x':'y', 'y':'x'}, inplace = True)
hotel_j = hotel[hotel['시군구명칭'].str.contains('전주', na=False)]
#숙박시설이 너무 많아 외지인 관광객이 주로 이용할만한 곳들만 남기고 필터링하기
a = hotel_j[hotel_j['분류명']=='모텔'].index
b = hotel_j[hotel_j['분류명']=='여관'].index
c = hotel_j[hotel_j['분류명']=='대형스파'].index
d = hotel_j[hotel_j['분류명']=='야자모텔'].index
e = hotel_j[hotel_j['분류명']=='얌모텔'].index
f = hotel_j[hotel_j['분류명']=='라마다호텔'].index
hotel_j = hotel_j.drop(a)
hotel_j = hotel_j.drop(b)
hotel_j = hotel_j.drop(c)
hotel_j = hotel_j.drop(d)
hotel_j = hotel_j.drop(e)
hotel_j = hotel_j.drop(f)

#19,20,21년(3월~5월) 전주시 현지인,외지인,외국인 일별 관광객 수 csv파일 불러오기
tourist_day_dong = pd.read_csv('(KT)플랫폼통합경진대회_전주시_행정동_1.일별관광객수.csv', encoding='cp949',thousands=',')
tourist_day_dong = tourist_day_dong.drop(['SIDO_NM','SIDO_CD','SGG_NM','SGG_CD','ADMDONG_CD'],1) #필요없는 칼럼제거
#칼럼이름변경
tourist_day_dong.rename(columns = {'ETL_YMD': '일자',
                            'I_CNT': '현지인관광객','O_CNT': '외지인관광객',
                            'F_CNT': '외국인관광객','ADMDONG_NM': '행정동'}, inplace=True)
#동을 줄이기 위해 주변 동끼리 묶음
tourist_day_dong['행정동'] = tourist_day_dong['행정동'].str.replace('금암1동', '금암동')
tourist_day_dong['행정동'] = tourist_day_dong['행정동'].str.replace('금암1동', '금암동')
tourist_day_dong['행정동'] = tourist_day_dong['행정동'].str.replace('금암1동', '금암동')
tourist_day_dong['행정동'] = tourist_day_dong['행정동'].str.replace('금암2동', '금암동')
tourist_day_dong['행정동'] = tourist_day_dong['행정동'].str.replace('인후1동', '인후동')
tourist_day_dong['행정동'] = tourist_day_dong['행정동'].str.replace('인후2동', '인후동')
tourist_day_dong['행정동'] = tourist_day_dong['행정동'].str.replace('인후3동', '인후동')
tourist_day_dong['행정동'] = tourist_day_dong['행정동'].str.replace('우아1동', '우아동')
tourist_day_dong['행정동'] = tourist_day_dong['행정동'].str.replace('우아2동', '우아동')
tourist_day_dong['행정동'] = tourist_day_dong['행정동'].str.replace('송천1동', '송천동')
tourist_day_dong['행정동'] = tourist_day_dong['행정동'].str.replace('송천2동', '송천동')
tourist_day_dong['행정동'] = tourist_day_dong['행정동'].str.replace('중화산1동', '중화산동')
tourist_day_dong['행정동'] = tourist_day_dong['행정동'].str.replace('중화산2동', '중화산동')
tourist_day_dong['행정동'] = tourist_day_dong['행정동'].str.replace('평화1동', '평화동')
tourist_day_dong['행정동'] = tourist_day_dong['행정동'].str.replace('평화2동', '평화동')
tourist_day_dong['행정동'] = tourist_day_dong['행정동'].str.replace('삼천1동', '삼천동')
tourist_day_dong['행정동'] = tourist_day_dong['행정동'].str.replace('삼천2동', '삼천동')
tourist_day_dong['행정동'] = tourist_day_dong['행정동'].str.replace('삼천3동', '삼천동')
tourist_day_dong['행정동'] = tourist_day_dong['행정동'].str.replace('효자1동', '효자동')
tourist_day_dong['행정동'] = tourist_day_dong['행정동'].str.replace('효자2동', '효자동')
tourist_day_dong['행정동'] = tourist_day_dong['행정동'].str.replace('효자3동', '효자동')
tourist_day_dong['행정동'] = tourist_day_dong['행정동'].str.replace('효자4동', '효자동')
tourist_day_dong['행정동'] = tourist_day_dong['행정동'].str.replace('효자5동', '효자동')

#'일자'칼럼 int에서 datetime으로 변경
tourist_day_dong['일자'] = tourist_day_dong['일자'].astype(str)
tourist_day_dong['일자'] = pd.to_datetime(tourist_day_dong['일자'])
tourist_day_dong['일자'] = tourist_day_dong['일자'].dt.tz_localize('UTC')
tourist_day_dong['연도'] = tourist_day_dong['일자'].dt.year
tourist_day_dong = tourist_day_dong.drop(['일자'],1) #'일자'칼럼 제거
tourist_day_dong['관광객수'] = tourist_day_dong.iloc[:,1:4].sum(axis=1)
tourist_day_dong_all = tourist_day_dong.drop(['현지인관광객','외지인관광객','외국인관광객'],1)
#19,20,21년 3월~5월의 행정동별 평균 관광객수
tourist_day_dong_fin = tourist_day_dong_all.groupby(['연도','행정동']).mean()
```



# 정책 제안 : 꽃싱이를 활용해 전주시의 관광을 다시 일으켜세우자

그래서 저희 팀은 전주시에 뚜벅이 여행자, 자전거 여행객을 유치해 유동인구와 소비를 늘려 지역경제를 활성화하는 방향의 정책을 제안합니다.
정책 제안의 일환으로, 자전거 대여소가 더 필요한 지역을 선정하는 분석을 진행해보았습니다.
입지선정의 기준은 **수요**와 **접근성**입니다.

## 1. 수요

### 꽃싱이 대여소의 위치선정이 관광수요에 맞지 않다.

주요관광지점 입장객 통계를 보면 2019 ~ 2021.6 기간 동안 지속적으로 입장객이 많았던 관광지점은 **경기전, 전주동물원, 한국도로공사수목원, 스파라쿠아 전주온천** 등입니다.

```#주요관광지점 관광객 순위
plt.figure(figsize=(18,10))
plt.subplot(311)
sns.barplot(x='관광지', y='총계', data=tour19)
plt.title('주요관광지점 입장객 순위 (2019~2021.06)')
plt.subplot(312)
sns.barplot(x='관광지', y='총계', data=tour20)
plt.subplot(313)
sns.barplot(x='관광지', y='총계', data=tour21)
plt.show()
```

![주요관광지점 입장객 순위](C:\Users\PJY\Documents\GitHub\Blog\static\coco-nut\(4)key_attractions_ranking.png)

자전거 여행객을 유치하려면 주요관광지점 근처에 자전거대여소가 있어야 할 것입니다.
기존의 자전거대여소의 위치가 관광수요를 잘 반영하고 있는지 확인해보겠습니다.

```
#자전거대여소(파랑) 주요관광지점(빨강)
mapping = folium.Map(location=[35.8263259, 127.1479532], zoom_start=12.45)
#주요관광지점
folium.Marker(location=[35.81766567605925, 127.11563319674765], popup='스파라쿠아 전주온천', icon=folium.Icon(color='red')).add_to(mapping)
folium.Marker(location=[35.815557154775334, 127.14978709817481], popup='경기전', icon=folium.Icon(color='red')).add_to(mapping)
folium.Marker(location=[35.86088630212002, 127.10103512023727], popup='팔복예술공장', icon=folium.Icon(color='red')).add_to(mapping)
folium.Marker(location=[35.855804826253255, 127.12798721838412],popup='어린이창의체험관', icon=folium.Icon(color='red')).add_to(mapping)
folium.Marker(location=[35.82166628405927, 127.1488390220904],popup='한국전통문화전당', icon=folium.Icon(color='red')).add_to(mapping)
folium.Marker(location=[35.83139655526399, 127.0562468355819],popup='농촌진흥청 농업과학관', icon=folium.Icon(color='red')).add_to(mapping)
folium.Marker(location=[35.81690979901427, 127.14705536256496],popup='전북예술회관', icon=folium.Icon(color='red')).add_to(mapping)
folium.Marker(location=[35.81214870534467, 127.15836347790957],popup='전주한벽문화관', icon=folium.Icon(color='red')).add_to(mapping)
folium.Marker(location=[35.871146573597244, 127.05442009510737],popup='한국도로공사수목원', icon=folium.Icon(color='red')).add_to(mapping)
folium.Marker(location=[35.8556763221775, 127.14453971838411],popup='전주동물원', icon=folium.Icon(color='red')).add_to(mapping)
folium.Marker(location=[35.829731066042655, 127.17611130675031], popup='전주한옥레일바이크', icon=folium.Icon(color='red')).add_to(mapping)
folium.Marker(location=[35.80153212378822, 127.08977628325543],popup='국립전주박물관', icon=folium.Icon(color='red')).add_to(mapping)
folium.Marker(location=[35.84910111172008, 127.10016489489601],popup='전주한지박물관', icon=folium.Icon(color='red')).add_to(mapping)

#자전거 대여소
for n in bike_j.index:
    folium.Marker([bike_j['x'][n], bike_j['y'][n]], popup=bike_j['대여소명'][n], icon=folium.Icon(color='blue')).add_to(mapping)
#현재 운영되고 있는 대여소와 제공 데이터가 달라 추가함
folium.Marker(location=[35.79086955560211, 127.112825460723], popup='삼천대여소', icon=folium.Icon(color='blue')).add_to(mapping)
folium.Marker(location=[35.86018772317944, 127.11530733739441], popup='송천대여소', icon=folium.Icon(color='blue')).add_to(mapping)
folium.Marker(location=[35.8355017190649, 127.17462332831731], popup='아중대여소', icon=folium.Icon(color='blue')).add_to(mapping)

mapping
```

![전주시 주요관광지점과 자전거대여소 분포](C:\Users\PJY\Documents\GitHub\Blog\static\coco-nut\(5)map_2.PNG)

전주시의 주요 관광지점과 자전거대여소의 분포를 보면 전주시의 **중심부**에 해당하는 지역과 **서쪽** 지역이 관광 수요에 비해 자전거대여소가 부족한 것을 알 수 있습니다.
예를 들어 **한국도로공사수목원**이나 **스파라쿠아 전주온천** 등은 지속적으로 입장객이 많은 관광지임에도 그 근처에 자전거대여소가 없습니다.
관광객들은 주로 관광지로 이동할 때, 또는 관광 후 숙소로 돌아갈 때 이용하고 자전거를 반납할 것입니다.
따라서 각 주요 관광지점과 자전거대여소 사이를 자전거로 30분 이내에는 이동할 수 있게 만드는 것이 좋겠다고 판단됩니다.

### 현지인과 외지인이 주로 방문하는 곳이 다르다

저희 팀은 현지인과 외지인이 주로 방문하는 지역이 다를 것이라고 추측했습니다.

```
#현지인관광객들이 자주가는 곳은 어딜까?
#현지인의 19,20,21년 3월~5월의 행정동별 평균 관광객수 
tourist_day_dong_local = tourist_day_dong.drop(['외지인관광객','외국인관광객','관광객수'],1)
tourist_day_dong_local_fin = tourist_day_dong_local.groupby(['연도','행정동']).mean()
tourist_day_dong_local_fin = tourist_day_dong_local_fin.groupby(['연도','행정동'])['현지인관광객'].sum().reset_index()
sns.barplot(x='연도', y='현지인관광객', hue='행정동', palette='Accent',data=tourist_day_dong_local_fin)
plt.legend(loc='center left', bbox_to_anchor=(1, 0.5))
rcParams['figure.figsize'] = (15,10)
plt.title('행정동별 현지인 평균 관광객수 (19,20,21년 3~5월)')
plt.show()
```

![행정동별 현지인 평균 관광객수](C:\Users\PJY\Documents\GitHub\Blog\static\coco-nut\(6)local_average.png)

```
#외지인(외국인 포함)관광객들을 실제로 풍남동을 많이 찾을까?
#외지인(외국인 포함)의 19,20,21년 3월~5월의 행정동별 평균 관광객수 
tourist_day_dong_outsider = tourist_day_dong.drop(['현지인관광객','관광객수'],1)
tourist_day_dong_outsider['관광객수'] = tourist_day_dong_outsider.iloc[:,1:3].sum(axis=1)
tourist_day_dong_outsider = tourist_day_dong_outsider.drop(['외지인관광객','외국인관광객'],1)
tourist_day_dong_outsider_fin = tourist_day_dong_outsider.groupby(['연도','행정동']).mean()
tourist_day_dong_outsider_fin = tourist_day_dong_outsider_fin.groupby(['연도','행정동'])['관광객수'].sum().reset_index()
sns.barplot(x='연도', y='관광객수', hue='행정동', palette='Accent',data=tourist_day_dong_outsider_fin)
plt.legend(loc='center left', bbox_to_anchor=(1, 0.5))
plt.title('행정동별 외지인 평균 관광객수 (19,20,21년 3~5월)')
rcParams['figure.figsize'] = (20,12)
plt.show()
```

![행정동별 외지인 평균 관광객수](C:\Users\PJY\Documents\GitHub\Blog\static\coco-nut\(7)outsider_average.png)

확인해본 결과, 현지인이 가장 많이 찾는 지역은 **덕진동**이고 그 다음은 **서신동**,**중앙동**입니다.
외지인들이 가장 많이 찾는 곳 또한 **덕진동**이지만 다음으로 많이 찾는곳은 **풍남동**,**중앙동**입니다.

풍남동은 현지인들이 많이 찾는 곳이 아닙니다. 외지인들은 왜 자주 방문할까요?
왜냐하면 풍남동에는 **전주한옥마을**이 있기 때문입니다.
전주하면 외지인들이 생각하기에 가장 먼저 떠올리는것이 한옥마을일 것입니다. 하지만 전주에는 한옥마을 이외에도 많은 관광지들이 있으며, 충분한 관광수요를 가지고 있다는 것이 앞선 수요 분석으로 증명되었습니다.

따라서 한옥마을 이외에 외지인들이 잘 모르는, 많이 가지 않는 지역에 자전거 대여소를 추가적으로 설치하면 외부 관광객들이 전주시에 다양한 지역을 방문할 수 있고, 나아가 코로나 시대에 방문객이 몰리는 것을 방지하는 효과도 있을것입니다.

## 2. 접근성

### 숙박시설과의 접근성이 중요하다

```
#자전거대여소(파랑) & 주요관광지점(빨강) & 숙박시설(초록)
mapping = folium.Map(location=[35.8263259, 127.1479532], zoom_start=12.2)

folium.Marker(location=[35.81766567605925, 127.11563319674765], popup='스파라쿠아 전주온천', icon=folium.Icon(color='red')).add_to(mapping)
folium.Marker(location=[35.815557154775334, 127.14978709817481], popup='경기전', icon=folium.Icon(color='red')).add_to(mapping)
folium.Marker(location=[35.86088630212002, 127.10103512023727], popup='팔복예술공장', icon=folium.Icon(color='red')).add_to(mapping)
folium.Marker(location=[35.855804826253255, 127.12798721838412],popup='어린이창의체험관', icon=folium.Icon(color='red')).add_to(mapping)
folium.Marker(location=[35.82166628405927, 127.1488390220904],popup='한국전통문화전당', icon=folium.Icon(color='red')).add_to(mapping)
folium.Marker(location=[35.83139655526399, 127.0562468355819],popup='농촌진흥청 농업과학관', icon=folium.Icon(color='red')).add_to(mapping)
folium.Marker(location=[35.81690979901427, 127.14705536256496],popup='전북예술회관', icon=folium.Icon(color='red')).add_to(mapping)
folium.Marker(location=[35.81214870534467, 127.15836347790957],popup='전주한벽문화관', icon=folium.Icon(color='red')).add_to(mapping)
folium.Marker(location=[35.871146573597244, 127.05442009510737],popup='한국도로공사수목원', icon=folium.Icon(color='red')).add_to(mapping)
folium.Marker(location=[35.8556763221775, 127.14453971838411],popup='전주동물원', icon=folium.Icon(color='red')).add_to(mapping)
folium.Marker(location=[35.829731066042655, 127.17611130675031], popup='전주한옥레일바이크', icon=folium.Icon(color='red')).add_to(mapping)
folium.Marker(location=[35.80153212378822, 127.08977628325543],popup='국립전주박물관', icon=folium.Icon(color='red')).add_to(mapping)
folium.Marker(location=[35.84910111172008, 127.10016489489601],popup='전주한지박물관', icon=folium.Icon(color='red')).add_to(mapping)

for n in bike_j.index:
    folium.Marker([bike_j['x'][n], bike_j['y'][n]], popup=bike_j['대여소명'][n], icon=folium.Icon(color='blue')).add_to(mapping)
folium.Marker(location=[35.79086955560211, 127.112825460723], popup='삼천대여소', icon=folium.Icon(color='blue')).add_to(mapping)
folium.Marker(location=[35.86018772317944, 127.11530733739441], popup='송천대여소', icon=folium.Icon(color='blue')).add_to(mapping)
folium.Marker(location=[35.8355017190649, 127.17462332831731], popup='아중대여소', icon=folium.Icon(color='blue')).add_to(mapping)

for i in hotel_j.index:
    folium.Marker([hotel_j['x'][i], hotel_j['y'][i]],popup=hotel_j['POI명'][i],  icon=folium.Icon(color='green')).add_to(mapping)

mapping
```

![전주시 주요관광지점과 자전거대여소, 숙박시설 분포](C:\Users\PJY\Documents\GitHub\Blog\static\coco-nut\(8)map_3.PNG)

숙박시설도 자전거대여소와 마찬가지로 풍진동 일대에 밀집되어 있습니다.
그래서 **풍남동** 일대 숙박시설들은 대여소들과 접근성이 좋지만 **효자동**, **서신동**, **인후동** 지역의 접근성은 낮습니다.

각 기준(관광 수요, 숙박시설)대로 자전거 대여소가 더 필요한 지역을 지도에 표시해보면 그림과 같습니다.

```
#관광수요를 기준으로 한 위치선정(빨강) & 숙박시설을 기준으로 한 위치선정(검정) 
from PIL import Image, ImageFont, ImageDraw
from IPython.display import display
img = Image.open('위치선정1.png')
display(img)
```

![관광수요 위치선정(빨강), 숙박시설 위치선정(검정)](C:\Users\PJY\Documents\GitHub\Blog\static\coco-nut\(9)map_4.png)

## 최종 자전거 대여소 입지 선정 및 제언

관광지와 숙박시설을 동시에 고려하여, 저희 팀은 **4군데**의 자전거대여소 위치를 선정했습니다.
1번과 2번 지역을 자전거 대여소 입지로 선정한 이유는 이 지역에 관광객이 많은 **'한국도로공사수목원'**과 **'농촌진흥청 농업과학관'**이 있기 때문입니다.
평지와 공원도 많고, 관광수요도 존재하는 서쪽 지역까지 설치를 확대하면 자전거 이용에 대한 수요도 높아질 거라고 생각합니다.
또, 외지인들은 주로 한옥마을이 있는 동쪽지역(풍남동)을 많이 찾는데, 서쪽 지역의 자전거대여소는 자연스레 인구를 끌어들이고 전주시의 잘 알려지지 않은 관광지를 홍보할 수 있을 것입니다.

나머지 두 군데는 **숙박시설과의 접근성** 측면에서 자전거대여소 위치를 선정하였습니다.
이 부분은 숙박시설이 많은 곳이기 때문에 자전거 대여소를 설치하면 수요가 많을 것으로 예상되며, 숙박시설 근처에서 자전거를 대여하거나 반납할 수 있어 관광객들의 편의가 증진될 것입니다.

```
img = Image.open('위치선정2.png')
display(img)
```

![최종 입지선정](C:\Users\PJY\Documents\GitHub\Blog\static\coco-nut\(10)map_5.png)

추가적으로 제언하자면 자전거대여소의 운영시간 확장 조정 및 버스정류장과 기차역 등 대중교통시설에 **자전거 거치대**를 설치 하는 정책이 필요하다고 생각합니다.
이동의 새로운 트렌드 중 하나가 바로 **‘라스트 마일 모빌리티(Last Mile Mobility)’**입니다.
라스트 마일 모빌리티는 약 1.6㎞가량 되는 걷기에는 멀지만, 버스·전철로는 연결이 안 되고, 택시나 자가용을 이용하기엔 여러모로 마땅치 않은 애매한 거리를 사람들이 빠르고 편하게 이동토록 해주는 이동 수단을 말합니다. 대표적으로 공공자전거와 공유 전동 킥보드·전기 자전거 등이 해당합니다.
변화한 환경에 맞게 추가적인 정책을 시행한다면 자전거 이용률을 높이고, 대중교통과 최종 목적지 간의 부담을 줄여 유동인구 증가에 바람직한 영향을 미칠 것이라고 생각합니다.

# 기대효과 : 지역경제 활성화

지역경제 활성화의 핵심은 지역 내 **소비의 증진**과 **유동인구 활성화**입니다.
유동인구는 소비흐름의 방향을 결정하고, 소비는 생산을 이끌어내기 때문입니다.
그래서 저희 팀은 **자전거대여소 추가 설치 정책**을 통해 **소비와 인구의 이동을 활성화**하고, **지역경제의 흐름을 긍정적으로 변화**시키려 했습니다.

자전거 여행객을 유치하려는 시도는 코로나 때문에 대중교통을 이용한 여행을 꺼리던 관광객을 다시 전주로 불러오고, 현지인들에게는 애매모호한 거리에 대한 이동수단이 될 수도 있습니다.
또한 자전거 여행객, 뚜벅이 여행자들이 꽃싱이를 타고 전주 이곳저곳을 방문한다면 그것 역시 소비 증진에 도움이 될 것입니다.

자전거대여소를 추가 설치를 중심으로 한 전주시 자전거 활성화 정책은 특히 외부 관광객으로부터 기원하는 유동인구와 소비를 증진시켜 지역경제 활성화에 효과적인 결과를 가져올 수 있다고 생각합니다.

------

지금까지 자전거를 활용한 관광 활성화 방안을 제안해보았습니다.
긴 글 읽어주셔서 감사합니다!

# 사용데이터

**제공 데이터**
KORAIL

- 역별 승하차실적_2019.csv
- 역별 승하차실적_2020.csv

한국문화정보원

- 전국 자전거 대여소 데이터(시군구 행정동 100미터격자코드 포함).csv
- 국내 지역별 문화체육관광시설 인근 숙박시설 데이터.csv

KT

- (KT)플랫폼통합경진대회_전주시_행정동_1.일별관광객수.csv

**외부 데이터**
[주요관광지점 입장객 통계](https://know.tour.go.kr/stat/visitStatDis/table.do)

- 주요관광지점 입장객(2004.07 이후)_211006102834.xls
- 주요관광지점 입장객(2004.07 이후)_211006102818.xls
- 주요관광지점 입장객(2004.07 이후)_210928122000.xls

[한국도로공사 고속도로공공데이터포털](http://data.ex.co.kr/portal/fdwn/view?type=TCS&num=C7&requestfrom=dataset)

- 19년1분기톨게이트교통량.csv
- 19년2분기톨게이트교통량.csv
- 19년3분기톨게이트교통량.csv
- 19년4분기톨게이트교통량.csv
- 20년1분기톨게이트교통량.csv
- 20년2분기톨게이트교통량.csv
- 20년3분기톨게이트교통량.csv
- 20년4분기톨게이트교통량.csv