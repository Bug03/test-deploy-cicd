# Kiến Trúc Dự Án Next.js với CI/CD

## 📋 Tổng Quan Dự Án

Đây là một dự án Next.js hiện đại được thiết kế với kiến trúc mô-đun và quy trình CI/CD tự động hoá sử dụng GitHub Actions.

### 🛠️ Tech Stack

- **Framework**: Next.js 15.3.3
- **Runtime**: React 19.0.0
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Linting**: ESLint với Next.js config
- **CI/CD**: GitHub Actions
- **Package Manager**: npm

## 📁 Cấu Trúc Thư Mục

```
my-next-app/
├── .github/
│   └── workflows/
│       └── ci.yml              # GitHub Actions CI pipeline
├── public/                     # Static assets
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
├── src/
│   ├── app/                    # App Router (Next.js 13+)
│   │   ├── favicon.ico
│   │   ├── globals.css         # Global styles + Tailwind
│   │   ├── layout.tsx          # Root layout component
│   │   └── page.tsx            # Home page (TodoApp)
│   ├── components/             # React components
│   │   ├── ui/                 # Base UI components
│   │   │   ├── Button.tsx      # Reusable button component
│   │   │   ├── Input.tsx       # Form input component
│   │   │   ├── Select.tsx      # Dropdown select component
│   │   │   ├── Textarea.tsx    # Multi-line text input
│   │   │   └── index.ts        # Export all UI components
│   │   ├── TodoApp.tsx         # Main application component
│   │   ├── TodoForm.tsx        # Form để tạo/edit todo
│   │   ├── TodoList.tsx        # Danh sách todos + bulk actions
│   │   ├── TodoItem.tsx        # Todo item individual
│   │   ├── TodoStats.tsx       # Statistics dashboard
│   │   ├── TodoFilters.tsx     # Filter và search components
│   │   └── index.ts            # Export all components
│   ├── hooks/                  # Custom React hooks
│   │   ├── useTodos.ts         # Todo CRUD operations với localStorage
│   │   ├── useFilters.ts       # Filter, search, sort logic
│   │   └── index.ts            # Export all hooks
│   ├── lib/                    # Utility libraries
│   │   ├── utils.ts            # Common utilities (cn function)
│   │   └── demoData.ts         # Demo data cho development
│   ├── types/                  # TypeScript type definitions
│   │   ├── todo.ts             # Todo interfaces và types
│   │   └── index.ts            # Export all types
│   └── utils/                  # Helper functions
│       ├── todo.ts             # Todo-specific utility functions
│       └── index.ts            # Export all utilities
├── ARCHITECTURE.md             # Tài liệu kiến trúc chi tiết
├── eslint.config.mjs           # ESLint configuration
├── next-env.d.ts              # Next.js TypeScript declarations
├── next.config.ts             # Next.js configuration
├── package.json               # Dependencies và scripts
├── postcss.config.mjs         # PostCSS configuration
├── README.md                  # Hướng dẫn sử dụng chi tiết
├── tsconfig.json              # TypeScript configuration
└── tailwind.config.ts         # Tailwind CSS configuration
```

## 🏗️ Kiến Trúc Ứng Dụng

### 1. App Router Architecture

Dự án sử dụng **App Router** của Next.js 13+ thay vì Pages Router cũ:

- **`src/app/`**: Root directory cho App Router
- **`layout.tsx`**: Shared layout cho toàn bộ ứng dụng
- **`page.tsx`**: Page components định nghĩa routes
- **`globals.css`**: Global styles với Tailwind CSS

### 2. TypeScript Integration

- **Type Safety**: Toàn bộ codebase được viết bằng TypeScript
- **Next.js Types**: Tự động import types từ `next-env.d.ts`
- **Strict Mode**: TypeScript config với strict checking

### 3. Styling Architecture

```css
/* Tailwind CSS v4 với PostCSS */
globals.css → Tailwind directives
postcss.config.mjs → PostCSS processing
next.config.ts → CSS optimization
```

## 🔄 CI/CD Pipeline

### GitHub Actions Workflow

File: `.github/workflows/ci.yml`

```yaml
name: Next.js CI

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
    - Checkout source code
    - Setup Node.js 18
    - Install dependencies
    - Lint check
    - Build project
```

### Pipeline Stages

1. **Code Checkout**: Download source code từ repository
2. **Environment Setup**: Cài đặt Node.js 18
3. **Dependencies**: Install packages với `npm install`
4. **Code Quality**: Chạy ESLint để kiểm tra code quality
5. **Build**: Compile và build production bundle

### Triggers

- **Push to main**: Khi có code được push lên branch main
- **Pull Request**: Khi tạo PR targeting main branch

## 📦 Package Management

### Dependencies

```json
{
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0", 
    "next": "15.3.3"
  }
}
```

### Dev Dependencies

- **TypeScript**: Type checking và compilation
- **ESLint**: Code linting với Next.js rules
- **Tailwind CSS**: Utility-first CSS framework
- **Type Definitions**: @types packages cho TypeScript

### Scripts

- `npm run dev`: Development server
- `npm run build`: Production build
- `npm run start`: Production server
- `npm run lint`: Code linting

## 🔧 Configuration Files

### 1. Next.js Config (`next.config.ts`)
- Build optimization
- Custom webpack config
- Environment variables
- Redirects và rewrites

### 2. TypeScript Config (`tsconfig.json`)
- Compiler options
- Path mapping
- Include/exclude patterns

### 3. ESLint Config (`eslint.config.mjs`)
- Linting rules
- Next.js specific rules
- Custom configurations

### 4. Tailwind Config (`postcss.config.mjs`)
- PostCSS plugins
- Tailwind CSS processing

## 🚀 Deployment Strategy

### Development Environment
```bash
npm run dev    # Khởi chạy dev server tại localhost:3000
```

### Production Build
```bash
npm run build  # Tạo optimized production build
npm run start  # Khởi chạy production server
```

### CI/CD Flow

```
Code Push → GitHub → Actions Trigger → Install Dependencies 
→ Lint Check → Build → Tests → Deploy (if configured)
```

## 📈 Performance Optimizations

### Next.js Built-in Features

1. **Automatic Code Splitting**: Tự động chia nhỏ JavaScript bundles
2. **Image Optimization**: Built-in `next/image` component
3. **Font Optimization**: Automatic font loading optimization
4. **Static Generation**: Pre-render pages at build time
5. **Server Components**: React Server Components support

### Build Optimizations

- **Minification**: JavaScript và CSS minification
- **Tree Shaking**: Loại bỏ unused code
- **Bundle Analysis**: Phân tích bundle size
- **Compression**: Gzip compression cho static assets

## 🔒 Best Practices

### 1. Code Organization
- Sử dụng App Router cho routing hiện đại
- Tách biệt components, utils, và types
- Consistent naming conventions

### 2. Type Safety
- Strict TypeScript configuration
- Type annotations cho tất cả functions
- Interface definitions cho data structures

### 3. Performance
- Dynamic imports cho code splitting
- Image optimization với next/image
- Font optimization strategies

### 4. CI/CD
- Automated testing trong pipeline
- Code quality checks với ESLint
- Staged deployment strategies

## 🎯 Roadmap & Extensions

### Có thể thêm vào:

1. **Testing**:
   - Jest cho unit testing
   - Cypress cho e2e testing
   - Testing trong CI pipeline

2. **Database Integration**:
   - Prisma ORM
   - Database migration scripts
   - Connection pooling

3. **Authentication**:
   - NextAuth.js
   - JWT token handling
   - Protected routes

4. **Deployment**:
   - Vercel deployment
   - Docker containerization
   - Environment-specific configs

5. **Monitoring**:
   - Error tracking (Sentry)
   - Performance monitoring
   - Analytics integration

## 📚 Tài Liệu Tham Khảo

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

---

*Tài liệu này được cập nhật lần cuối: June 2025*
