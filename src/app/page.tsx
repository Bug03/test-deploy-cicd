import { TodoApp } from "@/components"

export default function Home() {
    return (
        <div className="relative">
            <TodoApp />
            {/* Production deployment badge */}
            <div className="fixed bottom-4 right-4 z-50">
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-2 text-xs font-mono border-2 border-green-400 pixel-border-glow animate-pulse">
                    🚀 DEPLOY v1.0 ✅
                </div>
            </div>
        </div>
    )
}
