# DropaLink

> A modern, minimal link-sharing platform for private, one-time, and expiring links — giving you complete control over how, when, and who views your content.

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18.17+
- **bun** 8.0+ ([Install](https://bun.io/installation))

### Setup

```bash
# Clone repository
git clone https://github.com/alvin-dennis/DropaLink.git
cd DropaLink

# Install dependencies
bun install

# Configure environment
cp .env.example .env

# Start development server
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📦 Available Commands

### Development

```bash
# Start development server with hot reload
bun dev

```

### Building & Deployment

```bash
# Create production build
bun build

# Start production server
bun start

# Build and start
bun build && bun start
```

### Code Quality

```bash
# Run Biome linter
bun lint

# Fix linting issues automatically
bun lint:fix

# Format code with Biome
bun format

# Run all checks
bun validate
```

### Type Checking

```bash
# Check TypeScript types
bun typecheck

# Alias
bun type-check
```

### Maintenance

```bash
# Clean build artifacts
bun clean

# Install git hooks
bun prepare

# Install dependencies
bun install
```

---

## ⚙️ Configuration

### Environment Variables

Create `.env.local` in project root:

```env
NODE_ENV=development
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-publishable-or-anon-key

```

## 👨‍💻 Development

### Quality Checks

**Before Committing**

```bash
# Run full validation
bun validate

# Fix auto-fixable issues
bun lint:fix
bun format

# Type check
bun typecheck
```

**Git Hooks (Husky)**

- Pre-commit: Runs linting on changed files
- Commit-msg: Validates conventional commit format

**Commit Message Format**

```
feat: add new feature
fix: fix a bug
docs: update documentation
style: format code
refactor: refactor code structure
perf: improve performance
test: add tests
chore: update dependencies
```

---

### Environment for Production

```env
NODE_ENV=production
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-publishable-or-anon-key
```

---

## 🤝 Contributing

### Workflow

1. Fork repository
2. Create feature branch: `git checkout -b feat/amazing-feature`
3. Make changes following code style
4. Run `bun validate`
5. Commit: `git commit -m "feat: add amazing feature"`
6. Push: `git push origin feat/amazing-feature`
7. Create Pull Request

### Before Submitting

```bash
# Validate everything
bun validate

# Fix issues
bun lint:fix
bun format

# Type check
bun typecheck

# Build test
bun build
```

### Commit Convention

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
type(scope): subject

feat(menu): add digital menu feature
fix(api): resolve timeout issue
docs: update installation guide
style: format code
refactor(hooks): extract logic
perf: optimize images
test(form): add validation tests
chore(deps): update dependencies
```

---