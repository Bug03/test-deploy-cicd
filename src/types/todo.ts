/**
 * Todo item interface
 * Định nghĩa cấu trúc dữ liệu cho một todo item
 */
export interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  category: string;
  createdAt: Date;
  updatedAt: Date;
  dueDate?: Date;
}

/**
 * Todo filter options
 * Các tùy chọn để lọc danh sách todo
 */
export type TodoFilter = 'all' | 'active' | 'completed';

/**
 * Todo sort options
 * Các tùy chọn sắp xếp todo
 */
export type TodoSort = 'createdAt' | 'dueDate' | 'priority' | 'title';

/**
 * Form data cho tạo/cập nhật todo
 */
export interface TodoFormData {
  title: string;
  description?: string;
  priority: 'low' | 'medium' | 'high';
  category: string;
  dueDate?: string; // ISO string format
}

/**
 * Todo statistics
 */
export interface TodoStats {
  total: number;
  completed: number;
  active: number;
  overdue: number;
}
