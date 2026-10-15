// ===== STATE MANAGEMENT =====
let testResults = [];
let activeTests = [];
let stats = {
    total: 0,
    passed: 0,
    failed: 0,
    passRate: 0
};

// ===== TEST SUITES & ENVIRONMENTS =====
const TEST_SUITES = [
    'Login Tests',
    'API Tests',
    'UI Component Tests',
    'E2E Smoke Tests',
    'Performance Tests',
    'Security Tests'
];

const ENVIRONMENTS = ['dev', 'staging', 'prod'];

const ENV_DISPLAY = {
    'dev': '🪺 Dev Nest',
    'staging': '🪺 Staging Nest',
    'prod': '🪺 Production Nest'
};

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    loadFromLocalStorage();
    renderStats();
    renderResults();
    setupEventListeners();
});

// ===== EVENT LISTENERS =====
function setupEventListeners() {
    const incubateBtn = document.getElementById('incubate-btn');
    const filterEnv = document.getElementById('filter-environment');
    const filterStatus = document.getElementById('filter-status');

    incubateBtn.addEventListener('click', handleIncubateClick);
    filterEnv.addEventListener('change', renderResults);
    filterStatus.addEventListener('change', renderResults);
}

// ===== INCUBATE NEW TESTS =====
async function handleIncubateClick() {
    const btn = document.getElementById('incubate-btn');
    const status = document.getElementById('incubator-status');
    const runningBadge = document.getElementById('running-badge');

    // Disable button during test run
    btn.disabled = true;
    status.textContent = 'Incubating tests... 🔥';
    runningBadge.style.display = 'inline-block';

    // Generate random number of tests (3-6)
    const numTests = Math.floor(Math.random() * 4) + 3;

    // Create test instances
    const tests = [];
    for (let i = 0; i < numTests; i++) {
        const test = {
            id: `test-${Date.now()}-${i}`,
            suite: TEST_SUITES[Math.floor(Math.random() * TEST_SUITES.length)],
            environment: ENVIRONMENTS[Math.floor(Math.random() * ENVIRONMENTS.length)],
            status: 'running',
            startTime: new Date().toISOString()
        };
        tests.push(test);
        activeTests.push(test);
    }

    // Render running tests
    renderActiveTests();

    // Simulate test execution (2-5 seconds per test)
    for (let i = 0; i < tests.length; i++) {
        const test = tests[i];
        const duration = Math.random() * 3000 + 2000; // 2-5 seconds

        await new Promise(resolve => setTimeout(resolve, duration));

        // 80% pass rate
        const passed = Math.random() > 0.2;
        test.status = passed ? 'passed' : 'failed';
        test.endTime = new Date().toISOString();
        test.duration = Math.round(duration / 1000);

        // Move to results
        activeTests = activeTests.filter(t => t.id !== test.id);
        testResults.unshift(test); // Add to beginning

        // Update displays
        renderActiveTests();
        updateStats();
        renderResults();
        saveToLocalStorage();
    }

    // Re-enable button
    btn.disabled = false;
    status.textContent = 'Incubation complete! 🎉';
    runningBadge.style.display = 'none';

    setTimeout(() => {
        status.textContent = 'Ready to incubate';
    }, 3000);
}

// ===== RENDER ACTIVE TESTS =====
function renderActiveTests() {
    const container = document.getElementById('active-incubator');

    if (activeTests.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <p>No tests currently running</p>
                <p class="empty-subtitle">Click "Incubate New Tests" to start</p>
            </div>
        `;
        return;
    }

    container.innerHTML = activeTests.map(test => `
        <div class="egg-card running">
            <span class="egg-icon">🥚</span>
            <div class="egg-status">Running...</div>
            <div class="egg-suite">${test.suite}</div>
            <div class="egg-env">${ENV_DISPLAY[test.environment]}</div>
        </div>
    `).join('');
}

// ===== RENDER RESULTS =====
function renderResults() {
    const container = document.getElementById('results-grid');
    const filterEnv = document.getElementById('filter-environment').value;
    const filterStatus = document.getElementById('filter-status').value;

    // Apply filters
    let filtered = testResults;

    if (filterEnv !== 'all') {
        filtered = filtered.filter(test => test.environment === filterEnv);
    }

    if (filterStatus !== 'all') {
        filtered = filtered.filter(test => test.status === filterStatus);
    }

    // Limit to 20 most recent
    filtered = filtered.slice(0, 20);

    if (filtered.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <p>No test results yet</p>
                <p class="empty-subtitle">Run your first test to see results here</p>
            </div>
        `;
        return;
    }

    container.innerHTML = filtered.map(test => {
        const icon = test.status === 'passed' ? '🐣' : '🔴';
        const statusText = test.status === 'passed' ? 'Hatched! ✅' : 'Cracked ❌';

        return `
            <div class="egg-card ${test.status}" title="${test.suite} - ${test.duration}s">
                <span class="egg-icon">${icon}</span>
                <div class="egg-status">${statusText}</div>
                <div class="egg-suite">${test.suite}</div>
                <div class="egg-env">${ENV_DISPLAY[test.environment]}</div>
            </div>
        `;
    }).join('');
}

// ===== UPDATE STATS =====
function updateStats() {
    stats.total = testResults.length;
    stats.passed = testResults.filter(t => t.status === 'passed').length;
    stats.failed = testResults.filter(t => t.status === 'failed').length;
    stats.passRate = stats.total > 0
        ? Math.round((stats.passed / stats.total) * 100)
        : 0;

    renderStats();
}

function renderStats() {
    document.getElementById('total-tests').textContent = stats.total;
    document.getElementById('passed-tests').textContent = stats.passed;
    document.getElementById('failed-tests').textContent = stats.failed;
    document.getElementById('pass-rate').textContent = `${stats.passRate}%`;
}

// ===== LOCAL STORAGE =====
function saveToLocalStorage() {
    localStorage.setItem('eggbuilds-results', JSON.stringify(testResults));
    localStorage.setItem('eggbuilds-stats', JSON.stringify(stats));
}

function loadFromLocalStorage() {
    const savedResults = localStorage.getItem('eggbuilds-results');
    const savedStats = localStorage.getItem('eggbuilds-stats');

    if (savedResults) {
        testResults = JSON.parse(savedResults);
    }

    if (savedStats) {
        stats = JSON.parse(savedStats);
    }
}

// ===== DEMO DATA GENERATOR =====
// Uncomment to populate with demo data on first load
function generateDemoData() {
    if (testResults.length > 0) return; // Already has data

    const now = new Date();
    for (let i = 0; i < 15; i++) {
        const date = new Date(now.getTime() - (i * 24 * 60 * 60 * 1000)); // Past 15 days
        const test = {
            id: `demo-${i}`,
            suite: TEST_SUITES[Math.floor(Math.random() * TEST_SUITES.length)],
            environment: ENVIRONMENTS[Math.floor(Math.random() * ENVIRONMENTS.length)],
            status: Math.random() > 0.2 ? 'passed' : 'failed',
            startTime: date.toISOString(),
            endTime: date.toISOString(),
            duration: Math.floor(Math.random() * 10) + 3
        };
        testResults.push(test);
    }

    updateStats();
    renderResults();
    saveToLocalStorage();
}

// Uncomment to load demo data on first visit
// generateDemoData();

// ===== CHART (Future Enhancement) =====
// TODO: Add Chart.js library and implement timeline chart
const chartCanvas = document.getElementById('chart-canvas');
if (chartCanvas) {
    const ctx = chartCanvas.getContext('2d');
    ctx.fillStyle = '#6B4423';
    ctx.font = '16px Segoe UI';
    ctx.textAlign = 'center';
    ctx.fillText('📊 Timeline chart coming soon!', chartCanvas.width / 2, chartCanvas.height / 2);
}
