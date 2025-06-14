import { TodoApp } from '@/components';

export default function Home() {
  return (
    <div>
      <TodoApp />
      {/* Production deployment test */}
      <div className="fixed bottom-4 right-4 bg-green-500 text-white px-2 py-1 text-xs rounded">
        Auto-Deploy v1.0 ✅
      </div>
    </div>
  );
}
