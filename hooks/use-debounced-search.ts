// useDebounced Search Hook - Оптимизированный поиск с debounce
// Предотвращает избыточные запросы при вводе пользователя
// Улучшает производительность и UX

import { useState, useEffect, useMemo } from 'react';
import { PAGINATION } from '@/constants/app';

type UseDebounceSearchOptions = {
  delay?: number;
  minLength?: number;
}

export function useDebounceSearch<T>(
  items: T[],
  searchFn: (items: T[], query: string) => T[],
  options: UseDebounceSearchOptions = {}
) {
  const { delay = PAGINATION.SEARCH_DEBOUNCE_MS, minLength = 1 } = options;
  
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, delay);

    return () => clearTimeout(timer);
  }, [searchQuery, delay]);

  const searchResults = useMemo(() => {
    if (!debouncedQuery || debouncedQuery.length < minLength) {
      return items;
    }
    return searchFn(items, debouncedQuery);
  }, [items, debouncedQuery, searchFn, minLength]);

  return {
    searchQuery,
    setSearchQuery,
    searchResults,
    isSearching: searchQuery !== debouncedQuery,
    hasQuery: debouncedQuery.length >= minLength,
  };
}
