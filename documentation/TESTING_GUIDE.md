# Testing Guide

## How to Test the UI Component Suite

### Prerequisites

Make sure you have pnpm installed and dependencies are installed:

```bash
# Install dependencies (if not already done)
pnpm install
```

### Quick Start - See Components in Action

The easiest way to test the components is to run the showcase application:

```bash
# Start the showcase application
pnpm start
```

This will:
1. Build the necessary libraries (`theming`, `shared`, `components`)
2. Start a development server
3. Open your browser to `http://localhost:4200`

You'll see a live demo page with:
- Button components (all variants and sizes)
- Input components (various types and states)
- Textarea components (with auto-resize and character count)
- Card components (different variants)
- Theme switcher to test dark/light modes

### Building Individual Libraries

If you want to build the libraries separately:

```bash
# Build all libraries
pnpm run build:libs

# Or build individual libraries
pnpm run build:theming    # Design system and theme engine
pnpm run build:shared     # Shared utilities
pnpm run build:components # UI components
pnpm run build:theme-builder # Theme builder components
```

### Available Commands

#### Development

```bash
# Start showcase app (main demo)
pnpm start

# Start theme builder app
pnpm run start:theme-builder
```

#### Building

```bash
# Build everything (apps + libs)
pnpm run build

# Build only libraries
pnpm run build:libs

# Build specific library
pnpm run build:theming
pnpm run build:shared
pnpm run build:components
pnpm run build:theme-builder

# Build specific app
pnpm run build:showcase
```

#### Testing

```bash
# Run all tests
pnpm test

# Run tests in watch mode (for development)
pnpm run test:watch

# Run tests with coverage report
pnpm run test:coverage

# Run tests for specific library
pnpm nx test theming
pnpm nx test components
```

#### Linting & Formatting

```bash
# Lint all projects
pnpm run lint

# Lint and auto-fix issues
pnpm run lint:fix

# Format all files
pnpm run format:write

# Check formatting without changes
pnpm run format:check
```

#### E2E Testing

```bash
# Run E2E tests
pnpm run e2e

# Run E2E for specific app
pnpm nx e2e showcase-e2e
pnpm nx e2e theme-builder-app-e2e
```

### What to Test

When the showcase app is running, you can test:

#### Buttons
- Click different button variants (filled, outlined, text)
- Test different sizes (small, medium, large)
- Try disabled buttons (should not respond)
- Click the loading button (shows spinner)
- Test the interactive counter button

#### Inputs
- Type in various input fields
- Test different input types (text, email, password)
- Try the disabled input (should not allow typing)
- See error states (red border and error message)
- Watch the live value display update as you type

#### Textareas
- Type in the standard textarea
- Try the auto-resize textarea (grows as you type)
- Test character count (watch the counter)
- Try exceeding max length
- See error states

#### Cards
- Hover over the interactive card (shadow lifts)
- Compare elevated vs outlined vs filled variants
- Test cards with and without headers/footers

#### Theming
- Click "Toggle Theme" button in header
- Watch all components instantly update colors
- Theme preference is saved to localStorage
- Refresh page - theme persists

### Testing Accessibility

The components are built with WCAG 2.1 AA compliance. Test using:

#### Keyboard Navigation

```bash
# Tab through interactive elements
Tab / Shift+Tab

# Activate buttons
Enter or Space

# Navigate within inputs
Arrow keys

# Check focus indicators
All interactive elements should show a visible focus ring
```

#### Screen Reader Testing

**Windows (NVDA)**:
```bash
# Download NVDA (free): https://www.nvaccess.org/
# Start reading: Insert + Down
# Stop reading: Control
```

**macOS (VoiceOver)**:
```bash
# Enable VoiceOver: Cmd + F5
# Start reading: Control + Option + A
# Navigate: Control + Option + Arrow keys
```

#### Contrast Testing

Use browser dev tools:
1. Open Chrome DevTools (F12)
2. Go to "Lighthouse" tab
3. Run "Accessibility" audit
4. Should pass all contrast checks

### Testing Responsive Design

1. **Open DevTools** (F12)
2. **Toggle Device Toolbar** (Ctrl/Cmd + Shift + M)
3. **Test breakpoints**:
   - Mobile: 375px width
   - Tablet: 768px width
   - Desktop: 1024px width
   - Wide: 1440px+ width

Components should look good and be usable at all sizes.

### Testing in Different Browsers

Test in:
- **Chrome** (latest) - Primary development browser
- **Firefox** (latest)
- **Safari** (latest) - macOS
- **Edge** (latest)

### Common Issues & Solutions

#### Issue: Components not showing styles

**Solution**: Make sure libraries are built:
```bash
pnpm run build:libs
```

#### Issue: Type errors in showcase app

**Solution**: Rebuild libraries with proper types:
```bash
pnpm run build:theming
pnpm run build:components
```

#### Issue: Theme not applying

**Solution**: Check that ThemeService is initialized in app.component.ts and the typography CSS is imported in styles.css.

#### Issue: Port 4200 already in use

**Solution**: Use a different port:
```bash
pnpm nx serve showcase --port=4201
```

### Viewing Build Output

Built files are located in:
```
dist/
├── libs/
│   ├── theming/
│   ├── shared/
│   ├── components/
│   └── theme-builder/
└── apps/
    ├── showcase/
    └── theme-builder-app/
```

### Performance Testing

1. Open Chrome DevTools
2. Go to "Performance" tab
3. Click "Record"
4. Interact with components
5. Stop recording
6. Check for:
   - Fast rendering times
   - Minimal re-renders
   - Smooth animations

### Next Steps

After testing the showcase:

1. **Explore the code** - Look at component implementations in `libs/components/src/lib/`
2. **Try the theme system** - Modify colors in `libs/theming/src/lib/tokens/primitive-tokens.ts`
3. **Create custom themes** - Use the ThemeService to register new themes
4. **Build more components** - Follow the patterns in Button, Input, Textarea, Card
5. **Write tests** - Add Jest tests to verify component behavior

### Getting Help

If you encounter issues:

1. Check `documentation/ARCHITECTURE.md` for system details
2. Review `documentation/DESIGN_SYSTEM.md` for theming questions
3. Look at existing component code for patterns
4. Check the CHANGELOG.md for recent changes

### Continuous Testing During Development

For active development:

```bash
# Terminal 1: Start showcase with auto-rebuild
pnpm start

# Terminal 2: Run tests in watch mode
pnpm run test:watch

# Terminal 3: Run linting
pnpm run lint
```

This setup provides:
- Live reload when you edit components
- Automatic test execution on file changes
- Instant feedback on code quality

---

**Happy Testing! 🎉**

The foundation is solid, the components are working, and the theme system is fully functional. Enjoy exploring the UI Component Suite!

