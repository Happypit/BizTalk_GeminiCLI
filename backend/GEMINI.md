# GEMINI.md - Backend Context (BizTone Converter)

이 디렉토리는 **BizTone Converter** 프로젝트의 백엔드 로직을 담당합니다. Flask 프레임워크와 Groq AI API를 사용하여 비즈니스 말투 변환 서비스를 제공합니다.

## 1. 백엔드 개요

- **프레임워크:** Flask (Python)
- **주요 기능:**
  - Groq AI API를 활용한 텍스트 말투 변환 (`POST /api/convert`)
  - 프론트엔드 정적 파일(`index.html`, JS, CSS) 서빙
  - CORS 설정을 통한 크로스 도메인 요청 허용
  - 대상별(상사, 동료, 고객) 시스템 프롬프트 관리
- **AI 모델:** `moonshotai/kimi-k2-instruct-0905` (Groq 클라우드 경유)

## 2. 실행 및 설정 방법

### 2.1. 의존성 설치
백엔드 실행을 위해 다음 라이브러리들이 필요합니다:
```bash
pip install -r requirements.txt
```
*핵심 패키지:* `Flask`, `python-dotenv`, `Flask-Cors`, `groq`

### 2.2. 환경 변수 (`.env`)
루트 디렉토리의 `.env` 파일에 다음 설정이 필요합니다:
- `GROQ_API_KEY`: Groq 클라우드 API 키

### 2.3. 서버 실행
```bash
python app.py
```
- 기본 포트: `5000`
- 디버그 모드 활성화됨 (`app.run(debug=True)`)

## 3. 주요 API 엔드포인트

### 3.1. 말투 변환 API
- **URL:** `/api/convert`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "text": "변환할 원문 텍스트",
    "target": "Upward | Lateral | External"
  }
  ```
- **Response Body:**
  ```json
  {
    "original_text": "...",
    "converted_text": "AI가 변환한 텍스트",
    "target": "..."
  }
  ```

## 4. 개발 컨벤션 및 주의사항

- **Target Keys (대소문자 구분):** 클라이언트로부터 전달받는 `target` 값은 반드시 `Upward`, `Lateral`, `External` 중 하나여야 합니다 (대문자로 시작). 이는 `PROMPTS` 딕셔너리의 키와 직접 매칭됩니다.
- **프롬프트 관리:** `PROMPTS` 변수 내의 시스템 메시지는 말투 변환의 품질을 결정하는 핵심 요소입니다. 각 대상의 페르소나와 비즈니스 격식이 유지되도록 한국어로 상세히 정의되어 있습니다.
- **에러 핸들링:** AI 서비스 호출 실패 시 `500` 에러와 함께 로그를 기록하고, 사용자에게는 정제된 에러 메시지를 반환합니다.
- **정적 파일 서빙:** Flask는 `../frontend` 경로를 정적 폴더로 인식하여 `index.html` 및 관련 자산을 서빙합니다.

## 5. 파일 구조
- `app.py`: 메인 애플리케이션 로직, 라우팅 및 AI 연동.
- `requirements.txt`: 프로젝트 의존성 목록.
