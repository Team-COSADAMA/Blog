---

title: 디지털 포렌식 4주차 스터디(4)
description: III. 디지털포렌식(비휘발성) 분석 2-4. MFT&LogFile 분석
slug: study-forensics-9th
category: 디지털 포렌식
author: 유혜정

---

# 2-4 MFT&Logfile 분석

## MFT & LogFile 분석

---

<aside>
💡 파일시스템 로그

: NTFS 파일시스템에서 파일을 생성할 경우, 이를 MFT에 파일과 관련된 내용을 기록하고, $Bitmap 파일을 활용하여 클러스터를 할당한다. $LogFile에도 정보를 저장하고, $UsnJrnl 파일에도 저장한다. NTFS 파일시스템은 크게 VBR 영역, MFT 영역, Data 영역으로 나눌 수 있다.

</aside>

<aside>
💡 NTFS 파일시스템에서 $MFT 파일 위치는?

: $MFT의 주소 값은 클러스터 단위이므로, 이를 섹터 형식으로 변환하기 위해서는 $MFT 주소 값에 오프셋 0x0D~0x0D 영역에 있는 클러스터당 섹터 값을 곱해준다.

</aside>

### 📍MFT Entry 구조

1. **MFT Entry 헤더**
    - 헤더 오프셋 0x0000 - 0x0003 영역에는 "FILE"이라는 시그니처를 가지고 있고, MFT Entry에 문제가 생기면 "BAAD"라는 시그니처로 변환되어 저장된다.
2. **Fixup Array**
    - Fixup이란 NTFS 파일시스템이 볼륨에 저장하는 데이터가 1개 이상의 섹터를 사용할 경우, 각 섹터의 마지막 2 Byte의 값을 기록하고 원래의 값은 별도로 기억하는 것을 말한다.
3. **MFT Attribute**
    
    1) STANDARD_INFORMATION 속성
    
    - 속성 헤더와 속서 내용으로 나뉜다. 파일이 Resident인지 Non-resident인지를 식별하여 해당 속성 헤더를 분석하고, 속성 타입이 "0x10"이므로, $STANDARD_INFORMATION 속성에 추가하여 속성 길이, Non-resident Flag 값 등을 확인하여 분석한다.
    
    2) FILE_NAME 속성
    
    - 파일이나 디렉토리의 이름 정보를 갖고 있는 속성으로, 이 속성에 포함된 내용을 통해서 파일 또는 디렉토리의 이름, 생성시간, 수정시간 등을 알 수 있다.
    
    3) DATA 속성
    

### 📍MFT와 LogFile 수집 및 분석

1. **MFT와 LogFile 수집**
    - FTK Imager 프로그램을 활용하여 NTFS 파일시스템이 설치된 파티션을 선택하면 $MFT와 $LogFile을 볼 수 있다. 이 파일을 선택한 후 수집한다.
2. **NFT와 LogFile 분석**
    
    1) NTFS  Log Tracker 프로그램 다운로드 후 실행
    
    2) 실행한 프로그램에 수집한 $MFT와 $LogFile을 경로에 대입
    
    3) [SQLite DB File Path]에 분석 수행 결과 파일 저장
    
    4) [Parse] 버튼 클릭하여 해당 파일 분석 실행
    
    5) 하단의 [$LogFile] 탭을 클릭하여 분석정보 확인