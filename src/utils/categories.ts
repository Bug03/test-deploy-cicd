/**
 * Predefined todo categories with emojis and colors
 */
export const TODO_CATEGORIES = [
  {
    id: 'work',
    label: 'Công việc',
    emoji: '💼',
    color: 'blue',
    description: 'Các công việc liên quan đến nghề nghiệp'
  },
  {
    id: 'personal',
    label: 'Cá nhân',
    emoji: '👤',
    color: 'green',
    description: 'Công việc cá nhân và gia đình'
  },
  {
    id: 'shopping',
    label: 'Mua sắm',
    emoji: '🛒',
    color: 'purple',
    description: 'Danh sách mua sắm và đồ dùng'
  },
  {
    id: 'health',
    label: 'Sức khỏe',
    emoji: '💪',
    color: 'red',
    description: 'Chăm sóc sức khỏe và thể dục'
  },
  {
    id: 'education',
    label: 'Học tập',
    emoji: '📚',
    color: 'indigo',
    description: 'Học tập và phát triển bản thân'
  },
  {
    id: 'other',
    label: 'Khác',
    emoji: '📝',
    color: 'gray',
    description: 'Các công việc khác'
  }
] as const;

/**
 * Get category by ID
 */
export function getCategoryById(id: string) {
  return TODO_CATEGORIES.find(cat => cat.id === id);
}

/**
 * Get category color class
 */
export function getCategoryColor(categoryId: string): string {
  const category = getCategoryById(categoryId);
  if (!category) return 'bg-gray-100 text-gray-800';

  const colorMap = {
    blue: 'bg-blue-100 text-blue-800 border-blue-200',
    green: 'bg-green-100 text-green-800 border-green-200',
    purple: 'bg-purple-100 text-purple-800 border-purple-200',
    red: 'bg-red-100 text-red-800 border-red-200',
    indigo: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    gray: 'bg-gray-100 text-gray-800 border-gray-200',
  };

  return colorMap[category.color as keyof typeof colorMap] || colorMap.gray;
}

/**
 * Format category for display
 */
export function formatCategory(categoryId: string): string {
  const category = getCategoryById(categoryId);
  return category ? `${category.emoji} ${category.label}` : categoryId;
}
