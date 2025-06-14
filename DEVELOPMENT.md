# Git Flow & Development Workflow

## 🌿 Branching Strategy (Git Flow)

### Các loại nhánh chính:

- **`main`**: Nhánh production, chỉ chứa code đã release
- **`develop`**: Nhánh development, tích hợp tất cả features
- **`feature/*`**: Nhánh phát triển tính năng mới
- **`release/*`**: Nhánh chuẩn bị release
- **`hotfix/*`**: Nhánh sửa lỗi khẩn cấp production

### 🚀 Quy trình phát triển:

#### 1. Bắt đầu feature mới:
```bash
# Checkout develop branch
git checkout develop
git pull origin develop

# Tạo feature branch
git checkout -b feature/todo-priority-filter
```

#### 2. Phát triển tính năng:
```bash
# Commit thường xuyên với conventional commits
git add .
git commit -m "feat(filters): add priority filter component"
git commit -m "style(ui): improve filter button styling"
git commit -m "test(filters): add unit tests for priority filter"
```

#### 3. Hoàn thành feature:
```bash
# Push feature branch
git push origin feature/todo-priority-filter

# Tạo Pull Request từ feature -> develop
# Sau khi merge, xóa feature branch
git checkout develop
git pull origin develop
git branch -d feature/todo-priority-filter
```

#### 4. Chuẩn bị release:
```bash
# Từ develop, tạo release branch
git checkout develop
git checkout -b release/v1.0.0

# Cập nhật version và changelog
git commit -m "chore(release): bump version to 1.0.0"

# Merge vào main và develop
git checkout main
git merge release/v1.0.0
git tag v1.0.0
git push origin main --tags

git checkout develop
git merge release/v1.0.0
git push origin develop
```

## 📝 Conventional Commits

### Format:
```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Types:
- **`feat`**: Tính năng mới
- **`fix`**: Sửa lỗi
- **`docs`**: Thay đổi documentation
- **`style`**: Thay đổi code style (formatting, semicolons, etc)
- **`refactor`**: Refactor code không thay đổi tính năng
- **`perf`**: Cải thiện performance
- **`test`**: Thêm hoặc sửa tests
- **`chore`**: Thay đổi build process, dependencies, etc
- **`ci`**: Thay đổi CI configuration
- **`revert`**: Revert commit trước đó

### Scopes (cho dự án TodoList):
- **`ui`**: UI components
- **`api`**: API related
- **`auth`**: Authentication
- **`todo`**: Todo functionality
- **`filters`**: Filter và search
- **`storage`**: LocalStorage, database
- **`types`**: TypeScript types
- **`config`**: Configuration files

### Ví dụ commits:
```bash
feat(todo): add due date functionality
fix(filters): resolve search input not clearing
docs(readme): update installation instructions
style(ui): improve button hover states
refactor(hooks): extract todo logic into custom hook
test(todo): add unit tests for todo creation
chore(deps): update next.js to v15.3.3
ci(github): add automated testing workflow
```

### Breaking Changes:
```bash
feat(api)!: change todo API response format

BREAKING CHANGE: Todo API now returns `dueDate` as ISO string instead of timestamp
```

## 🔄 Workflow Commands

### Setup Git Flow:
```bash
# Tạo develop branch từ main
git checkout main
git checkout -b develop
git push origin develop

# Set develop as default branch cho new features
git config gitflow.branch.develop develop
git config gitflow.branch.master main
```

### Daily Workflow:
```bash
# 1. Sync với remote
git checkout develop
git pull origin develop

# 2. Tạo feature branch
git checkout -b feature/your-feature-name

# 3. Work & commit
git add .
git commit -m "feat(scope): your changes"

# 4. Push và tạo PR
git push origin feature/your-feature-name
```

### Useful Git Aliases:
```bash
# Thêm vào ~/.gitconfig
[alias]
    st = status
    co = checkout
    br = branch
    ci = commit
    ca = commit -a
    ps = push
    pl = pull
    lg = log --oneline --graph --decorate --all
    unstage = reset HEAD --
    last = log -1 HEAD
    visual = !gitk
```

## 📋 Pull Request Template

Tạo file `.github/pull_request_template.md`:

```markdown
## 📝 Description
Brief description of changes

## 🎯 Type of Change
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update

## 🧪 Testing
- [ ] Unit tests pass
- [ ] Manual testing completed
- [ ] No console errors

## 📷 Screenshots (if applicable)

## 📚 Additional Notes
```

## 🏷️ Semantic Versioning

- **MAJOR**: Breaking changes (1.0.0 → 2.0.0)
- **MINOR**: New features (1.0.0 → 1.1.0)
- **PATCH**: Bug fixes (1.0.0 → 1.0.1)

## 🛡️ Branch Protection Rules

Recommended settings for main branch:
- Require pull request reviews
- Require status checks to pass
- Require branches to be up to date
- Restrict pushes that create files larger than 100MB
- Restrict force pushes
