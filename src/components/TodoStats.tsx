'use client';

import { TodoStats as TodoStatsType } from '@/types';

interface TodoStatsProps {
  stats: TodoStatsType;
}

export function TodoStats({ stats }: TodoStatsProps) {
  const completionRate = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">📊 Thống kê</h2>
      
      {/* Progress bar */}
      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>Tiến độ hoàn thành</span>
          <span>{completionRate}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-green-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${completionRate}%` }}
          />
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center p-3 bg-blue-50 rounded-lg border border-blue-200">
          <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
          <div className="text-sm text-blue-800">Tổng số</div>
        </div>
        
        <div className="text-center p-3 bg-green-50 rounded-lg border border-green-200">
          <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
          <div className="text-sm text-green-800">Hoàn thành</div>
        </div>
        
        <div className="text-center p-3 bg-orange-50 rounded-lg border border-orange-200">
          <div className="text-2xl font-bold text-orange-600">{stats.active}</div>
          <div className="text-sm text-orange-800">Đang làm</div>
        </div>
        
        <div className="text-center p-3 bg-red-50 rounded-lg border border-red-200">
          <div className="text-2xl font-bold text-red-600">{stats.overdue}</div>
          <div className="text-sm text-red-800">Quá hạn</div>
        </div>
      </div>

      {/* Motivational message */}
      {stats.total > 0 && (
        <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-700 text-center">
            {completionRate === 100 
              ? "🎉 Tuyệt vời! Bạn đã hoàn thành tất cả công việc!"
              : completionRate >= 75
              ? "💪 Bạn đang làm rất tốt! Chỉ còn một chút nữa thôi!"
              : completionRate >= 50
              ? "⚡ Tiến độ ổn đấy! Hãy tiếp tục phấn đấu!"
              : "🚀 Hãy bắt đầu hoàn thành các công việc nhé!"
            }
          </p>
        </div>
      )}
    </div>
  );
}
