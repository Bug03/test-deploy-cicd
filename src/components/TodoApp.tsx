'use client';

import { useMemo } from 'react';
import { useTodos, useFilters } from '@/hooks';
import { TodoForm } from './TodoForm';
import { TodoList } from './TodoList';
import { TodoStats } from './TodoStats';
import { TodoFilters } from './TodoFilters';
import { 
  calculateStats, 
  sortTodos, 
  filterTodos, 
  searchTodos 
} from '@/utils';

export function TodoApp() {
  const {
    todos,
    loading,
    createTodo,
    updateTodo,
    toggleTodo,
    deleteTodo,
    clearCompleted,
    toggleAll,
  } = useTodos();

  const {
    filter,
    sortBy,
    searchTerm,
    categoryFilter,
    updateFilter,
    updateSort,
    updateSearch,
    updateCategoryFilter,
    clearFilters,
  } = useFilters();

  // Tính toán danh sách todos đã được filter và sort
  const processedTodos = useMemo(() => {
    let result = [...todos];

    // Apply category filter
    if (categoryFilter !== 'all') {
      result = result.filter(todo => todo.category === categoryFilter);
    }

    // Apply status filter
    result = filterTodos(result, filter);

    // Apply search
    result = searchTodos(result, searchTerm);

    // Apply sort
    result = sortTodos(result, sortBy);

    return result;
  }, [todos, filter, sortBy, searchTerm, categoryFilter]);

  // Tính toán stats
  const stats = useMemo(() => calculateStats(todos), [todos]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">⏳</div>
          <p className="text-gray-600">Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            📝 TodoList App
          </h1>
          <p className="text-gray-600">
            Quản lý công việc hiệu quả với Next.js
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left sidebar - Form và Stats */}
          <div className="lg:col-span-1 space-y-6">
            {/* Todo Form */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                ➕ Thêm Todo Mới
              </h2>
              <TodoForm onSubmit={createTodo} />
            </div>

            {/* Stats */}
            <TodoStats stats={stats} />
          </div>

          {/* Main content - Filters và TodoList */}
          <div className="lg:col-span-2 space-y-6">
            {/* Filters */}
            <TodoFilters
              filter={filter}
              sortBy={sortBy}
              searchTerm={searchTerm}
              categoryFilter={categoryFilter}
              onFilterChange={updateFilter}
              onSortChange={updateSort}
              onSearchChange={updateSearch}
              onCategoryFilterChange={updateCategoryFilter}
              onClearFilters={clearFilters}
              totalTodos={todos.length}
              filteredCount={processedTodos.length}
            />

            {/* Todo List */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">
                  📋 Danh sách Todo
                </h2>
                {processedTodos.length > 0 && (
                  <span className="text-sm text-gray-600">
                    {processedTodos.length} todo
                  </span>
                )}
              </div>

              <TodoList
                todos={processedTodos}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
                onUpdate={updateTodo}
                onToggleAll={toggleAll}
                onClearCompleted={clearCompleted}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center text-sm text-gray-600">
          <p>
            Được xây dựng với ❤️ bởi{' '}
            <strong>Next.js 15 + TypeScript + Tailwind CSS</strong>
          </p>
          <p className="mt-1">
            Dự án TodoList chuyên nghiệp - Học tập và phát triển
          </p>
        </footer>
      </div>
    </div>
  );
}
