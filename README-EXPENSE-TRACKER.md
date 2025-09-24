# Folded - Personal Expense Tracker PWA

A beautiful, progressive web app for managing your personal finances built with Next.js and Supabase.

## Features

- 📱 **Progressive Web App (PWA)** - Install on your device and use offline
- 💰 **Transaction Management** - Track income and expenses with detailed descriptions
- 📊 **Monthly Statistics** - View monthly and overall financial summaries
- 🔐 **Secure Authentication** - User authentication with Supabase Auth
- 🎨 **Beautiful UI** - Modern, responsive design with dark/light mode
- 📅 **Date-based Organization** - View transactions by month
- 💎 **Real-time Updates** - Live data synchronization

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Backend**: Supabase (PostgreSQL database, Auth, Real-time)
- **Styling**: Tailwind CSS, Radix UI components
- **PWA**: next-pwa for offline functionality

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account

### Setup

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd folded
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Supabase**
   - Create a new project at [supabase.com](https://supabase.com)
   - Copy your project URL and anon key
   - Create a `.env.local` file:
     ```env
     NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
     NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
     ```

4. **Set up the database**
   - Go to your Supabase project dashboard
   - Navigate to the SQL Editor
   - Run the SQL from `supabase/schema.sql` to create the transactions table

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open the app**
   - Visit [http://localhost:3000](http://localhost:3000)
   - Sign up for an account
   - Start tracking your expenses!

## Database Schema

The app uses a simple `transactions` table with the following structure:

```sql
- id (UUID, Primary Key)
- user_id (UUID, Foreign Key to auth.users)
- type (VARCHAR: 'income' or 'expense')
- amount (DECIMAL: positive number)
- description (TEXT: transaction description)
- date (DATE: transaction date)
- created_at (TIMESTAMP: when record was created)
- updated_at (TIMESTAMP: when record was last updated)
```

## PWA Installation

The app can be installed as a PWA on supported devices:

1. **Desktop**: Look for the install button in your browser's address bar
2. **Mobile**: Use "Add to Home Screen" from your browser's menu
3. **iOS**: Tap the share button in Safari and select "Add to Home Screen"

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

If you encounter any issues or have questions, please open an issue on GitHub.