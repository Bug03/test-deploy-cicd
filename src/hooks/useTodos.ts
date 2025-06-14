'use client';

import { useState, useEffect, useCallback } from 'react';
import { Todo, TodoFormData } from '@/types';
import { generateId } from '@/utils';

const STORAGE_KEY = 'nextjs-todolist';

/**
 * Custom hook để quản lý todos với localStorage
 */
export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);

  // Load todos từ localStorage khi component mount
  useEffect(() => {
    const savedTodos = localStorage.getItem(STORAGE_KEY);
    if (savedTodos) {
      try {
        const parsedTodos = JSON.parse(savedTodos);
        // Convert date strings back to Date objects
        const todosWithDates = parsedTodos.map((todo: Todo & { 
          createdAt: string; 
          updatedAt: string; 
          dueDate?: string; 
        }) => ({
          ...todo,
          createdAt: new Date(todo.createdAt),
          updatedAt: new Date(todo.updatedAt),
          dueDate: todo.dueDate ? new Date(todo.dueDate) : undefined,
        }));
        setTodos(todosWithDates);
      } catch (error) {
        console.error('Error parsing todos from localStorage:', error);
      }
    }
    setLoading(false);
  }, []);

  // Save todos to localStorage whenever todos change
  useEffect(() => {
    if (!loading) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    }
  }, [todos, loading]);

  /**
   * Tạo todo mới
   */
  const createTodo = useCallback((data: TodoFormData): Todo => {
    const newTodo: Todo = {
      id: generateId(),
      title: data.title.trim(),
      description: data.description?.trim(),
      completed: false,
      priority: data.priority,
      category: data.category.trim(),
      createdAt: new Date(),
      updatedAt: new Date(),
      dueDate: data.dueDate ? new Date(data.dueDate) : undefined,
    };

    setTodos(prev => [newTodo, ...prev]);
    return newTodo;
  }, []);

  /**
   * Cập nhật todo
   */
  const updateTodo = useCallback((id: string, updates: Partial<TodoFormData>) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id
          ? {
              ...todo,
              ...updates,
              updatedAt: new Date(),
              dueDate: updates.dueDate ? new Date(updates.dueDate) : todo.dueDate,
            }
          : todo
      )
    );
  }, []);

  /**
   * Toggle completed status
   */
  const toggleTodo = useCallback((id: string) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id
          ? {
              ...todo,
              completed: !todo.completed,
              updatedAt: new Date(),
            }
          : todo
      )
    );
  }, []);

  /**
   * Xóa todo
   */
  const deleteTodo = useCallback((id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  }, []);

  /**
   * Xóa tất cả todos đã completed
   */
  const clearCompleted = useCallback(() => {
    setTodos(prev => prev.filter(todo => !todo.completed));
  }, []);

  /**
   * Toggle tất cả todos
   */
  const toggleAll = useCallback((completed: boolean) => {
    setTodos(prev =>
      prev.map(todo => ({
        ...todo,
        completed,
        updatedAt: new Date(),
      }))
    );
  }, []);

  /**
   * Get todo by ID
   */
  const getTodoById = useCallback((id: string): Todo | undefined => {
    return todos.find(todo => todo.id === id);
  }, [todos]);

  return {
    todos,
    loading,
    createTodo,
    updateTodo,
    toggleTodo,
    deleteTodo,
    clearCompleted,
    toggleAll,
    getTodoById,
  };
}
