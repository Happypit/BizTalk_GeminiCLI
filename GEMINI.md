# GEMINI.md - BizTone Converter 프로젝트 컨텍스트

이 프로젝트인 **BizTone Converter**는 비즈니스 커뮤니케이션의 전문성을 높이기 위해 설계된 AI 기반 웹 애플리케이션입니다. 일상적인 표현이나 초안 상태의 메시지를 수신자(상사, 동료, 고객)에 맞는 적절한 비즈니스 말투로 변환해 줍니다.

## 1. 프로젝트 개요

- **목적:** 상사(**Upward**), 동료(**Lateral**), 고객(**External**) 등 대상별로 최적화된 전문적인 비즈니스 언어로 텍스트를 변환하는 사용하기 쉬운 도구 제공.
- **아키텍처:**
  - **프론트엔드:** HTML5와 최신 JavaScript로 구축된 반응형 싱글 페이지 애플리케이션(SPA). PostCSS를 통한 **Tailwind CSS v4** 스타일링.
  - **백엔드:** 프론트엔드를 정적 파일로 서빙하고 텍스트 변환을 위한 REST API를 제공하는 **Flask** (Python) 서버.
  - **AI 엔진:** `moonshotai/kimi-k2-instruct-0905` 모델을 사용하는 **Groq AI API** 연동.

## 2. 주요 기술 스택

- **프론트엔드:** HTML, JavaScript (ES6+), Tailwind CSS v4, PostCSS, Autoprefixer.
- **백엔드:** Python, Flask, Flask-CORS, python-dotenv, Groq SDK.
- **배포:** Vercel (프론트엔드 및 서버리스 함수)을 통한 배포 예정.

## 3. 빌드 및 실행 방법

### 3.1. 백엔드 (Flask API)
1. **환경 설정:**
   - 루트 디렉토리에 `GROQ_API_KEY`가 포함된 `.env` 파일이 있는지 확인합니다.
   - 가상 환경을 생성하고 활성화합니다:
     ```bash
     python -m venv .venv
     # Windows:
     .venv\Scripts\activate
     # Unix/macOS:
     source .venv/bin/activate
     ```
2. **패키지 설치:**
   ```bash
   pip install -r backend/requirements.txt
   ```
3. **서버 실행:**
   ```bash
   python backend/app.py
   ```
   서버는 `http://127.0.0.1:5000`에서 실행됩니다.

### 3.2. 프론트엔드 (Tailwind CSS)
HTML이나 Tailwind 설정이 변경될 때마다 CSS를 컴파일해야 합니다.
1. **프론트엔드 디렉토리로 이동:** `cd frontend`
2. **Node 패키지 설치:** `npm install`
3. **CSS 빌드:** `npm run build:css`
   - 이 명령은 PostCSS를 실행하여 `css/style.css`를 기반으로 `css/tailwind.css`를 생성합니다.

## 4. 개발 컨벤션

- **대상 고객 키값 (Target Keys):** 프로젝트는 수신 대상을 위해 엄격하게 첫 글자가 대문자인 영어 단어(`Upward`, `Lateral`, `External`)를 사용합니다. 이 키값은 프론트엔드의 라디오 버튼 값, API 요청 본문, 그리고 백엔드의 `PROMPTS` 딕셔너리에서 모두 일치해야 합니다.
- **정적 파일 서빙:** Flask 앱은 `frontend` 디렉토리를 서빙하도록 구성되어 있습니다. `/` 경로로 접속하면 `index.html`이 서빙됩니다.
- **API 엔드포인트:** 모든 변환 요청은 `POST /api/convert`로 전송되어야 하며, JSON 본문 형식은 `{ "text": "...", "target": "Upward|Lateral|External" }`입니다.
- **스타일링:** **Tailwind CSS v4**의 Utility-first 접근 방식을 준수합니다. 필요한 경우가 아니면 `style.css`에 직접 CSS를 추가하지 말고 HTML에서 Tailwind 클래스를 사용하세요.
- **프롬프트:** AI 시스템 프롬프트는 `backend/app.py` 내의 `PROMPTS` 딕셔너리에 정의되어 있으며, 고품질의 한국어 출력을 위해 한국어로 작성되었습니다.

## 5. 프로젝트 구조

- `backend/`: Flask 애플리케이션 및 의존성 파일.
- `frontend/`: 정적 자산(HTML, CSS, JS) 및 Tailwind 설정을 위한 Node.js 구성.
- `PRD.md`: 상세 제품 요구사항 문서.
- `.env`: (Git 무시) 민감한 API 키를 포함합니다.
