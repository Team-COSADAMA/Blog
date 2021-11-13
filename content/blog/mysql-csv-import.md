---

title: MySQL에 빅데이터를 넣으려면?
description: 백만건 이상의 데이터를 import 하려면 어떻게 해야할까요? (feat.ERROR 3948 (42000):Loading local data is disabled; this must be enabled on both the client and server sides)
img: not-yet-generated.png
slug: mysql-csv-import
datetime: 2021. 10. 31.
category: MySQL
author: 정 찬


---



sql 커리큘럼 교안을 만들다가 ERROR 3948 (42000) 때문에 막힌적이 있었는데요. 결국 해결했습니다:) 

우리는 대용량의 데이터를 효과적으로 관리하고, 찾기 위해서 sql 등 dbms를 사용합니다. 하지만 컬럼을 정의해주고, 얼마만큼 메모리를 할당할지, 자료형은 무엇인지 써주어야 하죠. 즉, 조금 번거롭고, 전처리의 어려움이 있습니다. 그래서 이 부분을 보완하고 빠른 작업을 위해 python과 mysql은 같이 연동하면 효과적입니다. 4주차 내용과 겹치지만 잊지 않기 위해서 먼저 적어 두겠습니다.

먼저 [자료](https://data.seoul.go.kr/dataList/OA-12912/S/1/datasetView.do)는 서울 열린데이터 광장의 '서울시 버스노선별 정류장별 승하차 인원 정보'입니다. 달별로 csv 파일로 제공되지만, 100만건 이상의 데이터이기 때문에 csv로 모두 열리지도 않습니다. 1년치를 보려면 무려 1기가가 필요하겠죠? 이런 큰 데이터는 엑셀에서는 당연히 작업하기 힘들고, 파이썬에서도 조금 버겁습니다. 판다스에서 확인하려면 컬럼이 무지막지하게 많다면 스크롤을 오른쪽으로 주욱 돌려서 봐야겠죠? 먼저 sql에 import해서 필요한 부분만 찾고, 이를 export해 한결 가벼운 용량으로 판다스에서 조작할 수 있습니다.



예를 들어 21년 9월 데이터는 107mb이고, 확인할 수 있는 마지막 row가 1048576입니다:) 그래서 처음 열 때 보면 아래와 같이 warning이 나옵니다.

![too_big_for_excel](MySQL-csv-import/too_big_for_excel.PNG)

일단 excel을 연 김에 컬럼까지 확인합시다. '사용일자, 노선번호, 노선명, 버스정류장ARS, 역명, 승차총승객수, 하차총승객수, 등록일자' 식으로 되어 있군요. 참고하고 넘어갑시다.

![columns](MySQL-csv-import/columns.PNG)



이 상태에서 4주차에 알려드린 대로 csv 파일을 import 했을 때 성공하시면 그냥 그대로 적용하시면 됩니다. 



만약 안된다면, 

- 먼저 이 파일을 txt파일로 저장해줍시다. 확장자를 CSV에서 TXT로 바꿔줍시다. 

- 이후 TXT파일을 열고 파일-> 다른 이름으로 저장 -> 확장자를 UTF-8로 바꿔줍시다

(만약 깨진다면 다른 이름으로 저장 ->  확장자를 txt로 해주세요. 하지만 데이터가 날아갈 수 있습니다.)

![columns](MySQL-csv-import/txt.PNG)



자 이 상태에서 txt 파일을 fields terminated by '\t'로 해결되지 않는다!

혹은

**ERROR 3948 (42000): Loading local data is disabled; this must be enabled on both the client and server sides**

이런 에러가 발생한다!!!!

잘 오셨습니다!!!!!!!



## Error 3948 해결방안

### step0. mysql 환경설정

[mysql 환경설정 방법](https://hoho325.tistory.com/163)으로 설명은 대체합니다. (Window10기준)



### step1. cmd 켜기

일단 **cmd**를 켜주세요. git cmd, anaconda cmd 아닙니다. 그냥 **명령 프롬프트** 켜주세요.



### step2. cmd에서 mysql 접속

`mysql --local infiel -u root -p`

라고 치고, root 계정의 비밀번호를 입력합니다.

![cmd](MySQL-csv-import/cmd.PNG)

아마 여러분들은 박스 안의 local_infile이 off로 되어 있을겁니다.



### step3. local_infile=true

저 local_infile을 on으로 바꿔줍시다.

`mysql> set global local_infile=true;`

라고 입력해주세요.

참고로 `mysql>`이 부분은 앞에서 mysql 계정으로 로그인 했기 때문에 기본으로 딸려 나옵니다. 쓰지 않으셔도 괜찮아요. 그리고 mysql 문법처럼 쿼리가 끝날 때 **;** 를 꼭 써주셔야 한답니다!

이후

`mysql> exit` 

exit 입력하시고 쿨하게 나와줍니다.



### step4. db, table 만들기

다시 cmd를 열고 `mysql --local_infile -u root -p`를 통해 접속하시구요.

`mysql> show global variables like 'local_infile';` 한번 확인해 줍시다.

문제 없다면 드디어 csv, txt 등 파일을 db에 넣어줄 거예요.

(이미  db와 table을 만드신 분은 다음으로 넘어가셔도 좋습니다.)



#### 4.1. db 만들기

워크벤치와 똑같이 db를 만들어 줍시다.

`mysql> create database bus_stop;`



#### 4.2. table 만들기

`mysql> create table bus_stop.bus2109 (
    -> 사용일자 datetime,
    -> 노선번호 varchar(30),
    -> 노선명 varchar(100),
    -> 버스정류장ars번호 varchar(50),
    -> 역명 varchar(30),
    -> 승차총승객수 int,
    -> 하차총승객수 int,
    -> 등록일자 datetime,
    -> id int auto_increment primary key)
    -> ;`



![columns](MySQL-csv-import/create_db_table.PNG)

저는 중간에 database를 선택해 주지 않아서 에러가 한번 나왔네요! 여러분들은 잊지 마세요~



### step5. data import

```mysql
# 적재
LOAD DATA LOCAL INFILE "절대경로/BUS_STATION_BOARDING_MONTH_202109.txt" 
INTO TABLE dbName.tableName 
FIELDS TERMINATED BY "|"
IGNORE 1 ROWS 
-- (`column1`, `column2`, ...)
;
```

![txt_import](MySQL-csv-import/txt_import.PNG)

엇, 아까 csv 파일의 마지막 row 수와 같군요?  저는 csv파일을 TXT로 다른 이름으로 저장했는데요. CSV파일을 열면서 데이터가 소실되었나봅니다. 여러분들은 확장자를 csv에서 txt로 바꾸시면서 온전한 데이터를 db화 하시기 바랍니다:)

![workbench_check](MySQL-csv-import/workbench_check.PNG)



짜잔~ 

에러 해결!!!! CLI도 그렇게 어렵지 않죠? 워크벤치랑 똑같습니다. 오히려 손이 더 편할 수도..?

여기까지 `ERROR 3948 (42000): Loading local data is disabled; this must be enabled on both the client and server sides)` 에러를 해결해 보았습니다.

다음에 또 만나요~~
