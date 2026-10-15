# 🥚 Egg-Tests - EggBuilds Test Suite

TypeScript + Playwright test automation for the EggBuilds dashboard.

## 📋 Test Suites

### 1. **dashboard.spec.ts** - Core Functionality
Tests the basic dashboard elements and structure:
- Page title and header
- Stat cards (Total, Passed, Failed, Pass Rate)
- Incubate button presence
- Empty states
- Filter options
- Footer and tech stack

### 2. **interactions.spec.ts** - User Interactions
Tests dynamic behavior and user interactions:
- Incubating new tests
- Running test animations
- Stats updates
- Completed test results
- Environment filtering
- Status filtering
- LocalStorage persistence

### 3. **visual.spec.ts** - Visual & Responsive
Tests visual elements and responsive design:
- Logo animations
- Egg theme colors
- Emoji icons
- Hover effects
- Mobile responsiveness (375px)
- Tablet responsiveness (768px)
- Smooth animations
- Color contrast

## 🚀 Running Tests

### Install Dependencies
```bash
npm install
```

### Run All Tests
```bash
npm test
```

### Run with UI Mode (Interactive)
```bash
npm run test:ui
```

### Run in Headed Mode (See Browser)
```bash
npm run test:headed
```

### View Test Report
```bash
npm run test:report
```

### Debug Tests
```bash
npm run test:debug
```

## 📊 Test Coverage

- **Total Tests**: 20+
- **Test Suites**: 3
- **Browsers**: Chromium, Firefox, WebKit
- **Coverage Areas**:
  - ✅ UI Components
  - ✅ User Interactions
  - ✅ Data Persistence
  - ✅ Filters & Search
  - ✅ Responsive Design
  - ✅ Animations
  - ✅ Accessibility

## 🎯 CI/CD Integration

These tests run automatically on:
- **CircleCI**: Nightly runs at 2 AM UTC
- **Pull Requests**: All tests must pass
- **Main Branch**: Full test suite on merge

Test results are:
- Stored in DynamoDB (coming soon)
- Displayed on the EggBuilds dashboard
- Reported in CircleCI artifacts

## 📁 Test Structure

```
egg-tests/
├── dashboard.spec.ts       # Core dashboard tests
├── interactions.spec.ts    # User interaction tests
├── visual.spec.ts          # Visual & responsive tests
└── README.md               # This file
```

## 🔧 Configuration

- **playwright.config.ts** - Playwright configuration
- **tsconfig.json** - TypeScript configuration
- **package.json** - Dependencies and scripts

## 📈 Test Metrics

Tests generate metrics including:
- Test suite name
- Environment (dev/staging/prod)
- Pass/Fail status
- Duration
- Timestamp

These metrics power the EggBuilds dashboard visualization!

## 🐛 Debugging

If tests fail:
1. Run with `--debug` flag
2. Check screenshots in `test-results/`
3. Review trace files
4. Check `test-results.json` for details

## 🎨 Egg Theme

Tests follow the egg metaphor:
- 🥚 **Eggs** = Test suites
- 🔥 **Incubation** = Tests running
- 🐣 **Hatching** = Tests passing
- 🔴 **Cracking** = Tests failing

---

*Automating automation - one egg at a time!* 🐔
