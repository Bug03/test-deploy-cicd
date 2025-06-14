"use client"

import { TodoStats as TodoStatsType } from "@/types"

interface TodoStatsProps {
    stats: TodoStatsType
}

export function TodoStats({ stats }: TodoStatsProps) {
    const completionRate = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0

    return (
        <div className="bg-slate-800/30 backdrop-blur-md border-2 border-slate-600 pixel-border-glow p-4 md:p-6 hover:border-green-400 transition-all duration-300">
            <h2 className="text-lg md:text-xl font-bold text-purple-300 mb-6 font-mono tracking-wider flex items-center">
                <span className="text-2xl mr-3">📊</span>
                THỐNG KÊ NHIỆM VỤ
            </h2>

            {/* Progress bar */}
            <div className="mb-6">
                <div className="flex justify-between text-sm text-cyan-300 mb-2 font-mono">
                    <span>TIẾN ĐỘ HOÀN THÀNH</span>
                    <span className="text-yellow-400 font-bold">{completionRate}%</span>
                </div>
                <div className="w-full bg-slate-700 border border-slate-500 h-3 relative overflow-hidden">
                    <div
                        className="bg-gradient-to-r from-green-500 to-cyan-400 h-full transition-all duration-500 relative"
                        style={{ width: `${completionRate}%` }}
                    >
                        <div className="absolute inset-0 bg-white opacity-20 animate-pulse"></div>
                    </div>
                </div>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-3 md:gap-4">
                <div className="text-center p-3 md:p-4 bg-gradient-to-br from-blue-900/50 to-cyan-900/50 border-2 border-blue-400 pixel-border-glow">
                    <div className="text-xl md:text-2xl font-bold text-blue-300 font-mono">{stats.total}</div>
                    <div className="text-xs md:text-sm text-blue-400 font-mono tracking-wide">TỔNG SỐ</div>
                </div>

                <div className="text-center p-3 md:p-4 bg-gradient-to-br from-green-900/50 to-emerald-900/50 border-2 border-green-400 pixel-border-glow">
                    <div className="text-xl md:text-2xl font-bold text-green-300 font-mono">{stats.completed}</div>
                    <div className="text-xs md:text-sm text-green-400 font-mono tracking-wide">HOÀN THÀNH</div>
                </div>

                <div className="text-center p-3 md:p-4 bg-gradient-to-br from-orange-900/50 to-yellow-900/50 border-2 border-orange-400 pixel-border-glow">
                    <div className="text-xl md:text-2xl font-bold text-orange-300 font-mono">{stats.active}</div>
                    <div className="text-xs md:text-sm text-orange-400 font-mono tracking-wide">ĐANG LÀM</div>
                </div>

                <div className="text-center p-3 md:p-4 bg-gradient-to-br from-red-900/50 to-pink-900/50 border-2 border-red-400 pixel-border-glow">
                    <div className="text-xl md:text-2xl font-bold text-red-300 font-mono">{stats.overdue}</div>
                    <div className="text-xs md:text-sm text-red-400 font-mono tracking-wide">QUÁ HẠN</div>
                </div>
            </div>

            {/* Motivational message */}
            {stats.total > 0 && (
                <div className="mt-6 p-4 bg-gradient-to-r from-purple-900/30 to-pink-900/30 border-2 border-purple-400 pixel-border-glow">
                    <p className="text-sm text-purple-300 text-center font-mono leading-relaxed">
                        {completionRate === 100
                            ? "🎉 XUẤT SẮC! BẠN ĐÃ HOÀN THÀNH TẤT CẢ NHIỆM VỤ!"
                            : completionRate >= 75
                            ? "💪 TUYỆT VỜI! CHỈ CÒN MỘT CHÚT NỮA THÔI!"
                            : completionRate >= 50
                            ? "⚡ TIẾN ĐỘ TỐT! HÃY TIẾP TỤC PHẤN ĐẤU!"
                            : "🚀 BẮT ĐẦU HÀNH TRÌNH CHINH PHỤC!"}
                    </p>
                </div>
            )}
        </div>
    )
}
