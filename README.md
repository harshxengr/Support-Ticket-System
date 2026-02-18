# Support Ticket System with AI Classification

A full-stack support ticket management system built with **React**, **Express**, and **Prisma**. This system features automatic ticket classification (category and priority) using **Google Gemini AI**.

## 🚀 Key Features

- **Ticket Management**: Create, view, and track support tickets.
- **AI-Powered Classification**: Automatically suggests categories (billing, technical, account, general) and priorities (low, medium, high, critical) using Google Gemini AI.
- **Status Dashboard**: Real-time overview of ticket statistics (Open, In Progress, Resolved).
- **Modern UI**: Clean and responsive interface built with React.
- **Dockerized Setup**: Seamless deployment using Docker and Docker Compose.

## 🛠️ Tech Stack

- **Frontend**: React, Vite, Axios.
- **Backend**: Node.js, Express.js.
- **Database**: PostgreSQL (managed via Prisma ORM).
- **AI Implementation**: Google Generative AI (Gemini 1.5 Flash).
- **Containerization**: Docker, Docker Compose.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher)
- [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/)
- A [Google Gemini API Key](https://aistudio.google.com/app/apikey)

## ⚙️ Environment Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/harshxengr/Support-Ticket-System.git
   cd Support-Ticket-System
   ```

2. Create a `.env` file in the root directory (you can use `.env.example` as a template):
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/support_db?schema=public"
   GEMINI_API_KEY="your_gemini_api_key_here"
   PORT=5000
   ```

> [!IMPORTANT]
> When running with Docker Compose, the `DATABASE_URL` should point to the database service defined in the compose file or an external instance as per your configuration.

## 🚀 Running the Project

### Using Docker (Simplified)

The easiest way to get the system running is using Docker Compose:

```bash
docker-compose up --build
```

- **Frontend**: [http://localhost:5173](http://localhost:5173)
- **Backend API**: [http://localhost:5000](http://localhost:5000)

### Local Development

#### 1. Backend Setup
```bash
cd backend
npm install
npx prisma generate
npm run dev
```

#### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## 📁 Project Structure

```text
Support-Ticket-System/
├── backend/            # Express API with Prisma & Gemini AI
│   ├── src/
│   │   ├── controllers/# Business logic
│   │   ├── services/   # AI classification & DB services
│   │   └── routes/     # API endpoints
│   └── prisma/         # Database schema
├── frontend/           # React Application
│   └── src/
│       ├── features/   # Ticket modules & components
│       └── api/        # Axios configuration
└── docker-compose.yml  # Orchestration
```

## 🤝 Contributing

Feel free to fork this project, open issues, and submit pull requests to improve the system!

## 📄 License

This project is licensed under the ISC License.
