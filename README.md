# Support Ticket System

A modern, performant support ticket management system built with React and Express.

## Features

- 🎫 Create and manage support tickets
- 📊 Dashboard with analytics and trends
- 🔐 User authentication with Better Auth
- 🤖 AI-powered ticket classification
- 🌙 Dark mode support
- 📱 Responsive design

## Tech Stack

### Frontend
- React 19 with TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- React Query for state management
- Recharts for data visualization
- Framer Motion for animations

### Backend
- Express.js with Node.js
- Prisma ORM with PostgreSQL
- Better Auth for authentication
- Google Gemini AI for ticket classification
- Zod for validation

## Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL database

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   # Backend
   cd backend
   npm install
   
   # Frontend
   cd ../frontend
   npm install
   ```

3. Set up environment variables:
   ```bash
   # Backend
   cp .env.example .env
   # Edit .env with your database URL and API keys
   ```

4. Set up the database:
   ```bash
   cd backend
   npx prisma migrate dev
   npx prisma generate
   ```

5. Start the development servers:
   ```bash
   # Backend (port 5000)
   cd backend
   npm run dev
   
   # Frontend (port 5173)
   cd ../frontend
   npm run dev
   ```

## Environment Variables

### Backend (.env)
- `DATABASE_URL` - PostgreSQL connection string
- `GEMINI_API_KEY` - Google Gemini API key for AI classification
- `BETTER_AUTH_SECRET` - Secret for authentication
- `CORS_ORIGIN` - Frontend URL (default: http://localhost:5173)

## Project Structure

```
├── backend/
│   ├── src/
│   │   ├── controllers/    # Route handlers
│   │   ├── services/       # Business logic
│   │   ├── routes/         # API routes
│   │   ├── middleware/     # Express middleware
│   │   └── config/         # Configuration files
│   ├── prisma/
│   │   └── schema.prisma   # Database schema
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── features/       # Feature-specific components
│   │   ├── lib/           # Utilities and configurations
│   │   └── app/           # App setup and routing
│   └── package.json
└── README.md
```

## Scripts

### Backend
- `npm run dev` - Start development server
- `npm start` - Start production server
- `npm run prisma:studio` - Open Prisma Studio
- `npm run prisma:migrate` - Run database migrations

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Performance Optimizations

This application includes several performance optimizations:

- Database indexing for fast queries
- Code splitting and lazy loading
- Optimized React Query caching
- Efficient API response patterns
- Minimal bundle sizes

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details.
