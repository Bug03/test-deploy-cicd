'use client';

import { useState } from 'react';
import { Todo } from '@/types';
import { Button } from '@/components/ui';
import { TodoForm } from './TodoForm';
import { 
  formatDate, 
  formatDateTime, 
  isOverdue, 
  getPriorityColor, 
  getPriorityLabel 
} from '@/utils';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, data: any) => void;
}

export function TodoItem({ todo, onToggle, onDelete, onUpdate }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleUpdate = (data: any) => {
    onUpdate(todo.id, data);
    setIsEditing(false);
  };

  const isTaskOverdue = isOverdue(todo);
  const priorityColorClass = getPriorityColor(todo.priority);

  if (isEditing) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Chỉnh sửa Todo</h3>
        <TodoForm
          onSubmit={handleUpdate}
          initialData={{
            title: todo.title,
            description: todo.description,
            priority: todo.priority,
            category: todo.category,
            dueDate: todo.dueDate ? todo.dueDate.toISOString().split('T')[0] : '',
          }}
          submitLabel="Cập nhật"
          onCancel={() => setIsEditing(false)}
        />
      </div>
    );
  }

  return (
    <div className={`bg-white border rounded-lg p-4 transition-all hover:shadow-md ${
      todo.completed ? 'opacity-75' : ''
    } ${isTaskOverdue ? 'border-red-200 bg-red-50' : 'border-gray-200'}`}>
      <div className="flex items-start gap-3">
        {/* Checkbox */}
        <button
          onClick={() => onToggle(todo.id)}
          className={`flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
            todo.completed
              ? 'bg-green-500 border-green-500 text-white'
              : 'border-gray-300 hover:border-green-400'
          }`}
        >
          {todo.completed && (
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </button>

        {/* Nội dung */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3 className={`text-lg font-medium ${
              todo.completed ? 'line-through text-gray-500' : 'text-gray-900'
            }`}>
              {todo.title}
            </h3>

            {/* Priority badge */}
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${priorityColorClass}`}>
              {getPriorityLabel(todo.priority)}
            </span>
          </div>

          {/* Description */}
          {todo.description && (
            <p className={`mt-1 text-sm ${
              todo.completed ? 'text-gray-400' : 'text-gray-600'
            } ${!isExpanded && todo.description.length > 100 ? 'line-clamp-2' : ''}`}>
              {isExpanded ? todo.description : todo.description}
              {!isExpanded && todo.description.length > 100 && (
                <button
                  onClick={() => setIsExpanded(true)}
                  className="ml-1 text-blue-600 hover:text-blue-800 font-medium"
                >
                  ... Xem thêm
                </button>
              )}
            </p>
          )}

          {isExpanded && todo.description && todo.description.length > 100 && (
            <button
              onClick={() => setIsExpanded(false)}
              className="mt-1 text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              Thu gọn
            </button>
          )}

          {/* Metadata */}
          <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-gray-500">
            <span className="inline-flex items-center">
              📁 {todo.category}
            </span>
            
            <span className="inline-flex items-center">
              ⏰ Tạo: {formatDate(todo.createdAt)}
            </span>

            {todo.dueDate && (
              <span className={`inline-flex items-center ${
                isTaskOverdue ? 'text-red-600 font-medium' : ''
              }`}>
                📅 Hạn: {formatDate(todo.dueDate)}
                {isTaskOverdue && ' (Quá hạn)'}
              </span>
            )}

            {todo.updatedAt.getTime() !== todo.createdAt.getTime() && (
              <span className="inline-flex items-center">
                ✏️ Sửa: {formatDateTime(todo.updatedAt)}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-4 flex gap-2">
        <Button
          size="sm"
          variant="ghost"
          onClick={() => setIsEditing(true)}
          className="text-blue-600 hover:text-blue-800"
        >
          ✏️ Sửa
        </Button>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => onDelete(todo.id)}
          className="text-red-600 hover:text-red-800"
        >
          🗑️ Xóa
        </Button>
      </div>
    </div>
  );
}
