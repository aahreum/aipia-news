'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useRef } from 'react';
import { cn } from '@/shared/lib/cn';

const TABS = ['Top', 'New', 'Best'] as const;
type Tab = (typeof TABS)[number];

export default function TabBar() {
  const searchParams = useSearchParams();
  const activeTab = (searchParams.get('tab') as Tab) ?? 'Top';
  const router = useRouter();
  const pathname = usePathname();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleTabClick = (tab: Tab) => {
    // TODO: 탭 전환에 따른 뉴스 목록 필터링 연결
    const params = new URLSearchParams(searchParams.toString());
    params.set('tab', tab);
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    let nextIndex: number | null = null;

    if (e.key === 'ArrowRight') {
      nextIndex = (index + 1) % TABS.length;
    }
    if (e.key === 'ArrowLeft') {
      nextIndex = (index - 1 + TABS.length) % TABS.length;
    }
    if (e.key === 'Home') {
      nextIndex = 0;
    }
    if (e.key === 'End') {
      nextIndex = TABS.length - 1;
    }

    if (nextIndex !== null) {
      e.preventDefault();
      handleTabClick(TABS[nextIndex]);
      tabRefs.current[nextIndex]?.focus();
    }
  };

  return (
    <div
      role='tablist'
      aria-label='뉴스 카테고리'
      className='sticky top-18 z-10 flex w-full bg-white after:absolute after:bottom-0 after:left-1/2 after:h-px after:w-screen after:-translate-x-1/2 after:bg-gray-200'>
      {TABS.map((tab, index) => {
        const isActive = activeTab === tab;
        return (
          <button
            key={tab}
            ref={(el) => {
              tabRefs.current[index] = el;
            }}
            role='tab'
            aria-selected={isActive}
            aria-controls={`tabpanel-${tab.toLowerCase()}`}
            id={`tab-${tab.toLowerCase()}`}
            tabIndex={isActive ? 0 : -1}
            onClick={() => handleTabClick(tab)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className={cn(
              'relative flex-1 cursor-pointer py-3 text-center text-sm font-bold transition-colors',
              isActive
                ? 'text-primary after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-primary'
                : 'font-normal text-gray-500',
            )}>
            {tab}
          </button>
        );
      })}
    </div>
  );
}
