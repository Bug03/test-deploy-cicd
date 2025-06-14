import { Todo } from '@/types';

/**
 * Demo data để test ứng dụng
 * Có thể import và sử dụng trong development
 */
export const demoTodos: Todo[] = [
  {
    id: '1',
    title: 'Học Next.js 15 và App Router',
    description: 'Tìm hiểu về các tính năng mới của Next.js 15, đặc biệt là App Router, Server Components, và các optimization techniques.',
    completed: false,
    priority: 'high',
    category: 'education',
    createdAt: new Date('2024-06-10T09:00:00'),
    updatedAt: new Date('2024-06-10T09:00:00'),
    dueDate: new Date('2024-06-20T23:59:59'),
  },
  {
    id: '2',
    title: 'Xây dựng portfolio website',
    description: 'Tạo portfolio cá nhân để showcase các dự án đã làm.',
    completed: true,
    priority: 'medium',
    category: 'work',
    createdAt: new Date('2024-06-08T14:30:00'),
    updatedAt: new Date('2024-06-12T16:45:00'),
    dueDate: new Date('2024-06-15T23:59:59'),
  },
  {
    id: '3',
    title: 'Mua sắm cuối tuần',
    description: 'Mua rau củ, thịt cá, và các đồ dùng thiết yếu cho gia đình.',
    completed: false,
    priority: 'medium',
    category: 'shopping',
    createdAt: new Date('2024-06-13T08:15:00'),
    updatedAt: new Date('2024-06-13T08:15:00'),
    dueDate: new Date('2024-06-16T18:00:00'),
  },
  {
    id: '4',
    title: 'Tập gym',
    description: 'Workout session 1 tiếng: cardio 20 phút + weight training 40 phút.',
    completed: true,
    priority: 'low',
    category: 'health',
    createdAt: new Date('2024-06-13T06:00:00'),
    updatedAt: new Date('2024-06-13T19:30:00'),
  },
  {
    id: '5',
    title: 'Hoàn thành báo cáo dự án',
    description: 'Viết báo cáo tổng kết dự án Q2, bao gồm thành tựu đạt được và kế hoạch Q3.',
    completed: false,
    priority: 'high',
    category: 'work',
    createdAt: new Date('2024-06-11T10:00:00'),
    updatedAt: new Date('2024-06-11T10:00:00'),
    dueDate: new Date('2024-06-14T17:00:00'), // Quá hạn để test
  },
  {
    id: '6',
    title: 'Đọc sách "Clean Code"',
    description: 'Đọc và ghi chú các best practices về viết code sạch và maintainable.',
    completed: false,
    priority: 'low',
    category: 'education',
    createdAt: new Date('2024-06-09T20:00:00'),
    updatedAt: new Date('2024-06-09T20:00:00'),
  },
  {
    id: '7',
    title: 'Khám sức khỏe định kỳ',
    description: 'Lịch khám tổng quát hàng năm tại bệnh viện.',
    completed: false,
    priority: 'high',
    category: 'health',
    createdAt: new Date('2024-06-12T15:30:00'),
    updatedAt: new Date('2024-06-12T15:30:00'),
    dueDate: new Date('2024-06-25T09:00:00'),
  },
];

/**
 * Function để load demo data vào localStorage
 * Sử dụng trong development để test nhanh
 */
export function loadDemoData() {
  if (typeof window !== 'undefined') {
    localStorage.setItem('nextjs-todolist', JSON.stringify(demoTodos));
    console.log('✅ Demo data đã được load vào localStorage');
  }
}

/**
 * Function để clear tất cả data
 */
export function clearAllData() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('nextjs-todolist');
    console.log('🗑️ Tất cả data đã được xóa');
  }
}
