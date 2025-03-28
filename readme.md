## 🚀 Deployment

1. Set up environment variables
2. Configure database connection
3. Set up Stripe webhook endpoints
4. Deploy to your preferred platform (Vercel recommended)

## 📈 Monitoring

- Application logs available in platform dashboard
- Stripe Dashboard for payment monitoring
- Clerk Dashboard for auth monitoring

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Support

For support, email support@yourapp.com or open an issue in the repository.

├── app/
│ ├── api/ # API routes
│ │ ├── user/ # User-related endpoints
│ │ └── webhooks/ # Webhook handlers
│ ├── dashboard/ # Dashboard pages
│ └── pricing/ # Subscription pricing page
├── components/
│ ├── dashboard/ # Dashboard-specific components
│ ├── providers/ # Context providers
│ └── ui/ # Reusable UI components
├── lib/
│ ├── db/ # Database configuration
│ ├── stripe.ts # Stripe configuration
│ └── errors.ts # Error handling utilities
├── services/
│ ├── user-service.ts # User management service
│ └── subscription-service.ts # Subscription management service
└── types/ # TypeScript type definitions

## 🔧 Setup & Configuration

### Prerequisites

- Node.js 18+
- PostgreSQL
- Stripe Account
- Clerk Account

### Environment Variables

Create a `.env.local` file with:

bash

App
NEXT_PUBLIC_APP_URL=http://localhost:3000
Database
DATABASE_URL=postgresql://user:password@localhost:5432/dbname

Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key
CLERK_SECRET_KEY=your_secret_key

Stripe
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_webhook_secret
STRIPE_PRICE_ID=your_subscription_price_id

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/prompt-manager.git
cd prompt-manager
```

2. Install dependencies:
```bash
npm install
```

3. Run database migrations:
```bash
npm run db:migrate
```

4. Start the development server:
```bash
npm run dev
```

## 🔄 Core Workflows

### Authentication Flow
1. User signs in through Clerk
2. Authentication state managed by Clerk Provider
3. User data synced with database
4. User context updated with latest data

### Subscription Flow
1. User views pricing page
2. Clicks subscribe button
3. Redirected to Stripe Checkout
4. Webhook processes successful payment
5. User gains access to premium features

### Data Management
- Server-side data fetching with Next.js
- Real-time subscription status updates
- Optimistic UI updates for better UX

## 🛠️ Development Patterns

### Service Pattern
Services handle business logic and external service interactions:
```typescript
export class UserService {
  static async getUserById(userId: string) {
    // Implementation
  }
}
```

### Error Handling
Centralized error handling with custom error classes:
```typescript
export class AppError extends Error {
  constructor(message: string, statusCode: number, code: string) {
    super(message);
  }
}
```

### State Management
React Context for global state:
```typescript
export const UserProvider = ({ children }) => {
  // Implementation
};
```

## 📚 API Documentation

### User Endpoints

`GET /api/user`
- Returns current user data with subscription status

### Webhook Endpoints

`POST /api/webhooks/stripe`
- Handles Stripe webhook events
- Updates user subscription status

## 🧪 Testing

```bash
# Run unit tests
npm run test

# Run integration tests
npm run test:integration

# Run e2e tests
npm run test:e2e
```

## 🚀 Deployment

1. Set up environment variables
2. Configure database connection
3. Set up Stripe webhook endpoints
4. Deploy to your preferred platform (Vercel recommended)

## 📈 Monitoring

- Application logs available in platform dashboard
- Stripe Dashboard for payment monitoring
- Clerk Dashboard for auth monitoring

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Support

For support, email support@yourapp.com or open an issue in the repository.