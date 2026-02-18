# Support Ticket System - Backend

This is the backend of the Support Ticket System, built with **Express** and **Prisma**.

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- PostgreSQL Database
- Google Gemini API Key

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure environment variables in `.env`:
   ```env
   DATABASE_URL="your_postgresql_url"
   GEMINI_API_KEY="your_gemini_api_key"
   PORT=5000
   ```

3. Generate Prisma client:
   ```bash
   npx prisma generate
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

## 🛣️ API Endpoints

- `GET /api/tickets`: List all tickets (supports filtering).
- `POST /api/tickets`: Create a new ticket.
- `PUT /api/tickets/:id`: Update a ticket's status.
- `GET /api/tickets/stats`: Get ticket overview statistics.
- `POST /api/tickets/classify`: Suggest category and priority based on description (AI-powered).

## 🛠️ Tech Stack

- **Express.js**: Web framework.
- **Prisma**: ORM for PostgreSQL.
- **Google Generative AI**: Gemini 1.5 Flash for ticket classification.
- **PostgreSQL**: Relational database.
