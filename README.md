# Global Bank - Modern Web Banking Application

A complete web-based banking application converted from an APK, featuring customer and admin dashboards with full transaction management capabilities.

**Owner: Olawale Abdul-Ganiyu**

## Features

### Cover Page
- **Global Bank branding** - Only appears on the cover page as requested
- Clean, modern landing page design
- Customer and Admin login options
- Professional banking interface

### Customer Dashboard
- **Account Overview** - View balance, total credits/debits, transaction count
- **Transaction History** - Complete record of all transactions
- **Money Transfer** - Send money to other accounts
- **Withdrawal System** - Withdraw to microfinance and commercial banks
- **Credit/Debit Management** - Add and edit credit/debit transactions
- **Profile Management** - View and edit user profile
- **Export Transactions** - Download transaction history as CSV

### Admin Dashboard
- **Overview Statistics** - Total users, transactions, volume, pending approvals
- **Customer Registration** - Register new customer accounts directly
- **User Management** - View, edit, update, and delete customer accounts
- **Account Balance Management** - Adjust customer balances
- **Credit/Debit Management** - Add credit or debit to customer accounts
- **Transaction Monitoring** - Monitor all transactions across the system
- **Reports & Analytics** - Generate detailed financial reports
- **System Settings** - Configure bank parameters

## Supported Banks

### Microfinance Banks
- Finca Microfinance Bank
- LAPO Microfinance Bank
- Access Microfinance Bank
- Fortis Microfinance Bank
- Mintfin Microfinance Bank
- Bowe Microfinance Bank
- Grooming Microfinance Bank

### Commercial Banks
- First Bank of Nigeria
- Access Bank
- Guaranty Trust Bank
- Zenith Bank
- United Bank for Africa
- Wema Bank
- Sterling Bank
- Fidelity Bank
- Union Bank
- Ecobank Nigeria

## Installation & Usage

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No server required - runs entirely in the browser

### New Admin Features (Just Added!)
The admin dashboard now includes powerful customer management tools:

1. **Register Customers** - Admin can create new customer accounts with:
   - Full name, email, phone number
   - Initial account balance
   - Auto-generated account number

2. **Edit Customer Accounts** - Admin can modify customer details:
   - Update personal information
   - Adjust account balance
   - Change account status (Active/Inactive/Suspended)

3. **Credit/Debit Management** - Admin can perform transactions:
   - Add credit to customer accounts
   - Add debit to customer accounts
   - Automatic balance updates
   - Transaction history tracking

4. **Enhanced User Management** - Complete control over all customers:
   - View detailed customer information
   - Edit customer profiles
   - Process credit/debit transactions
   - Delete customer accounts

### Getting Started

1. **Open the Application**
   - Simply open `index.html` in any modern web browser
   - No installation or setup required

2. **Customer Login**
   - Click "Customer Login" on the cover page
   - Use default credentials or register a new account
   - Default customer: `john@example.com` / `password123`

3. **Admin Login**
   - Click "Admin Login" on the cover page
   - Default admin: `admin@globalbank.com` / `admin123`

4. **Register New Account**
   - Click "Don't have an account? Register" on the login modal
   - Fill in the registration form
   - Login with your new credentials

## Key Features Detail

### Admin Customer Management (NEW!)

The admin dashboard now provides comprehensive customer management capabilities:

#### Register New Customers
- Click "Register Customer" in User Management
- Fill in customer details (name, email, phone, password)
- Set initial account balance (optional)
- Account automatically created with unique account number

#### Edit Customer Accounts
- Click "Edit" button next to any customer
- Modify customer personal information
- Adjust account balance directly
- Change account status (Active/Inactive/Suspended)
- Balance changes automatically create transaction records

#### Credit/Debit Transactions
- Click "Credit" or "Debit" button for any customer
- View current customer balance
- Enter transaction amount and description
- Transactions are processed and recorded immediately
- Customer balance updates automatically

#### Customer Actions Available
- **View** - See detailed customer information
- **Edit** - Update customer details and balance
- **Credit** - Add funds to customer account
- **Debit** - Remove funds from customer account
- **Delete** - Remove customer account from system

### Credit/Debit Management
- **Add Credit**: Deposit funds into your account
- **Add Debit**: Record payments or withdrawals
- **Edit Transactions**: Modify existing credit/debit entries
- **Delete Transactions**: Remove incorrect entries
- Automatic balance updates

### Withdrawal System
- Select bank type (Microfinance or Commercial)
- Choose specific bank from dropdown
- Enter account details
- Automatic fee calculation (0.5% withdrawal fee)
- Balance validation before processing

### Transaction Editing
- Edit transaction amounts and descriptions
- Automatic balance recalculation
- Data integrity maintained
- Transaction history updated

### Data Persistence
- All data stored in browser's localStorage
- Persists across browser sessions
- No database required
- Easy to backup and restore

## File Structure

```
global-bank/
├── index.html          # Main application file
├── css/
│   └── styles.css      # Complete styling
├── js/
│   └── app.js          # Application logic
├── README.md           # This file
└── minipay.apk         # Original APK file
```

## Technical Features

- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Modern UI**: Clean, professional banking interface
- **Real-time Updates**: Instant balance and transaction updates
- **Form Validation**: Comprehensive input validation
- **Security**: Role-based access control (Customer/Admin)
- **Local Storage**: Client-side data persistence
- **Export Functionality**: Download transaction reports
- **Modal-based Interface**: User-friendly modals for all actions

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Opera

## Default Credentials

### Admin Account
- Email: `admin@globalbank.com`
- Password: `admin123`

### Customer Account
- Email: `john@example.com`
- Password: `password123`
- Initial Balance: $5,000.00

## Security Notes

- This is a demonstration application
- Data is stored locally in the browser
- Not suitable for production use without proper backend
- Passwords are stored in plain text (demo purposes only)
- For production, implement proper authentication and encryption

## Customization

### Changing Bank Lists
Edit the arrays in `js/app.js`:
```javascript
const microfinanceBanks = [...];
const commercialBanks = [...];
```

### Modifying Withdrawal Fee
Change the fee calculation in the `handleWithdraw` function:
```javascript
const fee = amount * 0.005; // Change 0.005 to desired percentage
```

### Styling
All styles are in `css/styles.css` - modify to match your brand colors and design.

## Support

For issues or questions about the application:
1. Check the browser console for errors
2. Ensure JavaScript is enabled
3. Clear browser cache if experiencing issues
4. Use a modern browser

## License

This is a demonstration project converted from an APK file for educational purposes.

## Credits

- Original APK: minipay.apk
- Web Conversion: SuperNinja AI Agent
- Design: Modern banking UI patterns