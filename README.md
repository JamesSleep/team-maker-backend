# TEAM MAKER BACKEND

## Description

로스트아크 레이드 파티모집 웹사이트 NestJS 서버
Database는 AWS MySQL사용

## 기술스택

- 비밀번호변경 및 찾기 이용시 nodemailer 사용 (naver메일 smtp)
- 로그인, 회원가입시 비밀번호 보안을 위해 cryptoJS사용, DB저장시에도 password, salt 구분하여 저장
- 서버 자동종료 방지를 위해 PM2 사용

## API
- /user
  - /all 모든유저조회
  - /findUser/:email 특정유저조회
  - /findGuild/:guild 특정그룹조회
  - /findPass/:email 비밀번호찾기
  - /join 회원가입
  - /login 로그인
  - /modify 회원정보수정
  - /delete/:email 회원삭제
  - /Question 문의하기
  
- /team 모든 레이드팀 조회
  - /findTeam/:index 특정팀정보조회
  - /findTeamByMan/:index 특정유저가 만든 팀목록
  - /make 레이드팀만들기
  - /remove/:index 레이드삭제
  
- /raiders 모든 레이드멤버조회
  - /make 레이드멤버추가
  - /:index 특정 레이드팀 멤버조회
  - /delete/:index 특정 레이드팀 멤버제거
