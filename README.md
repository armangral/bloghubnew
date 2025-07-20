# BlogHub - Modern Full-Stack Blog Platform

A professional, full-stack blog platform featuring a modern Next.js frontend and robust Node.js backend. Create, edit, and share your stories with a beautiful, responsive interface and secure authentication system.

## 🌟 Overview

BlogHub is a comprehensive blogging platform that combines a sleek Next.js frontend with a powerful Express.js backend. It offers rich text editing, user authentication, advanced search capabilities, and a responsive design that works seamlessly across all devices.

## 🎯 Key Features

### 🎨 **Modern UI/UX**

- **Smooth Animations**: Fade-in effects, hover animations, and micro-interactions throughout
- **Responsive Layout**: Optimized for mobile, tablet, and desktop devices
- **Rich Text Editor**: Powered by TipTap with formatting tools (bold, italic, headings, lists, quotes)

### 🔐 **Authentication & Security**

- **JWT Authentication**: Secure token-based authentication
- **Protected Routes**: Dashboard and post management require authentication
- **Role-Based Access**: Users can only edit/delete their own posts
- **Robust Validation**: Server-side validation using Zod

### 📝 **Content Management**

- **CRUD Operations**: Full Create, Read, Update, and Delete functionality
- **Rich HTML Content**: Compatible with rich text editors
- **Pagination & Filtering**: Efficient server-side pagination and text-based search
- **Advanced Search**: Real-time search across post titles and content

### 📊 **Dashboard & Analytics**

- **User Dashboard**: Comprehensive overview of user's posts and statistics
- **Post Management**: Create, edit, delete, and view posts
- **Centralized Error Handling**: User-friendly error management

## 🏗️ Architecture

### **Frontend (Next.js)**

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript for type safety
- **Styling**: Tailwind CSS with custom animations
- **State Management**: Zustand for lightweight state management
- **Data Fetching**: TanStack Query for server state management

### **Backend (Express.js)**

- **Runtime**: Node.js with Express.js framework
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT tokens with secure validation
- **Documentation**: Auto-generated Swagger/OpenAPI docs
- **Logging**: Winston for structured logging

## 📦 Getting Started

### **Prerequisites**

- Node.js 18+
- npm or yarn
- PostgreSQL database
- Git

### **1. Clone the Repository**

```bash
git clone https://github.com/armangral/bloghubnew
cd bloghubnew
```


## 🎨 Frontend Setup (Next.js - Port 3000)

### **Installation**

1. **Navigate to frontend directory**

```bash
cd frontend
```

2. **Install dependencies**

```bash
npm install
```

3. **Environment Configuration**
   Create a `.env.local` file in the frontend directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:5100/api/v1
```

4. **Start the development server**

```bash
npm run dev
```

5. **Access the application**
   Navigate to [http://localhost:3000](http://localhost:3000)

### **Frontend Tech Stack**

- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[TipTap](https://tiptap.dev/)** - Rich text editor
- **[Zustand](https://zustand-demo.pmnd.rs/)** - State management
- **[TanStack Query](https://tanstack.com/query)** - Data fetching and caching
- **[Lucide React](https://lucide.dev/)** - Beautiful icons
- **[React Hot Toast](https://react-hot-toast.com/)** - Toast notifications

### **Frontend Project Structure**

```
frontend/src/
├── app/                   # Next.js App Router
│   ├── auth/              # Authentication pages
│   ├── blog/              # Public blog pages
│   ├── dashboard/         # Protected user dashboard
│   ├── globals.css        # Global styles and animations
│   ├── layout.tsx         # Root layout component
│   ├── providers.tsx      # Root providers component
│   └── page.tsx           # Landing page
├── components/            # Reusable UI components
│   ├── blog/              # Blog-specific components
│   ├── editor/            # Rich text editor components
│   ├── layout/            # Layout components (Navbar, Footer)
│   └── ui/                # Base UI components
├── hooks/                 # Custom React hooks
├── lib/                   # Utility libraries
├── store/                 # Zustand state stores
└── types/                 # TypeScript type definitions
```

### **Frontend Scripts**

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

---

## ⚙️ Backend Setup (Express.js - Port 5100)

### **Installation**

1. **Navigate to backend directory**

```bash
cd backend
```

2. **Install dependencies**

```bash
npm install
```

3. **Environment Configuration**
   Create a `.env` file in the backend directory:

```env
# Server Configuration
PORT=5100
NODE_ENV=development

# Database Configuration
DB_HOST=localhost
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=blogapp
DATABASE_URL="postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:5432/${DB_NAME}?schema=public"

# JWT Configuration
JWT_SECRET="your_super_secure_jwt_secret_key_here"
JWT_EXPIRES_IN="7d"
```

4. **Database Setup**

```bash
# Run Prisma migrations to create database schema
npx prisma migrate dev

# Generate Prisma Client
npx prisma generate
```

5. **Start the development server**

```bash
npm run dev
```

6. **Access the API**

- **API Base URL**: [http://localhost:5100/api/v1](http://localhost:5100/api/v1)
- **API Documentation**: [http://localhost:5100/api-docs](http://localhost:5100/api-docs)

### **Backend Tech Stack**

- **[Node.js](https://nodejs.org/)** - JavaScript runtime
- **[Express.js](https://expressjs.com/)** - Web framework
- **[Prisma](https://www.prisma.io/)** - Database ORM
- **[PostgreSQL](https://www.postgresql.org/)** - Database
- **[JWT](https://jwt.io/)** - Authentication tokens
- **[Zod](https://zod.dev/)** - Request validation
- **[Winston](https://github.com/winstonjs/winston)** - Logging
- **[Swagger UI](https://github.com/scottie1984/swagger-ui-express)** - API documentation

### **Backend Project Structure**

```
backend/src/
├── app.js              # Express app setup and middleware
├── config/             # Configuration files (e.g., Swagger)
├── controllers/        # Express route handlers
├── middleware/         # Custom middleware (auth, errors, validation)
├── routes/             # API route definitions
├── services/           # Core business logic
├── utils/              # Utility functions and classes (logger, errors)
└── server.js           # The entry point of the application
```

### **Backend Scripts**

```bash
npm start                # Start production server
npm run dev             # Start development server with hot-reloading
npm run prisma:generate # Generate Prisma Client
npm run prisma:migrate  # Apply database migrations
```

### **API Endpoints**

#### **Authentication**

- `POST /api/v1/auth/register` - User registration
- `POST /api/v1/auth/login` - User login

#### **Blog Posts**

- `GET /api/v1/posts` - Get all posts (with pagination and search)
- `GET /api/v1/posts/:id` - Get single post
- `POST /api/v1/posts` - Create new post (authenticated)
- `PUT /api/v1/posts/:id` - Update post (authenticated, own posts only)
- `DELETE /api/v1/posts/:id` - Delete post (authenticated, own posts only)

## 🔐 Authentication Flow

1. **User Registration/Login**: Users can register or login through the frontend
2. **JWT Token**: Backend issues a JWT token upon successful authentication
3. **Token Storage**: Frontend stores the token securely
4. **Protected Requests**: Token is included in Authorization header for protected routes
5. **Token Validation**: Backend validates the token for each protected request

## 🗂️ Environment Variables

### **Frontend (.env.local)**

| Variable              | Description          | Example                        |
| --------------------- | -------------------- | ------------------------------ |
| `NEXT_PUBLIC_API_URL` | Backend API base URL | `http://localhost:5100/api/v1` |

### **Backend (.env)**

| Variable         | Description                  | Example                                                       |
| ---------------- | ---------------------------- | ------------------------------------------------------------- |
| `PORT`           | Server port                  | `5100`                                                        |
| `NODE_ENV`       | Environment mode             | `development`                                                 |
| `DATABASE_URL`   | PostgreSQL connection string | `postgresql://user:pass@localhost:5432/blogapp?schema=public` |
| `JWT_SECRET`     | JWT signing secret           | `your_super_secure_secret`                                    |
| `JWT_EXPIRES_IN` | Token expiration time        | `7d`                                                          |

## 🚀 Deployment

### **Frontend (Vercel/Netlify)**

1. Build the frontend: `npm run build`
2. Deploy the `out` or `.next` directory
3. Set environment variables in your hosting platform


### **Backend (Railway/Heroku/DigitalOcean)**

1. Set up PostgreSQL database
2. Configure environment variables
3. Run database migrations: `npx prisma migrate deploy`
4. Deploy the backend code

# 🚀 Running the Project with Docker

## Prerequisites

- **Windows:**  
  Ensure **Docker Desktop** is running.

- **Linux:**  
  Ensure **Docker** and **Docker Compose** are installed and running.

---

## ⚙️ Setup

1. **Update Environment Files**

Make sure you configure your environment variables:

- `.env` (root directory)
- `frontend/.env`
- `backend/.env`

---

## 🐳 Run the Application

### **Build Docker images (no cache):**

```bash
docker-compose build --no-cache
````

### **Start containers:**

```bash
docker-compose up -d
```

---

## 🔍 Check Running Containers

```bash
docker ps
```

This will list all active containers in your project.

---

## ✅ You're ready to go!


## 📱 Features Walkthrough

### **Public Features**

- **Landing Page**: Beautiful hero section with call-to-action
- **Blog Listing**: Browse all published posts with search and pagination
- **Post Reading**: Read full posts with rich content rendering

### **Authenticated Features**

- **User Dashboard**: Overview of user's posts and statistics
- **Post Creation**: Rich text editor for creating new blog posts
- **Post Management**: Edit and delete existing posts
- **Profile Management**: User account settings



