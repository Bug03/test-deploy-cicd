"use client"

import { Todo, TodoFormData } from "@/types"
import { TodoItem } from "./TodoItem"
import { Button } from "@/components/ui"

interface TodoListProps {
    todos: Todo[]
    onToggle: (id: string) => void
    onDelete: (id: string) => void
    onUpdate: (id: string, data: TodoFormData) => void
    onToggleAll: (completed: boolean) => void
    onClearCompleted: () => void
}

export function TodoList({ todos, onToggle, onDelete, onUpdate, onToggleAll, onClearCompleted }: TodoListProps) {
    const completedCount = todos.filter((todo) => todo.completed).length
    const allCompleted = todos.length > 0 && completedCount === todos.length
    const hasCompleted = completedCount > 0

    if (todos.length === 0) {
        return (
            <div className="text-center py-12">
                <div className="text-6xl mb-4">📝</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Chưa có todo nào</h3>
                <p className="text-gray-600">Hãy thêm todo đầu tiên của bạn!</p>
            </div>
        )
    }

    return (
        <div className="space-y-4">
            {/* Bulk actions */}
            {todos.length > 0 && (
                <div className="flex items-center justify-between p-4 bg-slate-800/50 border-2 border-slate-600 pixel-border-glow">
                    <div className="flex items-center gap-3">
                        <Button
                            variant="cosmic"
                            size="sm"
                            onClick={() => onToggleAll(!allCompleted)}
                            className={allCompleted ? "text-green-300" : "text-cyan-300"}
                        >
                            {allCompleted ? "☑️ Bỏ chọn tất cả" : "☑️ Chọn tất cả"}
                        </Button>

                        <span className="text-sm text-slate-300 font-mono">
                            {completedCount} / {todos.length} hoàn thành
                        </span>
                    </div>

                    {hasCompleted && (
                        <Button
                            variant="danger"
                            size="sm"
                            onClick={onClearCompleted}
                            className="text-red-300 hover:text-red-100"
                        >
                            🗑️ Xóa đã hoàn thành ({completedCount})
                        </Button>
                    )}
                </div>
            )}

            {/* Todo items */}
            <div className="space-y-3">
                {todos.map((todo) => (
                    <TodoItem key={todo.id} todo={todo} onToggle={onToggle} onDelete={onDelete} onUpdate={onUpdate} />
                ))}
            </div>

            {/* Summary */}
            {todos.length > 5 && (
                <div className="text-center py-4 text-sm text-gray-600">Tổng cộng {todos.length} todo</div>
            )}
        </div>
    )
}
