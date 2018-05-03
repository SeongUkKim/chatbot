# 데이터베이스 메뉴얼
> ## 날씨정보 테이블
> - 데이터베이스는 MySQL사용

```sql
CREATE TABLE weather (
  _index INT(20) NOT NULL PRIMARY KEY,
  hour INT(20) NOT NULL,            
  temp DOUBLE NOT NULL,      
  pty INT(20) NOT NULL,     
  pop INT(20) NOT NULL,             
  wfKor varchar(20) NOT NULL,             
  reh INT(20) NOT NULL,  
  pub varchar(20) NOT NULL               
);
```

>- 테이블명 : weather
>- 설명: 시간, 온도, 강수상태, 강수확률, 날씨, 습도, 정보발표시간 저장
