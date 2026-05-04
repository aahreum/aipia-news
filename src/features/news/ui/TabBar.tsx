'use client';

import { cn } from '@/shared/lib/cn';
import { useTabBar } from '../hooks/useTabBar';

export default function TabBar() {
  const { TABS, activeTab, tabRefs, handleTabClick, handleKeyDown } =
    useTabBar();

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
