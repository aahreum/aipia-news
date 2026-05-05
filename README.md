# AIPIA News

Hacker News의 Top, New, Best 스토리를 카드 형태로 제공하는 뉴스 피드 웹입니다.

🔗 **배포 URL**: https://aipia-news-leeahreum.vercel.app/

---

## 시작하기

### 사전 요구사항

- Node.js 18+
- pnpm

### 설치 및 실행

```bash
git clone https://github.com/aahreum/aipia-news.git
cd aipia-news
pnpm install
pnpm dev
```

### 빌드

```bash
pnpm build
pnpm start
```

---

## 프로젝트 구조

```
src/
├── app/                    # 라우팅, 레이아웃, 글로벌 스타일
│   ├── story/[id]/         # 상세 페이지
│   ├── layout.tsx
│   ├── page.tsx
│   ├── not-found.tsx
│   └── error.tsx
├── features/
│   └── news/
│       ├── hooks/          # useNewsList, useColumnCount
│       └── ui/             # NewsList, NewsCard, TabBar, Skeleton
└── shared/
    ├── assets/icons/
    ├── constants/
    ├── lib/                # API 호출 (fetchStory, fetchStoryIds)
    ├── providers/          # QueryProvider
    ├── types/
    ├── ui/                 # Button, Header, SkeletonBox
    └── utils/
```

---

## 구현 기능

### 필수

- **뉴스 목록** — 카드 형태로 제목, 작성자, 작성일, 썸네일(Picsum Photos) 표시
- **탭 전환** — Top / New / Best 클릭 시 해당 데이터 로드
- **상세 페이지** — 제목, 작성자, 점수, 작성일, 원문 링크 표시

### 선택

- **무한 스크롤** — TanStack Query `useInfiniteQuery` + 가상 스크롤 index 기반 트리거
- **가상 스크롤** — TanStack Virtual `useWindowVirtualizer`로 뷰포트에 보이는 행만 렌더링
- **스켈레톤 UI** — 목록·상세 페이지 로딩 상태 처리
- **동적 메타데이터** — 상세 페이지 진입 시 탭 타이틀 자동 설정 (`generateMetadata`)
- **404 / 에러 페이지** — 잘못된 경로·API 오류 시 전용 페이지 표시
- **반응형** — 1열(모바일) / 2열(태블릿) / 3열(데스크톱) 그리드

---

## 기술 스택

| 분류           | 기술                    |
| -------------- | ----------------------- |
| Framework      | Next.js 16 (App Router) |
| Language       | TypeScript              |
| Server State   | TanStack Query v5       |
| Virtualization | TanStack Virtual v3     |
| Styling        | Tailwind CSS v4         |
| Linting        | ESLint, Prettier, Husky |

---

## 기술 선택 이유

**Next.js (App Router)**
뉴스 사이트 특성상 SEO가 중요하고, 초기 로딩 시 서버에서 데이터를 미리 렌더링(prefetch)해 빠르게 보여준 뒤 무한 스크롤로 추가 데이터를 불러오는 구조가 적합하다고 판단했습니다. 또한 `generateMetadata`로 상세 페이지별 동적 타이틀을, `loading.tsx`로 Suspense 경계를 선언적으로 처리할 수 있는 점도 활용했습니다.

**TanStack Query**
Hacker News API는 스토리 ID 목록과 개별 스토리를 별도로 요청해야 하는 구조라 캐싱 전략이 중요합니다. `staleTime` 등으로 캐시 유효 시간을 세밀하게 제어할 수 있고, 탭 전환 시 이전 데이터를 캐시에서 즉시 제공해 불필요한 재요청을 줄입니다. DevTools로 캐싱 상태를 직관적으로 확인할 수 있어 디버깅에도 유리합니다.

**TanStack Virtual**
Hacker News API의 스토리 ID 목록이 최대 500개에 달하기 때문에 무한 스크롤로 누적되는 DOM 노드가 많아질수록 성능 저하가 발생합니다. `useWindowVirtualizer`로 현재 뷰포트에 보이는 행만 렌더링해 DOM 크기를 일정하게 유지하고 스크롤 성능을 확보했습니다.

---

## AI 활용

이 프로젝트는 개발 전반에 걸쳐 Claude Code(AI 코딩 어시스턴트)를 활용했습니다.

- **이슈 & 문서 작성** — 구현할 기능과 버그를 이슈 문서(`docs/issue/`)로 정리하고, 변경 사항을 PR 문서(`docs/pr/`)로 작성하는 데 활용했습니다.
- **PR 초안 자동화** — `/pr-draft` 커스텀 커맨드를 등록해 현재 브랜치의 커밋과 변경 파일을 분석한 PR 초안을 자동으로 생성했습니다.
- **코드 리뷰** — 타입 누락, API 반환값 불일치 등 잠재적인 문제를 사전에 짚어내는 데 활용했습니다.
