// Global Bank - Web Application JavaScript

// Bank data for withdrawals
const microfinanceBanks = [
    'Finca Microfinance Bank',
    'LAPO Microfinance Bank',
    'Access Microfinance Bank',
    'Fortis Microfinance Bank',
    'Mintfin Microfinance Bank',
    'Bowe Microfinance Bank',
    'Grooming Microfinance Bank'
];

const commercialBanks = [
    'First Bank of Nigeria',
    'Access Bank',
    'Guaranty Trust Bank',
    'Zenith Bank',
    'United Bank for Africa',
    'Wema Bank',
    'Sterling Bank',
    'Fidelity Bank',
    'Union Bank',
    'Ecobank Nigeria'
];

// State management
let currentUser = null;
let currentRole = null;
let users = [];
let transactions = [];

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    loadData();
    initializeForms();
    updateBankOptions();
});

// Load data from localStorage
function loadData() {
    const savedUsers = localStorage.getItem('globalBankUsers');
    const savedTransactions = localStorage.getItem('globalBankTransactions');
    
    if (savedUsers) {
        users = JSON.parse(savedUsers);
    } else {
        // Initialize with demo users
        users = [
            {
                id: 1,
                firstName: 'Admin',
                lastName: 'User',
                email: 'admin@globalbank.com',
                password: 'admin123',
                phone: '+1234567890',
                balance: 0,
                role: 'admin',
                status: 'active',
                createdAt: new Date().toISOString()
            },
            {
                id: 2,
                firstName: 'John',
                lastName: 'Doe',
                email: 'john@example.com',
                password: 'password123',
                phone: '+2348012345678',
                balance: 5000.00,
                role: 'customer',
                status: 'active',
                createdAt: new Date().toISOString()
            }
        ];
        saveData();
    }
    
    if (savedTransactions) {
        transactions = JSON.parse(savedTransactions);
    } else {
        transactions = [];
    }
}

// Save data to localStorage
function saveData() {
    localStorage.setItem('globalBankUsers', JSON.stringify(users));
    localStorage.setItem('globalBankTransactions', JSON.stringify(transactions));
}

// Initialize form handlers
function initializeForms() {
    // Login form
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
    
    // Register form
    document.getElementById('registerForm').addEventListener('submit', handleRegister);
    
    // Transfer form
    document.getElementById('transferForm').addEventListener('submit', handleTransfer);
    
    // Withdraw form
    document.getElementById('withdrawForm').addEventListener('submit', handleWithdraw);
    
    // Credit form
    document.getElementById('creditForm').addEventListener('submit', handleCredit);
    
    // Edit transaction form
    document.getElementById('editTransactionForm').addEventListener('submit', handleEditTransaction);
    
    // Edit profile form
    document.getElementById('editProfileForm').addEventListener('submit', handleEditProfile);
    
    // Settings form
    document.getElementById('settingsForm').addEventListener('submit', handleSettings);
    
    // Admin register customer form
    document.getElementById('adminRegisterCustomerForm').addEventListener('submit', handleAdminRegisterCustomer);
    
    // Admin edit customer form
    document.getElementById('adminEditCustomerForm').addEventListener('submit', handleAdminEditCustomer);
    
    // Admin customer credit/debit form
    document.getElementById('adminCustomerCreditForm').addEventListener('submit', handleAdminCustomerCredit);
}

// Authentication functions
function showLogin(role) {
    currentRole = role;
    document.getElementById('loginTitle').textContent = role === 'admin' ? 'Admin Login' : 'Customer Login';
    document.getElementById('loginModal').classList.add('active');
}

function closeLoginModal() {
    document.getElementById('loginModal').classList.remove('active');
    document.getElementById('loginAlert').style.display = 'none';
    document.getElementById('loginForm').reset();
}

function toggleRegisterForm() {
    closeLoginModal();
    document.getElementById('registerModal').classList.add('active');
}

function closeRegisterModal() {
    document.getElementById('registerModal').classList.remove('active');
    document.getElementById('registerForm').reset();
}

function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        // Check role match
        if (currentRole === 'admin' && user.role !== 'admin') {
            document.getElementById('loginAlert').style.display = 'block';
            return;
        }
        
        if (currentRole === 'customer' && user.role !== 'customer') {
            document.getElementById('loginAlert').style.display = 'block';
            return;
        }
        
        currentUser = user;
        closeLoginModal();
        showDashboard();
    } else {
        document.getElementById('loginAlert').style.display = 'block';
    }
}

function handleRegister(e) {
    e.preventDefault();
    
    const firstName = document.getElementById('regFirstName').value;
    const lastName = document.getElementById('regLastName').value;
    const email = document.getElementById('regEmail').value;
    const phone = document.getElementById('regPhone').value;
    const password = document.getElementById('regPassword').value;
    const confirmPassword = document.getElementById('regConfirmPassword').value;
    
    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }
    
    if (users.find(u => u.email === email)) {
        alert('Email already registered!');
        return;
    }
    
    const newUser = {
        id: users.length + 1,
        firstName,
        lastName,
        email,
        phone,
        password,
        balance: 0,
        role: 'customer',
        status: 'active',
        createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    saveData();
    
    alert('Registration successful! Please login.');
    closeRegisterModal();
    showLogin('customer');
}

function logout() {
    currentUser = null;
    document.getElementById('customerDashboard').classList.remove('active');
    document.getElementById('adminDashboard').classList.remove('active');
    document.getElementById('coverPage').classList.add('active');
}

function showDashboard() {
    document.getElementById('coverPage').classList.remove('active');
    
    if (currentUser.role === 'admin') {
        document.getElementById('adminDashboard').classList.add('active');
        loadAdminDashboard();
    } else {
        document.getElementById('customerDashboard').classList.add('active');
        loadCustomerDashboard();
    }
}

// Customer Dashboard functions
function loadCustomerDashboard() {
    const user = users.find(u => u.id === currentUser.id);
    
    // Update customer info
    document.getElementById('customerName').textContent = `${user.firstName} ${user.lastName}`;
    document.getElementById('customerBalance').textContent = formatBalance(user.balance);
    
    // Update stats
    const userTransactions = transactions.filter(t => t.userId === currentUser.id);
    const totalCredit = userTransactions.filter(t => t.type === 'credit').reduce((sum, t) => sum + t.amount, 0);
    const totalDebit = userTransactions.filter(t => t.type === 'debit').reduce((sum, t) => sum + t.amount, 0);
    
    document.getElementById('totalCredit').textContent = formatBalance(totalCredit);
    document.getElementById('totalDebit').textContent = formatBalance(totalDebit);
    document.getElementById('transactionCount').textContent = userTransactions.length;
    
    // Load recent transactions
    loadRecentTransactions(userTransactions);
    loadCreditDebitTransactions(userTransactions);
    loadProfile(user);
}

function formatBalance(amount) {
    return parseFloat(amount).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

function loadRecentTransactions(userTransactions) {
    const recentTbody = document.getElementById('recentTransactions');
    const allTbody = document.getElementById('allTransactions');
    
    const recent = userTransactions.slice(-5).reverse();
    const all = userTransactions.reverse();
    
    recentTbody.innerHTML = recent.map(t => createTransactionRow(t)).join('');
    allTbody.innerHTML = all.map(t => createTransactionRow(t, true)).join('');
}

function createTransactionRow(t, showActions = false) {
    const statusClass = t.status === 'completed' ? 'badge-success' : 'badge-warning';
    const typeClass = t.type === 'credit' ? 'badge-success' : (t.type === 'debit' ? 'badge-warning' : 'badge-error');
    
    let actionsHtml = '';
    if (showActions && (t.type === 'credit' || t.type === 'debit')) {
        actionsHtml = `
            <button class="btn btn-secondary btn-small" onclick="showEditTransactionModal(${t.id})">Edit</button>
            <button class="btn btn-danger btn-small" onclick="deleteTransaction(${t.id})">Delete</button>
        `;
    }
    
    return `
        <tr>
            <td>${formatDate(t.date)}</td>
            <td>${t.description}</td>
            <td><span class="badge ${typeClass}">${t.type.toUpperCase()}</span></td>
            <td>$${formatBalance(t.amount)}</td>
            <td><span class="badge ${statusClass}">${t.status}</span></td>
            ${showActions ? `<td>${actionsHtml}</td>` : ''}
        </tr>
    `;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

function loadCreditDebitTransactions(userTransactions) {
    const tbody = document.getElementById('creditDebitTransactions');
    const creditDebit = userTransactions.filter(t => t.type === 'credit' || t.type === 'debit');
    
    tbody.innerHTML = creditDebit.map(t => createTransactionRow(t, true)).join('');
}

function loadProfile(user) {
    document.getElementById('profileDetails').innerHTML = `
        <div class="form-row">
            <div class="form-group">
                <label class="form-label">Full Name</label>
                <input type="text" class="form-control" value="${user.firstName} ${user.lastName}" disabled>
            </div>
            <div class="form-group">
                <label class="form-label">Email</label>
                <input type="email" class="form-control" value="${user.email}" disabled>
            </div>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label class="form-label">Phone</label>
                <input type="tel" class="form-control" value="${user.phone}" disabled>
            </div>
            <div class="form-group">
                <label class="form-label">Account Number</label>
                <input type="text" class="form-control" value="GB${String(user.id).padStart(8, '0')}" disabled>
            </div>
        </div>
        <div class="form-group">
            <label class="form-label">Account Balance</label>
            <input type="text" class="form-control" value="$${formatBalance(user.balance)}" disabled>
        </div>
        <div class="form-group">
            <label class="form-label">Account Status</label>
            <input type="text" class="form-control" value="${user.status}" disabled>
        </div>
    `;
}

function showCustomerSection(section) {
    // Update nav items
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    event.target.classList.add('active');
    
    // Hide all sections
    document.querySelectorAll('#customerDashboard .content-section').forEach(sec => sec.classList.remove('active'));
    
    // Show selected section
    document.getElementById(`customer${section.charAt(0).toUpperCase() + section.slice(1)}`).classList.add('active');
}

// Transaction functions
function handleTransfer(e) {
    e.preventDefault();
    
    const accountNumber = document.getElementById('transferAccount').value;
    const name = document.getElementById('transferName').value;
    const amount = parseFloat(document.getElementById('transferAmount').value);
    const description = document.getElementById('transferDescription').value || `Transfer to ${name}`;
    
    const user = users.find(u => u.id === currentUser.id);
    
    if (amount > user.balance) {
        alert('Insufficient balance!');
        return;
    }
    
    // Create transaction
    const transaction = {
        id: transactions.length + 1,
        userId: currentUser.id,
        type: 'transfer',
        amount,
        description,
        status: 'completed',
        date: new Date().toISOString()
    };
    
    // Update user balance
    user.balance -= amount;
    
    transactions.push(transaction);
    saveData();
    
    alert('Transfer successful!');
    document.getElementById('transferForm').reset();
    loadCustomerDashboard();
}

function handleWithdraw(e) {
    e.preventDefault();
    
    const bankType = document.getElementById('withdrawBankType').value;
    const bank = document.getElementById('withdrawBank').value;
    const accountNumber = document.getElementById('withdrawAccount').value;
    const accountName = document.getElementById('withdrawAccountName').value;
    const amount = parseFloat(document.getElementById('withdrawAmount').value);
    
    const user = users.find(u => u.id === currentUser.id);
    
    if (amount > user.balance) {
        alert('Insufficient balance!');
        return;
    }
    
    const fee = amount * 0.005; // 0.5% withdrawal fee
    const totalAmount = amount + fee;
    
    if (totalAmount > user.balance) {
        alert('Insufficient balance including withdrawal fee!');
        return;
    }
    
    const description = `Withdrawal to ${bank} (${accountNumber})`;
    
    const transaction = {
        id: transactions.length + 1,
        userId: currentUser.id,
        type: 'withdraw',
        amount: totalAmount,
        description,
        status: 'completed',
        bank,
        bankType,
        accountNumber,
        accountName,
        date: new Date().toISOString()
    };
    
    user.balance -= totalAmount;
    transactions.push(transaction);
    saveData();
    
    alert(`Withdrawal successful! Fee: $${formatBalance(fee)}`);
    document.getElementById('withdrawForm').reset();
    loadCustomerDashboard();
}

function updateBankOptions() {
    const bankType = document.getElementById('withdrawBankType').value;
    const bankSelect = document.getElementById('withdrawBank');
    
    bankSelect.innerHTML = '<option value="">Select bank</option>';
    
    const banks = bankType === 'microfinance' ? microfinanceBanks : 
                   bankType === 'commercial' ? commercialBanks : [];
    
    banks.forEach(bank => {
        const option = document.createElement('option');
        option.value = bank;
        option.textContent = bank;
        bankSelect.appendChild(option);
    });
}

// Credit/Debit functions
function showCreditModal(type) {
    document.getElementById('creditType').value = type;
    document.getElementById('creditModalTitle').textContent = type === 'credit' ? 'Add Credit' : 'Add Debit';
    document.getElementById('creditModal').classList.add('active');
}

function closeCreditModal() {
    document.getElementById('creditModal').classList.remove('active');
    document.getElementById('creditForm').reset();
}

function handleCredit(e) {
    e.preventDefault();
    
    const type = document.getElementById('creditType').value;
    const amount = parseFloat(document.getElementById('creditAmount').value);
    const description = document.getElementById('creditDescription').value || (type === 'credit' ? 'Credit deposit' : 'Debit payment');
    
    const user = users.find(u => u.id === currentUser.id);
    
    if (type === 'debit' && amount > user.balance) {
        alert('Insufficient balance!');
        return;
    }
    
    const transaction = {
        id: transactions.length + 1,
        userId: currentUser.id,
        type,
        amount,
        description,
        status: 'completed',
        date: new Date().toISOString()
    };
    
    if (type === 'credit') {
        user.balance += amount;
    } else {
        user.balance -= amount;
    }
    
    transactions.push(transaction);
    saveData();
    
    alert(`${type.charAt(0).toUpperCase() + type.slice(1)} successful!`);
    closeCreditModal();
    loadCustomerDashboard();
}

function showEditTransactionModal(transactionId) {
    const transaction = transactions.find(t => t.id === transactionId);
    
    if (!transaction) return;
    
    document.getElementById('editTransactionId').value = transaction.id;
    document.getElementById('editAmount').value = transaction.amount;
    document.getElementById('editDescription').value = transaction.description;
    document.getElementById('editTransactionModal').classList.add('active');
}

function closeEditTransactionModal() {
    document.getElementById('editTransactionModal').classList.remove('active');
    document.getElementById('editTransactionForm').reset();
}

function handleEditTransaction(e) {
    e.preventDefault();
    
    const transactionId = parseInt(document.getElementById('editTransactionId').value);
    const newAmount = parseFloat(document.getElementById('editAmount').value);
    const newDescription = document.getElementById('editDescription').value;
    
    const transaction = transactions.find(t => t.id === transactionId);
    
    if (!transaction) return;
    
    // Calculate balance difference
    const user = users.find(u => u.id === transaction.userId);
    const oldAmount = transaction.amount;
    const difference = newAmount - oldAmount;
    
    // Update balance
    if (transaction.type === 'credit') {
        user.balance += difference;
    } else if (transaction.type === 'debit') {
        user.balance -= difference;
    }
    
    // Update transaction
    transaction.amount = newAmount;
    transaction.description = newDescription;
    
    saveData();
    
    alert('Transaction updated successfully!');
    closeEditTransactionModal();
    loadCustomerDashboard();
}

function deleteTransaction(transactionId) {
    if (!confirm('Are you sure you want to delete this transaction?')) return;
    
    const transactionIndex = transactions.findIndex(t => t.id === transactionId);
    
    if (transactionIndex === -1) return;
    
    const transaction = transactions[transactionIndex];
    const user = users.find(u => u.id === transaction.userId);
    
    // Reverse balance
    if (transaction.type === 'credit') {
        user.balance -= transaction.amount;
    } else if (transaction.type === 'debit') {
        user.balance += transaction.amount;
    }
    
    transactions.splice(transactionIndex, 1);
    saveData();
    
    alert('Transaction deleted successfully!');
    loadCustomerDashboard();
}

// Profile functions
function showEditProfileModal() {
    const user = users.find(u => u.id === currentUser.id);
    
    document.getElementById('editFirstName').value = user.firstName;
    document.getElementById('editLastName').value = user.lastName;
    document.getElementById('editEmail').value = user.email;
    document.getElementById('editPhone').value = user.phone;
    
    document.getElementById('editProfileModal').classList.add('active');
}

function closeEditProfileModal() {
    document.getElementById('editProfileModal').classList.remove('active');
    document.getElementById('editProfileForm').reset();
}

function handleEditProfile(e) {
    e.preventDefault();
    
    const firstName = document.getElementById('editFirstName').value;
    const lastName = document.getElementById('editLastName').value;
    const email = document.getElementById('editEmail').value;
    const phone = document.getElementById('editPhone').value;
    
    const user = users.find(u => u.id === currentUser.id);
    
    // Check if email is taken by another user
    const emailTaken = users.find(u => u.email === email && u.id !== currentUser.id);
    if (emailTaken) {
        alert('Email already in use by another user!');
        return;
    }
    
    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.phone = phone;
    
    currentUser = user;
    saveData();
    
    alert('Profile updated successfully!');
    closeEditProfileModal();
    loadCustomerDashboard();
}

function exportTransactions() {
    const userTransactions = transactions.filter(t => t.userId === currentUser.id);
    
    let csv = 'Date,Description,Type,Amount,Status\n';
    userTransactions.forEach(t => {
        csv += `${formatDate(t.date)},${t.description},${t.type},${t.amount},${t.status}\n`;
    });
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `transactions_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
}

// Admin Dashboard functions
function loadAdminDashboard() {
    loadAdminOverview();
    loadUserList();
    loadAdminTransactions();
    loadAdminReports();
}

function showAdminSection(section) {
    // Update nav items
    document.querySelectorAll('#adminDashboard .nav-item').forEach(item => item.classList.remove('active'));
    event.target.classList.add('active');
    
    // Hide all sections
    document.querySelectorAll('#adminDashboard .content-section').forEach(sec => sec.classList.remove('active'));
    
    // Show selected section
    document.getElementById(`admin${section.charAt(0).toUpperCase() + section.slice(1)}`).classList.add('active');
}

function loadAdminOverview() {
    document.getElementById('totalUsers').textContent = users.filter(u => u.role === 'customer').length;
    document.getElementById('totalTransactions').textContent = transactions.length;
    document.getElementById('totalVolume').textContent = '$' + formatBalance(transactions.reduce((sum, t) => sum + t.amount, 0));
    document.getElementById('pendingApprovals').textContent = '0';
    
    // Load recent activities
    const recentActivities = transactions.slice(-5).reverse();
    document.getElementById('recentActivities').innerHTML = recentActivities.map(t => {
        const user = users.find(u => u.id === t.userId);
        return `
            <tr>
                <td>${formatDate(t.date)}</td>
                <td>${user ? `${user.firstName} ${user.lastName}` : 'Unknown'}</td>
                <td>${t.type.toUpperCase()}</td>
                <td>$${formatBalance(t.amount)} - ${t.description}</td>
            </tr>
        `;
    }).join('');
}

function loadUserList() {
    const customers = users.filter(u => u.role === 'customer');
    
    document.getElementById('userList').innerHTML = customers.map(u => {
        const statusClass = u.status === 'active' ? 'badge-success' : 'badge-error';
        return `
            <tr>
                <td>GB${String(u.id).padStart(8, '0')}</td>
                <td>${u.firstName} ${u.lastName}</td>
                <td>${u.email}</td>
                <td>$${formatBalance(u.balance)}</td>
                <td><span class="badge ${statusClass}">${u.status}</span></td>
                <td>
                    <button class="btn btn-secondary btn-small" onclick="adminViewUser(${u.id})">View</button>
                    <button class="btn btn-primary btn-small" onclick="adminEditCustomer(${u.id})">Edit</button>
                    <button class="btn btn-success btn-small" onclick="adminCreditCustomer(${u.id}, 'credit')">Credit</button>
                    <button class="btn btn-warning btn-small" onclick="adminCreditCustomer(${u.id}, 'debit')">Debit</button>
                    <button class="btn btn-danger btn-small" onclick="adminDeleteUser(${u.id})">Delete</button>
                </td>
            </tr>
        `;
    }).join('');
}

function loadAdminTransactions(filter = 'all') {
    let filteredTransactions = transactions;
    
    if (filter !== 'all') {
        filteredTransactions = transactions.filter(t => t.type === filter);
    }
    
    document.getElementById('adminTransactionList').innerHTML = filteredTransactions.slice().reverse().map(t => {
        const user = users.find(u => u.id === t.userId);
        const statusClass = t.status === 'completed' ? 'badge-success' : 'badge-warning';
        const typeClass = t.type === 'credit' ? 'badge-success' : (t.type === 'debit' ? 'badge-warning' : 'badge-error');
        
        return `
            <tr>
                <td>${formatDate(t.date)}</td>
                <td>${user ? `${user.firstName} ${user.lastName}` : 'Unknown'}</td>
                <td><span class="badge ${typeClass}">${t.type.toUpperCase()}</span></td>
                <td>$${formatBalance(t.amount)}</td>
                <td><span class="badge ${statusClass}">${t.status}</span></td>
                <td>
                    <button class="btn btn-secondary btn-small" onclick="adminViewTransaction(${t.id})">View</button>
                </td>
            </tr>
        `;
    }).join('');
}

function filterTransactions(filter) {
    loadAdminTransactions(filter);
}

function loadAdminReports() {
    const totalCredit = transactions.filter(t => t.type === 'credit').reduce((sum, t) => sum + t.amount, 0);
    const totalDebit = transactions.filter(t => t.type === 'debit').reduce((sum, t) => sum + t.amount, 0);
    const totalTransfers = transactions.filter(t => t.type === 'transfer').reduce((sum, t) => sum + t.amount, 0);
    const totalWithdrawals = transactions.filter(t => t.type === 'withdraw').reduce((sum, t) => sum + t.amount, 0);
    
    document.getElementById('reportTotalCredit').textContent = '$' + formatBalance(totalCredit);
    document.getElementById('reportTotalDebit').textContent = '$' + formatBalance(totalDebit);
    document.getElementById('reportTransfers').textContent = '$' + formatBalance(totalTransfers);
    document.getElementById('reportWithdrawals').textContent = '$' + formatBalance(totalWithdrawals);
}

function generateReport() {
    let report = 'GLOBAL BANK - TRANSACTION REPORT\n';
    report += '===============================\n\n';
    report += `Generated: ${new Date().toLocaleString()}\n\n`;
    
    report += 'SUMMARY\n';
    report += '-------\n';
    report += `Total Users: ${users.filter(u => u.role === 'customer').length}\n`;
    report += `Total Transactions: ${transactions.length}\n`;
    report += `Total Volume: $${formatBalance(transactions.reduce((sum, t) => sum + t.amount, 0))}\n\n`;
    
    report += 'TRANSACTION BREAKDOWN\n';
    report += '--------------------\n';
    report += `Total Credits: $${formatBalance(transactions.filter(t => t.type === 'credit').reduce((sum, t) => sum + t.amount, 0))}\n`;
    report += `Total Debits: $${formatBalance(transactions.filter(t => t.type === 'debit').reduce((sum, t) => sum + t.amount, 0))}\n`;
    report += `Total Transfers: $${formatBalance(transactions.filter(t => t.type === 'transfer').reduce((sum, t) => sum + t.amount, 0))}\n`;
    report += `Total Withdrawals: $${formatBalance(transactions.filter(t => t.type === 'withdraw').reduce((sum, t) => sum + t.amount, 0))}\n\n`;
    
    const blob = new Blob([report], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `report_${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    window.URL.revokeObjectURL(url);
}

function adminViewUser(userId) {
    const user = users.find(u => u.id === userId);
    
    if (!user) return;
    
    alert(`User Details:\n\nName: ${user.firstName} ${user.lastName}\nEmail: ${user.email}\nPhone: ${user.phone}\nBalance: $${formatBalance(user.balance)}\nStatus: ${user.status}\nAccount Number: GB${String(user.id).padStart(8, '0')}`);
}

function adminDeleteUser(userId) {
    if (!confirm('Are you sure you want to delete this user?')) return;
    
    const userIndex = users.findIndex(u => u.id === userId);
    
    if (userIndex === -1) return;
    
    users.splice(userIndex, 1);
    saveData();
    
    alert('User deleted successfully!');
    loadUserList();
    loadAdminOverview();
}

function adminViewTransaction(transactionId) {
    const transaction = transactions.find(t => t.id === transactionId);
    const user = users.find(u => u.id === transaction.userId);
    
    if (!transaction) return;
    
    let details = `Transaction Details:\n\n`;
    details += `Date: ${formatDate(transaction.date)}\n`;
    details += `Type: ${transaction.type.toUpperCase()}\n`;
    details += `Amount: $${formatBalance(transaction.amount)}\n`;
    details += `Description: ${transaction.description}\n`;
    details += `Status: ${transaction.status}\n`;
    details += `User: ${user ? `${user.firstName} ${user.lastName}` : 'Unknown'}\n`;
    
    if (transaction.bank) {
        details += `Bank: ${transaction.bank}\n`;
        details += `Account: ${transaction.accountNumber}\n`;
    }
    
    alert(details);
}

function handleSettings(e) {
    e.preventDefault();
    
    alert('Settings saved successfully!');
}

// Admin Customer Management Functions

function showRegisterCustomerModal() {
    document.getElementById('registerCustomerModal').classList.add('active');
}

function closeRegisterCustomerModal() {
    document.getElementById('registerCustomerModal').classList.remove('active');
    document.getElementById('adminRegisterCustomerForm').reset();
}

function handleAdminRegisterCustomer(e) {
    e.preventDefault();
    
    const firstName = document.getElementById('adminRegFirstName').value;
    const lastName = document.getElementById('adminRegLastName').value;
    const email = document.getElementById('adminRegEmail').value;
    const phone = document.getElementById('adminRegPhone').value;
    const password = document.getElementById('adminRegPassword').value;
    const balance = parseFloat(document.getElementById('adminRegBalance').value) || 0;
    
    // Check if email already exists
    if (users.find(u => u.email === email)) {
        alert('Email already registered!');
        return;
    }
    
    const newUser = {
        id: users.length + 1,
        firstName,
        lastName,
        email,
        phone,
        password,
        balance,
        role: 'customer',
        status: 'active',
        createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    saveData();
    
    alert('Customer account created successfully!');
    closeRegisterCustomerModal();
    loadUserList();
    loadAdminOverview();
}

function adminEditCustomer(userId) {
    const user = users.find(u => u.id === userId);
    
    if (!user) return;
    
    document.getElementById('adminEditCustomerId').value = user.id;
    document.getElementById('adminEditFirstName').value = user.firstName;
    document.getElementById('adminEditLastName').value = user.lastName;
    document.getElementById('adminEditEmail').value = user.email;
    document.getElementById('adminEditPhone').value = user.phone;
    document.getElementById('adminEditBalance').value = user.balance;
    document.getElementById('adminEditStatus').value = user.status;
    
    document.getElementById('adminEditCustomerModal').classList.add('active');
}

function closeAdminEditCustomerModal() {
    document.getElementById('adminEditCustomerModal').classList.remove('active');
    document.getElementById('adminEditCustomerForm').reset();
}

function handleAdminEditCustomer(e) {
    e.preventDefault();
    
    const userId = parseInt(document.getElementById('adminEditCustomerId').value);
    const firstName = document.getElementById('adminEditFirstName').value;
    const lastName = document.getElementById('adminEditLastName').value;
    const email = document.getElementById('adminEditEmail').value;
    const phone = document.getElementById('adminEditPhone').value;
    const balance = parseFloat(document.getElementById('adminEditBalance').value);
    const status = document.getElementById('adminEditStatus').value;
    
    const user = users.find(u => u.id === userId);
    
    if (!user) return;
    
    // Check if email is taken by another user
    const emailTaken = users.find(u => u.email === email && u.id !== userId);
    if (emailTaken) {
        alert('Email already in use by another user!');
        return;
    }
    
    // Create balance adjustment transaction if balance changed
    if (balance !== user.balance) {
        const difference = balance - user.balance;
        const transaction = {
            id: transactions.length + 1,
            userId: user.id,
            type: difference > 0 ? 'credit' : 'debit',
            amount: Math.abs(difference),
            description: `Balance adjustment by admin - ${difference > 0 ? 'Increase' : 'Decrease'}`,
            status: 'completed',
            date: new Date().toISOString()
        };
        
        transactions.push(transaction);
    }
    
    // Update user details
    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.phone = phone;
    user.balance = balance;
    user.status = status;
    
    saveData();
    
    alert('Customer account updated successfully!');
    closeAdminEditCustomerModal();
    loadUserList();
    loadAdminOverview();
}

function adminCreditCustomer(userId, type) {
    const user = users.find(u => u.id === userId);
    
    if (!user) return;
    
    document.getElementById('adminCreditCustomerId').value = user.id;
    document.getElementById('adminCreditType').value = type;
    document.getElementById('adminCreditCustomerName').value = `${user.firstName} ${user.lastName}`;
    document.getElementById('adminCreditCurrentBalance').value = `$${formatBalance(user.balance)}`;
    document.getElementById('adminCreditModalTitle').textContent = type === 'credit' ? 'Add Credit to Customer' : 'Add Debit to Customer';
    document.getElementById('adminCreditAmount').value = '';
    document.getElementById('adminCreditDescription').value = '';
    
    document.getElementById('adminCustomerCreditModal').classList.add('active');
}

function closeAdminCustomerCreditModal() {
    document.getElementById('adminCustomerCreditModal').classList.remove('active');
    document.getElementById('adminCustomerCreditForm').reset();
}

function handleAdminCustomerCredit(e) {
    e.preventDefault();
    
    const userId = parseInt(document.getElementById('adminCreditCustomerId').value);
    const type = document.getElementById('adminCreditType').value;
    const amount = parseFloat(document.getElementById('adminCreditAmount').value);
    const description = document.getElementById('adminCreditDescription').value || (type === 'credit' ? 'Admin credit deposit' : 'Admin debit payment');
    
    const user = users.find(u => u.id === userId);
    
    if (!user) return;
    
    // Check balance for debit
    if (type === 'debit' && amount > user.balance) {
        alert('Insufficient balance for this debit transaction!');
        return;
    }
    
    // Create transaction
    const transaction = {
        id: transactions.length + 1,
        userId: user.id,
        type,
        amount,
        description: `${description} (by admin)`,
        status: 'completed',
        date: new Date().toISOString()
    };
    
    // Update user balance
    if (type === 'credit') {
        user.balance += amount;
    } else {
        user.balance -= amount;
    }
    
    transactions.push(transaction);
    saveData();
    
    alert(`${type.charAt(0).toUpperCase() + type.slice(1)} transaction processed successfully!`);
    closeAdminCustomerCreditModal();
    loadUserList();
    loadAdminOverview();
}