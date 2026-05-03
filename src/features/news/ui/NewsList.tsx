import type { HackerNewsItem } from '@/shared/types/hackerNews';
import NewsCard from './NewsCard';

// TODO: 실제 데이터 연동 시 제거
const DUMMY_LIST: HackerNewsItem[] = [
  {
    id: 1,
    title: 'OpenAI releases GPT-5 with multimodal reasoning',
    by: 'aaa',
    time: 1746230400,
    score: 842,
  },
  {
    id: 2,
    title: 'Anthropic announces Claude 4 with extended context window',
    by: 'bbb',
    time: 1746144000,
    score: 631,
  },
  {
    id: 3,
    title: 'Google DeepMind publishes new reinforcement learning paper',
    by: 'ccc',
    time: 1746057600,
    score: 512,
  },
  {
    id: 4,
    title: 'Meta open-sources its latest LLaMA model weights',
    by: 'ddd',
    time: 1745971200,
    score: 478,
  },
  {
    id: 5,
    title: 'Rust becomes the most-loved language for the ninth year in a row',
    by: 'eee',
    time: 1745884800,
    score: 390,
  },
];

export default function NewsList() {
  return (
    <ul
      className='mt-8 grid gap-6 sm:grid-cols-2 md:grid-cols-3'
      aria-label='뉴스 목록'>
      {DUMMY_LIST.map((item) => (
        <li key={item.id}>
          <NewsCard item={item} />
        </li>
      ))}
    </ul>
  );
}
