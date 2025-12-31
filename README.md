# Online Teacher Platform

A full-stack web application designed for online teaching, built with a modern technology stack featuring NestJS, Next.js, and PostgreSQL.

## 🚀 Technlogy Stack

### Backend
- **[NestJS](https://nestjs.com/)**: A progressive Node.js framework for building efficient, scalable Node.js server-side applications.
- **[Prisma](https://www.prisma.io/)**: Next-generation ORM for Node.js and TypeScript.
- **[PostgreSQL](https://www.postgresql.org/)**: Powerful, open source object-relational database system.
- **[Passport](http://www.passportjs.org/)**: Simple, unobtrusive authentication for Node.js.

### Frontend
- **[Next.js](https://nextjs.org/)**: The React Framework for the Web.
- **[React](https://reactjs.org/)**: A JavaScript library for building user interfaces.
- **[Tailwind CSS](https://tailwindcss.com/)**: A utility-first CSS framework for rapid UI development.
- **[Zustand](https://github.com/pmndrs/zustand)**: A small, fast and scalable bearbones state-management solution.
- **[Axios](https://axios-http.com/)**: Promise based HTTP client for the browser and node.js.

### Infrastructure
- **[Docker](https://www.docker.com/)**: Containerize authentication and application dependencies.

## 📋 Prerequisites

Before you begin, ensure you have the following installed on your machine:
- **[Node.js](https://nodejs.org/)** (v16 or higher recommended)
- **[npm](https://www.npmjs.com/)** (usually comes with Node.js)
- **[Docker](https://www.docker.com/products/docker-desktop)** & **Docker Compose**

## 🛠️ Getting Started

Follow these steps to set up and run the project locally.

### 1. Database Setup
Start the PostgreSQL database using Docker Compose:

```bash
docker-compose up -d
```

This will start a PostgreSQL container on port `5432` with the following credentials (defined in `docker-compose.yml`):
- **User**: `user`
- **Password**: `password`
- **Database**: `online_teacher`

### 2. Backend Setup

Navigate to the backend directory:
```bash
cd backend
```

Install dependencies:
```bash
npm install
```

Create a `.env` file in the `backend` directory and configure the database connection:
```env
# backend/.env
DATABASE_URL="postgresql://user:password@localhost:5432/online_teacher?schema=public"
JWT_SECRET="your_super_secret_key" # Replace with a secure secret
PORT=3000
```

Run database migrations to set up the schema:
```bash
npx prisma migrate dev
```

Start the backend server:
```bash
npm run start:dev
```
The backend API will be running at `http://localhost:3000`.

### 3. Frontend Setup

Open a new terminal and navigate to the frontend directory:
```bash
cd frontend
```

Install dependencies:
```bash
npm install
```

Start the frontend development server:
```bash
npm run dev
```

The frontend application will be running at `http://localhost:3001` (if port 3000 is taken by the backend).

## 📂 Project Structure

```
onlineteacher/
├── backend/            # NestJS Backend Application
│   ├── src/            # Source code
│   ├── prisma/         # Prisma schema and migrations
│   └── test/           # Tests
├── frontend/           # Next.js Frontend Application
│   ├── app/            # App Router pages and layouts
│   ├── components/     # Reusable UI components
│   ├── lib/            # Utilities (Axios, etc.)
│   ├── services/       # API services
│   └── store/          # Zustand state management
└── docker-compose.yml  # Docker services configuration
```

## 📝 Usage

- **API Documentation**: Once the backend is running, you can access the API endpoints at `http://localhost:3000`.
- **Frontend Interface**: Access the user interface at `http://localhost:3001` (or the port shown in your terminal).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.
