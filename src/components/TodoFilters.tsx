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
  { value: 'createdAt', label: '🕐 Ngày tạo' },
  { value: 'dueDate', label: '📅 Ngày hết hạn' },
  { value: 'priority', label: '🔥 Độ ưu tiên' },
  { value: 'title', label: '🔤 Tên A-Z' },
];

const CATEGORY_OPTIONS = [
  { value: 'all', label: '🌟 Tất cả danh mục' },
  { value: 'work', label: '💼 Công việc' },
  { value: 'personal', label: '👤 Cá nhân' },
  { value: 'shopping', label: '🛒 Mua sắm' },
  { value: 'health', label: '🏥 Sức khỏe' },
  { value: 'education', label: '📚 Học tập' },
  { value: 'other', label: '🔧 Khác' },
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
    <div className="bg-slate-800/30 backdrop-blur-md border-2 border-slate-600 pixel-border-glow p-4 md:p-6 hover:border-cyan-400 transition-all duration-300 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-lg md:text-xl font-bold text-cyan-300 font-mono tracking-wider flex items-center">
          <span className="text-2xl mr-3">🔍</span>
          BỘ LỌC & TÌM KIẾM
        </h2>
        {hasActiveFilters && (
          <Button 
            variant="danger" 
            size="sm" 
            onClick={onClearFilters}
            className="self-start md:self-auto"
          >
            <span className="mr-2">🗑️</span>
            Xóa bộ lọc
          </Button>
        )}
      </div>

      {/* Search */}
      <Input
        placeholder="Tìm kiếm nhiệm vụ..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        variant="nebula"
      />

      {/* Filter buttons */}
      <div className="space-y-3">
        <label className="block text-sm font-bold text-cyan-300 font-mono tracking-wider">
          🎯 TRẠNG THÁI
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {FILTER_OPTIONS.map((option) => (
            <Button
              key={option.value}
              variant={filter === option.value ? 'cosmic' : 'default'}
              size="sm"
              onClick={() => onFilterChange(option.value)}
              className="text-xs md:text-sm"
              glow={filter === option.value}
            >
              {option.icon} {option.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Category and Sort */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select
          label="Danh Mục"
          value={categoryFilter}
          onChange={(e) => onCategoryFilterChange(e.target.value)}
          options={CATEGORY_OPTIONS}
          variant="nebula"
        />

        <Select
          label="Sắp Xếp Theo"
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          options={SORT_OPTIONS}
          variant="nebula"
        />
      </div>

      {/* Results count */}
      <div className="pt-4 border-t-2 border-slate-600">
        <div className="bg-gradient-to-r from-purple-900/30 to-cyan-900/30 border border-purple-400 p-3 pixel-border-glow">
          <p className="text-sm text-purple-300 font-mono text-center">
            HIỂN THỊ <span className="font-bold text-cyan-400">{filteredCount}</span> / <span className="font-bold text-yellow-400">{totalTodos}</span> NHIỆM VỤ
            {hasActiveFilters && (
              <span className="text-pink-400 font-bold"> (ĐÃ LỌC)</span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
