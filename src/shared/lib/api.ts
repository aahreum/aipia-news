import { PAGE_SIZE } from '@/shared/constants/pageSize';
import { QUERY_KEYS } from '@/shared/constants/queryKey';
import { HackerNewsItem, StoryTab } from '@/shared/types/hackerNews';

const BASE_URL = 'https://hacker-news.firebaseio.com/v0';

export const fetchStoryIds = async (tab: StoryTab): Promise<number[]> => {
  const res = await fetch(`${BASE_URL}/${tab}stories.json`);
  if (!res.ok) {
    throw new Error(`${tab} 스토리 목록을 불러오지 못했습니다`);
  }
  return res.json();
};

// 모듈 레벨 캐시
// staleTime(5분)과 동일한 TTL로 무한 스크롤 중 중복 fetch 방지
const ID_CACHE_TTL = 5 * 60 * 1000;
const storyIdsCache = new Map<
  StoryTab,
  { promise: Promise<number[]>; expiry: number }
>();

const getCachedStoryIds = (tab: StoryTab): Promise<number[]> => {
  const cached = storyIdsCache.get(tab);
  if (cached && Date.now() < cached.expiry) {
    return cached.promise;
  }
  const promise = fetchStoryIds(tab).catch((err) => {
    storyIdsCache.delete(tab);
    throw err;
  });
  storyIdsCache.set(tab, { promise, expiry: Date.now() + ID_CACHE_TTL });
  return promise;
};

export const fetchStory = async (
  id: number,
): Promise<HackerNewsItem | null> => {
  const res = await fetch(`${BASE_URL}/item/${id}.json`);
  if (!res.ok) {
    throw new Error(`스토리(${id})를 불러오지 못했습니다`);
  }
  return res.json();
};

export const storiesQueryOptions = (tab: StoryTab) => ({
  queryKey: [QUERY_KEYS.stories, tab],
  queryFn: async ({ pageParam }: { pageParam: number }) => {
    const allIds = await getCachedStoryIds(tab);
    const pageIds = allIds.slice(
      pageParam * PAGE_SIZE,
      (pageParam + 1) * PAGE_SIZE,
    );
    const stories = await Promise.all(pageIds.map(fetchStory));
    return {
      stories: stories.filter((s): s is HackerNewsItem => s !== null),
      hasMore: pageIds.length === PAGE_SIZE,
    };
  },
  initialPageParam: 0,
});
