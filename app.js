/**
 * ApexFinance - Personal Expense Tracker & Financial Dashboard Engine
 * Built with ES6+, Chart.js, Lucide Icons & localStorage persistence
 */

// ==========================================================================
// 1. Core Data Models & Initial Seed Data
// ==========================================================================

const DEFAULT_CATEGORIES = {
    expense: [
        'Food & Dining',
        'Rent & Housing',
        'Utilities & Bills',
        'Entertainment & Leisure',
        'Transportation',
        'Shopping',
        'Health & Fitness',
        'Travel & Vacation',
        'Subscriptions',
        'Miscellaneous'
    ],
    income: [
        'Monthly Salary',
        'Freelance & Projects',
        'Investments & Dividends',
        'Cashbacks & Refunds',
        'Side Business',
        'Other Income'
    ]
};

const CATEGORY_COLORS = {
    'Food & Dining': '#f59e0b',
    'Rent & Housing': '#8b5cf6',
    'Utilities & Bills': '#06b6d4',
    'Entertainment & Leisure': '#ec4899',
    'Transportation': '#3b82f6',
    'Shopping': '#10b981',
    'Health & Fitness': '#14b8a6',
    'Travel & Vacation': '#f97316',
    'Subscriptions': '#6366f1',
    'Miscellaneous': '#64748b',
    'Monthly Salary': '#10b981',
    'Freelance & Projects': '#06b6d4',
    'Investments & Dividends': '#8b5cf6',
    'Cashbacks & Refunds': '#3b82f6',
    'Side Business': '#f59e0b',
    'Other Income': '#94a3b8'
};

const DEFAULT_BUDGETS = {
    'Food & Dining': 600,
    'Rent & Housing': 1500,
    'Utilities & Bills': 250,
    'Entertainment & Leisure': 200,
    'Transportation': 180,
    'Shopping': 300,
    'Subscriptions': 50
};

// Generate realistic seed transactions across 4 months (June, July, August, Sept 2026)
function generateSeedTransactions() {
    return [
        // September 2026
        { id: 'tx-1', date: '2026-09-01', type: 'income', amount: 4800.00, category: 'Monthly Salary', description: 'Tech Corp Payroll Salary' },
        { id: 'tx-2', date: '2026-09-02', type: 'expense', amount: 1450.00, category: 'Rent & Housing', description: 'Apartment Monthly Rent' },
        { id: 'tx-3', date: '2026-09-03', type: 'expense', amount: 135.50, category: 'Utilities & Bills', description: 'Electric & Power Bill' },
        { id: 'tx-4', date: '2026-09-05', type: 'expense', amount: 84.20, category: 'Food & Dining', description: 'Whole Foods Market' },
        { id: 'tx-5', date: '2026-09-07', type: 'income', amount: 750.00, category: 'Freelance & Projects', description: 'Web Design Client Milestone' },
        { id: 'tx-6', date: '2026-09-08', type: 'expense', amount: 45.00, category: 'Transportation', description: 'Fuel & Gas Station' },
        { id: 'tx-7', date: '2026-09-09', type: 'expense', amount: 18.99, category: 'Subscriptions', description: 'Netflix 4K Subscription' },
        { id: 'tx-8', date: '2026-09-10', type: 'expense', amount: 120.00, category: 'Entertainment & Leisure', description: 'Concert Tickets' },
        { id: 'tx-9', date: '2026-09-11', type: 'expense', amount: 62.40, category: 'Food & Dining', description: 'Dinner with friends at Bistro' },
        { id: 'tx-10', date: '2026-09-12', type: 'expense', amount: 110.00, category: 'Shopping', description: 'Nike Running Shoes' },

        // August 2026
        { id: 'tx-11', date: '2026-08-01', type: 'income', amount: 4800.00, category: 'Monthly Salary', description: 'Tech Corp Payroll Salary' },
        { id: 'tx-12', date: '2026-08-02', type: 'expense', amount: 1450.00, category: 'Rent & Housing', description: 'Apartment Monthly Rent' },
        { id: 'tx-13', date: '2026-08-05', type: 'expense', amount: 142.00, category: 'Utilities & Bills', description: 'Internet & Power Services' },
        { id: 'tx-14', date: '2026-08-08', type: 'expense', amount: 310.00, category: 'Food & Dining', description: 'Trader Joes Groceries' },
        { id: 'tx-15', date: '2026-08-12', type: 'income', amount: 320.00, category: 'Investments & Dividends', description: 'Quarterly ETF Dividends' },
        { id: 'tx-16', date: '2026-08-15', type: 'expense', amount: 95.00, category: 'Health & Fitness', description: 'Gym Membership Annual' },
        { id: 'tx-17', date: '2026-08-20', type: 'expense', amount: 240.00, category: 'Travel & Vacation', description: 'Weekend Beach Cabin Stay' },
        { id: 'tx-18', date: '2026-08-25', type: 'expense', amount: 55.00, category: 'Transportation', description: 'Uber & Subway passes' },

        // July 2026
        { id: 'tx-19', date: '2026-07-01', type: 'income', amount: 4800.00, category: 'Monthly Salary', description: 'Tech Corp Payroll Salary' },
        { id: 'tx-20', date: '2026-07-02', type: 'expense', amount: 1450.00, category: 'Rent & Housing', description: 'Apartment Monthly Rent' },
        { id: 'tx-21', date: '2026-07-06', type: 'expense', amount: 260.00, category: 'Food & Dining', description: 'Supermarket Stockup' },
        { id: 'tx-22', date: '2026-07-14', type: 'expense', amount: 175.00, category: 'Shopping', description: 'Summer Clothes Sale' },
        { id: 'tx-23', date: '2026-07-18', type: 'income', amount: 500.00, category: 'Side Business', description: 'Consulting Honorarium' },
        { id: 'tx-24', date: '2026-07-22', type: 'expense', amount: 130.00, category: 'Entertainment & Leisure', description: 'Theme Park Tickets' },

        // June 2026
        { id: 'tx-25', date: '2026-06-01', type: 'income', amount: 4800.00, category: 'Monthly Salary', description: 'Tech Corp Payroll Salary' },
        { id: 'tx-26', date: '2026-06-02', type: 'expense', amount: 1450.00, category: 'Rent & Housing', description: 'Apartment Monthly Rent' },
        { id: 'tx-27', date: '2026-06-10', type: 'expense', amount: 280.00, category: 'Food & Dining', description: 'Weekly Dining & Groceries' },
        { id: 'tx-28', date: '2026-06-15', type: 'expense', amount: 115.00, category: 'Utilities & Bills', description: 'Water & Waste Management' }
    ];
}

// ==========================================================================
// 2. Application State Class
// ==========================================================================

class ExpenseTrackerState {
    constructor() {
        this.STORAGE_KEY_TX = 'apex_finance_transactions_v1';
        this.STORAGE_KEY_CAT = 'apex_finance_categories_v1';
        this.STORAGE_KEY_BUDGET = 'apex_finance_budgets_v1';

        this.transactions = this.loadTransactions();
        this.categories = this.loadCategories();
        this.budgets = this.loadBudgets();

        // UI View state
        this.selectedMonth = '2026-09'; // Default to current month in 2026
        this.searchQuery = '';
        this.typeFilter = 'all';
        this.categoryFilter = 'all';
        this.sortBy = 'date-desc';
        this.formType = 'expense';
    }

    loadTransactions() {
        const raw = localStorage.getItem(this.STORAGE_KEY_TX);
        if (!raw) {
            const seed = generateSeedTransactions();
            localStorage.setItem(this.STORAGE_KEY_TX, JSON.stringify(seed));
            return seed;
        }
        try {
            return JSON.parse(raw);
        } catch (e) {
            return generateSeedTransactions();
        }
    }

    saveTransactions() {
        localStorage.setItem(this.STORAGE_KEY_TX, JSON.stringify(this.transactions));
    }

    loadCategories() {
        const raw = localStorage.getItem(this.STORAGE_KEY_CAT);
        if (!raw) {
            return JSON.parse(JSON.stringify(DEFAULT_CATEGORIES));
        }
        try {
            return JSON.parse(raw);
        } catch (e) {
            return JSON.parse(JSON.stringify(DEFAULT_CATEGORIES));
        }
    }

    saveCategories() {
        localStorage.setItem(this.STORAGE_KEY_CAT, JSON.stringify(this.categories));
    }

    loadBudgets() {
        const raw = localStorage.getItem(this.STORAGE_KEY_BUDGET);
        if (!raw) {
            return { ...DEFAULT_BUDGETS };
        }
        try {
            return JSON.parse(raw);
        } catch (e) {
            return { ...DEFAULT_BUDGETS };
        }
    }

    saveBudgets() {
        localStorage.setItem(this.STORAGE_KEY_BUDGET, JSON.stringify(this.budgets));
    }

    addTransaction(tx) {
        this.transactions.unshift(tx);
        this.saveTransactions();
    }

    updateTransaction(updatedTx) {
        const idx = this.transactions.findIndex(t => t.id === updatedTx.id);
        if (idx !== -1) {
            this.transactions[idx] = updatedTx;
            this.saveTransactions();
        }
    }

    deleteTransaction(id) {
        this.transactions = this.transactions.filter(t => t.id !== id);
        this.saveTransactions();
    }

    resetSampleData() {
        this.transactions = generateSeedTransactions();
        this.categories = JSON.parse(JSON.stringify(DEFAULT_CATEGORIES));
        this.budgets = { ...DEFAULT_BUDGETS };
        this.saveTransactions();
        this.saveCategories();
        this.saveBudgets();
    }

    clearAllData() {
        this.transactions = [];
        this.saveTransactions();
    }

    addCustomCategory(name, type) {
        const trimmed = name.trim();
        if (!trimmed) return false;
        if (!this.categories[type].includes(trimmed)) {
            this.categories[type].push(trimmed);
            this.saveCategories();
            return true;
        }
        return false;
    }

    // Get list of unique available YYYY-MM months sorted descending
    getAvailableMonths() {
        const months = new Set(this.transactions.map(t => t.date.substring(0, 7)));
        months.add('2026-09');
        return Array.from(months).sort().reverse();
    }

    // Filter transactions based on active UI criteria
    getFilteredTransactions() {
        return this.transactions.filter(t => {
            // Month filter
            if (this.selectedMonth !== 'all' && !t.date.startsWith(this.selectedMonth)) {
                return false;
            }
            // Type filter
            if (this.typeFilter !== 'all' && t.type !== this.typeFilter) {
                return false;
            }
            // Category filter
            if (this.categoryFilter !== 'all' && t.category !== this.categoryFilter) {
                return false;
            }
            // Search filter
            if (this.searchQuery) {
                const q = this.searchQuery.toLowerCase();
                const desc = t.description.toLowerCase();
                const cat = t.category.toLowerCase();
                const amt = t.amount.toString();
                if (!desc.includes(q) && !cat.includes(q) && !amt.includes(q)) {
                    return false;
                }
            }
            return true;
        }).sort((a, b) => {
            if (this.sortBy === 'date-desc') return new Date(b.date) - new Date(a.date);
            if (this.sortBy === 'date-asc') return new Date(a.date) - new Date(b.date);
            if (this.sortBy === 'amount-desc') return b.amount - a.amount;
            if (this.sortBy === 'amount-asc') return a.amount - b.amount;
            return 0;
        });
    }
}

// Instantiate Global State Engine
const appState = new ExpenseTrackerState();

// Global Chart Instances
let donutChartInstance = null;
let barChartInstance = null;
let lineChartInstance = null;

// ==========================================================================
// 3. UI Controller & Event Handlers
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    if (window.lucide) {
        lucide.createIcons();
    }

    // Set default date in form to today (or 2026-09-13)
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('tx-date').value = today.startsWith('202') ? today : '2026-09-13';

    // Setup Form Controls
    initFormTypeToggle();
    updateCategorySelectOptions();

    // Populate Category Filters
    updateCategoryFilterDropdown();

    // Setup Event Listeners
    setupEventListeners();

    // Initial Dashboard Render
    renderDashboard();
});

function setupEventListeners() {
    // Transaction Form Submit
    const form = document.getElementById('transaction-form');
    form.addEventListener('submit', handleAddTransactionSubmit);

    // Form inputs real-time error clearance
    ['tx-amount', 'tx-date', 'tx-description', 'tx-category'].forEach(id => {
        document.getElementById(id).addEventListener('input', () => {
            document.getElementById(id).parentElement.parentElement.classList.remove('has-error');
        });
    });

    // Month Navigation Controls
    document.getElementById('btn-prev-month').addEventListener('click', handlePrevMonth);
    document.getElementById('btn-next-month').addEventListener('click', handleNextMonth);
    document.getElementById('btn-all-months').addEventListener('click', handleAllMonthsToggle);

    // Filters & Sorting Controls
    const searchInput = document.getElementById('filter-search');
    const clearSearchBtn = document.getElementById('btn-clear-search');

    searchInput.addEventListener('input', (e) => {
        appState.searchQuery = e.target.value.trim();
        if (appState.searchQuery) {
            clearSearchBtn.classList.remove('hidden');
        } else {
            clearSearchBtn.classList.add('hidden');
        }
        renderTableAndSummaries();
        renderCharts();
    });

    clearSearchBtn.addEventListener('click', () => {
        searchInput.value = '';
        appState.searchQuery = '';
        clearSearchBtn.classList.add('hidden');
        renderTableAndSummaries();
        renderCharts();
    });

    document.getElementById('filter-type').addEventListener('change', (e) => {
        appState.typeFilter = e.target.value;
        renderTableAndSummaries();
        renderCharts();
    });

    document.getElementById('filter-category').addEventListener('change', (e) => {
        appState.categoryFilter = e.target.value;
        renderTableAndSummaries();
        renderCharts();
    });

    document.getElementById('filter-sort').addEventListener('change', (e) => {
        appState.sortBy = e.target.value;
        renderTableAndSummaries();
    });

    document.getElementById('btn-reset-filters').addEventListener('click', () => {
        appState.searchQuery = '';
        appState.typeFilter = 'all';
        appState.categoryFilter = 'all';
        searchInput.value = '';
        document.getElementById('filter-type').value = 'all';
        document.getElementById('filter-category').value = 'all';
        clearSearchBtn.classList.add('hidden');
        renderTableAndSummaries();
        renderCharts();
    });

    // Navigation Bar Actions
    document.getElementById('btn-reset-demo').addEventListener('click', () => {
        if (confirm('Are you sure you want to reset all data back to the demo dataset?')) {
            appState.resetSampleData();
            updateCategoryFilterDropdown();
            updateCategorySelectOptions();
            renderDashboard();
            showToast('Sample data restored successfully!', 'info');
        }
    });

    document.getElementById('btn-clear-all').addEventListener('click', () => {
        if (confirm('CAUTION: This will delete all saved transactions. Are you sure?')) {
            appState.clearAllData();
            renderDashboard();
            showToast('All transactions cleared.', 'danger');
        }
    });

    document.getElementById('btn-export-csv').addEventListener('click', handleExportCSV);
    document.getElementById('input-import-csv').addEventListener('change', handleImportCSV);

    // Custom Category Modal
    document.getElementById('btn-open-custom-cat').addEventListener('click', () => {
        document.getElementById('modal-custom-cat').classList.remove('hidden');
    });

    document.querySelectorAll('.btn-close-cat-modal').forEach(btn => {
        btn.addEventListener('click', () => {
            document.getElementById('modal-custom-cat').classList.add('hidden');
        });
    });

    document.getElementById('custom-cat-form').addEventListener('submit', handleAddCustomCategory);

    // Edit Transaction Modal
    document.querySelectorAll('.btn-close-modal').forEach(btn => {
        btn.addEventListener('click', () => {
            document.getElementById('modal-edit-tx').classList.add('hidden');
        });
    });

    document.getElementById('edit-tx-form').addEventListener('submit', handleSaveEditTransaction);

    // Budget Management Modal
    document.getElementById('btn-edit-budgets').addEventListener('click', openBudgetModal);
    document.querySelectorAll('.btn-close-budget-modal').forEach(btn => {
        btn.addEventListener('click', () => {
            document.getElementById('modal-budgets').classList.add('hidden');
        });
    });
    document.getElementById('btn-save-budgets').addEventListener('click', saveBudgetModal);
}

// Income / Expense Form Toggle Initialization
function initFormTypeToggle() {
    const btnExpense = document.getElementById('btn-type-expense');
    const btnIncome = document.getElementById('btn-type-income');
    const txTypeInput = document.getElementById('tx-type');

    btnExpense.addEventListener('click', () => {
        appState.formType = 'expense';
        txTypeInput.value = 'expense';
        btnExpense.classList.add('active-expense');
        btnIncome.classList.remove('active-income');
        updateCategorySelectOptions();
    });

    btnIncome.addEventListener('click', () => {
        appState.formType = 'income';
        txTypeInput.value = 'income';
        btnIncome.classList.add('active-income');
        btnExpense.classList.remove('active-expense');
        updateCategorySelectOptions();
    });
}

function updateCategorySelectOptions() {
    const select = document.getElementById('tx-category');
    select.innerHTML = '';

    const list = appState.categories[appState.formType] || [];
    list.forEach(cat => {
        const opt = document.createElement('option');
        opt.value = cat;
        opt.textContent = cat;
        select.appendChild(opt);
    });
}

function updateCategoryFilterDropdown() {
    const select = document.getElementById('filter-category');
    select.innerHTML = '<option value="all">All Categories</option>';

    const allCats = [
        ...appState.categories.expense,
        ...appState.categories.income
    ];
    const uniqueCats = Array.from(new Set(allCats)).sort();

    uniqueCats.forEach(cat => {
        const opt = document.createElement('option');
        opt.value = cat;
        opt.textContent = cat;
        select.appendChild(opt);
    });
}

// Month Navigation
function handlePrevMonth() {
    const months = appState.getAvailableMonths();
    if (appState.selectedMonth === 'all') {
        appState.selectedMonth = months[0] || '2026-09';
    } else {
        const idx = months.indexOf(appState.selectedMonth);
        if (idx < months.length - 1) {
            appState.selectedMonth = months[idx + 1];
        } else {
            // Shift back one month chronologically
            const [y, m] = appState.selectedMonth.split('-').map(Number);
            const date = new Date(y, m - 2, 1);
            appState.selectedMonth = date.toISOString().substring(0, 7);
        }
    }
    renderDashboard();
}

function handleNextMonth() {
    const months = appState.getAvailableMonths();
    if (appState.selectedMonth === 'all') {
        appState.selectedMonth = months[0] || '2026-09';
    } else {
        const idx = months.indexOf(appState.selectedMonth);
        if (idx > 0) {
            appState.selectedMonth = months[idx - 1];
        } else {
            // Shift forward one month chronologically
            const [y, m] = appState.selectedMonth.split('-').map(Number);
            const date = new Date(y, m, 1);
            appState.selectedMonth = date.toISOString().substring(0, 7);
        }
    }
    renderDashboard();
}

function handleAllMonthsToggle() {
    if (appState.selectedMonth === 'all') {
        appState.selectedMonth = '2026-09';
    } else {
        appState.selectedMonth = 'all';
    }
    renderDashboard();
}

// Form Handlers
function handleAddTransactionSubmit(e) {
    e.preventDefault();

    const type = document.getElementById('tx-type').value;
    const amountVal = parseFloat(document.getElementById('tx-amount').value);
    const dateVal = document.getElementById('tx-date').value;
    const categoryVal = document.getElementById('tx-category').value;
    const descVal = document.getElementById('tx-description').value.trim();

    let isValid = true;

    if (isNaN(amountVal) || amountVal <= 0) {
        document.getElementById('tx-amount').parentElement.parentElement.classList.add('has-error');
        isValid = false;
    }
    if (!dateVal) {
        document.getElementById('tx-date').parentElement.parentElement.classList.add('has-error');
        isValid = false;
    }
    if (!categoryVal) {
        document.getElementById('tx-category').parentElement.parentElement.classList.add('has-error');
        isValid = false;
    }
    if (!descVal) {
        document.getElementById('tx-description').parentElement.parentElement.classList.add('has-error');
        isValid = false;
    }

    if (!isValid) return;

    const newTx = {
        id: 'tx-' + Date.now(),
        date: dateVal,
        type: type,
        amount: amountVal,
        category: categoryVal,
        description: descVal
    };

    appState.addTransaction(newTx);
    document.getElementById('tx-amount').value = '';
    document.getElementById('tx-description').value = '';

    renderDashboard();
    showToast(`New ${type} of $${amountVal.toFixed(2)} added!`, 'success');
}

function handleAddCustomCategory(e) {
    e.preventDefault();
    const nameInput = document.getElementById('new-cat-name');
    const typeSelect = document.getElementById('new-cat-type');

    const added = appState.addCustomCategory(nameInput.value, typeSelect.value);
    if (added) {
        nameInput.value = '';
        document.getElementById('modal-custom-cat').classList.add('hidden');
        updateCategorySelectOptions();
        updateCategoryFilterDropdown();
        showToast('Category created!', 'success');
    } else {
        alert('Category already exists or is invalid.');
    }
}

// Edit & Delete Table Actions
function openEditModal(id) {
    const tx = appState.transactions.find(t => t.id === id);
    if (!tx) return;

    document.getElementById('edit-tx-id').value = tx.id;
    document.getElementById('edit-tx-amount').value = tx.amount;
    document.getElementById('edit-tx-date').value = tx.date;
    document.getElementById('edit-tx-description').value = tx.description;

    const editTypeInput = document.getElementById('edit-tx-type');
    editTypeInput.value = tx.type;

    const btnExp = document.getElementById('edit-btn-type-expense');
    const btnInc = document.getElementById('edit-btn-type-income');

    if (tx.type === 'expense') {
        btnExp.classList.add('active-expense');
        btnInc.classList.remove('active-income');
    } else {
        btnInc.classList.add('active-income');
        btnExp.classList.remove('active-expense');
    }

    // Populate category dropdown
    const catSelect = document.getElementById('edit-tx-category');
    catSelect.innerHTML = '';
    const cats = appState.categories[tx.type] || [];
    cats.forEach(c => {
        const opt = document.createElement('option');
        opt.value = c;
        opt.textContent = c;
        if (c === tx.category) opt.selected = true;
        catSelect.appendChild(opt);
    });

    document.getElementById('modal-edit-tx').classList.remove('hidden');
}

function handleSaveEditTransaction(e) {
    e.preventDefault();
    const id = document.getElementById('edit-tx-id').value;
    const type = document.getElementById('edit-tx-type').value;
    const amount = parseFloat(document.getElementById('edit-tx-amount').value);
    const date = document.getElementById('edit-tx-date').value;
    const category = document.getElementById('edit-tx-category').value;
    const description = document.getElementById('edit-tx-description').value.trim();

    if (isNaN(amount) || amount <= 0 || !date || !category || !description) {
        alert('Please fill out all required fields with valid values.');
        return;
    }

    appState.updateTransaction({ id, date, type, amount, category, description });
    document.getElementById('modal-edit-tx').classList.add('hidden');
    renderDashboard();
    showToast('Transaction updated!', 'success');
}

function deleteTransactionItem(id) {
    if (confirm('Delete this transaction entry?')) {
        appState.deleteTransaction(id);
        renderDashboard();
        showToast('Transaction deleted.', 'info');
    }
}

// ==========================================================================
// 4. Budget Settings Modal Controls
// ==========================================================================

function openBudgetModal() {
    const list = document.getElementById('budget-settings-list');
    list.innerHTML = '';

    const cats = appState.categories.expense;
    cats.forEach(cat => {
        const currVal = appState.budgets[cat] || 0;
        const div = document.createElement('div');
        div.className = 'form-group';
        div.innerHTML = `
            <label class="form-label">${cat} ($/mo)</label>
            <input type="number" data-budget-cat="${cat}" class="input-budget-val" value="${currVal}" min="0" step="10" placeholder="0">
        `;
        list.appendChild(div);
    });

    document.getElementById('modal-budgets').classList.remove('hidden');
}

function saveBudgetModal() {
    const inputs = document.querySelectorAll('.input-budget-val');
    inputs.forEach(input => {
        const cat = input.getAttribute('data-budget-cat');
        const val = parseFloat(input.value) || 0;
        appState.budgets[cat] = val;
    });

    appState.saveBudgets();
    document.getElementById('modal-budgets').classList.add('hidden');
    renderBudgetWidget();
    showToast('Category budgets updated!', 'success');
}

// ==========================================================================
// 5. CSV Export & Import Handlers
// ==========================================================================

function handleExportCSV() {
    const txs = appState.transactions;
    if (txs.length === 0) {
        showToast('No transactions available to export.', 'info');
        return;
    }

    let csvContent = 'data:text/csv;charset=utf-8,ID,Date,Type,Category,Description,Amount\n';
    txs.forEach(t => {
        const safeDesc = `"${t.description.replace(/"/g, '""')}"`;
        const safeCat = `"${t.category.replace(/"/g, '""')}"`;
        csvContent += `${t.id},${t.date},${t.type},${safeCat},${safeDesc},${t.amount}\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `apex_finance_export_${new Date().toISOString().substring(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast('Exported CSV successfully!', 'success');
}

function handleImportCSV(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (evt) {
        const text = evt.target.result;
        const lines = text.split('\n');
        let count = 0;

        for (let i = 1; i < lines.length; i++) {
            const line = lines[i].trim();
            if (!line) continue;

            // Basic CSV regex parser
            const parts = line.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);
            if (parts && parts.length >= 5) {
                const date = parts[1].replace(/"/g, '');
                const type = parts[2].replace(/"/g, '').toLowerCase();
                const category = parts[3].replace(/"/g, '');
                const description = parts[4].replace(/"/g, '');
                const amount = parseFloat(parts[5].replace(/"/g, ''));

                if (date && (type === 'income' || type === 'expense') && !isNaN(amount)) {
                    appState.transactions.push({
                        id: 'imported-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4),
                        date,
                        type,
                        category,
                        description,
                        amount
                    });
                    count++;
                }
            }
        }

        appState.saveTransactions();
        renderDashboard();
        showToast(`Imported ${count} transactions from CSV!`, 'success');
        e.target.value = '';
    };

    reader.readAsText(file);
}

// ==========================================================================
// 6. Master Dashboard Rendering Pipeline
// ==========================================================================

function renderDashboard() {
    renderMonthLabel();
    renderTableAndSummaries();
    renderCharts();
    renderBudgetWidget();
}

function renderMonthLabel() {
    const labelElem = document.getElementById('current-month-label');
    const allBtn = document.getElementById('btn-all-months');

    if (appState.selectedMonth === 'all') {
        labelElem.textContent = 'All Time History';
        allBtn.classList.add('btn-primary');
        allBtn.classList.remove('pill-btn');
    } else {
        const [y, m] = appState.selectedMonth.split('-').map(Number);
        const dateObj = new Date(y, m - 1, 1);
        const monthName = dateObj.toLocaleString('default', { month: 'long', year: 'numeric' });
        labelElem.textContent = monthName;
        allBtn.classList.remove('btn-primary');
        allBtn.classList.add('pill-btn');
    }
}

function renderTableAndSummaries() {
    const filtered = appState.getFilteredTransactions();

    // 1. Calculate Summaries (for the selected month/period)
    let totalIncome = 0;
    let totalExpense = 0;
    let incomeCount = 0;
    let expenseCount = 0;

    // We compute totals over the selected month (regardless of search query) so card metrics remain stable
    const periodTransactions = appState.transactions.filter(t => {
        if (appState.selectedMonth !== 'all' && !t.date.startsWith(appState.selectedMonth)) {
            return false;
        }
        return true;
    });

    periodTransactions.forEach(t => {
        if (t.type === 'income') {
            totalIncome += t.amount;
            incomeCount++;
        } else if (t.type === 'expense') {
            totalExpense += t.amount;
            expenseCount++;
        }
    });

    const netBalance = totalIncome - totalExpense;
    const savingsRate = totalIncome > 0 ? Math.max(0, ((totalIncome - totalExpense) / totalIncome) * 100) : 0;

    // Update Card Values
    document.getElementById('total-income').textContent = formatCurrency(totalIncome);
    document.getElementById('total-expense').textContent = formatCurrency(totalExpense);
    document.getElementById('net-balance').textContent = formatCurrency(netBalance);
    document.getElementById('savings-rate').textContent = `${savingsRate.toFixed(1)}%`;

    document.getElementById('income-count').textContent = `${incomeCount} deposits`;
    document.getElementById('expense-count').textContent = `${expenseCount} entries`;

    // Savings Progress fill
    document.getElementById('savings-progress-fill').style.width = `${Math.min(100, savingsRate)}%`;

    // Balance Health Badge
    const statusElem = document.getElementById('balance-status');
    const balanceElem = document.getElementById('net-balance');

    if (netBalance < 0) {
        statusElem.className = 'summary-badge status-negative';
        statusElem.innerHTML = `<i data-lucide="alert-triangle"></i> Deficit Warning`;
        balanceElem.className = 'summary-value red-text';
    } else {
        statusElem.className = 'summary-badge status-positive';
        statusElem.innerHTML = `<i data-lucide="check-circle-2"></i> Healthy Surplus`;
        balanceElem.className = 'summary-value cyan-text';
    }

    // 2. Populate Transaction Table
    const tbody = document.getElementById('tx-table-body');
    const emptyState = document.getElementById('table-empty-state');
    const countDisplay = document.getElementById('tx-count-display');

    countDisplay.textContent = filtered.length;
    tbody.innerHTML = '';

    if (filtered.length === 0) {
        emptyState.classList.remove('hidden');
    } else {
        emptyState.classList.add('hidden');

        filtered.forEach(t => {
            const tr = document.createElement('tr');

            const isIncome = t.type === 'income';
            const badgeClass = isIncome ? 'badge-income' : 'badge-expense';
            const iconName = isIncome ? 'arrow-down-left' : 'arrow-up-right';
            const amountColor = isIncome ? 'green-text' : 'red-text';
            const sign = isIncome ? '+' : '-';

            tr.innerHTML = `
                <td>${formatDate(t.date)}</td>
                <td>
                    <span class="badge ${badgeClass}">
                        <i data-lucide="${iconName}"></i> ${isIncome ? 'Income' : 'Expense'}
                    </span>
                </td>
                <td style="font-weight: 500;">${escapeHTML(t.description)}</td>
                <td><span class="cat-chip">${escapeHTML(t.category)}</span></td>
                <td class="text-right amount-display ${amountColor}">${sign}${formatCurrency(t.amount)}</td>
                <td class="text-center">
                    <div class="tx-actions">
                        <button class="action-btn action-edit" data-id="${t.id}" title="Edit Transaction">
                            <i data-lucide="edit-3"></i>
                        </button>
                        <button class="action-btn action-delete" data-id="${t.id}" title="Delete Transaction">
                            <i data-lucide="trash"></i>
                        </button>
                    </div>
                </td>
            `;
            tbody.appendChild(tr);
        });

        // Attach table row action listeners
        tbody.querySelectorAll('.action-edit').forEach(btn => {
            btn.addEventListener('click', () => openEditModal(btn.getAttribute('data-id')));
        });
        tbody.querySelectorAll('.action-delete').forEach(btn => {
            btn.addEventListener('click', () => deleteTransactionItem(btn.getAttribute('data-id')));
        });
    }

    // Render Lucide icons in dynamic elements
    if (window.lucide) {
        lucide.createIcons();
    }

    // Render active filter badges
    renderFilterTags();
}

function renderFilterTags() {
    const container = document.getElementById('active-filter-tags');
    container.innerHTML = '';

    if (appState.searchQuery) {
        container.appendChild(createTag(`Search: "${appState.searchQuery}"`));
    }
    if (appState.typeFilter !== 'all') {
        container.appendChild(createTag(`Type: ${appState.typeFilter}`));
    }
    if (appState.categoryFilter !== 'all') {
        container.appendChild(createTag(`Category: ${appState.categoryFilter}`));
    }
}

function createTag(text) {
    const span = document.createElement('span');
    span.className = 'filter-tag';
    span.textContent = text;
    return span;
}

// ==========================================================================
// 7. Visual Chart Rendering (Chart.js Engine)
// ==========================================================================

function renderCharts() {
    if (!window.Chart) return;

    renderDonutChart();
    renderBarChart();
    renderLineChart();
}

// 1. Donut Chart - Expense Breakdown
function renderDonutChart() {
    const ctx = document.getElementById('categoryDonutChart').getContext('2d');
    const emptyState = document.getElementById('donut-empty-state');

    // Filter expenses for active month
    const expenses = appState.transactions.filter(t => {
        if (t.type !== 'expense') return false;
        if (appState.selectedMonth !== 'all' && !t.date.startsWith(appState.selectedMonth)) return false;
        return true;
    });

    if (expenses.length === 0) {
        emptyState.classList.remove('hidden');
        if (donutChartInstance) donutChartInstance.destroy();
        return;
    } else {
        emptyState.classList.add('hidden');
    }

    // Group expense total by category
    const catMap = {};
    expenses.forEach(t => {
        catMap[t.category] = (catMap[t.category] || 0) + t.amount;
    });

    const labels = Object.keys(catMap);
    const data = Object.values(catMap);
    const bgColors = labels.map(label => CATEGORY_COLORS[label] || '#8b5cf6');

    if (donutChartInstance) donutChartInstance.destroy();

    donutChartInstance = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: bgColors,
                borderColor: '#111a2e',
                borderWidth: 3,
                hoverOffset: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        color: '#94a3b8',
                        font: { family: 'Inter', size: 12 },
                        padding: 14,
                        usePointStyle: true,
                        pointStyle: 'circle'
                    }
                },
                tooltip: {
                    backgroundColor: '#1e293b',
                    titleColor: '#f8fafc',
                    bodyColor: '#cbd5e1',
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    borderWidth: 1,
                    padding: 12,
                    callbacks: {
                        label: function (context) {
                            const val = context.raw || 0;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const pct = ((val / total) * 100).toFixed(1);
                            return ` ${context.label}: $${val.toFixed(2)} (${pct}%)`;
                        }
                    }
                }
            },
            cutout: '72%'
        }
    });
}

// 2. Bar Chart - Monthly Income vs Expense
function renderBarChart() {
    const ctx = document.getElementById('monthlyBarChart').getContext('2d');

    // Get last 6 months
    const months = ['2026-04', '2026-05', '2026-06', '2026-07', '2026-08', '2026-09'];
    const monthLabels = months.map(m => {
        const [y, mon] = m.split('-').map(Number);
        return new Date(y, mon - 1, 1).toLocaleString('default', { month: 'short' });
    });

    const incomeData = months.map(m => {
        return appState.transactions
            .filter(t => t.type === 'income' && t.date.startsWith(m))
            .reduce((sum, t) => sum + t.amount, 0);
    });

    const expenseData = months.map(m => {
        return appState.transactions
            .filter(t => t.type === 'expense' && t.date.startsWith(m))
            .reduce((sum, t) => sum + t.amount, 0);
    });

    if (barChartInstance) barChartInstance.destroy();

    barChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: monthLabels,
            datasets: [
                {
                    label: 'Income',
                    data: incomeData,
                    backgroundColor: 'rgba(16, 185, 129, 0.85)',
                    borderRadius: 6,
                    barPercentage: 0.6,
                    categoryPercentage: 0.7
                },
                {
                    label: 'Expense',
                    data: expenseData,
                    backgroundColor: 'rgba(244, 63, 94, 0.85)',
                    borderRadius: 6,
                    barPercentage: 0.6,
                    categoryPercentage: 0.7
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    grid: { display: false },
                    ticks: { color: '#94a3b8', font: { family: 'Inter', size: 12 } }
                },
                y: {
                    grid: { color: 'rgba(255, 255, 255, 0.06)' },
                    ticks: {
                        color: '#94a3b8',
                        font: { family: 'Inter', size: 11 },
                        callback: value => '$' + value
                    }
                }
            },
            plugins: {
                legend: {
                    position: 'top',
                    align: 'end',
                    labels: { color: '#94a3b8', usePointStyle: true, font: { family: 'Inter', size: 12 } }
                },
                tooltip: {
                    backgroundColor: '#1e293b',
                    borderColor: 'rgba(255,255,255,0.1)',
                    borderWidth: 1,
                    callbacks: {
                        label: ctx => ` ${ctx.dataset.label}: $${ctx.raw.toFixed(2)}`
                    }
                }
            }
        }
    });
}

// 3. Line Chart - Spending Trend Over Time
function renderLineChart() {
    const ctx = document.getElementById('spendingLineChart').getContext('2d');

    // Filter expenses
    const filteredTxs = appState.transactions.filter(t => {
        if (t.type !== 'expense') return false;
        if (appState.selectedMonth !== 'all' && !t.date.startsWith(appState.selectedMonth)) return false;
        return true;
    }).sort((a, b) => new Date(a.date) - new Date(b.date));

    // Map daily spending cumulative total
    const dateMap = {};
    filteredTxs.forEach(t => {
        dateMap[t.date] = (dateMap[t.date] || 0) + t.amount;
    });

    const dates = Object.keys(dateMap).sort();
    let cumulative = 0;
    const trendData = dates.map(d => {
        cumulative += dateMap[d];
        return cumulative;
    });

    const formattedDates = dates.map(d => {
        const dt = new Date(d);
        return `${dt.toLocaleString('default', { month: 'short' })} ${dt.getDate()}`;
    });

    // Create Gradient fill
    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, 'rgba(139, 92, 246, 0.35)');
    gradient.addColorStop(1, 'rgba(139, 92, 246, 0.0)');

    if (lineChartInstance) lineChartInstance.destroy();

    lineChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: formattedDates.length > 0 ? formattedDates : ['No Data'],
            datasets: [{
                label: 'Cumulative Spending ($)',
                data: trendData.length > 0 ? trendData : [0],
                borderColor: '#8b5cf6',
                borderWidth: 3,
                backgroundColor: gradient,
                fill: true,
                tension: 0.35,
                pointBackgroundColor: '#06b6d4',
                pointBorderColor: '#ffffff',
                pointRadius: 4,
                pointHoverRadius: 7
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    grid: { color: 'rgba(255, 255, 255, 0.04)' },
                    ticks: { color: '#94a3b8', font: { family: 'Inter', size: 11 } }
                },
                y: {
                    grid: { color: 'rgba(255, 255, 255, 0.06)' },
                    ticks: {
                        color: '#94a3b8',
                        font: { family: 'Inter', size: 11 },
                        callback: val => '$' + val
                    }
                }
            },
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: '#1e293b',
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    borderWidth: 1,
                    callbacks: {
                        label: ctx => ` Total Spent: $${ctx.raw.toFixed(2)}`
                    }
                }
            }
        }
    });
}

// ==========================================================================
// 8. Budget Progress Bar Widget Render
// ==========================================================================

function renderBudgetWidget() {
    const container = document.getElementById('budget-progress-list');
    container.innerHTML = '';

    // Calculate current month's expenses per category
    const monthExpenses = {};
    const currMonth = appState.selectedMonth === 'all' ? '2026-09' : appState.selectedMonth;

    appState.transactions
        .filter(t => t.type === 'expense' && t.date.startsWith(currMonth))
        .forEach(t => {
            monthExpenses[t.category] = (monthExpenses[t.category] || 0) + t.amount;
        });

    const trackedCats = Object.keys(appState.budgets);
    if (trackedCats.length === 0) {
        container.innerHTML = '<p style="font-size:0.8rem; color: var(--text-muted);">No budget limits configured.</p>';
        return;
    }

    trackedCats.forEach(cat => {
        const limit = appState.budgets[cat];
        if (limit <= 0) return;

        const spent = monthExpenses[cat] || 0;
        const pct = Math.min(100, (spent / limit) * 100);

        let barColor = 'var(--cyan)';
        if (pct > 85) barColor = 'var(--amber)';
        if (pct >= 100) barColor = 'var(--red)';

        const div = document.createElement('div');
        div.className = 'budget-item';
        div.innerHTML = `
            <div class="budget-item-info">
                <span class="budget-cat-name">${cat}</span>
                <span class="budget-spent-val">$${spent.toFixed(0)} / $${limit}</span>
            </div>
            <div class="progress-bar-container">
                <div class="progress-bar-fill" style="width: ${pct}%; background: ${barColor};"></div>
            </div>
        `;
        container.appendChild(div);
    });
}

// ==========================================================================
// 9. Utilities & Helpers
// ==========================================================================

function formatCurrency(val) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
    }).format(val);
}

function formatDate(dateStr) {
    if (!dateStr) return '';
    const [y, m, d] = dateStr.split('-').map(Number);
    const date = new Date(y, m - 1, d);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function escapeHTML(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    let icon = 'info';
    if (type === 'success') icon = 'check-circle';
    if (type === 'danger') icon = 'alert-circle';

    toast.innerHTML = `<i data-lucide="${icon}"></i> <span>${escapeHTML(message)}</span>`;
    container.appendChild(toast);

    if (window.lucide) lucide.createIcons();

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        toast.style.transition = 'all 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3200);
}


