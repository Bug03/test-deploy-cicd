'use client';

import { useState } from 'react';
import { Todo, TodoFormData } from '@/types';
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
  onUpdate: (id: string, data: TodoFormData) => void;
}

export function TodoItem({ todo, onToggle, onDelete, onUpdate }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleUpdate = (data: TodoFormData) => {
    onUpdate(todo.id, data);
    setIsEditing(false);
  };

  const isTaskOverdue = isOverdue(todo);
  const priorityColorClass = getPriorityColor(todo.priority);

  if (isEditing) {
    return (
      <div className="bg-slate-800/50 backdrop-blur-md border-2 border-purple-500 pixel-border-glow p-6 animate-slideInFromSpace">
        <h3 className="text-xl font-bold text-purple-300 mb-6 font-mono tracking-wider flex items-center">
          <span className="text-2xl mr-3">✨</span>
          CHỈNH SỬA NHIỆM VỤ
        </h3>
        <TodoForm
          onSubmit={handleUpdate}
          initialData={{
            title: todo.title,
            description: todo.description,
            priority: todo.priority,
            category: todo.category,
            dueDate: todo.dueDate ? todo.dueDate.toISOString().split('T')[0] : '',
          }}
          submitLabel="🔄 Cập nhật"
          onCancel={() => setIsEditing(false)}
        />
      </div>
    );
  }

  return (
    <div className={`bg-gradient-to-r from-slate-800/50 to-slate-700/50 backdrop-blur-md border-2 pixel-border-glow p-4 md:p-6 transition-all duration-300 hover:shadow-[0_0_25px_rgba(6,182,212,0.3)] ${
      todo.completed ? 'opacity-60 border-green-400' : ''
    } ${isTaskOverdue ? 'border-red-400 animate-pulse' : 'border-slate-600 hover:border-cyan-400'}`}>
      <div className="flex items-start gap-4">
        {/* Cosmic Checkbox */}
        <button
          onClick={() => onToggle(todo.id)}
          className={`flex-shrink-0 w-6 h-6 border-2 flex items-center justify-center transition-all duration-300 pixel-border-glow ${
            todo.completed
              ? 'bg-gradient-to-r from-green-500 to-emerald-500 border-green-400 text-white shadow-[0_0_15px_rgba(16,185,129,0.5)]'
              : 'border-cyan-400 hover:border-cyan-300 hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] bg-slate-700/50'
          }`}
        >
          {todo.completed && (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-2 md:gap-4">
            <h3 className={`text-lg md:text-xl font-bold font-mono tracking-wide ${
              todo.completed ? 'line-through text-gray-400' : 'text-cyan-100'
            }`}>
              {todo.title}
            </h3>

            {/* Priority badge */}
            <span className={`inline-flex items-center px-3 py-1 border-2 text-xs font-bold font-mono tracking-wider self-start pixel-border-glow ${priorityColorClass}`}>
              {getPriorityLabel(todo.priority)}
            </span>
          </div>

          {/* Description */}
          {todo.description && (
            <p className={`mt-2 text-sm font-mono ${
              todo.completed ? 'text-gray-500' : 'text-slate-300'
            } ${!isExpanded && todo.description.length > 100 ? 'line-clamp-2' : ''}`}>
              {isExpanded ? todo.description : todo.description}
              {!isExpanded && todo.description.length > 100 && (
                <button
                  onClick={() => setIsExpanded(true)}
                  className="ml-2 text-cyan-400 hover:text-cyan-300 font-bold font-mono border-b border-cyan-400"
                >
                  ... XEM THÊM
                </button>
              )}
            </p>
          )}

          {isExpanded && todo.description && todo.description.length > 100 && (
            <button
              onClick={() => setIsExpanded(false)}
              className="mt-2 text-sm text-cyan-400 hover:text-cyan-300 font-bold font-mono border-b border-cyan-400"
            >
              THU GỌN
            </button>
          )}

          {/* Cosmic Metadata */}
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 text-xs font-mono">
            <span className="inline-flex items-center px-2 py-1 bg-purple-900/50 border border-purple-400 text-purple-300">
              📁 {todo.category.toUpperCase()}
            </span>
            
            <span className="inline-flex items-center px-2 py-1 bg-blue-900/50 border border-blue-400 text-blue-300">
              ⏰ {formatDate(todo.createdAt)}
            </span>

            {todo.dueDate && (
              <span className={`inline-flex items-center px-2 py-1 border ${
                isTaskOverdue 
                  ? 'bg-red-900/50 border-red-400 text-red-300 animate-pulse' 
                  : 'bg-green-900/50 border-green-400 text-green-300'
              }`}>
                📅 {formatDate(todo.dueDate)}
                {isTaskOverdue && ' (QUÁ HẠN)'}
              </span>
            )}

            {todo.updatedAt.getTime() !== todo.createdAt.getTime() && (
              <span className="inline-flex items-center px-2 py-1 bg-yellow-900/50 border border-yellow-400 text-yellow-300">
                ✏️ {formatDateTime(todo.updatedAt)}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Cosmic Actions */}
      <div className="mt-6 flex flex-col sm:flex-row gap-3">
        <Button
          size="sm"
          variant="secondary"
          onClick={() => setIsEditing(true)}
          className="flex-1 sm:flex-none text-cyan-300 hover:text-cyan-100"
        >
          <span className="mr-2">✏️</span>
          CHỈNH SỬA
        </Button>
        <Button
          size="sm"
          variant="danger"
          onClick={() => onDelete(todo.id)}
          className="flex-1 sm:flex-none text-red-300 hover:text-red-100"
        >
          <span className="mr-2">🗑️</span>
          XÓA
        </Button>
      </div>
    </div>
  );
}
