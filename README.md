# FinSight - Financial Analytics Dashboard

A modern, responsive financial analytics dashboard built with React, TypeScript, and Node.js. FinSight provides comprehensive financial tracking, analytics, and reporting capabilities for individuals and businesses.

![FinSight Dashboard](https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&dpr=1)

## 🚀 Features

### 📊 Dashboard & Analytics
- **Real-time Financial Overview**: Track total revenue, expenses, net profit, and transaction count
- **Interactive Charts**: Revenue vs expenses line chart and category breakdown pie chart
- **Monthly Trends**: Visualize financial performance over time
- **Key Performance Indicators**: Growth metrics and profit margins

### 💳 Transaction Management
- **CRUD Operations**: Create, read, update, and delete transactions
- **Advanced Filtering**: Filter by date range, category, status, and search terms
- **Bulk Operations**: Export transactions to CSV format
- **Transaction Categories**: Organize transactions by type (Software, Marketing, Consulting, etc.)
- **Status Tracking**: Monitor payment status (Paid, Pending, Failed)

### 📈 Analytics & Reporting
- **Detailed Analytics**: Growth metrics, profit margins, and trend analysis
- **Custom Reports**: Generate and export financial reports
- **Category Analysis**: Breakdown of spending and income by category
- **Performance Insights**: Key insights and recommendations

### 💰 Wallet Management
- **Account Overview**: View total balance across all accounts
- **Multiple Cards**: Manage multiple payment cards and accounts
- **Recent Activity**: Track recent transactions and transfers
- **Quick Actions**: Send money, request payments, and pay bills

### 🔐 Authentication & Security
- **JWT Authentication**: Secure token-based authentication
- **User Registration**: Complete user onboarding flow
- **Password Security**: Encrypted password storage with bcrypt
- **Session Management**: Secure session handling

### ⚙️ Settings & Customization
- **Profile Management**: Update personal information and avatar
- **Notification Settings**: Configure email and push notifications
- **Security Settings**: Password management and 2FA setup
- **Appearance**: Theme customization (Dark theme implemented)
- **Preferences**: Currency, date format, and language settings

## 🛠️ Technology Stack

### Frontend
- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions
- **Recharts** - Beautiful and responsive charts
- **React Hook Form** - Efficient form handling
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API requests
- **React Hot Toast** - Elegant toast notifications
- **Lucide React** - Beautiful icon library

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **Express Validator** - Input validation
- **Helmet** - Security middleware
- **CORS** - Cross-origin resource sharing
- **Rate Limiting** - API rate limiting

## 📦 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn package manager

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/finsight-dashboard.git
cd finsight-dashboard
```

### 2. Install Dependencies
```bash
# Install all dependencies (frontend and backend)
npm install
```

### 3. Environment Configuration
Create a `.env` file in the root directory:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/finsight
MONGODB_URI_PROD=mongodb+srv://username:password@cluster.mongodb.net/finsight

# JWT
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=7d

# Server
PORT=5000
NODE_ENV=development

# Frontend
VITE_API_URL=http://localhost:5000/api
```

### 4. Database Setup
Make sure MongoDB is running on your system:

```bash
# For local MongoDB
mongod

# Or use MongoDB Atlas (cloud) by updating MONGODB_URI in .env
```

### 5. Start the Application

#### Development Mode
```bash
# Start backend server (Terminal 1)
npm run server

# Start frontend development server (Terminal 2)
npm run dev
```

#### Production Mode
```bash
# Build the frontend
npm run build

# Start the production server
npm start
```

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `POST /api/auth/refresh` - Refresh JWT token

### Transactions
- `GET /api/transactions` - Get all transactions (with filtering)
- `POST /api/transactions` - Create new transaction
- `PUT /api/transactions/:id` - Update transaction
- `DELETE /api/transactions/:id` - Delete transaction

### Dashboard
- `GET /api/dashboard/summary` - Get dashboard summary data
- `GET /api/dashboard/recent-transactions` - Get recent transactions

### Users
- `PUT /api/users/profile` - Update user profile
- `GET /api/users` - Get all users (admin only)

## 📱 Features Overview

### Dashboard
- Financial summary cards with key metrics
- Interactive revenue vs expenses chart
- Category breakdown pie chart
- Recent transactions table
- Quick add transaction functionality

### Transaction Management
- Comprehensive transaction table with sorting and filtering
- Add, edit, and delete transactions
- Advanced search and filtering options
- CSV export functionality
- Transaction status management

### Analytics
- Growth metrics and trend analysis
- Category-wise spending analysis
- Profit margin calculations
- Performance insights and recommendations

### Reports
- Generate custom financial reports
- Export reports in CSV format
- Date range selection for reports
- Summary and detailed report options

### Wallet
- Multi-account balance overview
- Payment card management
- Recent activity tracking
- Quick action buttons for transfers

### Settings
- Profile management with avatar upload
- Notification preferences
- Security settings and password management
- Theme and appearance customization
- Currency and language preferences

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt with salt rounds for password security
- **Input Validation**: Comprehensive input validation using express-validator
- **Rate Limiting**: API rate limiting to prevent abuse
- **CORS Protection**: Configured CORS for secure cross-origin requests
- **Helmet Security**: Security headers with Helmet middleware
- **Environment Variables**: Sensitive data stored in environment variables

## 🎨 Design Features

- **Dark Theme**: Modern dark theme with professional aesthetics
- **Responsive Design**: Fully responsive across all device sizes
- **Smooth Animations**: Framer Motion animations for enhanced UX
- **Interactive Elements**: Hover states and micro-interactions
- **Consistent UI**: Unified design system with Tailwind CSS
- **Accessibility**: WCAG compliant color contrasts and keyboard navigation

## 📊 Data Models

### User Model
```javascript
{
  firstName: String,
  lastName: String,
  email: String (unique),
  password: String (hashed),
  avatar: String,
  role: String (user/admin),
  isActive: Boolean,
  preferences: {
    theme: String,
    currency: String,
    notifications: Object
  }
}
```

### Transaction Model
```javascript
{
  userId: ObjectId,
  type: String (income/expense),
  category: String,
  amount: Number,
  description: String,
  status: String (Paid/Pending/Failed),
  date: Date,
  tags: [String],
  attachments: [Object]
}
```

## 🚀 Deployment

### Frontend Deployment (Netlify/Vercel)
1. Build the project: `npm run build`
2. Deploy the `dist` folder to your hosting platform
3. Configure environment variables on the hosting platform

### Backend Deployment (Heroku/Railway/DigitalOcean)
1. Set up environment variables
2. Configure MongoDB connection string
3. Deploy using your preferred platform
4. Update CORS settings for production domain

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit your changes: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Pexels** for providing high-quality stock photos
- **Lucide** for the beautiful icon library
- **Tailwind CSS** for the utility-first CSS framework
- **Recharts** for the responsive chart components

## 📞 Support

For support, email support@finsight.com or join our Slack channel.

## 🔄 Version History

- **v1.0.0** - Initial release with core features
- **v1.1.0** - Added transaction management
- **v1.2.0** - Enhanced analytics and reporting
- **v1.3.0** - Wallet management features
- **v1.4.0** - Settings and customization options

---

**FinSight** - Take control of your financial future with powerful analytics and insights.