import { PAGE_SIZE } from '@/shared/constants/pageSize';
import { QUERY_KEYS } from '@/shared/constants/queryKey';
import { HackerNewsItem, StoryTab } from '@/shared/types/hackerNews';

const BASE_URL = 'https://hacker-news.firebaseio.com/v0';

export const fetchStoryIds = async (tab: StoryTab): Promise<number[]> => {
  const res = await fetch(`${BASE_URL}/${tab}stories.json`);
  if (!res.ok) {
    throw new Error(`Failed to fetch ${tab} stories`);
  }
  return res.json();
};

export const fetchStory = async (id: number): Promise<HackerNewsItem> => {
  const res = await fetch(`${BASE_URL}/item/${id}.json`);
  if (!res.ok) {
    throw new Error(`Failed to fetch story ${id}`);
  }
  return res.json();
};

export const storiesQueryOptions = (tab: StoryTab) => ({
  queryKey: [QUERY_KEYS.stories, tab],
  queryFn: async ({ pageParam }: { pageParam: number }) => {
    const allIds = await fetchStoryIds(tab);
    const pageIds = allIds.slice(
      pageParam * PAGE_SIZE,
      (pageParam + 1) * PAGE_SIZE,
    );
    return Promise.all(pageIds.map(fetchStory));
  },
  initialPageParam: 0,
});
