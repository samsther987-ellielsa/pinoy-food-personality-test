# Plan: AdSense-Ready Pinoy Food Website

## Executive Summary

| 항목 | 내용 |
|------|------|
| Feature | AdSense 승인을 위한 Pinoy Food 웹사이트 재구축 |
| 시작일 | 2026-03-27 |
| 목표 마감 | 2026-04-02 (D-6) |
| 검토 재신청 가능일 | 2026-04-02 |

### Value Delivered (4-Perspective)

| 관점 | 내용 |
|------|------|
| **Problem** | 5번 연속 애드센스 거절 — "가치 없는 콘텐츠(thin content)" 판정. 현재 사이트는 단일 HTML 파일, 퀴즈 UI만 존재, 실질적인 텍스트 콘텐츠 없음 |
| **Solution** | 현재 퀴즈를 메인 페이지로 활용하면서, 필리핀 음식 가이드 블로그 + 필수 정책 페이지를 추가해 AdSense 최소 콘텐츠 요건을 충족하는 멀티페이지 사이트로 전환 |
| **Function / UX Effect** | 방문자는 퀴즈 결과 확인 후 자신의 MBTI 음식에 대한 상세 아티클로 자연스럽게 유입 → 체류 시간 증가, AdSense 요건 충족 |
| **Core Value** | 6일 안에 구조적으로 완성된 콘텐츠 사이트로 전환, 4월 2일 AdSense 재심사 통과 |

---

## 1. 상황 분석

### 1.1 거절 원인 (Google 공식 가이드 기반)

Google AdSense가 명시한 "가치 없는 콘텐츠" 거절 기준:

| 문제 | 현재 사이트 상태 |
|------|----------------|
| **최소 콘텐츠 미충족** | 단일 페이지, 텍스트 콘텐츠 거의 없음 |
| **빈약한(thin) 콘텐츠** | 퀴즈 버튼 텍스트 외 실질적 글 없음 |
| **필수 페이지 없음** | About, Contact, Privacy Policy 없음 |
| **네비게이션 없음** | 단일 HTML 파일, 다른 페이지로 이동 불가 |
| **콘텐츠 목적 불명확** | 퀴즈 결과 외 독자에게 제공하는 정보 없음 |

### 1.2 AdSense 최소 요건 (Google 공식 기준)

- ✅ 각 페이지당 충분한 텍스트 콘텐츠 (권장 500+ 단어)
- ✅ 명확한 사이트 주제와 목적
- ✅ About, Contact, Privacy Policy 페이지 존재
- ✅ 네비게이션 메뉴 (사이트 구조)
- ✅ 오리지널 콘텐츠 (복사/자동생성 불가)
- ✅ 사이트 소유권 확인 가능

### 1.3 강점 (현재 자산)

- 퀴즈 로직 완성됨 (16문항, 16가지 결과)
- 각 결과에 필리핀 음식 설명 존재 (EN/TL 이중 언어)
- 다크모드, 반응형 디자인 기존 구현
- 명확한 테마: 필리핀 음식 × MBTI × K-Pop

---

## 2. 목표

### 2.1 Primary Goal
**2026년 4월 2일까지 Google AdSense 심사 통과**

### 2.2 핵심 요건
1. 멀티페이지 구조 (최소 8개 이상 페이지)
2. 각 페이지 500단어 이상의 오리지널 콘텐츠
3. About / Contact / Privacy Policy 페이지 완성
4. 필리핀 음식 가이드 블로그 섹션 (최소 5개 아티클)
5. SEO 기본 구성 (메타태그, 구조화 데이터)
6. 명확한 네비게이션 구조

---

## 3. 사이트 구조 계획

```
pinoy-food-test/
│
├── index.html              ← 퀴즈 메인 (기존 유지 + 네비 추가)
│
├── about.html              ← About Us 페이지 [신규]
├── contact.html            ← Contact 페이지 [신규]
├── privacy-policy.html     ← Privacy Policy [신규]
│
├── blog/
│   ├── index.html          ← 블로그 목록 페이지 [신규]
│   ├── what-is-lechon.html     ← ENTJ 음식 아티클 [신규]
│   ├── sinigang-guide.html     ← ISFJ 음식 아티클 [신규]
│   ├── adobo-history.html      ← ISTJ 음식 아티클 [신규]
│   ├── halo-halo-guide.html    ← ENFP 음식 아티클 [신규]
│   └── balut-facts.html        ← INTP 음식 아티클 [신규]
│
└── results/
    └── index.html          ← 16 MBTI 결과 안내 페이지 [신규]
```

**총 예상 페이지: 12개**

---

## 4. 페이지별 콘텐츠 계획

### 4.1 메인 퀴즈 페이지 (index.html) - 수정
- 현재 퀴즈 UI 유지
- **추가**: 상단 네비게이션 바
- **추가**: 하단 Footer (About, Privacy Policy, Contact 링크)
- **추가**: 퀴즈 소개 섹션 (500단어+) — 필리핀 음식과 MBTI 연결 스토리
- **추가**: 블로그 최신 글 미리보기 섹션

### 4.2 About 페이지
- 사이트 목적과 소개
- 필리핀 음식 문화 소개
- 퀴즈 제작 배경
- 500단어 이상

### 4.3 Privacy Policy 페이지
- 표준 Privacy Policy 텍스트
- 쿠키 사용 안내
- AdSense 광고 관련 데이터 처리 고지
- Google AdSense 심사에서 **필수** 확인 항목

### 4.4 Contact 페이지
- 연락처 양식 (또는 이메일 표시)
- 소셜 미디어 링크

### 4.5 블로그 아티클 (각 700단어 이상)

| 아티클 | 주제 | MBTI 연결 |
|--------|------|-----------|
| Lechon: The King of Filipino Feasts | 역사, 요리법, 문화적 의미 | ENTJ |
| Sinigang: The Comfort Food of the Philippines | 재료, 지역 변형, 건강 효능 | ISFJ |
| Adobo: Why Filipinos Never Get Tired of This Dish | 기원, 조리 방법, 지역 다양성 | ISTJ |
| Halo-Halo: A Rainbow in a Glass | 재료별 의미, 지역 차이, 베스트 레스토랑 | ENFP |
| Balut: The Fearless Filipino Snack | 영양, 문화적 의미, 먹는 방법 | INTP |

### 4.6 Results 가이드 페이지
- 16가지 MBTI × 필리핀 음식 매핑 전체 설명
- 각 유형별 200단어 설명 → 총 3200단어

---

## 5. 기술 스택

현재 순수 HTML/CSS/JS 유지 (프레임워크 없음):
- **장점**: 빠른 개발, 호스팅 간단
- **SEO**: 정적 HTML이므로 크롤링 유리
- **배포**: GitHub Pages 또는 Netlify (무료)

### 5.1 추가 구현 사항
- 공통 네비게이션/푸터 → JavaScript include 방식 또는 복사 붙여넣기
- Open Graph 메타태그 (공유 미리보기)
- Google Analytics 설치 (AdSense와 함께 신뢰도 증가)
- robots.txt, sitemap.xml 생성

---

## 6. 개발 일정 (D-6)

| 날짜 | 작업 | 우선순위 |
|------|------|----------|
| **D-0 (3/27)** | 사이트 구조 설계, 공통 nav/footer 컴포넌트 제작 | 🔴 Critical |
| **D-1 (3/28)** | About / Privacy Policy / Contact 페이지 완성 | 🔴 Critical |
| **D-2 (3/29)** | 블로그 아티클 3개 작성 (Lechon, Sinigang, Adobo) | 🔴 Critical |
| **D-3 (3/30)** | 블로그 아티클 2개 추가 + 블로그 목록 페이지 | 🟡 High |
| **D-4 (3/31)** | index.html 개선 (소개 섹션, 네비, 푸터) | 🟡 High |
| **D-5 (4/1)** | Results 페이지, SEO 최적화, sitemap.xml | 🟡 High |
| **D-6 (4/2)** | 최종 점검, 배포, AdSense 재신청 | ✅ Submit |

---

## 7. AdSense 심사 체크리스트

신청 전 반드시 확인:

- [ ] Privacy Policy 페이지 존재 및 링크 연결
- [ ] About 페이지 존재
- [ ] Contact 페이지 존재
- [ ] 모든 페이지 네비게이션에 연결됨
- [ ] 각 페이지 500단어 이상 오리지널 콘텐츠
- [ ] 블로그 아티클 최소 5개
- [ ] 사이트 도메인 소유권 확인 (AdSense 코드 삽입)
- [ ] 모바일 반응형 확인
- [ ] 로딩 속도 이상 없음
- [ ] 깨진 링크 없음
- [ ] 저작권 위반 콘텐츠 없음

---

## 8. 위험 요소

| 위험 | 대응 |
|------|------|
| 콘텐츠 양 부족 | 각 아티클 최소 700단어로 작성, 퀴즈 소개 섹션 추가 |
| 심사 재거절 | Privacy Policy 완벽히 작성, 콘텐츠 질 집중 |
| 배포 지연 | D-1에 배포 환경 먼저 구축 (GitHub Pages 권장) |
| 시간 부족 | 블로그 아티클을 우선 3개로 시작, 나머지 순차 추가 |
