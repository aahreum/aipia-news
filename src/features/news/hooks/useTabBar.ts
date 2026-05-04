import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useRef } from 'react';

const TABS = ['Top', 'New', 'Best'] as const;
export type Tab = (typeof TABS)[number];

export const useTabBar = () => {
  const searchParams = useSearchParams();
  const activeTab = (searchParams.get('tab') as Tab) ?? 'Top';
  const router = useRouter();
  const pathname = usePathname();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleTabClick = (tab: Tab) => {
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

  return { TABS, activeTab, tabRefs, handleTabClick, handleKeyDown };
};
