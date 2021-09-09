---

title: 지역 별 부동산 가격 형성 요인 분석
description: 부동산 평균매매가 변동추이 및 다른 요인들과의 상관관계 분석
slug: coco-2021-estate
img: not-yet-generated.png
datetime: 2021. 09. 09.
category: Data Analysis
author: 강태영, 김후정, 신혜린, 윤한세

---

### 발표 내용 요약
저희는 **2012년부터 부동산 매매가**가 어떻게 변화해 왔는지, 그리고 그 이유는 무엇인지에 대해 알아보고자 하였습니다. 또한 추가적으로 부동산 매매가에 영향을 미치는 요인들에 대해 찾아 보았습니다. 처음에는 교육 인프라가  부동산 매매가에 미치는 영향을 알아보기 위해 ‘지역 별 1인 소득’, ‘지역 별 1인 사교육비', ‘지역 별 학교 수', 그리고 ‘지역 별 학원 수'와의 관계 분석을 진행하고자 했으나, 학교 수와 학원 수는 개별 학교 및 학원의 규모 뿐만 아니라 지역별 범위의 크기나 인구수 차이를 고려해야한다는 난관에 부딪혀 **‘지역 별 1인당 개인 사교육비’** 과 **‘지역 별 1인당 개인소득’** 라는 두 요소로만 **상관관계 분석**을 진행해 보았습니다.

스피어만 계수를 활용한 상관분석 결과 **부동산 매매가와 지역 별 1인당 개인소득 간에 양의 상관관계** 가 있다는 것을 확인할 수 있었으며, **부동산 매매가와 지역 별 1인당 사교육비 간의 상관관계는 높은 양의 상관관계**가 있다는 것을 확인할 수 있었습니다.


### 사용한 툴 및 레퍼런스 소개
* Python
* Flourish
* 부동산 대기업도 없는데… 세종 개인소득, 서울ㆍ울산 이어 전국 3위”, 한국일보,
https://www.hankookilbo.com/News/Read/201712250423212842
* 문재인 정부에서 부동산이 폭등한 이유 
https://www.youtube.com/watch?v=wR7zu3GgNK8


### 사용한 데이터 및 출처
* 1인당 개인 소득(시도) : Kosis
https://kosis.kr/statisticsList/statisticsListIndex.do?vwcd=MT_GTITLE01&menuId=M_01_03_01#content-group
* 1인당 사교육비(시도) : Kosis
https://kosis.kr/statHtml/statHtml.do?orgId=101&tblId=DT_1PE202&vw_cd=MT_ZTITLE&list_id=H1_
10_001_003&seqNo=&lang_mode=ko&language=kor&obj_var_id=&itm_id=&conn_path=MT_ZTITLE
* 부동산 평균 매매가 : 한국부동산원
https://www.r-one.co.kr/rone/resis/statistics/statisticsViewer.do

