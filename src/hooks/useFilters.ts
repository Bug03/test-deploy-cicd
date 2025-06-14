'use client';

import { useState, useCallback } from 'react';

/**
 * Custom hook để quản lý trạng thái filter và search
 */
export function useFilters() {
  const [filter, setFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('createdAt');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const updateFilter = useCallback((newFilter: string) => {
    setFilter(newFilter);
  }, []);

  const updateSort = useCallback((newSort: string) => {
    setSortBy(newSort);
  }, []);

  const updateSearch = useCallback((term: string) => {
    setSearchTerm(term);
  }, []);

  const updateCategoryFilter = useCallback((category: string) => {
    setCategoryFilter(category);
  }, []);

  const clearFilters = useCallback(() => {
    setFilter('all');
    setSortBy('createdAt');
    setSearchTerm('');
    setCategoryFilter('all');
  }, []);

  return {
    filter,
    sortBy,
    searchTerm,
    categoryFilter,
    updateFilter,
    updateSort,
    updateSearch,
    updateCategoryFilter,
    clearFilters,
  };
}
