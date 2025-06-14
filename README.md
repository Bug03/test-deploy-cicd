# 📝 TodoList App - Next.js

Ứng dụng quản lý công việc (TodoList) chuyên nghiệp được xây dựng với **Next.js 15**, **TypeScript**, và **Tailwind CSS**. Dự án này được thiết kế với cấu trúc mô-đun, có đầy đủ CI/CD và các best practices cho học tập và phát triển thực tế.

## 🎯 Tính năng chính

### ✨ Quản lý Todo
- ➕ **Thêm todo mới** với đầy đủ thông tin (tiêu đề, mô tả, độ ưu tiên, danh mục, ngày hết hạn)
- ✏️ **Chỉnh sửa todo** trực tiếp trong danh sách
- ☑️ **Đánh dấu hoàn thành** với một click
- 🗑️ **Xóa todo** đơn lẻ hoặc hàng loạt
- 📋 **Bulk actions**: chọn tất cả, bỏ chọn tất cả, xóa đã hoàn thành

### 🔍 Tìm kiếm & Lọc
- 🔎 **Tìm kiếm** theo tiêu đề, mô tả, danh mục
- 📊 **Lọc theo trạng thái**: Tất cả, Đang làm, Hoàn thành, Quá hạn
- 📁 **Lọc theo danh mục**: Công việc, Cá nhân, Mua sắm, Sức khỏe, Học tập, Khác
- 🔄 **Sắp xếp**: Ngày tạo, Ngày hết hạn, Độ ưu tiên, Tên A-Z

### 📈 Thống kê & Phân tích
- 📊 **Progress bar** với tỷ lệ hoàn thành
- 📈 **Dashboard thống kê**: Tổng số, Hoàn thành, Đang làm, Quá hạn
- 💪 **Tin nhắn động viên** dựa trên tiến độ

### 🎨 Giao diện & UX
- 🎨 **Modern UI** với Tailwind CSS
- 📱 **Responsive design** - hoạt động tốt trên mọi thiết bị
- 🌈 **Color-coded priority** - dễ phân biệt độ ưu tiên
- ⚡ **Smooth animations** - trải nghiệm mượt mà
- 🔔 **Visual indicators** cho các trạng thái (quá hạn, hoàn thành, v.v.)

## 🛠️ Công nghệ sử dụng

### Core Technologies
- **Next.js 15.3.3** - React framework với App Router
- **React 19** - UI library
- **TypeScript** - Type safety và developer experience
- **Tailwind CSS v4** - Utility-first CSS framework

### Additional Libraries
- **clsx** - Conditional class names
- **uuid** - Unique ID generation (nếu cần trong tương lai)
- **lucide-react** - Beautiful icons

### Development Tools
- **ESLint** - Code linting với Next.js config
- **PostCSS** - CSS processing
- **GitHub Actions** - CI/CD pipeline

## 📁 Cấu trúc dự án

```
my-next-app/
├── .github/
│   └── workflows/
│       └── ci.yml              # GitHub Actions CI pipeline
├── public/                     # Static assets
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── favicon.ico
│   │   ├── globals.css         # Global styles + Tailwind
│   │   ├── layout.tsx          # Root layout
│   │   └── page.tsx            # Home page (TodoApp)
│   ├── components/             # React components
│   │   ├── ui/                 # Base UI components
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Select.tsx
│   │   │   ├── Textarea.tsx
│   │   │   └── index.ts
│   │   ├── TodoApp.tsx         # Main app component
│   │   ├── TodoForm.tsx        # Form để tạo/edit todo
│   │   ├── TodoList.tsx        # Danh sách todos + bulk actions
│   │   ├── TodoItem.tsx        # Todo item individual
│   │   ├── TodoStats.tsx       # Statistics dashboard
│   │   ├── TodoFilters.tsx     # Filter và search components
│   │   └── index.ts
│   ├── hooks/                  # Custom React hooks
│   │   ├── useTodos.ts         # Todo management logic
│   │   ├── useFilters.ts       # Filter và search logic
│   │   └── index.ts
│   ├── lib/                    # Utility libraries
│   │   └── utils.ts            # Common utilities (cn function)
│   ├── types/                  # TypeScript type definitions
│   │   ├── todo.ts             # Todo interfaces
│   │   └── index.ts
│   └── utils/                  # Helper functions
│       ├── todo.ts             # Todo-specific utilities
│       └── index.ts
├── ARCHITECTURE.md             # Chi tiết kiến trúc dự án
├── eslint.config.mjs           # ESLint configuration
├── next.config.ts              # Next.js configuration
├── package.json                # Dependencies và scripts
├── postcss.config.mjs          # PostCSS configuration
├── tailwind.config.ts          # Tailwind CSS configuration
└── tsconfig.json               # TypeScript configuration
```

## 🚀 Cài đặt và chạy dự án

### Yêu cầu hệ thống
- **Node.js** >= 18.0.0
- **npm** >= 8.0.0

### Cài đặt
```bash
# Clone repository
git clone <repository-url>
cd my-next-app

# Cài đặt dependencies
npm install --legacy-peer-deps

# Chạy development server
npm run dev
```

### Scripts có sẵn
```bash
npm run dev      # Chạy development server tại http://localhost:3000
npm run build    # Build production version
npm run start    # Chạy production server
npm run lint     # Chạy ESLint kiểm tra code
```

## 📚 Cách sử dụng

### 1. Thêm Todo mới
1. Điền thông tin vào form bên trái
2. Chọn độ ưu tiên và danh mục
3. Đặt ngày hết hạn (tùy chọn)
4. Click "Thêm Todo"

### 2. Quản lý Todos
- **Hoàn thành**: Click vào checkbox
- **Sửa**: Click nút "✏️ Sửa"
- **Xóa**: Click nút "🗑️ Xóa"
- **Xem chi tiết**: Click "Xem thêm" nếu mô tả dài

### 3. Lọc và Tìm kiếm
- Sử dụng ô tìm kiếm để tìm theo tên
- Click các nút filter để lọc theo trạng thái
- Chọn danh mục và cách sắp xếp

### 4. Bulk Actions
- "☑️ Chọn tất cả" để đánh dấu tất cả
- "🗑️ Xóa đã hoàn thành" để dọn dẹp

## 🎓 Kiến thức học được

### 1. Next.js Modern Patterns
- **App Router** thay vì Pages Router
- **Server và Client Components**
- **TypeScript integration**
- **File-based routing**

### 2. React Best Practices
- **Custom Hooks** cho logic reuse
- **Component composition**
- **Props interface design**
- **State management** với hooks

### 3. TypeScript Advanced
- **Interface design** cho complex data
- **Generic types**
- **Type guards và utility types**
- **Strict type checking**

### 4. Modern CSS
- **Tailwind CSS utility classes**
- **Responsive design patterns**
- **Component styling strategies**
- **Animation và transitions**

### 5. Development Workflow
- **Modular architecture**
- **Code organization**
- **Error handling**
- **Performance optimization**

## 🔧 Tính năng nâng cao có thể mở rộng

### Phase 2 - Database Integration
- [ ] **Prisma ORM** với PostgreSQL/MySQL
- [ ] **API Routes** cho CRUD operations
- [ ] **User authentication** với NextAuth.js
- [ ] **Multi-user support**

### Phase 3 - Advanced Features
- [ ] **Real-time sync** với WebSocket
- [ ] **Offline support** với Service Workers
- [ ] **Push notifications**
- [ ] **Data export/import**

### Phase 4 - Deployment & DevOps
- [ ] **Docker containerization**
- [ ] **Vercel/Netlify deployment**
- [ ] **Environment-specific configs**
- [ ] **Monitoring và analytics**

### Phase 5 - Testing & Quality
- [ ] **Jest unit tests**
- [ ] **Cypress e2e tests**
- [ ] **Storybook component library**
- [ ] **Performance monitoring**

## 📊 Performance & Optimization

### Implemented Optimizations
- ✅ **Memoization** với useMemo cho computed values
- ✅ **Efficient re-renders** với useCallback
- ✅ **LocalStorage caching** cho persistence
- ✅ **Lazy loading** components khi cần
- ✅ **Bundle optimization** với Next.js

### Potential Optimizations
- **React.lazy()** cho code splitting
- **Service Worker** cho offline caching
- **Virtual scrolling** cho large lists
- **Image optimization** với next/image

## 🤝 Contributing

1. Fork repository
2. Tạo feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open Pull Request

## 📄 License

MIT License - xem [LICENSE](LICENSE) để biết thêm chi tiết.

## 🎯 Mục tiêu học tập

Dự án này được thiết kế để bạn học:

1. **Next.js fundamentals** và advanced patterns
2. **TypeScript** trong React ecosystem
3. **Modern React patterns** và best practices
4. **Tailwind CSS** cho UI development
5. **Project architecture** và code organization
6. **CI/CD** với GitHub Actions
7. **Performance optimization** techniques
8. **Deployment strategies**

---

**Happy Coding!** 🚀

*Dự án này được xây dựng với mục đích học tập và có thể được sử dụng làm template cho các dự án thực tế.*
# test-deploy-cicd
