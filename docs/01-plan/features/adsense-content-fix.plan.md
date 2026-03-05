# Plan: AdSense "No Publisher Content" 반려 해결

## 배경
Google AdSense 신청이 "게시자 콘텐츠가 없는 화면에 Google 게재 광고" (Valuable Inventory: No Content) 사유로 반려됨.

## 문제 분석

### 1. AdSense 봇이 콘텐츠를 인식하지 못하는 원인들

| 페이지 | 문제 | 심각도 |
|--------|------|--------|
| **result.html** | 콘텐츠가 JS로 동적 렌더링 (결과 데이터가 result.js에서 inject됨). 광고는 있지만 AdSense 봇이 크롤링 시 빈 "Loading..." 텍스트만 보임 | **높음** |
| **quiz.html** | 질문/답변이 quiz.js에서 동적 렌더링. 봇이 빈 "Question?" 텍스트만 봄 | 중간 |
| **loading.html** | 3초 전환 화면. 콘텐츠 매우 부족하지만 광고 없음 | 낮음 |
| **index.html** | 정적 콘텐츠 풍부 + 광고. 문제 없음 | 없음 |

### 2. `data-ad-slot="auto"` 문제
- 현재 두 페이지 모두 `data-ad-slot="auto"`를 사용 중
- Google AdSense에서 실제 ad unit을 만들어서 고유 slot ID를 사용해야 함
- "auto"는 유효한 ad slot이 아닐 수 있음

### 3. 핵심 원인: result.html
- AdSense 광고가 있는 result.html에서 봇이 크롤링할 때 JS 실행 전 상태를 봄
- HTML에는 "Loading...", "ESTJ" 같은 최소 텍스트만 있음
- **noscript 섹션이 있지만 8개 MBTI만 포함** (16개 중 8개 누락)

## 해결 방안

### Phase 1: 핵심 수정 (콘텐츠 보강)

#### 1-1. result.html noscript 콘텐츠 완성
- 16개 MBTI 전체 food match 정보를 noscript에 추가
- 각 매치에 대한 설명 포함 (봇이 읽을 수 있는 실질적 콘텐츠)

#### 1-2. result.html에 정적 HTML 콘텐츠 추가
- AdSense 봇은 noscript만 의존하지 않음
- 광고 아래에 정적 "All 16 Filipino Food Matches" 섹션 추가
- JS 실행 없이도 볼 수 있는 실질적 콘텐츠

#### 1-3. loading.html robots 처리
- loading.html에 `<meta name="robots" content="noindex">` 추가
- 크롤러가 이 페이지를 인덱싱하지 않도록 방지
- sitemap.xml에서도 loading.html 제거 확인

### Phase 2: 광고 배치 최적화

#### 2-1. 콘텐츠 부족 페이지에서 AdSense 스크립트 제거
- result.html의 AdSense 광고를 **유지**하되, 정적 콘텐츠를 반드시 먼저 보강
- quiz.html, loading.html에는 광고를 추가하지 않음

#### 2-2. 콘텐츠 풍부한 페이지에만 광고 유지
- index.html: 유지 (풍부한 정적 콘텐츠)
- result.html: 유지 (정적 콘텐츠 보강 후)

### Phase 3: SEO/크롤러 최적화

#### 3-1. sitemap.xml 검증
- loading.html이 sitemap에 포함되어 있으면 제거
- 콘텐츠가 풍부한 페이지만 sitemap에 포함

#### 3-2. 각 페이지 meta description 확인
- 모든 페이지에 적절한 meta description 있는지 확인

## 작업 우선순위

1. **result.html 정적 콘텐츠 보강** (가장 중요 - 광고 있는 페이지)
2. **loading.html noindex 처리**
3. **noscript 콘텐츠 16개 MBTI 전체로 완성**
4. **sitemap.xml 검증**
5. 재심사 신청

## 예상 결과
- AdSense 봇이 크롤링할 때 광고가 있는 모든 페이지에서 충분한 게시자 콘텐츠를 확인할 수 있음
- "게시자 콘텐츠가 없는 화면" 문제 해결
