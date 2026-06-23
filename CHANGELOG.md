# 작업 요약 (2026-06-23)

## 1. 프로젝트 시작
- `my-erp` 폴더 생성 후 `바탕화면/코딩` 폴더 안으로 이동
- 상품 이름/가격/재고를 보여주는 정적 웹페이지 작성 (`index.html`, `style.css`, `script.js`)
- 상품 데이터는 처음엔 `script.js` 안에 하드코딩 (무선 마우스, 기계식 키보드, 27인치 모니터, USB-C 허브, 웹캠)

## 2. 상품 추가 기능
- 상품 이름/가격/재고를 입력하는 `<form>` 추가
- 처음에는 메모리(브라우저 RAM)에만 저장되어 새로고침하면 사라지는 한계가 있었음

## 3. localStorage로 임시 영속화
- `localStorage`를 이용해 브라우저를 새로고침해도 데이터가 유지되도록 개선
- 단, 같은 브라우저/같은 PC에서만 보이는 한계가 있었음

## 4. SQLite + Express 서버로 전환
- Node.js, npm 설치
- `server/` 폴더에 Express 서버 구축 (`express`, `better-sqlite3` 사용)
- `server/db.js`: `products` 테이블 생성 및 기본 데이터 시딩
- `server/server.js`: REST API 구현
  - `GET /api/products` — 상품 목록 조회
  - `POST /api/products` — 상품 추가
- `script.js`를 `localStorage` 대신 `fetch`로 서버 API와 통신하도록 변경
- 이제 데이터는 `server/products.db` 파일에 저장되어, 서버가 켜져 있으면 다른 브라우저/컴퓨터에서도 같은 데이터를 볼 수 있음

## 5. Git / GitHub 연동
- Git 설치, `git init`으로 저장소 초기화
- `.gitignore` 추가 (`node_modules/`, `*.db` 제외)
- 첫 커밋 후 GitHub 원격 저장소(`my-erp`)에 push
- 이후 원격 저장소 주소를 `YunStoneBlack/my-erp`로 변경

## 6. 상품 수정/삭제 기능
- `server.js`에 API 추가
  - `PUT /api/products/:id` — 상품 수정
  - `DELETE /api/products/:id` — 상품 삭제
- `index.html`에 "관리" 열 추가, `style.css`에 버튼 스타일 추가
- `script.js`에 수정 모드(인라인 입력칸)와 삭제 버튼 동작 구현

## 7. 버그 수정
- 테스트 중 PowerShell의 인코딩 문제로 "웹캠" 상품 이름이 `??`로 깨졌던 데이터를 UTF-8로 정확히 복구

## 현재 구조
```
my-erp/
├── .gitignore
├── CHANGELOG.md
├── index.html
├── style.css
├── script.js
└── server/
    ├── package.json
    ├── db.js
    ├── server.js
    └── products.db   (git에는 포함되지 않음)
```

## 서버 실행 방법
```powershell
cd "C:\Users\CKD\Desktop\코딩\my-erp\server"
node server.js
```
브라우저에서 `http://localhost:3000` 접속. 종료는 해당 터미널에서 `Ctrl + C`.
