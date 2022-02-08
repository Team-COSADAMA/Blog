---
title: 어여쁜 터미널 환경 구축하기
description: Windows Terminal로 cmd, powershell을 예쁘게 꾸미는 방법을 공유합니다.
slug: window-terminal-scheme
img: not-yet-generated.png
datetime: 2021. 09. 23.
category: Tips
author: 정 찬

---



아나콘다, 윈도우 파워쉘 모두 눈이 고통스러워서 공부할 마음이 안들더라구요! 본격적으로 학습하기 전에 어떻게든 예쁘게 만들어야 했습니다. 구글신에게 문의하니 윈도우에서 작년 즈음 terminal을 만들어 주었대요!! 얼른 다운로드 했습니다.

![anaconda_shell](/window-terminal-scheme/anaconda_shell.PNG)

Microsoft Store에 Terminal이라고 검색하면 Windows Terminal이 두 종류가 나옵니다. 저는 Windows Terminal을 다운로드 했습니다. (둘의 큰 차이는 잘 모르겠습니다.)



![windows_terminal_choice](/window-terminal-scheme/windows_terminal_choice.png)

막상 열면 그렇게 예쁘지는 않습니다. 하지만 기본적인 기능은 꽤 괜찮더라구요.



## 기본 기능

1. **여러 shell을 tab으로 전환할 수 있다.**

   아래 그림처럼 power shell, cmd, anaconda powershell, Azure cloud shell 등 여러 프로그램을 Terminal로 이용할 수 있습니다. 물론 같은 shell도 여러 개 띄울 수 있습니다.

![windows_terminal1](/window-terminal-scheme/windows_terminal1.png)



2. **디자인 변경이 가능하다!!!!!**

   위 사진의 '설정'에서 색 조합이나 작업 환경을 추가할 수 있습니다. 그리고 무엇보다 왼쪽 하단의 json파일을 수정해서 원하는 폰트와 디자인을 부여할 수 있습니다..!!!

   ![windows_terminal2](/window-terminal-scheme/windows_terminal2.png)



## 디자인 변경하기

![terminal_setting1](/window-terminal-scheme/terminal_setting1.PNG)

먼저 json 파일을 열어서 위 그림의 위치를 찾아주세요. 우리가 수정해야할 내용은 commandline, guid, icon, guid, acrylicOpacity 정도입니다.

- **commandline**: 어떤 프로그램을 활용할지 exe 등의 위치를 적어줍니다. 저는 Anaconda 가상환경을 이용할 예정이라 검색창에서 파일 위치를 복사해 붙여 넣기 해 주었습니다.(새로운 프로그램을 추가하려면 새로운 {}을 파주세요!)

  **주의**: WindowsPowerShell.exe부터 끝까지만 복붙할 것! + \대신 \\\ 처리 해줄 것! 아래는 저의 경우입니다. 본인 저장 위치를 꼭 찾아서 적용하세요!

  `"commandline": "powershell.exe -ExecutionPolicy ByPass -NoExit -Command \"& 'C:\\Anaconda3\\shell\\condabin\\conda-hook.ps1' ; conda activate 'C:\\Anaconda3'\""`

  ![terminal_setting2](/window-terminal-scheme/terminal_setting2.png)



- **icon**: terminal 상단에 표시되는 아이콘입니다. 별로 신경쓰지 않으시면 그냥 cmd 파일 위치를 복붙하셔도 되지만, 신경쓰이신다면 해당 프로그램을 오른쪽 클릭해 '속성' 탭을 띄운 후 '대상'의 내용을 복붙해주세요.

  ![terminal_setting3](/window-terminal-scheme/terminal_setting3.png)



- guid: 인터페이스를 구별하는 id라고 생각하시면 됩니다. 풀네임은 전역 고유 식별자 Globally Unique Identifier라고 합니다. [GUID만드는 사이트](https://www.guidgen.com/) 에서 하나 만드시고 적용하세요
- acrylicOpacity: 투명도 입니다. 적당히 투명하니까 영롱하고 멋있더라구요! 0~1사이 값을 넣어주시면 됩니다.



## 폰트 설정

원하는 스키마colorScheme를 적용해 주시고, 폰트font도 조절해주세요!

혹시 기본 스키마가 마음에 들지 않는다면 [스키마사이트1](https://ohmyposh.dev/docs/themes), [스키마사이트2](https://windowsterminalthemes.dev/) 등을 참고해 바꿔주세요. 하단 "schemes" 에 추가해주시는 것 잊지 마시구요!

![terminal_setting4](/window-terminal-scheme/terminal_setting4.PNG)

<img src="/window-terminal-scheme/terminal_setting5.png" alt="terminal_setting5" style="zoom:80%;" />



여기까지 윈도우 환경에서 Terminal을 사용해 예쁘게 만드는 방법을 알아봤습니다. 심미성이라고는 찾아볼 수 없던 작업 환경이 이렇게 바뀌었습니다! 여러분도 Terminal로 광명찾으세요!

그럼 이만~~~~

![final3](/window-terminal-scheme/final3.png)





### 참고자료

---

https://sanghyu.tistory.com/166

https://mingdev10.tistory.com/46

https://www.guidgen.com/

https://ohmyposh.dev/docs/themes

https://windowsterminalthemes.dev/