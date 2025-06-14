'use client';

import { Button, Input, Select } from '@/components/ui';

interface TodoFiltersProps {
  filter: string;
  sortBy: string;
  searchTerm: string;
  categoryFilter: string;
  onFilterChange: (filter: string) => void;
  onSortChange: (sort: string) => void;
  onSearchChange: (search: string) => void;
  onCategoryFilterChange: (category: string) => void;
  onClearFilters: () => void;
  totalTodos: number;
  filteredCount: number;
}

const FILTER_OPTIONS = [
  { value: 'all', label: 'Tất cả', icon: '📋' },
  { value: 'active', label: 'Đang làm', icon: '⏳' },
  { value: 'completed', label: 'Hoàn thành', icon: '✅' },
  { value: 'overdue', label: 'Quá hạn', icon: '⚠️' },
];

const SORT_OPTIONS = [
  { value: 'createdAt', label: 'Ngày tạo' },
  { value: 'dueDate', label: 'Ngày hết hạn' },
  { value: 'priority', label: 'Độ ưu tiên' },
  { value: 'title', label: 'Tên A-Z' },
];

const CATEGORY_OPTIONS = [
  { value: 'all', label: 'Tất cả danh mục' },
  { value: 'work', label: 'Công việc' },
  { value: 'personal', label: 'Cá nhân' },
  { value: 'shopping', label: 'Mua sắm' },
  { value: 'health', label: 'Sức khỏe' },
  { value: 'education', label: 'Học tập' },
  { value: 'other', label: 'Khác' },
];

export function TodoFilters({
  filter,
  sortBy,
  searchTerm,
  categoryFilter,
  onFilterChange,
  onSortChange,
  onSearchChange,
  onCategoryFilterChange,
  onClearFilters,
  totalTodos,
  filteredCount,
}: TodoFiltersProps) {
  const hasActiveFilters = filter !== 'all' || searchTerm !== '' || categoryFilter !== 'all' || sortBy !== 'createdAt';

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">🔍 Bộ lọc & Tìm kiếm</h2>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={onClearFilters}>
            Xóa bộ lọc
          </Button>
        )}
      </div>

      {/* Search */}
      <Input
        placeholder="Tìm kiếm todo..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />

      {/* Filter buttons */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Trạng thái</label>
        <div className="flex flex-wrap gap-2">
          {FILTER_OPTIONS.map((option) => (
            <Button
              key={option.value}
              variant={filter === option.value ? 'primary' : 'default'}
              size="sm"
              onClick={() => onFilterChange(option.value)}
              className="text-sm"
            >
              {option.icon} {option.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Category and Sort */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select
          label="Danh mục"
          value={categoryFilter}
          onChange={(e) => onCategoryFilterChange(e.target.value)}
          options={CATEGORY_OPTIONS}
        />

        <Select
          label="Sắp xếp theo"
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          options={SORT_OPTIONS}
        />
      </div>

      {/* Results count */}
      <div className="pt-2 border-t border-gray-200">
        <p className="text-sm text-gray-600">
          Hiển thị <span className="font-medium">{filteredCount}</span> / <span className="font-medium">{totalTodos}</span> todo
          {hasActiveFilters && (
            <span className="text-blue-600"> (đã lọc)</span>
          )}
        </p>
      </div>
    </div>
  );
}
