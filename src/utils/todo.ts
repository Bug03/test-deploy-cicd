import { Todo, TodoStats } from '@/types';

/**
 * Generate unique ID cho todo items
 */
export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

/**
 * Format date cho display
 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('vi-VN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
}

/**
 * Format date với time
 */
export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat('vi-VN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

/**
 * Check nếu todo đã quá hạn
 */
export function isOverdue(todo: Todo): boolean {
  if (!todo.dueDate) return false;
  return new Date(todo.dueDate) < new Date() && !todo.completed;
}

/**
 * Get priority color
 */
export function getPriorityColor(priority: Todo['priority']): string {
  switch (priority) {
    case 'high':
      return 'text-red-600 bg-red-50 border-red-200';
    case 'medium':
      return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    case 'low':
      return 'text-green-600 bg-green-50 border-green-200';
    default:
      return 'text-gray-600 bg-gray-50 border-gray-200';
  }
}

/**
 * Get priority label
 */
export function getPriorityLabel(priority: Todo['priority']): string {
  switch (priority) {
    case 'high':
      return 'Cao';
    case 'medium':
      return 'Trung bình';
    case 'low':
      return 'Thấp';
    default:
      return 'Không xác định';
  }
}

/**
 * Calculate todo statistics
 */
export function calculateStats(todos: Todo[]): TodoStats {
  const total = todos.length;
  const completed = todos.filter(todo => todo.completed).length;
  const active = total - completed;
  const overdue = todos.filter(todo => isOverdue(todo)).length;

  return {
    total,
    completed,
    active,
    overdue,
  };
}

/**
 * Sort todos by specified field
 */
export function sortTodos(todos: Todo[], sortBy: string): Todo[] {
  return [...todos].sort((a, b) => {
    switch (sortBy) {
      case 'title':
        return a.title.localeCompare(b.title);
      case 'priority':
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      case 'dueDate':
        if (!a.dueDate && !b.dueDate) return 0;
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      case 'createdAt':
      default:
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
  });
}

/**
 * Filter todos
 */
export function filterTodos(todos: Todo[], filter: string): Todo[] {
  switch (filter) {
    case 'completed':
      return todos.filter(todo => todo.completed);
    case 'active':
      return todos.filter(todo => !todo.completed);
    case 'overdue':
      return todos.filter(todo => isOverdue(todo));
    case 'all':
    default:
      return todos;
  }
}

/**
 * Search todos by title or description
 */
export function searchTodos(todos: Todo[], searchTerm: string): Todo[] {
  if (!searchTerm.trim()) return todos;
  
  const term = searchTerm.toLowerCase();
  return todos.filter(
    todo =>
      todo.title.toLowerCase().includes(term) ||
      todo.description?.toLowerCase().includes(term) ||
      todo.category.toLowerCase().includes(term)
  );
}
