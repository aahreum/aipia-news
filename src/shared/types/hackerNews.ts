export type StoryTab = 'top' | 'new' | 'best';

export const STORY_TABS: StoryTab[] = ['top', 'new', 'best'];

export const isStoryTab = (value: unknown): value is StoryTab =>
  STORY_TABS.includes(value as StoryTab);

export interface HackerNewsItem {
  id: number;
  title: string;
  by: string;
  time: number;
  score: number;
  url?: string;
}
