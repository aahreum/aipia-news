export type StoryTab = 'top' | 'new' | 'best';

export interface HackerNewsItem {
  id: number;
  title: string;
  by: string;
  time: number;
  score: number;
  url?: string;
}
