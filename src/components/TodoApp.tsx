"use client"

import { useMemo } from "react"
import { useTodos, useFilters } from "@/hooks"
import { TodoForm } from "./TodoForm"
import { TodoList } from "./TodoList"
import { TodoStats } from "./TodoStats"
import { TodoFilters } from "./TodoFilters"
import { calculateStats, sortTodos, filterTodos, searchTodos } from "@/utils"

export function TodoApp() {
    const { todos, loading, createTodo, updateTodo, toggleTodo, deleteTodo, clearCompleted, toggleAll } = useTodos()

    const {
        filter,
        sortBy,
        searchTerm,
        categoryFilter,
        updateFilter,
        updateSort,
        updateSearch,
        updateCategoryFilter,
        clearFilters,
    } = useFilters()

    // Tính toán danh sách todos đã được filter và sort
    const processedTodos = useMemo(() => {
        let result = [...todos]

        // Apply category filter
        if (categoryFilter !== "all") {
            result = result.filter((todo) => todo.category === categoryFilter)
        }

        // Apply status filter
        result = filterTodos(result, filter)

        // Apply search
        result = searchTodos(result, searchTerm)

        // Apply sort
        result = sortTodos(result, sortBy)

        return result
    }, [todos, filter, sortBy, searchTerm, categoryFilter])

    // Tính toán stats
    const stats = useMemo(() => calculateStats(todos), [todos])

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900 stars-bg flex items-center justify-center px-4">
                <div className="text-center space-y-6 animate-pulse">
                    <div className="text-6xl md:text-8xl mb-6 animate-bounce">🚀</div>
                    <div className="bg-slate-800/50 backdrop-blur-sm border-2 border-cyan-400 px-8 py-6 pixel-border-glow">
                        <p className="text-cyan-300 font-mono text-lg tracking-wider">KHỞI ĐỘNG HỆ THỐNG...</p>
                        <div className="mt-4 flex justify-center space-x-1">
                            <div className="w-2 h-2 bg-cyan-400 animate-ping"></div>
                            <div className="w-2 h-2 bg-cyan-400 animate-ping" style={{ animationDelay: "0.2s" }}></div>
                            <div className="w-2 h-2 bg-cyan-400 animate-ping" style={{ animationDelay: "0.4s" }}></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900 stars-bg">
            <div className="container mx-auto px-4 py-6 md:py-8 max-w-7xl">
                {/* Header */}
                <div className="text-center mb-8 md:mb-12 animate-slideInFromSpace">
                    <div className="inline-block bg-slate-800/50 backdrop-blur-sm border-2 border-cyan-400 px-6 md:px-12 py-6 md:py-8 pixel-border-glow mb-6">
                        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text font-mono tracking-wider mb-4">
                            � COSMIC TODO
                        </h1>
                        <p className="text-cyan-300 font-mono text-sm md:text-base tracking-wide">
                            QUẢN LÝ NHIỆM VỤ TRONG VŨ TRỤ SỐ
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
                    {/* Left sidebar - Form và Stats */}
                    <div className="lg:col-span-4 xl:col-span-4 space-y-6">
                        {/* Todo Form */}
                        <div className="bg-slate-800/30 backdrop-blur-md border-2 border-slate-600 pixel-border-glow p-4 md:p-6 hover:border-cyan-400 transition-all duration-300 w-full overflow-hidden">
                            <h2 className="text-lg md:text-xl font-bold text-cyan-300 mb-6 font-mono tracking-wider flex items-center">
                                <span className="text-2xl mr-3">➕</span>
                                NHIỆM VỤ MỚI
                            </h2>
                            <div className="w-full overflow-hidden">
                                <TodoForm onSubmit={createTodo} />
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="hidden lg:block">
                            <TodoStats stats={stats} />
                        </div>
                    </div>

                    {/* Main content - Filters và TodoList */}
                    <div className="lg:col-span-8 xl:col-span-8 space-y-6">
                        {/* Mobile Stats */}
                        <div className="lg:hidden">
                            <TodoStats stats={stats} />
                        </div>

                        {/* Filters */}
                        <TodoFilters
                            filter={filter}
                            sortBy={sortBy}
                            searchTerm={searchTerm}
                            categoryFilter={categoryFilter}
                            onFilterChange={updateFilter}
                            onSortChange={updateSort}
                            onSearchChange={updateSearch}
                            onCategoryFilterChange={updateCategoryFilter}
                            onClearFilters={clearFilters}
                            totalTodos={todos.length}
                            filteredCount={processedTodos.length}
                        />

                        {/* Todo List */}
                        <div className="bg-slate-800/30 backdrop-blur-md border-2 border-slate-600 pixel-border-glow p-4 md:p-6 hover:border-purple-400 transition-all duration-300">
                            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
                                <h2 className="text-lg md:text-xl font-bold text-purple-300 font-mono tracking-wider flex items-center">
                                    <span className="text-2xl mr-3">📋</span>
                                    DANH SÁCH NHIỆM VỤ
                                </h2>
                                {processedTodos.length > 0 && (
                                    <span className="text-sm text-cyan-400 font-mono bg-slate-700/50 px-3 py-1 border border-cyan-400">
                                        {processedTodos.length} NHIỆM VỤ
                                    </span>
                                )}
                            </div>

                            <TodoList
                                todos={processedTodos}
                                onToggle={toggleTodo}
                                onDelete={deleteTodo}
                                onUpdate={updateTodo}
                                onToggleAll={toggleAll}
                                onClearCompleted={clearCompleted}
                            />
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <footer className="mt-12 md:mt-16 text-center">
                    <div className="inline-block bg-slate-800/30 backdrop-blur-sm border border-slate-600 px-6 py-4 pixel-border-glow">
                        <p className="text-sm text-cyan-400 font-mono mb-2">
                            ⚡ POWERED BY{" "}
                            <span className="text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text font-bold">
                                NEXT.JS 15 + TYPESCRIPT + TAILWIND
                            </span>
                        </p>
                        <p className="text-xs text-slate-400 font-mono">🛸 SPACE TODO - FUTURE IS NOW</p>
                    </div>
                </footer>
            </div>
        </div>
    )
}
